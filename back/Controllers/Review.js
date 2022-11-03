import { Review } from '../Models/Reviews.js'
import {reviewEditValidation, reviewValidation} from '../validationSchemas/reviewSchema.js'
import { idValidation } from '../validationSchemas/idValidation.js'

//post
export const createReview = async (req, res) => {
    const{body} = req
    const {error} = reviewValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try{
        response = await Review.create({...body})
        res.status(201).json({status:201, msg: "Created resource"})
    }catch(err){
        res.status(500).json(err.parent.message)
    }
}
// get all reviews for 1 book
export const findAllForOneBook = async (req, res) => {
    const {bookid} = req.params
    const {error} = idValidation(bookid)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Review.findAll({where : {bookId: bookid}})
        
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({data: response})
    }
}

// get 1 review
export const findOneReview = async (req, res) => {
    const {reviewid} = req.params
    const {error} = idValidation(reviewid)
    if(error) return res.status(401).json(error.details[0].message)
    let response;

    try {
        response = await Review.findByPk(reviewid)
        console.log(response)
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

//get all reviews by 1 user
export const findReviewsByOneUser = async (req, res) => {
    const {userid} = req.params
    const {error} = idValidation(userid)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Review.findAll({where : {userId: userid}})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status: 200, data: response})
    }
}

// update 1 review
export const updateReview = async (req, res) => {
    const {body} = req
    const {reviewid} = req.params
    const {error} = idValidation(reviewid)
    if(error) return res.status(401).json(error.details[0].message)
    const {err} = reviewEditValidation(body)
    if(err) return res.status(401).json(err.details[0].message)

    let response
    try {
        response = await Review.update({...body}, {where : {id: reviewid}})
        res.status(200).json({status:200, msg:'Resource updated'})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// delete 1 review
export const destroyReview = async (req, res) => {
    const {reviewid} = req.params
    const {error} = idValidation(reviewid)
    if(error) return res.status(401).json(error.details[0].message)
    
    let response
    try {
        response = Review.destroy({where : {id: reviewid}})
        res.status(200).json({status: 200, msg:'Resource deleted'})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

//get userId for 1 review
export const getReviewUserId = async (reviewId) => {
    let response;
    try {
        response = Review.findByPk(reviewId, {attributes : ["userId"]})
        return response
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

//get all reviews to check
export const findReviewsToCheck = async (req, res) => {
    let response;
    try {
        response = await Review.findAll({where: {checked: false}})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status:200, data: response})
    }
}