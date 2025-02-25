import { z } from 'zod';

export const passwordCompanySchema = z
  .string()
  .min(5, 'pasword must contain al least 5 character')
  .max(20, 'pasword must contain  maximum 20 character');
