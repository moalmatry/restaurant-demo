import { z } from 'zod';
import User from '../models/UserModel';
import { verifyHashedArgon } from '../utils/authAuth';

export const getUsersSchema = z.object({
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

    sort: z.string().optional(),
    fields: z.string().optional(),
    keywords: z.string().optional(),
  }),
});

export const createUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Please enter User name' })
        .min(3, 'User should be at least 3 characters')
        .max(50, 'User name must be less than 50 characters'),
      slug: z.string({ required_error: 'Please enter slug' }),

      email: z
        .string({ required_error: 'Please enter your email' })
        .email({ message: 'please enter valid email' })
        .refine(
          async (val) => {
            const isExisted = await User.findOne({ email: val });

            if (isExisted) return false;
            else return true;
          },
          { message: 'user already exists' },
        ),
      phone: z.string({ required_error: 'please enter phone number' }).refine(
        (val) => {
          const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
          return phoneRegex.test(val);
        },
        {
          message: 'Invalid phone number format',
        },
      ),
      profileImage: z.string().optional(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password is too short - should be min 8 characters'),
      confirmPassword: z.string({
        required_error: 'Please confirm your password',
      }),
      role: z.enum(['USER', 'ADMIN']).default('USER'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter User id' }).min(5, 'User id should be at least  5 characters'),
  }),
});

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Please enter User name' })
        .min(3, 'User should be least 3 characters')
        .max(50, 'User name must be less than 50 characters')
        .nonempty('name must be not empty')
        .optional(),
      slug: z.string({ required_error: 'Please enter slug' }).optional(),

      email: z
        .string({ required_error: 'Please enter your email' })
        .email({ message: 'please enter valid email' })
        .nonempty('email must be not empty')
        .refine(
          async (val) => {
            const isExisted = await User.findOne({ email: val });

            if (isExisted) return false;
            else return true;
          },
          { message: 'user already exists with email' },
        )
        .optional(),
      phone: z
        .string({ required_error: 'please enter phone number' })
        .nonempty('phone number must be not empty')
        // .refine(
        //   (val) => {
        //     const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
        //     return phoneRegex.test(val);
        //   },
        //   {
        //     message: 'Invalid phone number format',
        //   },
        // )
        .optional(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password is too short - should be min 8 characters')
        .optional(),
      confirmPassword: z
        .string({
          required_error: 'Please confirm your password',
        })
        .optional(),
      role: z.enum(['USER', 'ADMIN']).default('USER').optional(),
    })
    .refine(
      (data) => {
        if (data.password) return data.password === data.confirmPassword;
        else return true;
      },
      {
        message: "Password don't match",
        path: ['passwordConfirmation'],
      },
    ),
  params: z.object({
    id: z.string({ required_error: 'Please enter User id' }).min(5, 'User id should be at least  5 characters'),
  }),
});

export const updateChangePasswordSchema = z
  .object({
    body: z
      .object({
        currentPassword: z
          .string({ required_error: 'Please enter current password' })
          .min(8, 'Current Password must be at least 8 characters'),
        password: z
          .string({ required_error: 'Please enter new password' })
          .min(8, 'New Password must be at least 8 characters'),
        confirmPassword: z
          .string({ required_error: 'Please enter password confirmation' })
          .min(8, 'Confirm Password must be at least 8 characters'),
      })
      .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'make sure password and confirm password are correct',
      }),
    params: z.object({
      id: z.string({ required_error: 'Please enter User id' }).min(5, 'User id should be at least  5 characters'),
    }),
  })
  .refine(
    async ({ body: { currentPassword }, params: { id } }) => {
      if (currentPassword) {
        const user = await User.findOne({ _id: id });
        const correctPassword = await verifyHashedArgon(currentPassword, user?.password || '');

        return correctPassword;
      }
    },
    {
      message: 'Current password is incorrect',
    },
  );

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter User id' }).min(5, 'User id should be at least  5 characters'),
  }),
});

export const updateLoggedUserPasswordSchema = z.object({
  body: z
    .object({
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password is too short - should be min 8 characters'),
      confirmPassword: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

export const updateUserDataSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please enter user name' })
      .min(3, 'User should be at least 3 characters')
      .max(50, 'User name must be less than 50 characters')
      .optional(),
    slug: z.string().optional(),
    email: z
      .string({ required_error: 'Please enter your email' })
      .email({ message: 'please enter valid email' })

      .optional(),
    phone: z
      .string({ required_error: 'please enter phone number' })
      .refine(
        (val) => {
          const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
          return phoneRegex.test(val);
        },
        {
          message: 'Invalid phone number format',
        },
      )
      .optional(),
  }),
});

export type GetUsersInput = z.TypeOf<typeof getUsersSchema>['query'];
export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body'];
export type GetUserInput = z.TypeOf<typeof getUserSchema>['params'];
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
export type UpdateChangePasswordInput = z.TypeOf<typeof updateChangePasswordSchema>;
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>['params'];
export type UpdateLoggedUserPasswordInput = z.TypeOf<typeof updateLoggedUserPasswordSchema>['body'];
export type UpdateUserDataInput = z.TypeOf<typeof updateUserDataSchema>['body'];
