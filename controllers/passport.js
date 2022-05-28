const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userSchema = require('../models/userSchema')

module.exports = (passport) => {
    passport.use(new localStrategy((username, password, done) => {
        userSchema.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'Credenciais inválidas' });
    
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err);
                if (res === false) return done(null, false, { message: 'Credenciais inválidas' });
                
                return done(null, user);
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        try {
            const user = userSchema.findById(id)
            done(null, user)
        } catch (error) {
            console.log(error)
            return done(error, null)
        }
    });

}