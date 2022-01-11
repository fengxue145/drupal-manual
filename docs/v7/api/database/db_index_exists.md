## db_index_exists($table, $name)

检查给定表中是否存在索引。

- 参数:
  - `$table`: `string`

    表名称。

  - `$name`: `string`

    索引名称。

- 返回值: `boolean`

    如果给定索引存在，则为TRUE，否则为FALSE。

```php
db_index_exists('file', 'name');
// SQL: SHOW INDEX FROM {file} WHERE key_name = 'name'
```
