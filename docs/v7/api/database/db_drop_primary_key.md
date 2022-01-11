## db_drop_primary_key($table)

删除数据库表的主键。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

```php
db_drop_primary_key('file');
// SQL: ALTER TABLE {file} DROP PRIMARY KEY
```
