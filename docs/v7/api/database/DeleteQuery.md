# DeleteQuery

用于抽象 `DELETE` 操作的基类。


## $table
<Badge>protected</Badge>

要删除的表名称。

- 类型: `string`


## $condition
<Badge>protected</Badge>

此查询的条件对象。

- 类型: [DatabaseCondition](./DatabaseCondition)


## __construct(DatabaseConnection $connection, $table, array $options = array())

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)

  数据库连接对象。

- `$table`: `string`

  当前操作的数据表。

- `$options`: `array`

  查询选项。


## condition($field, $value = NULL, $operator = NULL)

参数:
- `$field`: `string`

  要查询的字段名。

- `$value`: `mixed`

  要查询的值。

- `$operator`: `string` | `null`

  查询操作符。

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


## execute()

返回值: `???`


## __toString()

返回值: `string`



## 源代码
```php
class DeleteQuery extends Query implements QueryConditionInterface {

  /**
   * The table from which to delete.
   *
   * @var string
   */
  protected $table;

  /**
   * The condition object for this query.
   *
   * Condition handling is handled via composition.
   *
   * @var DatabaseCondition
   */
  protected $condition;

  /**
   * Constructs a DeleteQuery object.
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
   * Executes the DELETE query.
   *
   * @return int
   *   The number of rows affected by the delete query.
   */
  public function execute() {
    $values = array();
    if (count($this->condition)) {
      $this->condition->compile($this->connection, $this);
      $values = $this->condition->arguments();
    }

    return $this->connection->query((string) $this, $values, $this->queryOptions);
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

    $query = $comments . 'DELETE FROM {' . $this->connection->escapeTable($this->table) . '} ';

    if (count($this->condition)) {

      $this->condition->compile($this->connection, $this);
      $query .= "\nWHERE " . $this->condition;
    }

    return $query;
  }
}
```
