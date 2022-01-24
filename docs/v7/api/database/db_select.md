---
sidebarDepth: 0
---

## db_select($table, $alias, $options)

获取一个 [SelectQuery](./SelectQuery) 对象，用于处理数据库的 `SELECT` 操作。

参数:
- <span class="required">*</span>`$table`: `string`

  查询的基表名称，可以是字符串或另一个 `SelectQuery` 对象。如果传递了 `SelectQuery`，它将被用作子查询。

- `$alias`: `string`

  数据表的别名。默认 `NULL` 相同表名

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [SelectQuery](./SelectQuery)


```php
db_select('node', 't')
  ->fields('t', array('title', status))
  ->condition('status', 1)
  ->execute()
  ->fetchAll();
```
