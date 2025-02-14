import { z } from 'zod';
import { getReviewById, userHasReview } from '../services/review.service';

export const getReviewsSchema = z.object({
  params: z.object({
    productId: z.string().min(5, 'category id should be at least  5 characters').optional(),
    filterObj: z
      .object({
        product: z.string().optional(),
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

export const createReviewSchema = z.object({
  body: z
    .object({
      title: z.string().max(100, 'Max length for title is 100 ').optional(),
      ratings: z.number().min(1, 'Min rating is 1').max(5, 'Max rating is 5'),
      product: z.string({ required_error: 'Product id is required' }).min(5, 'Product id min length is 5'),
      user: z.string({ required_error: 'User id is required' }).min(5, 'User id min length is 5'),
    })
    .refine(
      async ({ product, user }) => {
        // check if logged user create review before
        const hasReview = await userHasReview(user, product);
        if (hasReview) {
          return false;
        } else return true;
      },
      {
        message: 'You can only make one review for every product',
        path: ['userReview'],
      },
    ),
});

export const getReviewSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter brand id' }).min(5, 'brand id should be at least  5 characters'),
  }),
});

export const updateReviewSchema = z
  .object({
    body: z.object({
      title: z.string().max(100, 'Max length for title is 100 ').optional(),
      ratings: z.number().min(1, 'Min rating is 1').max(5, 'Max rating is 5').optional(),
      product: z.string({ required_error: 'Product id is required' }).min(5, 'Product id min length is 5'),
      user: z.string({ required_error: 'User id is required' }).min(5, 'User id min length is 5'),
    }),
    params: z.object({
      id: z.string({ required_error: 'Please enter brand id' }).min(5, 'brand id should be at least  5 characters'),
    }),
  })
  .refine(
    async ({ body: { user }, params: { id } }) => {
      // check if logged user update review before
      // const hasReview = await userHasReview(user, product);
      // if (!hasReview) {
      //   return false;
      // } else return true;
      // check id review belong to user
      const review = await getReviewById(id);

      if (review && review.user._id.toString() === user) {
        return true;
      }
      // else if (!hasReview) return false;
      else return false;
    },
    { message: 'No review found with id or this review not belong to you' },
  );

export const deleteReviewSchema = z
  .object({
    body: z.object({
      role: z.string({ required_error: 'role is required' }),
      user: z.string({ required_error: 'user is required' }),
    }),
    params: z.object({
      id: z.string({ required_error: 'Please enter brand id' }).min(5, 'brand id should be at least  5 characters'),
    }),
  })
  .refine(
    async ({ body: { role, user }, params: { id } }) => {
      if (role === 'USER') {
        const review = await getReviewById(id);

        if (review && review.user._id.toString() === user) {
          return true;
        }
        // else if (!hasReview) return false;
        else return false;
      } else if (role === 'ADMIN' || role === 'EMPLOYEE') {
        return true;
      }

      return false;
    },
    {
      message: 'You are not authorized to delete this review or review id already deleted',
      path: ['body.role'],
    },
  );

export type GetReviewsInput = z.TypeOf<typeof getReviewsSchema>;
export type CreateReviewInput = z.TypeOf<typeof createReviewSchema>['body'];
export type GetReviewInput = z.TypeOf<typeof getReviewSchema>['params'];
export type UpdateReviewInput = z.TypeOf<typeof updateReviewSchema>;
export type DeleteReviewInput = z.TypeOf<typeof deleteReviewSchema>['params'];
