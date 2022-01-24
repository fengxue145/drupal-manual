---
sidebarDepth: 0
---

## db_find_tables($table_expression)

返回所有与基表类似的表名称数组，`key` 和 `value` 都是匹配的表名。

参数:
- <span class="required">*</span>`$table_expression`: `string`

  SQL表达式，例如 `simpletest%`（需要表前缀）。

返回值: `array`


```php
db_find_tables('drupal_field_%');
// array(
//     'drupal_field_config'          => 'field_config',
//     'drupal_field_config_instance' => 'field_config_instance',
//     ...
// )
```
