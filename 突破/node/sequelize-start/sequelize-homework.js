const  Sequelize  = require('sequelize');
const { Op } = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '007722', {
    host: 'localhost',
    dialect: 'mysql' ,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
//定义模型
const Student = sequelize.define('students', {
    Sno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Sname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Ssex: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Sbirthday: {
        type: Sequelize.DATE,
        allowNull: true
    },
    Class: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
const Course = sequelize.define('courses', {
    Cno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Cname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
});
const Score = sequelize.define('scores', {
    Degree: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
const Teacher = sequelize.define('teachers', {
    Tno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,//不能为空
        unique: true,//唯一
    },
    Tname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Tsex: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Tbirthday: {
        type: Sequelize.DATE,
        allowNull: true
    },
    Prof: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Depart: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Teacher.hasMany(Course, { foreignKey: 'Tno' });
Course.belongsTo(Teacher, { foreignKey: 'Tno' });

Student.hasMany(Score, {foreignKey: 'Sno'})
Score.belongsTo(Student, {foreignKey: 'Sno'});

Course.hasMany(Score, {foreignKey: 'Cno'})
Score.belongsTo(Course, {foreignKey: 'Cno'});

//同步模型与数据库：{alter: true}选项使Sequelize尝试根据模型定义自动更改数据库结构，以使其与模型定义保持一致
sequelize.sync({ alter: true }).then(() => {
    console.log('Tables synchronized');
}).catch((err) => {
    console.error('Error synchronizing tables:', err);
});

//关联course teacher
// Course.findAll({
//     include: [Teacher]
// }).then(res => {
//     console.log(res);
// })

// 查找所有男生的数据行
// const boys =  Student.findAll({
//     where: {
//         Ssex: '男'
//     }
// }).then(res => {
//     console.log(res);
// })

// 查询95033班的学生平均成绩，按平均成绩降序排序
Score.findAll({
    attributes: [
      'Sno',
      [sequelize.fn('avg', sequelize.col('Degree')), 'average']//sequelize.fn函数计算Degree列的平均值
    ],
    include: [{//关联模型
      model: Student,
      where: {
        Class: '95033'
      },//条件
      attributes: ['Sname']//只选择Student模型的Sname列
    }],
    group: ['Sno'],//结果按Sno列进行分组
    order: [[sequelize.fn('avg', sequelize.col('Degree')), 'DESC']],//根据Degree列的平均值按降序对结果进行排序。 
    limit: 1//结果限制为只有一条记录
}).then(res=>{
    console.log(res)
}).catch((err) => {
    console.error(err);
});
  
