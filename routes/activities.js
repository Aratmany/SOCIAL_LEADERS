const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()

const Activity = require('../models/Activity')
const User = require('../models/Users')
const auth = require('../middleware/auth')

router.post('/create', auth, async(req, res) => {
    
    const { title, description, content, end, region, city, district, category } = req.body
    const user = await User.findById(req.user.id)

    try {
        const activity = new Activity({title, description, content, end, region, city, district, category})
        activity.leaders = [mongoose.Types.ObjectId(user)]
        await activity.save()
        
        user.activities = [...user.activities, activity.id]
        await user.save()

        res.json({activity})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
})

router.get('/all', async (req, res) => {
    try {
        const activities = await Activity.find()

        res.json({activities})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
}) 

router.get('/for-me', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id)
        const interests = user.interests
        
        let activities = await Activity.find()
        activities = activities.filter((item) => interests.includes(item.category))
        res.json({activities})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
}) 

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        let activity = await Activity.findById(id)

        if (!activity) {
            return res.status(400).json({ msg: 'Инициатива не найдена'})
        }
        let author = User.findById(activity.leaders[0])
        res.json({activity})
    } catch(err) {
        console.error(err.message)
        res.status(500).json({ msg: err.message })
    }
})





module.exports = router