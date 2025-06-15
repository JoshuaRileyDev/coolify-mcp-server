import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type {
  CoolifyConfig,
  Application,
  Database,
  Server,
  Project,
  Deployment,
  Service,
  Team,
  CoolifyApiResponse,
  ListResponse,
} from './types.js';

export class CoolifyClient {
  private client: AxiosInstance;
  private config: CoolifyConfig;

  constructor(config: CoolifyConfig) {
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

  private async handleResponse<T>(response: AxiosResponse): Promise<T> {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
  }

  async getVersion(): Promise<CoolifyApiResponse<{ version: string }>> {
    const response = await this.client.get('/version');
    return this.handleResponse(response);
  }

  async listApplications(): Promise<ListResponse<Application>> {
    const response = await this.client.get('/applications');
    return this.handleResponse(response);
  }

  async getApplication(id: string): Promise<CoolifyApiResponse<Application>> {
    const response = await this.client.get(`/applications/${id}`);
    return this.handleResponse(response);
  }

  async createApplication(data: Partial<Application>): Promise<CoolifyApiResponse<Application>> {
    const response = await this.client.post('/applications', data);
    return this.handleResponse(response);
  }

  async updateApplication(id: string, data: Partial<Application>): Promise<CoolifyApiResponse<Application>> {
    const response = await this.client.patch(`/applications/${id}`, data);
    return this.handleResponse(response);
  }

  async deleteApplication(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.delete(`/applications/${id}`);
    return this.handleResponse(response);
  }

  async startApplication(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/applications/${id}/start`);
    return this.handleResponse(response);
  }

  async stopApplication(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/applications/${id}/stop`);
    return this.handleResponse(response);
  }

  async restartApplication(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/applications/${id}/restart`);
    return this.handleResponse(response);
  }

  async listDatabases(): Promise<ListResponse<Database>> {
    const response = await this.client.get('/databases');
    return this.handleResponse(response);
  }

  async getDatabase(id: string): Promise<CoolifyApiResponse<Database>> {
    const response = await this.client.get(`/databases/${id}`);
    return this.handleResponse(response);
  }

  async createDatabase(data: Partial<Database>): Promise<CoolifyApiResponse<Database>> {
    const response = await this.client.post('/databases', data);
    return this.handleResponse(response);
  }

  async deleteDatabase(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.delete(`/databases/${id}`);
    return this.handleResponse(response);
  }

  async listServers(): Promise<ListResponse<Server>> {
    const response = await this.client.get('/servers');
    return this.handleResponse(response);
  }

  async getServer(id: string): Promise<CoolifyApiResponse<Server>> {
    const response = await this.client.get(`/servers/${id}`);
    return this.handleResponse(response);
  }

  async createServer(data: Partial<Server>): Promise<CoolifyApiResponse<Server>> {
    const response = await this.client.post('/servers', data);
    return this.handleResponse(response);
  }

  async validateServer(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/servers/${id}/validate`);
    return this.handleResponse(response);
  }

  async listProjects(): Promise<ListResponse<Project>> {
    const response = await this.client.get('/projects');
    return this.handleResponse(response);
  }

  async getProject(id: string): Promise<CoolifyApiResponse<Project>> {
    const response = await this.client.get(`/projects/${id}`);
    return this.handleResponse(response);
  }

  async createProject(data: Partial<Project>): Promise<CoolifyApiResponse<Project>> {
    const response = await this.client.post('/projects', data);
    return this.handleResponse(response);
  }

  async listDeployments(applicationId: string): Promise<ListResponse<Deployment>> {
    const response = await this.client.get(`/applications/${applicationId}/deployments`);
    return this.handleResponse(response);
  }

  async getDeployment(id: string): Promise<CoolifyApiResponse<Deployment>> {
    const response = await this.client.get(`/deployments/${id}`);
    return this.handleResponse(response);
  }

  async deployApplication(applicationId: string, tag?: string): Promise<CoolifyApiResponse<Deployment>> {
    const data = tag ? { tag } : {};
    const response = await this.client.post(`/applications/${applicationId}/deploy`, data);
    return this.handleResponse(response);
  }

  async listServices(): Promise<ListResponse<Service>> {
    const response = await this.client.get('/services');
    return this.handleResponse(response);
  }

  async getService(id: string): Promise<CoolifyApiResponse<Service>> {
    const response = await this.client.get(`/services/${id}`);
    return this.handleResponse(response);
  }

  async createService(data: Partial<Service>): Promise<CoolifyApiResponse<Service>> {
    const response = await this.client.post('/services', data);
    return this.handleResponse(response);
  }

  async startService(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/services/${id}/start`);
    return this.handleResponse(response);
  }

  async stopService(id: string): Promise<CoolifyApiResponse<void>> {
    const response = await this.client.post(`/services/${id}/stop`);
    return this.handleResponse(response);
  }

  async listTeams(): Promise<ListResponse<Team>> {
    const response = await this.client.get('/teams');
    return this.handleResponse(response);
  }

  async getTeam(id: string): Promise<CoolifyApiResponse<Team>> {
    const response = await this.client.get(`/teams/${id}`);
    return this.handleResponse(response);
  }
}