import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';

interface Payload {
  userId: string;
  name: string;
}

interface NewRequest extends Request {
  user?: Payload;
}

const auth = async (req: NewRequest, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be defined');

    const payload = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export default auth;