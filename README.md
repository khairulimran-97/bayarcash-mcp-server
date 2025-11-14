# Bayarcash MCP Server

MCP server for Bayarcash payment gateway. Use AI assistants (Claude, ChatGPT, Cursor) to manage payments, check transactions, and integrate with your apps.

[![npm version](https://badge.fury.io/js/@webimpian%2Fbayarcash-mcp-server.svg)](https://www.npmjs.com/package/@webimpian/bayarcash-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Install

### Option 1: Automated (Recommended)

**Mac/Linux:**
```bash
git clone https://github.com/khairulimran-97/bayarcash-mcp-server.git
cd bayarcash-mcp-server
./install.sh
```

**Windows:**
```powershell
git clone https://github.com/khairulimran-97/bayarcash-mcp-server.git
cd bayarcash-mcp-server
.\install.ps1
```

The script will ask for your credentials and configure everything automatically.

### Option 2: NPX (After publishing to NPM)

Add to your AI client config:

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "npx",
      "args": ["-y", "@webimpian/bayarcash-mcp-server"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_token",
        "BAYARCASH_API_SECRET_KEY": "your_secret",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

## Configuration

### Get API Credentials
1. Go to https://console.bayar.cash
2. Navigate to Settings → API
3. Copy your API Token and Secret Key

### Config File Locations

**Claude Desktop:**
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Cursor:** `.cursor/mcp.json`

## What Can You Do?

Once installed, talk to your AI assistant:

```
"Show me available payment portals"
"Create a payment for RM 100"
"List all transactions from today"
"What payment channels are available?"
"Get status of order #ORD-12345"
```

## Features

**10 Tools:**
- Create payment intents
- Get transactions (by ID, order, status, email, channel)
- List portals and payment channels
- Get FPX banks
- Verify webhook callbacks
- FPX Direct Debit enrollment

**3 Resources:**
- Payment portals
- Payment channels
- FPX banks list

**Supports:**
- API v2 and v3
- Sandbox and production modes
- 20+ payment channels (FPX, DuitNow, e-wallets, cards, etc.)
- Automatic checksum generation
- Webhook verification

## Using with Claude Code

If you're using Claude Code (AI coding assistant), the MCP server helps you:

### Build Laravel/Node.js Integrations
```
"Help me integrate Bayarcash in Laravel. Check my account setup first."
```

Claude Code will:
- Check YOUR actual portals and channels via MCP
- Create code specific to YOUR setup
- No generic documentation needed!

### Test & Debug
```
"Create a test payment for RM 10"
"Check the status of order #ABC-123"
"List failed transactions"
```

### Monitor Production
```
"Show me all successful payments today"
"What's the total revenue from FPX this week?"
```

## Manual Installation

See [INSTALL.md](INSTALL.md) for detailed manual setup instructions.

## Development Usage

See [USAGE.md](USAGE.md) for examples of all available tools and commands.

## Troubleshooting

**Server not connecting?**
1. Restart your AI client completely
2. Check API credentials are correct
3. Verify absolute path in config file
4. Ensure `npm run build` was successful

**API errors?**
1. Check `BAYARCASH_SANDBOX` setting
2. Verify credentials at https://console.bayar.cash
3. Ensure API version is correct (v2 or v3)

## Publishing

To publish to NPM:
```bash
npm login
npm publish --access public
```

To submit to Smithery marketplace, see their submission guidelines.

## License

MIT - See [LICENSE](LICENSE)

## Links

- **Repository:** https://github.com/khairulimran-97/bayarcash-mcp-server
- **Issues:** https://github.com/khairulimran-97/bayarcash-mcp-server/issues
- **Bayarcash:** https://bayar.cash
- **MCP Docs:** https://modelcontextprotocol.io
