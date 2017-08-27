/**
 * Created by Harry on 2017/5/30.
 */

var request = require("request");
exports.login= function (req, res, next) {
    console.log(12)
    var username=req.body.userName!=undefined?req.body.userName:"";
    var password=req.body.password!=undefined?req.body.password:"";
    req.session['cas_user'] = username;

    res.json({success: 1});
 }