# DatabaseSchema

该 `API` 是用来处理数据库模式的。

`Drupal` 数据库模式定义是表示一个或多个表及其相关键和索引的数组结构。

模式由 [hook_schema()]() 定义，它通常位于 `{modulename}.install` 文件中。通过实现 [hook_schema()]() 并指定模块声明的表，您可以轻松地在所有受支持的数据库引擎上创建和删除这些表。在创建表和更改受支持的数据库引擎时，不需要处理不同的 `SQL` 语法。


## $connection
<Badge>protected</Badge>

- 类型: [DatabaseConnection](./DatabaseConnection)


## $placeholder
<Badge>protected</Badge>

- 类型: `int`
- 默认值: `0`


## $defaultSchema
<Badge>protected</Badge>

- 类型: `string`
- 默认值: `public`


## $uniqueIdentifier
<Badge>protected</Badge>

此查询对象的唯一标识符。

- 类型: `string`


## __construct($connection)

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)


## __clone()

重新生成唯一值标识符。

## uniqueIdentifier()

返回值: `string`

## nextPlaceholder()

返回值: `int`

## getPrefixInfo($table = 'default', $add_prefix = TRUE)
<Badge>protected</Badge>

参数:
- `$table`: `string`
- `$add_prefix`: `boolean`

返回值: `array`


## prefixNonTable($table)

参数:
- `$table`: `string`

返回值: `string`


## buildTableNameCondition($table_name, $operator = '=', $add_prefix = TRUE)
<Badge>protected</Badge>

参数:
- `$table_name`: `string`
- `$operator`: `string`
- `$add_prefix`: `boolean`

返回值: [QueryConditionInterface](./QueryConditionInterface)


## tableExists($table)

判断某个数据表是否存在。

参数:
- `$table`: `string`

返回值: `boolean`


## findTables($table_expression)

查找与指定基表名称相似的所有表。

参数:
- `$table_expression`: `string`

返回值: `array`


## findTablesD8($table_expression)

查找与指定基表名称相似的所有表。

参数:
- `$table_expression`: `string`

返回值: `array`


## fieldExists($table, $column)

判断数据表的某个字段是否存在。

参数:
- `$table`: `string`
- `$column`: `string`

返回值: `boolean`


## getFieldTypeMap()
<Badge>abstract</Badge>

获取虚拟字段到数据库字段的映射数组。

返回值: `array`


## renameTable($table, $new_name)
<Badge>abstract</Badge>

重命名数据表。

参数:
- `$table`: `string`
- `$new_name`: `string`


## dropTable($table)
<Badge>abstract</Badge>

删除数据表。

参数:
- `$table`: `string`

返回值: `boolean`


## addField($table, $field, $spec, $keys_new = array())
<Badge>abstract</Badge>

为数据表添加字段。

参数:
- `$table`: `string`
- `$field`: `string`
- `$spec`: `array`
- `$keys_new`: `array`


## dropField($table, $field)
<Badge>abstract</Badge>

删除数据表的某个字段。

参数:
- `$table`: `string`
- `$field`: `string`

返回值: `boolean`


## fieldSetDefault($table, $field, $default)
<Badge>abstract</Badge>

设置数据表某个字段的默认值。

参数:
- `$table`: `string`
- `$field`: `string`
- `$default`: `string` | `number` | `null`


## fieldSetNoDefault($table, $field)
<Badge>abstract</Badge>

取消数据表某个字段的默认值。

参数:
- `$table`: `string`
- `$field`: `string`


## indexExists($table, $name)
<Badge>abstract</Badge>

判断数据表的某个普通索引是否存在。

参数:
- `$table`: `string`
- `$name`: `string`

返回值: `boolean`


## addPrimaryKey($table, $fields)
<Badge>abstract</Badge>

为数据表添加主键。

参数:
- `$table`: `string`
- `$fields`: `array`


## dropPrimaryKey($table)
<Badge>abstract</Badge>

删除数据表的主键。

参数:
- `$table`: `string`

返回值: `boolean`


## addUniqueKey($table, $name, $fields)
<Badge>abstract</Badge>

为数据表添加唯一索引。

参数:
- `$table`: `string`
- `$name`: `string`
- `$fields`: `array`


## dropUniqueKey($table, $name)
<Badge>abstract</Badge>

删除数据表的某个唯一索引。

参数:
- `$table`: `string`
- `$name`: `string`

返回值: `boolean`


## addIndex($table, $name, $fields)
<Badge>abstract</Badge>

为数据表添加普通索引。

参数:
- `$table`: `string`
- `$name`: `string`
- `$fields`: `array`


## dropIndex($table, $name)
<Badge>abstract</Badge>

删除数据表的某个普通索引。

参数:
- `$table`: `string`
- `$name`: `string`

返回值: `boolean`


## changeField($table, $field, $field_new, $spec, $keys_new = array())
<Badge>abstract</Badge>

修改数据表某个字段的定义。

参数:
- `$table`: `string`
- `$field`: `string`
- `$field_new`: `string`
- `$spec`: `array`
- `$keys_new`: `array`


## createTable($name, $table)

创建数据表。

参数:
- `$name`: `string`
- `$table`: `string`


## fieldNames($fields)

返回字段名数组。

参数:
- `$fields`: `array`

返回值: `array`


## prepareComment($comment, $length = NULL)

返回处理后的字段/表注释。

参数:
- `$comment`: `string`
- `$length`: `int`

返回值: `string`




## 源代码
```php
abstract class DatabaseSchema implements QueryPlaceholderInterface {

  /**
   * The database connection.
   *
   * @var DatabaseConnection
   */
  protected $connection;

  /**
   * The placeholder counter.
   */
  protected $placeholder = 0;

  /**
   * Definition of prefixInfo array structure.
   *
   * Rather than redefining DatabaseSchema::getPrefixInfo() for each driver,
   * by defining the defaultSchema variable only MySQL has to re-write the
   * method.
   *
   * @see DatabaseSchema::getPrefixInfo()
   */
  protected $defaultSchema = 'public';

  /**
   * A unique identifier for this query object.
   */
  protected $uniqueIdentifier;

  public function __construct($connection) {
    $this->uniqueIdentifier = uniqid('', TRUE);
    $this->connection = $connection;
  }

  /**
   * Implements the magic __clone function.
   */
  public function __clone() {
    $this->uniqueIdentifier = uniqid('', TRUE);
  }

  /**
   * Implements QueryPlaceHolderInterface::uniqueIdentifier().
   */
  public function uniqueIdentifier() {
    return $this->uniqueIdentifier;
  }

  /**
   * Implements QueryPlaceHolderInterface::nextPlaceholder().
   */
  public function nextPlaceholder() {
    return $this->placeholder++;
  }

  /**
   * Get information about the table name and schema from the prefix.
   *
   * @param
   *   Name of table to look prefix up for. Defaults to 'default' because thats
   *   default key for prefix.
   * @param $add_prefix
   *   Boolean that indicates whether the given table name should be prefixed.
   *
   * @return
   *   A keyed array with information about the schema, table name and prefix.
   */
  protected function getPrefixInfo($table = 'default', $add_prefix = TRUE) {
    $info = array(
      'schema' => $this->defaultSchema,
      'prefix' => $this->connection->tablePrefix($table),
    );
    if ($add_prefix) {
      $table = $info['prefix'] . $table;
    }
    // If the prefix contains a period in it, then that means the prefix also
    // contains a schema reference in which case we will change the schema key
    // to the value before the period in the prefix. Everything after the dot
    // will be prefixed onto the front of the table.
    if (($pos = strpos($table, '.')) !== FALSE) {
      // Grab everything before the period.
      $info['schema'] = substr($table, 0, $pos);
      // Grab everything after the dot.
      $info['table'] = substr($table, ++$pos);
    }
    else {
      $info['table'] = $table;
    }
    return $info;
  }

  /**
   * Create names for indexes, primary keys and constraints.
   *
   * This prevents using {} around non-table names like indexes and keys.
   */
  function prefixNonTable($table) {
    $args = func_get_args();
    $info = $this->getPrefixInfo($table);
    $args[0] = $info['table'];
    return implode('_', $args);
  }

  /**
   * Build a condition to match a table name against a standard information_schema.
   *
   * The information_schema is a SQL standard that provides information about the
   * database server and the databases, schemas, tables, columns and users within
   * it. This makes information_schema a useful tool to use across the drupal
   * database drivers and is used by a few different functions. The function below
   * describes the conditions to be meet when querying information_schema.tables
   * for drupal tables or information associated with drupal tables. Even though
   * this is the standard method, not all databases follow standards and so this
   * method should be overwritten by a database driver if the database provider
   * uses alternate methods. Because information_schema.tables is used in a few
   * different functions, a database driver will only need to override this function
   * to make all the others work. For example see includes/databases/mysql/schema.inc.
   *
   * @param $table_name
   *   The name of the table in question.
   * @param $operator
   *   The operator to apply on the 'table' part of the condition.
   * @param $add_prefix
   *   Boolean to indicate whether the table name needs to be prefixed.
   *
   * @return QueryConditionInterface
   *   A DatabaseCondition object.
   */
  protected function buildTableNameCondition($table_name, $operator = '=', $add_prefix = TRUE) {
    $info = $this->connection->getConnectionOptions();

    // Retrieve the table name and schema
    $table_info = $this->getPrefixInfo($table_name, $add_prefix);

    $condition = new DatabaseCondition('AND');
    $condition->condition('table_catalog', $info['database']);
    $condition->condition('table_schema', $table_info['schema']);
    $condition->condition('table_name', $table_info['table'], $operator);
    return $condition;
  }

  /**
   * Check if a table exists.
   *
   * @param $table
   *   The name of the table in drupal (no prefixing).
   *
   * @return
   *   TRUE if the given table exists, otherwise FALSE.
   */
  public function tableExists($table) {
    $condition = $this->buildTableNameCondition($table);
    $condition->compile($this->connection, $this);
    // Normally, we would heartily discourage the use of string
    // concatenation for conditionals like this however, we
    // couldn't use db_select() here because it would prefix
    // information_schema.tables and the query would fail.
    // Don't use {} around information_schema.tables table.
    return (bool) $this->connection->query("SELECT 1 FROM information_schema.tables WHERE " . (string) $condition, $condition->arguments())->fetchField();
  }

  /**
   * Find all tables that are like the specified base table name.
   *
   * @param $table_expression
   *   An SQL expression, for example "simpletest%" (without the quotes).
   *   BEWARE: this is not prefixed, the caller should take care of that.
   *
   * @return
   *   Array, both the keys and the values are the matching tables.
   */
  public function findTables($table_expression) {
    $condition = $this->buildTableNameCondition($table_expression, 'LIKE', FALSE);

    $condition->compile($this->connection, $this);
    var_dump("SELECT table_name AS table_name FROM information_schema.tables WHERE " . (string) $condition, $condition->arguments());die;
    // Normally, we would heartily discourage the use of string
    // concatenation for conditionals like this however, we
    // couldn't use db_select() here because it would prefix
    // information_schema.tables and the query would fail.
    // Don't use {} around information_schema.tables table.
    return $this->connection->query("SELECT table_name AS table_name FROM information_schema.tables WHERE " . (string) $condition, $condition->arguments())->fetchAllKeyed(0, 0);
  }

  /**
   * Finds all tables that are like the specified base table name. This is a
   * backport of the change made to findTables in Drupal 8 to work with virtual,
   * un-prefixed table names. The original function is retained for Backwards
   * Compatibility.
   * @see https://www.drupal.org/node/2552435
   *
   * @param string $table_expression
   *   An SQL expression, for example "cache_%" (without the quotes).
   *
   * @return array
   *   Both the keys and the values are the matching tables.
   */
  public function findTablesD8($table_expression) {
    // Load all the tables up front in order to take into account per-table
    // prefixes. The actual matching is done at the bottom of the method.
    $condition = $this->buildTableNameCondition('%', 'LIKE');
    $condition->compile($this->connection, $this);

    $individually_prefixed_tables = $this->connection->getUnprefixedTablesMap();
    $default_prefix = $this->connection->tablePrefix();
    $default_prefix_length = strlen($default_prefix);
    $tables = array();
    // Normally, we would heartily discourage the use of string
    // concatenation for conditionals like this however, we
    // couldn't use db_select() here because it would prefix
    // information_schema.tables and the query would fail.
    // Don't use {} around information_schema.tables table.
    $results = $this->connection->query("SELECT table_name AS table_name FROM information_schema.tables WHERE " . (string) $condition, $condition->arguments());
    foreach ($results as $table) {
      // Take into account tables that have an individual prefix.
      if (isset($individually_prefixed_tables[$table->table_name])) {
        $prefix_length = strlen($this->connection->tablePrefix($individually_prefixed_tables[$table->table_name]));
      }
      elseif ($default_prefix && substr($table->table_name, 0, $default_prefix_length) !== $default_prefix) {
        // This table name does not start the default prefix, which means that
        // it is not managed by Drupal so it should be excluded from the result.
        continue;
      }
      else {
        $prefix_length = $default_prefix_length;
      }

      // Remove the prefix from the returned tables.
      $unprefixed_table_name = substr($table->table_name, $prefix_length);

      // The pattern can match a table which is the same as the prefix. That
      // will become an empty string when we remove the prefix, which will
      // probably surprise the caller, besides not being a prefixed table. So
      // remove it.
      if (!empty($unprefixed_table_name)) {
        $tables[$unprefixed_table_name] = $unprefixed_table_name;
      }
    }

    // Convert the table expression from its SQL LIKE syntax to a regular
    // expression and escape the delimiter that will be used for matching.
    $table_expression = str_replace(array('%', '_'), array('.*?', '.'), preg_quote($table_expression, '/'));
    $tables = preg_grep('/^' . $table_expression . '$/i', $tables);

    return $tables;
  }

  /**
   * Check if a column exists in the given table.
   *
   * @param $table
   *   The name of the table in drupal (no prefixing).
   * @param $name
   *   The name of the column.
   *
   * @return
   *   TRUE if the given column exists, otherwise FALSE.
   */
  public function fieldExists($table, $column) {
    $condition = $this->buildTableNameCondition($table);
    $condition->condition('column_name', $column);
    $condition->compile($this->connection, $this);
    // Normally, we would heartily discourage the use of string
    // concatenation for conditionals like this however, we
    // couldn't use db_select() here because it would prefix
    // information_schema.tables and the query would fail.
    // Don't use {} around information_schema.columns table.
    return (bool) $this->connection->query("SELECT 1 FROM information_schema.columns WHERE " . (string) $condition, $condition->arguments())->fetchField();
  }

  /**
   * Returns a mapping of Drupal schema field names to DB-native field types.
   *
   * Because different field types do not map 1:1 between databases, Drupal has
   * its own normalized field type names. This function returns a driver-specific
   * mapping table from Drupal names to the native names for each database.
   *
   * @return array
   *   An array of Schema API field types to driver-specific field types.
   */
  abstract public function getFieldTypeMap();

  /**
   * Rename a table.
   *
   * @param $table
   *   The table to be renamed.
   * @param $new_name
   *   The new name for the table.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If a table with the specified new name already exists.
   */
  abstract public function renameTable($table, $new_name);

  /**
   * Drop a table.
   *
   * @param $table
   *   The table to be dropped.
   *
   * @return
   *   TRUE if the table was successfully dropped, FALSE if there was no table
   *   by that name to begin with.
   */
  abstract public function dropTable($table);

  /**
   * Add a new field to a table.
   *
   * @param $table
   *   Name of the table to be altered.
   * @param $field
   *   Name of the field to be added.
   * @param $spec
   *   The field specification array, as taken from a schema definition.
   *   The specification may also contain the key 'initial', the newly
   *   created field will be set to the value of the key in all rows.
   *   This is most useful for creating NOT NULL columns with no default
   *   value in existing tables.
   * @param $keys_new
   *   (optional) Keys and indexes specification to be created on the
   *   table along with adding the field. The format is the same as a
   *   table specification but without the 'fields' element. If you are
   *   adding a type 'serial' field, you MUST specify at least one key
   *   or index including it in this array. See db_change_field() for more
   *   explanation why.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified table already has a field by that name.
   */
  abstract public function addField($table, $field, $spec, $keys_new = array());

  /**
   * Drop a field.
   *
   * @param $table
   *   The table to be altered.
   * @param $field
   *   The field to be dropped.
   *
   * @return
   *   TRUE if the field was successfully dropped, FALSE if there was no field
   *   by that name to begin with.
   */
  abstract public function dropField($table, $field);

  /**
   * Set the default value for a field.
   *
   * @param $table
   *   The table to be altered.
   * @param $field
   *   The field to be altered.
   * @param $default
   *   Default value to be set. NULL for 'default NULL'.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table or field doesn't exist.
   */
  abstract public function fieldSetDefault($table, $field, $default);

  /**
   * Set a field to have no default value.
   *
   * @param $table
   *   The table to be altered.
   * @param $field
   *   The field to be altered.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table or field doesn't exist.
   */
  abstract public function fieldSetNoDefault($table, $field);

  /**
   * Checks if an index exists in the given table.
   *
   * @param $table
   *   The name of the table in drupal (no prefixing).
   * @param $name
   *   The name of the index in drupal (no prefixing).
   *
   * @return
   *   TRUE if the given index exists, otherwise FALSE.
   */
  abstract public function indexExists($table, $name);

  /**
   * Add a primary key.
   *
   * @param $table
   *   The table to be altered.
   * @param $fields
   *   Fields for the primary key.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified table already has a primary key.
   */
  abstract public function addPrimaryKey($table, $fields);

  /**
   * Drop the primary key.
   *
   * @param $table
   *   The table to be altered.
   *
   * @return
   *   TRUE if the primary key was successfully dropped, FALSE if there was no
   *   primary key on this table to begin with.
   */
  abstract public function dropPrimaryKey($table);

  /**
   * Add a unique key.
   *
   * @param $table
   *   The table to be altered.
   * @param $name
   *   The name of the key.
   * @param $fields
   *   An array of field names.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified table already has a key by that name.
   */
  abstract public function addUniqueKey($table, $name, $fields);

  /**
   * Drop a unique key.
   *
   * @param $table
   *   The table to be altered.
   * @param $name
   *   The name of the key.
   *
   * @return
   *   TRUE if the key was successfully dropped, FALSE if there was no key by
   *   that name to begin with.
   */
  abstract public function dropUniqueKey($table, $name);

  /**
   * Add an index.
   *
   * @param $table
   *   The table to be altered.
   * @param $name
   *   The name of the index.
   * @param $fields
   *   An array of field names.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified table already has an index by that name.
   */
  abstract public function addIndex($table, $name, $fields);

  /**
   * Drop an index.
   *
   * @param $table
   *   The table to be altered.
   * @param $name
   *   The name of the index.
   *
   * @return
   *   TRUE if the index was successfully dropped, FALSE if there was no index
   *   by that name to begin with.
   */
  abstract public function dropIndex($table, $name);

  /**
   * Change a field definition.
   *
   * IMPORTANT NOTE: To maintain database portability, you have to explicitly
   * recreate all indices and primary keys that are using the changed field.
   *
   * That means that you have to drop all affected keys and indexes with
   * db_drop_{primary_key,unique_key,index}() before calling db_change_field().
   * To recreate the keys and indices, pass the key definitions as the
   * optional $keys_new argument directly to db_change_field().
   *
   * For example, suppose you have:
   * @code
   * $schema['foo'] = array(
   *   'fields' => array(
   *     'bar' => array('type' => 'int', 'not null' => TRUE)
   *   ),
   *   'primary key' => array('bar')
   * );
   * @endcode
   * and you want to change foo.bar to be type serial, leaving it as the
   * primary key. The correct sequence is:
   * @code
   * db_drop_primary_key('foo');
   * db_change_field('foo', 'bar', 'bar',
   *   array('type' => 'serial', 'not null' => TRUE),
   *   array('primary key' => array('bar')));
   * @endcode
   *
   * The reasons for this are due to the different database engines:
   *
   * On PostgreSQL, changing a field definition involves adding a new field
   * and dropping an old one which* causes any indices, primary keys and
   * sequences (from serial-type fields) that use the changed field to be dropped.
   *
   * On MySQL, all type 'serial' fields must be part of at least one key
   * or index as soon as they are created. You cannot use
   * db_add_{primary_key,unique_key,index}() for this purpose because
   * the ALTER TABLE command will fail to add the column without a key
   * or index specification. The solution is to use the optional
   * $keys_new argument to create the key or index at the same time as
   * field.
   *
   * You could use db_add_{primary_key,unique_key,index}() in all cases
   * unless you are converting a field to be type serial. You can use
   * the $keys_new argument in all cases.
   *
   * @param $table
   *   Name of the table.
   * @param $field
   *   Name of the field to change.
   * @param $field_new
   *   New name for the field (set to the same as $field if you don't want to change the name).
   * @param $spec
   *   The field specification for the new field.
   * @param $keys_new
   *   (optional) Keys and indexes specification to be created on the
   *   table along with changing the field. The format is the same as a
   *   table specification but without the 'fields' element.
   *
   * @throws DatabaseSchemaObjectDoesNotExistException
   *   If the specified table or source field doesn't exist.
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified destination field already exists.
   */
  abstract public function changeField($table, $field, $field_new, $spec, $keys_new = array());

  /**
   * Create a new table from a Drupal table definition.
   *
   * @param $name
   *   The name of the table to create.
   * @param $table
   *   A Schema API table definition array.
   *
   * @throws DatabaseSchemaObjectExistsException
   *   If the specified table already exists.
   */
  public function createTable($name, $table) {
    if ($this->tableExists($name)) {
      throw new DatabaseSchemaObjectExistsException(t('Table @name already exists.', array('@name' => $name)));
    }
    $statements = $this->createTableSql($name, $table);
    foreach ($statements as $statement) {
      $this->connection->query($statement);
    }
  }

  /**
   * Return an array of field names from an array of key/index column specifiers.
   *
   * This is usually an identity function but if a key/index uses a column prefix
   * specification, this function extracts just the name.
   *
   * @param $fields
   *   An array of key/index column specifiers.
   *
   * @return
   *   An array of field names.
   */
  public function fieldNames($fields) {
    $return = array();
    foreach ($fields as $field) {
      if (is_array($field)) {
        $return[] = $field[0];
      }
      else {
        $return[] = $field;
      }
    }
    return $return;
  }

  /**
   * Prepare a table or column comment for database query.
   *
   * @param $comment
   *   The comment string to prepare.
   * @param $length
   *   Optional upper limit on the returned string length.
   *
   * @return
   *   The prepared comment.
   */
  public function prepareComment($comment, $length = NULL) {
    return $this->connection->quote($comment);
  }
}
```




