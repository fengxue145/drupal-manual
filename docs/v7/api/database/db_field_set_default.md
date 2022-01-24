---
sidebarDepth: 0
---

## db_field_set_default($table, $field, $default)

设置字段的默认值。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$field`: `string`

  要设置默认值的字段名称。

- <span class="required">*</span>`$default`: `string`

  字段的默认值。`NULL` 表示 `default NULL`。


```php
db_field_set_default('file', 'created', '1970-01-01 00:00:00');
```
