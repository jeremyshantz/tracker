
var express = require('express');

// Configuration

var nconf = require('./server/config/config')(__dirname);

function compile(str, path){
    return stylus(str).set('filename', path);
}

// Express
var app = express();
require('./server/config/express')(app, { rootPath: __dirname})

// routes
app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);

});

app.get('*',  function(req, res){
    res.render('index', {  });
});

//database
var db = require('./server/config/database')(nconf.get('connectionstring'));


// Start server
var port = Number(nconf.get('PORT'));

app.listen(port);
console.log("Listening on port " + port);
