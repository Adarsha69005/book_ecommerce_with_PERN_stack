const bcrypt = require('bcrypt-nodejs');
const db = require('../database');
const passport = require('../services/passport');


module.exports = (app) => {
    app.post('/register', loginRedirect, (req, res, next) => {
       return createUser(req, res) 
        .then((response) => {
            passport.authenticate('local', (err, user, info) => {
                if(user) {handleResponse(res, 200, 'success')}
            })(req, res, next);
        })
        .then(() => {handleResponse(res, 200, 'success registration')})
        .catch((err) => { handleResponse(res, 400, 'Unable to register'); });
    });
    

    app.post('/signin', loginRedirect, (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) { handleResponse(res, 400,'error')}
            if(!user) { handleResponse(res, 400, 'unable to get user')}
            if(user) {
                req.logIn(user, (err) => {
                    if(err) {handleResponse(res, 400, 'Wrong Credentials')}
                    handleResponse(res, 200, 'success');
                });
            }
        })(req, res, next);
    });

    app.get('/logout', requireLogin, (req, res, next) => {
        req.logout();
        handleResponse(res, 200, 'success');
    })

    app.get('/user', requireLogin, (req, res, next) => {
        res.send(req.user);
    })

    // function handleLogin(res, user){
    //     passport.authenticate('local', (err, user, info) => {
    //         if (user) { handleResponse(res, 200, 'success'); }
    //       })(req, res, next);
    // }

    function createUser(req) {
        const {username, email, password} = req.body;
        const hash = bcrypt.hashSync(password);
        return db('users')
        .insert({
            username: username,
            email: email,
            password: hash
        })
        .returning('*');
    }


    function loginRedirect(req, res, next) {
        if(req.user) return handleResponse(res, 401, 'You are already logged in');
        return next();
    }

    function handleResponse(res, code, statusMsg) {
        res.status(code).json({status: statusMsg});
    }

    function requireLogin(req, res, next) {
        if(!req.user) {
            return res.status(401).send({error: 'You must login!'});
        }
        next();
    };

};
