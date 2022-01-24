---
sidebarDepth: 0
---

## db_change_field($table, $field, $field_new, $spec, $keys_new)

修改数据表中某个字段的定义。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$field`: `string`

  要修改的字段名称。

- <span class="required">*</span>`$field_new`: `string`

  字段的新名称。(如果不想更改名称，则设置为相同的 `$field`)

- <span class="required">*</span>`$spec`: `struct`

  [Schema API]() 的字段定义数组。

- `$keys_new`: `array`

  向数据表中追加索引。[Schema API]() 的索引定义数组，默认 `[]`


```php
db_change_field('file', 'name', 'filename', array(
    'type'        => 'varchar',
    'length'      => 128,
    'not null'    => FALSE,
    'description' => 'File basename.',
));

db_change_field('file', 'mime', 'filemime', array(
    'type'        => 'int',
    'size'        => 'tiny',
    'unsigned'    => TRUE,
    'not null'    => FALSE,
    'description' => 'File mime.',
), array(
    'indexes'     => array('ik_mime' => array('filemime'))
));
```
