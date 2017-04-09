var apiKey = require(__dirname + '/apiKey.json').API_KEY;
var sg = require('sendgrid')(apiKey);

if (typeof Promise == 'undefined') {
    var Promise = require('es6-promise').Promise;
}

var GenericApi = module.exports = {

    executePatchRequests: function (username, payload, path) {
        var request = sg.emptyRequest();
        request.headers = "on-behalf-of:" + username;
        request.body = payload;
        request.method = 'PATCH';
        request.path = path;
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (response) {
                    resolve(response.body);
                } else {
                    reject(error);
                }
            })
        })
    },
    executeGetRequestsWithParams: function (path, paramname,param) {
        var request = sg.emptyRequest();
        request.queryParams[paramname] = param;
        request.method = 'GET';
        request.path = path;
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (response) {
                    resolve(response.body);
                } else {
                    reject(error);
                }

            })
        })
    },
    executeGetRequests: function (path) {
        var request = sg.emptyRequest()
        request.method = 'GET';
        request.path = path;
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (response) {
                    resolve(response.body);
                } else {
                    reject(error);
                }

            })
        })

    },
    executePostRequests: function (payload, path) {
        var request = sg.emptyRequest()
        request.body = payload;
        request.method = 'POST';
        request.path = path;
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (response) {
                    resolve(response.body);
                } else {
                    reject(error);
                }

            })
        })

    },
    executePutRequests: function (param, body, basePath, lastpath) {
        var request = sg.emptyRequest();
        request.method = 'PUT';
        request.body = body;
        request.path = basePath + '/' + param + lastpath;
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (response) {
                    resolve(response.body);
                } else {
                    reject(error);
                }
            })
        })
    }
}