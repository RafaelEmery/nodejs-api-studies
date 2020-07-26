const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    //Getting the token from header of req
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            message: 'No token provided'
        });
    }

    //Splitting the authHeader
    //Bearer d212ask4342dmas3213asdma4324lkm (Hash code)
    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        return res.status(401).send({
            message: 'Token error'
        });
    }

    //Getting the two parts from the header
    const [ scheme, token ] = parts;

    if (!/^Bearer$^/i.test(scheme)) {
        return res.status(401).send({
            message: 'Wrong token'
        });
    }
    
    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                message: 'Invalid token'
            });
        }

        req.userId = decoded.id;
        return next();
    });
}   