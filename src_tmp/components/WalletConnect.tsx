import { Wallet, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useWallet } from './WalletProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function WalletConnect() {
  const { connectWallet } = useWallet();

  return (
    <div className="min-h-screen mobile-viewport flex items-center justify-center px-4 sm:px-6 safe-area-inset-top safe-area-inset-bottom">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 shadow-xl p-6 sm:p-8 text-center">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300 p-0.5">
              <div className="w-full h-full rounded-2xl bg-white/90 flex items-center justify-center">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
            
            <h1 
              className="text-lg xs:text-xl sm:text-2xl mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
              style={{ 
                fontFamily: 'Fredoka, system-ui, sans-serif',
                fontSize: 'clamp(1rem, 4vw, 1.5rem)'
              }}
            >
              Connect Your Wallet
            </h1>
            
            <p className="text-gray-600 leading-relaxed text-xs xs:text-sm sm:text-base px-2">
              <span className="hidden xs:inline">Choose your preferred Solana wallet to access the DApp</span>
              <span className="xs:hidden">Choose your Solana wallet</span>
            </p>
          </div>

          {/* Wallet Options */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <Button
              onClick={() => connectWallet('phantom')}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 py-4 sm:py-6 min-h-[44px] touch-manipulation"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <div className="flex items-center justify-center gap-2 xs:gap-3">
                <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-white/20 rounded-md xs:rounded-lg flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="text-sm xs:text-base sm:text-lg">
                  <span className="hidden xs:inline">Connect with Phantom</span>
                  <span className="xs:hidden">Phantom</span>
                </span>
              </div>
            </Button>

            <Button
              onClick={() => connectWallet('solflare')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 py-4 sm:py-6 min-h-[44px] touch-manipulation"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <div className="flex items-center justify-center gap-2 xs:gap-3">
                <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-white/20 rounded-md xs:rounded-lg flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="text-sm xs:text-base sm:text-lg">
                  <span className="hidden xs:inline">Connect with Solflare</span>
                  <span className="xs:hidden">Solflare</span>
                </span>
              </div>
            </Button>
          </div>

          {/* Footer */}
          <div className="text-xs sm:text-sm text-gray-500 space-y-1">
            <p>Secure connection via Web3</p>
            <p className="text-xs opacity-75">Your keys, your crypto</p>
          </div>
        </Card>

        {/* Floating particles - Reduced for mobile performance */}
        <div className="hidden sm:block">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}