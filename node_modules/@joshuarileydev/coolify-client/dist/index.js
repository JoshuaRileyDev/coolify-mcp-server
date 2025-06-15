'use strict';

var axios = require('axios');
var zod = require('zod');

class CoolifyClient {
    constructor(config) {
        this.config = config;
        this.client = axios.create({
            baseURL: `${config.apiUrl}/api/v1`,
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }
    async handleResponse(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
    async getVersion() {
        const response = await this.client.get('/version');
        return this.handleResponse(response);
    }
    async listApplications() {
        const response = await this.client.get('/applications');
        return this.handleResponse(response);
    }
    async getApplication(id) {
        const response = await this.client.get(`/applications/${id}`);
        return this.handleResponse(response);
    }
    async createApplication(data) {
        const response = await this.client.post('/applications', data);
        return this.handleResponse(response);
    }
    async updateApplication(id, data) {
        const response = await this.client.patch(`/applications/${id}`, data);
        return this.handleResponse(response);
    }
    async deleteApplication(id) {
        const response = await this.client.delete(`/applications/${id}`);
        return this.handleResponse(response);
    }
    async startApplication(id) {
        const response = await this.client.post(`/applications/${id}/start`);
        return this.handleResponse(response);
    }
    async stopApplication(id) {
        const response = await this.client.post(`/applications/${id}/stop`);
        return this.handleResponse(response);
    }
    async restartApplication(id) {
        const response = await this.client.post(`/applications/${id}/restart`);
        return this.handleResponse(response);
    }
    async listDatabases() {
        const response = await this.client.get('/databases');
        return this.handleResponse(response);
    }
    async getDatabase(id) {
        const response = await this.client.get(`/databases/${id}`);
        return this.handleResponse(response);
    }
    async createDatabase(data) {
        const response = await this.client.post('/databases', data);
        return this.handleResponse(response);
    }
    async deleteDatabase(id) {
        const response = await this.client.delete(`/databases/${id}`);
        return this.handleResponse(response);
    }
    async listServers() {
        const response = await this.client.get('/servers');
        return this.handleResponse(response);
    }
    async getServer(id) {
        const response = await this.client.get(`/servers/${id}`);
        return this.handleResponse(response);
    }
    async createServer(data) {
        const response = await this.client.post('/servers', data);
        return this.handleResponse(response);
    }
    async validateServer(id) {
        const response = await this.client.post(`/servers/${id}/validate`);
        return this.handleResponse(response);
    }
    async listProjects() {
        const response = await this.client.get('/projects');
        return this.handleResponse(response);
    }
    async getProject(id) {
        const response = await this.client.get(`/projects/${id}`);
        return this.handleResponse(response);
    }
    async createProject(data) {
        const response = await this.client.post('/projects', data);
        return this.handleResponse(response);
    }
    async listDeployments(applicationId) {
        const response = await this.client.get(`/applications/${applicationId}/deployments`);
        return this.handleResponse(response);
    }
    async getDeployment(id) {
        const response = await this.client.get(`/deployments/${id}`);
        return this.handleResponse(response);
    }
    async deployApplication(applicationId, tag) {
        const data = tag ? { tag } : {};
        const response = await this.client.post(`/applications/${applicationId}/deploy`, data);
        return this.handleResponse(response);
    }
    async listServices() {
        const response = await this.client.get('/services');
        return this.handleResponse(response);
    }
    async getService(id) {
        const response = await this.client.get(`/services/${id}`);
        return this.handleResponse(response);
    }
    async createService(data) {
        const response = await this.client.post('/services', data);
        return this.handleResponse(response);
    }
    async startService(id) {
        const response = await this.client.post(`/services/${id}/start`);
        return this.handleResponse(response);
    }
    async stopService(id) {
        const response = await this.client.post(`/services/${id}/stop`);
        return this.handleResponse(response);
    }
    async listTeams() {
        const response = await this.client.get('/teams');
        return this.handleResponse(response);
    }
    async getTeam(id) {
        const response = await this.client.get(`/teams/${id}`);
        return this.handleResponse(response);
    }
}

const CoolifyConfigSchema = zod.z.object({
    apiUrl: zod.z.string().url(),
    apiToken: zod.z.string(),
    teamId: zod.z.string().optional(),
});

exports.CoolifyClient = CoolifyClient;
exports.CoolifyConfigSchema = CoolifyConfigSchema;
//# sourceMappingURL=index.js.map
