import React from 'react';
import { Toaster } from './components/ui/sonner';
import { RouterProvider, useRouter } from './components/Router';
import { WalletProvider } from './components/WalletProvider';
import { LandingPage } from './components/LandingPage';
import { DAppPage } from './components/DAppPage';
import { LaunchpadPage } from './components/LaunchpadPage';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { currentPage } = useRouter();
  
  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="w-full min-h-screen"
          >
            <LandingPage />
          </motion.div>
        ) : currentPage === 'launchpad' ? (
          <motion.div
            key="launchpad"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full min-h-screen"
          >
            <LaunchpadPage />
          </motion.div>
        ) : (
          <motion.div
            key="dapp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full min-h-screen"
          >
            <DAppPage />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 179, 193, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        }}
      />

      {/* Custom animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .scale-103 {
          transform: scale(1.03);
        }
        
        body {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-variation-settings: 'wght' 400;
          letter-spacing: 0.025em;
        }
        
        /* Mobile responsiveness and iOS/Android optimizations */
        @media (max-width: 768px) {
          .min-w-[280px] {
            min-width: 240px;
          }
          
          /* Prevent zoom on input focus */
          input, select, textarea {
            font-size: 16px;
          }
          
          /* Better touch targets */
          button, .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* iOS specific optimizations */
        @supports (-webkit-touch-callout: none) {
          .safe-area-inset-top {
            padding-top: env(safe-area-inset-top);
          }
          
          .safe-area-inset-bottom {
            padding-bottom: env(safe-area-inset-bottom);
          }
          
          /* Prevent iOS scroll bounce */
          body {
            overscroll-behavior: none;
          }
        }
        
        /* Android specific optimizations */
        @media screen and (max-width: 768px) {
          /* Optimize for Android viewport */
          .mobile-viewport {
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for modern browsers */
          }
        }
        
        /* Additional responsive breakpoints */
        @media (max-width: 375px) {
          /* iPhone SE and smaller screens */
          .xs\\:hidden {
            display: none;
          }
          
          .xs\\:inline {
            display: inline;
          }
          
          /* Ultra compact text sizing */
          .ultra-compact-text {
            font-size: 0.75rem !important;
            line-height: 1.2 !important;
          }
          
          /* Reduce padding for very small screens */
          .ultra-compact-padding {
            padding: 0.5rem !important;
          }
          
          /* Ensure minimum touch targets */
          button, .touch-target {
            min-height: 40px !important;
            min-width: 40px !important;
          }
        }
        
        @media (max-width: 390px) {
          /* iPhone 12 mini and smaller */
          .compact-text {
            font-size: 0.875rem;
          }
        }
        
        @media (min-width: 391px) {
          .xs\\:hidden {
            display: inline;
          }
          
          .xs\\:inline {
            display: none;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 179, 193, 0.4);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 179, 193, 0.6);
        }

        /* TV Static Animation */
        @keyframes tvStatic {
          0% { transform: translateX(0); }
          10% { transform: translateX(-1px); }
          20% { transform: translateX(1px); }
          30% { transform: translateX(-1px); }
          40% { transform: translateX(1px); }
          50% { transform: translateX(-1px); }
          60% { transform: translateX(1px); }
          70% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }

        /* Page transition effects */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .page-transition-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(180, 225, 255, 0.4) 30%,
            rgba(255, 245, 214, 0.6) 50%,
            rgba(215, 249, 241, 0.4) 70%,
            transparent
          );
          animation: shimmer 1.5s ease-in-out;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  // Set document title
  React.useEffect(() => {
    document.title = "Pouchy.fun - Cute Solana Launchpad & Analytics";
  }, []);

  return (
    <RouterProvider>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </RouterProvider>
  );
}