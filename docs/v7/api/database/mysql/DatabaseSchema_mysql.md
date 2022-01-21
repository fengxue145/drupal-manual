# DatabaseSchema_mysql

Mysql数据库模式的实现，继承 [DatabaseSchema](../DatabaseSchema)。


## const

- `COMMENT_MAX_TABLE`: `60`

    Mysql中表注释的最大长度。

- `COMMENT_MAX_COLUMN`: `255`

    Mysql中一个列注释的最大长度。


## getPrefixInfo($table, $add_prefix)
<Badge>protected</Badge>

获取数据库名、表名和前缀信息。

参数:
- `$table`: `string`

  数据表名称。默认 `default`

- `add_prefix`: `boolean`

  是否添加表前缀。默认 `true`

返回值: `array`

```php
array(
  'prefix'   => '', // 表前缀
  'database' => '', // 数据库名
  'table'    => '', // 数据表名
)
```


## buildTableNameCondition($table_name, $operator, $add_prefix)
<Badge>protected</Badge>

构建一个条件，根据标准的 `information_schema` 匹配表名。

参见 [getComment()](#getComment)

参数:
- `$table_name`: `string`

  数据表名称。

- `$operator`: `string`

  条件运算符。默认 `=`

- `$add_prefix`: `boolean`

  是否添加表前缀。默认 `true`

返回值: [DatabaseCondition](../DatabaseCondition)


## createTableSql($name, $table)
<Badge>protected</Badge>

根据 [Schema API]() 的表定义数组，生成一个创建新表的语句并返回。

参数:
- `$name`: `string`

    数据表名称。

- `$table`: `array`

    [Schema API]() 的表定义数组。

返回值: `string`


## createFieldSql($name, $spec)
<Badge>protected</Badge>

为表创建或修改时使用的字段创建SQL字符串。

::: tip
在将一个 [Schema API]() 的字段定义数组传递到这个函数之前，必须由 [processField()](#processField) 处理。
:::

参数:
- `$name`: `string`

    字段名称。

- `$spec`: `array`

    [Schema API]() 的字段定义数组。

返回值: `string`


## createKeysSql($spec)
<Badge>protected</Badge>

为表创建时使用的索引创建SQL字符串。

参数:
- `$spec`: `array`

    [Schema API]() 的表定义数组。

返回值: `string`


## createKeySql($fields)
<Badge>protected</Badge>

创建索引的帮助函数。

参数:
- `$fields`: `array`

    字段数组。

返回值: `string`


## createKeysSqlHelper($fields)
<Badge>protected</Badge>

[createKeySql()](#createKeySql) 的别名。


## processField($field)
<Badge>protected</Badge>

为一个字段设置数据库引擎特定的属性。

参数:
- `$field`: `array`

    [Schema API]() 的字段定义数组。

返回值: `array`


## getFieldTypeMap()

获取 [Schema API]() 的字段名到数据库本地字段类型的映射数组。

返回值: `array`


## renameTable($table, $new_name)

重命名数据表名称。

参数:
- `$table`: `string`

    原数据表名称。

- `$new_name`: `string`

    新数据表名称。

返回值: `boolean`

```sql
ALTER TABLE {$table} RENAME TO `$new_name`
```


## dropTable($table)

删除数据表。

参数:
- `$table`: `string`

    要删除的数据表名称。

返回值: `boolean`

生成的SQL语句如下：
```sql
DROP TABLE {$table}
```


## addField($table, $field, $spec, $keys_new)

向数据表中添加一个新字段。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$field`: `string`

    字段名称。

- `$spec`: `array`

    [Schema API]() 的字段定义数组。

- `keys_new`: `array`

    向数据表中追加索引。[Schema API]() 的索引定义数组，默认 `[]`

返回值: `boolean`

```php
$schema->addField('file', 'name', array(
    'type'        => 'varchar',
    'length'      => 256,
    'not null'    => TRUE,
    'default'     => '',
    'description' => 'File basename.',
));
$schema->addField('file', 'mime', array(
    'type'        => 'varchar',
    'length'      => 64,
    'not null'    => TRUE,
    'default'     => '',
    'description' => 'File mime.',
), array(
    'indexes'     => array('ik_name' => array('name'))
));
```

生成的SQL语句如下：
```sql
ALTER TABLE {file} ADD `name` VARCHAR(256) NOT NULL DEFAULT '' COMMENT 'File basename.'
ALTER TABLE {file} ADD `mime` VARCHAR(64) NOT NULL DEFAULT '' COMMENT 'File mime.', ADD INDEX `ik_name` (`name`)
```


## changeField($table, $field, $field_new, $spec, $keys_new)

修改数据表中某个字段的定义。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$field`: `string`

    要修改的字段名称。

- `$field_new`: `string`

    字段的新名称。

- `$spec`: `array`

    [Schema API]() 的字段定义数组。

- `keys_new`: `array`

    向数据表中追加索引。[Schema API]() 的索引定义数组，默认 `[]`

```php
$schema->changeField('file', 'name', 'filename', array(
    'type'        => 'varchar',
    'length'      => 128,
    'not null'    => FALSE,
    'description' => 'File basename.',
));
$schema->changeField('file', 'mime', 'filemime', array(
    'type'        => 'int',
    'size'        => 'tiny',
    'unsigned'    => TRUE,
    'not null'    => FALSE,
    'description' => 'File mime.',
), array(
    'indexes'     => array('ik_mime' => array('filemime'))
));
```

生成的SQL语句如下：
```sql
ALTER TABLE {file} CHANGE `name` `filename` VARCHAR(128) NULL DEFAULT NULL COMMENT 'File basename.'
ALTER TABLE {file} CHANGE `mime` `filemime` TINYINT unsigned NULL DEFAULT NULL COMMENT 'File mime.', ADD INDEX `ik_mime` (`filemime`)
```


## dropField($table, $field)

删除数据表中的一个字段。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$field`: `string`

    字段名称。

返回值: `boolean`

```sql
ALTER TABLE {$table} DROP `$field`
```


## fieldSetDefault($table, $field, $default)

设置字段的默认值。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$field`: `string`

    字段名称。

- `$default`: `mixed`

    字段的默认值。

```sql
ALTER TABLE {$table} ALTER COLUMN `$field` SET DEFAULT $default
```


## fieldSetNoDefault($table, $field)

取消字段的默认值。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$field`: `string`

    字段名称。

```sql
ALTER TABLE {$table} ALTER COLUMN `$field` DROP DEFAULT
```


## addPrimaryKey($table, $fields)

添加主键。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$fields`: `array`

    主键的字段列表。

```sql
ALTER TABLE {$table} ADD PRIMARY KEY (...$fields)
```


## dropPrimaryKey($table)

删除主键。

参数:
- `$table`: `string`

    要操作的数据表名称。

返回值: `boolean`

```sql
ALTER TABLE {$table} DROP PRIMARY KEY
```


## addUniqueKey($table, $name, $fields)

添加唯一索引。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$name`: `string`

    唯一索引的名称。

- `$fields`: `array`

    唯一索引的字段列表。

```sql
ALTER TABLE {$table} ADD UNIQUE KEY `$name` (...$fields)
```


## dropUniqueKey($table, $name)

删除唯一索引。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$name`: `string`

    唯一索引的名称。

返回值: `boolean`

```sql
ALTER TABLE {$table} DROP KEY `$name`
```


## addIndex($table, $name, $fields)

添加普通索引。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$name`: `string`

    普通索引的名称。

- `$fields`: `array`

    普通索引的字段列表。

```sql
ALTER TABLE {$table} ADD INDEX `$name` (...$fields)
```


## dropIndex($table, $name)

删除普通索引。

参数:
- `$table`: `string`

    要操作的数据表名称。

- `$name`: `string`

    普通索引的名称。

返回值: `boolean`

```sql
ALTER TABLE {$table} DROP INDEX `$name`
```


## prepareComment($comment, $length = NULL)

返回经过预处理后的表/字段注释。

参数:
- `$comment`: `string`

  注释字符串。

- `$length`: `int`

  字符串的最大长度。默认 `NULL` 当前字符串长度

返回值: `string`


## getComment($table, $column = NULL)

获取表/字段注释。

参数:
- `$table`: `string`

    数据表名称。

- `$column`: `string`

    字段名称。默认 `NULL` 获取表注释

返回值: `string`

```php
$schema->getComment('node');
```

生成的SQL语句如下:
```sql
SELECT
  table_comment AS table_comment
FROM information_schema.tables WHERE
  (table_schema = :db_name) AND (table_name = :table_name)
```


## tableExists($table)

判断指定的数据表是否存在。

参数:
- `$table`: `string`

    数据表名称。

返回值: `boolean`


## fieldExists($table, $column)

判断字段是否存在。

参数:
- `$table`: `string`

    数据表名称。

- `$column`: `string`

    字段名称。

返回值: `boolean`


## indexExists($table, $name)

判断数据表中是否存在指定的普通索引。

参数:
- `$table`: `string`

    要检查的数据表名称。

- `$name`: `string`

    普通索引的名称。

返回值: `boolean`

```sql
SHOW INDEX FROM {$table} WHERE key_name = $name
```



## 源代码
```php
class DatabaseSchema_mysql extends DatabaseSchema {

  /**
   * Maximum length of a table comment in MySQL.
   */
  const COMMENT_MAX_TABLE = 60;

  /**
   * Maximum length of a column comment in MySQL.
   */
  const COMMENT_MAX_COLUMN = 255;

  /**
   * Get information about the table and database name from the prefix.
   *
   * @return
   *   A keyed array with information about the database, table name and prefix.
   */
  protected function getPrefixInfo($table = 'default', $add_prefix = TRUE) {
    $info = array('prefix' => $this->connection->tablePrefix($table));
    if ($add_prefix) {
      $table = $info['prefix'] . $table;
    }
    if (($pos = strpos($table, '.')) !== FALSE) {
      $info['database'] = substr($table, 0, $pos);
      $info['table'] = substr($table, ++$pos);
    }
    else {
      $db_info = $this->connection->getConnectionOptions();
      $info['database'] = $db_info['database'];
      $info['table'] = $table;
    }
    return $info;
  }

  /**
   * Build a condition to match a table name against a standard information_schema.
   *
   * MySQL uses databases like schemas rather than catalogs so when we build
   * a condition to query the information_schema.tables, we set the default
   * database as the schema unless specified otherwise, and exclude table_catalog
   * from the condition criteria.
   */
  protected function buildTableNameCondition($table_name, $operator = '=', $add_prefix = TRUE) {
    $info = $this->connection->getConnectionOptions();

    // Ensure the table name is not surrounded with quotes as that is not
    // appropriate for schema queries.
    $quote_char = variable_get('mysql_identifier_quote_character', MYSQL_IDENTIFIER_QUOTE_CHARACTER_DEFAULT);
    $table_name = str_replace($quote_char, '', $table_name);

    $table_info = $this->getPrefixInfo($table_name, $add_prefix);

    $condition = new DatabaseCondition('AND');
    $condition->condition('table_schema', $table_info['database']);
    $condition->condition('table_name', $table_info['table'], $operator);
    return $condition;
  }

  /**
   * Generate SQL to create a new table from a Drupal schema definition.
   *
   * @param $name
   *   The name of the table to create.
   * @param $table
   *   A Schema API table definition array.
   * @return
   *   An array of SQL statements to create the table.
   */
  protected function createTableSql($name, $table) {
    $info = $this->connection->getConnectionOptions();

    // Provide defaults if needed.
    $table += array(
      'mysql_engine' => 'InnoDB',
      // Allow the default charset to be overridden in settings.php.
      'mysql_character_set' => $this->connection->utf8mb4IsActive() ? 'utf8mb4' : 'utf8',
    );

    $sql = "CREATE TABLE {" . $name . "} (\n";

    // Add the SQL statement for each field.
    foreach ($table['fields'] as $field_name => $field) {
      $sql .= $this->createFieldSql($field_name, $this->processField($field)) . ", \n";
    }

    // Process keys & indexes.
    $keys = $this->createKeysSql($table);
    if (count($keys)) {
      $sql .= implode(", \n", $keys) . ", \n";
    }

    // Remove the last comma and space.
    $sql = substr($sql, 0, -3) . "\n) ";

    $sql .= 'ENGINE = ' . $table['mysql_engine'] . ' DEFAULT CHARACTER SET ' . $table['mysql_character_set'];
    // By default, MySQL uses the default collation for new tables, which is
    // 'utf8_general_ci' for utf8. If an alternate collation has been set, it
    // needs to be explicitly specified.
    // @see DatabaseConnection_mysql
    if (!empty($info['collation'])) {
      $sql .= ' COLLATE ' . $info['collation'];
    }

    // The row format needs to be either DYNAMIC or COMPRESSED in order to allow
    // for the innodb_large_prefix setting to take effect, see
    // https://dev.mysql.com/doc/refman/5.6/en/create-table.html
    if ($this->connection->utf8mb4IsActive()) {
      $sql .= ' ROW_FORMAT=DYNAMIC';
    }

    // Add table comment.
    if (!empty($table['description'])) {
      $sql .= ' COMMENT ' . $this->prepareComment($table['description'], self::COMMENT_MAX_TABLE);
    }

    return array($sql);
  }

  /**
   * Create an SQL string for a field to be used in table creation or alteration.
   *
   * Before passing a field out of a schema definition into this function it has
   * to be processed by _db_process_field().
   *
   * @param $name
   *   Name of the field.
   * @param $spec
   *   The field specification, as per the schema data structure format.
   */
  protected function createFieldSql($name, $spec) {
    $sql = "`" . $name . "` " . $spec['mysql_type'];

    if (in_array($spec['mysql_type'], array('VARCHAR', 'CHAR', 'TINYTEXT', 'MEDIUMTEXT', 'LONGTEXT', 'TEXT'))) {
      if (isset($spec['length'])) {
        $sql .= '(' . $spec['length'] . ')';
      }
      if (!empty($spec['binary'])) {
        $sql .= ' BINARY';
      }
    }
    elseif (isset($spec['precision']) && isset($spec['scale'])) {
      $sql .= '(' . $spec['precision'] . ', ' . $spec['scale'] . ')';
    }

    if (!empty($spec['unsigned'])) {
      $sql .= ' unsigned';
    }

    if (isset($spec['not null'])) {
      if ($spec['not null']) {
        $sql .= ' NOT NULL';
      }
      else {
        $sql .= ' NULL';
      }
    }

    if (!empty($spec['auto_increment'])) {
      $sql .= ' auto_increment';
    }

    // $spec['default'] can be NULL, so we explicitly check for the key here.
    if (array_key_exists('default', $spec)) {
      if (is_string($spec['default'])) {
        $spec['default'] = "'" . $spec['default'] . "'";
      }
      elseif (!isset($spec['default'])) {
        $spec['default'] = 'NULL';
      }
      $sql .= ' DEFAULT ' . $spec['default'];
    }

    if (empty($spec['not null']) && !isset($spec['default'])) {
      $sql .= ' DEFAULT NULL';
    }

    // Add column comment.
    if (!empty($spec['description'])) {
      $sql .= ' COMMENT ' . $this->prepareComment($spec['description'], self::COMMENT_MAX_COLUMN);
    }

    return $sql;
  }

  /**
   * Set database-engine specific properties for a field.
   *
   * @param $field
   *   A field description array, as specified in the schema documentation.
   */
  protected function processField($field) {

    if (!isset($field['size'])) {
      $field['size'] = 'normal';
    }

    // Set the correct database-engine specific datatype.
    // In case one is already provided, force it to uppercase.
    if (isset($field['mysql_type'])) {
      $field['mysql_type'] = drupal_strtoupper($field['mysql_type']);
    }
    else {
      $map = $this->getFieldTypeMap();
      $field['mysql_type'] = $map[$field['type'] . ':' . $field['size']];
    }

    if (isset($field['type']) && $field['type'] == 'serial') {
      $field['auto_increment'] = TRUE;
    }

    return $field;
  }

  public function getFieldTypeMap() {
    // Put :normal last so it gets preserved by array_flip. This makes
    // it much easier for modules (such as schema.module) to map
    // database types back into schema types.
    // $map does not use drupal_static as its value never changes.
    static $map = array(
      'varchar:normal'  => 'VARCHAR',
      'char:normal'     => 'CHAR',

      'text:tiny'       => 'TINYTEXT',
      'text:small'      => 'TINYTEXT',
      'text:medium'     => 'MEDIUMTEXT',
      'text:big'        => 'LONGTEXT',
      'text:normal'     => 'TEXT',

      'serial:tiny'     => 'TINYINT',
      'serial:small'    => 'SMALLINT',
      'serial:medium'   => 'MEDIUMINT',
      'serial:big'      => 'BIGINT',
      'serial:normal'   => 'INT',

      'int:tiny'        => 'TINYINT',
      'int:small'       => 'SMALLINT',
      'int:medium'      => 'MEDIUMINT',
      'int:big'         => 'BIGINT',
      'int:normal'      => 'INT',

      'float:tiny'      => 'FLOAT',
      'float:small'     => 'FLOAT',
      'float:medium'    => 'FLOAT',
      'float:big'       => 'DOUBLE',
      'float:normal'    => 'FLOAT',

      'numeric:normal'  => 'DECIMAL',

      'blob:big'        => 'LONGBLOB',
      'blob:normal'     => 'BLOB',
    );
    return $map;
  }

  protected function createKeysSql($spec) {
    $keys = array();

    if (!empty($spec['primary key'])) {
      $keys[] = 'PRIMARY KEY (' . $this->createKeysSqlHelper($spec['primary key']) . ')';
    }
    if (!empty($spec['unique keys'])) {
      foreach ($spec['unique keys'] as $key => $fields) {
        $keys[] = 'UNIQUE KEY `' . $key . '` (' . $this->createKeysSqlHelper($fields) . ')';
      }
    }
    if (!empty($spec['indexes'])) {
      foreach ($spec['indexes'] as $index => $fields) {
        $keys[] = 'INDEX `' . $index . '` (' . $this->createKeysSqlHelper($fields) . ')';
      }
    }

    return $keys;
  }

  protected function createKeySql($fields) {
    $return = array();
    foreach ($fields as $field) {
      if (is_array($field)) {
        $return[] = '`' . $field[0] . '`(' . $field[1] . ')';
      }
      else {
        $return[] = '`' . $field . '`';
      }
    }
    return implode(', ', $return);
  }

  protected function createKeysSqlHelper($fields) {
    $return = array();
    foreach ($fields as $field) {
      if (is_array($field)) {
        $return[] = '`' . $field[0] . '`(' . $field[1] . ')';
      }
      else {
        $return[] = '`' . $field . '`';
      }
    }
    return implode(', ', $return);
  }

  public function renameTable($table, $new_name) {
    if (!$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot rename @table to @table_new: table @table doesn't exist.", array('@table' => $table, '@table_new' => $new_name)));
    }
    if ($this->tableExists($new_name)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot rename @table to @table_new: table @table_new already exists.", array('@table' => $table, '@table_new' => $new_name)));
    }

    $info = $this->getPrefixInfo($new_name);
    return $this->connection->query('ALTER TABLE {' . $table . '} RENAME TO `' . $info['table'] . '`');
  }

  public function dropTable($table) {
    if (!$this->tableExists($table)) {
      return FALSE;
    }

    $this->connection->query('DROP TABLE {' . $table . '}');
    return TRUE;
  }

  public function addField($table, $field, $spec, $keys_new = array()) {
    if (!$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add field @table.@field: table doesn't exist.", array('@field' => $field, '@table' => $table)));
    }
    if ($this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add field @table.@field: field already exists.", array('@field' => $field, '@table' => $table)));
    }

    $fixnull = FALSE;
    if (!empty($spec['not null']) && !isset($spec['default'])) {
      $fixnull = TRUE;
      $spec['not null'] = FALSE;
    }
    $query = 'ALTER TABLE {' . $table . '} ADD ';
    $query .= $this->createFieldSql($field, $this->processField($spec));
    if ($keys_sql = $this->createKeysSql($keys_new)) {
      $query .= ', ADD ' . implode(', ADD ', $keys_sql);
    }

    $this->connection->query($query);
    if (isset($spec['initial'])) {
      $this->connection->update($table)
        ->fields(array($field => $spec['initial']))
        ->execute();
    }
    if ($fixnull) {
      $spec['not null'] = TRUE;
      $this->changeField($table, $field, $field, $spec);
    }
  }

  public function dropField($table, $field) {
    if (!$this->fieldExists($table, $field)) {
      return FALSE;
    }

    $this->connection->query('ALTER TABLE {' . $table . '} DROP `' . $field . '`');
    return TRUE;
  }

  public function fieldSetDefault($table, $field, $default) {
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot set default value of field @table.@field: field doesn't exist.", array('@table' => $table, '@field' => $field)));
    }

    if (!isset($default)) {
      $default = 'NULL';
    }
    else {
      $default = is_string($default) ? "'$default'" : $default;
    }
    var_dump('ALTER TABLE {' . $table . '} ALTER COLUMN `' . $field . '` SET DEFAULT ' . $default);die;
    $this->connection->query('ALTER TABLE {' . $table . '} ALTER COLUMN `' . $field . '` SET DEFAULT ' . $default);
  }

  public function fieldSetNoDefault($table, $field) {
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot remove default value of field @table.@field: field doesn't exist.", array('@table' => $table, '@field' => $field)));
    }

    $this->connection->query('ALTER TABLE {' . $table . '} ALTER COLUMN `' . $field . '` DROP DEFAULT');
  }

  public function indexExists($table, $name) {
    // Returns one row for each column in the index. Result is string or FALSE.
    // Details at http://dev.mysql.com/doc/refman/5.0/en/show-index.html
    $row = $this->connection->query('SHOW INDEX FROM {' . $table . "} WHERE key_name = '$name'")->fetchAssoc();
    return isset($row['Key_name']);
  }

  public function addPrimaryKey($table, $fields) {
    if (!$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add primary key to table @table: table doesn't exist.", array('@table' => $table)));
    }
    if ($this->indexExists($table, 'PRIMARY')) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add primary key to table @table: primary key already exists.", array('@table' => $table)));
    }

    $this->connection->query('ALTER TABLE {' . $table . '} ADD PRIMARY KEY (' . $this->createKeySql($fields) . ')');
  }

  public function dropPrimaryKey($table) {
    if (!$this->indexExists($table, 'PRIMARY')) {
      return FALSE;
    }

    $this->connection->query('ALTER TABLE {' . $table . '} DROP PRIMARY KEY');
    return TRUE;
  }

  public function addUniqueKey($table, $name, $fields) {
    if (!$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add unique key @name to table @table: table doesn't exist.", array('@table' => $table, '@name' => $name)));
    }
    if ($this->indexExists($table, $name)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add unique key @name to table @table: unique key already exists.", array('@table' => $table, '@name' => $name)));
    }

    $this->connection->query('ALTER TABLE {' . $table . '} ADD UNIQUE KEY `' . $name . '` (' . $this->createKeySql($fields) . ')');
  }

  public function dropUniqueKey($table, $name) {
    if (!$this->indexExists($table, $name)) {
      return FALSE;
    }

    $this->connection->query('ALTER TABLE {' . $table . '} DROP KEY `' . $name . '`');
    return TRUE;
  }

  public function addIndex($table, $name, $fields) {
    if (!$this->tableExists($table)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot add index @name to table @table: table doesn't exist.", array('@table' => $table, '@name' => $name)));
    }
    if ($this->indexExists($table, $name)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot add index @name to table @table: index already exists.", array('@table' => $table, '@name' => $name)));
    }

    $this->connection->query('ALTER TABLE {' . $table . '} ADD INDEX `' . $name . '` (' . $this->createKeySql($fields) . ')');
  }

  public function dropIndex($table, $name) {
    if (!$this->indexExists($table, $name)) {
      return FALSE;
    }

    $this->connection->query('ALTER TABLE {' . $table . '} DROP INDEX `' . $name . '`');
    return TRUE;
  }

  public function changeField($table, $field, $field_new, $spec, $keys_new = array()) {
    if (!$this->fieldExists($table, $field)) {
      throw new DatabaseSchemaObjectDoesNotExistException(t("Cannot change the definition of field @table.@name: field doesn't exist.", array('@table' => $table, '@name' => $field)));
    }
    if (($field != $field_new) && $this->fieldExists($table, $field_new)) {
      throw new DatabaseSchemaObjectExistsException(t("Cannot rename field @table.@name to @name_new: target field already exists.", array('@table' => $table, '@name' => $field, '@name_new' => $field_new)));
    }

    $sql = 'ALTER TABLE {' . $table . '} CHANGE `' . $field . '` ' . $this->createFieldSql($field_new, $this->processField($spec));
    if ($keys_sql = $this->createKeysSql($keys_new)) {
      $sql .= ', ADD ' . implode(', ADD ', $keys_sql);
    }
    $this->connection->query($sql);
  }

  public function prepareComment($comment, $length = NULL) {
    // Work around a bug in some versions of PDO, see http://bugs.php.net/bug.php?id=41125
    $comment = str_replace("'", '’', $comment);

    // Truncate comment to maximum comment length.
    if (isset($length)) {
      // Add table prefixes before truncating.
      $comment = truncate_utf8($this->connection->prefixTables($comment), $length, TRUE, TRUE);
    }

    return $this->connection->quote($comment);
  }

  /**
   * Retrieve a table or column comment.
   */
  public function getComment($table, $column = NULL) {
    $condition = $this->buildTableNameCondition($table);
    if (isset($column)) {
      $condition->condition('column_name', $column);
      $condition->compile($this->connection, $this);
      // Don't use {} around information_schema.columns table.
      return $this->connection->query("SELECT column_comment AS column_comment FROM information_schema.columns WHERE " . (string) $condition, $condition->arguments())->fetchField();
    }
    $condition->compile($this->connection, $this);
    // Don't use {} around information_schema.tables table.
    $comment = $this->connection->query("SELECT table_comment AS table_comment FROM information_schema.tables WHERE " . (string) $condition, $condition->arguments())->fetchField();
    // Work-around for MySQL 5.0 bug http://bugs.mysql.com/bug.php?id=11379
    return preg_replace('/; InnoDB free:.*$/', '', $comment);
  }

  public function tableExists($table) {
    // The information_schema table is very slow to query under MySQL 5.0.
    // Instead, we try to select from the table in question.  If it fails,
    // the most likely reason is that it does not exist. That is dramatically
    // faster than using information_schema.
    // @link http://bugs.mysql.com/bug.php?id=19588
    // @todo: This override should be removed once we require a version of MySQL
    // that has that bug fixed.
    try {
      $this->connection->queryRange("SELECT 1 FROM {" . $table . "}", 0, 1);
      return TRUE;
    }
    catch (Exception $e) {
      return FALSE;
    }
  }

  public function fieldExists($table, $column) {
    // The information_schema table is very slow to query under MySQL 5.0.
    // Instead, we try to select from the table and field in question. If it
    // fails, the most likely reason is that it does not exist. That is
    // dramatically faster than using information_schema.
    // @link http://bugs.mysql.com/bug.php?id=19588
    // @todo: This override should be removed once we require a version of MySQL
    // that has that bug fixed.
    try {
      $this->connection->queryRange("SELECT $column FROM {" . $table . "}", 0, 1);
      return TRUE;
    }
    catch (Exception $e) {
      return FALSE;
    }
  }

}
```
