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
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "./Router";
import { useWallet } from "./WalletProvider";
import { DAppHeader } from "./DAppHeader";
import { WalletConnect } from "./WalletConnect";
import { WalletAnalyzerView } from "./WalletAnalyzerView";
import { WalletOverlapView } from "./WalletOverlapView";
import { CTOTrendingView } from "./CTOTrendingView";

const backgroundImage =
  "https://images.unsplash.com/photo-1720624226898-240e707b089a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBob3QlMjBhaXIlMjBiYWxsb29ucyUyMGNsb3VkcyUyMHNreSUyMGRyZWFteXxlbnwxfHx8fDE3NTcxNDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

type DAppView = "walletAnalyzer" | "walletOverlap" | "ctoTrending";

export function DAppPage() {
  const [currentView, setCurrentView] = useState<DAppView>("walletAnalyzer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateTo } = useRouter();
  const { isConnected } = useWallet();

  const renderView = () => {
    switch (currentView) {
      case "walletAnalyzer":
        return <WalletAnalyzerView />;
      case "walletOverlap":
        return <WalletOverlapView />;
      case "ctoTrending":
        return <CTOTrendingView />;
      default:
        return <WalletAnalyzerView />;
    }
  };

  const navigationItems = [
    { key: "walletAnalyzer", icon: BarChart3, label: "Wallet Analyzer" },
    { key: "walletOverlap", icon: Users, label: "Wallet Overlap" },
    { key: "ctoTrending", icon: TrendingUp, label: "CTO Trending" },
  ];

  const handleNavClick = (view: DAppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  if (!isConnected) {
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

        <div className="absolute top-2 left-2 xs:top-4 xs:left-4 sm:top-6 sm:left-6 z-50">
          <Button
            variant="secondary"
            onClick={() => navigateTo("landing")}
            className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200 min-h-[40px] xs:min-h-[44px] touch-manipulation text-xs xs:text-sm px-2 xs:px-3 py-2"
          >
            <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </div>

        <WalletConnect />
      </div>
    );
  }

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
        <DAppHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

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
                    ${
                      currentView === key
                        ? "bg-white/40 shadow-lg shadow-pink-200/30 border border-white/30"
                        : "hover:bg-white/25"
                    }
                  `}
                  style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}

              {/* Auxiliary Menu */}
              <div className="mt-8 pt-6 border-t border-white/30">
                <button
                  onClick={() =>
                    window.open(
                      "https://pouchyai.github.io/pouchy-docs/",
                      "_blank"
                    )
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 min-h-[44px] touch-manipulation"
                  style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Docs</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
                </button>
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

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 relative">
            <div className="relative z-10">{renderView()}</div>
          </div>
        </div>

        {/* Mobile Bottom Navigation (Alternative approach) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 p-1 xs:p-2 safe-area-inset-bottom z-30">
          <div className="flex justify-around">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key as DAppView)}
                className={`
                  flex flex-col items-center gap-0.5 xs:gap-1 px-1 py-1 xs:px-2 xs:py-2 rounded-md xs:rounded-lg transition-all duration-200 min-h-[40px] min-w-[40px] xs:min-h-[44px] xs:min-w-[44px] touch-manipulation
                  ${
                    currentView === key
                      ? "text-pink-600 bg-pink-100"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="text-xs font-medium truncate max-w-[60px] xs:max-w-none">
                  {label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
