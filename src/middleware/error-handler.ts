import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors';

interface CustomError extends CustomAPIError {
  code?: number;
  keyValue?: object;
  value?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // if (err.name === 'ValidationError') {
  //   customError.msg = Object.values(err.errors)
  //     .map((item) => item.message)
  //     .join(',')
  //   customError.statusCode = 400
  // }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue ?? ''
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;