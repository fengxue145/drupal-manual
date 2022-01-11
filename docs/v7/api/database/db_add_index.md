## db_add_index($table, $name, $fields)

向表中添加 `INDEX` 索引。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$name`: `string`

    `INDEX` 索引的名称。

  - `$fields`: `array`

    `INDEX` 索引的字段数组。

```php
db_add_index('file', 'fullname', array('name', 'ext'));
// SQL: ALTER TABLE {file} ADD INDEX `fullname` (`name`, `ext`)
```
