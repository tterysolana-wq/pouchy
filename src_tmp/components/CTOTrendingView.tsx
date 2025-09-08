import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, RefreshCw, AlertCircle, Clock, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface TrendingToken {
  tokenAddress: string;
  symbol: string;
  name: string;
  deployedDaysAgo: number;
  accumulationChange: number;
  volume24h: number;
  holders: number;
  priceChange24h: number;
  accumulationWallets: string[];
  riskLevel: 'low' | 'medium' | 'high';
  detectedAt: string;
}

export function CTOTrendingView() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('accumulationChange');
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock trending tokens data
  const mockTrendingTokens: TrendingToken[] = [
    {
      tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      symbol: 'BONK',
      name: 'Bonk',
      deployedDaysAgo: 156,
      accumulationChange: 245.8,
      volume24h: 12500000,
      holders: 89234,
      priceChange24h: 18.4,
      accumulationWallets: ['9WzDXwBbmkg...', '2BvkZhSJZt...', 'AqKmFnNvKZ...', '7TYKvN2T9x...'],
      riskLevel: 'low',
      detectedAt: '2 hours ago',
    },
    {
      tokenAddress: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
      symbol: 'JTO',
      name: 'Jito',
      deployedDaysAgo: 89,
      accumulationChange: 156.7,
      volume24h: 8900000,
      holders: 34567,
      priceChange24h: 12.3,
      accumulationWallets: ['3FhYrRv8Du...', 'BnKqY7L9mW...', '8VxC2N4pTr...'],
      riskLevel: 'medium',
      detectedAt: '5 hours ago',
    },
    {
      tokenAddress: 'So11111111111111111111111111111111111111112',
      symbol: 'SOL',
      name: 'Solana',
      deployedDaysAgo: 1832,
      accumulationChange: 89.2,
      volume24h: 145000000,
      holders: 1234567,
      priceChange24h: 5.8,
      accumulationWallets: ['4KfY8bN3Lm...', '9ZxW7R5pQd...'],
      riskLevel: 'low',
      detectedAt: '1 hour ago',
    },
  ];

  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([]);

  const detectTrending = async () => {
    setIsLoading(true);
    
    try {
      // Simulate blockchain scanning
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      setTrendingTokens(mockTrendingTokens);
      setShowResults(true);
      setLastScanTime(new Date());
      
      toast("Scan Complete! 📈", {
        description: `Detected ${mockTrendingTokens.length} tokens with unusual accumulation patterns.`,
        duration: 4000,
      });
    } catch (error) {
      toast("Scan Failed", {
        description: "Unable to fetch trending tokens. Please retry.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openInExplorer = (tokenAddress: string) => {
    // Simulate opening in explorer
    toast("Opening Explorer", {
      description: `Opening ${tokenAddress.slice(0, 6)}... in Solana Explorer.`,
      duration: 3000,
    });
  };

  const sendToAnalyzer = (tokenAddress: string) => {
    // This would navigate to Token Analyzer with pre-filled address
    toast("Sending to Analyzer", {
      description: `Token ${tokenAddress.slice(0, 6)}... will be analyzed.`,
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100/50 text-green-700';
      case 'medium': return 'bg-yellow-100/50 text-yellow-700';
      case 'high': return 'bg-red-100/50 text-red-700';
      default: return 'bg-gray-100/50 text-gray-700';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !showResults) return;
    
    const interval = setInterval(() => {
      detectTrending();
    }, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [autoRefresh, showResults]);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showResults) {
        detectTrending();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const sortedTokens = [...trendingTokens].sort((a, b) => {
    switch (sortBy) {
      case 'accumulationChange':
        return b.accumulationChange - a.accumulationChange;
      case 'volume24h':
        return b.volume24h - a.volume24h;
      case 'priceChange24h':
        return b.priceChange24h - a.priceChange24h;
      case 'deployedDaysAgo':
        return b.deployedDaysAgo - a.deployedDaysAgo;
      default:
        return b.accumulationChange - a.accumulationChange;
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
            <span className="hidden xs:inline">CTO Trending 📈</span>
            <span className="xs:hidden">Trending 📈</span>
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">
            <span className="hidden xs:inline">Discover old tokens showing sudden accumulation activity</span>
            <span className="xs:hidden">Discover old tokens showing sudden accumulation activity</span>
          </p>
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
          {lastScanTime && (
            <div className="text-xs xs:text-sm text-gray-600 text-left xs:text-right">
              <p>Last scan: 
                <span className="hidden xs:inline"> {lastScanTime.toLocaleTimeString()}</span>
                <span className="xs:hidden"> {lastScanTime.toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}</span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs">{autoRefresh ? 'Auto-refreshing' : 'Manual mode'}</span>
              </div>
            </div>
          )}

          <Button
            onClick={detectTrending}
            disabled={isLoading}
            variant="secondary"
            className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 text-xs xs:text-sm px-3 py-2 min-h-[40px] xs:min-h-[44px] w-full xs:w-auto"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            <RefreshCw className={`w-3 h-3 xs:w-4 xs:h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">{isLoading ? 'Scanning...' : 'Refresh Scan'}</span>
            <span className="xs:hidden">{isLoading ? 'Scanning...' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {/* Control Panel */}
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-3 xs:p-4 sm:p-6">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-4">
            <div className="flex items-center gap-2 xs:gap-4">
              <div className="flex items-center gap-1 xs:gap-2">
                <Activity className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                <span 
                  className="text-sm xs:text-base sm:text-lg text-gray-800/90"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <span className="hidden xs:inline">Live Monitoring</span>
                  <span className="xs:hidden">Live Monitoring</span>
                </span>
              </div>
              
              <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 text-xs">
                {showResults ? (
                  <span>
                    <span className="hidden xs:inline">{trendingTokens.length} Active</span>
                    <span className="xs:hidden">{trendingTokens.length} Active</span>
                  </span>
                ) : 'Scanning...'}
              </Badge>
            </div>

            {showResults && (
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 w-full xs:w-auto">
                <div className="flex items-center gap-2 flex-1 xs:flex-none">
                  <span className="text-xs xs:text-sm text-gray-600 flex-shrink-0">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full xs:w-32 sm:w-40 bg-white/30 border-white/20 text-xs xs:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accumulationChange">
                        <span className="hidden xs:inline">Accumulation Change</span>
                        <span className="xs:hidden">Accumulation C.</span>
                      </SelectItem>
                      <SelectItem value="volume24h">
                        <span className="hidden xs:inline">24h Volume</span>
                        <span className="xs:hidden">24h Volume</span>
                      </SelectItem>
                      <SelectItem value="priceChange24h">
                        <span className="hidden xs:inline">Price Change</span>
                        <span className="xs:hidden">Price Change</span>
                      </SelectItem>
                      <SelectItem value="deployedDaysAgo">
                        <span className="hidden xs:inline">Age (Days)</span>
                        <span className="xs:hidden">Age</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant={autoRefresh ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="px-2 xs:px-3 text-xs xs:text-sm min-h-[36px] xs:min-h-[40px] w-full xs:w-auto"
                >
                  <Clock className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                  Auto
                </Button>
              </div>
            )}
          </div>

          {/* Scanning Progress */}
          {isLoading && (
            <div className="mt-3 xs:mt-4">
              <div className="flex items-center justify-between text-xs xs:text-sm text-gray-600 mb-2">
                <span className="truncate pr-2">
                  <span className="hidden xs:inline">Scanning blockchain for trending accumulation...</span>
                  <span className="xs:hidden">Scanning blockchain...</span>
                </span>
                <span className="flex-shrink-0">Please wait</span>
              </div>
              <Progress value={85} className="w-full h-2" />
            </div>
          )}
        </Card>

        {/* Results */}
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-3 xs:p-4 sm:p-6 min-h-[500px] xs:min-h-[600px]">
          {!showResults && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-red-300 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 
                className="text-xl text-gray-800/90 mb-2"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                No trending tokens detected at the moment
              </h3>
              <p className="text-gray-600 mb-4">
                Check back soon! We're continuously monitoring for accumulation patterns.
              </p>
              <div className="text-sm text-gray-500">
                <p>💡 Tokens appear here when showing unusual buying activity</p>
                <p>💡 Focus on older deployed tokens with sudden momentum</p>
              </div>
            </div>
          ) : showResults ? (
            <div className="space-y-4">
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-4 xs:mb-6 gap-2 xs:gap-4">
                <h3 
                  className="text-lg xs:text-xl text-gray-800/90"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <span className="hidden xs:inline">Trending Tokens ({sortedTokens.length})</span>
                  <span className="xs:hidden">Trending Tokens ({sortedTokens.length})</span>
                </h3>
                <div className="flex items-center gap-1 xs:gap-2">
                  <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs xs:text-sm text-gray-600">
                    <span className="hidden xs:inline">Sorted by accumulation change</span>
                    <span className="xs:hidden">Sorted by accumulation change</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {sortedTokens.map((token, index) => (
                  <Card key={token.tokenAddress} className="bg-white/20 backdrop-blur-sm border-white/10 p-3 xs:p-4 sm:p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
                    <div className="flex justify-between items-start mb-3 xs:mb-4">
                      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-300 to-red-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm xs:text-base" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 xs:gap-2 mb-1">
                            <h4 
                              className="text-base xs:text-lg sm:text-xl text-gray-800/90 flex-shrink-0"
                              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                            >
                              {token.symbol}
                            </h4>
                            <Badge variant="secondary" className={`${getRiskColor(token.riskLevel)} text-xs flex-shrink-0`}>
                              <span className="hidden xs:inline">{token.riskLevel} risk</span>
                              <span className="xs:hidden">{token.riskLevel}</span>
                            </Badge>
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              #{index + 1}
                            </Badge>
                          </div>
                          <p className="text-sm xs:text-base text-gray-600 truncate">{token.name}</p>
                          <p className="text-xs text-gray-500 font-mono truncate">
                            <span className="hidden xs:inline">{token.tokenAddress.slice(0, 8)}...{token.tokenAddress.slice(-6)}</span>
                            <span className="xs:hidden">{token.tokenAddress.slice(0, 6)}...{token.tokenAddress.slice(-4)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-xs xs:text-sm text-gray-600">
                          <span className="hidden xs:inline">Detected</span> {token.detectedAt}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="hidden xs:inline">Deployed {token.deployedDaysAgo} days ago</span>
                          <span className="xs:hidden">{token.deployedDaysAgo}d ago</span>
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">
                          <span className="hidden xs:inline">Accumulation</span>
                          <span className="xs:hidden">Accumulation</span>
                        </p>
                        <p className="text-sm xs:text-base sm:text-lg text-orange-600 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          +{token.accumulationChange.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">24h Volume</p>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          ${formatNumber(token.volume24h)}
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">Price Change</p>
                        <p className={`text-sm xs:text-base sm:text-lg leading-tight ${token.priceChange24h >= 0 ? 'text-green-600' : 'text-red-500'}`} style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">Holders</p>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          {formatNumber(token.holders)}
                        </p>
                      </div>
                    </div>

                    {/* Accumulation Wallets */}
                    <div className="mb-3 xs:mb-4">
                      <p className="text-xs xs:text-sm text-gray-600 mb-2">
                        <span className="hidden xs:inline">Active Accumulation Wallets ({token.accumulationWallets.length})</span>
                        <span className="xs:hidden">Accumulation Wallets ({token.accumulationWallets.length})</span>
                      </p>
                      <div className="flex flex-wrap gap-1 xs:gap-2">
                        {token.accumulationWallets.map((wallet, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-mono px-1 xs:px-2">
                            <span className="hidden xs:inline">{wallet}</span>
                            <span className="xs:hidden">{wallet.slice(0, 6)}...</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openInExplorer(token.tokenAddress)}
                        className="bg-white/30 hover:bg-white/40 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                      >
                        <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                        <span className="hidden xs:inline">View in Explorer</span>
                        <span className="xs:hidden">Explorer</span>
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => sendToAnalyzer(token.tokenAddress)}
                        className="bg-blue-100/30 hover:bg-blue-100/40 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                      >
                        <TrendingUp className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                        <span className="hidden xs:inline">Send to Analyzer</span>
                        <span className="xs:hidden">Analyzer</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(token.tokenAddress)}
                        className="text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                      >
                        <span className="hidden xs:inline">Copy Address</span>
                        <span className="xs:hidden">Copy</span>
                      </Button>

                      {/* New action buttons - Show only 2 most important on mobile */}
                      <div className="hidden xs:contents">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => toast("Opening Axiom", { description: "Redirecting to Axiom platform...", duration: 2000 })}
                          className="bg-purple-100/30 hover:bg-purple-100/40 text-purple-700 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                        >
                          Buy Axiom
                        </Button>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => toast("Opening GMGN", { description: "Redirecting to GMGN platform...", duration: 2000 })}
                          className="bg-green-100/30 hover:bg-green-100/40 text-green-700 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                        >
                          Buy GMGN
                        </Button>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => toast("Opening Dex Screener", { description: "Viewing token on Dex Screener...", duration: 2000 })}
                          className="bg-blue-100/30 hover:bg-blue-100/40 text-blue-700 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                        >
                          Dex Screener
                        </Button>
                      </div>

                      {/* Mobile - Only show most important actions */}
                      <div className="xs:hidden">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => toast("Opening GMGN", { description: "Redirecting to GMGN platform...", duration: 2000 })}
                          className="bg-green-100/30 hover:bg-green-100/40 text-green-700 text-xs px-2 py-1 min-h-[32px]"
                        >
                          GMGN
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 
                className="text-xl text-gray-800/90 mb-2"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                Scanning blockchain for trending accumulation...
              </h3>
              <p className="text-gray-600">
                This may take a few moments as we analyze on-chain data
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}