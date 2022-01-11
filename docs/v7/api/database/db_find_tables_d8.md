## db_find_tables_d8($table_expression)

查找与指定基表名类似的所有表。这与 [db_find_tables()](./db_find_tables) 的区别是：没有表前缀。

- 参数:
  - `$table_expression`: `string`

    SQL表达式，例如 `simpletest%`（无需表前缀）。

- 返回值: `array`

    返回所有匹配的表名称数组（没有表前缀），`key` 和 `value` 都是匹配的表名。

```php
db_find_tables_d8('field_%');
// array(
//     'field_config'          => 'field_config',
//     'field_config_instance' => 'field_config_instance',
//     ...
// )
```

内部使用的 `SQL` 语句如下:
```sql
SELECT table_name AS table_name FROM information_schema.tables WHERE  (table_schema = 'database_name') AND (table_name LIKE '%' ESCAPE '\\')
```
