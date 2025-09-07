import { ArrowLeft, LogOut, Wallet, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from './Router';
import { useWallet } from './WalletProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DAppHeaderProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function DAppHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: DAppHeaderProps = {}) {
  const { navigateTo } = useRouter();
  const { walletAddress, walletType, balance, disconnectWallet } = useWallet();

  return (
    <header className="w-full px-2 py-2 xs:px-4 xs:py-3 sm:px-6 sm:py-4 flex items-center justify-between bg-white/20 backdrop-blur-sm border-b border-white/30">
      {/* Left side - Logo and Navigation button */}
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 min-w-0 flex-1">
        {/* Desktop: Home button, Mobile: Menu button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (setIsMobileMenuOpen) {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            } else {
              navigateTo('landing');
            }
          }}
          className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200 text-xs xs:text-sm px-2 py-1 xs:px-3 xs:py-2 min-h-[32px] xs:min-h-[36px] flex-shrink-0"
        >
          {/* Desktop: Home button */}
          <div className="hidden lg:flex items-center">
            <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            <span className="hidden xs:inline">Home</span>
            <span className="xs:hidden">Home</span>
          </div>
          
          {/* Mobile: Menu button */}
          <div className="lg:hidden flex items-center">
            {isMobileMenuOpen ? (
              <>
                <X className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">Close</span>
                <span className="xs:hidden">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">Menu</span>
                <span className="xs:hidden">Menu</span>
              </>
            )}
          </div>
        </Button>
        
        <div className="flex items-center gap-2 xs:gap-3 min-w-0">
          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md xs:rounded-lg bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300 p-0.5 flex-shrink-0">
            <div className="w-full h-full rounded-md xs:rounded-lg bg-white/90 flex items-center justify-center">
              <Wallet className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            </div>
          </div>
          <h1 
            className="text-sm xs:text-base sm:text-xl text-gray-700/90 tracking-wide truncate"
            style={{ 
              fontFamily: 'Fredoka, system-ui, sans-serif',
              fontSize: 'clamp(0.875rem, 3vw, 1.25rem)'
            }}
          >
            <span className="hidden xs:inline">Pouchy Analytics</span>
            <span className="xs:hidden">Pouchy Analytics</span>
          </h1>
        </div>
      </div>

      {/* Right side - Wallet info */}
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 flex-shrink-0">
        {/* Balance */}
        <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg xs:rounded-xl px-2 py-1 xs:px-3 xs:py-2">
          <div className="flex items-center gap-1 xs:gap-2">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
            <span 
              className="text-xs xs:text-sm text-gray-700/90"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <span className="hidden xs:inline">{balance.toFixed(3)} SOL</span>
              <span className="xs:hidden">{balance.toFixed(0)} SOL</span>
            </span>
          </div>
        </div>

        {/* Wallet Address - Hidden on very small screens */}
        <div className="hidden xs:block bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg xs:rounded-xl px-2 py-1 xs:px-3 xs:py-2">
          <div className="flex items-center gap-1 xs:gap-2">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
            <span className="text-xs xs:text-sm text-gray-700/90 font-mono">
              <span className="hidden sm:inline">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
              <span className="sm:hidden">{walletAddress?.slice(0, 4)}...{walletAddress?.slice(-3)}</span>
            </span>
            <span 
              className="text-xs text-gray-500 capitalize hidden sm:inline"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              {walletType}
            </span>
          </div>
        </div>

        {/* Disconnect Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={disconnectWallet}
          className="bg-red-100/30 backdrop-blur-sm border-red-200/20 hover:bg-red-200/40 hover:shadow-lg hover:shadow-red-200/20 transition-all duration-200 min-h-[32px] min-w-[32px] xs:min-h-[36px] xs:min-w-[36px] p-1 xs:p-2"
        >
          <LogOut className="w-3 h-3 xs:w-4 xs:h-4" />
        </Button>
      </div>
    </header>
  );
}