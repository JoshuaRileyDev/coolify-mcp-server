#!/usr/bin/env node

import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { CoolifyClient } from './coolify-client.js';
import { CoolifyConfigSchema } from './types.js';

class CoolifyMcpServer {
  private server: Server;
  private coolifyClient: CoolifyClient;

  constructor() {
    // Initialize Coolify client from environment variables
    const apiUrl = process.env.COOLIFY_API_URL;
    const apiToken = process.env.COOLIFY_API_TOKEN;
    const teamId = process.env.COOLIFY_TEAM_ID;

    if (!apiUrl || !apiToken) {
      throw new Error('COOLIFY_API_URL and COOLIFY_API_TOKEN environment variables are required');
    }

    const config = CoolifyConfigSchema.parse({
      apiUrl,
      apiToken,
      teamId,
    });

    this.coolifyClient = new CoolifyClient(config);

    this.server = new Server(
      {
        name: 'coolify-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'coolify://applications',
            mimeType: 'application/json',
            name: 'Coolify Applications',
            description: 'List all applications in Coolify',
          },
          {
            uri: 'coolify://databases',
            mimeType: 'application/json',
            name: 'Coolify Databases',
            description: 'List all databases in Coolify',
          },
          {
            uri: 'coolify://servers',
            mimeType: 'application/json',
            name: 'Coolify Servers',
            description: 'List all servers in Coolify',
          },
          {
            uri: 'coolify://projects',
            mimeType: 'application/json',
            name: 'Coolify Projects',
            description: 'List all projects in Coolify',
          },
          {
            uri: 'coolify://services',
            mimeType: 'application/json',
            name: 'Coolify Services',
            description: 'List all services in Coolify',
          },
          {
            uri: 'coolify://teams',
            mimeType: 'application/json',
            name: 'Coolify Teams',
            description: 'List all teams in Coolify',
          },
        ],
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        let data;
        switch (uri) {
          case 'coolify://applications':
            data = await this.coolifyClient.listApplications();
            break;
          case 'coolify://databases':
            data = await this.coolifyClient.listDatabases();
            break;
          case 'coolify://servers':
            data = await this.coolifyClient.listServers();
            break;
          case 'coolify://projects':
            data = await this.coolifyClient.listProjects();
            break;
          case 'coolify://services':
            data = await this.coolifyClient.listServices();
            break;
          case 'coolify://teams':
            data = await this.coolifyClient.listTeams();
            break;
          default:
            throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
        }

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to read resource: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });

    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'list_applications',
            description: 'List all applications in Coolify',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_application',
            description: 'Get details of a specific application',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Application ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'create_application',
            description: 'Create a new application',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Application name',
                },
                description: {
                  type: 'string',
                  description: 'Application description',
                },
                git_repository: {
                  type: 'string',
                  description: 'Git repository URL',
                },
                git_branch: {
                  type: 'string',
                  description: 'Git branch',
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'start_application',
            description: 'Start an application',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Application ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'stop_application',
            description: 'Stop an application',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Application ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'restart_application',
            description: 'Restart an application',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Application ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'deploy_application',
            description: 'Deploy an application',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Application ID',
                },
                tag: {
                  type: 'string',
                  description: 'Optional tag to deploy',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'list_databases',
            description: 'List all databases in Coolify',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'create_database',
            description: 'Create a new database',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Database name',
                },
                type: {
                  type: 'string',
                  description: 'Database type (postgresql, mysql, mongodb, redis, etc.)',
                },
              },
              required: ['name', 'type'],
            },
          },
          {
            name: 'list_servers',
            description: 'List all servers in Coolify',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'create_server',
            description: 'Create a new server',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Server name',
                },
                ip: {
                  type: 'string',
                  description: 'Server IP address',
                },
                port: {
                  type: 'number',
                  description: 'SSH port (default: 22)',
                },
                user: {
                  type: 'string',
                  description: 'SSH user',
                },
              },
              required: ['name', 'ip'],
            },
          },
          {
            name: 'validate_server',
            description: 'Validate server connection',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Server ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'list_projects',
            description: 'List all projects in Coolify',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'create_project',
            description: 'Create a new project',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Project name',
                },
                description: {
                  type: 'string',
                  description: 'Project description',
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'list_services',
            description: 'List all services in Coolify',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'start_service',
            description: 'Start a service',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Service ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'stop_service',
            description: 'Stop a service',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Service ID',
                },
              },
              required: ['id'],
            },
          },
          {
            name: 'get_version',
            description: 'Get Coolify version information',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_version': {
            const result = await this.coolifyClient.getVersion();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'list_applications': {
            const result = await this.coolifyClient.listApplications();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'get_application': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.getApplication(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'create_application': {
            const result = await this.coolifyClient.createApplication(args || {});
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'start_application': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.startApplication(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'stop_application': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.stopApplication(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'restart_application': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.restartApplication(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'deploy_application': {
            const { id, tag } = args as { id: string; tag?: string };
            const result = await this.coolifyClient.deployApplication(id, tag);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'list_databases': {
            const result = await this.coolifyClient.listDatabases();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'create_database': {
            const result = await this.coolifyClient.createDatabase(args || {});
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'list_servers': {
            const result = await this.coolifyClient.listServers();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'create_server': {
            const result = await this.coolifyClient.createServer(args || {});
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'validate_server': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.validateServer(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'list_projects': {
            const result = await this.coolifyClient.listProjects();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'create_project': {
            const result = await this.coolifyClient.createProject(args || {});
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'list_services': {
            const result = await this.coolifyClient.listServices();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'start_service': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.startService(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'stop_service': {
            const { id } = args as { id: string };
            const result = await this.coolifyClient.stopService(id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Coolify MCP server running on stdio');
  }
}

const server = new CoolifyMcpServer();
server.run().catch(console.error);