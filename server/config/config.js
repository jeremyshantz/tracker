
var nconf = require('nconf');


module.exports = function(rootPath){

    nconf.argv().env();
    nconf.defaults({
        "config": "app_dev.json"
    });

    console.log('Loading configuration from '+ nconf.get('config'));
    nconf.file(rootPath + '/' + nconf.get('config'));


    var x = nconf.get('PORT');

    console.log(x);

    nconf.defaults({ 'PORT': 2020 });
    return nconf;
};