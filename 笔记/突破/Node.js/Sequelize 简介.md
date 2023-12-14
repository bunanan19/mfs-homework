orm框架,对象关系映射



## 问答题

1. 什么是ORM？和直接使用driver驱动数据库有什么区别？

   > ORM（对象关系映射）用于将关系型数据库中的数据映射到面向对象的编程语言中,使开发人员可以使用面向对象的方式来操作数据库，而不需要直接编写SQL查询语句。
   >
   > 与直接使用数据库驱动程序相比，ORM具有以下优缺点：
   >
   > 1. 对象化编程：ORM使开发人员能够使用面向对象的方式来处理数据，将数据库表和记录映射到对象和属性。这样可以更自然地编写代码，提高开发效率。
   >
   > 2. 数据库无关性：ORM框架能够处理不同类型的数据库，使得应用程序更具可移植性。开发人员可以在不修改代码的情况下切换数据库，从而降低了维护和迁移的复杂性。
   >
   > 3. 数据库操作的抽象层：ORM提供了一层抽象，隐藏了底层数据库的细节。开发人员不需要直接编写SQL查询语句，而是使用ORM框架提供的方法和API来执行数据库操作。这简化了开发过程并提高了代码的可读性。
   >
   > 4. 自动化的关系映射：ORM框架自动处理数据库表和对象之间的映射，包括主键、外键、关联关系等。这样可以减少手动编写映射代码的工作量，并降低了错误的风险。
   >
   > 5. 性能问题：ORM框架可能会引入一定的性能开销，因为它需要进行额外的映射和转换操作。对于复杂的查询和大规模的数据操作，直接使用数据库驱动程序可能更高效。
   >

2. 如何使用squelize的async/await 写法？

   > 使用 Sequelize 的 async/await 写法可以简化异步操作的编写，使代码更加清晰和易读
   >
   > ```javascript
   > //定义模型
   > const User = sequelize.define('users', {
   >         name: {
   >             type: Sequelize.STRING,
   >             allowNull: false
   >         },
   >         age: {
   >             type: Sequelize.INTEGER,
   >             allowNull: false
   >         },
   >     });
   >  await User.sync();//同步模型与数据库之间的结构，即创建表格或更新表格结构
   > //查找数据
   > await User.findAll({
   >     where: {
   >         age: 22,
   >         name: 'mark'
   >     }
   > })
   > //删除数据
   > await User.destroy({
   >     where: {
   >         age: 22
   >     }
   > });//delete from user where age = 22
   > ```
   >

3. 如何使用squelize定义数据库模型？

   > 安装 Sequelize 包。
   >
   > ```shell
   > npm install sequelize --save
   > ```
   >
   > 在项目中创建一个新的 Sequelize 实例，并配置数据库连接信息：
   >
   > ```javascript
   > const Sequelize = require('sequelize');
   > const sequelize = new Sequelize('database', 'username', 'password', {
   >   host: 'localhost',
   >   dialect: 'mysql',
   > });
   > ```
   >
   > 定义模型：
   >
   > ```javascript
   > const User = sequelize.define('User', {
   >   username: Sequelize.STRING,
   >   email: Sequelize.STRING,
   > });
   > ```
   >
   > 同步模型到数据库：
   >
   > ```javascript
   > sequelize.sync()
   >   .then(() => {
   >     console.log('同步成功');
   >   })
   >   .catch((error) => {
   >     console.error('同步失败:', error);
   >   });
   > ```
   >
   
4. 什么是数据库事务？如何使用在sequelize中使用事务？

   > 数据库事务是一组数据库操作的执行单元，这些操作要么全部成功执行，要么全部回滚。事务确保了数据库的一致性和完整性，以及数据操作的原子性。
   >
   > ```javascript
   > // 使用事务
   > sequelize.transaction(async (transaction) => {
   >     try {
   >          // 在事务中执行数据库操作
   >          await User.create({ name: 'John', age: 25 }, { transaction });
   >          await User.update({ age: 30 }, { where: { name: 'John' }, transaction });
   >          // 提交事务
   >          await transaction.commit();
   >          console.log('Transaction committed successfully.');
   >     } catch (error) {
   >          // 回滚事务
   >          await transaction.rollback();
   >          console.error('Transaction rolled back:', error);
   >     }
   > });
   > ```
   >

## 代码题

### Student (学生表)

|  属性名   | 数据类型 | 可否为空 |     含义     |
| :-------: | :------: | :------: | :----------: |
|    Sno    |   Int    |    否    | 学号（主键） |
|   Sname   | Char(8)  |    否    |   学生姓名   |
|   Ssex    | Char(2)  |    否    |   学生性别   |
| Sbirthday | datetime |    可    | 学生出生年月 |
|   Class   | Char(5)  |    可    | 学生所在班级 |

| Sno  | Sname | Ssex | Sbirthday  | class |
| :--: | :---: | :--: | :--------: | :---: |
| 108  | 曾华  |  男  | 1977-09-01 | 95033 |
| 105  | 匡明  |  男  | 1975-10-02 | 95031 |
| 107  | 王丽  |  女  | 1976-01-23 | 95033 |
| 101  | 李军  |  男  | 1976-02-20 | 95033 |
| 109  | 王芳  |  女  | 1975-02-10 | 95031 |
| 103  | 陆君  |  男  | 1974-06-03 | 95031 |

### Course（课程表）

| 属性名 |  数据类型   | 可否为空 |       含义       |
| :----: | :---------: | :------: | :--------------: |
|  Cno   |     Int     |    否    |  课程号（主键）  |
| Cname  | Varchar(10) |    否    |     课程名称     |
|  Tno   |     Int     |    否    | 教工编号（外键） |

| Cno  |   Cname    | Tno  |
| :--: | :--------: | :--: |
| 105  | 计算机导论 | 825  |
| 245  |  操作系统  | 804  |
| 166  |  数字电路  | 856  |
| 888  |  高等数学  | 831  |

### Score(成绩表)

| 属性名 |   数据类型   | 可否为空 |      含义      |
| :----: | :----------: | :------: | :------------: |
|  Sno   |     Int      |    否    |  学号（外键）  |
|  Cno   |     Int      |    否    | 课程号（外键） |
| Degree | Decimal(4,1) |    可    |      成绩      |

| Sno  | Cno  | Degree |
| :--: | :--: | :----: |
| 103  | 245  |   86   |
| 105  | 245  |   75   |
| 109  | 245  |   68   |
| 103  | 105  |   92   |
| 105  | 105  |   88   |
| 101  | 105  |   64   |
| 107  | 105  |   91   |
| 108  | 105  |   78   |
| 101  | 166  |   85   |
| 107  | 166  |   79   |
| 108  | 166  |   81   |

### Teacher(教师表)

|  属性名   |  数据类型   | 可否为空 |       含义       |
| :-------: | :---------: | :------: | :--------------: |
|    Tno    |     Int     |    否    | 教工编号（主键） |
|   Tname   |   Char(4)   |    否    |     教工姓名     |
|   Tsex    |   Char(2)   |    否    |     教工性别     |
| Tbirthday |  datetime   |    可    |   教工出生年月   |
|   Prof    |   Char(6)   |    可    |       职称       |
|  Depart   | Varchar(10) |    否    |   教工所在部门   |

| Tno  | Tname | Tsex | Tbirthday  |  Prof  |   Depart   |
| :--: | :---: | :--: | :--------: | :----: | :--------: |
| 804  | 李诚  |  男  | 1958-12-02 | 副教授 |  计算机系  |
| 856  | 张旭  |  男  | 1969-03-12 |  讲师  | 电子工程系 |
| 825  | 王萍  |  女  | 1972-05-05 |  助教  |  计算机系  |
| 831  | 刘冰  |  女  | 1977-08-14 |  助教  | 电子工程系 |

请使用sequelize创建以上的表结构，并插入数据，而后完成如下代码题，请提交js代码、生成的SQL语句和运行结果截图



https://github.com/bunanan19/mfs-homework/blob/main/%E7%AA%81%E7%A0%B4/node/sequelize-start/sequelize-homework.js

1. 请查询所有男学生

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231203225808508.png" alt="image-20231203225808508" style="zoom:80%;" />

2. 请查询所有课程和对应课程的老师（使用join）

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231203230456279.png" alt="image-20231203230456279" style="zoom:80%;" />

3. 请查询`95033`班中学习成绩最好的学生（课程平均分最高的学生）

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231203233748328.png" alt="image-20231203233748328" style="zoom:80%;" />











## 算法题

