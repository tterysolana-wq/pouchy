import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, RefreshCw, AlertCircle, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface TrendingToken {
  id: number;
  chain: string;
  address: string;
  symbol: string;
  logo: string;
  price: number;
  price_change_percent: number;
  swaps: number;
  volume: number;
  liquidity: number;
  market_cap: number;
  hot_level: number;
  holder_count: number;
  twitter_username?: string;
  website?: string;
  total_supply: number;
  open_timestamp: number;
  open_date: string;
  price_change_percent1m: number;
  price_change_percent5m: number;
  price_change_percent1h: number;
  buys: number;
  sells: number;
  buy_sell_ratio: string;
  initial_liquidity: number;
  liquidity_change: string;
  is_show_alert: boolean;
  top_10_holder_rate: number;
  renounced_mint: number;
  renounced_freeze_account: number;
  burn_ratio: number;
  burn_status: string;
  launchpad: string;
  dev_token_burn_amount: number;
  dev_token_burn_ratio: number;
  dexscr_ad: number;
  dexscr_update_link: number;
  cto_flag: number;
  twitter_change_flag: number;
  creator_token_status: string;
  creator_close: boolean;
  launchpad_status: string;
  rat_trader_amount_rate: number;
  bluechip_owner_percentage: number;
  smart_degen_count: number;
  renowned_count: number;
  rug_ratio: number;
  is_wash_trading: boolean;
  volume_to_liquidity_ratio: string;
  price_performance_score: string;
}

export function CTOTrendingView() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('price_change_percent');
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([]);

  const detectTrending = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://ggunktueytmayrkskgbk.supabase.co/functions/v1/trending-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndW5rdHVleXRtYXlya3NrZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDAxMTMsImV4cCI6MjA3MzE3NjExM30.8yBN3AEagH-T8kXhghGaMxALkMC4lLqDoKQqrTjAFOY',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const response_data = await response.json();
      
      // Handle the API response structure { success: true, data: [...] }
      const tokensArray = response_data.success && Array.isArray(response_data.data) 
        ? response_data.data 
        : [];
      
      setTrendingTokens(tokensArray);
      setShowResults(true);
      setLastScanTime(new Date());
      
      toast("Trending Tokens Loaded! 📈", {
        description: `Found ${tokensArray.length} trending token${tokensArray.length !== 1 ? 's' : ''}.`,
        duration: 4000,
      });
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      toast("Failed to Load Trending Tokens", {
        description: "Unable to fetch trending tokens. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openInExplorer = (tokenAddress: string) => {
    window.open(`https://explorer.solana.com/address/${tokenAddress}`, '_blank');
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

  const getRiskColor = (hotLevel: number) => {
    if (hotLevel >= 4) return 'bg-red-100/50 text-red-700';
    if (hotLevel >= 2) return 'bg-yellow-100/50 text-yellow-700';
    return 'bg-green-100/50 text-green-700';
  };

  const getRiskLabel = (hotLevel: number) => {
    if (hotLevel >= 4) return 'high';
    if (hotLevel >= 2) return 'medium';
    return 'low';
  };

  const calculateDaysFromTimestamp = (timestamp: number) => {
    const now = Date.now();
    const tokenDate = timestamp * 1000; // Convert to milliseconds
    const diffMs = now - tokenDate;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Initial load only
  useEffect(() => {
    const timer = setTimeout(() => {
      detectTrending();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const sortedTokens = [...trendingTokens].sort((a, b) => {
    switch (sortBy) {
      case 'price_change_percent':
        return b.price_change_percent - a.price_change_percent;
      case 'volume':
        return b.volume - a.volume;
      case 'market_cap':
        return b.market_cap - a.market_cap;
      case 'hot_level':
        return b.hot_level - a.hot_level;
      case 'holder_count':
        return b.holder_count - a.holder_count;
      case 'days_old':
        const aDays = calculateDaysFromTimestamp(a.open_timestamp);
        const bDays = calculateDaysFromTimestamp(b.open_timestamp);
        return bDays - aDays;
      default:
        return b.price_change_percent - a.price_change_percent;
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
            <span className="hidden xs:inline">Discover trending tokens with sudden activity</span>
            <span className="xs:hidden">Discover trending tokens with sudden activity</span>
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
            <span className="hidden xs:inline">{isLoading ? 'Loading...' : 'Refresh'}</span>
            <span className="xs:hidden">{isLoading ? 'Loading...' : 'Refresh'}</span>
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
                  <span className="hidden xs:inline">Trending Tokens</span>
                  <span className="xs:hidden">Trending Tokens</span>
                </span>
              </div>
              
              <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 text-xs">
                {showResults ? (
                  <span>
                    <span className="hidden xs:inline">{trendingTokens.length} Active</span>
                    <span className="xs:hidden">{trendingTokens.length} Active</span>
                  </span>
                ) : 'Loading...'}
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
                      <SelectItem value="price_change_percent">
                        <span className="hidden xs:inline">Price Change %</span>
                        <span className="xs:hidden">Price Change</span>
                      </SelectItem>
                      <SelectItem value="volume">
                        <span className="hidden xs:inline">Volume</span>
                        <span className="xs:hidden">Volume</span>
                      </SelectItem>
                      <SelectItem value="market_cap">
                        <span className="hidden xs:inline">Market Cap</span>
                        <span className="xs:hidden">Market Cap</span>
                      </SelectItem>
                      <SelectItem value="hot_level">
                        <span className="hidden xs:inline">Hot Level</span>
                        <span className="xs:hidden">Hot Level</span>
                      </SelectItem>
                      <SelectItem value="holder_count">
                        <span className="hidden xs:inline">Holders</span>
                        <span className="xs:hidden">Holders</span>
                      </SelectItem>
                      <SelectItem value="days_old">
                        <span className="hidden xs:inline">Age (Days)</span>
                        <span className="xs:hidden">Age</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Loading Progress */}
          {isLoading && (
            <div className="mt-3 xs:mt-4">
              <div className="flex items-center justify-between text-xs xs:text-sm text-gray-600 mb-2">
                <span className="truncate pr-2">
                  <span className="hidden xs:inline">Loading trending tokens...</span>
                  <span className="xs:hidden">Loading trending tokens...</span>
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
                No trending tokens loaded yet
              </h3>
              <p className="text-gray-600 mb-4">
                Click refresh to load the latest trending tokens!
              </p>
              <div className="text-sm text-gray-500">
                <p>💡 Tokens appear here when showing unusual activity</p>
                <p>💡 Focus on tokens with high hot levels and price changes</p>
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
                    <span className="hidden xs:inline">Sorted by {sortBy.replace('_', ' ')}</span>
                    <span className="xs:hidden">Sorted by {sortBy.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {sortedTokens.map((token, index) => (
                  <Card key={token.address} className="bg-white/20 backdrop-blur-sm border-white/10 p-3 xs:p-4 sm:p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
                    <div className="flex justify-between items-start mb-3 xs:mb-4">
                      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 xs:gap-2 mb-1">
                            <h4 
                              className="text-base xs:text-lg sm:text-xl text-gray-800/90 flex-shrink-0"
                              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                            >
                              {token.symbol}
                            </h4>
                            <Badge variant="secondary" className={`${getRiskColor(token.hot_level)} text-xs flex-shrink-0`}>
                              <span className="hidden xs:inline">{getRiskLabel(token.hot_level)} risk</span>
                              <span className="xs:hidden">{getRiskLabel(token.hot_level)}</span>
                            </Badge>
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              #{index + 1}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 font-mono truncate">
                            <span className="hidden xs:inline">{token.address.slice(0, 8)}...{token.address.slice(-6)}</span>
                            <span className="xs:hidden">{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500">
                          <span className="hidden xs:inline">Hot Level: {token.hot_level}</span>
                          <span className="xs:hidden">Hot: {token.hot_level}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="hidden xs:inline">{calculateDaysFromTimestamp(token.open_timestamp)} days old</span>
                          <span className="xs:hidden">{calculateDaysFromTimestamp(token.open_timestamp)}d old</span>
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">
                          <span className="hidden xs:inline">Price Change</span>
                          <span className="xs:hidden">Price Change</span>
                        </p>
                        <p className={`text-sm xs:text-base sm:text-lg leading-tight ${token.price_change_percent >= 0 ? 'text-green-600' : 'text-red-500'}`} style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          {token.price_change_percent >= 0 ? '+' : ''}{token.price_change_percent.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">Volume</p>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          ${formatNumber(token.volume)}
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">Market Cap</p>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          ${formatNumber(token.market_cap)}
                        </p>
                      </div>
                      
                      <div className="text-center p-2 xs:p-3 bg-white/20 rounded-md xs:rounded-lg">
                        <p className="text-xs text-gray-600">Holders</p>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-800/90 leading-tight" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                          {formatNumber(token.holder_count)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons and Launchpad Tag */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openInExplorer(token.address)}
                        className="bg-white/30 hover:bg-white/40 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-h-[32px] xs:min-h-[36px]"
                      >
                        <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                        <span className="hidden xs:inline">View in Explorer</span>
                        <span className="xs:hidden">Explorer</span>
                      </Button>
                      
                      <Badge 
                        variant="secondary" 
                        className="bg-purple-100/50 text-purple-700 text-xs xs:text-sm px-2 xs:px-3 py-1 capitalize"
                      >
                        📊 {token.launchpad}
                      </Badge>
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
                Loading trending tokens...
              </h3>
              <p className="text-gray-600">
                This may take a few moments as we fetch the latest data
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}