## db_query_temporary($query, array $args = array(), array $options = array())

执行一个 `SELECT` 查询字符串，并将结果集保存到一个临时表中。

- 参数:
  - `$query`: `string`

    要运行的预处理语句查询。数据库表名需要使用花括号进行封装，此外在合适的地方可以使用占位符。

  - `$args`: `array`

    包含占位符值的数组。如果使用的是 "命名占位符"，则为关联数组。如果使用的是 "未命名占位符"，则为索引数组。

  - `$options`: `options`

    用于控制查询操作方式的选项数组。参见 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

- 返回值: `string`

    返回临时表的名称。


#### 案例
- 普通查询
```php
$temporary = db_query_temporary('SELECT nid, title FROM {node}');
$result = db_select($temporary, 't')->fields('t')->execute()->fetchAllAssoc('nid');
// array(
//     1 => array('nid' => 1, 'title' => 'Exmaple 1'),
//     2 => array('nid' => 2, 'title' => 'Exmaple 2')
// )
```

- 未命名占位符
```php
$temporary = db_query_temporary(
    'SELECT nid, title FROM {node} WHERE nid = ?',
    array(1)
);
$result = db_select($temporary, 't')->fields('t')->execute()->fetchAssoc();
// array('nid' => 1, 'title' => 'Exmaple 1')
```

- 命名占位符
```php
$temporary = db_query_temporary(
    'SELECT nid, title FROM {node} WHERE nid = :nid',
    array(':nid' => 1)
);
$result = db_select($temporary, 't')->fields('t')->execute()->fetchAssoc();
// array('nid' => 1, 'title' => 'Exmaple 1')
```

- 切换数据库查询
```php
$databases = array(
    'default' => array (
        'default' => array (
            'database' => 'drupal_local',
            'username' => 'root',
            'password' => 'root',
            'host' => '127.0.0.1',
            'port' => '3306',
            'driver' => 'mysql',
            'prefix' => '',
        ),
        'slave' => array(
            'database' => 'drupal_local',
            'username' => 'root',
            'password' => 'root',
            'host' => '127.0.0.1',
            'port' => '3307',
            'driver' => 'mysql',
            'prefix' => '',
        )
    )
);

$temporary = db_query_temporary(
    'SELECT nid, title FROM {node} WHERE nid = :nid',
    array('nid' => 1),
    array('target' => 'slave')
);
$result = db_select($temporary, 't', array('target' => 'slave'))->fields('t')->execute()->fetchAssoc();
// array('nid' => 1, 'title' => 'Exmaple 1')
```
