/**
 * Created by harry on 2017/2/7.
 */
var express = require('express');
var router = express.Router();

router.use('/',function(req, res, next){
    console.log("1")
    next();
})


router.get('/', function(req, res, next) {
    console.log("2")
    res.render('/users/login', { title: '登陆' });
});

router.get('/users/login', function(req, res, next) {
    res.render('/users/login', { title: '登陆' });
});

module.exports = router;