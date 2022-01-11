## db_drop_table($table)

删除表。

- 参数:
  - `$table`: `string`

    要删除的表的名称。

```php
db_drop_table('file');
```

生成的 `SQL` 语句如下:
```sql
DROP TABLE {file}
```
