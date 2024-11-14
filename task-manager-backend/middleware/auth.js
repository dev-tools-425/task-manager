require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.header('authorization');
    if (!auth) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const token = auth.split(" ")
        const decoded = jwt.verify(token[1], process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
