import { z } from 'zod';

export const getSubCategoriesSchema = z.object({
  params: z.object({
    categoryId: z.string().min(5, 'category id should be at least  5 characters').optional(),
    filterObj: z
      .object({
        category: z.string().optional(),
      })
      .optional(),
  }),
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

// NOTE: this schema throw type script error when using validateResource
// export const createFilterObjectSchema = z.object({
//   params: z.object({
//     categoryId: z.string().min(5, 'category id should be at least  5 characters').optional(),

//     filterObj: z
//       .object({
//         category: z.string().optional(),
//       })
//       .optional(),
//   }),
// });

export const createSubCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please enter subCategory name' })
      .min(2, 'subCategory should be least 3 characters')
      .max(32, 'subCategory name must be less than 50 characters'),
    category: z
      .string({ required_error: 'Please enter Category id' })
      .min(3, 'subCategory should be least 3 characters')
      .max(50, 'subCategory name must be less than 50 characters'),
    image: z.string().optional(),
  }),
  params: z.object({
    categoryId: z
      .string({ required_error: 'Please enter Category id' })
      .min(3, 'subCategory should be least 3 characters')
      .max(50, 'subCategory name must be less than 50 characters')
      .optional(),
  }),
});

export const getSubCategorySchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Please enter subCategory id' })
      .min(5, 'subCategory id should be at least  5 characters'),
  }),
});

export const updateSubCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please enter subCategory name' })
      .min(3, 'subCategory should be least 3 characters')
      .max(50, 'subCategory name must be less than 50 characters'),
    category: z
      .string({ required_error: 'Please enter Category id' })
      .min(3, 'subCategory should be least 3 characters')
      .max(50, 'subCategory name must be less than 50 characters')
      .optional(),
    image: z.string().optional(),
  }),
  params: z.object({
    id: z
      .string({ required_error: 'Please enter subCategory id' })
      .min(5, 'subCategory id should be at least  5 characters'),
  }),
});

export const deleteSubCategorySchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Please enter subCategory id' })
      .min(5, 'subCategory id should be at least  5 characters'),
  }),
});

export type GetSubCategoriesInput = z.TypeOf<typeof getSubCategoriesSchema>;
// export type CreateFilterObjectInput = z.TypeOf<typeof createFilterObjectSchema>['params'];
export type CreateSubCategoryInput = z.TypeOf<typeof createSubCategorySchema>;
export type GetSubCategoryInput = z.TypeOf<typeof getSubCategorySchema>['params'];
export type UpdateSubCategoryInput = z.TypeOf<typeof updateSubCategorySchema>;
export type DeleteSubCategoryInput = z.TypeOf<typeof deleteSubCategorySchema>['params'];
