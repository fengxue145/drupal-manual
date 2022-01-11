## db_drop_field($table, $field)

删除表中的某个字段。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$field`: `string`

    要删除的字段名。

```php
db_drop_field('file', 'fullpath');
// SQL: ALTER TABLE {file} DROP `fullpath`
```
