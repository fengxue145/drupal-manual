## db_table_exists($table)

检查表是否存在。

- 参数:
  - `$table`: `array`

    表的名称。

- 返回值: `boolean`

    如果给定表存在，则为TRUE，否则为FALSE。

```php
db_table_exists('file');
// SQL: SELECT 1 FROM {file} LIMIT 0, 1
```
