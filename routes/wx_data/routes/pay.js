/**
 * Created by Harry on 2017/8/29.
 */
var data_db = require('../models/db').data_db;
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