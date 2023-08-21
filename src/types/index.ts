import { z } from 'zod';

export const MetricSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  accountId: z.number(),
  creatorId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});
export const metricArrayValidator = z.array(MetricSchema);
export type Metric = z.infer<typeof MetricSchema>;

export const userValidator = z.object({
  id: z.number(),
  accountId: z.number(),
  email: z.string(),
  name: z.string(),
  username: z.string().nullable(),
  targetArea: z.string().nullable(),
  phone: z.string().nullable(),
  country: z.string().nullable(),
  job: z.string().nullable(),
  address: z.string().nullable(),
  accessLevel: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});
export const userArrayValidator = z.array(userValidator);
export type User = z.infer<typeof userValidator>;

export const objectiveValidator = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  status: z.string(),
  type: z.string(),
  tests: z.array(z.any()),
  metric: MetricSchema.nullable(),
  creator: userValidator,
  accountId: z.number(),
  creatorId: z.number(),
  metricId: z.number().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});

export type Objective = z.infer<typeof objectiveValidator>;

export const objectiveArrayValidator = z.array(objectiveValidator);
