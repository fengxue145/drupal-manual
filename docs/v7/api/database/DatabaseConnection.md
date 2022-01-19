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

- 类型: [DatabaseLog](./DatabaseLog)
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

用于各种操作的特定驱动程序类的索引。如 [SelectQuery](./SelectQuery) [InsertQuery](./InsertQuery) 等


## $statementClass
<Badge>protected</Badge>

- 类型: `string`
- 默认值: [DatabaseStatementBase](./DatabaseStatementBase)

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

- 类型: [DatabaseSchema](./DatabaseSchema)
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

在 [prefixTables()](#prefixTables) 中使用的搜索值列表。

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

在 [prefixTables()](#prefixTables) 中使用的替换值列表。

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

参见 [$connectionOptions](#connectionOptions)


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

参见 [$unprefixedTablesMap](#unprefixedTablesMap)


## prepareQuery($query)

对查询字符串进行预处理。

参数:
- `$query`: `string`

    查询字符串，用 `{}` 包围表名。

返回值: [DatabaseStatementInterface](./DatabaseStatementInterface)


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
- `$logger`: [DatabaseLog](./DatabaseLog)


## getLogger()

获取当前连接的日志对象。

返回值: [DatabaseLog](./DatabaseLog)


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

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: [DatabaseStatementInterface](./DatabaseStatementInterface)




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

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `SelectQueryInterface`


## insert($table, $options)

准备并返回一个 `InsertQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `InsertQuery`


## merge($table, $options)

准备并返回一个 `MergeQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `MergeQuery`


## update($table, $options)

准备并返回一个 `UpdateQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `UpdateQuery`


## delete($table, $options)

准备并返回一个 `DeleteQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `DeleteQuery`


## truncate($table, $options)

准备并返回一个 `TruncateQuery` 对象。

参数:
- `$table`: `string`

    数据表名称。

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 []

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

返回值: `TruncateQuery`


## schema()

返回此连接的结果集 [DatabaseSchema](./DatabaseSchema) 对象

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

在此连接上开启事务或创建一个事务存档点，并返回 [DatabaseTransaction](./DatabaseTransaction) 对象。

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

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

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

    详细信息请参阅 [DatabaseConnection::defaultOptions()](#defaultOptions)

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


## 源代码
```php
abstract class DatabaseConnection {

    /**
     * The database target this connection is for.
     *
     * We need this information for later auditing and logging.
     *
     * @var string
     */
    protected $target = NULL;

    /**
     * The key representing this connection.
     *
     * The key is a unique string which identifies a database connection. A
     * connection can be a single server or a cluster of master and slaves (use
     * target to pick between master and slave).
     *
     * @var string
     */
    protected $key = NULL;

    /**
     * The current database logging object for this connection.
     *
     * @var DatabaseLog
     */
    protected $logger = NULL;

    /**
     * Tracks the number of "layers" of transactions currently active.
     *
     * On many databases transactions cannot nest.  Instead, we track
     * nested calls to transactions and collapse them into a single
     * transaction.
     *
     * @var array
     */
    protected $transactionLayers = array();

    /**
     * Index of what driver-specific class to use for various operations.
     *
     * @var array
     */
    protected $driverClasses = array();

    /**
     * The name of the Statement class for this connection.
     *
     * @var string
     */
    protected $statementClass = 'DatabaseStatementBase';

    /**
     * Whether this database connection supports transactions.
     *
     * @var bool
     */
    protected $transactionSupport = TRUE;

    /**
     * Whether this database connection supports transactional DDL.
     *
     * Set to FALSE by default because few databases support this feature.
     *
     * @var bool
     */
    protected $transactionalDDLSupport = FALSE;

    /**
     * An index used to generate unique temporary table names.
     *
     * @var integer
     */
    protected $temporaryNameIndex = 0;

    /**
     * The actual PDO connection.
     *
     * @var \PDO
     */
    protected $connection;

    /**
     * The connection information for this connection object.
     *
     * @var array
     */
    protected $connectionOptions = array();

    /**
     * The schema object for this connection.
     *
     * @var object
     */
    protected $schema = NULL;

    /**
     * The prefixes used by this database connection.
     *
     * @var array
     */
    protected $prefixes = array();

    /**
     * List of search values for use in prefixTables().
     *
     * @var array
     */
    protected $prefixSearch = array();

    /**
     * List of replacement values for use in prefixTables().
     *
     * @var array
     */
    protected $prefixReplace = array();

    /**
     * List of escaped database, table, and field names, keyed by unescaped names.
     *
     * @var array
     */
    protected $escapedNames = array();

    /**
     * List of escaped aliases names, keyed by unescaped aliases.
     *
     * @var array
     */
    protected $escapedAliases = array();

    /**
     * List of un-prefixed table names, keyed by prefixed table names.
     *
     * @var array
     */
    protected $unprefixedTablesMap = array();

    function __construct($dsn, $username, $password, $driver_options = array()) {
        // Initialize and prepare the connection prefix.
        $this->setPrefix(isset($this->connectionOptions['prefix']) ? $this->connectionOptions['prefix'] : '');

        // Because the other methods don't seem to work right.
        $driver_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;

        // Call PDO::__construct and PDO::setAttribute.
        $this->connection = new PDO($dsn, $username, $password, $driver_options);

        // Set a Statement class, unless the driver opted out.
        if (!empty($this->statementClass)) {
            $this->connection->setAttribute(PDO::ATTR_STATEMENT_CLASS, array($this->statementClass, array($this)));
        }
    }

    /**
     * Proxy possible direct calls to the \PDO methods.
     *
     * Since PHP8.0 the signature of the the \PDO::query() method has changed,
     * and this class can't extending \PDO any more.
     *
     * However, for the BC, proxy any calls to the \PDO methods to the actual
     * PDO connection object.
     */
    public function __call($name, $arguments) {
        return call_user_func_array(array($this->connection, $name), $arguments);
    }

    /**
     * Destroys this Connection object.
     *
     * PHP does not destruct an object if it is still referenced in other
     * variables. In case of PDO database connection objects, PHP only closes the
     * connection when the PDO object is destructed, so any references to this
     * object may cause the number of maximum allowed connections to be exceeded.
     */
    public function destroy() {
        // Destroy all references to this connection by setting them to NULL.
        // The Statement class attribute only accepts a new value that presents a
        // proper callable, so we reset it to PDOStatement.
        if (!empty($this->statementClass)) {
            $this->connection->setAttribute(PDO::ATTR_STATEMENT_CLASS, array('PDOStatement', array()));
        }
        $this->schema = NULL;
    }

    /**
     * Returns the default query options for any given query.
     *
     * A given query can be customized with a number of option flags in an
     * associative array:
     * - target: The database "target" against which to execute a query. Valid
     *   values are "default" or "slave". The system will first try to open a
     *   connection to a database specified with the user-supplied key. If one
     *   is not available, it will silently fall back to the "default" target.
     *   If multiple databases connections are specified with the same target,
     *   one will be selected at random for the duration of the request.
     * - fetch: This element controls how rows from a result set will be
     *   returned. Legal values include PDO::FETCH_ASSOC, PDO::FETCH_BOTH,
     *   PDO::FETCH_OBJ, PDO::FETCH_NUM, or a string representing the name of a
     *   class. If a string is specified, each record will be fetched into a new
     *   object of that class. The behavior of all other values is defined by PDO.
     *   See http://php.net/manual/pdostatement.fetch.php
     * - return: Depending on the type of query, different return values may be
     *   meaningful. This directive instructs the system which type of return
     *   value is desired. The system will generally set the correct value
     *   automatically, so it is extremely rare that a module developer will ever
     *   need to specify this value. Setting it incorrectly will likely lead to
     *   unpredictable results or fatal errors. Legal values include:
     *   - Database::RETURN_STATEMENT: Return the prepared statement object for
     *     the query. This is usually only meaningful for SELECT queries, where
     *     the statement object is how one accesses the result set returned by the
     *     query.
     *   - Database::RETURN_AFFECTED: Return the number of rows affected by an
     *     UPDATE or DELETE query. Be aware that means the number of rows actually
     *     changed, not the number of rows matched by the WHERE clause.
     *   - Database::RETURN_INSERT_ID: Return the sequence ID (primary key)
     *     created by an INSERT statement on a table that contains a serial
     *     column.
     *   - Database::RETURN_NULL: Do not return anything, as there is no
     *     meaningful value to return. That is the case for INSERT queries on
     *     tables that do not contain a serial column.
     * - throw_exception: By default, the database system will catch any errors
     *   on a query as an Exception, log it, and then rethrow it so that code
     *   further up the call chain can take an appropriate action. To suppress
     *   that behavior and simply return NULL on failure, set this option to
     *   FALSE.
     *
     * @return
     *   An array of default query options.
     */
    protected function defaultOptions() {
        return array(
            'target' => 'default',
            'fetch' => PDO::FETCH_OBJ,
            'return' => Database::RETURN_STATEMENT,
            'throw_exception' => TRUE,
        );
    }

    /**
     * Returns the connection information for this connection object.
     *
     * Note that Database::getConnectionInfo() is for requesting information
     * about an arbitrary database connection that is defined. This method
     * is for requesting the connection information of this specific
     * open connection object.
     *
     * @return
     *   An array of the connection information. The exact list of
     *   properties is driver-dependent.
     */
    public function getConnectionOptions() {
        return $this->connectionOptions;
    }

    /**
     * Set the list of prefixes used by this database connection.
     *
     * @param $prefix
     *   The prefixes, in any of the multiple forms documented in
     *   default.settings.php.
     */
    protected function setPrefix($prefix) {
        if (is_array($prefix)) {
            $this->prefixes = $prefix + array('default' => '');
        }
        else {
            $this->prefixes = array('default' => $prefix);
        }

        // Set up variables for use in prefixTables(). Replace table-specific
        // prefixes first.
        $this->prefixSearch = array();
        $this->prefixReplace = array();
        foreach ($this->prefixes as $key => $val) {
            if ($key != 'default') {
                $this->prefixSearch[] = '{' . $key . '}';
                $this->prefixReplace[] = $val . $key;
            }
        }
        // Then replace remaining tables with the default prefix.
        $this->prefixSearch[] = '{';
        $this->prefixReplace[] = $this->prefixes['default'];
        $this->prefixSearch[] = '}';
        $this->prefixReplace[] = '';

        // Set up a map of prefixed => un-prefixed tables.
        foreach ($this->prefixes as $table_name => $prefix) {
            if ($table_name !== 'default') {
                $this->unprefixedTablesMap[$prefix . $table_name] = $table_name;
            }
        }
    }

    /**
     * Appends a database prefix to all tables in a query.
     *
     * Queries sent to Drupal should wrap all table names in curly brackets. This
     * function searches for this syntax and adds Drupal's table prefix to all
     * tables, allowing Drupal to coexist with other systems in the same database
     * and/or schema if necessary.
     *
     * @param $sql
     *   A string containing a partial or entire SQL query.
     *
     * @return
     *   The properly-prefixed string.
     */
    public function prefixTables($sql) {
        return str_replace($this->prefixSearch, $this->prefixReplace, $sql);
    }

    /**
     * Find the prefix for a table.
     *
     * This function is for when you want to know the prefix of a table. This
     * is not used in prefixTables due to performance reasons.
     */
    public function tablePrefix($table = 'default') {
        if (isset($this->prefixes[$table])) {
            return $this->prefixes[$table];
        }
        else {
            return $this->prefixes['default'];
        }
    }

    /**
     * Gets a list of individually prefixed table names.
     *
     * @return array
     *   An array of un-prefixed table names, keyed by their fully qualified table
     *   names (i.e. prefix + table_name).
     */
    public function getUnprefixedTablesMap() {
        return $this->unprefixedTablesMap;
    }

    /**
     * Prepares a query string and returns the prepared statement.
     *
     * This method caches prepared statements, reusing them when
     * possible. It also prefixes tables names enclosed in curly-braces.
     *
     * @param $query
     *   The query string as SQL, with curly-braces surrounding the
     *   table names.
     *
     * @return DatabaseStatementInterface
     *   A PDO prepared statement ready for its execute() method.
     */
    public function prepareQuery($query) {
        $query = $this->prefixTables($query);

        // Call PDO::prepare.
        return $this->connection->prepare($query);
    }

    /**
     * Tells this connection object what its target value is.
     *
     * This is needed for logging and auditing. It's sloppy to do in the
     * constructor because the constructor for child classes has a different
     * signature. We therefore also ensure that this function is only ever
     * called once.
     *
     * @param $target
     *   The target this connection is for. Set to NULL (default) to disable
     *   logging entirely.
     */
    public function setTarget($target = NULL) {
        if (!isset($this->target)) {
            $this->target = $target;
        }
    }

    /**
     * Returns the target this connection is associated with.
     *
     * @return
     *   The target string of this connection.
     */
    public function getTarget() {
        return $this->target;
    }

    /**
     * Tells this connection object what its key is.
     *
     * @param $target
     *   The key this connection is for.
     */
    public function setKey($key) {
        if (!isset($this->key)) {
            $this->key = $key;
        }
    }

    /**
     * Returns the key this connection is associated with.
     *
     * @return
     *   The key of this connection.
     */
    public function getKey() {
        return $this->key;
    }

    /**
     * Associates a logging object with this connection.
     *
     * @param $logger
     *   The logging object we want to use.
     */
    public function setLogger(DatabaseLog $logger) {
        $this->logger = $logger;
    }

    /**
     * Gets the current logging object for this connection.
     *
     * @return DatabaseLog
     *   The current logging object for this connection. If there isn't one,
     *   NULL is returned.
     */
    public function getLogger() {
        return $this->logger;
    }

    /**
     * Creates the appropriate sequence name for a given table and serial field.
     *
     * This information is exposed to all database drivers, although it is only
     * useful on some of them. This method is table prefix-aware.
     *
     * @param $table
     *   The table name to use for the sequence.
     * @param $field
     *   The field name to use for the sequence.
     *
     * @return
     *   A table prefix-parsed string for the sequence name.
     */
    public function makeSequenceName($table, $field) {
        return $this->prefixTables('{' . $table . '}_' . $field . '_seq');
    }

    /**
     * Flatten an array of query comments into a single comment string.
     *
     * The comment string will be sanitized to avoid SQL injection attacks.
     *
     * @param $comments
     *   An array of query comment strings.
     *
     * @return
     *   A sanitized comment string.
     */
    public function makeComment($comments) {
        if (empty($comments))
            return '';

        // Flatten the array of comments.
        $comment = implode('; ', $comments);

        // Sanitize the comment string so as to avoid SQL injection attacks.
        return '/* ' . $this->filterComment($comment) . ' */ ';
    }

    /**
     * Sanitize a query comment string.
     *
     * Ensure a query comment does not include strings such as "* /" that might
     * terminate the comment early. This avoids SQL injection attacks via the
     * query comment. The comment strings in this example are separated by a
     * space to avoid PHP parse errors.
     *
     * For example, the comment:
     * @code
     * db_update('example')
     *  ->condition('id', $id)
     *  ->fields(array('field2' => 10))
     *  ->comment('Exploit * / DROP TABLE node; --')
     *  ->execute()
     * @endcode
     *
     * Would result in the following SQL statement being generated:
     * @code
     * "/ * Exploit * / DROP TABLE node; -- * / UPDATE example SET field2=..."
     * @endcode
     *
     * Unless the comment is sanitised first, the SQL server would drop the
     * node table and ignore the rest of the SQL statement.
     *
     * @param $comment
     *   A query comment string.
     *
     * @return
     *   A sanitized version of the query comment string.
     */
    protected function filterComment($comment = '') {
        return strtr($comment, array('*' => ' * '));
    }

    /**
     * Executes a query string against the database.
     *
     * This method provides a central handler for the actual execution of every
     * query. All queries executed by Drupal are executed as PDO prepared
     * statements.
     *
     * @param $query
     *   The query to execute. In most cases this will be a string containing
     *   an SQL query with placeholders. An already-prepared instance of
     *   DatabaseStatementInterface may also be passed in order to allow calling
     *   code to manually bind variables to a query. If a
     *   DatabaseStatementInterface is passed, the $args array will be ignored.
     *   It is extremely rare that module code will need to pass a statement
     *   object to this method. It is used primarily for database drivers for
     *   databases that require special LOB field handling.
     * @param $args
     *   An array of arguments for the prepared statement. If the prepared
     *   statement uses ? placeholders, this array must be an indexed array.
     *   If it contains named placeholders, it must be an associative array.
     * @param $options
     *   An associative array of options to control how the query is run. See
     *   the documentation for DatabaseConnection::defaultOptions() for details.
     *
     * @return DatabaseStatementInterface
     *   This method will return one of: the executed statement, the number of
     *   rows affected by the query (not the number matched), or the generated
     *   insert ID of the last query, depending on the value of
     *   $options['return']. Typically that value will be set by default or a
     *   query builder and should not be set by a user. If there is an error,
     *   this method will return NULL and may throw an exception if
     *   $options['throw_exception'] is TRUE.
     *
     * @throws PDOException
     */
    public function query($query, array $args = array(), $options = array()) {

        // Use default values if not already set.
        $options += $this->defaultOptions();
        try {
            // We allow either a pre-bound statement object or a literal string.
            // In either case, we want to end up with an executed statement object,
            // which we pass to PDOStatement::execute.
            if ($query instanceof DatabaseStatementInterface) {
                $stmt = $query;
                $stmt->execute(NULL, $options);
            }
            else {
                $this->expandArguments($query, $args);
                $stmt = $this->prepareQuery($query);
                $stmt->execute($args, $options);
            }

            // Depending on the type of query we may need to return a different value.
            // See DatabaseConnection::defaultOptions() for a description of each
            // value.
            switch ($options['return']) {
                case Database::RETURN_STATEMENT:
                    return $stmt;
                case Database::RETURN_AFFECTED:
                    return $stmt->rowCount();
                case Database::RETURN_INSERT_ID:
                    return $this->connection->lastInsertId();
                case Database::RETURN_NULL:
                    return;
                default:
                    throw new PDOException('Invalid return directive: ' . $options['return']);
            }
        }
        catch (PDOException $e) {
            if ($options['throw_exception']) {
                // Add additional debug information.
                if ($query instanceof DatabaseStatementInterface) {
                    $e->query_string = $stmt->getQueryString();
                }
                else {
                    $e->query_string = $query;
                }
                $e->args = $args;
                throw $e;
            }
            return NULL;
        }
    }

    /**
     * Expands out shorthand placeholders.
     *
     * Drupal supports an alternate syntax for doing arrays of values. We
     * therefore need to expand them out into a full, executable query string.
     *
     * @param $query
     *   The query string to modify.
     * @param $args
     *   The arguments for the query.
     *
     * @return
     *   TRUE if the query was modified, FALSE otherwise.
     */
    protected function expandArguments(&$query, &$args) {
        $modified = FALSE;

        // If the placeholder value to insert is an array, assume that we need
        // to expand it out into a comma-delimited set of placeholders.
        foreach (array_filter($args, 'is_array') as $key => $data) {
            $new_keys = array();
            foreach (array_values($data) as $i => $value) {
                // This assumes that there are no other placeholders that use the same
                // name.  For example, if the array placeholder is defined as :example
                // and there is already an :example_2 placeholder, this will generate
                // a duplicate key.  We do not account for that as the calling code
                // is already broken if that happens.
                $new_keys[$key . '_' . $i] = $value;
            }

            // Update the query with the new placeholders.
            // preg_replace is necessary to ensure the replacement does not affect
            // placeholders that start with the same exact text. For example, if the
            // query contains the placeholders :foo and :foobar, and :foo has an
            // array of values, using str_replace would affect both placeholders,
            // but using the following preg_replace would only affect :foo because
            // it is followed by a non-word character.
            $query = preg_replace('#' . $key . '\b#', implode(', ', array_keys($new_keys)), $query);

            // Update the args array with the new placeholders.
            unset($args[$key]);
            $args += $new_keys;

            $modified = TRUE;
        }

        return $modified;
    }

    /**
     * Gets the driver-specific override class if any for the specified class.
     *
     * @param string $class
     *   The class for which we want the potentially driver-specific class.
     * @param array $files
     *   The name of the files in which the driver-specific class can be.
     * @param $use_autoload
     *   If TRUE, attempt to load classes using PHP's autoload capability
     *   as well as the manual approach here.
     * @return string
     *   The name of the class that should be used for this driver.
     */
    public function getDriverClass($class, array $files = array(), $use_autoload = FALSE) {
        if (empty($this->driverClasses[$class])) {
            $driver = $this->driver();
            $this->driverClasses[$class] = $class . '_' . $driver;
            Database::loadDriverFile($driver, $files);
            if (!class_exists($this->driverClasses[$class], $use_autoload)) {
                $this->driverClasses[$class] = $class;
            }
        }
        return $this->driverClasses[$class];
    }

    /**
     * Prepares and returns a SELECT query object.
     *
     * @param $table
     *   The base table for this query, that is, the first table in the FROM
     *   clause. This table will also be used as the "base" table for query_alter
     *   hook implementations.
     * @param $alias
     *   The alias of the base table of this query.
     * @param $options
     *   An array of options on the query.
     *
     * @return SelectQueryInterface
     *   An appropriate SelectQuery object for this database connection. Note that
     *   it may be a driver-specific subclass of SelectQuery, depending on the
     *   driver.
     *
     * @see SelectQuery
     */
    public function select($table, $alias = NULL, array $options = array()) {
        $class = $this->getDriverClass('SelectQuery', array('query.inc', 'select.inc'));
        return new $class($table, $alias, $this, $options);
    }

    /**
     * Prepares and returns an INSERT query object.
     *
     * @param $options
     *   An array of options on the query.
     *
     * @return InsertQuery
     *   A new InsertQuery object.
     *
     * @see InsertQuery
     */
    public function insert($table, array $options = array()) {
        $class = $this->getDriverClass('InsertQuery', array('query.inc'));
        return new $class($this, $table, $options);
    }

    /**
     * Prepares and returns a MERGE query object.
     *
     * @param $options
     *   An array of options on the query.
     *
     * @return MergeQuery
     *   A new MergeQuery object.
     *
     * @see MergeQuery
     */
    public function merge($table, array $options = array()) {
        $class = $this->getDriverClass('MergeQuery', array('query.inc'));
        // var_dump($class);die;
        return new $class($this, $table, $options);
    }


    /**
     * Prepares and returns an UPDATE query object.
     *
     * @param $options
     *   An array of options on the query.
     *
     * @return UpdateQuery
     *   A new UpdateQuery object.
     *
     * @see UpdateQuery
     */
    public function update($table, array $options = array()) {
        $class = $this->getDriverClass('UpdateQuery', array('query.inc'));
        return new $class($this, $table, $options);
    }

    /**
     * Prepares and returns a DELETE query object.
     *
     * @param $options
     *   An array of options on the query.
     *
     * @return DeleteQuery
     *   A new DeleteQuery object.
     *
     * @see DeleteQuery
     */
    public function delete($table, array $options = array()) {
        $class = $this->getDriverClass('DeleteQuery', array('query.inc'));
        return new $class($this, $table, $options);
    }

    /**
     * Prepares and returns a TRUNCATE query object.
     *
     * @param $options
     *   An array of options on the query.
     *
     * @return TruncateQuery
     *   A new TruncateQuery object.
     *
     * @see TruncateQuery
     */
    public function truncate($table, array $options = array()) {
        $class = $this->getDriverClass('TruncateQuery', array('query.inc'));
        return new $class($this, $table, $options);
    }

    /**
     * Returns a DatabaseSchema object for manipulating the schema.
     *
     * This method will lazy-load the appropriate schema library file.
     *
     * @return DatabaseSchema
     *   The DatabaseSchema object for this connection.
     */
    public function schema() {
        if (empty($this->schema)) {
            $class = $this->getDriverClass('DatabaseSchema', array('schema.inc'));
            if (class_exists($class)) {
                $this->schema = new $class($this);
            }
        }
        return $this->schema;
    }

    /**
     * Escapes a table name string.
     *
     * Force all table names to be strictly alphanumeric-plus-underscore.
     * For some database drivers, it may also wrap the table name in
     * database-specific escape characters.
     *
     * @return string
     *   The sanitized table name string.
     */
    public function escapeTable($table) {
        if (!isset($this->escapedNames[$table])) {
            $this->escapedNames[$table] = preg_replace('/[^A-Za-z0-9_.]+/', '', $table);
        }
        return $this->escapedNames[$table];
    }

    /**
     * Escapes a field name string.
     *
     * Force all field names to be strictly alphanumeric-plus-underscore.
     * For some database drivers, it may also wrap the field name in
     * database-specific escape characters.
     *
     * @return string
     *   The sanitized field name string.
     */
    public function escapeField($field) {
        if (!isset($this->escapedNames[$field])) {
            $this->escapedNames[$field] = preg_replace('/[^A-Za-z0-9_.]+/', '', $field);
        }
        return $this->escapedNames[$field];
    }

    /**
     * Escapes an alias name string.
     *
     * Force all alias names to be strictly alphanumeric-plus-underscore. In
     * contrast to DatabaseConnection::escapeField() /
     * DatabaseConnection::escapeTable(), this doesn't allow the period (".")
     * because that is not allowed in aliases.
     *
     * @return string
     *   The sanitized field name string.
     */
    public function escapeAlias($field) {
        if (!isset($this->escapedAliases[$field])) {
            $this->escapedAliases[$field] = preg_replace('/[^A-Za-z0-9_]+/', '', $field);
        }
        return $this->escapedAliases[$field];
    }

    /**
     * Escapes characters that work as wildcard characters in a LIKE pattern.
     *
     * The wildcard characters "%" and "_" as well as backslash are prefixed with
     * a backslash. Use this to do a search for a verbatim string without any
     * wildcard behavior.
     *
     * For example, the following does a case-insensitive query for all rows whose
     * name starts with $prefix:
     * @code
     * $result = db_query(
     *   'SELECT * FROM person WHERE name LIKE :pattern',
     *   array(':pattern' => db_like($prefix) . '%')
     * );
     * @endcode
     *
     * Backslash is defined as escape character for LIKE patterns in
     * DatabaseCondition::mapConditionOperator().
     *
     * @param $string
     *   The string to escape.
     *
     * @return
     *   The escaped string.
     */
    public function escapeLike($string) {
        return addcslashes($string, '\%_');
    }

    /**
     * Determines if there is an active transaction open.
     *
     * @return
     *   TRUE if we're currently in a transaction, FALSE otherwise.
     */
    public function inTransaction() {
        return ($this->transactionDepth() > 0);
    }

    /**
     * Determines current transaction depth.
     */
    public function transactionDepth() {
        return count($this->transactionLayers);
    }

    /**
     * Returns a new DatabaseTransaction object on this connection.
     *
     * @param $name
     *   Optional name of the savepoint.
     *
     * @return DatabaseTransaction
     *   A DatabaseTransaction object.
     *
     * @see DatabaseTransaction
     */
    public function startTransaction($name = '') {
        $class = $this->getDriverClass('DatabaseTransaction');
        return new $class($this, $name);
    }

    /**
     * Rolls back the transaction entirely or to a named savepoint.
     *
     * This method throws an exception if no transaction is active.
     *
     * @param $savepoint_name
     *   The name of the savepoint. The default, 'drupal_transaction', will roll
     *   the entire transaction back.
     *
     * @throws DatabaseTransactionNoActiveException
     *
     * @see DatabaseTransaction::rollback()
     */
    public function rollback($savepoint_name = 'drupal_transaction') {
        if (!$this->supportsTransactions()) {
            return;
        }
        if (!$this->inTransaction()) {
            throw new DatabaseTransactionNoActiveException();
        }
        // A previous rollback to an earlier savepoint may mean that the savepoint
        // in question has already been accidentally committed.
        if (!isset($this->transactionLayers[$savepoint_name])) {
            throw new DatabaseTransactionNoActiveException();
        }

        // We need to find the point we're rolling back to, all other savepoints
        // before are no longer needed. If we rolled back other active savepoints,
        // we need to throw an exception.
        $rolled_back_other_active_savepoints = FALSE;
        while ($savepoint = array_pop($this->transactionLayers)) {
            if ($savepoint == $savepoint_name) {
                // If it is the last the transaction in the stack, then it is not a
                // savepoint, it is the transaction itself so we will need to roll back
                // the transaction rather than a savepoint.
                if (empty($this->transactionLayers)) {
                    break;
                }
                $this->query('ROLLBACK TO SAVEPOINT ' . $savepoint);
                $this->popCommittableTransactions();
                if ($rolled_back_other_active_savepoints) {
                    throw new DatabaseTransactionOutOfOrderException();
                }
                return;
            }
            else {
                $rolled_back_other_active_savepoints = TRUE;
            }
        }
        $this->connection->rollBack();
        if ($rolled_back_other_active_savepoints) {
            throw new DatabaseTransactionOutOfOrderException();
        }
    }

    /**
     * Increases the depth of transaction nesting.
     *
     * If no transaction is already active, we begin a new transaction.
     *
     * @throws DatabaseTransactionNameNonUniqueException
     *
     * @see DatabaseTransaction
     */
    public function pushTransaction($name) {
        if (!$this->supportsTransactions()) {
            return;
        }
        if (isset($this->transactionLayers[$name])) {
            throw new DatabaseTransactionNameNonUniqueException($name . " is already in use.");
        }
        // If we're already in a transaction then we want to create a savepoint
        // rather than try to create another transaction.
        if ($this->inTransaction()) {
            $this->query('SAVEPOINT ' . $name);
        }
        else {
            $this->connection->beginTransaction();
        }
        $this->transactionLayers[$name] = $name;
    }

    /**
     * Decreases the depth of transaction nesting.
     *
     * If we pop off the last transaction layer, then we either commit or roll
     * back the transaction as necessary. If no transaction is active, we return
     * because the transaction may have manually been rolled back.
     *
     * @param $name
     *   The name of the savepoint
     *
     * @throws DatabaseTransactionNoActiveException
     * @throws DatabaseTransactionCommitFailedException
     *
     * @see DatabaseTransaction
     */
    public function popTransaction($name) {
        if (!$this->supportsTransactions()) {
            return;
        }
        // The transaction has already been committed earlier. There is nothing we
        // need to do. If this transaction was part of an earlier out-of-order
        // rollback, an exception would already have been thrown by
        // Database::rollback().
        if (!isset($this->transactionLayers[$name])) {
            return;
        }

        // Mark this layer as committable.
        $this->transactionLayers[$name] = FALSE;
        $this->popCommittableTransactions();
    }

    /**
     * Internal function: commit all the transaction layers that can commit.
     */
    protected function popCommittableTransactions() {
        // Commit all the committable layers.
        foreach (array_reverse($this->transactionLayers) as $name => $active) {
            // Stop once we found an active transaction.
            if ($active) {
                break;
            }

            // If there are no more layers left then we should commit.
            unset($this->transactionLayers[$name]);
            if (empty($this->transactionLayers)) {
                if (!$this->connection->commit()) {
                    throw new DatabaseTransactionCommitFailedException();
                }
            }
            else {
                $this->query('RELEASE SAVEPOINT ' . $name);
            }
        }
    }

    /**
     * Runs a limited-range query on this database object.
     *
     * Use this as a substitute for ->query() when a subset of the query is to be
     * returned. User-supplied arguments to the query should be passed in as
     * separate parameters so that they can be properly escaped to avoid SQL
     * injection attacks.
     *
     * @param $query
     *   A string containing an SQL query.
     * @param $args
     *   An array of values to substitute into the query at placeholder markers.
     * @param $from
     *   The first result row to return.
     * @param $count
     *   The maximum number of result rows to return.
     * @param $options
     *   An array of options on the query.
     *
     * @return DatabaseStatementInterface
     *   A database query result resource, or NULL if the query was not executed
     *   correctly.
     */
    abstract public function queryRange($query, $from, $count, array $args = array(), array $options = array());

    /**
     * Generates a temporary table name.
     *
     * @return
     *   A table name.
     */
    protected function generateTemporaryTableName() {
        return "db_temporary_" . $this->temporaryNameIndex++;
    }

    /**
     * Runs a SELECT query and stores its results in a temporary table.
     *
     * Use this as a substitute for ->query() when the results need to stored
     * in a temporary table. Temporary tables exist for the duration of the page
     * request. User-supplied arguments to the query should be passed in as
     * separate parameters so that they can be properly escaped to avoid SQL
     * injection attacks.
     *
     * Note that if you need to know how many results were returned, you should do
     * a SELECT COUNT(*) on the temporary table afterwards.
     *
     * @param $query
     *   A string containing a normal SELECT SQL query.
     * @param $args
     *   An array of values to substitute into the query at placeholder markers.
     * @param $options
     *   An associative array of options to control how the query is run. See
     *   the documentation for DatabaseConnection::defaultOptions() for details.
     *
     * @return
     *   The name of the temporary table.
     */
    abstract function queryTemporary($query, array $args = array(), array $options = array());

    /**
     * Returns the type of database driver.
     *
     * This is not necessarily the same as the type of the database itself. For
     * instance, there could be two MySQL drivers, mysql and mysql_mock. This
     * function would return different values for each, but both would return
     * "mysql" for databaseType().
     */
    abstract public function driver();

    /**
     * Returns the version of the database server.
     */
    public function version() {
        return $this->connection->getAttribute(PDO::ATTR_SERVER_VERSION);
    }

    /**
     * Determines if this driver supports transactions.
     *
     * @return
     *   TRUE if this connection supports transactions, FALSE otherwise.
     */
    public function supportsTransactions() {
        return $this->transactionSupport;
    }

    /**
     * Determines if this driver supports transactional DDL.
     *
     * DDL queries are those that change the schema, such as ALTER queries.
     *
     * @return
     *   TRUE if this connection supports transactions for DDL queries, FALSE
     *   otherwise.
     */
    public function supportsTransactionalDDL() {
        return $this->transactionalDDLSupport;
    }

    /**
     * Returns the name of the PDO driver for this connection.
     */
    abstract public function databaseType();


    /**
     * Gets any special processing requirements for the condition operator.
     *
     * Some condition types require special processing, such as IN, because
     * the value data they pass in is not a simple value. This is a simple
     * overridable lookup function. Database connections should define only
     * those operators they wish to be handled differently than the default.
     *
     * @param $operator
     *   The condition operator, such as "IN", "BETWEEN", etc. Case-sensitive.
     *
     * @return
     *   The extra handling directives for the specified operator, or NULL.
     *
     * @see DatabaseCondition::compile()
     */
    abstract public function mapConditionOperator($operator);

    /**
     * Throws an exception to deny direct access to transaction commits.
     *
     * We do not want to allow users to commit transactions at any time, only
     * by destroying the transaction object or allowing it to go out of scope.
     * A direct commit bypasses all of the safety checks we've built on top of
     * PDO's transaction routines.
     *
     * @throws DatabaseTransactionExplicitCommitNotAllowedException
     *
     * @see DatabaseTransaction
     */
    public function commit() {
        throw new DatabaseTransactionExplicitCommitNotAllowedException();
    }

    /**
     * Retrieves an unique id from a given sequence.
     *
     * Use this function if for some reason you can't use a serial field. For
     * example, MySQL has no ways of reading of the current value of a sequence
     * and PostgreSQL can not advance the sequence to be larger than a given
     * value. Or sometimes you just need a unique integer.
     *
     * @param $existing_id
     *   After a database import, it might be that the sequences table is behind,
     *   so by passing in the maximum existing id, it can be assured that we
     *   never issue the same id.
     *
     * @return
     *   An integer number larger than any number returned by earlier calls and
     *   also larger than the $existing_id if one was passed in.
     */
    abstract public function nextId($existing_id = 0);

    /**
     * Checks whether utf8mb4 support is configurable in settings.php.
     *
     * @return bool
     */
    public function utf8mb4IsConfigurable() {
        // Since 4 byte UTF-8 is not supported by default, there is nothing to
        // configure.
        return FALSE;
    }

    /**
     * Checks whether utf8mb4 support is currently active.
     *
     * @return bool
     */
    public function utf8mb4IsActive() {
        // Since 4 byte UTF-8 is not supported by default, there is nothing to
        // activate.
        return FALSE;
    }

    /**
     * Checks whether utf8mb4 support is available on the current database system.
     *
     * @return bool
     */
    public function utf8mb4IsSupported() {
        // By default we assume that the database backend may not support 4 byte
        // UTF-8.
        return FALSE;
    }
}
```
