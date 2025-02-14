import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
import { ReviewFilteredObject, Role } from 'index';
import Review from '../models/ReviewModel';
import { GetReviewsInput } from '../validator/review.schema';
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from './factory.controller';

/**
 * @description apply nested routes
 * @route Get /api/v1/products/:productId/reviews
 */
export const createFilterObject = (req: Request<GetReviewsInput['params']>, res: Response, next: NextFunction) => {
  let filteredObject: ReviewFilteredObject = {};
  if (req.params.productId) filteredObject = { product: req.params.productId };
  req.params.filterObj = filteredObject;
  next();
};

/**@description list all reviews
 * @route  Get /api/v1/reviews
 * @access public
 *
 */
export const getReviewsHandler = getAllHandler(Review, 'Else');

/**@description Get specific review by id
 * @route Get /api/v1/reviews/:id
 * @access public
 */
export const getReviewHandler = getOneHandler(Review);

/**@description add categoryId for request body
 * @routes POST api/v1/products/:productId/reviews
 * @access private
 */
export const setProductIdAndUserToBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.product) req.body.product = req.params.productId;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!req.body.user) req.body.user = req.user.id;

  console.log(req.body.product);
  next();
};

/**@description create review
 * @route  POST /api/v1/reviews
 * @access private User
 */
export const createReviewHandler = createOneHandler(Review);

/** @description add userId to req.body   */
export const addUserIdHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Add user Id to the body
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userId = req.user.id as string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const role = req.user.role as Role;

  req.body.role = role;
  req.body.user = userId;
  next();
});

/**@description update review
 * @route  Patch /api/v1/reviews/:id
 * @access private User
 *
 */
export const updateReviewHandler = updateOneHandler(Review);

/**@description Delete review
 * @route  Delete /api/v1/reviews/:id
 * @access private User
 *
 */
export const deleteReviewHandler = deleteOneHandler(Review);
