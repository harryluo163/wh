var express = require('express');
var router = express.Router();

var menu = [];

/**
 * 通用处理
 */
router.use('/',function(req, res, next){
  res.locals.menuconfig = menu;
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/wx_data');

});

module.exports = router;
