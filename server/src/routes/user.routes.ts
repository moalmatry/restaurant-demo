import express from 'express';
import { addSlugHandler } from '../controller/factory.controller';
import {
  changeUserPasswordHandler,
  createUserHandler,
  deactivateLoggedUserHandler,
  deleteUserHandler,
  getLoggedUserDataHandler,
  getUserHandler,
  getUsersHandler,
  resizeImage,
  updateLoggedUserDataHandler,
  updateLoggedUserPasswordHandler,
  updateUserHandler,
  uploadUserImage,
  validEmailHandler,
} from '../controller/user.controller';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  updateChangePasswordSchema,
  updateLoggedUserPasswordSchema,
  updateUserDataSchema,
  updateUserSchema,
} from '../validator/user.schema';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
const userRoutes = express.Router();

// User routes

// NOTE: Link to return profile image : https://ui-avatars.com/api/?name=Moahmed+Almatry&size=250&background=0061FF&color=fff
userRoutes.use(protect);

userRoutes.get('/get-me', getLoggedUserDataHandler, getUserHandler);
userRoutes.patch(
  '/change-my-password',
  validateResource(updateLoggedUserPasswordSchema),
  updateLoggedUserPasswordHandler,
);
userRoutes.patch(
  '/update-me',
  addSlugHandler,
  validateResource(updateUserDataSchema),
  validEmailHandler,
  updateLoggedUserDataHandler,
);
userRoutes.delete('/delete-me', deactivateLoggedUserHandler);

// Admin routes
userRoutes
  .route('/')
  .get(restrictTo('ADMIN'), getUsersHandler)
  .post(
    restrictTo('ADMIN'),
    uploadUserImage,
    resizeImage,
    addSlugHandler,
    validateResource(createUserSchema),
    createUserHandler,
  );
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
userRoutes.patch('/change-password/:id', validateResource(updateChangePasswordSchema), changeUserPasswordHandler);

userRoutes
  .route('/:id')
  .get(restrictTo('ADMIN'), getUserHandler)
  .patch(
    restrictTo('ADMIN'),
    // uploadUserImage,
    // resizeImage,
    addSlugHandler,
    validateResource(updateUserSchema),
    updateUserHandler,
  )
  .delete(restrictTo('ADMIN'), deleteUserHandler);

export default userRoutes;
