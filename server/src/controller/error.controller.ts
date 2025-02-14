/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import log from '../utils/logger';

const environment = config.get<string>('environment');

/** @description handle mongoose validation error  */
const handleValidationErrorDB = (err: AppError | any) => {
  const errors = Object.values(err.errors).map((error: any) => error.message);
  const cleanError = JSON.stringify(err.errors)
    .replace(/[{}\\[\]":']+/g, '')
    .replace(/,/g, ' ');
  const message = `Invalid input data. ${errors.join('. ')} ${cleanError}`;

  return new AppError(message, 400);
};

/** @description handle mongoose duplicate key error */
const handleDuplicateErrorDB = (err: AppError | any) => {
  const value = err.errorResponse.errmsg.match(/"([^"]*)"/g)[0];
  const message = `duplicate field value: ${value}. Please use another value! `;
  return new AppError(message, 400);
};

const handleDuplicateErrorDBTwo = (err: AppError | any) => {
  return new AppError('This record must be unique', 400);

  // const value = err.errorResponse.errmsg.match(/"([^"]*)"/g)[0];
  // const message = `duplicate field value: ${value}. Please use another value! `;
  // return new AppError(message, 400);
};

/** @description handle mongoose invalid key error  */
const handleCastErrorDB = (err: AppError | any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 500);
};

/** @description send detailed errors PROJECT_ENV === development  */
const sendErrorDev = (err: AppError | any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    statusbar: err.stack,
  });
};

/** @description handle jwt invalid signature */
const handleJwtError = (err: AppError | any) => new AppError(`${err.message}`, 401);

/** @description handle jwt invalid signature */
const handleJwtExpiredError = (err: AppError | any) => new AppError(`${err.message}`, 401);

const handlePrismaUniqueError = (err: AppError | any) =>
  new AppError(`This field must be unique (${err.meta.target})`, 401);

const handlePrismaRecordNotFound = (err: AppError | any) => new AppError(`(${err.meta.cause}) 😡`, 401);

/** @description send detailed errors PROJECT_ENV === production  */
const sendErrorProduction = (err: AppError | any, res: Response) => {
  // Operational, trusted error: send message to client

  if (!err.isOperational) {
    // log.error('isOperational');
    return res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    });
    // Programming error details not important from client
  } else if (err.isOperational) {
    // log.error('!isOperational');
    log.error(err);
    res.status(500).send({
      status: 'error',
      message: 'Something went wrong, please try again later.',
    });
  } else {
    return res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    });
  }
};

/** this method handler to catch all errors in all the app
 *  @description create environment variable called PROJECT_ENV , if PROJECT_ENV === development you will get specific error messages in responses ,if PROJECT_ENV === production you will get short error messages for clients ,Default it sends production error
 */
// NOTE: don't remove next function even though you don't use it because it will makes socket.io error
const globalErrorHandler = (err: AppError | any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (environment === 'development') {
    sendErrorDev(err, res);
  } else if (environment === 'production') {
    // let error = deepClone(err);

    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }

    if (err.code === 11000) {
      err = handleDuplicateErrorDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
      sendErrorProduction(err, res);
    }
    if (err.name === 'JsonWebTokenError') {
      console.log('------------------------------------------');
      err = handleJwtError(err);
      sendErrorProduction(err, res);
    }
    if (err.name === 'TokenExpiredError') {
      err = handleJwtExpiredError(err);
      sendErrorProduction(err, res);
    }
    if (err.code === 'P2002') {
      err = handlePrismaUniqueError(err);
      sendErrorProduction(err, res);
    }
    if (err.code === 'P2025') {
      err = handlePrismaRecordNotFound(err);
      sendErrorProduction(err, res);
    }

    // In mongoDb set the error the new cloned error but with prisma user the original err object
    sendErrorProduction(err, res);
  } else {
    sendErrorProduction(err, res);
  }
};

export default globalErrorHandler;
