## db_find_tables($table_expression)

查找与指定基表名类似的所有表。

- 参数:
  - `$table_expression`: `string`

    SQL表达式，例如 `simpletest%`（需要表前缀）。

- 返回值: `array`

    返回所有匹配的表名称数组（有表前缀），`key` 和 `value` 都是匹配的表名。

```php
db_find_tables('drupal_field_%');
// array(
//     'drupal_field_config'          => 'field_config',
//     'drupal_field_config_instance' => 'field_config_instance',
//     ...
// )
```

内部使用的 `SQL` 语句如下:
```sql
SELECT table_name AS table_name FROM information_schema.tables WHERE  (table_schema = 'database_name') AND (table_name LIKE 'drupal_field_%' ESCAPE '\\')
```
