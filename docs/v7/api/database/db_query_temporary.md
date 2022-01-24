---
sidebarDepth: 0
---

## db_query_temporary($query, $args, $options)

运行 `SELECT` 查询并将其结果存储在临时表中，并返回临时表的名称。

参数:
- <span class="required">*</span>`$query`: `string`

  要执行的查询。在大多数情况下，这将是一个包含有占位符的 `SQL` 查询的字符串。

- <span class="required">*</span>`$args`: `array`

  预处理语句的参数数组。默认 `[]`

  - 如果使用(?)占位符，该参数必须是一个索引数组。
  - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `options`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: `string`


```php
$temporary = db_query_temporary('SELECT nid, title FROM {node}');
$result = db_select($temporary, 't')->fields('t')->execute()->fetchAllAssoc('nid');
// array(
//     1 => array('nid' => 1, 'title' => 'Exmaple 1'),
//     2 => array('nid' => 2, 'title' => 'Exmaple 2')
// )
```
