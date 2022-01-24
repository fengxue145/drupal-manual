---
sidebarDepth: 0
---

## db_add_primary_key($table, $fields)

向数据表中添加一个主键索引。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$fields`: `array`

  主键索引的字段列表。


```php
db_add_primary_key('file', array('fid'));
```
