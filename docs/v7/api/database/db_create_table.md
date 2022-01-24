---
sidebarDepth: 0
---

## db_create_table($name, $table)

根据 [Schema API]() 的表定义数组，创建一个新表。

参数:
- <span class="required">*</span>`$name`: `string`

  要创建的表的名称。

- <span class="required">*</span>`$table`: `struct`

  [Schema API]() 的表定义数组。


```php
$schema = array(
    'description' => 'The base table for file.',
    'fields' => array(
        'fid' => array(
            'description' => 'The primary identifier for a file.',
            'type'        => 'serial',
            'unsigned'    => TRUE,
            'not null'    => TRUE,
        ),
        'hash' => array(
            'description' => 'file hash',
            'type'        => 'char',
            'length'      => 40,
            'not null'    => TRUE
        ),
        'path' => array(
            'description' => 'file path',
            'type'        => 'varchar',
            'length'      => 256,
            'not null'    => TRUE
        ),
        'name' => array(
            'description' => 'file basename',
            'type'        => 'varchar',
            'length'      => 32,
            'not null'    => TRUE,
            'default'     => '',
        ),
        'ext' => array(
            'description' => 'file ext',
            'type'        => 'varchar',
            'length'      => 32,
            'not null'    => TRUE,
            'default'     => '',
        ),
        'mime' => array(
            'description' => 'file MIME',
            'type'        => 'varchar',
            'length'      => 64,
            'not null'    => TRUE
        ),
        'size' => array(
            'description' => 'file size(byte)',
            'type'        => 'int',
            'size'        => 'big',
            'not null'    => TRUE,
            'default'     => 0,
        ),
        'status' => array(
            'description' => 'file status. 0 = delete, 1 = normal',
            'type'        => 'int',
            'size'        => 'tiny',
            'not null'    => TRUE,
            'default'     => 1,
        ),
        'created' => array(
            'description' => 'file create time.',
            'mysql_type'  => 'datetime',
            'not null'    => TRUE
        )
    ),
    'indexes' => array(
        'ik_name'     => array('name'),
        'ik_ext'      => array('ext'),
        'ik_name_ext' => array('name', 'ext')
    ),
    'unique keys' => array(
        'uk_hash' => array('hash'),
    ),
    'primary key' => array('fid'),
);

db_create_table('file', $schema);
/*
SQL:
CREATE TABLE {file2} (
    `fid` INT unsigned NOT NULL auto_increment COMMENT 'The primary identifier for a file.',
    `hash` CHAR(40) NOT NULL COMMENT 'file hash',
    `path` VARCHAR(256) NOT NULL COMMENT 'file path',
    `name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT 'file basename',
    `ext` VARCHAR(32) NOT NULL DEFAULT '' COMMENT 'file ext',
    `mime` VARCHAR(64) NOT NULL COMMENT 'file MIME',
    `size` BIGINT NOT NULL DEFAULT 0 COMMENT 'file size(byte)',
    `status` TINYINT NOT NULL DEFAULT 1 COMMENT 'file status. 0 = delete, 1 = normal',
    `created` DATETIME  NOT NULL COMMENT 'file create time.',
    PRIMARY KEY (`fid`),
    UNIQUE KEY `uk_hash` (`hash`),
    INDEX `ik_name` (`name`),
    INDEX `ik_ext` (`ext`),
    INDEX `ik_name_ext` (`name`, `ext`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8 COMMENT 'The base table for file.'
*/
```
