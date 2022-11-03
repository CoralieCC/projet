import crypto from "crypto";
import jwt from "jsonwebtoken";
import { secret, tokenSecret } from '../config/config.js' 


export const passwordCrypter = (password) => {
    // create a sha-256 hasher
    const sha256Hasher = crypto.createHmac("sha256", secret);

    // hash the string
    return sha256Hasher.update(password).digest("hex");
}

export const createToken = ({email, role, id}) => {
    const token = jwt.sign(
        {
            email: email,
            role: role,
            userId: id
        },
        tokenSecret,
        {expiresIn: "2h"}
    )

    return token
}

export const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, tokenSecret)
        return true 

    } catch (err) {
        return false
    }
}

export const decodeToken = (token) => {
    let decoded
    try {
        decoded = jwt.verify(token, tokenSecret)
    } catch (err) {
        return false
    }
    return decoded
}