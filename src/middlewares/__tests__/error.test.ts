import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import logger from '../../utils/logger';
import errorHandler from '../error';

function buildRequest(overrides: Partial<Request> = {}): Request {
  const request = {
    ...overrides,
  } as Request;

  return request;
}

function buildResponse(overrides: Partial<Response> = {}): Response {
  const response = {
    json: jest.fn(() => response).mockName('json'),
    status: jest.fn(() => response).mockName('status'),
    ...overrides,
  } as Response;

  return response;
}

function buildNext(error?: any): NextFunction {
  const next = jest.fn(error).mockName('next') as unknown as NextFunction;

  return next;
}

describe('errorHandler', () => {
  it('should response with `NOT_FOUND` error', () => {
    expect.assertions(7);

    const spy = jest.spyOn(logger, 'error');

    const status = StatusCodes.NOT_FOUND;
    const message = ReasonPhrases.NOT_FOUND;
    const error = createError(status, message);

    const request = buildRequest();
    const response = buildResponse();
    const next = buildNext();

    errorHandler()(error, request, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message,
        service: 'user-service',
        stack: expect.any(String),
        status,
      }),
    );
    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(status);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ status, message });
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should fall back to `INTERNAL_SERVER_ERROR` if no custom error is defined', () => {
    expect.assertions(7);

    const spy = jest.spyOn(logger, 'error');

    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = ReasonPhrases.INTERNAL_SERVER_ERROR;
    const error = createError();

    const request = buildRequest();
    const response = buildResponse();
    const next = buildNext();

    errorHandler()(error, request, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message,
        service: 'user-service',
        stack: expect.any(String),
        status,
      }),
    );
    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(status);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ status, message });
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});
