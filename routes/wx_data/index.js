/**
 * Created by harry on 2017/2/7.
 */
var express = require('express');
var request = require("request");
var router = express.Router();

router.use('/',function(req, res, next){
    res.locals.page_title = "";
    res.locals.isdown = "";

    next();
})
//个人中心
router.get('/', function(req, res, next) {
    res.locals.page_title = '用户';
    res.render('wx_data/index');
});
//个人信息
router.get('/userDetails', function(req, res, next) {
    res.locals.page_title = '个人信息';
    res.render('wx_data/userDetails',{isdown:"true"});
});
//交易
router.get('/productlist', function(req, res, next) {
    res.locals.page_title = '交易';

    var symboltype = req.query.symboltype;
    if(symboltype==""&&symboltype==undefined){
        symboltype=1;
    }
    res.render('wx_data/productlist',{symboltype:symboltype});
});
//添加自选
router.get('/addproduct', function(req, res, next) {
    res.locals.page_title = '添加自选品种';
    res.render('wx_data/addproduct');
});



//详情
router.get('/productdetail', function(req, res, next) {
    res.locals.page_title = '交易';
    var t = req.query.t;
    res.render('wx_data/productdetail',{t:t});
});

//行情
router.get('/getLineInfox', function(req, res, next) {
var symbol = req.query.symbol;
    var opt = {
        method: "post",

    };
    request.post({ url:'http://cts-trading.creatrader.cn/index_contr/getLineInfo.shtml?period=1&symbol='+symbol,formData: opt
    }, function(err,httpResponse,body){
        res.json(body);
    })

});
router.get('/getLineInfoxSymbol_price', function(req, res, next) {
    var t = req.query.t;
    var opt = {
        method: "post",
        url: "",
    };
    request.post({url:'http://cts-trading.creatrader.cn/index_contr/symbol_price_ajax_fast/'+t+'.shtml', formData: opt
    }, function(err,httpResponse,body){
        res.json(body);
    })

});


//列表
router.get('/productlistdata', function(req, res, next) {
    res.locals.page_title = '交易';
    var opt = {
        method: "post",
        url: "ccts-trading.creatrader.cn/index_contr/ajaxLists.shtml",
        symboltype:'1'

    };
    request.post({url:'http://cts-trading.creatrader.cn/index_contr/ajaxLists.shtml', formData: opt
    }, function(err,httpResponse,body){
        res.json(body);
    })

});


//个人中心
router.get('/index', function(req, res, next) {
    res.locals.page_title = '个人中心';
    res.render('wx_data/index');
});
//账号
router.get('/uselist', function(req, res, next) {
    res.locals.page_title = '账号列表';
    res.render('wx_data/uselist');
});
//绑定账号
router.get('/bindaccount', function(req, res, next) {
    res.locals.page_title = '账号绑定';
    res.render('wx_data/bindaccount');
});
//账号选择
router.get('/changeaccount', function(req, res, next) {
    res.locals.page_title = '账号绑定';
    res.render('wx_data/changeaccount');
});
//持仓
router.get('/positionlist', function(req, res, next) {
    res.locals.page_title = '持仓';
    res.render('wx_data/positionlist');
});
//财经
router.get('/newslist', function(req, res, next) {
    res.locals.page_title = '财经资讯';
    res.render('wx_data/newslist');
});
module.exports = router;

