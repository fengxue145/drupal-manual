# DatabaseLog
数据库查询日志记录器。

```php
Database::startLog('testing');

db_query('SELECT name FROM {test} WHERE age > :age', array(':age' => 25))->fetchCol();
db_query('SELECT age FROM {test} WHERE name = :name', array(':name' => 'Ringo'))->fetchCol();

// Trigger a call that does not have file in the backtrace.
call_user_func_array('db_query', array('SELECT age FROM {test} WHERE name = :name', array(':name' => 'Ringo')))->fetchCol();

$queries = Database::getLog('testing', 'default');
if (count($queries) === 3) {
    echo "Correct number of queries recorded.";
}
```



## $queryLog
<Badge>protected</Badge>

SQL查询记录列表。

- 类型: `array`
- 默认值: `[]`

```php
array(
    $logging_key = array(
        array(
            query  => '',       // SQL语句字符串
            args   => array(),  // 预处理参数数组
            caller => array(),  // 最近的调用栈
            target => '',       // 目标数据库
            time   => 0         // SQL执行所花费的时间
        ),
        ...
    ),
);
```


## $connectionKey
<Badge>protected</Badge>

数据库连接 `key`。

- 类型: `string`
- 默认值: `default`


## __construct($key)

参数:
- `$key`: `string`

    要启用日志记录的数据库连接 `key`。默认 `default`


## start($logging_key)

开始日志记录。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。通过指定不同的日志记录键，我们能够同时启动和停止多个日志记录运行，而不会发生碰撞。


## get($logging_key)

获取到目前为止记录的查询日志。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## clear($logging_key)

清空查询日志。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## end($logging_key)

停止日志记录。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## log($statement, $args, $time)

记录对所有活动日志键的查询。

参数:
- `$statement`: `DatabaseStatementInterface`

    数据库结果集对象。

- `$args`: `array`

    预处理参数数组。

- `$time`: `number`

    执行查询所花费的时间(以毫秒为单位)。


## findCaller()

返回调用此查询的执行栈。

返回值: `array`

