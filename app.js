var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var mongo = require('mongodb');
var session = require('express-session')
var passport = require('passport');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
global.config = require('./config');
mongoose.connect(config.mongoUrl);
global.db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
    extended: true
}));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use(express.static('views'));
app.use(passport.initialize());
app.use(passport.session());
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use('/', require('./controllers/authController'));
app.use('/', require('./controllers/lectureController'));
app.use('/', require('./controllers/testController'));
app.use(morgan('dev'));
app.use('/', require('./controllers/indexController'));

//Apis to protect and use token should be placed here

app.listen(config.port, function() {
    console.log("Listening at Port " + config.port);
});
