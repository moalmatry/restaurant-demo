import { NextFunction, Response, Request } from 'express';
import AppError from '../utils/AppError';
import catchAsync from 'express-async-handler';
import { changedPasswordAfter, verifyJwt } from '../utils/authAuth';
import { findUserById } from '../services/auth.service';

/** @description middleware that protects private resources  */
export const protect = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not authorized to access please log in first', 401));
  }
  // 2) Verify token if its real or not and still valid

  const decoded = verifyJwt<{ id: string; iat: number; exp: number }>(token);

  // 3) If user still exists

  const freshUser = await findUserById(decoded?.id as string);

  if (!freshUser) {
    return next(new AppError('The user belonging to this token does no longer exist', 401));
  }

  // 4) If user changed password after the JWT was issued
  const passwordChanged = changedPasswordAfter(
    decoded?.iat as number,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    freshUser?.passwordChangedAt ? freshUser.passwordChangedAt : undefined,
  );

  if (passwordChanged) {
    return next(new AppError('Password has changed. Please log in again', 401));
  }

  // Access protected route

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.user = freshUser;
  next();
});
