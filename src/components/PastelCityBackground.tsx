export function PastelCityBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Sky layer with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B4E1FF] via-[#FFF5D6] to-[#D7F9F1]">
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='1' seed='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Far buildings layer */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div className="relative h-full">
          {/* Building silhouettes */}
          <div className="absolute bottom-0 left-10 w-16 h-32 bg-[#FBE7C6] opacity-60 rounded-t-3xl shadow-lg"></div>
          <div className="absolute bottom-0 left-32 w-12 h-24 bg-[#D7F9F1] opacity-60 rounded-t-2xl shadow-lg"></div>
          <div className="absolute bottom-0 left-52 w-20 h-40 bg-[#FFB3C1] opacity-50 rounded-t-3xl shadow-lg"></div>
          <div className="absolute bottom-0 right-20 w-14 h-28 bg-[#FFF5D6] opacity-60 rounded-t-2xl shadow-lg"></div>
          <div className="absolute bottom-0 right-40 w-18 h-36 bg-[#D7F9F1] opacity-50 rounded-t-3xl shadow-lg"></div>
        </div>
      </div>

      {/* Mid buildings layer */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3">
        <div className="relative h-full">
          {/* Closer building silhouettes */}
          <div className="absolute bottom-0 left-20 w-24 h-48 bg-[#FFB3C1] opacity-70 rounded-t-3xl shadow-xl"></div>
          <div className="absolute bottom-0 left-52 w-20 h-32 bg-[#FBE7C6] opacity-70 rounded-t-2xl shadow-xl"></div>
          <div className="absolute bottom-0 right-32 w-28 h-44 bg-[#D7F9F1] opacity-70 rounded-t-3xl shadow-xl"></div>
          <div className="absolute bottom-0 right-68 w-16 h-28 bg-[#FFF5D6] opacity-70 rounded-t-2xl shadow-xl"></div>
        </div>
      </div>

      {/* Foreground elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4">
        {/* Floating clouds */}
        <div className="absolute top-4 left-16 w-12 h-6 bg-white opacity-40 rounded-full blur-sm"></div>
        <div className="absolute top-8 left-32 w-8 h-4 bg-white opacity-30 rounded-full blur-sm"></div>
        <div className="absolute top-2 right-24 w-16 h-8 bg-white opacity-40 rounded-full blur-sm"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-12 left-1/4 w-3 h-12 bg-[#FFB3C1] opacity-60 rounded-full shadow-lg"></div>
        <div className="absolute top-8 right-1/4 w-3 h-16 bg-[#D7F9F1] opacity-60 rounded-full shadow-lg"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#FFB3C1] rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#D7F9F1] rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#FBE7C6] rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-[#B4E1FF] rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
}