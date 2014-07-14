
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



};