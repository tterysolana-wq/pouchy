import { useState } from 'react';
import { ArrowLeft, BarChart3, Users, TrendingUp, ExternalLink, BookOpen, Menu, X, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from './Router';
import { useWallet } from './WalletProvider';
import { DAppHeader } from './DAppHeader';
import { TokenAnalyzerView } from './TokenAnalyzerView';
import { WalletOverlapView } from './WalletOverlapView';
import { CTOTrendingView } from './CTOTrendingView';
import { motion } from 'framer-motion';

const backgroundImage = 'https://images.unsplash.com/photo-1720624226898-240e707b089a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBob3QlMjBhaXIlMjBiYWxsb29ucyUyMGNsb3VkcyUyMHNreSUyMGRyZWFteXxlbnwxfHx8fDE3NTcxNDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

type DAppView = 'tokenAnalyzer' | 'walletOverlap' | 'ctoTrending';

export function BlurredDAppPage() {
  const [currentView, setCurrentView] = useState<DAppView>('tokenAnalyzer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateTo } = useRouter();
  const { isConnected, connectWallet } = useWallet();

  const renderView = () => {
    switch (currentView) {
      case 'tokenAnalyzer':
        return <TokenAnalyzerView />;
      case 'walletOverlap':
        return <WalletOverlapView />;
      case 'ctoTrending':
        return <CTOTrendingView />;
      default:
        return <TokenAnalyzerView />;
    }
  };

  const navigationItems = [
    { key: 'tokenAnalyzer', icon: BarChart3, label: 'Token Analyzer' },
    { key: 'walletOverlap', icon: Users, label: 'Wallet Overlap' },
    { key: 'ctoTrending', icon: TrendingUp, label: 'CTO Trending' },
  ];

  const handleNavClick = (view: DAppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#B4E1FF',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-pink-50/30 to-purple-50/40 backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <DAppHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
        
        <div className="flex-1 flex relative">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:flex w-72 bg-white/30 backdrop-blur-md border-r border-white/40 p-6">
            <nav className="space-y-2 w-full">
              {navigationItems.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentView(key as DAppView)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px] touch-manipulation
                    ${currentView === key 
                      ? 'bg-white/40 shadow-lg shadow-pink-200/30 border border-white/30' 
                      : 'hover:bg-white/25'
                    }
                  `}
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
              
              {/* Auxiliary Menu */}
              <div className="mt-8 pt-6 border-t border-white/30">
                <button
                  onClick={() => window.open('https://docs.example.com', '_blank')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 min-h-[44px] touch-manipulation"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Docs</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Header & Menu Button */}
          <div className="lg:hidden">
            {/* Mobile Header */}
            <DAppHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>

          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute inset-0 z-40">
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="absolute top-12 xs:top-16 left-2 right-2 xs:left-4 xs:right-4 bg-white/90 backdrop-blur-md rounded-xl xs:rounded-2xl border border-white/40 p-2 xs:p-4 shadow-2xl">
                <nav className="space-y-2">
                  {navigationItems.map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => handleNavClick(key as DAppView)}
                      className={`
                        w-full flex items-center gap-2 xs:gap-3 px-2 py-2 xs:px-4 xs:py-3 rounded-lg xs:rounded-xl transition-all duration-200 min-h-[40px] xs:min-h-[44px] touch-manipulation text-sm xs:text-base
                        ${currentView === key 
                          ? 'bg-pink-100 shadow-lg shadow-pink-200/30 border border-pink-200' 
                          : 'hover:bg-gray-100'
                        }
                      `}
                      style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                    >
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        window.open('https://docs.example.com', '_blank');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 xs:gap-3 px-2 py-2 xs:px-4 xs:py-3 rounded-lg xs:rounded-xl hover:bg-gray-100 transition-all duration-200 min-h-[40px] xs:min-h-[44px] touch-manipulation text-sm xs:text-base"
                      style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                    >
                      <BookOpen className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                      <span className="truncate">Docs</span>
                      <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 ml-auto opacity-60 flex-shrink-0" />
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          )}
          
          {/* Main Content - Blurred when not connected */}
          <div className="flex-1 p-4 sm:p-6 relative">
            <div className={`relative z-10 transition-all duration-500 ${!isConnected ? 'blur-md filter' : ''}`}>
              {renderView()}
            </div>

            {/* Wallet Connection Overlay - Only shown when not connected */}
            {!isConnected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl p-6 xs:p-8 mx-4 max-w-md w-full">
                  <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-8 h-8 text-pink-500" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 
                        className="text-xl font-semibold text-gray-800"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        Connect Your Wallet
                      </h3>
                      <p 
                        className="text-gray-600 text-sm leading-relaxed"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        Connect your Solana wallet to access all DApp features including token analysis, wallet overlap insights, and CTO trending data.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={connectWallet}
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[48px]"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => navigateTo('landing')}
                        className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 min-h-[48px]"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                      </Button>
                    </div>

                    {/* Preview text */}
                    <p 
                      className="text-xs text-gray-500 bg-gray-50/80 rounded-lg p-3"
                      style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                    >
                      💡 <span className="font-medium">Preview Mode:</span> You can see the DApp interface in the background. Connect your wallet to interact with all features.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 p-1 xs:p-2 safe-area-inset-bottom z-30">
          <div className="flex justify-around">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key as DAppView)}
                className={`
                  flex flex-col items-center gap-1 p-2 xs:p-3 rounded-lg transition-all duration-200 min-w-[60px] xs:min-w-[70px] touch-manipulation
                  ${currentView === key 
                    ? 'bg-pink-100 text-pink-600 shadow-lg shadow-pink-200/30' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="text-xs leading-tight text-center">{label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background blur when mobile menu is open */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-30" />
      )}
    </div>
  );
}