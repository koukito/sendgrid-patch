var apiKey = require(__dirname + '/apiKey.json').API_KEY;
var sg = require('sendgrid')(apiKey);
var url = require(__dirname + '/paths.json');
var generic = require(__dirname + '/generic.js');
if (typeof Promise == 'undefined') {
    var Promise = require('es6-promise').Promise;
}


var SubuserBatch = module.exports = {

    getSubusers: function () {
        return new Promise(function (resolve, reject) {
            generic.executeGetRequests(url.subusers).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    getProductionSubusers: function () {
        return new Promise(function (resolve, reject) {
            SubuserBatch.getSubusers().then(function (data) {
                var subusers = [];
                data.forEach(function (subuser) {
                    if (subuser.username.indexOf('a_') == 0) {
                        subusers.push(subuser);
                    }
                })
                resolve(subusers);
            }).catch(function (err) {
                reject(err);
            })
        })

    },

    getDevelopmentSubusers: function () {
        return new Promise(function (resolve, reject) {
            SubuserBatch.getSubusers().then(function (data) {
                var subusers = [];
                data.forEach(function (subuser) {
                    if (!(subuser.username.indexOf('a_') == 0)) {
                        subusers.push(subuser);
                    }
                })
                resolve(subusers);
            }).catch(function (err) {
                reject(err);
            })
        })

    },
    getSubusersReputation: function(username){
        return new Promise(function (resolve, reject) {
            generic.executeGetRequestsWithParams(url.subuserReputation,"usernames",username).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    patchSubuser: function (username, payload, path) {
        return new Promise(function (resolve, reject) {
            generic.executePatchRequests(username, payload, path).on('fail', function (err) {
                reject(err);
            }).on('success', function (data) {
                resolve(data);
            })
        })
    },
    updateIpsSubuser: function (username, ips) {
        return new Promise(function (resolve, reject) {
            generic.executePutRequests(username, ips, url.subusers, url.lastPathSubuserIps).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    },
    getIpsInWarmup:function(){
        return new Promise(function (resolve, reject) {
            generic.executeGetRequests(url.ipsWarmup).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    }

}