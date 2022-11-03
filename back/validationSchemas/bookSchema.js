import Joi from 'joi'

export const bookValidation = (body) => {
    const bookSchema = Joi.object({
        title : Joi.string().trim().required(),
        authorId: Joi.number().integer().min(1).required(),
        summary: Joi.string().min(20).trim().required(),
        image: Joi.string().trim(),
        checked: Joi.boolean()
    })

    return bookSchema.validate(body)
}

export const bookEditValidation = (body) => {
    const bookSchema = Joi.object({
        title: Joi.string().trim(),
        authorId: Joi.number().integer().min(1),
        summary: Joi.string().min(20).trim(),
        image: Joi.string().trim(),
        checked: Joi.boolean()
    })

    return bookSchema.validate(body)
}