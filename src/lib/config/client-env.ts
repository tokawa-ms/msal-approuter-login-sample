import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_AZURE_AD_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_AZURE_AD_TENANT_ID: z.string().min(1),
  NEXT_PUBLIC_AZURE_AD_REDIRECT_URI: z.string().url(),
  NEXT_PUBLIC_DEBUG_TOKEN: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_AZURE_AD_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
  NEXT_PUBLIC_AZURE_AD_TENANT_ID: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID,
  NEXT_PUBLIC_AZURE_AD_REDIRECT_URI: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI,
  NEXT_PUBLIC_DEBUG_TOKEN: process.env.NEXT_PUBLIC_DEBUG_TOKEN,
});
