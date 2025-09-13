import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner@2.0.3";

// Solana wallet interface types
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: PublicKey }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
    };
    solflare?: {
      isSolflare?: boolean;
      connect: () => Promise<{ publicKey: PublicKey }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
    };
  }
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletType: string | null;
  balance: number;
  isLoading: boolean;
  connectWallet: (walletType: "phantom" | "solflare") => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

interface WalletProviderProps {
  children: ReactNode;
}

// Solana RPC endpoint - using multiple fallback RPCs
const SOLANA_RPC_URLS = [
  "https://api.mainnet-beta.solana.com",
  "https://solana-mainnet.g.alchemy.com/v2/demo",
  "https://rpc.ankr.com/solana",
  "https://solana-api.projectserum.com",
];

let currentRpcIndex = 0;
const getCurrentRpcUrl = () => SOLANA_RPC_URLS[currentRpcIndex];

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState(
    () => new Connection(getCurrentRpcUrl(), "confirmed")
  );

  // Test RPC connection on initialization
  useEffect(() => {
    const testConnection = async () => {
      let attempts = 0;
      let currentConnection = connection;

      while (attempts < SOLANA_RPC_URLS.length) {
        try {
          console.log(
            `Testing RPC connection (attempt ${
              attempts + 1
            }): ${getCurrentRpcUrl()}`
          );
          const version = await currentConnection.getVersion();
          console.log("Solana RPC connection successful, version:", version);
          return; // Success, exit the function
        } catch (error) {
          console.error(
            `Solana RPC connection failed (attempt ${attempts + 1}):`,
            error
          );
          attempts++;

          if (attempts < SOLANA_RPC_URLS.length) {
            const nextConnection = await tryNextRpc();
            if (nextConnection) {
              currentConnection = nextConnection;
            }
          }
        }
      }

      // All RPCs failed
      toast("Network Error", {
        description:
          "Failed to connect to Solana network. Some features may not work.",
        duration: 5000,
      });
    };

    testConnection();
  }, []);

  // Function to try next RPC endpoint
  const tryNextRpc = async (): Promise<Connection | null> => {
    currentRpcIndex = (currentRpcIndex + 1) % SOLANA_RPC_URLS.length;
    if (currentRpcIndex === 0) {
      // We've tried all RPCs
      return null;
    }
    const newConnection = new Connection(getCurrentRpcUrl(), "confirmed");
    setConnection(newConnection);
    return newConnection;
  };

  // Function to get SOL balance with fallback RPCs
  const getBalance = async (publicKey: PublicKey): Promise<number> => {
    let currentConnection = connection;
    let attempts = 0;
    const maxAttempts = SOLANA_RPC_URLS.length;

    while (attempts < maxAttempts) {
      try {
        console.log(
          `Fetching balance for: ${publicKey.toString()} (attempt ${
            attempts + 1
          })`
        );
        console.log(`Using RPC: ${getCurrentRpcUrl()}`);

        const balance = await currentConnection.getBalance(publicKey);
        console.log("Raw balance (lamports):", balance);
        const solBalance = balance / LAMPORTS_PER_SOL;
        console.log("SOL balance:", solBalance);
        return solBalance;
      } catch (error) {
        console.error(
          `Error fetching balance (attempt ${attempts + 1}):`,
          error
        );
        attempts++;

        if (attempts < maxAttempts) {
          console.log("Trying next RPC endpoint...");
          const nextConnection = await tryNextRpc();
          if (nextConnection) {
            currentConnection = nextConnection;
          } else {
            break;
          }
        }
      }
    }

    // All RPCs failed
    toast("Balance Error", {
      description:
        "Failed to fetch wallet balance from all available networks. Please try again later.",
      duration: 5000,
    });
    return 0;
  };

  // Function to refresh balance
  const refreshBalance = async () => {
    if (!walletAddress) {
      console.log("No wallet address to refresh balance for");
      return;
    }

    try {
      console.log("Refreshing balance for wallet:", walletAddress);
      const publicKey = new PublicKey(walletAddress);
      const newBalance = await getBalance(publicKey);
      setBalance(newBalance);
      console.log("Balance refreshed successfully:", newBalance);
    } catch (error) {
      console.error("Error refreshing balance:", error);
      toast("Refresh Error", {
        description: "Failed to refresh balance. Please try again.",
        duration: 3000,
      });
    }
  };

  // Connect to wallet
  const connectWallet = async (type: "phantom" | "solflare") => {
    setIsLoading(true);

    try {
      let walletProvider;

      if (type === "phantom") {
        if (!window.solana || !window.solana.isPhantom) {
          throw new Error("Phantom wallet is not installed");
        }
        walletProvider = window.solana;
      } else if (type === "solflare") {
        if (!window.solflare || !window.solflare.isSolflare) {
          throw new Error("Solflare wallet is not installed");
        }
        walletProvider = window.solflare;
      } else {
        throw new Error("Unsupported wallet type");
      }

      const response = await walletProvider.connect();
      const publicKey = response.publicKey;

      if (!publicKey) {
        throw new Error("Failed to get public key from wallet");
      }

      const address = publicKey.toString();
      const walletBalance = await getBalance(publicKey);

      setIsConnected(true);
      setWalletAddress(address);
      setWalletType(type);
      setBalance(walletBalance);

      // Set up disconnect listener
      const handleDisconnect = () => {
        disconnectWallet();
      };

      walletProvider.on("disconnect", handleDisconnect);

      toast(`${type.charAt(0).toUpperCase() + type.slice(1)} Connected! 🎉`, {
        description: `Connected with ${walletBalance.toFixed(3)} SOL`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Wallet connection error:", error);

      let errorMessage = "Please try again or use a different wallet.";

      if (error instanceof Error) {
        if (error.message.includes("not installed")) {
          errorMessage = `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } wallet is not installed. Please install it first.`;
        } else if (error.message.includes("User rejected")) {
          errorMessage = "Connection was cancelled by user.";
        }
      }

      toast("Connection Failed", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      // Try to disconnect from the wallet provider
      if (walletType === "phantom" && window.solana) {
        await window.solana.disconnect();
      } else if (walletType === "solflare" && window.solflare) {
        await window.solflare.disconnect();
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }

    setIsConnected(false);
    setWalletAddress(null);
    setWalletType(null);
    setBalance(0);

    toast("Wallet Disconnected", {
      description: "Your wallet has been disconnected safely.",
      duration: 2000,
    });
  };

  // Auto-refresh balance every 30 seconds when connected
  useEffect(() => {
    if (!isConnected || !walletAddress) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, walletAddress]);

  // Check for existing wallet connection on load
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check Phantom
        if (window.solana && window.solana.isPhantom) {
          try {
            const response = await window.solana.connect({
              onlyIfTrusted: true,
            });
            if (response && response.publicKey) {
              const address = response.publicKey.toString();
              const walletBalance = await getBalance(response.publicKey);

              setIsConnected(true);
              setWalletAddress(address);
              setWalletType("phantom");
              setBalance(walletBalance);
              console.log(
                "Phantom wallet auto-connected with balance:",
                walletBalance
              );
              return;
            }
          } catch (phantomError) {
            console.log("Phantom auto-connect failed:", phantomError);
          }
        }

        // Check Solflare
        if (window.solflare && window.solflare.isSolflare) {
          try {
            const response = await window.solflare.connect({
              onlyIfTrusted: true,
            });
            if (response && response.publicKey) {
              const address = response.publicKey.toString();
              const walletBalance = await getBalance(response.publicKey);

              setIsConnected(true);
              setWalletAddress(address);
              setWalletType("solflare");
              setBalance(walletBalance);
              console.log(
                "Solflare wallet auto-connected with balance:",
                walletBalance
              );
              return;
            }
          } catch (solflareError) {
            console.log("Solflare auto-connect failed:", solflareError);
          }
        }
      } catch (error) {
        console.log("Wallet auto-connect check failed:", error);
      }
    };

    // Small delay to ensure wallets are loaded
    const timer = setTimeout(checkWalletConnection, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        walletType,
        balance,
        isLoading,
        connectWallet,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
