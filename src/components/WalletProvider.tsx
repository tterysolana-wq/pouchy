import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { toast } from 'sonner@2.0.3';

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
  connectWallet: (walletType: 'phantom' | 'solflare') => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

interface WalletProviderProps {
  children: ReactNode;
}

// Supabase configuration
const SUPABASE_URL = 'https://ggunktueytmayrkskgbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndW5rdHVleXRtYXlya3NrZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDAxMTMsImV4cCI6MjA3MzE3NjExM30.8yBN3AEagH-T8kXhghGaMxALkMC4lLqDoKQqrTjAFOY';

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get SOL balance using Supabase edge function
  const getBalance = async (walletAddress: string): Promise<number> => {
    try {
      console.log('Fetching balance for wallet:', walletAddress);
      
      const response = await fetch(`${SUPABASE_URL}/functions/v1/get-balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          wallet: walletAddress
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Balance response:', data);
      
      if (data.success && typeof data.balance === 'number') {
        console.log('SOL balance:', data.balance);
        return data.balance;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast('Balance Error', {
        description: 'Failed to fetch wallet balance. Please try refreshing.',
        duration: 3000,
      });
      return 0;
    }
  };

  // Function to refresh balance
  const refreshBalance = async () => {
    if (!walletAddress) {
      console.log('No wallet address to refresh balance for');
      return;
    }
    
    try {
      console.log('Refreshing balance for wallet:', walletAddress);
      const newBalance = await getBalance(walletAddress);
      setBalance(newBalance);
      console.log('Balance refreshed successfully:', newBalance);
    } catch (error) {
      console.error('Error refreshing balance:', error);
      toast('Refresh Error', {
        description: 'Failed to refresh balance. Please try again.',
        duration: 3000,
      });
    }
  };

  // Connect to wallet
  const connectWallet = async (type: 'phantom' | 'solflare') => {
    setIsLoading(true);
    
    try {
      let walletProvider;
      
      if (type === 'phantom') {
        if (!window.solana || !window.solana.isPhantom) {
          throw new Error('Phantom wallet is not installed');
        }
        walletProvider = window.solana;
      } else if (type === 'solflare') {
        if (!window.solflare || !window.solflare.isSolflare) {
          throw new Error('Solflare wallet is not installed');
        }
        walletProvider = window.solflare;
      } else {
        throw new Error('Unsupported wallet type');
      }

      const response = await walletProvider.connect();
      const publicKey = response.publicKey;
      
      if (!publicKey) {
        throw new Error('Failed to get public key from wallet');
      }

      const address = publicKey.toString();
      const walletBalance = await getBalance(address);
      
      setIsConnected(true);
      setWalletAddress(address);
      setWalletType(type);
      setBalance(walletBalance);

      // Set up disconnect listener
      const handleDisconnect = () => {
        disconnectWallet();
      };
      
      walletProvider.on('disconnect', handleDisconnect);
      
      toast(`${type.charAt(0).toUpperCase() + type.slice(1)} Connected! 🎉`, {
        description: `Connected with ${walletBalance.toFixed(3)} SOL`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Wallet connection error:', error);
      
      let errorMessage = 'Please try again or use a different wallet.';
      
      if (error instanceof Error) {
        if (error.message.includes('not installed')) {
          errorMessage = `${type.charAt(0).toUpperCase() + type.slice(1)} wallet is not installed. Please install it first.`;
        } else if (error.message.includes('User rejected')) {
          errorMessage = 'Connection was cancelled by user.';
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
      if (walletType === 'phantom' && window.solana) {
        await window.solana.disconnect();
      } else if (walletType === 'solflare' && window.solflare) {
        await window.solflare.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
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
            const response = await window.solana.connect({ onlyIfTrusted: true });
            if (response && response.publicKey) {
              const address = response.publicKey.toString();
              const walletBalance = await getBalance(address);
              
              setIsConnected(true);
              setWalletAddress(address);
              setWalletType('phantom');
              setBalance(walletBalance);
              console.log('Phantom wallet auto-connected with balance:', walletBalance);
              return;
            }
          } catch (phantomError) {
            console.log('Phantom auto-connect failed:', phantomError);
          }
        }

        // Check Solflare
        if (window.solflare && window.solflare.isSolflare) {
          try {
            const response = await window.solflare.connect({ onlyIfTrusted: true });
            if (response && response.publicKey) {
              const address = response.publicKey.toString();
              const walletBalance = await getBalance(address);
              
              setIsConnected(true);
              setWalletAddress(address);
              setWalletType('solflare');
              setBalance(walletBalance);
              console.log('Solflare wallet auto-connected with balance:', walletBalance);
              return;
            }
          } catch (solflareError) {
            console.log('Solflare auto-connect failed:', solflareError);
          }
        }
      } catch (error) {
        console.log('Wallet auto-connect check failed:', error);
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
        refreshBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}