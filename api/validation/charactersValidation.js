// Import the Joi library for data validation
const Joi = require('joi');

// Define a schema for character validation
const characterSchema = Joi.object({
    name: Joi.string().min(1).max(100).required()
})

// Define a schema for move validation
const moveSchema = Joi.object({
    move: Joi.string().min(1).max(100).required()
})

// Define a schema for frame data validation
const frameDataSchema = Joi.object({
    character: Joi.string().min(1).max(100).required(),
    move: Joi.string().min(1).max(100).required(),
    startup: Joi.number().integer().min(0).required(),
    on_block: Joi.number().integer().allow(null).optional(),
    recovery: Joi.number().integer().min(0).allow(null).optional(),
    on_hit: Joi.number().integer().allow(null).optional(),
    notes: Joi.string().max(500).allow(null, '').optional()
})

// Define a schema for updating frame data (body only, params come from URL)
const updateFrameDataSchema = Joi.object({
    startup: Joi.number().integer().min(0).required(),
    on_block: Joi.number().integer().allow(null).optional(),
    recovery: Joi.number().integer().min(0).allow(null).optional(),
    on_hit: Joi.number().integer().allow(null).optional(),
    notes: Joi.string().max(500).allow(null, '').optional()
})

// Export the validation schemas to be used in the characterroutes
module.exports = {
    characterSchema,
    moveSchema,
    frameDataSchema,
    updateFrameDataSchema
}