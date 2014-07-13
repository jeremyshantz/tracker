
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser')
    mongoose = require('mongoose')
    ;

var env = process.env.NODE_EN = process.env.NODE_EN || 'development';


function compile(str, path){
    return stylus(str).set('filename', path);

}


var app = express();
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));


// routes

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);

});

app.get('*',  function(req, res){
    res.render('index', { mongoMessage: mongoMessage });

});



// Database
mongoose.connect('mongodb://localhost/tracker');
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





// Start server
var port = 3030;

app.listen(port);

console.log("Listening on port " + port);


