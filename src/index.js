const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const hbs = require('hbs')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
require('./db/mongoose.js')
const storyRouter = require('./route/story')
const pageRouter = require('./route/page')
const authRouter = require('./route/auth')
const {initialise} = require('./config/passport.js')
const mongoose = require('mongoose')
const { dateFormat, stripTag, truncateStr, editIcon, select } = require('./helper/helper.js')
const { nextTick } = require('process')

dotenv.config()
const app = express()


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
const port = process.env.PORT || 5000

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../template/views')
const partialDirectoryPath = path.join(__dirname, '../template/partials')

//hanlebar helper



//setting views

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerHelper('dateFormat', dateFormat);
hbs.registerHelper('truncateStr', truncateStr)
hbs.registerHelper('stripTag', stripTag)
hbs.registerHelper('editIcon', editIcon)
hbs.registerHelper('select', select)
hbs.registerPartials(partialDirectoryPath)

//passport config
initialise(passport)

app.use(express.urlencoded({extended: false}))

// method-override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))
  
//session
app.use(session({
    secret: 'secret',
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    saveUninitialized: false,
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// set global variable

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

//serving statics files
app.use(express.static(publicDirectoryPath))
app.use('/', pageRouter)
app.use('/stories', storyRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log('Your server is running on port ' + port)
})
