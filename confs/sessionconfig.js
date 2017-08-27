/**
 * Created by Harry on 2017/5/30.
 */
var session = require('express-session');
//如果需要进行持久化处理 可以保存在mongodb中
//配置session
module.exports = function(app){
    app.use(session({
        secret: 'super secret key',
        cookie:{maxAge: 1000*60*60*24},
        resave: false,
        saveUninitialized: true,

    }));

}