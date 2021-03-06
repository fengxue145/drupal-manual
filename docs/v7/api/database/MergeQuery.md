# MergeQuery



## const
- `STATUS_INSERT`: `1`
- `STATUS_UPDATE`: `2`

## $table
<Badge>protected</Badge>

- 类型: `string`


## $conditionTable
<Badge>protected</Badge>

- 类型: `string`


## $insertFields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $defaultFields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $insertValues
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $updateFields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $expressionFields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $needsUpdate
<Badge>protected</Badge>

- 类型: `boolean`
- 默认值: `FALSE`


## __construct(DatabaseConnection $connection, $table, array $options = array())

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)
- `$table`: `string`
- `$options`: `array`


## conditionTable($table)
<Badge>protected</Badge>

参数:
- `$table`: `string`

返回值: `this`


## updateFields(array $fields)

参数:
- `$fields`: `array`

返回值: `this`


## expression($field, $expression, array $arguments = NULL)

参数:
- `$field`: `string`
- `$expression`: `string`
- `$arguments`: `array` | `null`

返回值: `this`


## insertFields(array $fields, array $values = array())

参数:
- `$fields`: `array`
- `$values`: `array`

返回值: `this`


## useDefaults(array $fields)

参数:
- `$fields`: `array`

返回值: `this`


## fields(array $fields, array $values = array())

参数:
- `$fields`: `array`
- `$values`: `array`

返回值: `this`


## key(array $fields, array $values = array())

参数:
- `$fields`: `array`
- `$values`: `array`


返回值: `this`


## condition($field, $value = NULL, $operator = NULL)

参数:
- `$field`: `string`
- `$value`: `mixed`
- `$operator`: `string` | `null`

返回值: `this`


## isNull($field)

参数:
- `$field`: `string`

返回值: `this`


## isNotNull($field)

参数:
- `$field`: `string`

返回值: `this`


## exists(SelectQueryInterface $select)

参数:
- `$select`: [SelectQueryInterface](./SelectQueryInterface)

返回值: `this`


## notExists(SelectQueryInterface $select)

参数:
- `$select`: [SelectQueryInterface](./SelectQueryInterface)

返回值: `this`


## &conditions()

返回值: `???`


## arguments()

返回值: `???`


## where($snippet, $args = array())

参数:
- `$snippet`: `???`
- `$args`: `array`

返回值: `this`


## compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder)

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)
- `$queryPlaceholder`: [QueryPlaceholderInterface](./QueryPlaceholderInterface)

返回值: `???`


## compiled()

返回值: `???`


## __toString()

返回值: `string`


## execute()

返回值: `???`



## 源代码
```php
class MergeQuery extends Query implements QueryConditionInterface {
  /**
   * Returned by execute() if an INSERT query has been executed.
   */
  const STATUS_INSERT = 1;

  /**
   * Returned by execute() if an UPDATE query has been executed.
   */
  const STATUS_UPDATE = 2;

  /**
   * The table to be used for INSERT and UPDATE.
   *
   * @var string
   */
  protected $table;

  /**
   * The table or subquery to be used for the condition.
   */
  protected $conditionTable;

  /**
   * An array of fields on which to insert.
   *
   * @var array
   */
  protected $insertFields = array();

  /**
   * An array of fields which should be set to their database-defined defaults.
   *
   * Used on INSERT.
   *
   * @var array
   */
  protected $defaultFields = array();

  /**
   * An array of values to be inserted.
   *
   * @var string
   */
  protected $insertValues = array();

  /**
   * An array of fields that will be updated.
   *
   * @var array
   */
  protected $updateFields = array();

  /**
   * Array of fields to update to an expression in case of a duplicate record.
   *
   * This variable is a nested array in the following format:
   * @code
   * <some field> => array(
   *  'condition' => <condition to execute, as a string>,
   *  'arguments' => <array of arguments for condition, or NULL for none>,
   * );
   * @endcode
   *
   * @var array
   */
  protected $expressionFields = array();

  /**
   * Flag indicating whether an UPDATE is necessary.
   *
   * @var boolean
   */
  protected $needsUpdate = FALSE;

  /**
  * Constructs a MergeQuery object.
  *
  * @param DatabaseConnection $connection
  *   A DatabaseConnection object.
  * @param string $table
  *   Name of the table to associate with this query.
  * @param array $options
  *   Array of database options.
  */
  public function __construct(DatabaseConnection $connection, $table, array $options = array()) {
    $options['return'] = Database::RETURN_AFFECTED;
    parent::__construct($connection, $options);
    $this->table = $table;
    $this->conditionTable = $table;
    $this->condition = new DatabaseCondition('AND');
  }

  /**
   * Sets the table or subquery to be used for the condition.
   *
   * @param $table
   *   The table name or the subquery to be used. Use a SelectQuery object to
   *   pass in a subquery.
   *
   * @return MergeQuery
   *   The called object.
   */
  protected function conditionTable($table) {
    $this->conditionTable = $table;
    return $this;
  }

  /**
   * Adds a set of field->value pairs to be updated.
   *
   * @param $fields
   *   An associative array of fields to write into the database. The array keys
   *   are the field names and the values are the values to which to set them.
   *
   * @return MergeQuery
   *   The called object.
   */
  public function updateFields(array $fields) {
    $this->updateFields = $fields;
    $this->needsUpdate = TRUE;
    return $this;
  }

  /**
   * Specifies fields to be updated as an expression.
   *
   * Expression fields are cases such as counter = counter + 1. This method
   * takes precedence over MergeQuery::updateFields() and it's wrappers,
   * MergeQuery::key() and MergeQuery::fields().
   *
   * @param $field
   *   The field to set.
   * @param $expression
   *   The field will be set to the value of this expression. This parameter
   *   may include named placeholders.
   * @param $arguments
   *   If specified, this is an array of key/value pairs for named placeholders
   *   corresponding to the expression.
   *
   * @return MergeQuery
   *   The called object.
   */
  public function expression($field, $expression, array $arguments = NULL) {
    $this->expressionFields[$field] = array(
      'expression' => $expression,
      'arguments' => $arguments,
    );
    $this->needsUpdate = TRUE;
    return $this;
  }

  /**
   * Adds a set of field->value pairs to be inserted.
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
   * @return MergeQuery
   *   The called object.
   */
  public function insertFields(array $fields, array $values = array()) {
    if ($values) {
      $fields = array_combine($fields, $values);
    }
    $this->insertFields = $fields;
    return $this;
  }

  /**
   * Specifies fields for which the database-defaults should be used.
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
   * @return MergeQuery
   *   The called object.
   */
  public function useDefaults(array $fields) {
    $this->defaultFields = $fields;
    return $this;
  }

  /**
   * Sets common field-value pairs in the INSERT and UPDATE query parts.
   *
   * This method should only be called once. It may be called either
   * with a single associative array or two indexed arrays. If called
   * with an associative array, the keys are taken to be the fields
   * and the values are taken to be the corresponding values to set.
   * If called with two arrays, the first array is taken as the fields
   * and the second array is taken as the corresponding values.
   *
   * @param $fields
   *   An array of fields to insert, or an associative array of fields and
   *   values. The keys of the array are taken to be the fields and the values
   *   are taken to be corresponding values to insert.
   * @param $values
   *   An array of values to set into the database. The values must be
   *   specified in the same order as the $fields array.
   *
   * @return MergeQuery
   *   The called object.
   */
  public function fields(array $fields, array $values = array()) {
    if ($values) {
      $fields = array_combine($fields, $values);
    }
    foreach ($fields as $key => $value) {
      $this->insertFields[$key] = $value;
      $this->updateFields[$key] = $value;
    }
    $this->needsUpdate = TRUE;
    return $this;
  }

  /**
   * Sets the key field(s) to be used as conditions for this query.
   *
   * This method should only be called once. It may be called either
   * with a single associative array or two indexed arrays. If called
   * with an associative array, the keys are taken to be the fields
   * and the values are taken to be the corresponding values to set.
   * If called with two arrays, the first array is taken as the fields
   * and the second array is taken as the corresponding values.
   *
   * The fields are copied to the condition of the query and the INSERT part.
   * If no other method is called, the UPDATE will become a no-op.
   *
   * @param $fields
   *   An array of fields to set, or an associative array of fields and values.
   * @param $values
   *   An array of values to set into the database. The values must be
   *   specified in the same order as the $fields array.
   *
   * @return MergeQuery
   *   The called object.
   */
  public function key(array $fields, array $values = array()) {
    if ($values) {
      $fields = array_combine($fields, $values);
    }
    foreach ($fields as $key => $value) {
      $this->insertFields[$key] = $value;
      $this->condition($key, $value);
    }
    return $this;
  }

  /**
   * Implements QueryConditionInterface::condition().
   */
  public function condition($field, $value = NULL, $operator = NULL) {
    $this->condition->condition($field, $value, $operator);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::isNull().
   */
  public function isNull($field) {
    $this->condition->isNull($field);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::isNotNull().
   */
  public function isNotNull($field) {
    $this->condition->isNotNull($field);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::exists().
   */
  public function exists(SelectQueryInterface $select) {
    $this->condition->exists($select);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::notExists().
   */
  public function notExists(SelectQueryInterface $select) {
    $this->condition->notExists($select);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::conditions().
   */
  public function &conditions() {
    return $this->condition->conditions();
  }

  /**
   * Implements QueryConditionInterface::arguments().
   */
  public function arguments() {
    return $this->condition->arguments();
  }

  /**
   * Implements QueryConditionInterface::where().
   */
  public function where($snippet, $args = array()) {
    $this->condition->where($snippet, $args);
    return $this;
  }

  /**
   * Implements QueryConditionInterface::compile().
   */
  public function compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder) {
    return $this->condition->compile($connection, $queryPlaceholder);
  }

  /**
   * Implements QueryConditionInterface::compiled().
   */
  public function compiled() {
    return $this->condition->compiled();
  }

  /**
   * Implements PHP magic __toString method to convert the query to a string.
   *
   * In the degenerate case, there is no string-able query as this operation
   * is potentially two queries.
   *
   * @return string
   *   The prepared query statement.
   */
  public function __toString() {
  }

  public function execute() {
    if (!count($this->condition)) {
      throw new InvalidMergeQueryException(t('Invalid merge query: no conditions'));
    }
    $select = $this->connection->select($this->conditionTable)
      ->condition($this->condition);
    $select->addExpression('1');
    if (!$select->execute()->fetchField()) {
      try {
        $insert = $this->connection->insert($this->table)->fields($this->insertFields);
        if ($this->defaultFields) {
          $insert->useDefaults($this->defaultFields);
        }
        $insert->execute();
        return self::STATUS_INSERT;
      }
      catch (Exception $e) {
        // The insert query failed, maybe it's because a racing insert query
        // beat us in inserting the same row. Retry the select query, if it
        // returns a row, ignore the error and continue with the update
        // query below.
        if (!$select->execute()->fetchField()) {
          throw $e;
        }
      }
    }
    if ($this->needsUpdate) {
      $update = $this->connection->update($this->table)
        ->fields($this->updateFields)
        ->condition($this->condition);
      if ($this->expressionFields) {
        foreach ($this->expressionFields as $field => $data) {
          $update->expression($field, $data['expression'], $data['arguments']);
        }
      }
      $update->execute();
      return self::STATUS_UPDATE;
     }
  }
}
```
