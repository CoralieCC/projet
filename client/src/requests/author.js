import axios from "axios";

export const postAuthor = async (name) => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/author",
            method: "post",
            data: {
                name: name
            }
        })
        return response.data
    } catch(err) {
        return err.response.data
    }
}

export const getAuthors = async () => {
    let response;
    try {
        response = await axios ({
            url :'http://localhost:8000/author',
            method: "get"
        })
        return response.data.data
    } catch (err) {
        return err.response.data
    }
}

// export const searchAuthor = async (name) => {
//     let response;
//     try {
//         response = await axios({
//             url: `http://localhost:8000/author/${name}`,
//             method: 'get'
//         })
//         return response.data.data
//     } catch (err) {
//         return err.response.data
//     }
// }

export const getOneAuthor = async (authorid) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/author/${authorid}`,
            method: 'get'
        })
        return response.data.data

    } catch (err) {
        return err.response.data
    }
}

export const getAuthorsBySearch = async (search) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/author/search/${search}`,
            method: "get"
        })
        return response.data
    } catch (err) {
        return err.response.data
    }

}