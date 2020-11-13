const express = require('express')
const { isAuth } = require('../middleware/auth')
const { find } = require('../model/story')
const Story = require('../model/story')
const router = express.Router()

router.get('/add', isAuth,async (req, res) => {
    res.render('add')  
})


router.get('/edit/:id', isAuth,async (req, res) => {
    const story = await Story.findById(req.params.id).lean()
    if(!story){
        res.render('404')
    }
    else if(story.owner != req.user.id){
        res.render('public')
    }else{
        res.render('edit', {story})
    }
})

router.get('/user/edit/:id', isAuth,async (req, res) => {
    const story = await Story.findById(req.params.id).lean()
    if(!story){
        res.render('404')
    }
    else if(story.owner != req.user.id){
        res.render('public')
    }else{
        res.render('edits', {story})
    }
})

router.post('/', isAuth, async(req, res) => {
    req.body.owner = req.user._id
    try {
        story = new Story({
            title: req.body.title,
            status: req.body.status,
            body: req.body.body,
            owner: req.body.owner
        })
        const newStory = await story.save()
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
        res.render('500')
    }
})

router.get('/', isAuth, async (req, res) => {
     try {
        const stories = await Story.find({ status: 'public' }).populate('owner').sort({createdAt: 'desc'}).lean()
        if(!stories){
            res.render('404')
        }else{
            res.render('public', {
                stories
            })
        }

     } catch (error) {
        console.log(error)
        res.render('500')
        
     }
})

router.get('/:id', isAuth, async (req, res) => {
   try {

    const story = await Story.findById(req.params.id).populate('owner').lean()
    if(!story){
        res.render('404')
    }else{
        res.render('read', {story})
    }

   } catch (error) {
       res.render('500')
   }
})

router.put('/:id', isAuth, async(req, res) => {
    try {
        req.body.owner = req.user._id
    console.log(req.body)
    let story = await Story.findById(req.params.id)
    if(!story){
        res.render('400')
    }else if(story.owner != req.user.id){
        res.redirect('/stories')
    }else{
        console.log(story)
        if(story){
            story.title = req.body.title;
            story.status = req.body.status;
            story.body = req.body.body;
            newStory = await story.save()
            console.log(newStory)
            res.redirect('/')
        }
    }
    } catch (error) {
        res.render('500')
    }
    
})

router.delete('/delete/:id', isAuth, async (req, res) => {

    try {
        const story = await Story.findById(req.params.id)
        if(!story){
            res.render('404')
        }else{
            await story.remove()
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error)
        res.render('500')
    }
})

router.get('/user/:id', isAuth, async (req, res) => {
    try {       
        const stories = await Story.find({owner: req.params.id, status: 'public'}).populate('owner').sort({createdAt: 'desc'}).lean()
        if(!stories){
            res.render('404')
        }else{
            res.render('user', {
                stories,
                name: stories[0].owner.firstName
            })
        }

     } catch (error) {
        console.log(error)
        res.render('500')
        
     }
})
module.exports = router