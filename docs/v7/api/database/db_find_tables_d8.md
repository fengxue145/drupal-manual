---
sidebarDepth: 0
---

## db_find_tables_d8($table_expression)

返回所有与基表类似的表名称数组，`key` 和 `value` 都是匹配的表名。

这与 [db_find_tables()](./db_find_tables) 的区别是没有表前缀。

参数:
- <span class="required">*</span>`$table_expression`: `string`

  SQL表达式，例如 `simpletest%`（无需表前缀）。

返回值: `array`


```php
db_find_tables_d8('field_%');
// array(
//     'field_config'          => 'field_config',
//     'field_config_instance' => 'field_config_instance',
//     ...
// )
```
