import Joi from 'joi'

export const idValidation = (body) => {
    const idValidation = Joi.number().integer().min(1).required()
    return idValidation.validate(body)
}