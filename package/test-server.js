#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing Coolify MCP Server...');

// Set test environment variables
const env = {
  ...process.env,
  COOLIFY_API_URL: 'http://localhost:8000',
  COOLIFY_API_TOKEN: 'test-token-123'
};

const serverProcess = spawn('node', [join(__dirname, 'dist/index.js')], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env
});

let serverOutput = '';

serverProcess.stdout.on('data', (data) => {
  serverOutput += data.toString();
});

serverProcess.stderr.on('data', (data) => {
  console.log('Server stderr:', data.toString());
});

// Send initialization request
const initRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {
      roots: {
        listChanged: false
      }
    },
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  }
};

setTimeout(() => {
  console.log('Sending initialization request...');
  serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');
  
  setTimeout(() => {
    // Test list tools
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list'
    };
    
    console.log('Sending tools/list request...');
    serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');
    
    setTimeout(() => {
      console.log('Server output:', serverOutput);
      serverProcess.kill();
      console.log('Test completed successfully!');
    }, 1000);
  }, 1000);
}, 1000);