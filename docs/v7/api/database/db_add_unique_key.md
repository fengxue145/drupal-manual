## db_add_unique_key($table, $name, $fields)

向表中添加唯一索引。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$name`: `string`

    唯一索引的名称。

  - `$fields`: `array`

    唯一索引的字段数组。

```php
db_add_unique_key('file', 'file_hash', array('hash'));
// SQL: ALTER TABLE {file} ADD UNIQUE KEY `file_hash` (`hash`)
```
