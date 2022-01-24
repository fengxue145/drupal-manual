---
sidebarDepth: 0
---

## db_index_exists($table, $name)

判断数据表中是否存在指定的普通索引。

参数:
- <span class="required">*</span>`$table`: `string`

  要检查的数据表名称。

- <span class="required">*</span>`$name`: `string`

  普通索引的名称。

返回值: `boolean`


```php
db_index_exists('file', 'ik_name');
```
