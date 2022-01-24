---
sidebarDepth: 0
---

## db_drop_field($table, $field)

删除数据表中的某个字段。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$field`: `string`

  要删除的字段名称。

返回值: `boolean`


```php
db_drop_field('file', 'fullpath');
```
