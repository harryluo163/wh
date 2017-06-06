/**
 * Created by harry on 2017/2/7.
 */
var express = require('express');
var request = require("request");
var router = express.Router();
var  Loginrout = require("./routes/login.js");
router.use('/',function(req, res, next){
    res.locals.page_title = "";
    res.locals.isdown = "";

    next();
})
//个人中心
router.get('/', function(req, res, next) {
    res.locals.page_title = '用户';
    res.redirect('/wx_data/index');

});
//个人信息
router.get('/userDetails', function(req, res, next) {
    res.locals.page_title = '个人信息';
    var name = "游客"
    if(req.session['cas_user']){
        name=req.session['cas_user'];
    }
    res.render('wx_data/userDetails',{isdown:"true",name:name});
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
    var p=req.query.period!=null?req.query.period:1;
    res.render('wx_data/productdetail',{t:t,p:p});
});

//行情
router.get('/getLineInfox', function(req, res, next) {
var symbol = req.query.symbol;
    var period = req.query.period;
    var opt = {
        method: "post",

    };
    request.post({ url:'http://cts-trading.creatrader.cn/index_contr/getLineInfo.shtml?period='+period+'&symbol='+symbol,formData: opt
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

    var name = "游客"
    if(req.session['cas_user']){
        name=req.session['cas_user'];
    }
    res.render('wx_data/index',{name:name});
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
    res.locals.page_title = '账号选择';
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

//买入
router.get('/buyproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    res.render('wx_data/buyproduct');
});
//卖出
router.get('/saleproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    res.render('wx_data/saleproduct');
});
//挂单
router.get('/entrustproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    res.render('wx_data/entrustproduct');
});

//登录
router.get('/login', function(req, res, next) {
    res.locals.layout = '';
    res.locals.page_title = '登录';
    res.render('wx_data/login');
});
//登录
router.post('/login/Login', function(req, res, next) {
    Loginrout.login(req, res, next)

});

module.exports = router;

