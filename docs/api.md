# 🛠 API Reference

Complete API documentation for integrating PouchyAI into your applications.

## 🚀 Getting Started

### Base URL
```
https://api.pouchy.ai/v1
```

### Authentication
```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

### Rate Limits
- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1,000 requests/hour  
- **Enterprise**: Custom limits

---

## 🔎 Wallet Discovery API

### Discover Profitable Wallets by Token

Find wallets that have successfully traded a specific token.

#### Endpoint
```http
POST /wallet-discovery
```

#### Request Body
```json
{
  "token_address": "So11111111111111111111111111111111111111112",
  "min_pnl_percentage": 50,
  "min_trade_count": 5,
  "time_range_days": 90,
  "limit": 50
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token_address` | string | ✅ | Solana token mint address |
| `min_pnl_percentage` | number | ❌ | Minimum profit percentage (default: 0) |
| `min_trade_count` | number | ❌ | Minimum number of trades (default: 3) |
| `time_range_days` | number | ❌ | Analysis period in days (default: 30) |
| `limit` | number | ❌ | Maximum results (default: 20, max: 100) |

#### Response
```json
{
  "success": true,
  "data": {
    "token_address": "So11111111111111111111111111111111111111112",
    "analysis_timestamp": "2024-01-15T10:30:00Z",
    "total_wallets_analyzed": 15847,
    "profitable_wallets_found": 127,
    "wallets": [
      {
        "address": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        "pnl_percentage": 247.3,
        "total_trades": 23,
        "win_rate": 78.3,
        "avg_holding_days": 45.2,
        "total_volume_usd": 125000,
        "conviction_score": 9.2,
        "risk_level": "medium",
        "last_activity": "2024-01-14T15:22:00Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 127,
    "has_more": true
  }
}
```

#### Example Usage
```javascript
const response = await fetch('https://api.pouchy.ai/v1/wallet-discovery', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token_address: 'So11111111111111111111111111111111111111112',
    min_pnl_percentage: 100,
    limit: 10
  })
});

const data = await response.json();
console.log('Top profitable wallets:', data.data.wallets);
```

---

## 🔗 Wallet Intersection API

### Analyze Common Holdings

Find tokens commonly held by multiple wallets.

#### Endpoint
```http
POST /wallet-intersection
```

#### Request Body
```json
{
  "wallet_addresses": [
    "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  ],
  "min_commonality_percentage": 66,
  "include_metadata": true
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "analysis_timestamp": "2024-01-15T10:30:00Z",
    "wallets_analyzed": 3,
    "common_tokens": [
      {
        "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "symbol": "USDC",
        "name": "USD Coin",
        "commonality_percentage": 100,
        "avg_allocation_percentage": 15.2,
        "total_value_usd": 450000,
        "wallets_holding": 3
      }
    ],
    "correlation_score": 8.7,
    "group_behavior_signals": [
      "coordinated_accumulation",
      "similar_timing",
      "whale_cluster"
    ]
  }
}
```

---

## 📈 CTO Tracker API

### Monitor Forgotten Coins

Track dormant tokens for accumulation signals.

#### Endpoint
```http
GET /cto-signals
```

#### Query Parameters
```http
GET /cto-signals?dormant_days=90&confidence_min=7.0&limit=20
```

#### Response
```json
{
  "success": true,
  "data": {
    "active_signals": [
      {
        "token_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
        "symbol": "RAY",
        "name": "Raydium",
        "signal_type": "accumulation_detected",
        "confidence_score": 8.7,
        "dormant_days": 127,
        "volume_increase_percentage": 340,
        "accumulating_wallets": 23,
        "smart_money_flow_usd": 2100000,
        "detected_at": "2024-01-15T14:30:00Z"
      }
    ]
  }
}
```

#### Webhook Support
Subscribe to real-time CTO signals:

```http
POST /webhooks/cto-signals
```

```json
{
  "url": "https://your-app.com/webhook/cto",
  "confidence_threshold": 8.0,
  "filters": {
    "min_volume_increase": 200,
    "min_accumulating_wallets": 10
  }
}
```

---

## 📊 Analytics API

### Get Wallet Analytics

Detailed analysis of a specific wallet.

#### Endpoint
```http
GET /wallet/{address}/analytics
```

#### Response
```json
{
  "success": true,
  "data": {
    "address": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    "performance": {
      "total_pnl_usd": 125000,
      "pnl_percentage": 247.3,
      "win_rate": 78.3,
      "total_trades": 156,
      "avg_holding_days": 45.2
    },
    "behavior": {
      "trading_style": "swing_trader",
      "risk_level": "medium",
      "conviction_score": 9.2,
      "consistency_score": 8.8
    },
    "portfolio": {
      "current_positions": 12,
      "total_value_usd": 890000,
      "diversification_score": 7.5
    }
  }
}
```

---

## 🔧 Utility Endpoints

### Health Check
```http
GET /health
```

### API Status
```http
GET /status
```

### Rate Limit Info
```http
GET /rate-limit
```

---

## 📝 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN_ADDRESS",
    "message": "The provided token address is not valid",
    "details": "Address must be a valid Solana mint address"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_API_KEY` | API key is invalid or expired | 401 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INVALID_TOKEN_ADDRESS` | Token address format is invalid | 400 |
| `WALLET_NOT_FOUND` | Wallet address not found | 404 |
| `INSUFFICIENT_DATA` | Not enough data for analysis | 422 |

---

## 🚀 SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @pouchy/sdk
```

```javascript
import { PouchyAI } from '@pouchy/sdk';

const pouchy = new PouchyAI('YOUR_API_KEY');
const wallets = await pouchy.discoverWallets({
  tokenAddress: 'So11111111111111111111111111111111111111112'
});
```

### Python
```bash
pip install pouchy-python
```

```python
from pouchy import PouchyAI

pouchy = PouchyAI(api_key='YOUR_API_KEY')
wallets = pouchy.discover_wallets(
    token_address='So11111111111111111111111111111111111111112'
)
```

---

## 🎯 Best Practices

### Optimization Tips
1. **Batch Requests**: Combine multiple queries when possible
2. **Cache Results**: Store frequently accessed data locally
3. **Use Webhooks**: Real-time data is more efficient than polling
4. **Filter Early**: Use parameters to reduce payload size

### Security Guidelines
- Never expose API keys in client-side code
- Use environment variables for key storage
- Implement proper error handling
- Monitor your usage and rate limits

---

## 📞 Support

Need help with the API? We're here to assist:

- **Documentation**: [docs.pouchy.ai](https://docs.pouchy.ai)
- **Discord**: [Join our community](https://discord.gg/pouchy)
- **Email**: api-support@pouchy.ai
- **Status Page**: [status.pouchy.ai](https://status.pouchy.ai)
