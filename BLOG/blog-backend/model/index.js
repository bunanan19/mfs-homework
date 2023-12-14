const User = require('./user')
const Article = require('./article')
const Tag = require('./tag')
const Tagging = require('./tagging')
const Permission = require('./permission')
const UserPermission = require('./userPermission')
const  {Sequelize, sequelize}  = require('./base');

User.hasMany(Article, { foreignKey: 'author' });
Article.belongsTo(User, { foreignKey: 'author' });

Article.belongsToMany(Tag, {through: Tagging , foreignKey: 'article_id', otherKey: 'tag_id'});
Tag.belongsToMany(Article, {through: Tagging , foreignKey: 'tag_id', otherKey: 'article_id'});

Permission.belongsToMany(User, {through: UserPermission , foreignKey: 'permission_id', otherKey: 'user_id'});
User.belongsToMany(Permission, {through: UserPermission , foreignKey: 'user_id', otherKey: 'permission_id'});


User.sync()
// console.log('user表创建成功');
Permission.sync()
Tagging.sync()
// console.log('tagging表创建成功');
Article.sync()
// console.log('Article表创建成功');
Tag.sync()
// console.log('Tag表创建成功');
UserPermission.sync()


module.exports = {
    User,
    Article,
    Tag,
    Tagging,
    Sequelize, 
    sequelize,
    Permission,
    UserPermission,
}