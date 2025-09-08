import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletType: string | null;
  balance: number;
  connectWallet: (walletType: 'phantom' | 'solflare') => Promise<void>;
  disconnectWallet: () => void;
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

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const connectWallet = async (type: 'phantom' | 'solflare') => {
    try {
      // Simulate wallet connection
      const mockAddress = `${type}Mock${Math.random().toString(36).substring(7)}`;
      const mockBalance = Math.random() * 1000;
      
      setIsConnected(true);
      setWalletAddress(mockAddress);
      setWalletType(type);
      setBalance(mockBalance);
      
      toast(`${type.charAt(0).toUpperCase() + type.slice(1)} Connected! 🎉`, {
        description: `Wallet connected successfully`,
        duration: 3000,
      });
    } catch (error) {
      toast("Connection Failed", {
        description: "Please try again or use a different wallet.",
        duration: 3000,
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setWalletType(null);
    setBalance(0);
    
    toast("Wallet Disconnected", {
      description: "Your wallet has been disconnected safely.",
      duration: 2000,
    });
  };

  return (
    <WalletContext.Provider 
      value={{
        isConnected,
        walletAddress,
        walletType,
        balance,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}