var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var mongo = require('mongodb');
// var fileUpload = require('express-fileupload');
// app.use(fileUpload());

// var Grid = require('gridfs-stream');
var nunjucks = require('nunjucks');
// Grid.mongo = mongoose.mongo;
global.config = require('./config');
mongoose.connect(config.mongoUrl);
global.db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')) // connect to database
mongoose.Promise = global.Promise; //added for work  mongoose promise
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: true
}));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static('views'));
app.use(bodyParser.json());
app.use('/', require('./controllers/authController'));
app.use('/', require('./controllers/lectureController'));
app.use(morgan('dev'));
app.use(require('./middlewares/tokenValidator')); //middleware to authenticate token
app.use('/', require('./controllers/indexController'));
//Apis to protect and use token should be placed here



app.listen(config.port, function() {
    console.log("Listening at Port " + config.port);
});
