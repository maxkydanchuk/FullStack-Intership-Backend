import jwt from "jsonwebtoken";
import {secretKey} from "../config/config.js";

const verifyUser = (req, res, next) => {

    let token = req.get('x-access-token');

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secretKey, (err) => {
        if(err) {
            return res.status(401).send({ error: 'Unauthorized'}) // !400
        }
        return next();
    })
}
export default verifyUser;
