const  {Sequelize, sequelize}  = require('./base');

let UserPermission = sequelize.define('userPermission', {
});

module.exports = UserPermission;
