import { Header } from './Header';
import { CharacterHero } from './CharacterHero';
import { ContractAddress } from './ContractAddress';
import { PastelCityBackground } from './PastelCityBackground';
import { RetroTV } from './RetroTV';

export function LandingPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background layers */}
      <PastelCityBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        {/* Main content area */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <CharacterHero />
        </main>
        
        {/* Contract Address at bottom */}
        <div className="relative z-20 pb-4 sm:pb-8 safe-area-inset-bottom">
          <ContractAddress />
        </div>
      </div>

      {/* Floating elements - Hide on small screens for better performance */}
      <div className="hidden sm:block">
        <RetroTV />
      </div>
    </div>
  );
}