import { NextFunction, Request, Response } from 'express';
import { FilteredObject } from 'index';
import SubCategory from '../models/SubCategoryModel';
import { GetSubCategoriesInput } from '../validator/subCategory.schema';
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from './factory.controller';

export const createFilterObject = (
  req: Request<GetSubCategoriesInput['params']>,
  res: Response,
  next: NextFunction,
) => {
  let filteredObject: FilteredObject = {};
  if (req.params.categoryId) filteredObject = { category: req.params.categoryId };
  req.params.filterObj = filteredObject;

  next();
};

/**@description list all subCategories
 * @route  Get /api/v1/subCategories
 * @access public
 *
 */
export const getSubCategoriesHandler = getAllHandler(SubCategory, 'Else');
/**@description Get specific subCategory by id
 * @route Get /api/v1/subCategories/:id
 * @access public
 */
export const getSubCategoryHandler = getOneHandler(SubCategory);

/**@description add categoryId for request body
 * @routes POST api/v1/categories/:categoryId/subCategories
 * @access public
 */

export const setCategoryIdToBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

/**@description create subCategories
 * @route  POST /api/v1/subCategories
 * @access private Admin
 *
 */
export const createSubCategoryHandler = createOneHandler(SubCategory);

/**@description update subCategory
 * @route  Patch /api/v1/subCategory/:id
 * @access private Admin
 *
 */
export const updateSubCategoryHandler = updateOneHandler(SubCategory);

/**@description Delete subCategory
 * @route  Delete /api/v1/subCategory/:id
 * @access private Admin
 *
 */
export const deleteSubCategoryHandler = deleteOneHandler(SubCategory);
