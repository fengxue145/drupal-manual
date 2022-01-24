---
sidebarDepth: 0
---

## db_insert($table, $options)

获取一个 [InsertQuery](./InsertQuery) 对象，用于处理数据库的 `INSERT` 操作。

参数:
- <span class="required">*</span>`$table`: `string`

  数据表名称。

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [InsertQuery](./InsertQuery)


```php
// 单条数据插入
$nid = db_insert('node')->fields(array(
   'title'   => 'Example',
   'uid'     => 1,
   'created' => REQUEST_TIME
))->execute();

$nid = db_insert('node')->fields(array('title', 'uid', 'created'))->values(array(
   'title'   => 'Example',
   'uid'     => 1,
   'created' => REQUEST_TIME
))->execute();


// 多条数据插入
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
```
