const  {Sequelize, sequelize}  = require('./base');
const User = require('./user');
const Tag = require('./tag')
const Tagging = require('./tagging')
//定义Article模型
let Article = sequelize.define('articles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clickTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    content: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

// User.hasMany(Article, { foreignKey: 'author' });
// Article.belongsTo(User, { foreignKey: 'author' });

// Article.belongsToMany(Tag, {through: Tagging , foreignKey: 'article_id', otherKey: 'tag_id'});
// Tag.belongsToMany(Article, {through: Tagging , foreignKey: 'tag_id', otherKey: 'article_id'});

// User.sync()//异步方法同步数据库
// console.log('user表创建成功');

// Tagging.sync()//异步方法同步数据库
// console.log('tagging表创建成功');

// Article.sync()//异步方法同步数据库
// console.log('Article表创建成功');

// Tag.sync()//异步方法同步数据库
// console.log('Tag表创建成功');

module.exports = Article;
