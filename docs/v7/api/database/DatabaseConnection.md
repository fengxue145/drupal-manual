# DatabaseConnection
<Badge>abstract</Badge>

基数据库API类。

这个类提供了 `PHP` 中 `PDO` 数据库抽象类的特定于 `drupal` 的扩展。每个数据库驱动程序实现都必须提供一个具体的实现，以支持该数据库所需的特殊处理。


## $target
<Badge>protected</Badge>

- 类型: `string`
- 默认值: `NULL`

数据库目标的名称。

```php {4,11}
// default 和 slave 为目标数据库
$database = array(
    'default' => array(
        'default' => array(
            'driver'       => 'mysql',
            'database'     => 'drupal-01',
            'username'     => 'root',
            'password'     => '123456',
            'host'         => '192.168.1.20',
        ),
        'slave'  => array(
            array(
                'driver'   => 'mysql',
                'database' => 'drupal-02',
                'username' => 'root',
                'password' => '123456',
                'host'     => '192.168.1.21',
            ),
            ...
        )
    )
);
```


## $key
<Badge>protected</Badge>

- 类型: `string`
- 默认值: `NULL`

表示此连接的键。键是标识数据库连接的唯一字符串。一个连接可以是一个服务器，也可以是一个主从集群(使用target在主从之间进行选择)。

```php {3,6}
// default 和 extra 为数据库的键
$database = array(
    'default' => array(
        ...
    ),
    'extra'   => array(
        ...
    )
);
```


## $logger
<Badge>protected</Badge>

- 类型: [DatabaseLog](./databaselog)
- 默认值: `NULL`

此连接的数据库日志记录对象。


## $transactionLayers
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

此连接的事务存档点列表。


## $driverClasses
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

用于各种操作的特定驱动程序类的索引。如 [SelectQuery](./selectquery) [InsertQuery](./insertquery) 等


## $statementClass
<Badge>protected</Badge>

- 类型: `string`
- 默认值: [DatabaseStatementBase](./databasestatementbase)

此连接所使用的结果集对象的类名称。`DatabaseStatementBase` 扩展于 `PDOStatement`


## $transactionSupport
<Badge>protected</Badge>

- 类型: `boolean`
- 默认值: `TRUE`

此数据库连接是否支持事务。


## $transactionalDDLSupport
<Badge>protected</Badge>

- 类型: `boolean`
- 默认值: `FALSE`

此数据库连接是否支持事务性DDL。默认设置为FALSE，因为很少有数据库支持此特性。


## $temporaryNameIndex
<Badge>protected</Badge>

- 类型: `number`
- 默认值: `0`

用于生成唯一临时表名的索引。


## $connection
<Badge>protected</Badge>

- 类型: `PDO`

实际的 [PDO](https://php.net/manual/en/class.pdo.php) 连接。


## $connectionOptions
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

此连接对象的连接信息。

```php
// settings.php
$databases = array(
    'default' => array (
        'database' => 'drupal_local',
        'username' => 'root',
        'password' => '123456',
        'host' => '127.0.0.1',
        'port' => '3308',
        'driver' => 'mysql',
        'prefix' => array(
            'default' => 'shared_',
            'actions' => 'slave2_',
            'batch' => 'slave2_',
        ),
    ),
);

[connectionOptions:protected] => Array
(
    [database] => drupal_local
    [username] => root
    [password] => 123456
    [host] => 127.0.0.1
    [port] => 3308
    [driver] => mysql
    [prefix] => Array
        (
            [default] => shared_
            [actions] => slave2_
            [batch] => slave2_
        )
)
```


## $schema
<Badge>protected</Badge>

- 类型: [DatabaseSchema](./databaseschema)
- 默认值: `NULL`

此连接的结果集对象。


## $prefixes
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

此连接使用的表前缀列表。

```php
[prefixes:protected] => Array
(
    [default] => shared_
    [actions] => slave2_
    [batch] => slave2_
)
```

## $prefixSearch
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

在 [prefixTables()](#prefixtables) 中使用的搜索值列表。

```php
[prefixSearch:protected] => Array
(
    [0] => {actions}
    [1] => {batch}
    [2] => {
    [3] => }
)
```


## $prefixReplace
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

在 [prefixTables()](#prefixtables) 中使用的替换值列表。

```php
[prefixReplace:protected] => Array
(
    [0] => `slave2_actions`
    [1] => `slave2_batch`
    [2] => `shared_
    [3] => `
)
```


## $escapedNames
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

转义的数据库、表和字段名列表，以未转义的名称作为键值。


## $escapedAliases
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

转义别名列表，以未转义别名为键值。


## $unprefixedTablesMap
<Badge>protected</Badge>

- 类型: `string[]`
- 默认值: `[]`

无前缀表名列表，由前缀表名作为键值。

```php
[unprefixedTablesMap:protected] => Array
(
    [slave2_actions] => actions
    [slave2_batch] => batch
)
```


## __construct($dsn, $username, $password, $driver_options)
参数:
- `$dsn`: `string`

    数据源名，包括主机名，端口号和数据库名称。

- `$username`: `string`

    连接数据库的用户名。

- `$password`: `string`

    连接数据库的密码。

- `$driver_options`: `array`

    连接数据库的其他选项。默认 `[]`

详细用法参考 [PDO](https://php.net/manual/en/class.pdo.php)


## __call($name, $arguments)
代理可能直接调用 [PDO](https://php.net/manual/en/class.pdo.php) 方法。

参数:
- `$name`: `string`

    方法名。

- `$arguments`: `array`

    方法参数列表。

返回值: `mixed`


## destroy()
销毁 `$connection` 对象。

如果对象仍被其他变量引用，PHP不会销毁该对象。对于 `PDO` 数据库连接对象，PHP只在 `PDO` 对象被销毁时关闭连接，因此任何对该对象的引用都可能导致超过允许的最大连接数。


## getConnectionOptions()

获取此连接对象的连接信息。

返回值: `array`

参见 [$connectionOptions](#connectionoptions)


## prefixTables($sql)

向查询语句中的所有表追加表前缀。

参数:
- `$sql`: `string`

    查询字符串。

返回值: `string`

```php
// settings.php
$database = array(
    'default' => array(
        'default' => array(
            ...
            'prefix'   => 'main_'
        )
    )
);

echo $connection->prefixTables('SELECT * FROM {node}');
// output: SELECT * FROM `main_node`
```


## tablePrefix($table)

查询表的前缀。

参数:
- `$table`: `string`

    表的名称。默认 `default`

返回值: `string`


## getUnprefixedTablesMap()

获取带有单独前缀的表名的列表。

返回值: `array`

参见 [$unprefixedTablesMap](#unprefixedtablesmap)


## prepareQuery($query)

对查询字符串进行预处理。

参数:
- `$query`: `string`

    查询字符串，用 `{}` 包围表名。

返回值: [DatabaseStatementInterface](./databasestatementinterface)


## setTarget($target)

设置当前连接的 [$target](#target)。

参数:
- `$target`: `string`

    默认 `NULL`。


## getTarget()

获取当前连接的 [$target](#target)。

返回值: `string`


## setKey($key)

设置当前连接的 [$key](#key)。

参数:
- `$key`: `string`


## getKey()

获取当前连接的 [$key](#key)。

返回值: `string`


## setLogger($logger)

设置当前连接的日志对象。

参数:
- `$logger`: [DatabaseLog](./databaselog)


## getLogger()

获取当前连接的日志对象。

返回值: [DatabaseLog](./databaselog)


## makeSequenceName($table, $field)

为给定的表和字段创建适当的序列名。

参数:
- `$table`: `string`

    表的名称。

- `$field`: `string`

    字段的名称。

返回值: `string`

```php
echo $connection->makeSequenceName('drupal', 'node');
// output: {drupal}_node_seq
```


## makeComment($comments)

将查询注释数组扁平化为单个注释字符串。同时还会过滤字符串，以避免 `SQL` 注入。

参数:
- `$comments`: `string[]`

    查询注释字符串的数组。

返回值: `string`


## query($query, $args, $options)
参数:
- `$query`: `string`

    要执行的查询。在大多数情况下，这将是一个包含有占位符的 `SQL` 查询的字符串。也可以传递一个已经准备好的`DatabaseStatementInterface` 实例，以便允许调用代码手动将变量绑定到查询。

    如果传递了`DatabaseStatementInterface`，则 `$args` 数组将被忽略。

- `$args`: `array`

    预处理语句的参数数组。默认 `[]`

    - 如果使用未命名(?)占位符，该参数必须是一个索引数组。
    - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 `[]`

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: [DatabaseStatementInterface](./databasestatementinterface)




## getDriverClass($class, $files, $use_autoload)

获取实现 `SelectQueryInterface` `QueryConditionInterface` `QueryAlterableInterface` `QueryPlaceholderInterface` 等特定操作接口的的驱动程序类。如果有返回此驱动程序的类的名称, 否则返回 `NULL`。

参数:
- `$class`: `string`

    驱动程序类名。

- `$files`: `array`

    驱动类所在的文件列表。默认 `[]`

- `$use_autoload`: `boolean`

    是否自动加载。默认 `FALSE`

返回值: `string` | `null`

```php {4}
$database = array(
    'default' => array(
        'default' => array(
            'driver'       => 'mysql',
            'database'     => 'drupal-01',
            'username'     => 'root',
            'password'     => '123456',
            'host'         => '192.168.1.20',
        )
    )
);

// database/mysql/query.inc
class SelectQuery_mysql extends Query implements SelectQueryInterface {
    ...
}

echo $connection->getDriverClass('SelectQuery', array('query.inc'));
// output: SelectQuery_mysql
```


## select($table, $alias, $options)

准备并返回一个 `SelectQueryInterface` 查询对象。

参数:
- `$table`: `string`

    此查询的基表名称，即 `FROM` 子句中的第一个表。这个表也将用作 [query_alter_hook()](../hook/query-alter-hook) 实现的基表。

- `$alias`: `array`

    此查询的基表的别名。默认 `NULL`

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `SelectQueryInterface`


## insert($table, $options)

准备并返回一个 `InsertQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `InsertQuery`


## merge($table, $options)

准备并返回一个 `MergeQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `MergeQuery`


## update($table, $options)

准备并返回一个 `UpdateQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `UpdateQuery`


## delete($table, $options)

准备并返回一个 `DeleteQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `DeleteQuery`


## truncate($table, $options)

准备并返回一个 `TruncateQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `TruncateQuery`


## schema()

返回此连接的结果集 [DatabaseSchema](./databaseschema) 对象

返回值: `DatabaseSchema`


## escapeTable($table)

过滤表名中的非法字符。

参数:
- `$table`: `string`

    数据表名称。

返回值: `string`


## escapeField($field)

过滤字段名中的非法字符。

参数:
- `$field`: `string`

    字段名称。

返回值: `string`


## escapeAlias($alias)

过滤表别名中的非法字符。

参数:
- `$alias`: `string`

    数据表的别名。

返回值: `string`


## escapeLike($string)

转义在 `LIKE` 模式中作为通配符使用的字符(`%` `_` `\`)。

参数:
- `$string`: `string`

    `LIKE` 查询子句。

返回值: `string`

```php
db_query(
    'SELECT * FROM person WHERE name LIKE :pattern',
    array(':pattern' => db_like('维多%_') . '%')
);
```

生成以下 `SQL` 语句：
```sql
SELECT * FROM person WHERE name LIKE '维多\%\_%';
```


## inTransaction()

判断当前连接是否正在进行事务处理。

返回值: `boolean`


## transactionDepth()

获取当前连接的事务层级。

返回值: `number`


## startTransaction($name)

在此连接上开启事务或创建一个事务存档点，并返回 [DatabaseTransaction](./databasetransaction) 对象。

参数:
- `$name`: `string`

    存档点名称。默认 `''`

返回值: `DatabaseTransaction`


## rollback($savepoint_name = 'drupal_transaction')

将事务完全回滚或回滚到指定的存档点。

参数:
- `$savepoint_name`: `string`

    存档点名称。默认 `drupal_transaction`


## pushTransaction($name)

添加一个的存档点。

参数:
- `$name`: `string`

    存档点名称。


## popTransaction($name)

移除指定的存档点。

参数:
- `$name`: `string`

    存档点名称。


## version()

返回数据库服务器的版本。

返回值: `string`


## supportsTransactions()

判断当前数据库连接是否支持事务。

返回值: `boolean`


## supportsTransactionalDDL()

判断当前数据库连接是否支持事务性DDL。

返回值: `boolean`


## commit()
抛出异常，拒绝直接访问事务提交。


## utf8mb4IsConfigurable()

检查是否可以在 `settings.php` 中配置 `utf8mb4` 支持。

返回值: `boolean`


## utf8mb4IsActive()

检查是否已激活 `utf8mb4` 支持。

返回值: `boolean`


## utf8mb4IsSupported()

检查当前数据库系统是否支持 `utf8mb4`。

返回值: `boolean`



## defaultOptions()
<Badge>protected</Badge>

返回值: `array`

  返回默认查询选项。键含义如下：
  - `target`: `string`

      要执行查询的数据库目标。默认 `default`

      ::: tip 注意
      - 系统首先尝试打开一个连接到一个由用户提供的键指定的数据库。如果一个目标不可用，它将无声地退回到 `default` 目标。
      - 如果目标有多个数据库连接，那么在请求期间随机选择一个。
      <br><br>
      :::

  - `fetch`: `number`

      设置结果集的返回方式。默认 `PDO::FETCH_OBJ`

      合法值包括：`PDO::FETCH_ASSOC`, `PDO::FETCH_BOTH`, `PDO::FETCH_OBJ`, `PDO::FETCH_NUM` 和 表示类名的字符串。

      详细参见: [http://php.net/manual/pdostatement.fetch.php](http://php.net/manual/pdostatement.fetch.php)

  - `return`: `number`

      设置查询的返回值类型。默认 `Database::RETURN_STATEMENT`

      合法值如下:
      - [Database::RETURN_STATEMENT](./Database.html#const)
      - [Database::RETURN_AFFECTED](./Database.html#const)
      - [Database::RETURN_INSERT_ID](./Database.html#const)
      - [Database::RETURN_NULL](./Database.html#const)


  - `throw_exception`: `boolean`

      发生错误是否抛出异常。默认 `TRUE`

      默认情况下，数据库系统将捕获查询中的任何错误 `Exception` 异常，并将其抛出。若不想抛出异常并在失败的时候返回 `NULL`，请设置为 `FALSE`。


## setPrefix($prefix)
<Badge>protected</Badge>

设置此数据库连接使用的前缀列表。

参数:
- `$prefix`: `string` | `array`

    表前缀列表或字符串。

```php
// settings.php
$database = array(
    'default' => array(
        'default' => array(
            ...
            // 设置所有表前缀为 main_
            'prefix'   => 'main_'
        )
    ),
    'db2' => array(
        'default' => array(
            ...
            // 为特定的表提供前缀。数组的键是表名，值是前缀。
            // default元素是必须的，它包含数组中其他地方没有指定的表的前缀
            'prefix'   => array(
                'default'   => 'main_',   // main_{table_name}
                'users'     => 'shared_', // shared_users
                'sessions'  => 'shared_', // shared_users
                'role'      => 'shared_', // shared_users
                'authmap'   => 'shared_', // shared_users
            )
        )
    ),
    'db3' => array(
        'default' => array(
            ...
            // 使用模式/数据库的引用作为前缀。
            'prefix'   => array(
                'default'   => 'main.',   // main.{table_name}
                'users'     => 'shared.', // shared.users
                'sessions'  => 'shared.', // shared.sessions
                'role'      => 'shared.', // shared.role
                'authmap'   => 'shared.', // shared.authmap
            )
        )
    )
);
```


## filterComment($comment)
<Badge>protected</Badge>

过滤查询注释字符串。

参数:
- `$comment`: `string`

    查询注释字符串。默认 `''`

返回值: `string`

```php
db_update('example')
    ->condition('id', $id)
    ->fields(array('field2' => 10))
    ->comment('Exploit*/ DROP TABLE node; --')
    ->execute();
```

可能会生成以下SQL语句:
```sql
/* Exploit * / DROP TABLE node; -- */ UPDATE example SET field2=...
```


## expandArguments(&$query, &$args)
<Badge>protected</Badge>

展开速记占位符。如果 `$query` 被修改，返回 `TRUE`，否则返回 `FALSE`

Drupal支持多值数组的另一种语法，因此需要将它们扩展成一个完整的、可执行的查询字符串。

参数:
- `&$query`: `string`

    查询字符串。

- `&$args`: `array`

    预处理语句的参数数组。

返回值: `boolean`

```php
$query = 'SELECT * FROM {node} WHERE nid IN (:nids)';
$args = array(':nids' => array(1, 2, 3));
$connection->expandArguments($query, $args);
```

展开后的 `$query` 和 `$args` 如下:
```php
// $query
SELECT * FROM {node} WHERE nid IN (:nids_0, :nids_1, nids_2)

// $args
array(
    'nids_0' => 1,
    'nids_1' => 2,
    'nids_2' => 3
)
```


## popCommittableTransactions()
<Badge>protected</Badge>

内部使用：提交所有可以提交的事务层。


## generateTemporaryTableName()
<Badge>protected</Badge>

生成临时表的名称。

返回值: `string`



## queryRange($query, $from, $count, $args, $options)
<Badge>abstract</Badge>

在此数据库对象上运行一个有限范围的查询。

参数:
- `$query`: `string`

    查询字符串。

- `$from`: `number`

    要返回的第一个结果行 `OFFSET`。

- `$count`: `number`

    要返回的最大结果行数 `LIMIT`。

- `$args`: `array`

    预处理语句的参数数组。默认 `[]`

    - 如果使用未命名(?)占位符，该参数必须是一个索引数组。
    - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 `[]`

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `DatabaseStatementInterface`


## queryTemporary($query, $args, $options)
<Badge>abstract</Badge>

运行 `SELECT` 查询并将其结果存储在临时表中，并返回临时表的名称。

参数:
- `$query`: `string`

    要执行的查询。在大多数情况下，这将是一个包含有占位符的 `SQL` 查询的字符串。

- `$args`: `array`

    预处理语句的参数数组。默认 `[]`

    - 如果使用未命名(?)占位符，该参数必须是一个索引数组。
    - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 `[]`

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultoptions)

返回值: `string`


## driver()
<Badge>abstract</Badge>

返回数据库驱动程序类型。


## databaseType()
<Badge>abstract</Badge>

返回此连接的PDO驱动程序的名称。

返回值: `string`


## mapConditionOperator($operator)
<Badge>abstract</Badge>

获取条件运算符的任何特殊处理要求。

有些条件类型需要特殊处理，比如 `IN`，因为它们传入的值数据不是一个简单的值。这是一个简单的可重写查找函数。数据库连接应该只定义那些它们希望以不同于默认值的方式处理的操作符。

参数:
- `$operator`: `string`

    条件运算符，如 `IN` `BETNEEN`等。大小写敏感的

返回值: `array` | `null`


## nextId($existing_id = 0)
<Badge>abstract</Badge>

从给定序列中检索一个唯一的id。

如果由于某些原因不能使用串行字段，请使用此函数。例如，MySQL没有读取序列当前值的方法，PostgresQL也不能将序列提升到大于给定值的值。有时你只需要一个唯一的整数。

参数:
- `$existing_id`: `number`

    在数据库导入之后，序列表可能是benind，因此通过传入最大的现有id，可以确保我们永远不会发出相同的id。

返回值: `number`
