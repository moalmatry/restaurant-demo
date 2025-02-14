import express from 'express';
import {
  createPropertyHandler,
  deletePropertyHandler,
  getPropertyHandler,
  getPropertiesHandler,
  updatePropertyHandler,
  uploadPropertyImages,
  resizePropertyImages,
} from '../controller/property.controller';
import validateResource from '../middleware/validateResource';
import {
  createPropertySchema,
  getPropertiesSchema,
  deletePropertySchema,
  getPropertySchema,
  updatePropertySchema,
} from '../validator/properties.schema';
import { addSlugHandler } from '../controller/factory.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
import reviewRoutes from './review.routes';

const propertyRoutes = express.Router();

// NOTE: create property and update property accept only FormData

// Nested Route
// POST /properties/propertyId/reviewId
// Get /properties/propertyId/reviewId
// Get /properties/propertyId/review/reviewId
propertyRoutes.use('/:propertyId/reviews', reviewRoutes);

propertyRoutes.route('/').get(validateResource(getPropertiesSchema), getPropertiesHandler).post(
  protect,
  restrictTo('ADMIN'),
  uploadPropertyImages,
  resizePropertyImages,
  // NOTE: Validate CreatePropertySchema not working well with form-data in postman
  validateResource(createPropertySchema),
  addSlugHandler,
  createPropertyHandler,
);
propertyRoutes
  .route('/:id')
  .get(validateResource(deletePropertySchema), getPropertyHandler)
  .patch(
    protect,
    restrictTo('ADMIN'),
    uploadPropertyImages,
    resizePropertyImages,
    validateResource(getPropertySchema),
    addSlugHandler,
    updatePropertyHandler,
  )
  .delete(protect, restrictTo('ADMIN'), validateResource(updatePropertySchema), deletePropertyHandler);

export default propertyRoutes;
