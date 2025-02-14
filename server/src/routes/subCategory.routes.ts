import express from 'express';
import {
  createFilterObject,
  createSubCategoryHandler,
  deleteSubCategoryHandler,
  getSubCategoriesHandler,
  getSubCategoryHandler,
  setCategoryIdToBody,
  updateSubCategoryHandler,
} from '../controller/subCategory.controller';
import validateResource from '../middleware/validateResource';
import {
  // createFilterObjectSchema,
  createSubCategorySchema,
  deleteSubCategorySchema,
  getSubCategoriesSchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from '../validator/subCategory.schema';
import { addSlugHandler } from '../controller/factory.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';

// mergeParams: Allow us to access the parameters on other routes
const subCategoryRoutes = express.Router({ mergeParams: true });

// TODO: fix typescript schema error getSubCategoriesHandler , createFilterObject are working with the same schema but when using a specific for every handler it throws a typescript error

subCategoryRoutes
  .route('/')
  .post(
    protect,
    restrictTo('ADMIN'),
    setCategoryIdToBody,
    validateResource(createSubCategorySchema),
    addSlugHandler,
    createSubCategoryHandler,
  )

  .get(validateResource(getSubCategoriesSchema), createFilterObject, getSubCategoriesHandler);

subCategoryRoutes
  .route('/:id')
  .get(validateResource(getSubCategorySchema), getSubCategoryHandler)
  .patch(
    protect,
    restrictTo('ADMIN'),
    validateResource(updateSubCategorySchema),
    addSlugHandler,
    updateSubCategoryHandler,
  )
  .delete(protect, restrictTo('ADMIN'), validateResource(deleteSubCategorySchema), deleteSubCategoryHandler);

export default subCategoryRoutes;
