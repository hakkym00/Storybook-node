const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user')
const dotenv = require('dotenv');
dotenv.config()

const initialise = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        })

        try {
            user = await User.findOne({googleId: newUser.googleId})
            if(user){
                return done(null, user)
            }else {
            const user = await User.create(newUser)
            return done(null, user)
            }

        } catch (error) {
            
        }
    }))
    passport.serializeUser((user, done) => done(null, user.id));
      
      passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => done(err, user));
      });
}

module.exports = {
    initialise
}