'use strict'

var express = require('express'),
    stylus = require('stylus'),
    bodyparser = require('body-parser'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')
    ;

module.exports = function(app, config){

    function compile(str, path){
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({
        extended: true
    }));
    app.use(session({ secret: "tracker" }));
    app.use(logger('dev'));
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

    app.use(express.static(config.rootPath + '/public'));

};