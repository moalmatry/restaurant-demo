import { z } from 'zod';
import SubCategory from '../models/SubCategoryModel';
import { checkNumberInRange } from '../utils/calcMethods';
export const getPropertiesSchema = z.object({
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
      // .string()
      // .transform((val) => parseInt(val))
      // .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an integer greater than or equal to 1' })
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
    // .string()
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val) && val >= 1, { message: 'Page must be an number greater than or equal to 1' })
    // sort: z
    //   .enum(['price', 'ratingsAverage', 'sold', '-sold', '-price', '-ratingsAverage'], {
    //     message: 'sorting allowed on price ratingsAverage & sold',
    //   })
    //   .optional(),
    sort: z.string().optional(),
    fields: z.string().optional(),
    keywords: z.string().optional(),
  }),
});

export const createPropertySchema = z.object({
  body: z
    .object({
      title: z
        .string({ required_error: 'Please enter Property title' })
        .min(3, 'Property title is too short')
        .max(100, 'Property title is too long'),
      description: z
        .string({ required_error: 'Please enter Property description' })
        .min(20, 'Property description is too short'),
      address: z.string({ required_error: 'Property Address is required' }).min(5, 'Too short Property address'),
      area: z.string().refine((string) => checkNumberInRange(string, 5), { message: 'Too small Property area' }),
      bedrooms: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Property should has at least 1 bedroom' }),
      bathrooms: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Property should has at least 1 bathrooms' }),
      // facilities: z.enum(
      //   ['Laundry', 'Car Parking', 'Sports Center', 'Cutlery', 'Gym', 'Swimming pool', 'Wifi', 'Pet Center'],
      //   {
      //     message: `please choose of those types 'Laundry', 'Car Parking', 'Sports Center', 'Cutlery', 'Gym', 'Swimming pool', 'Wifi', 'Pet Center'`,
      //   },
      // ),

      quantity: z
        .string({ required_error: 'Please enter Property quantity' })
        .refine((string) => checkNumberInRange(string, 1, 3000), { message: 'Quantity must be between 1 and 3000' }),
      tag: z.string().optional(),
      sold: z
        .string()
        .refine((string) => checkNumberInRange(string, 0, 3000), { message: 'sold must be between 1 and 3000' })
        .optional(),
      price: z
        .string({ required_error: 'Please enter Property price' })
        .refine((string) => checkNumberInRange(string, 1), { message: 'Price must be between 1 and 200000' }),
      priceAfterDiscount: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Price must be between 1 and 200000' })
        .optional(),

      imageCover: z.string({ required_error: 'Image cover is required' }),
      category: z
        .string({ required_error: 'Property must belong to category' })
        .min(3, 'category should be least 3 characters')
        .max(50, 'category name must be less than 50 characters'),
      agent: z
        .string({ required_error: 'Property must belong to user of type agent' })
        .min(3, 'agent should be least 3 characters')
        .max(50, 'agent name must be less than 50 characters'),
      subCategory: z
        .array(
          z
            .string()
            .min(3, 'subCategory should be least 3 characters')
            .max(50, 'subCategory name must be less than 50 characters')
            .optional(),
        )
        .optional(),
      ratingsAverage: z
        .string()
        .refine((string) => checkNumberInRange(string, 1, 5), { message: 'Rating Average must be between 1 and 5' })
        .optional(),
      ratingsQuantity: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Rating Quantity must be at least 1' })
        .optional(),
      images: z.array(z.string()).optional(),
    })
    .refine(
      async ({ priceAfterDiscount, price }) => {
        if (priceAfterDiscount) {
          return Number(priceAfterDiscount) < Number(price);
        } else {
          return true;
        }
      },
      {
        message: 'Price Must bigger than price after discount',
      },
    )
    .refine(
      async ({ category, subCategory }) => {
        if (subCategory) {
          const subCategories = await SubCategory.find({ category });
          const subCategoriesInDB: string[] = [];
          subCategories.forEach((sub) => subCategoriesInDB.push(sub._id.toString()));
          const checker = subCategory.every((v) => v && subCategoriesInDB.includes(v));

          return checker;
        } else return true;
      },

      { message: 'subCategory not belong to the category' },
    ),
});

export const getPropertySchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter Property id' }).min(5, 'Product id should be at least  5 characters'),
  }),
});

export const updatePropertySchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter Property id' }).min(5, 'Property id should be at least  5 characters'),
  }),
  body: z
    .object({
      title: z
        .string({ required_error: 'Please enter Property title' })
        .min(3, 'Property title is too short')
        .max(100, 'Property title is too long')
        .optional(),
      description: z
        .string({ required_error: 'Please enter Property description' })
        .min(20, 'Property description is too short')
        .optional(),
      address: z
        .string({ required_error: 'Property Address is required' })
        .min(5, 'Too short Property address')
        .optional(),
      tag: z.string().optional(),

      area: z
        .string()
        .refine((string) => checkNumberInRange(string, 5), { message: 'Too small Property area' })
        .optional(),
      bedrooms: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Property should has at least 1 bedroom' })
        .optional(),
      bathrooms: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Property should has at least 1 bathrooms' })
        .optional(),
      // facilities: z
      //   .enum(['Laundry', 'Car Parking', 'Sports Center', 'Cutlery', 'Gym', 'Swimming pool', 'Wifi', 'Pet Center'], {
      //     message: `please choose of those types 'Laundry', 'Car Parking', 'Sports Center', 'Cutlery', 'Gym', 'Swimming pool', 'Wifi', 'Pet Center'`,
      //   })
      //   .optional(),

      quantity: z
        .string({ required_error: 'Please enter Property quantity' })
        .refine((string) => checkNumberInRange(string, 1, 3000), { message: 'Quantity must be between 1 and 3000' })
        .optional(),
      sold: z
        .string()
        .refine((string) => checkNumberInRange(string, 0, 3000), { message: 'sold must be between 1 and 3000' })
        .optional(),
      price: z
        .string({ required_error: 'Please enter Property price' })
        .refine((string) => checkNumberInRange(string, 1), { message: 'Price must be between 1 and 200000' })
        .optional(),
      priceAfterDiscount: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Price must be between 1 and 200000' })
        .optional(),

      imageCover: z.string({ required_error: 'Image cover is required' }).optional(),
      category: z
        .string({ required_error: 'Property must belong to category' })
        .min(3, 'category should be least 3 characters')
        .max(50, 'category name must be less than 50 characters')
        .optional(),
      agent: z
        .string({ required_error: 'Property must belong to user of type agent' })
        .min(3, 'agent should be least 3 characters')
        .max(50, 'agent name must be less than 50 characters')
        .optional(),
      subCategory: z
        .array(
          z
            .string()
            .min(3, 'subCategory should be least 3 characters')
            .max(50, 'subCategory name must be less than 50 characters')
            .optional(),
        )
        .optional(),
      ratingsAverage: z
        .string()
        .refine((string) => checkNumberInRange(string, 1, 5), { message: 'Rating Average must be between 1 and 5' })
        .optional(),
      ratingsQuantity: z
        .string()
        .refine((string) => checkNumberInRange(string, 1), { message: 'Rating Quantity must be at least 1' })
        .optional(),
      images: z.array(z.string()).optional(),
    })
    .refine(
      async ({ priceAfterDiscount, price }) => {
        if (priceAfterDiscount) {
          return Number(priceAfterDiscount) < Number(price);
        } else {
          return true;
        }
      },
      {
        message: 'Price Must bigger than price after discount',
      },
    )
    .refine(
      async ({ category, subCategory }) => {
        if (subCategory) {
          const subCategories = await SubCategory.find({ category });
          const subCategoriesInDB: string[] = [];
          subCategories.forEach((sub) => subCategoriesInDB.push(sub._id.toString()));
          const checker = subCategory.every((v) => v && subCategoriesInDB.includes(v));

          return checker;
        } else return true;
      },

      { message: 'subCategory not belong to the category' },
    ),
  // NOTE: i think its bad idea
  // .refine(
  //   (val) => {
  //     if (!val.price && !val.priceAfterDiscount) return;
  //     if (val.priceAfterDiscount && val.price) {
  //       return val.priceAfterDiscount < val.price;
  //     } else return;
  //   },
  //   { message: 'Please enter price and price after discount and make sure price after discount is less than price' },
  // )
  // .optional(),
});

export const deletePropertySchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter Property id' }).min(5, 'Property id should be at least  5 characters'),
  }),
});

export type GetPropertiesInput = z.TypeOf<typeof getPropertiesSchema>['query'];
export type CreatePropertyInput = z.TypeOf<typeof createPropertySchema>['body'];
export type GetPropertyInput = z.TypeOf<typeof getPropertySchema>['params'];
export type UpdatePropertyInput = z.TypeOf<typeof updatePropertySchema>;
export type DeletePropertyInput = z.TypeOf<typeof deletePropertySchema>['params'];
