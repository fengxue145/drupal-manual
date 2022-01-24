---
sidebarDepth: 0
---

## db_add_index($table, $name, $fields)

向数据表中添加一个普通索引。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$name`: `string`

  普通索引的名称。

- <span class="required">*</span>`$fields`: `array`

  普通索引的字段列表。


```php
db_add_index('file', 'ik_name_ext', array('name', 'ext'));
```
