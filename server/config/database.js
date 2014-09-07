'use strict'

var mongoose = require('mongoose');

module.exports = function(connectionString) {

    mongoose.connect(connectionString);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback(){
        console.log('Tracker db opened');
    });

    var MessageSchema = mongoose.Schema({ message: String });

    var Message  = mongoose.model('Message', MessageSchema);
    var mongoMessage;

    Message.findOne().exec(function(err, messageDoc){

        mongoMessage = messageDoc.message;
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){

        if (collection.length === 0){

            User.create({ firstName: 'Joe', lastName: 'Joe', userName: 'joe'});
            User.create({ firstName: 'John', lastName: 'John', userName: 'john'});
            User.create({ firstName: 'Dan', lastName: 'Dan', userName: 'dan'});

        }


    });

};