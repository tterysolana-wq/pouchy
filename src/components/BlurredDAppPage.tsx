import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Users,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "./Router";
import { DAppHeader } from "./DAppHeader";
import { TokenAnalyzerView } from "./TokenAnalyzerView";
import { WalletOverlapView } from "./WalletOverlapView";
import { CTOTrendingView } from "./CTOTrendingView";
import { motion } from "framer-motion";

const backgroundImage =
  "https://images.unsplash.com/photo-1720624226898-240e707b089a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBob3QlMjBhaXIlMjBiYWxsb29ucyUyMGNsb3VkcyUyMHNreSUyMGRyZWFteXxlbnwxfHx8fDE3NTcxNDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

type DAppView = "tokenAnalyzer" | "walletOverlap" | "ctoTrending";

export function BlurredDAppPage() {
  const [currentView, setCurrentView] = useState<DAppView>("tokenAnalyzer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateTo } = useRouter();

  const renderView = () => {
    switch (currentView) {
      case "tokenAnalyzer":
        return <TokenAnalyzerView />;
      case "walletOverlap":
        return <WalletOverlapView />;
      case "ctoTrending":
        return <CTOTrendingView />;
      default:
        return <TokenAnalyzerView />;
    }
  };

  const navigationItems = [
    { key: "tokenAnalyzer", icon: BarChart3, label: "Token Analyzer" },
    { key: "walletOverlap", icon: Users, label: "Wallet Overlap" },
    { key: "ctoTrending", icon: TrendingUp, label: "CTO Trending" },
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#B4E1FF",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-pink-50/30 to-purple-50/40 backdrop-blur-[0.5px]"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Desktop and Mobile */}
        <DAppHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="flex-1 flex relative">
          {/* Desktop Sidebar Navigation - Disabled */}
          <div className="hidden lg:flex w-72 bg-white/30 backdrop-blur-md border-r border-white/40 p-6 pointer-events-none">
            <nav className="space-y-2 w-full opacity-60">
              {navigationItems.map(({ key, icon: Icon, label }) => (
                <div
                  key={key}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl min-h-[44px] cursor-not-allowed
                    ${
                      currentView === key
                        ? "bg-white/40 shadow-lg shadow-pink-200/30 border border-white/30"
                        : "bg-white/10"
                    }
                  `}
                  style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
              ))}

              {/* Auxiliary Menu */}
              <div className="mt-8 pt-6 border-t border-white/30">
                <div
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 min-h-[44px] cursor-not-allowed"
                  style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Docs</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
                </div>
              </div>
            </nav>
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
                        ${
                          currentView === key
                            ? "bg-pink-100 shadow-lg shadow-pink-200/30 border border-pink-200"
                            : "hover:bg-gray-100"
                        }
                      `}
                      style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                    >
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        window.open(
                          "https://pouchyai.github.io/pouchy-docs/",
                          "_blank"
                        );
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 xs:gap-3 px-2 py-2 xs:px-4 xs:py-3 rounded-lg xs:rounded-xl hover:bg-gray-100 transition-all duration-200 min-h-[40px] xs:min-h-[44px] touch-manipulation text-sm xs:text-base"
                      style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
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

          {/* Main Content - Always blurred with no interaction */}
          <div className="flex-1 p-4 sm:p-6 relative">
            <div className="relative z-10 transition-all duration-500 blur-[1px] filter pointer-events-none">
              {renderView()}
            </div>

            {/* Coming Soon Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[1px]"
            >
              <div className="bg-gradient-to-br from-white/95 via-pink-50/90 to-purple-50/90 backdrop-blur-xl rounded-2xl xs:rounded-3xl border border-white/60 shadow-2xl p-4 xs:p-6 sm:p-8 md:p-10 mx-3 xs:mx-4 max-w-sm xs:max-w-lg w-full relative overflow-hidden">
                {/* Floating sparkles background */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-pink-200/30 rounded-full blur-2xl"
                  />
                </div>

                <div className="relative text-center space-y-4 xs:space-y-6">
                  {/* Animated Icon */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mx-auto w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-full flex items-center justify-center relative"
                  >
                    <Sparkles className="w-8 h-8 xs:w-10 xs:h-10 text-pink-500" />

                    {/* Floating stars */}
                    <motion.div
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <Star className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, -180, -360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                      className="absolute -bottom-1 -left-2"
                    >
                      <Star className="w-2 h-2 xs:w-3 xs:h-3 text-blue-400 fill-blue-400" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-3 xs:space-y-4">
                    <motion.h2
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-2xl xs:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                      style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                    >
                      Coming Soon!
                    </motion.h2>

                    <div className="flex items-center justify-center gap-2 text-purple-600">
                      <Clock className="w-4 h-4 xs:w-5 xs:h-5" />
                      <span
                        className="text-base xs:text-lg font-medium"
                        style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                      >
                        Under Development
                      </span>
                    </div>

                    <p
                      className="text-gray-700 text-sm xs:text-base leading-relaxed max-w-xs xs:max-w-md mx-auto px-2 xs:px-0"
                      style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                    >
                      We're working hard to bring you the most amazing Solana
                      DApp experience.
                      <span className="text-pink-600 font-medium">
                        {" "}
                        Token analysis, wallet insights, and trending features
                      </span>{" "}
                      are coming very soon!
                    </p>
                  </div>

                  {/* Button */}
                  <div className="pt-1 xs:pt-2">
                    <Button
                      onClick={() => navigateTo("landing")}
                      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[48px] xs:min-h-[52px] text-base xs:text-lg"
                      style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                    >
                      <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 mr-2" />
                      Back to Home
                    </Button>
                  </div>

                  {/* Footer message */}
                  <motion.p
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-xs xs:text-xs text-gray-500 bg-white/50 rounded-lg xs:rounded-xl p-2 xs:p-3 backdrop-blur-sm mx-2 xs:mx-0"
                    style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                  >
                    ✨ <span className="font-medium">Stay tuned!</span> Follow
                    us for updates and be the first to know when we launch!
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Bottom Navigation - Disabled */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 p-1 xs:p-2 safe-area-inset-bottom z-30 pointer-events-none">
          <div className="flex justify-around opacity-60">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                className={`
                  flex flex-col items-center gap-1 p-2 xs:p-3 rounded-lg min-w-[60px] xs:min-w-[70px] cursor-not-allowed
                  ${
                    currentView === key
                      ? "bg-pink-100 text-pink-600 shadow-lg shadow-pink-200/30"
                      : "text-gray-600"
                  }
                `}
                style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="text-xs leading-tight text-center">
                  {label.split(" ")[0]}
                </span>
              </div>
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
