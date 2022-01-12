## db_insert($table, array $options = array())

创建一个 `InsertQuery` 对象，用于处理数据库的 `INSERT` 操作。

- 参数:
  - `$table`: `string`

    数据表名称。

  - `$options`: `array`

    用于控制查询操作方式的选项数组。

- 返回值: `InsertQuery`

    返回一个 [InsertQuery](./InsertQuery) 对象。


#### 案例
- 单条数据插入
```php
// 方式一:
$nid = db_insert('node')->fields(array(
   'title'   => 'Example',
   'uid'     => 1,
   'created' => REQUEST_TIME
))->execute();
// SQL: INSERT INTO {node} (title, uid, created) VALUES ('Example', 1, 1641966593);


// 方式二:
$nid = db_insert('node')->fields(array('title', 'uid', 'created'))->values(array(
   'title'   => 'Example',
   'uid'     => 1,
   'created' => REQUEST_TIME
))->execute();
// SQL: INSERT INTO {node} (title, uid, created) VALUES ('Example', 1, 1641966593);
```

- 多条数据插入
```php
$values = array(
    array(
        'title' => 'Example 1',
        'uid' => 1,
        'created' => REQUEST_TIME,
    ),
    array(
        'title' => 'Example 2',
        'uid' => 1,
        'created' => REQUEST_TIME,
    ),
    array(
        'title' => 'Example 3',
        'uid' => 1,
        'created' => REQUEST_TIME,
    ),
);
$query = db_insert('node')->fields(array('title', 'uid', 'created'));
foreach ($values as $record) {
  $query->values($record);
}
$query->execute();
// SQL:
// INSERT INTO {node} (title, uid, created) VALUES ('Example 1', 1, 1641966593);
// INSERT INTO {node} (title, uid, created) VALUES ('Example 2', 1, 1641966593);
// INSERT INTO {node} (title, uid, created) VALUES ('Example 3', 1, 1641966593);
```
