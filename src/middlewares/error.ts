/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import logger from '../utils/logger';

function errorHandler() {
  return (error: HttpError, _request: Request, response: Response, _next: NextFunction): void => {
    const { status, message, stack } = error;

    logger.error({
      status,
      message,
      stack,
    });

    response.status(status).json({
      status,
      message,
    });
  };
}

export default errorHandler;
