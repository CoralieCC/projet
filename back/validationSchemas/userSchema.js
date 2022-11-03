import Joi from 'joi'

export const registerValidation = (body) => {
    const userSchema = Joi.object({
        email: Joi.string().lowercase().email().trim().required(),
        username: Joi.string().required().min(3).max(15).trim().required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).trim().required(),
        confirmPassword: Joi.ref('password')
    })
    return userSchema.validate(body)
}

export const loginValidation = (body) => {
    const userSchema = Joi.object({
        email: Joi.string().lowercase().email().trim().required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).trim().required(),
    })
    return userSchema.validate(body)
}

export const roleValidation = (body) => {
    const roleValidation = Joi.number().integer().min(1).max(4).required()
    return roleValidation.validate(body)
}