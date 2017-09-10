/**
 * Created by Harry on 2017/5/30.
 */
var async = require("async");
var dbmodels = require('../models');
const getweixin =require('../../../bin/weixin');


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
                        where:{username:username,password:password,status:1}
                    }
                ).then(function(results){
                    cb(null,results);
                });
            },
            function(results,cb){
              if(results.length>0){
                  req.session['cas_user'] = username;
                  //获取用户是否是微信登录
                  var code = req.body.code;
                  if (code != ""&&code != undefined) {
                      //验证用户是否绑定openid，如果没有就绑定，如果有就不绑定
                        if(results[0].wxid==""){
                            ckwx_openId(req,code,username,function (da) {
                                console.log("用户"+username+"绑定opendId"+da)
                                res.json({success: 1});
                            })
                        }else{

                            res.json({success: 1});
                        }
                  }else{
                      res.json({success: 1});
                  }


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
     let useacount ="";
     let use={
         username:"游客",
         useacount:"",
         cnname:"游客",
         mobile:"无",
         email:"无",
         applytime: new Date().Format("yyyy-MM-dd HH:mm:ss")
     }
     if(req.session['cas_user']){
         //登录名
         name=req.session['cas_user'];

         dbmodels.user.findAll(
             {
                 where:{username:name}
             }
         ).then(function(results){
            if(results.length>0){
                if(req.session['mt4_user']!=""&&req.session['mt4_user']!=undefined){  useacount=req.session['mt4_user']}
                use.username=name;
                use.cnname=results[0].cnname;
                use.useacount=useacount;
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

exports.wx_login=function (req, res, next){
    res.locals.layout = '';
    res.locals.page_title = '登录';
    var code = req.query.code;
    console.log(code)
    if (code != ""&&code != undefined) {
        //是微信登录
        async.waterfall([
            //获取openid
            function (cb) {
                getweixin.getToken(code,cb);
            },
            function (data,cb) {
                //多次调用getToken信息无效
                if(data['errcode']=="40163"){
                    data['openid']=req.session['wx_openid'];
                }else{
                    req.session['wx_openid']=data['openid'];
                }
                //查询openid是否存在
                dbmodels.user.findAll(
                    {
                        where:{wxid:data['openid']}
                    }
                ).then(function(results){
                     if(results.length>0){
                        //存在直接登录
                        req.session['cas_user'] = results[0].username;
                        res.redirect('/wx_data');

                    }else{
                     //不存在跳转到登录页面
                        res.render('wx_data/login',{});
                    }

                });

                // getweixin.getUserInfo(data['access_token'], data['openid'],function (err,userd) {
                //     var userdata= JSON.parse(userd)
                //     req.session['weixin_opid']=userdata;
                //     cb(null,userdata)
                // })


            }

        ])

    }else{
        res.render('wx_data/login');
    }
}


function ckwx_openId(req,code,username,cb) {
    async.waterfall([
        //获取openid
        function (cbb) {
            getweixin.getToken(code,cbb);
        },
        function (data,cbb) {
            //多次调用getToken信息无效
            if(data['errcode']=="40163"){
                data['openid']=req.session['wx_openid'];
            }else{
                req.session['wx_openid']=data['openid'];
            }
            dbmodels.user.findAll(
                {
                    where:{wxid:data['openid']}
                }
            ).then(function(results){
                if(results.length>0){
                    //此openID已经绑定了，跳过”
                    cb("此openID已经绑定了，跳过");
                }else{
                    dbmodels.user.update({wxid:data['openid']},{
                        where:{
                            username:username
                        }
                    }).then(function(result){
                        cb(data['openid']+"已绑定");
                    });
                }

            });

        }

    ])


}