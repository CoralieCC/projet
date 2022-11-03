import Joi from 'joi'

export const authorValidation = (body) => {
    const authorValidation = Joi.object({
        name: Joi.string().trim().required().min(3).max(50)
    })
    return authorValidation.validate(body)
}