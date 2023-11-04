import { check, validationResult } from 'express-validator';

export const runValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg,
        });
    }
    next();
};

export const validationRegister = [
    check('username', `Username can't be empty`).notEmpty(),
    check('email', `Email can't be empty`).notEmpty().matches(/.+\@.+\..+/).withMessage('Please enter email in the correct format'),
    check('password', `Password can't be empty`).notEmpty().isLength({ min: 8 }).withMessage('Password must contain at least 8 characters with combinations of capital letters, numbers, and symbols.'),
    check('fullName', `Full Name can't be empty`).notEmpty(),
];

export const validationLogin = [
    check('username', `Username can't be empty`).notEmpty(),
    check('password', `Password can't be empty`).notEmpty(),
];

export const validationPost = [
    check('whoCreated', `Who is posting can't be empty.`).notEmpty(),
    check('title', `Title can't be empty`).notEmpty(),
    check('content', `Content can't be empty`).notEmpty(),
];
