const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Model/User')


passport.use(new LocalStrategy(function (username, password, done){
    User.findOne({username: username}, async function(err, user){
        if(err){
            return done(err)
        }
        if (!user) {
            return done(null, false)
        }
        if(!(await user.verifyPassword(password))){
            return done(null, false)
        }

        return done(null, user)
    })

    passport.serializeUser(function (user, done){
        done(null, user.id)
    })

    passport.deserializeUser(async function(id, done){
        const user = await User.findById(id);
        if(!user) {
            return done(err, null)
        }
        done(null, user)
    })
}))

module.exports = passport