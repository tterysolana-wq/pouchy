import { useState, useEffect } from 'react';
import { Plus, X, Search, RotateCcw, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface WalletInput {
  id: string;
  address: string;
  isValid: boolean | null;
}

interface CommonToken {
  mint: string;
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    commonTokens: CommonToken[];
    totalAnalyzedWallets: number;
  };
}

export function WalletOverlapView() {
  const [wallets, setWallets] = useState<WalletInput[]>([
    { id: '1', address: '', isValid: null },
    { id: '2', address: '', isValid: null },
    { id: '3', address: '', isValid: null },
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('priceChange24h');
  const [commonTokens, setCommonTokens] = useState<CommonToken[]>([]);
  const [totalAnalyzedWallets, setTotalAnalyzedWallets] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateWalletAddress = (address: string): boolean => {
    if (!address) return false;
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };

  const addWallet = () => {
    const newId = (wallets.length + 1).toString();
    setWallets([...wallets, { id: newId, address: '', isValid: null }]);
  };

  const removeWallet = (id: string) => {
    if (wallets.length <= 3) {
      toast("Minimum Required", {
        description: "At least 3 wallets are required for overlap analysis.",
        duration: 3000,
      });
      return;
    }
    setWallets(wallets.filter(w => w.id !== id));
  };

  const updateWallet = (id: string, address: string) => {
    const isValid = validateWalletAddress(address);
    setWallets(wallets.map(w => 
      w.id === id ? { ...w, address, isValid: address ? isValid : null } : w
    ));
  };

  const clearAllWallets = () => {
    setWallets([
      { id: '1', address: '', isValid: null },
      { id: '2', address: '', isValid: null },
      { id: '3', address: '', isValid: null },
    ]);
    setShowResults(false);
    setCommonTokens([]);
    setError(null);
    toast("Cleared", {
      description: "All wallet inputs have been cleared.",
      duration: 2000,
    });
  };

  const findOverlap = async () => {
    const validWallets = wallets.filter(w => w.isValid === true);
    
    if (validWallets.length < 3) {
      toast("Insufficient Wallets", {
        description: "Please add at least 3 valid wallet addresses.",
        duration: 3000,
      });
      return;
    }

    // Check for duplicates
    const addresses = validWallets.map(w => w.address);
    const uniqueAddresses = new Set(addresses);
    if (addresses.length !== uniqueAddresses.size) {
      toast("Duplicate Wallets", {
        description: "Please remove duplicate wallet addresses.",
        duration: 3000,
      });
      return;
    }

    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch('https://ggunktueytmayrkskgbk.supabase.co/functions/v1/wallet-overlap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndW5rdHVleXRtYXlya3NrZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDAxMTMsImV4cCI6MjA3MzE3NjExM30.8yBN3AEagH-T8kXhghGaMxALkMC4lLqDoKQqrTjAFOY',
        },
        body: JSON.stringify({
          wallets: addresses
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setCommonTokens(data.data.commonTokens);
        setTotalAnalyzedWallets(data.data.totalAnalyzedWallets);
        setShowResults(true);
        
        toast("Overlap Found! 🔍", {
          description: `Found ${data.data.commonTokens.length} common token${data.data.commonTokens.length !== 1 ? 's' : ''} across ${data.data.totalAnalyzedWallets} wallets.`,
          duration: 4000,
        });
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error finding wallet overlap:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      toast("Search Failed", {
        description: "Wallet overlap search failed. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const openInExplorer = (tokenAddress: string) => {
    window.open(`https://explorer.solana.com/address/${tokenAddress}`, '_blank');
    toast("Opening Explorer", {
      description: `Opening ${tokenAddress.slice(0, 6)}... in Solana Explorer.`,
      duration: 3000,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!", {
      description: "Token address copied to clipboard.",
      duration: 2000,
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(2);
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return price.toExponential(2);
    return price.toFixed(6);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearAllWallets();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const validWalletCount = wallets.filter(w => w.isValid === true).length;
  const canSearch = validWalletCount >= 3;

  const sortedTokens = [...commonTokens].sort((a, b) => {
    switch (sortBy) {
      case 'priceChange24h':
        return b.priceChange24h - a.priceChange24h;
      case 'volume24h':
        return b.volume24h - a.volume24h;
      case 'marketCap':
        return b.marketCap - a.marketCap;
      case 'currentPrice':
        return b.currentPrice - a.currentPrice;
      default:
        return b.priceChange24h - a.priceChange24h;
    }
  });

  return (
    <div className="space-y-4 xs:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start mb-4 xs:mb-6 gap-3 xs:gap-4">
        <div className="flex-1">
          <h1 
            className="text-xl xs:text-2xl sm:text-3xl text-gray-800/90 mb-1 xs:mb-2 leading-tight"
            style={{ 
              fontFamily: 'Fredoka, system-ui, sans-serif',
              fontSize: 'clamp(1.25rem, 4vw, 2rem)'
            }}
          >
            <span className="hidden xs:inline">Wallet Overlap 🔍</span>
            <span className="xs:hidden">Overlap 🔍</span>
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">
            <span className="hidden xs:inline">Find common tokens across multiple wallets</span>
            <span className="xs:hidden">Find common tokens across wallets</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4 xs:space-y-6">
          {/* Wallet Inputs */}
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-3 xs:p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 xs:mb-4">
              <h3 
                className="text-base xs:text-lg text-gray-800/90"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                <span className="hidden xs:inline">Wallet Addresses</span>
                <span className="xs:hidden">Wallets</span>
              </h3>
              <Badge 
                variant="secondary" 
                className={canSearch ? 'bg-green-100/50 text-green-700' : 'bg-orange-100/50 text-orange-700'}
              >
                {validWalletCount}/3+ valid
              </Badge>
            </div>
            
            <div className="space-y-2 xs:space-y-3">
              {wallets.map((wallet, index) => (
                <div key={wallet.id} className="relative">
                  <div className="flex items-center gap-1 xs:gap-2">
                    <span className="w-4 xs:w-6 text-xs xs:text-sm text-gray-600">{index + 1}.</span>
                    <Input
                      placeholder={`Wallet ${index + 1}`}
                      value={wallet.address}
                      onChange={(e) => updateWallet(wallet.id, e.target.value)}
                      className={`flex-1 bg-white/30 border-white/20 text-xs xs:text-sm ${
                        wallet.isValid === false ? 'border-red-400' : 
                        wallet.isValid === true ? 'border-green-400' : ''
                      }`}
                    />
                    {wallets.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWallet(wallet.id)}
                        className="p-1 xs:p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3 xs:w-4 xs:h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {wallet.isValid === false && (
                    <p className="text-xs text-red-500 mt-1 ml-5 xs:ml-8">Invalid wallet format</p>
                  )}
                </div>
              ))}
              
              <Button
                variant="secondary"
                onClick={addWallet}
                className="w-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 mt-3 xs:mt-4 text-xs xs:text-sm"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                <Plus className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">Add Wallet</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2 xs:space-y-3">
            <Button
              onClick={findOverlap}
              disabled={!canSearch || isSearching}
              className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0 py-4 xs:py-6 text-sm xs:text-base"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden xs:inline">Searching...</span>
                  <span className="xs:hidden">Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span className="hidden xs:inline">Find Overlap</span>
                  <span className="xs:hidden">Find Overlap</span>
                </div>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={clearAllWallets}
              className="w-full bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 text-xs xs:text-sm"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <RotateCcw className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
              <span className="hidden xs:inline">Clear All</span>
              <span className="xs:hidden">Clear</span>
            </Button>
          </div>

          {!canSearch && (
            <Card className="bg-orange-50/30 backdrop-blur-sm border-orange-200/20 p-3 xs:p-4">
              <div className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                <div>
                  <p className="text-xs xs:text-sm">
                    <span className="hidden xs:inline">Need more wallets</span>
                    <span className="xs:hidden">Need 3+ wallets</span>
                  </p>
                  <p className="text-xs text-orange-600">
                    <span className="hidden xs:inline">Add at least 3 valid wallet addresses</span>
                    <span className="xs:hidden">Add 3+ valid addresses</span>
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-3 xs:p-4 sm:p-6 min-h-[500px] xs:min-h-[600px]">
            {!showResults && !isSearching ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full flex items-center justify-center mb-3 xs:mb-4">
                  <Search className="w-6 h-6 xs:w-8 xs:h-8 text-white" />
                </div>
                <h3 
                  className="text-lg xs:text-xl text-gray-800/90 mb-2"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <span className="hidden xs:inline">Add 3 or more wallets to find common tokens</span>
                  <span className="xs:hidden">Add 3+ wallets to find tokens</span>
                </h3>
                <p className="text-xs xs:text-sm text-gray-600 mb-3 xs:mb-4">
                  <span className="hidden xs:inline">Enter wallet addresses and we'll find tokens they all hold</span>
                  <span className="xs:hidden">Enter addresses to find common tokens</span>
                </p>
                <div className="text-xs text-gray-500">
                  <p>💡 Press Esc to clear all inputs</p>
                  <p>💡 Minimum 3 wallets required</p>
                </div>
              </div>
            ) : showResults ? (
              <div className="space-y-4">
                {/* Results Header */}
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-3 xs:mb-6 gap-2 xs:gap-4">
                  <h3 
                    className="text-base xs:text-lg sm:text-xl text-gray-800/90"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    <span className="hidden xs:inline">Common Tokens ({sortedTokens.length} found)</span>
                    <span className="xs:hidden">Tokens ({sortedTokens.length})</span>
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-xs xs:text-sm flex-shrink-0">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 xs:w-40 bg-white/30 border-white/20 text-xs xs:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priceChange24h">
                          <span className="hidden xs:inline">Price Change %</span>
                          <span className="xs:hidden">Price Change</span>
                        </SelectItem>
                        <SelectItem value="volume24h">Volume</SelectItem>
                        <SelectItem value="marketCap">
                          <span className="hidden xs:inline">Market Cap</span>
                          <span className="xs:hidden">Market Cap</span>
                        </SelectItem>
                        <SelectItem value="currentPrice">
                          <span className="hidden xs:inline">Price</span>
                          <span className="xs:hidden">Price</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="space-y-3 xs:space-y-4">
                  {sortedTokens.map((token, index) => (
                    <Card key={token.mint} className="bg-white/20 backdrop-blur-sm border-white/10 p-3 xs:p-4 sm:p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
                      <div className="flex justify-between items-start mb-3 xs:mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 xs:gap-3 mb-2">
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              #{index + 1}
                            </Badge>
                            <p className="text-xs text-gray-500 font-mono truncate">
                              <span className="hidden xs:inline">{token.mint.slice(0, 8)}...{token.mint.slice(-6)}</span>
                              <span className="xs:hidden">{token.mint.slice(0, 6)}...{token.mint.slice(-4)}</span>
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                            <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                              <p className="text-xs text-gray-600">
                                <span className="hidden xs:inline">Price Change</span>
                                <span className="xs:hidden">Price Change</span>
                              </p>
                              <p className={`text-sm xs:text-base sm:text-lg leading-tight ${token.priceChange24h >= 0 ? 'text-green-600' : 'text-red-500'}`} style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                              </p>
                            </div>
                            
                            <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                              <p className="text-xs text-gray-600">Price</p>
                              <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                ${formatPrice(token.currentPrice)}
                              </p>
                            </div>
                            
                            <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                              <p className="text-xs text-gray-600">Volume</p>
                              <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                ${formatNumber(token.volume24h)}
                              </p>
                            </div>
                            
                            <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                              <p className="text-xs text-gray-600">
                                <span className="hidden xs:inline">Market Cap</span>
                                <span className="xs:hidden">Market Cap</span>
                              </p>
                              <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                ${formatNumber(token.marketCap)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-start">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openInExplorer(token.mint)}
                          className="bg-white/30 hover:bg-white/40 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                        >
                          <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                          <span className="hidden xs:inline">View in Explorer</span>
                          <span className="xs:hidden">Explorer</span>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex items-center justify-center mb-3 xs:mb-4">
                  <div className="w-6 h-6 xs:w-8 xs:h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 
                  className="text-lg xs:text-xl text-gray-800/90 mb-2"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <span className="hidden xs:inline">Finding common tokens...</span>
                  <span className="xs:hidden">Finding tokens...</span>
                </h3>
                <p className="text-xs xs:text-sm text-gray-600">
                  <span className="hidden xs:inline">This may take a few moments as we analyze the wallets</span>
                  <span className="xs:hidden">Analyzing wallets...</span>
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}