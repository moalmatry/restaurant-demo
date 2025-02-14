/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import ApiFeatures from '../utils/ApiFeatures';
import { SearchType } from 'index';

export const getAll = async <T>(Model: Model<T>, queryString: any, searchType: SearchType) => {
  const documentCount = await Model.countDocuments();

  if (queryString.keywords) {
    const apiFeatures = new ApiFeatures(Model.find(), queryString).search(searchType).paginate(documentCount);
    const pagination = apiFeatures.paginationResult;
    const data = await apiFeatures.mongooseQuery;
    return { ...pagination, data };
  } else {
    const apiFeatures = new ApiFeatures(Model.find(), queryString)
      .paginate(documentCount)
      .filter()
      .limitFields()
      .sort();

    const data = await apiFeatures.mongooseQuery;
    const pagination = apiFeatures.paginationResult;
    return { ...pagination, data };
  }
};

export const createOne = async <T>(Model: Model<T>, reqBody: any) => {
  return await Model.create(reqBody);
};

export const getOne = async <T>(Model: Model<T>, id: string, populateOpt?: any) => {
  if (!populateOpt) {
    return await Model.findById(id);
  } else {
    return await Model.findById(id).populate(populateOpt);
  }
};

export const updateOne = async <T>(Model: Model<T>, reqBody: any, id: string) => {
  const document = await Model.findByIdAndUpdate(id, reqBody, {
    new: true,
  });

  document?.save();
  return document;
};

export const deleteOne = async <T>(Model: Model<T>, id: string) => {
  const document = await Model.findByIdAndDelete(id);
  document?.deleteOne();

  return document;
};
