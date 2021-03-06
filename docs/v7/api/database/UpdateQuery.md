# UpdateQuery

用于抽象的 `UPDATE` 操作的一般类。



## $table
<Badge>protected</Badge>

- 类型: `string`


## $fields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $arguments
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## $condition
<Badge>protected</Badge>

- 类型: [DatabaseCondition](./DatabaseCondition)


## $expressionFields
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`


## __construct(DatabaseConnection $connection, $table, array $options = array())

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)
- `$table`: `string`
- `$options`: `array`


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


## fields(array $fields)

参数:
- `$fields`: `array`

返回值: `this`


## expression($field, $expression, array $arguments = NULL)

参数:
- `$field`: `string`
- `$expression`: `string`
- `$arguments`: `array` | `null`

返回值: `this`


## execute()

返回值: `???`


## __toString()

返回值: `string`



## 源代码
```php
class UpdateQuery extends Query implements QueryConditionInterface {

  /**
   * The table to update.
   *
   * @var string
   */
  protected $table;

  /**
   * An array of fields that will be updated.
   *
   * @var array
   */
  protected $fields = array();

  /**
   * An array of values to update to.
   *
   * @var array
   */
  protected $arguments = array();

  /**
   * The condition object for this query.
   *
   * Condition handling is handled via composition.
   *
   * @var DatabaseCondition
   */
  protected $condition;

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
   * Constructs an UpdateQuery object.
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

    $this->condition = new DatabaseCondition('AND');
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
   * Adds a set of field->value pairs to be updated.
   *
   * @param $fields
   *   An associative array of fields to write into the database. The array keys
   *   are the field names and the values are the values to which to set them.
   *
   * @return UpdateQuery
   *   The called object.
   */
  public function fields(array $fields) {
    $this->fields = $fields;
    return $this;
  }

  /**
   * Specifies fields to be updated as an expression.
   *
   * Expression fields are cases such as counter=counter+1. This method takes
   * precedence over fields().
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
   * @return UpdateQuery
   *   The called object.
   */
  public function expression($field, $expression, array $arguments = NULL) {
    $this->expressionFields[$field] = array(
      'expression' => $expression,
      'arguments' => $arguments,
    );

    return $this;
  }

  /**
   * Executes the UPDATE query.
   *
   * @return
   *   The number of rows affected by the update.
   */
  public function execute() {

    // Expressions take priority over literal fields, so we process those first
    // and remove any literal fields that conflict.
    $fields = $this->fields;
    $update_values = array();
    foreach ($this->expressionFields as $field => $data) {
      if (!empty($data['arguments'])) {
        $update_values += $data['arguments'];
      }
      unset($fields[$field]);
    }

    // Because we filter $fields the same way here and in __toString(), the
    // placeholders will all match up properly.
    $max_placeholder = 0;
    foreach ($fields as $field => $value) {
      $update_values[':db_update_placeholder_' . ($max_placeholder++)] = $value;
    }

    if (count($this->condition)) {
      $this->condition->compile($this->connection, $this);
      $update_values = array_merge($update_values, $this->condition->arguments());
    }

    return $this->connection->query((string) $this, $update_values, $this->queryOptions);
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

    // Expressions take priority over literal fields, so we process those first
    // and remove any literal fields that conflict.
    $fields = $this->fields;
    $update_fields = array();
    foreach ($this->expressionFields as $field => $data) {
      $update_fields[] = $field . '=' . $data['expression'];
      unset($fields[$field]);
    }

    $max_placeholder = 0;
    foreach ($fields as $field => $value) {
      $update_fields[] = $field . '=:db_update_placeholder_' . ($max_placeholder++);
    }

    $query = $comments . 'UPDATE {' . $this->connection->escapeTable($this->table) . '} SET ' . implode(', ', $update_fields);

    if (count($this->condition)) {
      $this->condition->compile($this->connection, $this);
      // There is an implicit string cast on $this->condition.
      $query .= "\nWHERE " . $this->condition;
    }

    return $query;
  }

}
```
