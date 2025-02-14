import { z } from 'zod';

export const getCategoriesSchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
      .optional(),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
      .optional(),

    price: z
      .object({
        gte: z
          .string()
          .transform((val) => parseInt(val))
          .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
          .optional(),
        lte: z
          .string()
          .transform((val) => parseInt(val))
          .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
          .optional(),
      })
      .refine(({ gte, lte }) => {
        if (gte && lte) return false;
        if (gte) return true;
        if (lte) return true;
      })
      .optional()

      .optional(),
    ratingsAverage: z
      .object({
        gte: z
          .string()
          .transform((val) => parseInt(val))
          .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
          .optional(),
        lte: z
          .string()
          .transform((val) => parseInt(val))
          .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
          .optional(),
      })
      .refine(({ gte, lte }) => {
        if (gte && lte) return false;
        if (gte) return true;
        if (lte) return true;
      })
      .optional(),

    sort: z.string().optional(),
    fields: z.string().optional(),
    keywords: z.string().optional(),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please enter category name' })
      .min(3, 'category should be least 3 characters')
      .max(50, 'Category name must be less than 50 characters'),
    image: z.string().optional(),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category id should be at least  5 characters'),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please enter category name' })
      .min(3, 'category should be least 3 characters')
      .max(50, 'Category name must be less than 50 characters')
      .optional(),
    image: z.string().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category id should be at least  5 characters'),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category id should be at least  5 characters'),
  }),
});

export type GetCategoriesInput = z.TypeOf<typeof getCategoriesSchema>['query'];
export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>['body'];
export type GetCategoryInput = z.TypeOf<typeof getCategorySchema>['params'];
export type UpdateCategoryInput = z.TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = z.TypeOf<typeof deleteCategorySchema>['params'];
