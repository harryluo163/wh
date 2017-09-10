/**
 * Created by Harry on 2017/9/9.
 */
const request = require('request');
const qs = require('querystring');
const config = require('../confs/weixinconfig');
const  async = require("async");

function getToken(code,cb) {
    let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    let params = {
        appid: config.appId,
        secret: config.appSecret,
        code: code,
        grant_type: 'authorization_code'
    };

    let options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log(options.url);
    request(options, function (err, res, body) {
        if (res) {
            console.log(body)
            cb(null,JSON.parse(body))
        }
    })
}


function getUserInfo(AccessToken, openId,cb) {
    let reqUrl = 'https://api.weixin.qq.com/sns/userinfo?';
    let params = {
        access_token: AccessToken,
        openid: openId,
        lang: 'zh_CN'
    };
    let options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    request(options, function (err, res, body) {
        if (res) {
         cb(null,body)
        }
    });
}

exports.getUserInfo = getUserInfo;
exports.getToken = getToken;
