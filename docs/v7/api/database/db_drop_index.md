## db_drop_index($table, $name)

删除表中的某个 `INDEX` 索引。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$name`: `string`

    `INDEX` 索引的名称。


```php
db_drop_index('file', 'fullname');
// SQL: ALTER TABLE {file} DROP INDEX `fullname`
```
