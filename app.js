var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessionconfig = require('./confs/sessionconfig');


var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 配置session
 */
sessionconfig(app);
/**
 * 设置应用路由
 */
var routes = require('./routes/index');
routes.setroute(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.locals.layout = '';
  res.render('error');
});

//注册 handler 引擎配置
var hbsreg = require('./hbsreg');
module.exports = app;



