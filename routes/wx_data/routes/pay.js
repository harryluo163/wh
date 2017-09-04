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
                res.render('wx_data/positionlist',{data:data});
            } else {
                res.redirect('/wx_data/changeaccount');
            }
        })
    }

}
exports.positionlisthistory=function (req, res, next) {
    res.locals.page_title = '历史持仓';
    if(req.session['mt4_user']==""||req.session['mt4_user']==undefined){
        res.redirect('/wx_data/changeaccount');
    }else {
        request.post({
            url: 'http://139.224.135.183:3001/api/trade/account/history', formData: {login: req.session['mt4_user']}
        }, function (err, httpResponse, body) {
            var data = JSON.parse(body);
            if (data.code == 0) {
                res.render('wx_data/positionlisthistory',{data:data});
            } else {
                res.redirect('/wx_data/changeaccount');
            }
        })
    }

}