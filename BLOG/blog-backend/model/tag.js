// const  Sequelize  = require('sequelize');
// const  sequelize  = require('./base');
const  {Sequelize, sequelize}  = require('./base');

//定义Article模型
let Tag = sequelize.define('tag', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    desc: {
      type: Sequelize.STRING,
    },
});

module.exports = Tag;
