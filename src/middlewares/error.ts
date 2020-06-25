/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

function handleError(
  error: HttpError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  const { status = 500, message, stack } = error;

  response.status(status).json({
    status,
    message,
    stack,
  });
}

export default handleError;
