---
sidebarDepth: 0
---

## db_query_range($query, $from, $count, $args, $options)

对活动数据库执行一个有限范围的查询。

参数:
- <span class="required">*</span>`$query`: `string`

  查询字符串。

- <span class="required">*</span>`$from`: `number`

  指定要返回的第一行的偏移量。

- <span class="required">*</span>`$count`: `number`

  指定要返回的最大行数。

- `$args`: `array`

  预处理语句的参数数组。默认 `[]`

  - 如果使用(?)占位符，该参数必须是一个索引数组。
  - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [DatabaseStatementInterface](./DatabaseStatementInterface)

```php
db_query_range('SELECT * FROM {node}', 1, 10)->fetchAll();
```
