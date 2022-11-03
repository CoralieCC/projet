import axios from "axios";

// get all reviews for 1 book
export const getAllReviews = async (bookId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/review/book/${bookId}`,
            method: 'get'
        })
        return response.data.data
    } catch (err) {
        return err.response.data
    }
}

// post review
export const postReview = async (userId, bookId, review, rating, published) => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/review",
            method: "post",
            data: {
                userId: userId,
                bookId: bookId,
                review: review,
                rating: rating,
                published: published
            }
        })
        return response.data
    } catch (err) {
        localStorage.removeItem('token')
        window.location.href = "/"
        // return err.response.data
    }
}

// delete review
export const deleteReview = async (reviewId, userId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/review/${reviewId}`,
            method:'delete',
            data: {
                userId: userId
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// update review
export const putReview = async (userId, reviewId, content, rating, published) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/review/${reviewId}`,
            method: 'put',
            data: {
                userId: userId,
                review: content,
                rating: rating,
                published: published
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// get all reviews for 1 user
export const oneUserReviews = async (userId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/review/user/${userId}`,
            method: "get"
        })
        return response.data
    } catch (err) {
        localStorage.removeItem('token')
        window.location.href = "/"
        //return err.response.data
    }
}

// get all reviews to check
export const getAllReviewsNotChecked = async () => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/review/all/tocheck",
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// check review
export const checkReview = async (reviewId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/review/${reviewId}`,
            method: "put",
            data: {
                checked: true
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}