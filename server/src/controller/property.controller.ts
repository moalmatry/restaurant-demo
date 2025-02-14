/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadMixedImages } from '../middleware/uploadImage';
import Property from '../models/PropertyModel';
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from './factory.controller';

export const uploadPropertyImages = uploadMixedImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 4,
  },
]);

export const resizePropertyImages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Image processing for imageCover
  // if (!req.file) return next();
  if ((req.files as { [fieldName: string]: Express.Multer.File[] }).imageCover) {
    const imageCoverFilename = `property-${uuidv4()}-${Date.now()}-cover.jpeg`;
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    await sharp(files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/properties/${imageCoverFilename}`);
    // NOTE: to save image into db
    req.body.imageCover = '';
    req.body.imageCover = imageCoverFilename;
  }
  // Image processing for images
  if ((req.files as { [fieldName: string]: Express.Multer.File[] }).images) {
    req.body.images = [];
    await Promise.all(
      (req.files as { [fieldName: string]: Express.Multer.File[] }).images.map(async (img, index) => {
        const imageName = `properties-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        // const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        await sharp(img.buffer)
          .resize(600, 600)
          .toFormat('jpeg')
          .jpeg({ quality: 70 })
          .toFile(`uploads/properties/${imageName}`);
        // NOTE: to save image into db
        req.body.images.push(imageName);
      }),
    );
  }
  next();
});
/**@description list all products
 * @route  Get /api/v1/products
 * @access Public
 *
 */

export const getPropertiesHandler = getAllHandler(Property, 'Property');

/**@description Get specific product by id
 * @route Get /api/v1/products/:id
 * @access public
 */
export const getPropertyHandler = getOneHandler(Property, 'reviews');

/**@description create product
 * @route  POST /api/v1/product
 * @access private Admin
 *
 */
export const createPropertyHandler = createOneHandler(Property);

/**@description update product
 * @route  Patch /api/v1/product/:id
 * @access private Admin
 *
 */
export const updatePropertyHandler = updateOneHandler(Property);

/**@description Delete product
 * @route  Delete /api/v1/product/:id
 * @access private Admin
 *
 */
export const deletePropertyHandler = deleteOneHandler(Property);
