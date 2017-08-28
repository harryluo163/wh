var data_db = require('./db').data_db;
var Sequelize = require('sequelize');

var user = data_db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },

    username: {
        type: Sequelize.STRING(20),
        field: 'username'
    },
    isadmin: {
        type: Sequelize.INTEGER,
        field: 'isadmin'
    },
    ibid: {
        type: Sequelize.INTEGER,
        field: 'ibid'
    },
    ibname: {
        type: Sequelize.STRING(20),
        field: 'ibname'
    },
    password: {
        type: Sequelize.STRING(20),
        field: 'password'
    },
    cnname: {
        type: Sequelize.STRING(20),
        field: 'cnname'
    },
    enname: {
        type: Sequelize.STRING(20),
        field: 'enname'
    },
    sex: {
        type: Sequelize.INTEGER,
        field: 'sex'
    },
    birth: {
        type: Sequelize.DATE,
        field: 'birth'
    },
    mobile: {
        type: Sequelize.STRING(20),
        field: 'mobile'
    },
    email: {
        type: Sequelize.STRING(32),
        field: 'email'
    },
    wxid: {
        type: Sequelize.STRING(32),
        field: 'wxid'
    },
    wxno: {
        type: Sequelize.STRING(32),
        field: 'wxno'
    },
    qq: {
        type: Sequelize.STRING(10),
        field: 'qq'
    },
    headimg: {
        type: Sequelize.STRING(50),
        field: 'headimg'
    },
    countryid: {
        type: Sequelize.INTEGER,
        field: 'countryid'
    },
    country: {
        type: Sequelize.STRING(20),
        field: 'country'
    }, stateid: {
        type: Sequelize.INTEGER,
        field: 'stateid'
    }, state: {
        type: Sequelize.STRING(20),
        field: 'state'
    },
    address: {
        type: Sequelize.STRING(100),
        field: 'address'
    },
    status: {
        type: Sequelize.INTEGER,
        field: 'status'
    },
    identitytype: {
        type: Sequelize.INTEGER,
        field: 'identitytype'
    },
    identitycountry: {
        type: Sequelize.STRING(20),
        field: 'identitycountry'
    },
    identityno: {
        type: Sequelize.STRING(32),
        field: 'identityno'
    },
    identityfront: {
        type: Sequelize.STRING(50),
        field: 'identityfront'
    },
    identityback: {
        type: Sequelize.STRING(50),
        field: 'identityback'
    },
    identityback: {
        type: Sequelize.STRING(50),
        field: 'identityback'
    },
    applytime: {
        type: Sequelize.INTEGER,
        field: 'applytime'
    },
    handletime: {
        type: Sequelize.INTEGER,
        field: 'handletime'
    }, updatetime: {
        type: Sequelize.INTEGER,
        field: 'updatetime'
    }, remark: {
        type: Sequelize.STRING(50),
        field: 'remark'
    },

}, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    tableName: 'user'
});

module.exports = user;