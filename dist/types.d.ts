import { z } from 'zod';
export declare const CoolifyConfigSchema: z.ZodObject<{
    apiUrl: z.ZodString;
    apiToken: z.ZodString;
    teamId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    apiUrl: string;
    apiToken: string;
    teamId?: string | undefined;
}, {
    apiUrl: string;
    apiToken: string;
    teamId?: string | undefined;
}>;
export type CoolifyConfig = z.infer<typeof CoolifyConfigSchema>;
export interface Application {
    id: string;
    name: string;
    description?: string;
    fqdn?: string;
    git_repository?: string;
    git_branch?: string;
    build_pack?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Database {
    id: string;
    name: string;
    type: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Server {
    id: string;
    name: string;
    description?: string;
    ip: string;
    port?: number;
    user?: string;
    private_key_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Project {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}
export interface Deployment {
    id: string;
    application_id: string;
    status: string;
    commit_sha?: string;
    created_at: string;
    updated_at: string;
}
export interface Service {
    id: string;
    name: string;
    description?: string;
    docker_compose?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Team {
    id: string;
    name: string;
    description?: string;
    personal_team: boolean;
    created_at: string;
    updated_at: string;
}
export interface CoolifyApiResponse<T> {
    data?: T;
    message?: string;
    success?: boolean;
}
export interface ListResponse<T> {
    data: T[];
    links?: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
    meta?: {
        current_page: number;
        from?: number;
        last_page: number;
        per_page: number;
        to?: number;
        total: number;
    };
}
