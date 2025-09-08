import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from 'figma:asset/797f200edc69cda7280b1e079929a3b86ee29352.png';

// Official X Logo Component
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="X Logo"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Header() {
  const handleXClick = () => {
    window.open('https://x.com/yourproject', '_blank', 'noopener,noreferrer');
  };

  const handleDocsClick = () => {
    window.open('https://docs.example', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-6 md:px-9 md:py-9 flex items-center justify-between relative z-50 safe-area-inset-top">
      {/* Logo/Title */}
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
        <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
          <ImageWithFallback
            src={logoImage}
            alt="Pouchy Logo"
            className="w-full h-full object-cover scale-110 opacity-90"
          />
          {/* Soft overlay to blend with background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-pink-200/20 pointer-events-none"></div>
        </div>
        <h2 
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-wide text-gray-700/90" 
          style={{ 
            fontFamily: 'Fredoka, system-ui, sans-serif',
            fontSize: 'clamp(1.25rem, 4vw, 2.5rem)'
          }}
        >
          Pouchy
        </h2>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 md:gap-6">
        <button
          onClick={handleXClick}
          className="flex items-center gap-1 xs:gap-2 sm:gap-3 px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-xl hover:bg-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-pink-200/20 min-h-[44px] min-w-[44px] touch-manipulation"
        >
          <XLogo className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline text-sm xs:text-base md:text-lg">X</span>
        </button>

        <Button
          variant="secondary"
          className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200 text-xs xs:text-sm sm:text-base md:text-lg px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 min-h-[44px] touch-manipulation"
          onClick={handleDocsClick}
        >
          <span className="hidden xs:inline">Docs</span>
          <span className="xs:hidden text-base">📖</span>
          <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ml-1 xs:ml-1 sm:ml-3 opacity-60" />
        </Button>
      </div>
    </header>
  );
}