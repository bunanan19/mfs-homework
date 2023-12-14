const  {Sequelize, sequelize}  = require('./base');

let Permission = sequelize.define('permission', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    path: {
        type: Sequelize.STRING,
    },
    method: {
        type: Sequelize.STRING,
    },
});

module.exports = Permission;
