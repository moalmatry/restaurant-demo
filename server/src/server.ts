/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import config from 'config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import globalErrorHandler from './controller/error.controller';
import router from './routes';
import AppError from './utils/AppError';
import dbConnection from './utils/database';
import log from './utils/logger';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
// @ts-ignore
import xss from 'xss-clean'; // NOTE: this package is deprecated and no ts for it but i can't find alternative solution

// connect db
dbConnection();
// Express App
const app = express();
const port = config.get<number>('port');
const environment = config.get<string>('environment');
// NOTE: Global Middleware

// Security HTTP Headers
app.use(helmet());
// Rate Limiter for requests from the same ip
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 500,
  message: 'Too many requests from this IP, please try again in an hour! ',
});
app.use('/api', limiter);
// Enable domain to access the api
app.use(cors({ origin: '*' }));
// Body parser , reading data from body int req.body

// middleware
app.use(express.json({ limit: '5mb' }));

// to remove html & js
app.use(xss());

// To remove mongo from query and body
app.use(mongoSanitize());

// Prevent parameter pollution by HPP
app.use(hpp({ whitelist: ['price', 'sold', 'quantity', 'ratingsAverage', 'ratingsQuantity'] }));
// Serve files
app.use(express.static(path.join(`${__dirname.replace('src', '')}`, 'uploads')));

if (environment === 'development') {
  app.use(morgan('dev'));
  log.info('Morgan enabled in development mode');
}

// Mount Routes
app.use(router);

// Global Error Handler to catches not found routes
app.all('*', (req, res, next) => {
  // Create error and send it
  next(new AppError(`Can't find this route ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const server = app.listen(port, () => {
  log.info(`Running on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////
/* handle Unhandled Rejection  */
// Events => list => callbacks(err)
process.on('unhandledRejection', (err: any) => {
  log.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    log.error(`Shutting down......`);
    process.exit(1);
  });
});
