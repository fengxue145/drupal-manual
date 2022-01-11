## db_rename_table($table, $new_name)

重命名表。

- 参数:
  - `$table`: `string`

    要重命名的表的当前名称。

  - `$new_name`: `string`

    表的新名称。

```php
db_rename_table('file', 'file2');
```

生成的 `SQL` 语句如下:
```sql
ALTER TABLE {file} RENAME TO `{file2}`
```
