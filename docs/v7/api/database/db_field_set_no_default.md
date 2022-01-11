## db_field_set_no_default($table, $field)

取消字段的默认值。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$field`: `string`

    要修改的字段名。

```php
db_field_set_default('file', 'created');
// SQL: ALTER TABLE {file} ALTER COLUMN `created` DROP DEFAULT
```