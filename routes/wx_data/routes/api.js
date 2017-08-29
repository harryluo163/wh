var async = require("async");
var dbmodels = require('../models');
var moment = require('moment')
var data_db = require('../models/db').data_db;
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
    var sql="select * from  wx_myoptional   where UserName ='"+req.session['cas_user']+"' ";
    data_db.query(sql).then(function (r) {
        res.render('wx_data/addproduct',{data:r[0]});
    });

}

