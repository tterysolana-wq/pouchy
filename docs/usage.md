# 📚 Usage Examples

Learn how to leverage PouchyAI's powerful features with practical examples.

## 🔎 Example 1: Wallet Discovery by Token Address

### Scenario

You want to find successful traders of a specific Solana token.

### Input

```
Token Mint: So11111111111111111111111111111111111111112
```

### Process

1. **Data Collection**: PouchyAI scans all historical transactions
2. **Wallet Identification**: Extracts unique wallet addresses
3. **Performance Analysis**: Calculates PnL for each wallet
4. **Behavioral Scoring**: Analyzes trading patterns and consistency
5. **Ranking**: Sorts wallets by profitability and conviction signals

### Output

```json
{
  "token_address": "So11111111111111111111111111111111111111112",
  "analysis_date": "2024-01-15",
  "top_wallets": [
    {
      "address": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      "pnl_percentage": "+247.3%",
      "avg_holding_days": 45,
      "win_rate": "78%",
      "conviction_score": 9.2,
      "risk_level": "Medium"
    },
    {
      "address": "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
      "pnl_percentage": "+189.7%",
      "avg_holding_days": 23,
      "win_rate": "82%",
      "conviction_score": 8.9,
      "risk_level": "High"
    }
  ]
}
```

### Actionable Insights

- **Track High-Performers**: Monitor wallets with conviction scores > 8.0
- **Strategy Analysis**: Study holding patterns of successful wallets
- **Risk Assessment**: Balance high returns with risk tolerance

---

## 🔗 Example 2: Multi-Wallet Intersection

### Scenario

Analyze what tokens are commonly held by successful DeFi wallets.

### Input

```
Wallet A: 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
Wallet B: 4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi
Wallet C: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

### Analysis Results

#### 🎯 Common Holdings

```json
{
  "intersection_analysis": {
    "common_tokens": [
      {
        "token": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "symbol": "USDC",
        "commonality": "100%",
        "avg_allocation": "15.2%"
      },
      {
        "token": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        "symbol": "mSOL",
        "commonality": "100%",
        "avg_allocation": "8.7%"
      },
      {
        "token": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        "symbol": "BONK",
        "commonality": "67%",
        "avg_allocation": "3.1%"
      }
    ]
  }
}
```

#### 📊 Group Accumulation Map

- **Coordinated Entry**: All wallets bought mSOL within 48 hours
- **Collective Conviction**: 85% portfolio overlap in top 10 holdings
- **Whale Cluster**: Combined holdings exceed $50M TVL

### Strategic Applications

- **Copy Trading**: Mirror high-conviction shared positions
- **Trend Prediction**: Anticipate moves when whales align
- **Risk Diversification**: Balance portfolio with proven combinations

---

## 📈 Example 3: CTO Tracker in Action

### Monitoring Setup

```json
{
  "monitoring_config": {
    "dormant_threshold_days": 90,
    "volume_spike_multiplier": 5.0,
    "accumulation_wallet_count": 10,
    "alert_sensitivity": "medium"
  }
}
```

### Signal Detection

#### 🚨 Alert Example

```json
{
  "alert_type": "ACCUMULATION_SIGNAL",
  "timestamp": "2024-01-15T14:30:00Z",
  "token": {
    "address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    "symbol": "RAY",
    "name": "Raydium"
  },
  "signals": {
    "volume_increase": "+340%",
    "accumulating_wallets": 23,
    "smart_money_flow": "+$2.1M",
    "dormant_days": 127
  },
  "confidence_score": 8.7
}
```

#### 📊 Accumulation Pattern

- **Phase 1**: Dormant for 127 days
- **Phase 2**: Volume spike detected (+340%)
- **Phase 3**: 23 wallets begin accumulation
- **Phase 4**: Smart money inflow increases
- **Phase 5**: Alert triggered for user action

### Trading Strategy

1. **Early Entry**: Position taken based on CTO signal
2. **Risk Management**: Stop-loss at -15%
3. **Profit Taking**: Scale out as volume normalizes
4. **Performance**: +67% return within 2 weeks

---

## 🎮 Interactive Examples

### Try It Yourself

::: tip Live Demo
Visit our [interactive demo](https://pouchy.fun) to test these features with real data.
:::

### Common Use Cases

#### For Day Traders

- Monitor high-frequency successful wallets
- Set up CTO alerts for quick entries
- Use intersection analysis for confirmation

#### For Swing Traders

- Track medium-term conviction wallets
- Focus on accumulation signals
- Analyze group behavior patterns

#### For Long-term Investors

- Identify consistent performers
- Study holding duration patterns
- Monitor institutional-grade wallets

---

## 🔧 Advanced Tips

### Optimization Strategies

1. **Combine Signals**: Use multiple features together for higher confidence
2. **Backtesting**: Validate strategies with historical data
3. **Risk Management**: Never allocate more than 5% based on single signal
4. **Continuous Learning**: Adapt strategies based on performance feedback

### Common Pitfalls to Avoid

- **Over-reliance**: Don't blindly follow signals without analysis
- **FOMO Trading**: Wait for high-confidence signals
- **Ignoring Risk**: Always consider downside protection
- **Single Source**: Combine with other analysis methods

---

## 📈 Next Steps

Ready to implement these strategies? Check out our [API Reference](/api) for programmatic access or explore advanced features in our [roadmap](/roadmap).
