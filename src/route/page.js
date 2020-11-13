const express = require('express')
const { isAuth } = require('../middleware/auth')
const { isLoggedIn } = require('../middleware/auth')
const Story = require('../model/story')
const User = require('../model/user')
const router = express.Router()


router.get('/', isAuth ,async (req, res) => {
    try {
        const stories = await Story.find({owner: req.user._id}).lean()
    
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
        
    } catch (error) {
        res.render('500')
    }
})

router.get('/login', isLoggedIn ,async (req, res) => {
    res.render('login')
})



module.exports = router