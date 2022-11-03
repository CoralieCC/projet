import Joi from 'joi'

export const reviewValidation = (body) => {
    const reviewSchema = Joi.object({
        userId: Joi.number().required(),
        bookId: Joi.number().required(),
        review : Joi.string().min(3).trim().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
        published: Joi.boolean().required(),
        checked: Joi.boolean()
    })

    return reviewSchema.validate(body)
}

export const reviewEditValidation = (body) => {
    const reviewSchema = Joi.object({
        review : Joi.string().min(3).trim(),
        rating: Joi.number().integer().min(1).max(5),
        published: Joi.boolean(),
        checked: Joi.boolean()
    })

    return reviewSchema.validate(body)
}