const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage
]