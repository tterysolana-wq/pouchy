import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Download, Info, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner@2.0.3';

export function TokenAnalyzerView() {
  const [tokenCA, setTokenCA] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidCA, setIsValidCA] = useState<boolean | null>(null);
  const [timeframe, setTimeframe] = useState('7D');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Filter states
  const [winrateFilter, setWinrateFilter] = useState([60]);
  const [pnlFilter, setPnlFilter] = useState([50]);
  const [avgHoldFilter, setAvgHoldFilter] = useState([24]);
  const [costFilter, setCostFilter] = useState([1000]);
  const [distributionFilters, setDistributionFilters] = useState({
    '500%': false,
    '200-500%': false,
    '0-200%': true,
    '0--50%': false,
    '<-50%': false,
  });

  // Result states
  const [sortBy, setSortBy] = useState('winrate');
  const [viewType, setViewType] = useState<'table' | 'cards'>('table');

  const inputRef = useRef<HTMLInputElement>(null);

  // Mock results data
  const mockResults = [
    {
      wallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      winrate: 85.2,
      pnl: 234.5,
      avgHold: 18.5,
      cost: 850,
      distribution: '200-500%',
    },
    {
      wallet: '2BvkZhSJZtVdvRxq8zVzxXFLKfgK3H9cQm6YiL8pQdm7',
      winrate: 72.8,
      pnl: 125.3,
      avgHold: 36.2,
      cost: 1200,
      distribution: '0-200%',
    },
    {
      wallet: 'AqKmFnNvKZpU7T8sLhX3qEr9mY2nDjVcWbF5kG8pRtS4',
      winrate: 91.4,
      pnl: 445.7,
      avgHold: 12.8,
      cost: 650,
      distribution: '500%',
    },
  ];

  // Validate Solana address format
  const validateCA = async (address: string) => {
    if (!address) {
      setIsValidCA(null);
      return;
    }

    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple Solana address validation (Base58, length)
    const isValid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    setIsValidCA(isValid);
    setIsValidating(false);

    if (!isValid) {
      toast("Invalid Token Address", {
        description: "Please enter a valid Solana token address.",
        duration: 3000,
      });
    }
  };

  const handleCAChange = (value: string) => {
    setTokenCA(value);
    setIsValidCA(null);
    
    // Auto-validate after user stops typing
    const timeoutId = setTimeout(() => {
      validateCA(value);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const handleRunAnalysis = async () => {
    if (!tokenCA || !isValidCA) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setShowResults(true);
      toast("Analysis Complete! 📊", {
        description: `Found ${mockResults.length} wallets matching your criteria.`,
        duration: 4000,
      });
    } catch (error) {
      toast("Analysis Failed", {
        description: "Failed to analyze. Please retry.",
        duration: 3000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetFilters = () => {
    setWinrateFilter([60]);
    setPnlFilter([50]);
    setAvgHoldFilter([24]);
    setCostFilter([1000]);
    setDistributionFilters({
      '500%': false,
      '200-500%': false,
      '0-200%': true,
      '0--50%': false,
      '<-50%': false,
    });
    setTimeframe('7D');
    
    toast("Filters Reset", {
      description: "All filters have been reset to defaults.",
      duration: 2000,
    });
  };

  const handleExportCSV = () => {
    if (!showResults) return;
    
    toast("Export Started", {
      description: "CSV file is being prepared for download.",
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
      if (e.key === 'Enter' && tokenCA && isValidCA) {
        handleRunAnalysis();
      }
      if (e.key === 'Escape') {
        setTokenCA('');
        setIsValidCA(null);
        setShowResults(false);
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tokenCA, isValidCA]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Token Analyzer 📊
        </h1>
        <p className="text-gray-600">Analyze wallets and their performance with any token</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input & Filters */}
        <div className="lg:col-span-1 space-y-6">
          {/* Token CA Input */}
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
            <h3 
              className="text-lg text-gray-800/90 mb-4"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Token Address
            </h3>
            
            <div className="space-y-3">
              <div className="relative">
                <Input
                  ref={inputRef}
                  placeholder="Enter token address"
                  value={tokenCA}
                  onChange={(e) => handleCAChange(e.target.value)}
                  className={`bg-white/30 border-white/20 ${
                    isValidCA === false ? 'border-red-400' : 
                    isValidCA === true ? 'border-green-400' : ''
                  }`}
                />
                {isValidating && (
                  <div className="absolute right-3 top-3">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              {isValidCA === false && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <Info className="w-4 h-4" />
                  <span>Invalid address format</span>
                </div>
              )}
              
              {isValidCA === true && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Info className="w-4 h-4" />
                  <span>Valid token address</span>
                </div>
              )}
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
                <RadioGroupItem value="7D" id="7d" />
                <Label htmlFor="7d">7D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30D" id="30d" />
                <Label htmlFor="30d">30D</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Filters */}
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
                      min="-100"
                      max="1000"
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

              {/* PnL Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>PnL ≥</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pnlFilter[0]}
                      onChange={(e) => setPnlFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="-100"
                      max="1000"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={pnlFilter}
                  onValueChange={setPnlFilter}
                  max={500}
                  min={0}
                  step={10}
                />
              </div>

              {/* Avg Hold Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Avg Hold ≤</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={avgHoldFilter[0]}
                      onChange={(e) => setAvgHoldFilter([Number(e.target.value)])}
                      className="w-16 h-8 text-sm bg-white/30"
                      min="0"
                      max="720"
                    />
                    <span className="text-sm text-gray-600">h</span>
                  </div>
                </div>
                <Slider
                  value={avgHoldFilter}
                  onValueChange={setAvgHoldFilter}
                  max={168}
                  min={1}
                  step={1}
                />
              </div>

              {/* Cost Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Cost ≤</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={costFilter[0]}
                      onChange={(e) => setCostFilter([Number(e.target.value)])}
                      className="w-20 h-8 text-sm bg-white/30"
                      min="0"
                    />
                    <span className="text-sm text-gray-600">USD</span>
                  </div>
                </div>
                <Slider
                  value={costFilter}
                  onValueChange={setCostFilter}
                  max={10000}
                  min={0}
                  step={50}
                />
              </div>

              {/* Distribution Filter */}
              <div>
                <Label className="mb-3 block">Distribution</Label>
                <div className="space-y-2">
                  {Object.entries(distributionFilters).map(([key, checked]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={checked}
                        onCheckedChange={(checked) =>
                          setDistributionFilters(prev => ({ ...prev, [key]: !!checked }))
                        }
                      />
                      <Label htmlFor={key} className="text-sm">{key}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRunAnalysis}
              disabled={!tokenCA || !isValidCA || isAnalyzing}
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
              disabled={!showResults}
              className="w-full bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 min-h-[600px]">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl text-gray-800/90 mb-2"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Enter a token address and run analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Set your filters and click "Run Analysis" to find wallets
                </p>
                <div className="text-sm text-gray-500">
                  <p>💡 Press Enter to run analysis</p>
                  <p>💡 Press Esc to reset</p>
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
                    Analysis Results ({mockResults.length} wallets)
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
                          <SelectItem value="pnl">PnL</SelectItem>
                          <SelectItem value="avgHold">Avg Hold</SelectItem>
                          <SelectItem value="cost">Cost</SelectItem>
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
                {viewType === 'table' ? (
                  <div className="bg-white/20 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/20">
                          <TableHead>Wallet</TableHead>
                          <TableHead>Winrate</TableHead>
                          <TableHead>PnL</TableHead>
                          <TableHead>Avg Hold</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Distribution</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockResults.map((result, index) => (
                          <TableRow key={index} className="border-white/20">
                            <TableCell className="font-mono text-sm">
                              {result.wallet.slice(0, 6)}...{result.wallet.slice(-4)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-green-100/50 text-green-700">
                                {result.winrate}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-green-600">+{result.pnl}%</TableCell>
                            <TableCell>{result.avgHold}h</TableCell>
                            <TableCell>${result.cost}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{result.distribution}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.wallet)}
                                  className="p-1"
                                >
                                  Copy CA
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toast("Opening Axiom", { description: "Redirecting to Axiom platform...", duration: 2000 })}
                                  className="p-1 text-purple-600 hover:text-purple-700"
                                >
                                  Buy Axiom
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toast("Opening GMGN", { description: "Redirecting to GMGN platform...", duration: 2000 })}
                                  className="p-1 text-green-600 hover:text-green-700"
                                >
                                  Buy GMGN
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toast("Opening Dex Screener", { description: "Viewing token on Dex Screener...", duration: 2000 })}
                                  className="p-1 text-blue-600 hover:text-blue-700"
                                >
                                  Dex Screener
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {mockResults.map((result, index) => (
                      <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/10 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-mono text-sm text-gray-700">
                              {result.wallet.slice(0, 12)}...{result.wallet.slice(-8)}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-green-100/50 text-green-700">
                                {result.winrate}% WR
                              </Badge>
                              <Badge variant="outline">{result.distribution}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.wallet)}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <div className="flex flex-col gap-1">
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
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">PnL</p>
                            <p className="text-green-600">+{result.pnl}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Hold Time</p>
                            <p>{result.avgHold}h</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Cost</p>
                            <p>${result.cost}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}