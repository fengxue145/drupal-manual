# InsertQuery

用于抽象 `INSERT` 操作的基类。


## $table
<Badge>protected</Badge>

要插入的表名称。

- 类型: `string`


## $insertFields
<Badge>protected</Badge>

要插入的字段数组。

- 类型: `array`
- 默认值: `[]`


## $defaultFields
<Badge>protected</Badge>

在表中定义了默认值的字段数组。

- 类型: `array`
- 默认值: `[]`


## $insertValues
<Badge>protected</Badge>

要插入的数据嵌套数组。

- 类型: `array`
- 默认值: `[]`


## $fromQuery
<Badge>protected</Badge>

一个 [SelectQuery](./SelectQuery) 对象，用于获取应该插入的行。

- 类型: [SelectQueryInterface](./SelectQueryInterface)


## __construct($connection, $table, array $options = array())

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)

  数据库连接对象。

- `$table`: `string`

  当前操作的数据表。

- `$options`: `array`

  查询选项。


## fields($fields, $values)

添加一组要插入的 `field` -> `value` 对。

::: tip
此方法只调用一次，第二次调用将被忽略。如果要插入多条数据，请使用 `values()` 方法。
:::

参数:
- `$fields`: `array`

  字段列表。

- `$values`: `array`

  字段值数组。默认 `[]`

返回值: `this`

```php
// 方式一
db_insert('node')
  ->fields(array('title', 'uid', 'status'), array('Example', 1, 1))
  ->execute();

// 方式二
db_insert('node')
  ->fields(array('title' => 'Example', 'uid' => 1, 'status' => 1))
  ->execute();
```


## values($values)

往查询添加另一组值。

参数:
- `$values`: `array`

  字段值数组。

  如果 `$values` 是索引数组，则顺序必须与 `fields()` 的一致。如果是关联数组，顺序可以不一致，但字段必须存在。

返回值: `this`

```php
// 插入单条数据
db_insert('node')
  ->fields(array('title', 'uid', 'status'))
  ->values(array('Example', 1, 1))
  ->execute();

// 插入多条数据
db_insert('node')
  ->fields(array('title', 'uid', 'status'))
  ->values(array('title' => 'Example 1', 'uid' => 1, 'status' => 1))
  ->values(array('title' => 'Example 2', 'uid' => 1, 'status' => 1))
  ->execute();
```


## useDefaults($fields)

设置默认值的字段。

::: tip
若 `fields()` 和 `useDefaults()` 中指定的字段发生冲突，会抛出异常。
:::

参数:
- `$fields`: `array`

  使用表定义中指定的默认值的值数组。

返回值: `this`


```php {2}
db_insert('node')
  ->useDefaults(array('uid', 'status'))
  ->fields(array('title'))
  ->values(array('Example'))
  ->execute();

// 生成的SQL如下：
// INSERT INTO {node} (uid, status, title) VALUES (default, default, :db_insert_placeholder_0)
```


## from(SelectQueryInterface $query)

设置查询对象。这很有用，可以将查询到的结果插入到另一个表中。

参数:
- `$query`: [SelectQueryInterface](./SelectQueryInterface)

  获取应该插入的行的查询。

返回值: `this`

```php
$select_query = db_select('node')->fields('node');
db_insert('node_copy')->from($select_query)->execute();

// 生成的SQL如下:
// INSERT INTO {node_copy} SELECT node.* FROM {node} node
```


## execute()

执行当前查询。

返回值: `int` | `null`


## __toString()

返回插入语句。

返回值: `string`

```php
db_insert('node')
  ->fields(array('title', 'uid', 'status'))
  ->values(array('Example', 1, 1))
  ->__toString();

// 返回如下SQL：
// INSERT INTO {node} (title, uid, status) VALUES(:db_insert_placeholder_0, :db_insert_placeholder_1, :db_insert_placeholder_2)
```

## preExecute()

对查询进行预处理和验证。

返回值: `boolean`



## 源代码
```php
class InsertQuery extends Query {

  /**
   * The table on which to insert.
   *
   * @var string
   */
  protected $table;

  /**
   * An array of fields on which to insert.
   *
   * @var array
   */
  protected $insertFields = array();

  /**
   * An array of fields that should be set to their database-defined defaults.
   *
   * @var array
   */
  protected $defaultFields = array();

  /**
   * A nested array of values to insert.
   *
   * $insertValues is an array of arrays. Each sub-array is either an
   * associative array whose keys are field names and whose values are field
   * values to insert, or a non-associative array of values in the same order
   * as $insertFields.
   *
   * Whether multiple insert sets will be run in a single query or multiple
   * queries is left to individual drivers to implement in whatever manner is
   * most appropriate. The order of values in each sub-array must match the
   * order of fields in $insertFields.
   *
   * @var array
   */
  protected $insertValues = array();

  /**
   * A SelectQuery object to fetch the rows that should be inserted.
   *
   * @var SelectQueryInterface
   */
  protected $fromQuery;

  /**
   * Constructs an InsertQuery object.
   *
   * @param DatabaseConnection $connection
   *   A DatabaseConnection object.
   * @param string $table
   *   Name of the table to associate with this query.
   * @param array $options
   *   Array of database options.
   */
  public function __construct($connection, $table, array $options = array()) {
    if (!isset($options['return'])) {
      $options['return'] = Database::RETURN_INSERT_ID;
    }
    parent::__construct($connection, $options);
    $this->table = $table;
  }

  /**
   * Adds a set of field->value pairs to be inserted.
   *
   * This method may only be called once. Calling it a second time will be
   * ignored. To queue up multiple sets of values to be inserted at once,
   * use the values() method.
   *
   * @param $fields
   *   An array of fields on which to insert. This array may be indexed or
   *   associative. If indexed, the array is taken to be the list of fields.
   *   If associative, the keys of the array are taken to be the fields and
   *   the values are taken to be corresponding values to insert. If a
   *   $values argument is provided, $fields must be indexed.
   * @param $values
   *   An array of fields to insert into the database. The values must be
   *   specified in the same order as the $fields array.
   *
   * @return InsertQuery
   *   The called object.
   */
  public function fields(array $fields, array $values = array()) {
    if (empty($this->insertFields)) {
      if (empty($values)) {
        if (!is_numeric(key($fields))) {
          $values = array_values($fields);
          $fields = array_keys($fields);
        }
      }
      $this->insertFields = $fields;
      if (!empty($values)) {
        $this->insertValues[] = $values;
      }
    }

    return $this;
  }

  /**
   * Adds another set of values to the query to be inserted.
   *
   * If $values is a numeric-keyed array, it will be assumed to be in the same
   * order as the original fields() call. If it is associative, it may be
   * in any order as long as the keys of the array match the names of the
   * fields.
   *
   * @param $values
   *   An array of values to add to the query.
   *
   * @return InsertQuery
   *   The called object.
   */
  public function values(array $values) {
    if (is_numeric(key($values))) {
      $this->insertValues[] = $values;
    }
    else {
      // Reorder the submitted values to match the fields array.
      foreach ($this->insertFields as $key) {
        $insert_values[$key] = $values[$key];
      }
      // For consistency, the values array is always numerically indexed.
      $this->insertValues[] = array_values($insert_values);
    }
    return $this;
  }

  /**
   * Specifies fields for which the database defaults should be used.
   *
   * If you want to force a given field to use the database-defined default,
   * not NULL or undefined, use this method to instruct the database to use
   * default values explicitly. In most cases this will not be necessary
   * unless you are inserting a row that is all default values, as you cannot
   * specify no values in an INSERT query.
   *
   * Specifying a field both in fields() and in useDefaults() is an error
   * and will not execute.
   *
   * @param $fields
   *   An array of values for which to use the default values
   *   specified in the table definition.
   *
   * @return InsertQuery
   *   The called object.
   */
  public function useDefaults(array $fields) {
    $this->defaultFields = $fields;
    return $this;
  }

  /**
   * Sets the fromQuery on this InsertQuery object.
   *
   * @param SelectQueryInterface $query
   *   The query to fetch the rows that should be inserted.
   *
   * @return InsertQuery
   *   The called object.
   */
  public function from(SelectQueryInterface $query) {
    $this->fromQuery = $query;
    return $this;
  }

  /**
   * Executes the insert query.
   *
   * @return
   *   The last insert ID of the query, if one exists. If the query
   *   was given multiple sets of values to insert, the return value is
   *   undefined. If no fields are specified, this method will do nothing and
   *   return NULL. That makes it safe to use in multi-insert loops.
   */
  public function execute() {
    // If validation fails, simply return NULL. Note that validation routines
    // in preExecute() may throw exceptions instead.
    if (!$this->preExecute()) {
      return NULL;
    }

    // If we're selecting from a SelectQuery, finish building the query and
    // pass it back, as any remaining options are irrelevant.
    if (!empty($this->fromQuery)) {
      $sql = (string) $this;
      // The SelectQuery may contain arguments, load and pass them through.
      return $this->connection->query($sql, $this->fromQuery->getArguments(), $this->queryOptions);
    }

    $last_insert_id = 0;

    // Each insert happens in its own query in the degenerate case. However,
    // we wrap it in a transaction so that it is atomic where possible. On many
    // databases, such as SQLite, this is also a notable performance boost.
    $transaction = $this->connection->startTransaction();

    try {
      $sql = (string) $this;
      foreach ($this->insertValues as $insert_values) {
        $last_insert_id = $this->connection->query($sql, $insert_values, $this->queryOptions);
      }
    }
    catch (Exception $e) {
      // One of the INSERTs failed, rollback the whole batch.
      $transaction->rollback();
      // Rethrow the exception for the calling code.
      throw $e;
    }

    // Re-initialize the values array so that we can re-use this query.
    $this->insertValues = array();

    // Transaction commits here where $transaction looses scope.

    return $last_insert_id;
  }

  /**
   * Implements PHP magic __toString method to convert the query to a string.
   *
   * @return string
   *   The prepared statement.
   */
  public function __toString() {
    // Create a sanitized comment string to prepend to the query.
    $comments = $this->connection->makeComment($this->comments);

    // Default fields are always placed first for consistency.
    $insert_fields = array_merge($this->defaultFields, $this->insertFields);

    if (!empty($this->fromQuery)) {
      return $comments . 'INSERT INTO {' . $this->table . '} (' . implode(', ', $insert_fields) . ') ' . $this->fromQuery;
    }

    // For simplicity, we will use the $placeholders array to inject
    // default keywords even though they are not, strictly speaking,
    // placeholders for prepared statements.
    $placeholders = array();
    $placeholders = array_pad($placeholders, count($this->defaultFields), 'default');
    $placeholders = array_pad($placeholders, count($this->insertFields), '?');

    return $comments . 'INSERT INTO {' . $this->table . '} (' . implode(', ', $insert_fields) . ') VALUES (' . implode(', ', $placeholders) . ')';
  }

  /**
   * Preprocesses and validates the query.
   *
   * @return
   *   TRUE if the validation was successful, FALSE if not.
   *
   * @throws FieldsOverlapException
   * @throws NoFieldsException
   */
  public function preExecute() {
    // Confirm that the user did not try to specify an identical
    // field and default field.
    if (array_intersect($this->insertFields, $this->defaultFields)) {
      throw new FieldsOverlapException('You may not specify the same field to have a value and a schema-default value.');
    }

    if (!empty($this->fromQuery)) {
      // We have to assume that the used aliases match the insert fields.
      // Regular fields are added to the query before expressions, maintain the
      // same order for the insert fields.
      // This behavior can be overridden by calling fields() manually as only the
      // first call to fields() does have an effect.
      $this->fields(array_merge(array_keys($this->fromQuery->getFields()), array_keys($this->fromQuery->getExpressions())));
    }
    else {
      // Don't execute query without fields.
      if (count($this->insertFields) + count($this->defaultFields) == 0) {
        throw new NoFieldsException('There are no fields available to insert with.');
      }
    }

    // If no values have been added, silently ignore this query. This can happen
    // if values are added conditionally, so we don't want to throw an
    // exception.
    if (!isset($this->insertValues[0]) && count($this->insertFields) > 0 && empty($this->fromQuery)) {
      return FALSE;
    }
    return TRUE;
  }
}
```
