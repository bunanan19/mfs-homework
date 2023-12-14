// const  Sequelize  = require('sequelize');
// const  sequelize  = require('./base');
const  {Sequelize, sequelize}  = require('./base');

//定义user模型
let User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync()//异步方法同步数据库
// console.log('user表创建成功');
module.exports = User;
