
const isAuth = (req ,res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}
const isLoggedIn = (req ,res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    }else{
        next()
    }
}

module.exports = {
    isAuth,
    isLoggedIn
}