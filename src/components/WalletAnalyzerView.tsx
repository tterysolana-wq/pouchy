import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Play, RotateCcw, Download, Info, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner@2.0.3';

// API interfaces
interface RequestParams {
  winrate: number;
  avg_hold: number;
  avg_cost: number;
  min_pnl_1d: number;
  min_pnl_7d: number;
  min_pnl_30d: number;
}

interface WalletData {
  wallet_address: string;
  winrate_7d: number;
  avg_holding_period_7d: number;
  avg_holding_period_hours: number;
  winrate_percentage: number;
  pnl_1d: number;
  pnl_7d: number;
  pnl_30d: number;
  avg_cost_7d: number;
  realized_profit: number;
  buy_count: number;
  sell_count: number;
  total_txs: number;
  balance: number;
  last_active: number;
  last_active_date: string;
}

interface ApiResponse {
  success: boolean;
  summary: {
    total_wallets_found: number;
    filtered_wallets: number;
    filter_criteria: any;
    execution_time: string;
    test_mode: boolean;
  };
  data: WalletData[];
}

export function WalletAnalyzerView() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [apiResults, setApiResults] = useState<WalletData[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states with updated defaults
  const [winrateFilter, setWinrateFilter] = useState([50]);
  const [avgHoldFilter, setAvgHoldFilter] = useState([24]);
  const [avgCostFilter, setAvgCostFilter] = useState([1000]);
  const [pnl1DFilter, setPnl1DFilter] = useState([0]);
  const [pnl7DFilter, setPnl7DFilter] = useState([0]);
  const [pnl30DFilter, setPnl30DFilter] = useState([0]);

  // Result states
  const [sortBy, setSortBy] = useState('winrate');
  const [viewType, setViewType] = useState<'table' | 'cards'>('table');

  // Sort the API results based on the selected sort field
  const sortedResults = React.useMemo(() => {
    if (!apiResults || apiResults.length === 0) return [];

    const sorted = [...apiResults].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case 'winrate':
          aValue = a.winrate_percentage;
          bValue = b.winrate_percentage;
          break;
        case 'pnl1D':
          aValue = a.pnl_1d;
          bValue = b.pnl_1d;
          break;
        case 'pnl7D':
          aValue = a.pnl_7d;
          bValue = b.pnl_7d;
          break;
        case 'pnl30D':
          aValue = a.pnl_30d;
          bValue = b.pnl_30d;
          break;
        case 'avgHold':
          aValue = a.avg_holding_period_hours;
          bValue = b.avg_holding_period_hours;
          break;
        case 'avgCost':
          aValue = a.avg_cost_7d;
          bValue = b.avg_cost_7d;
          break;
        default:
          aValue = a.winrate_percentage;
          bValue = b.winrate_percentage;
      }

      // Sort in descending order (highest first)
      return bValue - aValue;
    });

    return sorted;
  }, [apiResults, sortBy]);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Prepare API request parameters
      const requestParams: RequestParams = {
        winrate: winrateFilter[0],
        avg_hold: avgHoldFilter[0],
        avg_cost: avgCostFilter[0],
        min_pnl_1d: pnl1DFilter[0],
        min_pnl_7d: pnl7DFilter[0],
        min_pnl_30d: pnl30DFilter[0],
      };

      // Call Supabase Edge Function
      const response = await fetch('https://ggunktueytmayrkskgbk.supabase.co/functions/v1/top-trader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndW5rdHVleXRtYXlya3NrZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDAxMTMsImV4cCI6MjA3MzE3NjExM30.8yBN3AEagH-T8kXhghGaMxALkMC4lLqDoKQqrTjAFOY',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndW5rdHVleXRtYXlya3NrZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDAxMTMsImV4cCI6MjA3MzE3NjExM30.8yBN3AEagH-T8kXhghGaMxALkMC4lLqDoKQqrTjAFOY',
        },
        body: JSON.stringify(requestParams),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const apiResponse: ApiResponse = await response.json();
      
      if (!apiResponse.success) {
        throw new Error('API returned unsuccessful response');
      }
      
      setApiResults(apiResponse.data);
      setShowResults(true);
      
      toast("Analysis Complete! 📊", {
        description: `Found ${apiResponse.data.length} wallets matching your criteria.`,
        duration: 4000,
      });
    } catch (error) {
      console.error('API Error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      toast("Analysis Failed", {
        description: "Failed to fetch wallet data. Please check your connection and try again.",
        duration: 4000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetFilters = () => {
    setWinrateFilter([50]);
    setAvgHoldFilter([24]);
    setAvgCostFilter([1000]);
    setPnl1DFilter([0]);
    setPnl7DFilter([0]);
    setPnl30DFilter([0]);
    
    toast("Filters Reset", {
      description: "All filters have been reset to defaults.",
      duration: 2000,
    });
  };

  const handleExportCSV = () => {
    if (!showResults || apiResults.length === 0) return;
    
    // Prepare CSV data
    const headers = ['Wallet', 'Winrate (%)', '1D PnL (%)', '7D PnL (%)', '30D PnL (%)', 'Avg Hold (h)', 'Avg Cost (USD)'];
    const csvData = [
      headers.join(','),
      ...sortedResults.map(result => [
        result.wallet_address,
        result.winrate_percentage,
        result.pnl_1d,
        result.pnl_7d,
        result.pnl_30d,
        result.avg_holding_period_hours,
        result.avg_cost_7d
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `wallet_analysis_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast("CSV Downloaded! 📥", {
      description: "Wallet analysis data has been exported to CSV.",
      duration: 3000,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!", {
      description: "Wallet address copied to clipboard.",
      duration: 2000,
    });
  };

  const openSolscan = (walletAddress: string) => {
    window.open(`https://solscan.io/account/${walletAddress}`, '_blank');
    toast("Opening Solscan", {
      description: "Viewing wallet on Solscan...",
      duration: 2000,
    });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleRunAnalysis();
      }
      if (e.key === 'Escape') {
        setShowResults(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Wallet Analyzer 💰
        </h1>
        <p className="text-gray-600">Analyze wallet performance and trading patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
            <h3 
              className="text-lg text-gray-800/90 mb-4"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Filters
            </h3>
            
            <div className="space-y-6">
              {/* Winrate Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Winrate ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={winrateFilter[0]}
                      onChange={(e) => setWinrateFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={winrateFilter}
                  onValueChange={setWinrateFilter}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>

              {/* Avg Hold Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Avg Hold ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={avgHoldFilter[0]}
                      onChange={(e) => setAvgHoldFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="168"
                    />
                    <span className="text-sm text-gray-600">h</span>
                  </div>
                </div>
                <Slider
                  value={avgHoldFilter}
                  onValueChange={setAvgHoldFilter}
                  max={168}
                  min={0}
                  step={1}
                />
              </div>

              {/* Avg Cost Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Avg Cost ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={avgCostFilter[0]}
                      onChange={(e) => setAvgCostFilter([Number(e.target.value)])}
                      className="w-20 h-8 text-sm bg-white/30"
                      min="0"
                    />
                    <span className="text-sm text-gray-600">USD</span>
                  </div>
                </div>
                <Slider
                  value={avgCostFilter}
                  onValueChange={setAvgCostFilter}
                  max={10000}
                  min={0}
                  step={50}
                />
              </div>

              {/* Min 1D PnL Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Min 1D PnL ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pnl1DFilter[0]}
                      onChange={(e) => setPnl1DFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={pnl1DFilter}
                  onValueChange={setPnl1DFilter}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>

              {/* Min 7D PnL Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Min 7D PnL ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pnl7DFilter[0]}
                      onChange={(e) => setPnl7DFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={pnl7DFilter}
                  onValueChange={setPnl7DFilter}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>

              {/* Min 30D PnL Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Min 30D PnL ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pnl30DFilter[0]}
                      onChange={(e) => setPnl30DFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={pnl30DFilter}
                  onValueChange={setPnl30DFilter}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0 py-6"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Run Analysis</span>
                </div>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={handleResetFilters}
              className="w-full bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>

            <Button
              variant="secondary"
              onClick={handleExportCSV}
              disabled={!showResults || sortedResults.length === 0}
              className="w-full bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 disabled:opacity-50"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 min-h-[600px] lg:h-[600px] lg:max-h-[600px] lg:flex lg:flex-col">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl text-gray-800/90 mb-2"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Set your filters and run wallet analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Configure your filters and click "Run Analysis" to find wallets
                </p>
                <div className="text-sm text-gray-500">
                  <p>💡 Press Enter to run analysis</p>
                  <p>💡 Press Esc to reset</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 lg:flex lg:flex-col lg:flex-1 lg:overflow-hidden">
                {/* Results Header */}
                <div className="flex justify-between items-center lg:flex-shrink-0">
                  <h3 
                    className="text-xl text-gray-800/90"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    Analysis Results ({apiResults.length} wallets)
                  </h3>
                  
                  <div className="flex items-center gap-4">
                    {/* Sort Controls */}
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Sort by:</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32 bg-white/30 border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="winrate">Winrate</SelectItem>
                          <SelectItem value="pnl1D">1D PnL</SelectItem>
                          <SelectItem value="pnl7D">7D PnL</SelectItem>
                          <SelectItem value="pnl30D">30D PnL</SelectItem>
                          <SelectItem value="avgHold">Avg Hold</SelectItem>
                          <SelectItem value="avgCost">Avg Cost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewType === 'table' ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setViewType('table')}
                        className="px-3"
                      >
                        Table
                      </Button>
                      <Button
                        variant={viewType === 'cards' ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setViewType('cards')}
                        className="px-3"
                      >
                        Cards
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Results Table/Cards */}
                <div className="lg:flex-1 lg:overflow-hidden">
                  {viewType === 'table' ? (
                    <div className="bg-white/20 rounded-lg overflow-hidden lg:h-full lg:flex lg:flex-col">
                      <div className="lg:flex-shrink-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/20">
                              <TableHead>Wallet</TableHead>
                              <TableHead>Winrate</TableHead>
                              <TableHead>1D PnL</TableHead>
                              <TableHead>7D PnL</TableHead>
                              <TableHead>30D PnL</TableHead>
                              <TableHead>Avg Hold</TableHead>
                              <TableHead>Avg Cost</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                        </Table>
                      </div>
                      <div className="lg:flex-1 lg:overflow-y-auto">
                        <Table>
                          <TableBody>
                            {error ? (
                              <TableRow>
                                <TableCell colSpan={8} className="text-center text-red-600 py-8">
                                  Error: {error}
                                </TableCell>
                              </TableRow>
                            ) : sortedResults.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                                  No wallets found matching your criteria
                                </TableCell>
                              </TableRow>
                            ) : (
                              sortedResults.map((result, index) => (
                                <TableRow key={index} className="border-white/20">
                                  <TableCell className="font-mono text-sm">
                                    <button
                                      onClick={() => openSolscan(result.wallet_address)}
                                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                    >
                                      {result.wallet_address.slice(0, 6)}...{result.wallet_address.slice(-4)}
                                    </button>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary" className="bg-green-100/50 text-green-700">
                                      {result.winrate_percentage}%
                                    </Badge>
                                  </TableCell>
                                  <TableCell className={`${result.pnl_1d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.pnl_1d >= 0 ? '+' : ''}{result.pnl_1d.toFixed(1)}%
                                  </TableCell>
                                  <TableCell className={`${result.pnl_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.pnl_7d >= 0 ? '+' : ''}{result.pnl_7d.toFixed(1)}%
                                  </TableCell>
                                  <TableCell className={`${result.pnl_30d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.pnl_30d >= 0 ? '+' : ''}{result.pnl_30d.toFixed(1)}%
                                  </TableCell>
                                  <TableCell>{result.avg_holding_period_hours.toFixed(1)}h</TableCell>
                                  <TableCell>${result.avg_cost_7d.toFixed(0)}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(result.wallet_address)}
                                        className="p-1"
                                      >
                                        Copy
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openSolscan(result.wallet_address)}
                                        className="p-1 text-blue-600 hover:text-blue-700"
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 lg:h-full lg:overflow-y-auto lg:pr-2">
                      {error ? (
                        <Card className="bg-white/20 backdrop-blur-sm border-white/10 p-8 text-center">
                          <p className="text-red-600">Error: {error}</p>
                        </Card>
                      ) : sortedResults.length === 0 ? (
                        <Card className="bg-white/20 backdrop-blur-sm border-white/10 p-8 text-center">
                          <p className="text-gray-500">No wallets found matching your criteria</p>
                        </Card>
                      ) : (
                        sortedResults.map((result, index) => (
                          <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/10 p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <button
                                  onClick={() => openSolscan(result.wallet_address)}
                                  className="font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                >
                                  {result.wallet_address.slice(0, 12)}...{result.wallet_address.slice(-8)}
                                </button>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="bg-green-100/50 text-green-700">
                                    {result.winrate_percentage}% WR
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.wallet_address)}
                                  title="Copy wallet address"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openSolscan(result.wallet_address)}
                                  title="View on Solscan"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  View
                                </Button>
                              </div>
                            </div>
            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">1D PnL</p>
                                <p className={`${result.pnl_1d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {result.pnl_1d >= 0 ? '+' : ''}{result.pnl_1d.toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">7D PnL</p>  
                                <p className={`${result.pnl_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {result.pnl_7d >= 0 ? '+' : ''}{result.pnl_7d.toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">30D PnL</p>
                                <p className={`${result.pnl_30d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {result.pnl_30d >= 0 ? '+' : ''}{result.pnl_30d.toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Hold Time</p>
                                <p>{result.avg_holding_period_hours.toFixed(1)}h</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Avg Cost</p>
                                <p>${result.avg_cost_7d.toFixed(0)}</p>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}