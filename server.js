
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    nconf = require('nconf'),
    bodyparser = require('body-parser')
    ;


// Configuration
nconf.argv().env();
nconf.defaults({
    "config": "app_dev.json"
});

console.log('Loading configuration from '+nconf.get('config'));
nconf.file(nconf.get('config'));


function compile(str, path){
    return stylus(str).set('filename', path);
}

var app = express();
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
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
console.log(nconf.get('connectionstring'));
mongoose.connect(nconf.get('connectionstring'));
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
var port = nconf.get('port');

app.listen(port);

console.log("Listening on port " + port);


