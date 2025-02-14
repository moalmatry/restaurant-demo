/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import multer from 'multer';
import AppError from '../utils/AppError';

// NOTE: this logic to select specific image type
//   // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//   //   return cb(new Error('Only image files are allowed!'), false);
//   // }

const multerOptions = () => {
  // Image Uploading using disk storage engine
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/categories');
  //   },
  //   filename: function (req, file, cb) {
  //     // category-${uuid}-Date.now().jpeg
  //     const extension = file.mimetype.split('/')[1];
  //     const filename = `category-${uuidv4()}-${Date.now()}.${extension}`;
  //     cb(null, filename);
  //   },
  // });

  const multerStorage = multer.memoryStorage();
  const multerFilter = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    // accept image files only
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      // @ts-ignore
      cb(new AppError('Only Accept images', 400), false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};

export const uploadSingleImage = (fieldName: string) => multerOptions().single(fieldName);

export const uploadMixedImages = (arrayOfFields: multer.Field[]) => multerOptions().fields(arrayOfFields);
