import { z } from 'zod';
import User from '../models/UserModel';

export const signupSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Please enter user name' })
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

export const loginSchema = z.object({
  body: z.object({
    phone: z.string({ required_error: 'Please enter your phone' }),
  }),
});
export const confirmLoginCodeSchema = z.object({
  body: z.object({
    phone: z.string({ required_error: 'Please enter your email' }),
    code: z.string({ required_error: 'Please enter the code' }).min(4, 'invalid code'),
  }),
});
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Please enter your email' }).email({ message: 'please enter valid email' }),
  }),
});

export const verifyPasswordResetCodeSchema = z.object({
  body: z
    .object({
      resetCode: z.string({ required_error: 'Please enter the code' }).min(5, 'invalid code'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password is too short - should be min 8 characters'),
      confirmPassword: z.string({ required_error: 'Please confirm your password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

export const resetPasswordSchema = z.object({
  body: z
    .object({
      email: z.string({ required_error: 'Please enter your email' }).email({ message: 'please enter valid email' }),

      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password is too short - should be min 8 characters'),
      confirmPassword: z.string({ required_error: 'Please confirm your password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});
export type SignupInput = z.TypeOf<typeof signupSchema>['body'];
export type LoginInput = z.TypeOf<typeof loginSchema>['body'];
export type ConfirmationLoginCodeInput = z.TypeOf<typeof confirmLoginCodeSchema>['body'];
export type ForgotPasswordInput = z.TypeOf<typeof forgotPasswordSchema>['body'];
export type VerifyPasswordResetCodeInput = z.TypeOf<typeof verifyPasswordResetCodeSchema>['body'];
export type ResetPasswordInput = z.TypeOf<typeof resetPasswordSchema>['body'];
