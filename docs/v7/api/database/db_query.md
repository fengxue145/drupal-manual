---
sidebarDepth: 0
---

## db_query($query, $args, $options)

对数据库执行查询字符串。

如果SELECT查询只是一个简单的查询字符串，请使用此函数。如果调用者或其他模块需要更改查询，则使用 [db_select()](./db_select) 代替。

不要将此函数用于 `INSERT` `UPDATE` 或 `DELETE` 查询。它们应该分别通过[db_insert()](./db_insert)、[db_update()](./db_update) 和 [db_delete()](./db_delete) 处理。

参数:
- <span class="required">*</span>`$query`: `string`

  要运行的预处理语句查询字符串。

  在大多数情况下，这将是一个包含有占位符的 `SQL` 查询的字符串。也可以传递一个已经准备好的 [DatabaseStatementInterface](./DatabaseStatementInterface) 实例，以便允许调用代码手动将变量绑定到查询。如果传递了 [DatabaseStatementInterface](./DatabaseStatementInterface)，则 `$args` 数组将被忽略。

- `$args`: `array`

  预处理语句的参数数组。默认 `[]`

  - 如果使用(?)占位符，该参数必须是一个索引数组。
  - 如果使用命名占位符，该参数必须是一个关联数组。

- `$options`: `options`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [DatabaseStatementInterface](./DatabaseStatementInterface)


```php
// 普通查询
$result = db_query('SELECT nid, title FROM {node}')->execute()->fetchAll();

// 未命名占位符查询
$result = db_query('SELECT title FROM {node} WHERE nid = ?', array(1))->execute()->fetchAssoc();

// 命名占位符查询
$result = db_query('SELECT title FROM {node} WHERE nid = :nid', array(':nid' => 1))->execute()->fetchAssoc();

// 切换数据库查询（default.slave）
$result = db_query(
    'SELECT title FROM {node} WHERE nid = :nid',
    array('nid' => 1),
    array('target' => 'slave')
)->execute()->fetchAssoc();
```
