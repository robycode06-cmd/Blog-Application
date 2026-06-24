import { validateToken } from "../services/authentication.js";


function checkForAuthentication(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {

        const payload = validateToken(token);

        req.user = payload;

    } catch (err) {}

    next();
}

export default  checkForAuthentication;