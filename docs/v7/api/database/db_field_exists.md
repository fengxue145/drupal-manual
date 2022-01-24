---
sidebarDepth: 0
---

## db_field_exists($table, $field)

判断数据表中是否存在指定字段。

参数:
- <span class="required">*</span>`$table`: `string`

  要检查的数据表名称。

- <span class="required">*</span>`$field`: `string`

  字段的名称。

返回值: `boolean`


```php
db_field_exists('file', 'hash');
```
