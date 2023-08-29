import express from 'express';
import { login, register } from '../controllers/auth';
import { registerValidator } from '../validations/auth';
import validationErrorHandlerMiddleware from '../middleware/validation-error-handler';

const router = express.Router();

router.post(
  '/register',
  registerValidator(),
  validationErrorHandlerMiddleware,
  register
);

router.post('/login', login);

export default router;