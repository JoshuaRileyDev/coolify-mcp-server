import type { CoolifyConfig, Application, Database, Server, Project, Deployment, Service, Team, CoolifyApiResponse, ListResponse } from './types';
export declare class CoolifyClient {
    private client;
    private config;
    constructor(config: CoolifyConfig);
    private handleResponse;
    getVersion(): Promise<CoolifyApiResponse<{
        version: string;
    }>>;
    listApplications(): Promise<ListResponse<Application>>;
    getApplication(id: string): Promise<CoolifyApiResponse<Application>>;
    createApplication(data: Partial<Application>): Promise<CoolifyApiResponse<Application>>;
    updateApplication(id: string, data: Partial<Application>): Promise<CoolifyApiResponse<Application>>;
    deleteApplication(id: string): Promise<CoolifyApiResponse<void>>;
    startApplication(id: string): Promise<CoolifyApiResponse<void>>;
    stopApplication(id: string): Promise<CoolifyApiResponse<void>>;
    restartApplication(id: string): Promise<CoolifyApiResponse<void>>;
    listDatabases(): Promise<ListResponse<Database>>;
    getDatabase(id: string): Promise<CoolifyApiResponse<Database>>;
    createDatabase(data: Partial<Database>): Promise<CoolifyApiResponse<Database>>;
    deleteDatabase(id: string): Promise<CoolifyApiResponse<void>>;
    listServers(): Promise<ListResponse<Server>>;
    getServer(id: string): Promise<CoolifyApiResponse<Server>>;
    createServer(data: Partial<Server>): Promise<CoolifyApiResponse<Server>>;
    validateServer(id: string): Promise<CoolifyApiResponse<void>>;
    listProjects(): Promise<ListResponse<Project>>;
    getProject(id: string): Promise<CoolifyApiResponse<Project>>;
    createProject(data: Partial<Project>): Promise<CoolifyApiResponse<Project>>;
    listDeployments(applicationId: string): Promise<ListResponse<Deployment>>;
    getDeployment(id: string): Promise<CoolifyApiResponse<Deployment>>;
    deployApplication(applicationId: string, tag?: string): Promise<CoolifyApiResponse<Deployment>>;
    listServices(): Promise<ListResponse<Service>>;
    getService(id: string): Promise<CoolifyApiResponse<Service>>;
    createService(data: Partial<Service>): Promise<CoolifyApiResponse<Service>>;
    startService(id: string): Promise<CoolifyApiResponse<void>>;
    stopService(id: string): Promise<CoolifyApiResponse<void>>;
    listTeams(): Promise<ListResponse<Team>>;
    getTeam(id: string): Promise<CoolifyApiResponse<Team>>;
}
//# sourceMappingURL=coolify-client.d.ts.map