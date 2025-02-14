/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadSingleImage } from '../middleware/uploadImage';
import Category from '../models/CategoryModel';
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from './factory.controller';

export const uploadCategoryImage = uploadSingleImage('image');
export const resizeImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file?.buffer) return next();

  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file?.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 70 })
    .toFile(`uploads/categories/${filename}`);

  // NOTE: to save image into db
  req.body.image = filename;

  next();
});
/**@description list all categories
 * @route  Get /api/v1/categories
 * @access public
 *
 */
export const getCategoriesHandler = getAllHandler(Category, 'Else');
/**@description Get specific category by id
 * @route Get /api/v1/categories/:id
 * @access public
 */
export const getCategoryHandler = getOneHandler(Category);

/**@description create category
 * @route  POST /api/v1/categories
 * @access private Admin
 *
 */
export const createCategoryHandler = createOneHandler(Category);

/**@description update category
 * @route  Patch /api/v1/categories/:id
 * @access private Admin
 *
 */
export const updateCategoryHandler = updateOneHandler(Category);
/**@description Delete category
 * @route  Delete /api/v1/categories/:id
 * @access private Admin
 *
 */
export const deleteCategoryHandler = deleteOneHandler(Category);
