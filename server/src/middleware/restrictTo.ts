/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Response, Request } from 'express';
import { Role } from '../types';
import AppError from '../utils/AppError';

export const restrictTo =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error
    const restrictedRoles = roles.includes(req.user.role);
    if (!restrictedRoles) {
      return next(new AppError("You don't have permission to perform this action", 403));
    }

    next();
  };
