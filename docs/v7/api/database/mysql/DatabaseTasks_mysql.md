# DatabaseTasks_mysql

指定Mysql的安装任务。继承 [DatabaseTasks](../DatabaseTasks)


## $pdoDriver
<Badge>protected</Badge>

Mysql 使用的PDO驱动程序名称。

- 类型: `string`
- 默认值: `mysql`


## name()

为 Mysql 返回一个人类可读的名称字符串。

返回值: `string`


## minimumVersion()

返回支持 Mysql 的最小版本。

返回值: `string`



## 源代码
```php
class DatabaseTasks_mysql extends DatabaseTasks {
  /**
   * The PDO driver name for MySQL and equivalent databases.
   *
   * @var string
   */
  protected $pdoDriver = 'mysql';

  /**
   * Returns a human-readable name string for MySQL and equivalent databases.
   */
  public function name() {
    return st('MySQL, MariaDB, or equivalent');
  }

  /**
   * Returns the minimum version for MySQL.
   */
  public function minimumVersion() {
    return '5.0.15';
  }
}
```
