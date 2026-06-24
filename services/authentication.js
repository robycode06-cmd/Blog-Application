import JWT from "jsonwebtoken";

const secret = "superMan@123";

export function createTokenForUser(user){
    const payload = {
        _id: user._id,
        fullName:user.fullName,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

export function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}