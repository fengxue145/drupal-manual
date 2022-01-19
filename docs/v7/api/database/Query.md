# Query
<Badge>abstract</Badge>

查询生成器的基类。

::: tip
查询构建器使用PHP的 `__toString()` 方法将查询对象编译成一个预先准备好的语句。
:::


## $connection
<Badge>protected</Badge>

当前查询的数据库连接对象。

- 类型: [DatabaseConnection](./DatabaseConnection)


## $connectionTarget
<Badge>protected</Badge>

数据库连接对象的目标。

- 类型: `string`


## $connectionKey
<Badge>protected</Badge>

数据库连接对象的键。

- 类型: `string`


## $queryOptions
<Badge>protected</Badge>

传递给连接对象的查询选项。

- 类型: `array`


## $uniqueIdentifier
<Badge>protected</Badge>

当前查询对象的唯一标识符。

- 类型: `string`


## $nextPlaceholder
<Badge>protected</Badge>

占位符计数器。

- 类型: `int`
- 默认值: `0`


## $comments
<Badge>protected</Badge>

查询注释列表。

- 类型: `array`
- 默认值: `[]`


## __construct(DatabaseConnection $connection, $options)

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)

  数据库连接对象。

- `$options`: `array`

  查询选项。


## __sleep()

序列化时，删除数据库连接对象。

返回值: `string`


## __wakeup()

反序列化时，重新获取数据库连接对象。


## __clone()

重新生成唯一标识符。


## __toString()
<Badge>abstract</Badge>

返回当前的查询语句。

返回值: `string`


## execute()
<Badge>abstract</Badge>
<Badge>protected</Badge>

执行当前查询。


## uniqueIdentifier()

获取当前查询对象的唯一标识符。

返回值: `string`


## nextPlaceholder()

获取此查询对象的下一个占位符值。

返回值: `int`


## comment($comment)

为当前查询添加一个注释。

参数:
- `$comment`: `string`

  注释字符串。

返回值: `this`


## &getComments()

获取当前查询的注释列表。

返回值: `array`



## 源代码
```php
abstract class Query implements QueryPlaceholderInterface {

  /**
   * The connection object on which to run this query.
   *
   * @var DatabaseConnection
   */
  protected $connection;

  /**
   * The target of the connection object.
   *
   * @var string
   */
  protected $connectionTarget;

  /**
   * The key of the connection object.
   *
   * @var string
   */
  protected $connectionKey;

  /**
   * The query options to pass on to the connection object.
   *
   * @var array
   */
  protected $queryOptions;

  /**
   * A unique identifier for this query object.
   */
  protected $uniqueIdentifier;

  /**
   * The placeholder counter.
   */
  protected $nextPlaceholder = 0;

  /**
   * An array of comments that can be prepended to a query.
   *
   * @var array
   */
  protected $comments = array();

  /**
   * Constructs a Query object.
   *
   * @param DatabaseConnection $connection
   *   Database connection object.
   * @param array $options
   *   Array of query options.
   */
  public function __construct(DatabaseConnection $connection, $options) {
    $this->uniqueIdentifier = uniqid('', TRUE);

    $this->connection = $connection;
    $this->connectionKey = $this->connection->getKey();
    $this->connectionTarget = $this->connection->getTarget();

    $this->queryOptions = $options;
  }

  /**
   * Implements the magic __sleep function to disconnect from the database.
   */
  public function __sleep() {
    $keys = get_object_vars($this);
    unset($keys['connection']);
    return array_keys($keys);
  }

  /**
   * Implements the magic __wakeup function to reconnect to the database.
   */
  public function __wakeup() {
    $this->connection = Database::getConnection($this->connectionTarget, $this->connectionKey);
  }

  /**
   * Implements the magic __clone function.
   */
  public function __clone() {
    $this->uniqueIdentifier = uniqid('', TRUE);
  }

  /**
   * Runs the query against the database.
   */
  abstract protected function execute();

  /**
   * Implements PHP magic __toString method to convert the query to a string.
   *
   * The toString operation is how we compile a query object to a prepared
   * statement.
   *
   * @return
   *   A prepared statement query string for this object.
   */
  abstract public function __toString();

  /**
   * Returns a unique identifier for this object.
   */
  public function uniqueIdentifier() {
    return $this->uniqueIdentifier;
  }

  /**
   * Gets the next placeholder value for this query object.
   *
   * @return int
   *   Next placeholder value.
   */
  public function nextPlaceholder() {
    return $this->nextPlaceholder++;
  }

  /**
   * Adds a comment to the query.
   *
   * By adding a comment to a query, you can more easily find it in your
   * query log or the list of active queries on an SQL server. This allows
   * for easier debugging and allows you to more easily find where a query
   * with a performance problem is being generated.
   *
   * The comment string will be sanitized to remove * / and other characters
   * that may terminate the string early so as to avoid SQL injection attacks.
   *
   * @param $comment
   *   The comment string to be inserted into the query.
   *
   * @return Query
   *   The called object.
   */
  public function comment($comment) {
    $this->comments[] = $comment;
    return $this;
  }

  /**
   * Returns a reference to the comments array for the query.
   *
   * Because this method returns by reference, alter hooks may edit the comments
   * array directly to make their changes. If just adding comments, however, the
   * use of comment() is preferred.
   *
   * Note that this method must be called by reference as well:
   * @code
   * $comments =& $query->getComments();
   * @endcode
   *
   * @return
   *   A reference to the comments array structure.
   */
  public function &getComments() {
    return $this->comments;
  }
}
```
