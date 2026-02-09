import "dotenv/config";
import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().min(1, "PORT is required"),
  APPLICATIONINSIGHTS_CONNECTION_STRING: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
