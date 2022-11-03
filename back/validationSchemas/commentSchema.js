import Joi from 'joi'

export const commentValidation = (body) => {
    const commentSchema = Joi.object({
        userId : Joi.number().integer().min(1).required(),
        reviewId: Joi.number().integer().min(1).required(),
        comment: Joi.string().min(5).required(),
        checked: Joi.boolean()
    })

    return commentSchema.validate(body)
}

export const commentEditValidation = (body) => {
    const commentSchema = Joi.object({
        comment: Joi.string().min(5),
        checked: Joi.boolean()
    })
    return commentSchema.validate(body)
}