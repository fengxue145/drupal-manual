## db_query($query, array $args = array(), array $options = array())

对活动数据库执行任意查询字符串。

如果SELECT查询只是一个简单的查询字符串，请使用此函数。如果调用者或其他模块需要更改查询，则使用 [db_select()](./db_select) 代替。

不要将此函数用于 `INSERT` `UPDATE` 或 `DELETE` 查询。它们应该分别通过[db_insert()](./db_insert)、[db_update()](./db_update) 和 [db_delete()](./db_delete)处理。

- 参数:
  - `$query`: `string`

    要运行的预处理语句查询。数据库表名需要使用花括号进行封装，此外在合适的地方可以使用占位符。

  - `$args`: `array`

    包含占位符值的数组。如果使用的是 "命名占位符"，则为关联数组。如果使用的是 "未命名占位符"，则为索引数组。

  - `$options`: `options`

    用于控制查询操作方式的选项数组。参见 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

- 返回值: [DatabaseStatementInterface](./DatabaseStatementInterface)

    已执行的预处理语句对象。


#### 案例
- 普通查询
```php
$result = db_query('SELECT nid, title FROM {node}')->execute()->fetchAll();
// array(
//     0 => array('nid' => 1, 'title' => 'Exmaple 1'),
//     1 => array('nid' => 2, 'title' => 'Exmaple 2')
// )
```

- 未命名占位符
```php
$result = db_query(
    'SELECT title FROM {node} WHERE nid = ?',
    array(1)
)->execute()->fetchAssoc();
// array('nid' => 1, 'title' => 'Exmaple 1')
```

- 命名占位符
```php
$result = db_query(
    'SELECT title FROM {node} WHERE nid = :nid',
    array(':nid' => 1)
)->execute()->fetchAssoc();
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

// 切换数据库查询（default.slave）
$result = db_query(
    'SELECT title FROM {node} WHERE nid = :nid',
    array('nid' => 1),
    array('target' => 'slave')
)->execute()->fetchAssoc();
// array('nid' => 1, 'title' => 'Exmaple 1')
```
