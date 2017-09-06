/**
 * Created by harry on 2017/2/7.
 */
var express = require('express');
var request = require("request");
var router = express.Router();
var  Loginrout = require("./routes/login");
var  pay = require("./routes/pay");
var  api = require("./routes/api");
router.use('/',function(req, res, next){
    res.locals.page_title = "";
    res.locals.isdown = "";
    if(!req.session['cas_user']){
        if(req.originalUrl.indexOf("wx_data/login")<0){
        res.redirect('/wx_data/login');
        }else{
            next();
        }
    }else{
        next();
    }

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
    pay.productlist(req, res, next)
});
//添加自选
router.get('/addproduct', function(req, res, next) {
    api.index(req, res, next)
});
//添加自选
router.post('/api/addproduct', function(req, res, next) {
    console.log(1)
    api.addproduct(req, res, next)
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
router.get('/getLineInfoxSymbol_price_order', function(req, res, next) {
    var t = req.query.t;
    var opt = {
        method: "post",
        url: "",
    };
    request.post({url:'http://cts-trading.creatrader.cn/index_contr/symbol_price_ajax/'+t+'.shtml', formData: opt
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
    Loginrout.index(req, res, next)
});
//账号
router.get('/uselist', function(req, res, next) {
    api.uselist(req, res, next)
});
//绑定账号
router.get('/bindaccount', function(req, res, next) {
    res.locals.page_title = '账号绑定';
    res.render('wx_data/bindaccount');
});

router.post('/api/binUser', function(req, res, next) {
    api.binUser(req, res, next)
});
//账号选择
router.get('/changeaccount', function(req, res, next) {
    api.changeaccount(req, res, next)
});
//持仓
router.get('/positionlist', function(req, res, next) {
    pay.positionlist(req, res, next)
});
router.get('/positionlist_search', function(req, res, next) {
    pay.positionlist_search(req, res, next)
});
router.get('/positionlisthistory_search', function(req, res, next) {
    pay.positionlisthistory_search(req, res, next)
});
//历史持仓
router.get('/positionlisthistory', function(req, res, next) {
    pay.positionlisthistory(req, res, next)

});

//持仓详情
router.get('/positiondetail', function(req, res, next) {
    pay.positiondetail(req, res, next)

});

//财经
router.get('/newslist', function(req, res, next) {
    res.locals.page_title = '财经资讯';
    res.render('wx_data/newslist');
});

//买入
router.get('/buyproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    var t = req.query.t;
    res.render('wx_data/buyproduct',{t:t});
});

router.post('/api/buy_api', function(req, res, next) {

     api.buy_api(req, res, next);
});

//卖出
router.get('/saleproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    var t = req.query.t;
    res.render('wx_data/saleproduct',{t:t});
});
//挂单
router.get('/entrustproduct', function(req, res, next) {
    res.locals.page_title = '商品详情';
    var t = req.query.t;
    res.render('wx_data/entrustproduct',{t:t});
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
//账号切换
router.post('/api/cklogin', function(req, res, next) {
    api.cklogin(req, res, next)
});



module.exports = router;

