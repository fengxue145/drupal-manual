# Database
<Badge>abstract</Badge>

数据库系统的主要控制器。

这个类是不可实例化和不可扩展的。 它的作用是将所有数据库连接的控制和引导封装到单个位置，而不使用全局变量。


## CONST
- `RETURN_NULL`: `0`

指示一个没有合理返回值的查询返回 `NULL`。

- `RETURN_STATEMENT`: `1`

指示查询返回结果集对象。

- `RETURN_AFFECTED`: `2`

指示查询返回受影响的行数。

- `RETURN_INSERT_ID`: `3`

指示查询返回最后插入的ID。


## $connections
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

所有活动数据库连接的数组。它的键名是数据库名称和目标。

```php
array(
    $db_key => array(
        $db_target => DatabaseConnection object.
    )
)
```


## $databaseInfo
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `NULL`

数据库连接信息。来自 `settings.php` 的数据库连接信息的已处理副本。


## $ignoreTargets
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

可以忽略的数据库目标列表。


## $activeKey
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `string`
- 默认值: `default`

当前活动的数据库连接的键。


## $logs
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

活动的查询日志对象数组。

```php
array(
    $db_key => DatabaseLog object.
);
```


## startLog($logging_key, $key)
<Badge>final</Badge>
<Badge>static</Badge>

在指定的连接上开始日志记录。

参数:
- `$logging_key`: `string`

    日志请求的标识键。

- `$key`: `string`

    要启用日志记录的数据库连接键。默认 `default`

返回值: [DatabaseLog](./databaselog)


## getLog($logging_key, $key)
<Badge>final</Badge>
<Badge>static</Badge>

获取指定连接已记录的查询日志。

参数:
- `$logging_key`: `string`

    日志请求的标识键。

- `$key`: `string`

    要启用日志记录的数据库连键。默认 `default`

返回值: `array`

更多详细参见 [DatabaseLog::$queryLog](./databaselog.html#querylog)


## getConnection($target, $key)
<Badge>final</Badge>
<Badge>static</Badge>

获取一个数据库连接对象。

参数:
- `$target`: `string`

    数据库目标。默认 `default`

- `$key`: `string`

    数据库连接键。默认 `NULL`，表示活动键。

返回值: [DatabaseConnection](./databaseconnection)


## isActiveConnection()
<Badge>final</Badge>
<Badge>static</Badge>

判断是否有活动连接。

返回值: `boolean`


## setActiveConnection($key)
<Badge>final</Badge>
<Badge>static</Badge>

设置默认数据库连接。如果成功，则返回旧的数据库连接键。

参数:
- `$key`: `string`

    数据库连接键。默认 `default`

返回值: `string` | `null`

```php
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('extra', 'default', $connection_info['default']);

echo Database::setActiveConnection('extra'); // default
```


## parseConnectionInfo()
<Badge>final</Badge>
<Badge>static</Badge>

处理数据库信息的配置文件 `settings.php`。


## addConnectionInfo($key, $target, $info)
<Badge>static</Badge>

添加一个数据库连接信息。

参数:
- `$key`: `string`

    数据库连接键。

- `$target`: `string`

    数据库目标。

- `$info`: `array`

    数据库连接信息。

```php
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('default', 'slave', $connection_info['default']);
```


## getConnectionInfo($key)
<Badge>final</Badge>
<Badge>static</Badge>

获取指定数据库的连接信息。

参数:
- `$key`: `string`

    数据库连接键。默认 `default`

返回值: `string`

```php
$connectionInfo = Database::getConnectionInfo('default');
```


## renameConnection($old_key, $new_key)
<Badge>final</Badge>
<Badge>static</Badge>

重命名数据库连接，并更新其连接信息。

参数:
- `$old_key`: `string`

    旧的数据库连接键。

- `$new_key`: `string`

    新的数据库连接键。

返回值: `boolean`

```php
Database::renameConnection('default', 'slave');
```


## removeConnection($key, $close)
<Badge>final</Badge>
<Badge>static</Badge>

关闭数据库连接，并删除其连接信息。

参数:
- `$key`: `string`

    数据库连接键。

- `$close`: `boolean`

    是否关闭连接。默认 `TRUE`

返回值: `boolean`

```php
Database::removeConnection('default');
```


## openConnection($key, $target)
<Badge>final</Badge>
<Badge>static</Badge>
<Badge>protected</Badge>

打开一个指定数据库连接。

参数:
- `$key`: `string`

    数据库连接键，在 `settings.php` 中指定。默认 `default`

- `$target`: `string`

    要打开的数据库目标。


## closeConnection($target = NULL, $key = NULL)
<Badge>final</Badge>
<Badge>static</Badge>

关闭指定的数据库连接。

参数:
- `$target`: `string`

    数据库目标名称。默认 `NULL`，表示关闭所有目标连接。

- `$key`: `string`

    数据库连接键。默认 `NULL`，表示活动键。

```php
$db1 = Database::getConnection('default', 'default');

// 尝试关闭默认连接，然后打开一个新的连接。
Database::closeConnection('default', 'default');
$db2 = Database::getConnection('default', 'default');

if ($db1 !== $db2) {
    echo "Opening the default connection after it is closed returns a new object.";
}
```


## ignoreTarget($key, $target)修改文案：

<Badge>final</Badge>
<Badge>static</Badge>

指定需要忽略的数据库目标。被忽略的目标始终会返回 `default`。

参数:
- `$key`: `string`

    数据库连接键。

- `$target`: `string`

    需要忽略的数据库目标名称。

```php {5}
// 获取默认连接信息，并添加一个新连接
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('default', 'slave', $connection_info['default']);

Database::ignoreTarget('default', 'slave');

$db1 = Database::getConnection('default', 'default');
$db2 = Database::getConnection('slave', 'default');

if ($db1 === $db2) {
    echo "Both targets refer to the same connection.";
}
```


## loadDriverFile($driver, array $files = array())
<Badge>final</Badge>
<Badge>static</Badge>

加载数据库驱动文件。

参数:
- `$driver`: `string`

    数据库驱动名称。

- `$files`: `array`

    驱动文件列表。相对于 `includes/database` 或 `includes/database/{$driver}`目录。

```php
// 目录结构
├── includes
│   ├── database
│   │   ├── query.inc
│   │   ├── select.inc
│   │   ├── mysql
│   │   │   └── query.inc

Database::loadDriverFile('mysql', array('query.inc', 'select.inc'))
// 加载顺序如下：
// includes/database/query.inc
// includes/database/mysql/query.inc
// includes/database/select.inc
```



























