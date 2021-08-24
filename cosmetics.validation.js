const { body, validationResult } = require('express-validator');

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
}

const saveValidation = [
    body('name').notEmpty().isLength({ min: 5}).withMessage('Name must be at least 5 chars long!'), 
    body('color').notEmpty().isLength({ min: 3}).withMessage('Color must be at least 3 chars long!'),
    body('price').notEmpty().withMessage('Item must have a price!'),
    checkValidation 
];
module.exports = {
    saveValidation
};