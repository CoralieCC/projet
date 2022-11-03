import axios from 'axios'

//post register
export const register = async (email, username, password, confirmPassword) => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/register",
            method: "post",
            data: {
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                username: username
            }
        })
        return response.data
    } catch(err) {
        return err.response.data
    }
}

export const login = async (email, password) => {
    let response;
    try {
        response = await axios({
            url: "http://localhost:8000/login",
            method: "post",
            data: {
                email: email,
                password: password,
            },
        });
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const username = async (id) => {
    let response;
    try {
        response = await axios({
            url : `http://localhost:8000/user/${id}`,
            method: 'get'
        })
        return response.data.data
    } catch (err) {
        return err.response.data;
    }
}

export const getAllUsers = async () => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/user`,
            method: 'get'
        })
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const updateRole = async (id, role) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/user/role/${id}`,
            method: "put",
            data : {
                role: role
            }
        })
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deleteUser = async (id) => {
    let response;
    try {
        response = await axios({
            url: `http://localhost:8000/user/${id}`,
            method: 'delete'
        })
        return response.data
    } catch (err) {
        return err.response.data;
    }
}