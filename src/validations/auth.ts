import { body } from 'express-validator';

const registerValidator = () => [
  body('email')
    .isEmail()
    .withMessage('Email is not valid'),  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long'),
];


export {
  registerValidator,
}