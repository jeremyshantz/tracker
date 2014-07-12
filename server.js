var express = require('express'),
    stylus = require('stylus');

var env = process.env.NODE_EN = process.env.NODE_EN || 'development';


function compile(str, path){
    return stylus(str).set('filename', path);

}


var app = express();
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));


// routes

app.use(express.static(__dirname + '/public'));

app.get('*',  function(req, res){
    res.render('index');

});

var port = 3030;

app.listen(port);

console.log("Listening on port " + port);


