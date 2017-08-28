/**
 * Created by Harry on 2017/5/30.
 */
var async = require("async");
var dbmodels = require('../models');


exports.login= function (req, res, next) {
    var username=req.body.userName!=undefined?req.body.userName:"";
    var password=req.body.password!=undefined?req.body.password:"";
    if(username==""||password==""){
        res.json({success: 0,msg:"用户名和密码不能为空"});
    }else{
        async.waterfall([
            function(cb){
                dbmodels.user.findAll(
                    {
                        where:{username:username,password:password}
                    }
                ).then(function(results){
                    cb(null,results);
                });
            },
            function(results,cb){
              if(results.length>0){
                  req.session['cas_user'] = username;
                  res.json({success: 1});
              }else{
                  res.json({success: 0,msg:"密码错误"});
              }
            }
        ]);
    }
 }

 exports.index=function (req, res, next) {
     res.locals.page_title = '个人中心';
     let name = "游客";
     let use={
         username:"游客",
         cnname:"游客",
         mobile:"无",
         email:"无",
         applytime: new Date().Format("yyyy-MM-dd HH:mm:ss")
     }
     if(req.session['cas_user']){
         name=req.session['cas_user'];
         dbmodels.user.findAll(
             {
                 where:{username:name}
             }
         ).then(function(results){
            if(results.length>0){
                use.username=name;
                use.cnname=results[0].cnname;
                use.mobile=results[0].mobile;
                use.email=results[0].email;
                use.applytime=results[0].applytime==""?new Date().Format("yyyy-MM-dd hh:mm:ss"):new Date(results[0].applytime).Format("yyyy-MM-dd hh:mm:ss");
                res.render('wx_data/index',use);
            }
         });
     }else{
         res.render('wx_data/index',use);
     }

 }

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}