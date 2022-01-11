## db_drop_unique_key($table, $name)

删除表中的某个唯一索引。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$name`: `string`

    唯一键的索引名称。

```php
db_drop_unique_key('file', 'file_hash');
// SQL: ALTER TABLE {file} DROP KEY `file_hash`
```