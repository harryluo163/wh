/**
 * Created by Harry on 2017/8/29.
 */
var data_db = require('../models/db').data_db;
var request = require("request");
exports.productlist=function (req, res, next) {
    res.locals.page_title = '交易';
    //tab
    var symboltype = req.query.symboltype;
    if(symboltype==""&&symboltype==undefined){
        symboltype=1;
    }
    var sql="select name from  wx_myoptional   where UserName ='"+req.session['cas_user']+"' ";
    data_db.query(sql).then(function (r) {
        res.render('wx_data/productlist',{symboltype:symboltype,data:r[0]});
    });
}
//持仓

exports.positionlist=function (req, res, next) {
     res.locals.page_title = '持仓';
    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.redirect('/wx_data/changeaccount');
    }else {
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/position', formData: {login:req.session['mt4_user']}
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                var kd=[],gd=[];
                for(var a of data.data){
                    if(a.record.cmd==0||a.recordcmd==1){
                        kd.push(a)
                    }else  if(a.record.cmd==2||a.record.cmd==3||a.record.cmd==4||a.record.cmd==5){
                        gd.push(a)
                    }
                }
                res.render('wx_data/positionlist',{kd:kd,gd:gd});
            } else {
                res.redirect('/wx_data/changeaccount');
            }
        })
    }

}

//查询持仓
exports.positionlist_search=function (req, res, next) {
    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.json({success:2,msg:"请切换账号MT4账号"});
    }else {
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/position', formData: {login:req.session['mt4_user']}
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.json({success:1,data:data});
            } else {
                res.json({success:0,msg:"接口数据异常"});
            }
        })
    }
}
//历史持仓
exports.positionlisthistory=function (req, res, next) {
    res.locals.page_title = '历史持仓';

    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.redirect('/wx_data/changeaccount');
    }else {
        var date =  new Date(), timestamp;
        timestamp = date.getTime();
        var   end = Math.round(new Date().getTime()/1000).toString();
        var  begin = Math.round(new Date(timestamp - 60 * 24 * 3600 * 1000).getTime()/1000).toString();
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/history', formData: {login: req.session['mt4_user'],begin:begin,end:end}
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.render('wx_data/positionlisthistory',{data:data.data});
            } else {
                res.redirect('/wx_data/changeaccount');
            }
        })
    }

}
exports.positionlisthistoryddetail=function (req, res, next) {
    res.locals.page_title = '历史持仓';
    var t = req.query.t;
    var data =t.split("_")
    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.redirect('/wx_data/changeaccount');
    }else {
        var t={t:data[0],volume:data[1],open_price:data[2],order:data[3],open_time:data[4],
            close_price:data[5],close_time:data[6],sl:data[7]
            ,tp:data[8],profit:data[9],taxes:data[10]
        }
        res.render('wx_data/positionlisthistoryddetail',t);

    }

}

//查询历史持仓
exports.positionlisthistory_search=function (req, res, next) {
    res.locals.page_title = '历史持仓';
    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.redirect('/wx_data/changeaccount');
    }else {
        var date =  new Date(), timestamp, newDate;
        timestamp = date.getTime();
        var   end = Math.round(new Date().getTime()/1000).toString();
        var  begin = Math.round(new Date(timestamp - 60 * 24 * 3600 * 1000).getTime()/1000).toString();
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/history', formData: {login: req.session['mt4_user'],begin:begin,end:end}
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.render('wx_data/positionlisthistory',{data:data.data});
            } else {
                res.redirect('/wx_data/changeaccount');
            }
        })
    }
}


exports.positiondetail=function (req, res, next) {
    res.locals.page_title = '详情';
    var t = req.query.t;
    var data =t.split("_")
    res.render('wx_data/positiondetail',{t:data[0],volume:data[1],open_price:data[2],order:data[3]})

}