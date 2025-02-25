import { z } from 'zod';

import { passwordCompanySchema } from './passwordCompanySchema';

export const passwordMatchSchema = z
  .object({
    password: passwordCompanySchema,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'password do not match',
      });
    }
  });
