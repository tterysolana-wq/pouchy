import { useState, useEffect } from 'react';
import { Plus, X, Search, RotateCcw, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface WalletInput {
  id: string;
  address: string;
  isValid: boolean | null;
}

interface TokenOverlap {
  tokenAddress: string;
  symbol: string;
  overlapScore: number;
  popularity: number;
  winrate: number;
  commonWallets: string[];
}

export function WalletOverlapView() {
  const [wallets, setWallets] = useState<WalletInput[]>([
    { id: '1', address: '', isValid: null },
    { id: '2', address: '', isValid: null },
    { id: '3', address: '', isValid: null },
  ]);
  const [timeframe, setTimeframe] = useState('7D');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('overlapScore');
  const [selectedToken, setSelectedToken] = useState<TokenOverlap | null>(null);

  // Mock results
  const mockResults: TokenOverlap[] = [
    {
      tokenAddress: 'So11111111111111111111111111111111111111112',
      symbol: 'SOL',
      overlapScore: 98,
      popularity: 95,
      winrate: 76.4,
      commonWallets: ['9WzDXwBbmkg...', '2BvkZhSJZt...', 'AqKmFnNvKZ...'],
    },
    {
      tokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      symbol: 'USDC',
      overlapScore: 87,
      popularity: 89,
      winrate: 82.1,
      commonWallets: ['9WzDXwBbmkg...', '2BvkZhSJZt...'],
    },
    {
      tokenAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      symbol: 'RAY',
      overlapScore: 72,
      popularity: 68,
      winrate: 64.8,
      commonWallets: ['9WzDXwBbmkg...', 'AqKmFnNvKZ...'],
    },
  ];

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
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowResults(true);
      toast("Overlap Found! 🔍", {
        description: `Found ${mockResults.length} common tokens across ${validWallets.length} wallets.`,
        duration: 4000,
      });
    } catch (error) {
      toast("Search Failed", {
        description: "Overlap search failed. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const openInAnalyzer = (tokenAddress: string) => {
    // This would navigate to Token Analyzer with pre-filled address
    toast("Opening in Analyzer", {
      description: `Token ${tokenAddress.slice(0, 6)}... will be analyzed.`,
      duration: 3000,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!", {
      description: "Address copied to clipboard.",
      duration: 2000,
    });
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Wallet Overlap 🔍
        </h1>
        <p className="text-gray-600">Find common tokens across multiple wallets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Wallet Inputs */}
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="text-lg text-gray-800/90"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                Wallet Addresses
              </h3>
              <Badge variant="secondary" className={canSearch ? 'bg-green-100/50 text-green-700' : 'bg-orange-100/50 text-orange-700'}>
                {validWalletCount}/3+ valid
              </Badge>
            </div>
            
            <div className="space-y-3">
              {wallets.map((wallet, index) => (
                <div key={wallet.id} className="relative">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-sm text-gray-600">{index + 1}.</span>
                    <Input
                      placeholder={`Wallet ${index + 1} address`}
                      value={wallet.address}
                      onChange={(e) => updateWallet(wallet.id, e.target.value)}
                      className={`flex-1 bg-white/30 border-white/20 ${
                        wallet.isValid === false ? 'border-red-400' : 
                        wallet.isValid === true ? 'border-green-400' : ''
                      }`}
                    />
                    {wallets.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWallet(wallet.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {wallet.isValid === false && (
                    <p className="text-xs text-red-500 mt-1 ml-8">Invalid wallet format</p>
                  )}
                </div>
              ))}
              
              <Button
                variant="secondary"
                onClick={addWallet}
                className="w-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 mt-4"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Wallet
              </Button>
            </div>
          </Card>

          {/* Timeframe */}
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
            <h3 
              className="text-lg text-gray-800/90 mb-4"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Timeframe
            </h3>
            
            <RadioGroup value={timeframe} onValueChange={setTimeframe} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1D" id="1d" />
                <Label htmlFor="1d">1D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3D" id="3d" />
                <Label htmlFor="3d">3D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7D" id="7d" />
                <Label htmlFor="7d">7D</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={findOverlap}
              disabled={!canSearch || isSearching}
              className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0 py-6"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Find Overlap</span>
                </div>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={clearAllWallets}
              className="w-full bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>

          {!canSearch && (
            <Card className="bg-orange-50/30 backdrop-blur-sm border-orange-200/20 p-4">
              <div className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="w-4 h-4" />
                <div>
                  <p className="text-sm font-medium">Need more wallets</p>
                  <p className="text-xs text-orange-600">Add at least 3 valid wallet addresses</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 min-h-[600px]">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl text-gray-800/90 mb-2"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Add 3 or more wallets to find common tokens
                </h3>
                <p className="text-gray-600 mb-4">
                  Enter wallet addresses and we'll find tokens they all hold
                </p>
                <div className="text-sm text-gray-500">
                  <p>💡 Press Esc to clear all inputs</p>
                  <p>💡 Minimum 3 wallets required</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Results Header */}
                <div className="flex justify-between items-center">
                  <h3 
                    className="text-xl text-gray-800/90"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    Common Tokens ({mockResults.length} found)
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 bg-white/30 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overlapScore">Overlap Score</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="winrate">Winrate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="space-y-3">
                  {mockResults.map((token, index) => (
                    <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/10 p-4 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                {token.symbol.charAt(0)}
                              </span>
                            </div>
                            
                            <div>
                              <h4 
                                className="text-lg text-gray-800/90"
                                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                              >
                                {token.symbol}
                              </h4>
                              <p className="text-xs text-gray-600 font-mono">
                                {token.tokenAddress.slice(0, 6)}...{token.tokenAddress.slice(-4)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Overlap Score</p>
                              <Badge variant="secondary" className="bg-purple-100/50 text-purple-700 mt-1">
                                {token.overlapScore}%
                              </Badge>
                            </div>
                            <div>
                              <p className="text-gray-600">Popularity</p>
                              <p className="text-gray-800/90 mt-1">{token.popularity}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Winrate</p>
                              <p className="text-green-600 mt-1">{token.winrate}%</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs text-gray-600 mb-1">
                              Common in {token.commonWallets.length} wallets
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {token.commonWallets.map((wallet, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {wallet}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white/30 hover:bg-white/40"
                                onClick={() => setSelectedToken(token)}
                              >
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white/95 backdrop-blur-sm">
                              <DialogHeader>
                                <DialogTitle style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                                  {selectedToken?.symbol} Token Details
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Token Address</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Input
                                      value={selectedToken?.tokenAddress || ''}
                                      readOnly
                                      className="font-mono text-sm"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(selectedToken?.tokenAddress || '')}
                                    >
                                      Copy
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Overlap Score</Label>
                                    <p className="text-2xl text-purple-600 mt-1">{selectedToken?.overlapScore}%</p>
                                  </div>
                                  <div>
                                    <Label>Winrate</Label>
                                    <p className="text-2xl text-green-600 mt-1">{selectedToken?.winrate}%</p>
                                  </div>
                                </div>

                                <Button
                                  onClick={() => openInAnalyzer(selectedToken?.tokenAddress || '')}
                                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                                >
                                  Open in Analyzer
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(token.tokenAddress)}
                              className="p-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast("Opening Axiom", { description: "Redirecting to Axiom platform...", duration: 2000 })}
                              className="text-xs px-2 py-1 text-purple-600 hover:text-purple-700"
                            >
                              Buy Axiom
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast("Opening GMGN", { description: "Redirecting to GMGN platform...", duration: 2000 })}
                              className="text-xs px-2 py-1 text-green-600 hover:text-green-700"
                            >
                              Buy GMGN
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast("Opening Dex Screener", { description: "Viewing token on Dex Screener...", duration: 2000 })}
                              className="text-xs px-2 py-1 text-blue-600 hover:text-blue-700"
                            >
                              Dex Screener
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}