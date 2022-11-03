import axios from "axios";

// get comments for 1 review
export const getComments = async (id) => {
    let response;
    try {
        response = await axios({
            
            url: `http://localhost:8000/comment/review/${id}`,
            method: 'get'
        })
        return response.data.data
    } catch (err) {
        return err.response.data
    }
}

// post comment
export const postComment = async (userId, reviewId, comment) => {
    let response;
    try {
        response = await axios({
            url: 'http://localhost:8000/comment',
            method: 'post',
            data: {
                userId : userId,
                reviewId: reviewId,
                comment: comment
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// delete comment
export const deleteComment = async (commentId, reviewId, userId) => {
    let response;
    try {
        response = await axios({
            url:`http://localhost:8000/comment/${commentId}/review/${reviewId}`,
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

// update comment
export const putComment = async (userId, commentId, comment) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/comment/${commentId}`,
            method: 'put',
            data : {
                userId: userId,
                comment: comment
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// get comments to check
export const getAllCommentsNotChecked = async () => {
    let response;
    try {
        response = await axios({
            url:"http://localhost:8000/comment/all/tocheck",
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

// update check comment
export const checkComment = async (commentId) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/comment/${commentId}`,
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