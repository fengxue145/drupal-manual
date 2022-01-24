---
sidebarDepth: 0
---

## db_add_unique_key($table, $name, $fields)

向数据表中添加一个唯一索引。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$name`: `string`

  唯一索引的名称。

- <span class="required">*</span>`$fields`: `array`

  唯一索引的字段列表。


```php
db_add_unique_key('file', 'uk_hash', array('hash'));
```
