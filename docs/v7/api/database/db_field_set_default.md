## db_field_set_default($table, $field, $default)

设置字段的默认值。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$field`: `string`

    要修改的字段名。

  - `$default`: `string`

    需要设置的默认值。`NULL` 表示默认 `NULL`。

```php
db_field_set_default('file', 'created', '1970-01-01 00:00:00');
// SQL: ALTER TABLE {file} ALTER COLUMN `created` SET DEFAULT '1970-01-01 00:00:00'
```
