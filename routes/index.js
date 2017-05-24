var express = require('express');
var router = express.Router();
var route_default= require('./default');
var route_users = require('./wx_data');
/* GET home page. */


function setroute(app){
    app.use('/', route_default);
    app.use('/wx_data', route_users);

}
exports.setroute = setroute;

