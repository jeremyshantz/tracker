'use strict'

var  app = require('express')(),
     nconf = require('./server/config/config')(__dirname),
     passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

require('./server/config/express')(app, { rootPath: __dirname})
require('./server/config/routes')(app)
require('./server/config/database')(nconf.get('connectionstring'));

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({ username: username }).exec(function(err, collection){
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });

    }
));

passport.serializeUser(function(user, done){
    if (user) {
        done(null, user._id);
    }

});

passport.deserializeUser(function(id, done){

    User.findOne({ _id: id}).exec(function(err, user){
        if (user) {
            done(user);
        } else {
            done(false);
        }
    });
});

var password
var port = Number(nconf.get('PORT'));
app.listen(port);
console.log("Listening on port " + port);
