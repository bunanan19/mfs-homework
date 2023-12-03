const  Sequelize  = require('sequelize');
const { Op } = require('sequelize');

async function main(){
    // Option 3: Passing parameters separately (other dialects)
    const sequelize = new Sequelize('blog', 'root', '007722', {
        host: 'localhost',
        dialect: 'mysql' ,
        //缓冲池
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });

    // await sequelize.authenticate();//测试数据库连接
    // console.log('连接成功');

    //用户模型
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    //article 模型
    const Article = sequelize.define('articles', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });
    
    //模型关联
    //foreignKey: 'userId'表示在Article表中使用名为userId的列作为外键，指向User表的主键,
    //适用于当外键的名称与关联的模型名称相同时
    User.hasMany(Article, {foreignKey: 'userId'});//多对一关联，
    Article.belongsTo(User);//Article模型属于User模型，不写则会导致两个模型之间没有明确的关联关系，将无法直接通过关联关系来访问相关的数据。 

    //as: 'userId'表示在User模型中创建一个名为userId的关联别名，用于关联Article模型。 
    //这种方式适用于为关联指定一个不同于模型名称的别名时。
    // User.hasMany(Article, {as: 'userId'});

    await User.sync();//同步模型与数据库之间的结构，即创建表格或更新表格结构
    await Article.sync();
    // console.log('表创建成功');

    //关联操作
    let article = await Article.findOne({
        where: {
            id:1
        },
        include: [{
            model: User,
            // where: {userId: Sequelize.col('users.id')}
        }]
    });
    console.log(article)//sequelize的关联操作，将外键关联表中的信息也获取到

    //transaction事务，将多个步骤设置为一个原子操作
    // let res = await sequelize.tranasaction(async (t) => {
    //     for(let i=0;i<5;i++){
    //         await User.create({name: "mark"+i, age: 22 + i}, {tranasaction:t})
    //     }
    //     let s =  User.findOne({name: 'mark1'}, {tranasaction:t});
    //     s.name = 'new'
    //     s.save()
    //     throw new Error('error')//测试，抛出错误，如果抛出错误后，mark1的数据行就不会在进行修改
    // })
    // console.log(res);


    //插入数据
    // for(i=0;i<5;i++){
    //     await User.create({name:"mark"+i,age:22+i})
    // }

    //查找数据
    // const users = await User.findAll({
    //     where: {
    //         age: 22,
    //         name: 'mark'
    //     }
    // });//select * from user where age = 23 and name='mark'
    // console.log(users);

    //删除数据,在sql中如果不写where条件语句，delete from users会将整个表的数据内容清空，但是在sequelize中不写条件句不会执行delete
    // await User.destroy({
    //     where: {
    //         age: 22
    //     }
    // });//delete from user where age = 22

    //更新数据
    // await User.update({
    //     age: 23
    // },{
    //     where: {
    //         age: 22
    //     }
    // });//update user set age=23 where age = 22

    //插入数据,不会立即插入，需要执行user.save()才会执行
    // let user = User.build ({
    //     name: 'mark',
    //     age: 22,
    // });
    // console.log(user);
    // await user.save();//插入数据,不加await就是异步方法，

    // const res = await User.findAll({
    //     where: {
    //         id: {
    //             $lt: 10 //$lt是一个运算符，表示小于的比较，新版本中$lt已被替换为Op.lt
    //         }
    //         id: {
    //             [Op.lt]: 10, // 使用Op.lt表示小于操作符
    //           },
    //     }
    // });//select * from user where id<15，筛选id<15的数据行

    // for (let user of res) {
    //     user.name = 'aaa';
    //     await user.save(); //在id<15的筛选结果中，遍历数据行将name全部替换成aaa
    //     await user.destroy(); //删除res这几条数据行
    // }
    // console.log(res);

}

main().catch(err=>{
    console.log('连接失败',err);
});
