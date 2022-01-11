## db_add_primary_key($table, $fields)

向数据库表添加主键。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$fields`: `array`

    主键的字段数组。

```php
db_add_primary_key('file', array('fid'));
// SQL: ALTER TABLE {file} ADD PRIMARY KEY (`fid`)
```
