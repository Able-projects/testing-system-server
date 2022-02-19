const jwt = require('jsonwebtoken');
const User = require('../../models/Users');


const authenticate = async (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization) {
        req.user = undefined;
        return next();
    }

    authorization = authorization.replace("Bearer ", "");
    authorization = authorization.replace("bearer ", "");

    try {
        const decodedJWT = decodeJWT(authorization);
        req.user = await User.findOne({ email: decodedJWT.email })
    } catch(err) {
       
    }

    next();
};

function decodeJWT(token){
    return jwt.verify(token, 'able_private_key');
}

module.exports = authenticate;
