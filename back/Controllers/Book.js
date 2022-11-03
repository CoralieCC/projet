import { Book } from '../Models/Books.js'
import { bookEditValidation, bookValidation } from '../validationSchemas/bookSchema.js'
import { Op } from 'sequelize'
import { idValidation } from '../validationSchemas/idValidation.js'

// post 
export const createBook = async (req, res) => {
    const {body} = req
    const {error} = bookValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Book.create({...body})
        res.status(201).json({msg: "Created resource"})
    } catch(err) {
        res.status(500).json(err.parent.message)
    }
}

// get all books
export const findAllBooks = async (req, res) => {
    let response;
    try {
        response = await Book.findAll({attributes: ['id', 'title', 'authorId', 'summary', 'image']})
        res.status(200).json({data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get all books by 1 author
export const findBooksByOneAuthor = async (req, res) => {
    const {authorid} = req.params
    const {error} = idValidation(authorid)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Book.findAll({where : { authorId: authorid}})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status:200, data: response})
    }
}

// update 1 book
export const updateBook = async (req, res) => {
    const {body} = req
    const {bookid} = req.params
    const {error} = idValidation(bookid)
    if(error) return res.status(401).json(error.details[0].message)
    const {err} = bookEditValidation(body)
    if(err) return res.status(401).json(err.details[0].message)

    let response
    try {
        response = await Book.update({...body}, {where : {id: bookid}})
        res.status(200).json('Resource updated')
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get 1 book
export const findOneBook = async (req, res) => {
    const {bookid} = req.params
    const {error} = idValidation(bookid)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Book.findByPk(bookid)
        res.status(200).json({status:200, data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get books by search
export const findBooksBySearch = async(req, res) => {
    const{search} = req.params
    let response;
    try {
        response = await Book.findAll({where: {
            title : {
                [Op.substring] : search
            }
        }})
        
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status:200, data: response})
    }
}

// get all books not checked
export const findBooksNotChecked = async (req, res) => {
    let response;
    try {
        response = await Book.findAll({where: {checked: false}})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }

    if(response === null) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json({status:200, data: response})
    }
}

// delete 1 book
export const destroyBook = async (req, res) => {
    let response;
    const {bookid} = req.params
    const {error} = idValidation(bookid)
    if(error) return res.status(401).json(error.details[0].message)

    try {
        response = await Book.destroy({where: {id: bookid}})
        res.status(200).json("Resource deleted")
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}