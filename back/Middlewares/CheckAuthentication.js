import { getReviewUserId } from "../Controllers/Review.js";
import { decodeToken, verifyToken } from "../Utils/utils.js";

// verify if user is authenticated
export const checkAuthentication = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
        const authorized = verifyToken(token)
        if(authorized){
            next()
        } else {
            res.status(403).json({status: 403, message: "Unauthorized"})
        }
    } else {
        res.status(403).json({status: 403, message: "No token provided"})
    }
}

// verify if authenticated user is admin
export const checkAdmin = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token = authorizationHeader.split(' ')[1];
    const decoded = decodeToken(token)
    if(decoded === false || decoded.role !== 1){
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else {
        next()
    }
}

// verify if authenticated user is the creator (update review or comment)
export const checkCreator = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const {userId} = req.body
    const {error} = idValidation(userId)
    if(error) return res.status(401).json(error.details[0].message)

    let token = authorizationHeader.split(' ')[1];
    const decoded = decodeToken(token)
    if(decoded === false || decoded.userId !== +userId){
        return res.status(403).json({status: 403, message: "Unauthorized"})
    }else {
        next()
    }
}

// verify if authenticated user is admin, moderator or creator
export const checkAdminModOrCreator = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const {userId} = req.body
    const {error} = idValidation(userId)
    if(error) return res.status(401).json(error.details[0].message)

    let token = authorizationHeader.split(' ')[1];
    const decoded = decodeToken(token)
    if(decoded === false){
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if((decoded.role === 3 || decoded.role === 4) && decoded.userId !== +userId) {
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if(decoded.userId === +userId || decoded.role === 2 || decoded.role === 1){
        next()
    }
}
// verify id authenticated user is admin, moderator, creator or review creator (to delete comments)
export const checkAdminModCreatorOrReviewCreator = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const {userId} = req.body
    const {reviewid} = req.params
    const {error} = idValidation(reviewid)
    if(error) return res.status(401).json(error.details[0].message)
    const {err} = idValidation(userId)
    if(err) return res.status(401).json(err.details[0].message)
    
    let token = authorizationHeader.split(' ')[1];
    const decoded = decodeToken(token)
    const reviewUserId = await getReviewUserId(reviewid)
    if(decoded === false){
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if((decoded.role === 3 || decoded.role === 4) && (decoded.userId !== +userId || reviewUserId.userId !== decoded.userId)) {
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if(decoded.userId === +userId || decoded.role === 2 || decoded.role === 1 || decoded.userId === reviewUserId.userId){
        next()
    }
}

// check if authenticated user is admin or moderator
export const checkAdminOrMod = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token = authorizationHeader.split(' ')[1];
    const decoded = decodeToken(token)
    if(decoded === false){
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if(decoded.role === 3 && decoded.role === 4) {
        return res.status(403).json({status: 403, message: "Unauthorized"})
    } else if(decoded.role === 2 || decoded.role === 1 ){
        next()
    }
}