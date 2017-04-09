/**
 * Created by mkouki on 3/29/17.
 */
var SubusersBatch = require(__dirname + '/subusersBatch.js');
var logger = require('winston');
var apiKey = require(__dirname + '/apiKey.json').API_KEY;
var ips = require(__dirname + '/model/ips.json').ips;

if (typeof Promise == 'undefined') {
    var Promise = require('es6-promise').Promise;
}


SubusersBatch.getIpsInWarmup().then(function (ips) {
   console.log(ips);
}).catch(function (err) {
    console.log(err)
});
