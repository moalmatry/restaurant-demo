import express from 'express';
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  resizeImage,
  updateCategoryHandler,
  uploadCategoryImage,
} from '../controller/category.controller';
import { addSlugHandler } from '../controller/factory.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
import validateResource from '../middleware/validateResource';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategoriesSchema,
  getCategorySchema,
  updateCategorySchema,
} from '../validator/category.schema';
import subCategoryRoutes from './subCategory.routes';

const categoryRoutes = express.Router();

// TODO: fix filter object
// Nested route
categoryRoutes.use('/:categoryId/subCategories', subCategoryRoutes);

categoryRoutes
  .route('/')
  .get(validateResource(getCategoriesSchema), getCategoriesHandler)
  .post(
    protect,
    restrictTo('ADMIN'),
    uploadCategoryImage,
    resizeImage,
    validateResource(createCategorySchema),
    addSlugHandler,
    createCategoryHandler,
  );
categoryRoutes
  .route('/:id')
  .get(validateResource(getCategorySchema), getCategoryHandler)
  .patch(
    protect,
    restrictTo('ADMIN'),
    uploadCategoryImage,
    resizeImage,
    validateResource(updateCategorySchema),
    addSlugHandler,
    updateCategoryHandler,
  )
  .delete(protect, restrictTo('ADMIN'), validateResource(deleteCategorySchema), deleteCategoryHandler);

export default categoryRoutes;
