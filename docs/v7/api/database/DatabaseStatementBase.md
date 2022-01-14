# DatabaseStatementBase
数据库结果集基础对象。

[DatabaseStatementInterface](./databasestatementinterface) 的默认实现。


## $dbh

此结果集的数据库连接对象。

- 类型: [DatabaseConnection](./databaseconnection)



## __construct($dbh)

设置数据库连接对象。

参数:
- `$dbh`: `DatabaseConnection`

    数据库连接对象。


## execute($args, $options)

执行一条预处理语句

参数:
- `$args`: `array`

    预处理语句的参数数组。默认 []

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](./databaseconnection.html#defaultoptions)

返回值: `boolean`


## getQueryString()

获取执行的SQL语句。

返回值: `string`


## fetchCol($index = 0)

以索引数组的形式返回结果集的整个单列。

参数:
- `$index`: `number`

    列的索引。默认 `0`

返回值: `array`


## fetchAllAssoc($key, $fetch)

将结果集作为给定字段的关联数组返回。

参数:
- `$key`: `string`

    用于索引的字段的名称。

- `$fetch`: `number`

    结果集的返回值模式。默认 `PDO::FETCH_OBJ`

    可选值如下:
    - `PDO::FETCH_ASSOC`
    - `PDO::FETCH_NUM`
    - `PDO::FETCH_BOTH`

返回值: `array`


## fetchAllKeyed($key_index = 0, $value_index = 1)

以单个关联数组的形式返回整个结果集。

参数:
- `$key_index`: `number`

    用作数组键的字段的数字索引。

- `$value_index`: `number`

    用作数组值的字段的数值索引。

返回值: `array`


## fetchField($index = 0)

返回结果集中下一条记录的单个字段。

参数:
- `$index`: `number`

    要返回的字段的数字索引。默认 `0`。

返回值: `mixed`


## fetchAssoc()

获取结果集中的下一条数据，并将其作为关联数组返回。

返回值: `array`











































