orm框架,对象关系映射



## 问答题

1. 什么是ORM？和直接使用driver驱动数据库有什么区别？

   > ORM（对象关系映射）是一种编程技术，用于将关系型数据库中的数据映射到面向对象的编程语言中。它允许开发人员使用面向对象的方式来操作数据库，而不需要直接编写SQL查询语句。
   >
   > ORM框架负责将数据库表和记录映射到对象和属性，使开发人员可以使用类和方法来操作数据，而不必关心底层数据库的细节。ORM提供了一种抽象层，隐藏了底层数据库的复杂性，提供了更简洁、更直观的编程接口。
   >
   > 与直接使用数据库驱动程序相比，ORM具有以下优势：
   >
   > 1. 对象化编程：ORM使开发人员能够使用面向对象的方式来处理数据，将数据库表和记录映射到对象和属性。这样可以更自然地编写代码，提高开发效率。
   >
   > 2. 数据库无关性：ORM框架能够处理不同类型的数据库，使得应用程序更具可移植性。开发人员可以在不修改代码的情况下切换数据库，从而降低了维护和迁移的复杂性。
   >
   > 3. 数据库操作的抽象层：ORM提供了一层抽象，隐藏了底层数据库的细节。开发人员不需要直接编写SQL查询语句，而是使用ORM框架提供的方法和API来执行数据库操作。这简化了开发过程并提高了代码的可读性。
   >
   > 4. 自动化的关系映射：ORM框架自动处理数据库表和对象之间的映射，包括主键、外键、关联关系等。这样可以减少手动编写映射代码的工作量，并降低了错误的风险。
   >
   > 然而，ORM也有一些潜在的缺点：
   >
   > 1. 性能问题：ORM框架可能会引入一定的性能开销，因为它需要进行额外的映射和转换操作。对于复杂的查询和大规模的数据操作，直接使用数据库驱动程序可能更高效。
   >
   > 2. 学习曲线和复杂性：ORM框架通常具有自己的学习曲线和复杂性。开发人员需要学习框架的概念、配置和使用方法，以及处理一些特定的ORM问题。
   >
   > 综上所述，ORM提供了一种更加面向对象的编程方式，简化了数据库操作的代码编写和维护。但在某些情况下，直接使用数据库驱动程序可能更适合需要更高性能和更细粒度控制的场景。

2. 如何使用squelize的async/await 写法？

   > 使用 Sequelize 的 async/await 写法可以简化异步操作的编写，使代码更加清晰和易读。下面是使用 Sequelize 的 async/await 写法的示例：   1. 引入 Sequelize 和相关模型：
   >
   > ```
   > javascriptconst Sequelize = require('sequelize');
   > const sequelize = new Sequelize('database', 'username', 'password', {
   >   host: 'localhost',
   >   dialect: 'mysql',
   > });
   > 
   > const User = sequelize.define('User', {
   >   username: Sequelize.STRING,
   >   email: Sequelize.STRING,
   > });
   > ```
   >
   > 2. 使用 async/await 进行数据库操作：
   >
   > ```
   > javascript// 创建用户
   > const createUser = async (username, email) => {
   >   try {
   >     const user = await User.create({ username, email });
   >     console.log('User created:', user);
   >   } catch (error) {
   >     console.error('Error creating user:', error);
   >   }
   > };
   > 
   > // 查询用户
   > const getUsers = async () => {
   >   try {
   >     const users = await User.findAll();
   >     console.log('Users:', users);
   >   } catch (error) {
   >     console.error('Error retrieving users:', error);
   >   }
   > };
   > 
   > // 更新用户
   > const updateUser = async (userId, newUsername) => {
   >   try {
   >     const user = await User.findByPk(userId);
   >     if (user) {
   >       user.username = newUsername;
   >       await user.save();
   >       console.log('User updated:', user);
   >     } else {
   >       console.log('User not found');
   >     }
   >   } catch (error) {
   >     console.error('Error updating user:', error);
   >   }
   > };
   > 
   > // 删除用户
   > const deleteUser = async (userId) => {
   >   try {
   >     const user = await User.findByPk(userId);
   >     if (user) {
   >       await user.destroy();
   >       console.log('User deleted');
   >     } else {
   >       console.log('User not found');
   >     }
   >   } catch (error) {
   >     console.error('Error deleting user:', error);
   >   }
   > };
   > 
   > // 调用示例
   > createUser('John', 'john@example.com');
   > getUsers();
   > updateUser(1, 'Jane');
   > deleteUser(2);
   > ```
   >
   > 在上述示例中，我们使用了 async/await 关键字来定义异步函数，并在 Sequelize 的操作中使用了 await 来等待 Promise 的解析。这样可以避免使用回调函数或 Promise 链式调用，使代码更加简洁和易读。  

3. 如何使用squelize定义数据库模型？

   > 使用 Sequelize 定义数据库模型可以通过以下步骤完成：   1. 首先，确保已安装 Sequelize 包。可以使用以下命令进行安装：
   >
   > ```
   > npm install sequelize
   > ```
   >
   > 2. 在项目中创建一个新的 Sequelize 实例，并配置数据库连接信息：
   >
   > ```
   > javascriptconst Sequelize = require('sequelize');
   > const sequelize = new Sequelize('database', 'username', 'password', {
   >   host: 'localhost',
   >   dialect: 'mysql',
   > });
   > ```
   >
   > 请根据您的实际情况修改数据库连接信息，如数据库名称、用户名、密码、主机和数据库类型。   3. 定义模型：
   >
   > ```
   > javascriptconst User = sequelize.define('User', {
   >   username: Sequelize.STRING,
   >   email: Sequelize.STRING,
   > });
   > ```
   >
   > 在上面的示例中，我们定义了一个名为  `User`  的模型，并指定了它的字段和字段类型。在这个例子中，我们定义了  `username`  和  `email`  两个字段，并将它们的类型设置为  `STRING` 。   4. 同步模型到数据库：
   >
   > ```
   > javascriptsequelize.sync()
   >   .then(() => {
   >     console.log('Models synchronized with database');
   >   })
   >   .catch((error) => {
   >     console.error('Error synchronizing models:', error);
   >   });
   > ```
   >
   > 使用  `sequelize.sync()`  方法可以将定义的模型同步到数据库中。在上述示例中，我们通过调用  `sync()`  方法将模型同步到数据库，并使用  `.then()`  和  `.catch()`  处理同步结果。   请注意，这只是一个简单的示例，您可以根据实际需求定义更复杂的模型，包括定义关联关系、添加验证规则等。   以上是使用 Sequelize 定义数据库模型的基本步骤。根据您的实际需求，您可以定义多个模型，并在应用程序中使用它们进行数据库操作

4. 什么是数据库事务？如何使用在sequelize中使用事务？

   > 数据库事务是一组数据库操作的执行单元，这些操作要么全部成功执行，要么全部回滚。事务确保了数据库的一致性和完整性，以及数据操作的原子性。   在 Sequelize 中使用事务可以通过以下步骤完成：   1. 首先，确保已经创建了 Sequelize 实例并建立了数据库连接。   2. 使用  `sequelize.transaction()`  方法创建一个事务对象，并传入一个回调函数。   3. 在回调函数中执行需要在事务中进行的数据库操作。可以使用模型的方法（如  `create` 、 `update` 、 `destroy`  等）来执行数据库操作。   4. 在回调函数中，如果所有操作都成功完成，使用  `commit`  方法提交事务。如果出现错误或需要回滚操作，可以使用  `rollback`  方法回滚事务。   以下是一个使用事务的示例代码：
   >
   > ```
   > javascriptconst { Sequelize, DataTypes } = require('sequelize');
   > const sequelize = new Sequelize('database', 'username', 'password', {
   >   host: 'localhost',
   >   dialect: 'mysql',
   > });
   > 
   > // 定义模型
   > const User = sequelize.define('User', {
   >   name: DataTypes.STRING,
   >   age: DataTypes.INTEGER,
   > });
   > 
   > // 使用事务
   > sequelize.transaction(async (transaction) => {
   >   try {
   >     // 在事务中执行数据库操作
   >     await User.create({ name: 'John', age: 25 }, { transaction });
   >     await User.update({ age: 30 }, { where: { name: 'John' }, transaction });
   > 
   >     // 提交事务
   >     await transaction.commit();
   >     console.log('Transaction committed successfully.');
   >   } catch (error) {
   >     // 回滚事务
   >     await transaction.rollback();
   >     console.error('Transaction rolled back:', error);
   >   }
   > });
   > ```
   >
   > 在上述示例中，我们创建了一个名为  `User`  的模型，并在事务中执行了两个数据库操作：创建一个新用户和更新用户的年龄。如果所有操作都成功完成，事务将被提交。如果出现错误，事务将被回滚。   请注意，事务对象可以作为参数传递给 Sequelize 模型的方法，以确保操作在同一个事务中执行。   这只是一个简单的示例，您可以根据实际需求在事务中执行更复杂的数据库操作。通过使用事务，可以确保一组操作要么全部成功执行，要么全部回滚，从而保持数据库的一致性和完整性。

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

1. 请查询所有男学生

   > <img src="C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20231203225808508.png" alt="image-20231203225808508" style="zoom:80%;" />

2. 请查询所有课程和对应课程的老师（使用join）

   > 

3. 请查询`95033`班中学习成绩最好的学生（课程平均分最高的学生）

   > 











## 算法题

