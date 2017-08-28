
var Sequelize = require('sequelize');

var data_db=new Sequelize(
    "tigercrm",
    "root",
    "123QWEasdzxc",{
        dialect:'mysql',
        host:'106.14.255.45',
        port:3306
    });

exports.data_db = data_db;

