import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../errors";

const validationErrorHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  throw new BadRequestError(result.array().map((err) => err.msg).join(', '));
};

export default validationErrorHandlerMiddleware;