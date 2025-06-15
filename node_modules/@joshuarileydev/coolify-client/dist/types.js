import { z } from 'zod';
export const CoolifyConfigSchema = z.object({
    apiUrl: z.string().url(),
    apiToken: z.string(),
    teamId: z.string().optional(),
});
//# sourceMappingURL=types.js.map