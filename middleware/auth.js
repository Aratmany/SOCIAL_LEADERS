const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    try {
        const token = req.headers['x-auth-token']

        if (!token) {
            return res.status(401).json({ msg: 'Нет авторизации' })
        }
    
        const decoded = jwt.verify(token, config.get('jwt'))
        req.user = decoded.user
        next()
    } catch (e) {
        res.status(401).json({ msg: 'Токен не подтверждён' })
    }
}