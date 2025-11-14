# Bayarcash MCP Server 💳

Use AI to manage Bayarcash payments. Create payment links, check transactions, and integrate payment processing using natural language.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Install

**Smithery (Easiest):**
```bash
npx -y @smithery/cli install @khairulimran-97/bayarcash-mcp-server --client claude
```

**Manual Setup:**
Add to your config file (`~/.config/claude-code/mcp_settings.json`):
```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/path/to/bayarcash-mcp-server/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_token",
        "BAYARCASH_API_SECRET_KEY": "your_secret",
        "BAYARCASH_SANDBOX": "true"
      }
    }
  }
}
```

Get your API credentials from https://console.bayar.cash → Settings → API

## What You Can Do

Talk to your AI naturally:

```
"Create a payment for RM 100"
"Show all transactions today"
"What payment channels are available?"
"Check status of order #ORD-12345"
"List all FPX banks"
```

## Features

**10 Payment Tools:**
- Create & manage payment intents
- Check transactions (by ID, order, status, email)
- List portals and payment channels
- Get FPX banks
- Verify webhooks
- FPX Direct Debit enrollment

**Payment Channels:**
FPX, DuitNow, Boost, GrabPay, Touch 'n Go, ShopeePay, Cards, BNPL

**Built-in:**
- Sandbox & production modes
- Automatic security checksums
- Webhook verification
- API v2 & v3 support

## Configuration

**Environment Variables:**

| Variable | Required | Default |
|----------|----------|---------|
| `BAYARCASH_API_TOKEN` | Yes | - |
| `BAYARCASH_API_SECRET_KEY` | Yes | - |
| `BAYARCASH_SANDBOX` | No | `true` |
| `BAYARCASH_API_VERSION` | No | `v3` |

## Troubleshooting

**Server not connecting?**
1. Restart your AI client completely
2. Check API credentials at https://console.bayar.cash
3. Verify config file path is correct
4. Run `npm run build` in server directory

**Wrong environment data?**
- Check `BAYARCASH_SANDBOX` setting (true = test, false = production)

## Links

- **Smithery:** https://server.smithery.ai/@khairulimran-97/bayarcash-mcp-server
- **Repository:** https://github.com/khairulimran-97/bayarcash-mcp-server
- **Bayarcash:** https://bayar.cash
- **Issues:** https://github.com/khairulimran-97/bayarcash-mcp-server/issues

## License

MIT License
