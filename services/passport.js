const bcrypt = require('bcrypt-nodejs');
const db = require('../database');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    db('users').where({id}).first()
    .then((user) =>  done(null, user))
    .catch(err => { done(err, null);})
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
        db('users').where({ email }).first()
        .then((user) => {
            if(user == null) return done(null, false);
            if(!bcrypt.compareSync(password, user.password)){
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch(err => {return done(err);})

}));
module.exports = passport;

