const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);
const app = express();
const db = require('./database');
require('./services/passport');


app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//SESSION SETUP
const store = new KnexSessionStore({
  knex: db,
  tablename: 'sessions', // optional. Defaults to 'sessions'
  clearInterval: 1000 * 60 * 60  //1 hour
});

app.use(session({
  secret: 'SecretSessionEcommerce',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
  },
  store: store
}));





app.use(passport.initialize());
app.use(passport.session());


//SAVE SESSION  CART API
app.post('/cart', (req, res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

//GET SESSION CART API


app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
//END SESSION

//APIs ROUTES
require('./routes/bookRoutes')(app);
require('./routes/loginRoutes')(app);


//GET BOOKS IMAGES API
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  fs.readdir(imgFolder, (err, files) => {
    if(err) {
      return console.error(err);
    }
    const fileArr = [];
    files.forEach(file => {
      fileArr.push({name: file});
    });
    res.json(fileArr);
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
