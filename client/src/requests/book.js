import axios from "axios";

export const postBook = async (title, authorId, summary, image) => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/book",
            method: "post",
            data: {
                title: title,
                authorId: authorId,
                summary: summary,
                image: image
            }
        })
        return response.data
    } catch(err) {
        return err.response.data
    }
}

export const getBook = async (id) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/${id}`,
            method: 'get'
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const booksByAuthor = async (authorId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/author/${authorId}`,
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const booksByTitle = async (search) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/search/${search}`,
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const getAllBooksNotChecked = async () => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/book/all/tocheck",
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const checkBook = async (bookId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/${bookId}`,
            method: 'put',
            data: {
                checked: true
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}
export const deleteBook = async (bookId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/${bookId}`,
            method: 'delete'
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const updateBook = async (bookId, title, summary, image, authorId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/book/${bookId}`,
            method: "put",
            data: {
                title: title,
                authorId: authorId,
                summary: summary,
                image: image,
                checked: true
            }
        })
        return response.data
    } catch(err) {
        return err.response.data
    }
}

