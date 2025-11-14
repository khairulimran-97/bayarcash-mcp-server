# Publishing to Smithery

## Quick Steps

### 1. Install Smithery CLI

```bash
npm install -D @smithery/cli
```

### 2. Create Account

Go to https://smithery.ai and create an account.

### 3. Login

```bash
npx @smithery/cli login
```

### 4. Test Locally

```bash
npm run smithery:dev
```

This opens a playground to test your MCP server.

### 5. Publish

```bash
npx @smithery/cli publish
```

Follow the prompts to publish your server.

## Configuration

The `smithery.yaml` file is already configured with:
- Server metadata
- User configuration schema (API credentials)
- Environment variable mapping

## After Publishing

Users can install your server from Smithery marketplace:

```bash
smithery install bayarcash-mcp-server
```

Or find it at: https://smithery.ai/server/bayarcash-mcp-server

## Requirements

- Smithery account
- `smithery.yaml` configuration (already included)
- Built TypeScript code (`npm run build`)

## Support

- Smithery Docs: https://smithery.ai/docs
- GitHub: https://github.com/khairulimran-97/bayarcash-mcp-server/issues
