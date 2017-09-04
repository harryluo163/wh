var async = require("async");
var dbmodels = require('../models');
var moment = require('moment')
var data_db = require('../models/db').data_db;
var request = require("request");
exports.addproduct = function (req, res, next) {
    let symbol = req.body.symbol != undefined ? req.body.symbol : "";
    if (symbol) {
        async.waterfall([
            function (cb) {
                dbmodels.user.findAll(
                    {
                        where: {username: req.session['cas_user']}
                    }
                ).then(function (results) {
                    cb(null, results);
                });
            },
            function (results, cb) {
                if (results.length > 0) {
                    let sql = "INSERT INTO `tigercrm`.`wx_myoptional`(`Name`,`Createtime`,`UserId`,`UserName`,`UserCode`) VALUES ";
                    let arr = symbol.split(";");
                    let sqlarr = [];
                    for (let a of arr) {
                        if (a != "") {
                            sqlarr.push("('" + a + "','" + moment().format('YYYY-MM-DD HH:mm') + "'," + results[0].id + ",'" + results[0].username + "','0')");
                        }
                    }
                    // 先删除再添加
                    data_db.query("delete  from  wx_myoptional  where UserName ='"+req.session['cas_user']+"'").then(function (r) {
                        data_db.query(sql + sqlarr).then(function (rr) {
                            res.json({success: 1});
                        });
                    });
                } else {
                    res.json({success: 0});
                }
            },
        ]);
    } else {
        res.json({success: 0});
    }

}


exports.index=function (req, res, next) {
    res.locals.page_title = '添加自选品种';
    var sql="select name from  wx_myoptional   where UserName ='"+req.session['cas_user']+"' ";
    data_db.query(sql).then(function (r) {
        let  data =[];
        for(let d of r[0]){
            data.push(d.name)
        }
        res.render('wx_data/addproduct',{data:data});
    });
}


exports.changeaccount=function (req, res, next) {
    res.locals.page_title = '账号选择';
    //真实模拟账户
    async.waterfall([
        function (cb) {
            var sql=" select login  from realaccount where username  ='"+req.session['cas_user']+"' and status =1 ";
            data_db.query(sql).then(function (r) {
                cb(null,r)
            });
        },function (da,cb) {
            var sql="   select login from demoaccount  where username  ='"+req.session['cas_user']+"' and status =1 ";
            data_db.query(sql).then(function (r) {
                if(req.session['mt4_user_istrue']){}else{req.session['mt4_user_istrue']=""};
                if(req.session['mt4_user']){}else{req.session['mt4_user']=""};
                res.render('wx_data/changeaccount',{real:da[0],dome:r[0],istrue:''+req.session['mt4_user_istrue']+'',mt4_user:''+req.session['mt4_user']+''});
            });

        }])

}

exports.uselist=function (req, res, next) {
    res.locals.page_title = '账号列表';

    //真实模拟账户
    async.waterfall([
        function (cb) {
            var sql=" select *  from realaccount where username  ='"+req.session['cas_user']+"' and status =1 ";
            data_db.query(sql).then(function (r) {
                cb(null,r)
            });
        },function (da,cb) {
            var sql="   select * from demoaccount  where username  ='"+req.session['cas_user']+"' and status =1 ";
            data_db.query(sql).then(function (r) {
                res.render('wx_data/uselist',{real:da[0],dome:r[0]});
            });

        }])

}


// 切换账号
exports.cklogin=function (req, res, next){
    var username=req.body.userName!=undefined?req.body.userName:"";
    var type=req.body.type!=undefined?req.body.type:""; //0是真实 1是模拟
    var sql="";
    if(type==0){
        sql="select login  from realaccount where username  ='"+req.session['cas_user']+"' and status =1 and login ='"+username+"'";
    }else if(type==1){
        sql="select login  from demoaccount where username  ='"+req.session['cas_user']+"' and status =1 and login ='"+username+"'";
    }
    data_db.query(sql).then(function (r) {
        if(r[0].length>0){
            //账户session
            req.session['mt4_user'] =r[0][0].login;
            //true为真实账户 falss 模拟
            req.session['mt4_user_istrue'] =type==0?'true':'false';
            res.json({success: 1});
        }else{
            res.json({success: 0});
        }
    });
}
//验证MT4账号
exports.binUser=function (req, res, next){
    var type=req.body.type!=undefined?req.body.type:"";
    var login=req.body.login!=undefined?req.body.login:"";
    var password=req.body.password!=undefined?req.body.password:"";

    var opt = {
        method: "post",
        url: "http://139.224.135.183:3001/api/trade/account/login",
        login:login,
        password:password

    };
    request.post({url:'http://139.224.135.183:3001/api/trade/account/login', formData: opt
    }, function(err,httpResponse,body){
      var data=  JSON.parse(body);
        if (data.code == 0) {
            //检验是否已经绑定
            async.waterfall([
                function (cb) {
                    dbmodels.user.findAll(
                        {
                            where:{username:req.session['cas_user'],status:1}
                        }
                    ).then(function(results){
                        cb(null,results);
                    });
                },
                function (rd,cb) {
                    var sqlck ="";
                    if(type=="真实"){
                        sqlck =" select  login  from realaccount where   username ='"+req.session['cas_user']+"' and  login ='"+login+"'";
                    }else if(type=="模拟"){
                        sqlck =" select  login  from demoaccount where   username ='"+req.session['cas_user']+"' and  login ='"+login+"'";
                    }
                    data_db.query(sqlck).then(function (r) {
                        //已经存在更新
                        if(r[0].length>0){
                            res.json({success: 1,msg:"该账号已经绑定,请更换"});
                        }else{
                            cb(null,rd)
                        }
                    });
                },
                function (rd,cb) {
                var sql="";
                    if(type=="真实"){
                        sql ="INSERT INTO `tigercrm`.`realaccount`( `login`, `password`, `userid`, `username`, `type`, `leverage`, `status`, `balance`, `credit`, `margin`, `availablemargin`) " +
                        "VALUES ('"+login+"','"+password+"','"+rd[0].id+"','"+rd[0].username+"','0','100','1',0,0,0,0)"
                    }else if(type=="模拟"){
                        sql ="    INSERT INTO `tigercrm`.`demoaccount`(`login`,`password`,`userid`,`username`,`leverage`,`amount`,`cnname`,`enname`,`mobile`,`email`,`status`,`balance`,`credit`,`margin`,`availablemargin`)" +
                            "VALUES ('"+login+"','"+password+"','"+rd[0].id+"','"+rd[0].username+"','100','100','"+rd[0].cnname+"','"+rd[0].enname+"','"+rd[0].mobile+"','"+rd[0].email+"','1',0,0,0,0)"
                    }
                    data_db.query(sql).then(function (r) {
                        res.json({success: 1,msg:"绑定成功"});
                    })

                }
            ])
        }else {
            res.json({success: 0});
        }
    })
}

//开仓
exports.buy_api=function (req, res, next) {
    var symbol=req.body.symbol!=undefined?req.body.symbol:"";//MT4账号
    var type=req.body.type!=undefined?req.body.type:"";//类型75：开仓
    var cmd=req.body.cmd!=undefined?req.body.cmd:"";//交易命令
    var volume=req.body.volume!=undefined?req.body.volume:"";//手数
    var price=req.body.price!=undefined?req.body.price:"";//价格
    var comment=req.body.comment!=undefined?req.body.comment:"";//注释固定为“from wetrade”
    var sl=req.body.sl!=undefined?req.body.sl:"";//止盈价
    var tp=req.body.tp!=undefined?req.body.tp:"";//止损价
    comment="from wetrade";
    //MT4账号无效
    if(req.session['mt4_user']==""){
        res.json({success: 2});
    }else {
        var opt = {
            login: req.session['mt4_user'],
            symbol: symbol,
            type: type,
            cmd: cmd,
            volume: volume,
            price: price,
            comment: comment,
            sl: sl,
            tp: tp


        };
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/open', formData: opt
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.json({success: 1});
            } else {
                res.json({success: 0});
            }
        })
    }
}

//平仓
exports.sale_api=function (req, res, next) {
    var order=req.body.order!=undefined?req.body.order:"";//订单号
    var symbol=req.body.symbol!=undefined?req.body.symbol:"";//品种
    var type=req.body.品种!=undefined?req.body.品种:"";//76：平仓 77：删除（取消）挂单
    var cmd=req.body.cmd!=undefined?req.body.cmd:"";//cmd
    var volume=req.body.volume!=undefined?req.body.volume:"";//手数
    var price=req.body.price!=undefined?req.body.price:"";//价格
    var comment=req.body.comment!=undefined?req.body.comment:"";//注释固定为“from wetrade”
    var sl=req.body.sl!=undefined?req.body.sl:"";//止盈价
    var tp=req.body.tp!=undefined?req.body.tp:"";//止损价
    if(req.session['mt4_user']==""){
        res.json({success: 2});
    }else {
        var opt = {
            login: req.session['mt4_user'],
            order:order,
            symbol: symbol,
            type: type,
            cmd: cmd,
            volume: volume,
            price: price,
            comment: comment,
            sl: sl,
            tp: tp

        };
        request.post({
            url: 'http://139.224.135.183:3001//api/trade/account/close', formData: opt
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.json({success: 1});
            } else {
                res.json({success: 0});
            }
        })
    }

}

//查询持仓
exports.position_search_api=function (req, res, next) {

}

//查询持仓
exports.history_search_api=function (req, res, next) {

}

//查询MT4账号
exports.user_search_api=function (req, res, next) {

}