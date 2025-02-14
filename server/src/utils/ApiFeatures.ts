/* eslint-disable @typescript-eslint/no-explicit-any */

import { SearchType } from 'index';
import { Query, Document } from 'mongoose';

interface QueryString {
  [key: string]: any;
}

interface PaginatedResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
}

class ApiFeatures<T extends Document> {
  mongooseQuery: Query<T[], T>;
  queryString: QueryString;
  paginationResult: PaginatedResult;

  constructor(mongooseQuery: Query<T[], T>, queryString: QueryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter(): this {
    const queryStringObj: QueryString = { ...this.queryString };
    const excludesFields = ['page', 'sort', 'limit', 'fields'];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    let queryStr: string = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string): string => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  search(modelName?: SearchType): this {
    if (modelName === 'Property') {
      if (this.queryString.keywords) {
        const query: QueryString = {
          $or: [
            { title: { $regex: this.queryString.keywords, $options: 'i' } },
            { description: { $regex: this.queryString.keywords, $options: 'i' } },
          ],
        };
        this.mongooseQuery = this.mongooseQuery.find(query).select('-__v');
      }

      return this;
    }
    if (modelName === 'User') {
      if (this.queryString.keywords) {
        const query: QueryString = {
          $or: [
            { email: { $regex: this.queryString.keywords, $options: 'i' } },
            { name: { $regex: this.queryString.keywords, $options: 'i' } },
          ],
        };
        this.mongooseQuery = this.mongooseQuery.find(query).select('-__v');
      }

      return this;
    } else {
      if (this.queryString.keywords) {
        const query: QueryString = {
          $or: [{ name: { $regex: this.queryString.keywords, $options: 'i' } }],
        };
        this.mongooseQuery = this.mongooseQuery.find(query).select('-__v');
      }

      return this;
    }
  }

  paginate(countDocuments: number): this {
    const page = Number(this.queryString.page) * 1 || 1;
    const limit = Number(this.queryString.limit) * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit; // 2 current page * 10 page limit = 20

    // Pagination result
    const pagination: PaginatedResult = {
      limit,
      currentPage: page,
      numberOfPages: Math.ceil(countDocuments / limit), // limit 50 document in db/ 10 client limit = 5 pages

      // next page
    };
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

export default ApiFeatures;
