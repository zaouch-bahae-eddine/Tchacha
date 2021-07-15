const JWT = require('njwt');
const dotenv = require('dotenv');
dotenv.config();

const makeJWT = (claims) => {
    const jwt =  JWT.create(claims, process.env.SECRET_KEY);
    jwt.setExpiration();
    return jwt.compact();
}
module.exports.JWTService = {
    makeJWT,
}