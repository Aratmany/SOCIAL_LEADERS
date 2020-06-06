const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const router = Router()

const User = require('../models/Users')

router.post('/register', async(req, res) => {
    const { type, email, password, surname, name, patronymic, bdate, city, interests } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ msg: 'Пользователь с таким e-mail существует' })
        }

        user = new User({type, email, password, surname, name, patronymic, bdate, city, interests})

        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, config.get('jwt'), {expiresIn: '1h'},
        (err, token) => {
            if (err) throw err
            res.json({token})
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
})

router.post('/auth', async (req, res) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: 'Пользователь с таким e-mail не существует' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Неверный пароль' })
        }

        payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, config.get('jwt'), {expiresIn: '1h'},
        (err, token) => {
            if (err) throw err
            res.json({token})
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        let user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ msg: 'Пользователь не существует' })
        }

        res.json({user})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
})

router.get('/', async(req, res) => {

    try {
        let users = await User.find()

        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }

})

module.exports = router