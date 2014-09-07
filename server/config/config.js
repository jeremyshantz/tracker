'use strict'

var nconf = require('nconf');


module.exports = function(rootPath){

    nconf.argv().env();
    nconf.defaults({
        "config": "app_dev.json"
    });

    console.log('Loading configuration from '+ nconf.get('config'));
    nconf.file(rootPath + '/' + nconf.get('config'));

    var port = nconf.get('PORT');

    if (Number.isNaN(Number(port))) {

        nconf.set('PORT', 2020);
    }

    console.log("Config port " + port);

   //  nconf.defaults({ 'PORT': 2020 }); this overrides and does not merely provide a default

    return nconf;
};