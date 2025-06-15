# Coolify MCP Server

A robust TypeScript MCP (Model Context Protocol) server for integrating with Coolify, the self-hostable alternative to Netlify and Vercel.

## Features

- **Complete Coolify API Integration**: Manage applications, databases, servers, projects, and services
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **MCP Protocol**: Compatible with Claude and other MCP clients
- **Resource Access**: Expose Coolify resources through MCP resource endpoints
- **Tool Support**: Comprehensive set of tools for Coolify operations

## Installation

```bash
npm install
npm run build
```

## Configuration

### Environment Variables

The server requires environment variables to connect to your Coolify instance:

```bash
export COOLIFY_API_URL="http://localhost:8000"
export COOLIFY_API_TOKEN="your-api-token-here"
export COOLIFY_TEAM_ID="optional-team-id"  # Optional
```

Or create a `.env` file:
```env
COOLIFY_API_URL=http://localhost:8000
COOLIFY_API_TOKEN=your-api-token-here
COOLIFY_TEAM_ID=optional-team-id
```

### MCP Client Configuration

#### Claude Desktop

Add the server to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "coolify": {
      "command": "node",
      "args": ["/path/to/coolify-mcp-server/dist/index.js"],
      "env": {
        "COOLIFY_API_URL": "http://localhost:8000",
        "COOLIFY_API_TOKEN": "your-api-token-here",
        "COOLIFY_TEAM_ID": "optional-team-id"
      }
    }
  }
}
```

#### Alternative: NPX Usage

If you publish to npm, users can run via npx:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "npx",
      "args": ["@joshuarileydev/coolify-mcp-server","-y"],
      "env": {
        "COOLIFY_API_URL": "http://localhost:8000",
        "COOLIFY_API_TOKEN": "your-api-token-here",
        "COOLIFY_TEAM_ID": "optional-team-id"
      }
    }
  }
}
```

#### Development Setup

For development, you can use the TypeScript source directly:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "npx",
      "args": ["tsx", "/path/to/coolify-mcp-server/src/index.ts"],
      "env": {
        "COOLIFY_API_URL": "http://localhost:8000",
        "COOLIFY_API_TOKEN": "your-api-token-here",
        "COOLIFY_TEAM_ID": "optional-team-id"
      }
    }
  }
}
```

#### Other MCP Clients

For other MCP clients that support environment variables, ensure the following variables are set:

- `COOLIFY_API_URL` (required)
- `COOLIFY_API_TOKEN` (required)  
- `COOLIFY_TEAM_ID` (optional)

**Example shell script:**
```bash
#!/bin/bash
export COOLIFY_API_URL="http://localhost:8000"
export COOLIFY_API_TOKEN="your-api-token-here"
export COOLIFY_TEAM_ID="your-team-id"

node /path/to/coolify-mcp-server/dist/index.js
```

### Available Tools

#### Applications
- `list_applications` - List all applications
- `get_application` - Get application details
- `create_application` - Create new application
- `start_application` - Start an application
- `stop_application` - Stop an application  
- `restart_application` - Restart an application
- `deploy_application` - Deploy an application

#### Databases
- `list_databases` - List all databases
- `create_database` - Create new database

#### Servers
- `list_servers` - List all servers
- `create_server` - Create new server
- `validate_server` - Validate server connection

#### Projects
- `list_projects` - List all projects
- `create_project` - Create new project

#### Services
- `list_services` - List all services
- `start_service` - Start a service
- `stop_service` - Stop a service

#### System
- `get_version` - Get Coolify version

### Available Resources

The server exposes these MCP resources:

- `coolify://applications` - All applications
- `coolify://databases` - All databases  
- `coolify://servers` - All servers
- `coolify://projects` - All projects
- `coolify://services` - All services
- `coolify://teams` - All teams

## API Token Setup

1. Log into your Coolify instance
2. Navigate to "Keys & Tokens" > "API tokens"
3. Click "Create New Token"
4. Choose appropriate permissions:
   - `read-only`: Read data only
   - `read:sensitive`: Read with sensitive data
   - `*`: Full access (recommended for MCP server)
5. Copy the generated token

### Security Note

When using the MCP server with Claude Desktop or other clients, your API token will be stored in the configuration file. Ensure this file has appropriate permissions:

```bash
# macOS/Linux
chmod 600 ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or set environment variables in your shell profile instead
echo 'export COOLIFY_API_TOKEN="your-token-here"' >> ~/.bashrc
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode (requires env vars)
COOLIFY_API_URL=http://localhost:8000 COOLIFY_API_TOKEN=your-token npm run dev

# Build for production
npm run build

# Run built version
npm start

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Troubleshooting

### Common Issues

1. **"COOLIFY_API_URL and COOLIFY_API_TOKEN environment variables are required"**
   - Ensure environment variables are set before starting the server
   - Check that your `.env` file is in the correct location
   - Verify variable names are spelled correctly

2. **"Tool execution failed: Request failed"**
   - Verify your Coolify instance is running and accessible
   - Check that the API URL is correct (include protocol: `http://` or `https://`)
   - Ensure your API token has the necessary permissions

3. **MCP server not appearing in Claude Desktop**
   - Restart Claude Desktop after updating configuration
   - Check the configuration file path is correct for your OS
   - Verify JSON syntax in the configuration file

### Debug Mode

To see detailed error messages, run the server with debug output:

```bash
DEBUG=* node dist/index.js
```

## License

MIT