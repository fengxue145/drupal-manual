## db_field_exists($table, $field)

检查给定表中是否存在给定的"列"。

- 参数:
  - `$table`: `string`

    表的名称。

  - `$field`: `string`

    字段的名称。

- 返回值: `boolean`

    如果给定的"列"存在，则为TRUE，否则为FALSE。

```php
db_field_exists('file', 'hash');
// SQL: SELECT hash FROM {file} LIMIT 0, 1
```
