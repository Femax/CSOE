var express = require('express');
var index = express.Router();
var User = require('../models/user.js')
var Lectures = require('../models/lecture')

index.get('/index', function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    user.find({token: token}, function(err, data) {
            res.render('index.html', data.lectures);
        })
});
module.exports = index;
