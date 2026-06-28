// Import Joi for schema validation
const Joi = require('joi');

// Define a schema for user registration validation
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required()
})

// Define a schema for user login validation
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

// Export the validation schemas to be used in the routes
module.exports = {
    registerSchema,
    loginSchema
}
