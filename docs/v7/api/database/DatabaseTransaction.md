# DatabaseTransaction

用于创建和管理数据库事务的包装器类。

并不是所有的数据库或数据库配置都支持事务。例如，`MySQL: MyISAM` 表就不需要。也很容易开始一个事务，然后忘记提交它，这可能导致在启动另一个事务时出现连接错误。

这个类充当事务的包装器。要开始一个事务，只需实例化它。当对象超出作用域并被销毁时它会自动提交。它还将检查指定的连接是否支持事务。如果不是，它将简单地跳过任何事务命令，允许用户空间代码正常进行。唯一的区别是回滚实际上不会做任何事情。

在绝大多数情况下，您不应该直接实例化这个类。应使用 $conn->->startTransaction() 开启一个事务。


## $connection
<Badge>protected</Badge>

此事务的连接对象。

- 类型: `DatabaseConnection`


## $rolledBack
<Badge>protected</Badge>

一个布尔值，指示此事务是否已回滚。

- 类型: `boolean`
- 默认值: `FALSE`


## $name
<Badge>protected</Badge>

事务的名称。这用于标记事务存档点。如果当前连接没有任何事务，它将被重写为`drupal_transaction`。

- 类型: `string`


## __construct($connection, $name)
开启事务/创建一个存档点。

参数:
- `$connection`: `DatabaseConnection`

    连接对象。

- `$name`: `string`

    事务/存档点名称。默认 `NULL`


## __destruct()
提交当前事务/移除存档点。


## name()
返回当前事务/存档点的名称。

返回值: `string`


## rollback()
回滚当前事务。

这只是一个包装器方法，用于回滚我们当前所处的事务堆栈，该事务堆栈由连接对象本身管理。

注意，日志记录(最好使用[watchdog_exception()](/))需要在事务回滚之后发生，否则日志消息也将回滚。


## 演示
```php
$conn = Database::getConnection();
$conn->startTransaction();

$affected_rows = $conn->query(
    'UPDATE {product} SET status = :status WHERE pid = :pid',
    array(':status' => 1, ':uid' => 1),
    array('return' => Database::RETURN_AFFECTED)
);

if (!$affected_rows) {
    $conn->rollback();
}
```

```php
db_transaction();

$affected_rows = db_query(
    'UPDATE {product} SET status = :status WHERE pid = :pid',
    array(':status' => 1, ':uid' => 1),
    array('return' => Database::RETURN_AFFECTED)
);

if (!$affected_rows) {
    $transaction->rollback();
}
```
