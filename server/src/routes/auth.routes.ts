import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  confirmLoginCodeHandler,
  forgotPasswordHandler,
  loginHandler,
  resetPasswordHandler,
  signupHandler,
  verifyPasswordResetCodeHandler,
} from '../controller/auth.controller';
import { addSlugHandler } from '../controller/factory.controller';
import validateResource from '../middleware/validateResource';
import {
  confirmLoginCodeSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyPasswordResetCodeSchema,
} from '../validator/auth.schema';

const authRoutes = express.Router();
const limiter = rateLimit({
  max: 2000,
  windowMs: 60 * 60 * 500,
  message: 'Too many requests from this IP, please try again in an hour!',
});

authRoutes.use('/', limiter);

authRoutes.post('/signup', addSlugHandler, addSlugHandler, validateResource(signupSchema), signupHandler);
authRoutes.post('/login', addSlugHandler, validateResource(loginSchema), loginHandler);
authRoutes.post(
  '/confirm-login-code',
  addSlugHandler,
  validateResource(confirmLoginCodeSchema),
  confirmLoginCodeHandler,
);
authRoutes.post('/forgot-password', validateResource(forgotPasswordSchema), forgotPasswordHandler);
authRoutes.post('/verify-reset-code', validateResource(verifyPasswordResetCodeSchema), verifyPasswordResetCodeHandler);
authRoutes.patch('/reset-password', validateResource(resetPasswordSchema), resetPasswordHandler);

// userRoutes
//   .route('/:id')
//   .get(getUserHandler)
//   .patch(uploadUserImage, resizeImage, addSlugHandler, updateUserHandler)
//   .delete(deleteUserHandler);

export default authRoutes;
