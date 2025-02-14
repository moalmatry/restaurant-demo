/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import {
  addUserIdHandler,
  createFilterObject,
  createReviewHandler,
  deleteReviewHandler,
  getReviewHandler,
  getReviewsHandler,
  setProductIdAndUserToBody,
  updateReviewHandler,
} from '../controller/review.controller';
import validateResource from '../middleware/validateResource';

import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
import {
  createReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  getReviewsSchema,
  updateReviewSchema,
} from '../validator/review.schema';

const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes
  .route('/')
  .get(createFilterObject, validateResource(getReviewsSchema), getReviewsHandler)
  .post(
    protect,
    restrictTo('USER'),
    setProductIdAndUserToBody,
    addUserIdHandler,
    validateResource(createReviewSchema),
    createReviewHandler,
  );
reviewRoutes
  .route('/:id')
  .get(validateResource(getReviewSchema), createFilterObject, getReviewHandler)
  // updateReviewSchema._def.schema
  // @ts-ignore
  .patch(protect, restrictTo('USER'), addUserIdHandler, validateResource(updateReviewSchema), updateReviewHandler)
  .delete(
    protect,
    restrictTo('USER', 'ADMIN'),
    addUserIdHandler,
    // @ts-ignore
    validateResource(deleteReviewSchema),
    deleteReviewHandler,
  );

export default reviewRoutes;
