/**
 * Created by mkouki on 3/29/17.
 */
var SubusersBatch=require(__dirname+'/subusersBatch.js');
var logger=require('winston');
var apiKey = require(__dirname+'/apiKey.json').API_KEY;
var ips=require(__dirname+'/model/ips.json').ips;
    console.log(ips);
if (typeof Promise == 'undefined') {
    var Promise = require('es6-promise').Promise;
}


SubusersBatch.getDevelopmentSubusers().then(function(devsubusers){
   devsubusers.forEach(function(subuser){
       SubusersBatch.updateIpsSubuser(subuser.username,ips).then(function(data){
           console.log(subuser.username+' updated with ips '+data);
       }).catch(function(err){
           console.log(err);
       })

   })

}).catch(function(err){
    console.log(err)
});
