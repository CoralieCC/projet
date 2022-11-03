import { User } from "../Models/User.js"
import { createToken, passwordCrypter } from "../Utils/utils.js"
import { loginValidation, registerValidation, roleValidation } from "../validationSchemas/userSchema.js"
import { idValidation } from '../validationSchemas/idValidation.js'

// register a user
export const register = async (req, res) => {
    const {body} = req
    const {error} = registerValidation(body)
    if(error) return res.status(401).json(error.details[0].message)
    const hashPassword = passwordCrypter(body.password)
    let response;
    /*ROLES : 1. ADMIN / 2. MODERATOR / 3. USER / 4. DEACTIVATED */
    try {
        response = await User.create({email: body.email, password: hashPassword, username: body.username, role: 3})
        res.status(201).json({msg: "Created resource"})
    } catch(err){
        res.status(500).json(err.parent.message)
    }
}

// authenticate a user
export const authentication = async (req, res) => {
    const {body} = req
    const {error} = loginValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let user;

    try {
        user = await User.findOne({where: {email: body.email}})
    } catch (err) {
        console.log(err)
    }

    if(user === null){
        return res.status(404).json("Not Found")
    } else {
        if(user.role === 4){
            res.status(403).json({status:403, msg:"Forbidden"})
        }
        const hashPassword = passwordCrypter(body.password)
        if(hashPassword === user.password){
            const token = createToken(user)
            res.status(200).json({data: token, status: 200 })
        } else {
            return res.status(401).json({status:401, msg:'Unauthorized'})
        }
    }
}

// get username by userId
export const getUsername = async (req, res) => {
    const {userid} = req.params
    const {error} = idValidation(userid)
    if(error) return res.status(401).json(error.details[0].message)

    let user;
    try {
        user = await User.findByPk(userid, {attributes:["username"]})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(user === null){
        return res.status(404).json("Not Found")
    } else {
        res.status(200).json({status: 200, data: user})
    }
}

// get all users (only admin)
export const findAllUsers = async (req, res) => {
    let response;
    try {
        response = await User.findAll({attributes: ['id', 'email', 'username', 'role']})
        res.status(200).json({status:200, data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// update user role (only admin)
export const putUserRole = async (req, res) => {
    const{role} = req.body
    const{userid} = req.params
    const {err} = idValidation(userid)
    const {error} = roleValidation(role)
    if(error) return res.status(401).json(error.details[0].message)
    if(err) return res.status(401).json(err.details[0].message)
    let response;
    try {
        response = await User.update({role: role}, {where : {id: userid}})
        console.log(response[0])
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response[0] === 1) {
        res.status(200).json({status: 200, msg: "Resource updated"})
    } else {
        res.status(500).json('Internal Server Error')
    }
}

// delete user (only admin)
export const destroyUser = async (req, res) => {
    const {userid} = req.params
    const {err} = idValidation(userid)
    if(err) return res.status(401).json(error.details[0].message)

    try {
        response = await User.destroy({where: {id: userid}})
        res.status(200).json({status:200, msg:'Resource deleted'})
    } catch (err){
        res.status(500).json(err.parent.message)
    }
}