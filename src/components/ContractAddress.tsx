import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContractAddress() {
  const [copied, setCopied] = useState(false);
  
  // Contract address - POUCHY token
  const contractAddress = "771BXNi8wyPkaCbuN8pVnCKvrhDYkzzKBL3kmTYBpump";

  const handleCopy = async () => {
    if (!contractAddress) {
      toast("No Contract Address", {
        description: "Contract address is not available yet.",
        duration: 2000,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      
      toast("Contract Address Copied! 📋", {
        description: "The contract address has been copied to your clipboard.",
        duration: 2000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast("Failed to copy", {
        description: "Please copy the address manually.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 xs:py-4 sm:py-8 px-2 xs:px-4">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg xs:rounded-xl sm:rounded-2xl px-2 py-2 xs:px-4 xs:py-3 sm:px-8 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white/25 w-full max-w-4xl">
        <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 justify-center">
          <span 
            className="text-gray-700/90 tracking-wide text-sm xs:text-base sm:text-lg flex-shrink-0"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            CA:
          </span>
          
          <code className="text-gray-800 bg-white/30 px-1 py-2 xs:px-2 xs:py-2 sm:px-4 sm:py-2 rounded-md xs:rounded-lg border border-white/20 font-mono text-xs xs:text-xs sm:text-sm md:text-base tracking-wide flex-1 text-center min-h-[2rem] xs:min-h-[2.5rem] flex items-center justify-center overflow-hidden">
            <span className="truncate">
              {contractAddress || (
                <span>
                  <span className="hidden xs:inline">Contract address will appear here</span>
                  <span className="xs:hidden">Address coming soon</span>
                </span>
              )}
            </span>
          </code>
          
          <button
            onClick={handleCopy}
            disabled={!contractAddress}
            className="p-1 xs:p-2 rounded-md xs:rounded-lg hover:bg-white/20 transition-all duration-200 hover:shadow-md hover:shadow-pink-200/20 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] xs:min-h-[44px] xs:min-w-[44px] flex-shrink-0 touch-manipulation"
            title={contractAddress ? "Copy contract address" : "No address to copy"}
          >
            {copied ? (
              <Check className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-green-600" />
            ) : (
              <Copy className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800" />
            )}
          </button>
        </div>
        
        {/* Helper text */}
        <div className="mt-1 xs:mt-2">
          <p className="text-xs text-gray-500 text-center">
            {contractAddress ? (
              <span>
                <span className="hidden xs:inline">Tap to copy full address</span>
                <span className="xs:hidden">Tap to copy</span>
              </span>
            ) : (
              <span>
                <span className="hidden xs:inline">Contract address coming soon</span>
                <span className="xs:hidden">Coming soon</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}