/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from 'express-async-handler';
import { SearchType } from 'index';
import mongoose from 'mongoose';
import slugify from 'slugify';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../services/factory.service';
import AppError from '../utils/AppError';

export const createOneHandler = (Model: mongoose.Model<any>) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAsync(async (req, res, next) => {
    const newDocument = await createOne(Model, req.body);
    res.status(200).send({ status: 'success', message: 'Document created successfully', data: newDocument });
  });

export const getAllHandler = (Model: mongoose.Model<any>, searchType: SearchType) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAsync(async (req, res, next) => {
    let allDocuments;
    if (req.body.filterObj) {
      const document = await getAll(Model, req.body.filterObj, searchType);

      allDocuments = document;
    } else {
      const document = await getAll(Model, req.query, searchType);

      allDocuments = document;
    }
    if (!allDocuments.data.length)
      return next(new AppError(`Document not found in this route ${req.baseUrl}. please add some document first`, 404));

    res.status(200).send({ status: 'success', results: allDocuments.data.length, ...allDocuments });
  });

export const getOneHandler = (Model: mongoose.Model<any>, populateOpt?: any) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const document = await getOne(Model, id, populateOpt);
    if (!document) return next(new AppError('Document not found please try another id', 404));

    res.status(200).send({ status: 'success', data: document });
  });

export const updateOneHandler = (Model: mongoose.Model<any>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // if (!req.body.imageCover) req.body.imageCover = '';

    const document = await updateOne(Model, req.body, id);
    if (!document) return next(new AppError('No document found for this id', 404));
    res.status(200).send({ status: 'success', message: 'Document updated successfully', data: document });
  });

export const deleteOneHandler = (Model: mongoose.Model<any>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await deleteOne(Model, id);
    if (!document) return next(new AppError('No document found for this id', 404));
    res.status(204).send();
  });

export const addSlugHandler = catchAsync((req: Request, res: Response, next: NextFunction) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.body.title) req.body.slug = slugify(req.body.title);
  next();
});
