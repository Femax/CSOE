var User = require('../models/user.js')
var Lectures = require('../models/lecture')
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/register', function(req, res) {
    if (req.body.password && req.body.login) {
        var user = new User({
            login: req.body.login,
            password: req.body.password
        });
        user.save(function(err, user) {
            if (err) console.log(err);
            else {
                var token = jwt.sign({
                    login: user.login,
                    password: user.password
                }, global.config.secret, {
                    expiresIn: 1440 // expires in 1 hours
                });
                user.updateToken(token);
                Lectures.find({}, function(err, letctures) {
                    var letcturesMap = {};

                    users.forEach(function(user) {
                        letcturesMap[user._id] = letctures;
                    });
                })
                user.setLections(letcturesMap);

                var session = req.session;
                if (session.views) {
                    session.views++
                        res.setHeader('Content-Type', 'text/html')
                    res.write('<p>token: ' + token + '</p>')
                    res.redirect("index.html")
                    res.end()
                } else {
                    sess.views = 1
                    res.end('welcome to the session demo. refresh!')
                }
            }
        })
    } else {
        console.log(req.body);
        res.status(404).send('wrong cridentials');
    }
});


router.post('/auth', function(req, res) {
    if (req.body.password && req.body.login) {
        User.findOne({
            login: req.body.login
        }, function(err, user) {
            if (err) {
                console.log(err.errors);
                res.status(404).send({
                    error: true,
                    message: err.message
                });
            }

            if (user && user.password === req.body.password) {
                var token = jwt.sign({
                    login: user.login,
                    password: user.password
                }, global.config.secret, {
                    expiresIn: 1440 // expires in 1 hours
                });
                user.updateToken(token);
                res.status(200).json({
                    message: 'Validation successful',
                    token: token
                });

            } else {
                res.status(404).json({
                    error: true,
                    message: 'Wrong login or password'
                });
            }
        });
    }
});

router.get('/auth', function(req,res){
  res.redirect('auth.html');
});
module.exports = router;
