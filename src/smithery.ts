import { createServer } from '@smithery/sdk/server/stateless.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { BayarcashClient, BayarcashConfig } from './bayarcash-client.js';

export default createServer({
  async init(session) {
    // Get configuration from environment variables
    const API_TOKEN = process.env.BAYARCASH_API_TOKEN;
    const API_SECRET_KEY = process.env.BAYARCASH_API_SECRET_KEY;
    const USE_SANDBOX = process.env.BAYARCASH_SANDBOX !== 'false';
    const API_VERSION = (process.env.BAYARCASH_API_VERSION as 'v2' | 'v3') || 'v3';

    if (!API_TOKEN || !API_SECRET_KEY) {
      throw new Error('BAYARCASH_API_TOKEN and BAYARCASH_API_SECRET_KEY environment variables are required');
    }

    const bayarcashConfig: BayarcashConfig = {
      apiToken: API_TOKEN,
      apiSecretKey: API_SECRET_KEY,
      useSandbox: USE_SANDBOX,
      apiVersion: API_VERSION
    };

    const bayarcash = new BayarcashClient(bayarcashConfig);

    // Create MCP server
    const server = new Server(
      {
        name: 'bayarcash-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {}
        },
      }
    );

    // List available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_payment_intent',
            description: 'Create a new payment intent for processing payments through Bayarcash',
            inputSchema: {
              type: 'object',
              properties: {
                order_number: { type: 'string', description: 'Unique order number for this payment' },
                amount: { type: 'number', description: 'Payment amount in MYR' },
                payer_email: { type: 'string', description: 'Email address of the payer' },
                payer_name: { type: 'string', description: 'Name of the payer' },
                description: { type: 'string', description: 'Description of the payment' },
                portal_key: { type: 'string', description: 'Portal key for the payment gateway' },
                payment_optional: { type: 'boolean', description: 'Whether payment is optional' }
              },
              required: ['order_number', 'amount', 'payer_email', 'payer_name', 'description', 'portal_key']
            }
          },
          {
            name: 'get_payment_intent',
            description: 'Get payment intent details by order number',
            inputSchema: {
              type: 'object',
              properties: {
                order_number: { type: 'string', description: 'Order number to retrieve' }
              },
              required: ['order_number']
            }
          },
          {
            name: 'get_transaction',
            description: 'Get transaction details by transaction ID',
            inputSchema: {
              type: 'object',
              properties: {
                transaction_id: { type: 'string', description: 'Transaction ID to retrieve' }
              },
              required: ['transaction_id']
            }
          },
          {
            name: 'list_transactions',
            description: 'List all transactions with optional filters',
            inputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string', description: 'Filter by transaction status' },
                payment_channel: { type: 'string', description: 'Filter by payment channel' },
                payer_email: { type: 'string', description: 'Filter by payer email' }
              }
            }
          },
          {
            name: 'get_portals',
            description: 'Get list of available payment portals',
            inputSchema: { type: 'object', properties: {} }
          },
          {
            name: 'get_payment_channels',
            description: 'Get list of available payment channels',
            inputSchema: { type: 'object', properties: {} }
          },
          {
            name: 'get_fpx_banks',
            description: 'Get list of FPX banks for online banking payments',
            inputSchema: { type: 'object', properties: {} }
          }
        ]
      };
    });

    // Handle tool calls
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;

        if (!args) {
          throw new McpError(ErrorCode.InvalidParams, 'Missing arguments');
        }

        switch (name) {
          case 'create_payment_intent': {
            const result = await bayarcash.createPaymentIntent({
              order_number: args.order_number as string,
              amount: args.amount as number,
              payer_email: args.payer_email as string,
              payer_name: args.payer_name as string,
              description: args.description as string,
              portal_key: args.portal_key as string,
              payment_optional: args.payment_optional as boolean | undefined
            });
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'get_payment_intent': {
            const result = await bayarcash.getPaymentIntent(args.order_number as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'get_transaction': {
            const result = await bayarcash.getTransaction(args.transaction_id as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'list_transactions': {
            const result = await bayarcash.getAllTransactions(args as any);
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'get_portals': {
            const result = await bayarcash.getPortals();
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'get_payment_channels': {
            const result = await bayarcash.getChannels();
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          case 'get_fpx_banks': {
            const result = await bayarcash.getFpxBanksList();
            return {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            };
          }

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error: any) {
        throw new McpError(ErrorCode.InternalError, `Error executing tool: ${error.message}`);
      }
    });

    // List available resources
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'bayarcash://portals',
            mimeType: 'application/json',
            name: 'Available Payment Portals',
            description: 'List of all available payment portals'
          },
          {
            uri: 'bayarcash://channels',
            mimeType: 'application/json',
            name: 'Payment Channels',
            description: 'List of all available payment channels'
          },
          {
            uri: 'bayarcash://fpx-banks',
            mimeType: 'application/json',
            name: 'FPX Banks',
            description: 'List of FPX banks for online banking'
          }
        ]
      };
    });

    // Handle resource reads
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        switch (uri) {
          case 'bayarcash://portals': {
            const portals = await bayarcash.getPortals();
            return {
              contents: [{
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(portals, null, 2)
              }]
            };
          }

          case 'bayarcash://channels': {
            const channels = await bayarcash.getChannels();
            return {
              contents: [{
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(channels, null, 2)
              }]
            };
          }

          case 'bayarcash://fpx-banks': {
            const banks = await bayarcash.getFpxBanksList();
            return {
              contents: [{
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(banks, null, 2)
              }]
            };
          }

          default:
            throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
        }
      } catch (error: any) {
        throw new McpError(ErrorCode.InternalError, `Error reading resource: ${error.message}`);
      }
    });

    return server;
  }
});
