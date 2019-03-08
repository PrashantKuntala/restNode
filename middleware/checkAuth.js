const jwt = require('jsonwebtoken');

// retrieve the configuration
const Config = require('../config.json');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, Config.JWT_KEY);
        req.userData = decoded;
        console.log(req.userData);        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};