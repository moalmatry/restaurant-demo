import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
// TODO: remove this imports and check if it will effect in anything
import { removedUser, renamedUser } from '../constants';
import { findUser, findUserByResetCode, signup } from '../services/auth.service';
import { addProfileAvatar } from '../utils/addProfileAvatar';
import AppError from '../utils/AppError';
import { generateUniqueRandomNumbers, hashedWithCrypto, signJwt } from '../utils/authAuth';
import Email from '../utils/mailer';
import { removeProperties } from '../utils/removeProperties';
import {
  ConfirmationLoginCodeInput,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
  VerifyPasswordResetCodeInput,
} from '../validator/auth.schema';

/**@description Signup
 * @route  Patch /api/v1/auth/signup
 * @access public
 */
export const signupHandler = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request<object, object, SignupInput>, res: Response, next: NextFunction) => {
    const { email, password, name, phone, slug, profileImage } = req.body;
    // 1) Create user
    const user = await signup({ email, password, name, phone, slug, profileImage, role: 'USER' });

    // Add profile image
    const userAvatar = addProfileAvatar(user.name);
    user.profileImg = userAvatar;
    await user.save();
    // 2) Generate token
    const token = signJwt(user.id);

    const filteredUser = removeProperties(user, removedUser, renamedUser);

    res.status(201).json({ status: 'success', data: filteredUser, token });
  },
);

/**@description Signup
 * @route  Patch /api/v1/auth/login
 * @access public
 *
 */
export const loginHandler = catchAsync(
  async (req: Request<object, object, LoginInput>, res: Response, next: NextFunction) => {
    // 1) Check if there are email and password
    // 2) Check if email & password are correct

    const { phone } = req.body;
    const user = await findUser(phone);

    console.log(user);
    // const isCorrect = await verifyHashedArgon(password, user?.password || '');

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    const resetCode = generateUniqueRandomNumbers(4, 0, 9);
    const hashedResetCode = hashedWithCrypto(resetCode.join(''));
    // Save hashed password to db
    user.passwordResetCode = hashedResetCode!;
    user.passwordResetExpires = Date.now() * 10 * 60 * 1000;
    user.passwordResetVerified = false;
    user.save();

    await new Email(user.email as string, user.name as string, resetCode.join('')).sendPasswordReset().catch((err) => {
      console.log(err);
      return next(new AppError('something went wrong in sending email. try again later', 500));
    });

    // 3) Generate token
    // const token = signJwt(user.id);
    // 4) send response to client

    // const filteredUser = removeProperties(user, removedUser, renamedUser);

    res.status(200).json({ status: 'success', message: 'Message send to your email (phone number 😉)' });
  },
);

export const confirmLoginCodeHandler = catchAsync(
  async (req: Request<object, object, ConfirmationLoginCodeInput>, res: Response, next: NextFunction) => {
    const { code, phone } = req.body;

    const hashedResetCode = hashedWithCrypto(code);
    const user = await findUserByResetCode(hashedResetCode, phone);

    const filteredUser = removeProperties(user!, removedUser, renamedUser);

    if (!user) {
      return next(new AppError('Invalid reset code or expired', 401));
    }

    user.passwordResetVerified = true;
    user.passwordResetVerified = false;
    user.passwordResetExpires = undefined;
    user.passwordResetCode = '';
    user.save();

    const token = signJwt(user.id);
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: filteredUser,
      token,
    });
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const forgotPasswordHandler = catchAsync(
  async (req: Request<object, object, ForgotPasswordInput>, res: Response, next: NextFunction) => {
    // 1) Get user by email
    const { email } = req.body;
    const user = await findUser(email);
    if (!user) {
      res.status(200).json({
        status: 'success',
        message: 'Email has been sent to your email. Please check your inbox.',
      });
      return;
    }

    console.log(user);
    // 2) If user generate token (6 digits) & save it to db

    const resetCode = generateUniqueRandomNumbers(6, 0, 9);
    const hashedResetCode = hashedWithCrypto(resetCode.join(''));
    // Save hashed password to db
    user.passwordResetCode = hashedResetCode!;
    user.passwordResetExpires = Date.now() * 10 * 60 * 1000;
    user.passwordResetVerified = false;
    user.save();
    // 3) Send token to user email
    await new Email(user.email as string, user.name as string, resetCode.join('')).sendPasswordReset().catch((err) => {
      console.log(err);
      return next(new AppError('something went wrong in sending email. try again later', 500));
    });
    // 4) Redirect to reset password page

    res.status(200).json({
      status: 'success',
      message: 'Email has been sent to your email. Please check your inbox.',
    });
  },
);

/**@description verify password reset code
 * @route  Post /api/v1/auth/verify-reset-code
 * @access public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const verifyPasswordResetCodeHandler = catchAsync(
  async (req: Request<object, object, VerifyPasswordResetCodeInput>, res: Response, next: NextFunction) => {
    // 1) Get user based on reset code
    const { resetCode, password } = req.body;
    const hashedResetCode = hashedWithCrypto(resetCode);
    const user = await findUserByResetCode(hashedResetCode, password);

    console.log(user);

    if (!user) {
      return next(new AppError('Invalid reset code or expired', 401));
    }

    user.passwordResetVerified = true;
    user.password = password;
    user.passwordResetVerified = false;
    user.passwordResetExpires = undefined;
    user.passwordResetCode = '';
    user.save();
    const token = signJwt(user.id);
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully',
      token,
    });
  },
);

/**@description reset password
 * @route  Post /api/v1/auth/reset-password
 * @access public
 */
export const resetPasswordHandler = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request<object, object, ResetPasswordInput>, res: Response, next: NextFunction) => {
    // const { email, password } = req.body;
    // const user = await findUser(email);
    // if (!user) {
    //   return next(new AppError('There no user with email', 404));
    // }
    // if (!user.passwordResetVerified) {
    //   return next(new AppError('Reset code is not valid', 400));
    // }
    // user.password = password;
    // user.passwordResetVerified = false;
    // user.passwordResetExpires = undefined;
    // user.passwordResetCode = '';
    // user.save();
    // const token = signJwt(user.id);
    res.status(400).json({
      status: 'fail',
      message: 'This route no longer exists',
    });
  },
);
