## db_change_field($table, $field, $field_new, $spec, $keys_new = array())

更改字段定义。

- 参数:
  - `$table`: `string`

    要修改的表的名称。

  - `$field`: `string`

    要更改的字段的名称。

  - `$field_new`: `string`

    字段的新名称(如果您不想更改名称，则设置为相同的 `$field`)。

  - `$spec`: `struct`

    字段规范数组，取自 [Schema API](../../core/database/schema_api)。

  - `$keys_new`: `array`

    索引规范数组，取自 [Schema API](../../core/database/schema_api)。

```php
$field_schema = array(
    'type'     => 'varchar',
    'length'   => 255,
    'not null' => TRUE,
    'default'  => ''
);

db_change_field('file', 'path', 'fullpath', $field_schema);
// SQL: ALTER TABLE {file} CHANGE `path` `fullpath` VARCHAR(255) NOT NULL DEFAULT ''

$primary_key = array('fullpath');
db_change_field('file', 'path', 'fullpath', $field_schema, array('primary key' => $primary_key));
// SQL: ALTER TABLE {file} CHANGE `path` `fullpath` VARCHAR(255) NOT NULL DEFAULT '', ADD PRIMARY KEY (`fullpath`)

$unique_keys = array('uk_fullpath' => array('fullpath'));
db_change_field('file', 'path', 'fullpath', $field_schema, array('unique keys' => $unique_keys);
// SQL: ALTER TABLE {file} CHANGE `path` `fullpath` VARCHAR(255) NOT NULL DEFAULT '', ADD UNIQUE KEY `uk_fullpath` (`fullpath`)

$indexes = array('ik_fullpath' => array('fullpath'));
db_change_field('file', 'path', 'fullpath', $field_schema, array('indexes' => $indexes);
// SQL: ALTER TABLE {file} CHANGE `path` `fullpath` VARCHAR(255) NOT NULL DEFAULT '', ADD INDEX `ik_fullpath` (`fullpath`)
```