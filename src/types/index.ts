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
  tests: z.array(z.any()).optional(),
  metric: MetricSchema.nullable().optional(),
  creator: userValidator.optional(),
  accountId: z.number(),
  creatorId: z.number(),
  metricId: z.number().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});

export type Objective = z.infer<typeof objectiveValidator>;

export const objectiveArrayValidator = z.array(objectiveValidator);

export const experimentValidator = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  targetArea: z.string(),
  creatorArea: z.string(),
  color: z.string().nullable(),
  difficulty: z.number(),
  confidence: z.number(),
  impact: z.number(),
  results: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  creatorId: z.number(),
  accountId: z.number(),
  objectiveId: z.number(),
  resultStatus: z.string().nullable(),
  status: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  objective: objectiveValidator,
  creator: userValidator,
});

export type Experiment = z.infer<typeof experimentValidator>;

export const experimentArrayValidator = z.array(experimentValidator);
