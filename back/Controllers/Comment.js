import { Comment } from '../Models/Comments.js'
import {commentEditValidation, commentValidation} from '../validationSchemas/commentSchema.js'
import { idValidation } from '../validationSchemas/idValidation.js'


//post
export const createComment = async (req, res) => {
    const{body} = req
    const {error} = commentValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try{
        response = await Comment.create({...body})
        res.status(201).json({status:201, msg: "Created resource"})
    }catch(err){
        res.status(500).json(err.parent.message)
    }
}

// get all comments for 1 review
export const findAllForOneReview = async (req, res) => {
    const {reviewid} = req.params
    const {error} = idValidation(reviewid)
    if(error) return res.status(401).json(error.details[0].message)
    let response;
    try {
        response = await Comment.findAll({where : {reviewId: reviewid }})

    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({data: response})
    }
}

// update 1 comment
export const updateComment = async (req, res) => {
    const {body} = req
    const {commentid} = req.params
    const {err} = idValidation(commentid)
    if(err) return res.status(401).json(err.details[0].message)
    const {error} = commentEditValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Comment.update({...body}, {where : {id: commentid}})
        res.status(200).json({status:200, msg:'Resource updated'})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// delete 1 comment
export const destroyComment = async (req, res) => {
    let response
    const {commentid} = req.params
    const {error} = idValidation(commentid)
    if(error) return res.status(401).json(error.details[0].message)
    try {
        response = Comment.destroy({where : {id: commentid}})
        res.status(200).json({status:200, msg:'Resource deleted'})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get all comments to check
export const findCommentsToCheck = async (req, res) => {
    let response;
    try {
        response = await Comment.findAll({where: {checked: false}})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status:200, data: response})
    }
}