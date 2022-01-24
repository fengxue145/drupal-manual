---
sidebarDepth: 0
---

## db_add_field($table, $field, $spec, $keys_new)

向数据表中添加一个新字段。

参数:
- <span class="required">*</span>`$table`: `string`

  要操作的数据表名称。

- <span class="required">*</span>`$field`: `string`

  要添加的字段名。

- <span class="required">*</span>`$spec`: `struct`

  [Schema API]() 的字段定义数组。

- `$keys_new`: `array`

  向数据表中追加索引。[Schema API]() 的索引定义数组，默认 `[]`

返回值: `boolean`


```php
db_add_field('file', 'name', array(
  'type'        => 'varchar',
  'length'      => 256,
  'not null'    => TRUE,
  'default'     => '',
  'description' => 'File basename.',
));

db_add_field('file', 'mime', array(
  'type'        => 'varchar',
  'length'      => 64,
  'not null'    => TRUE,
  'default'     => '',
  'description' => 'File mime.',
), array(
  'indexes'     => array('ik_name' => array('name'))
));
```
