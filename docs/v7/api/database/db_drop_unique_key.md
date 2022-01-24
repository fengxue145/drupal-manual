---
sidebarDepth: 0
---

## db_drop_unique_key($table, $name)

删除数据表中的某个唯一索引。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$name`: `string`

  要删除的唯一索引名称。

返回值: `boolean`


```php
db_drop_unique_key('file', 'uk_hash');
```