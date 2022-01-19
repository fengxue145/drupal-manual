# DatabaseStatementPrefetch

预处理结果集，实现 [DatabasestatementInterface](./DatabasestatementInterface) 接口。

这个类的行为非常类似于 [PDostatement](https://www.php.net/manual/zh/class.pdostatement.php)，但由于它总是获取每一行，所以可以操纵这些结果。


## $queryString

查询语句。

- 类型: `string`


## $driverOptions

驱动程序特定选项。

- 类型: `array`


## $dbh

此结果集的数据库连接对象。

- 类型: [DatabaseConnection](./DatabaseConnection)


## $data

主要的数据存储。

- 类型: `array`
- 默认值: `[]`


## $currentRow

当前结果集指针指向的行的数据。

- 类型: `array`
- 默认值: `NULL`


## $currentKey

当前结果集指针指向的行的索引值。

- 类型: `int`
- 默认值: `NULL`


## $columnNames

结果集中的列名列表。

- 类型: `array`
- 默认值: `NULL`


## $rowCount

受影响的行数。

- 类型: `int`
- 默认值: `NULL`


## $resultRowCount

结果集数据的总行数。

- 类型: `int`
- 默认值: `0`


## $fetchStyle

保存当前的获取样式(将被下一次获取使用)。

- 类型: `int`
- 默认值: `PDO::FETCH_OBJ`


## $fetchOptions

保存附加的当前获取选项(将被下一次获取使用)。

- 类型: `array`
- 默认值:
  ```php
  array(
    'class' => 'stdClass',
    'constructor_args' => array(),
    'object' => NULL,
    'column' => 0,
  );
  ```


## $defaultFetchStyle

保存默认的获取样式。

- 类型: `int`
- 默认值: `PDO::FETCH_OBJ`


## $defaultFetchOptions

保留附加的默认获取选项。

- 类型: `array`
- 默认值:
  ```php
  array(
    'class' => 'stdClass',
    'constructor_args' => array(),
    'object' => NULL,
    'column' => 0,
  );
  ```


## __construct($connection, $query, $driver_options)

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)

    数据库连接对象。

- `$query`: `string`

    查询语句。

- `$driver_options`: `array`

    驱动程序特定选项。默认 `[]`


## throwPDOException()
<Badge>protected</Badge>

根据最后一个PDO错误抛出一个PDO异常。


## getStatement($query, &$args)
<Badge>protected</Badge>

获取 [PDoStatement](https://www.php.net/manual/zh/class.pdostatement.php) 对象。

::: tip
一些驱动程序(包括 `SQLite`)需要自己做一些准备工作来获得正确的语句。
:::

参数:
- `$query`: `string`

    查询语句。

- `&$args`: `array`

    预处理语句的参数数组。默认 `[]`

返回值: [PDoStatement](https://www.php.net/manual/zh/class.pdostatement.php)


## execute($args, $options)

参见 [DatabasestatementInterface::execute()](./DatabaseStatementInterface.html#execute)


## getQueryString()

参见 [DatabasestatementInterface::execute()](./DatabaseStatementInterface.html#getQueryString)


## setFetchMode($fetchStyle, $a2, $a3)

参见 [DatabasestatementInterface::setFetchMode()](./DatabaseStatementInterface.html#setFetchMode)


## fetch($fetch_style)

参见 [DatabasestatementInterface::fetch()](./DatabaseStatementInterface.html#fetch)


## fetchColumn($index)

同 [fetchField()](#fetchField)


## fetchField($index)

参见 [DatabasestatementInterface::fetchField()](./DatabaseStatementInterface.html#fetchField)


## fetchObject($class_name, $constructor_args)

参见 [DatabasestatementInterface::fetchObject()](./DatabaseStatementInterface.html#fetchObject)


## fetchAssoc()

参见 [DatabasestatementInterface::fetchAssoc()](./DatabaseStatementInterface.html#fetchAssoc)


## fetchAll($fetch_style, $fetch_column, $ctor_args)

参见 [DatabasestatementInterface::fetchAll()](./DatabaseStatementInterface.html#fetchAll)


## fetchCol($index)

参见 [DatabasestatementInterface::fetchCol()](./DatabaseStatementInterface.html#fetchCol)


## fetchAllKeyed($key_index, $value_index)

参见 [DatabasestatementInterface::fetchAllKeyed()](./DatabaseStatementInterface.html#fetchAllKeyed)


## fetchAllAssoc($key, $fetch_style)

参见 [DatabasestatementInterface::fetchAllAssoc()](./DatabaseStatementInterface.html#fetchAllAssoc)


## current()

返回根据当前获取样式格式化的当前行。

返回值: `mixed`


## key()

获取当前结果集指针的行号。

返回值: `int`


## rewind()

什么都不做，结果集无法回退。


## next()

将结果集指针指向下一行。


## valid()

判断结果集中是否还有下一行。

返回值: `boolean`


## rowCount()

返回结果集总行数。

返回值: `int`



## 源代码
```php
class DatabaseStatementPrefetch implements Iterator, DatabaseStatementInterface {

    /**
     * The query string.
     *
     * @var string
     */
    protected $queryString;

    /**
     * Driver-specific options. Can be used by child classes.
     *
     * @var Array
     */
    protected $driverOptions;

    /**
     * Reference to the database connection object for this statement.
     *
     * The name $dbh is inherited from PDOStatement.
     *
     * @var DatabaseConnection
     */
    public $dbh;

    /**
     * Main data store.
     *
     * @var Array
     */
    protected $data = array();

    /**
     * The current row, retrieved in PDO::FETCH_ASSOC format.
     *
     * @var Array
     */
    protected $currentRow = NULL;

    /**
     * The key of the current row.
     *
     * @var int
     */
    protected $currentKey = NULL;

    /**
     * The list of column names in this result set.
     *
     * @var Array
     */
    protected $columnNames = NULL;

    /**
     * The number of rows affected by the last query.
     *
     * @var int
     */
    protected $rowCount = NULL;

    /**
     * The number of rows in this result set.
     *
     * @var int
     */
    protected $resultRowCount = 0;

    /**
     * Holds the current fetch style (which will be used by the next fetch).
     * @see PDOStatement::fetch()
     *
     * @var int
     */
    protected $fetchStyle = PDO::FETCH_OBJ;

    /**
     * Holds supplementary current fetch options (which will be used by the next fetch).
     *
     * @var Array
     */
    protected $fetchOptions = array(
        'class' => 'stdClass',
        'constructor_args' => array(),
        'object' => NULL,
        'column' => 0,
    );

    /**
     * Holds the default fetch style.
     *
     * @var int
     */
    protected $defaultFetchStyle = PDO::FETCH_OBJ;

    /**
     * Holds supplementary default fetch options.
     *
     * @var Array
     */
    protected $defaultFetchOptions = array(
        'class' => 'stdClass',
        'constructor_args' => array(),
        'object' => NULL,
        'column' => 0,
    );

    public function __construct(DatabaseConnection $connection, $query, array $driver_options = array()) {
        $this->dbh = $connection;
        $this->queryString = $query;
        $this->driverOptions = $driver_options;
    }

    /**
     * Executes a prepared statement.
     *
     * @param $args
     *   An array of values with as many elements as there are bound parameters in the SQL statement being executed.
     * @param $options
     *   An array of options for this query.
     * @return
     *   TRUE on success, or FALSE on failure.
     */
    public function execute($args = array(), $options = array()) {
        if (isset($options['fetch'])) {
            if (is_string($options['fetch'])) {
                // Default to an object. Note: db fields will be added to the object
                // before the constructor is run. If you need to assign fields after
                // the constructor is run, see http://drupal.org/node/315092.
                $this->setFetchMode(PDO::FETCH_CLASS, $options['fetch']);
            }
            else {
                $this->setFetchMode($options['fetch']);
            }
        }

        $logger = $this->dbh->getLogger();
        if (!empty($logger)) {
            $query_start = microtime(TRUE);
        }

        // Prepare the query.
        $statement = $this->getStatement($this->queryString, $args);
        if (!$statement) {
            $this->throwPDOException();
        }

        $return = $statement->execute($args);
        if (!$return) {
            $this->throwPDOException();
        }

        // Fetch all the data from the reply, in order to release any lock
        // as soon as possible.
        $this->rowCount = $statement->rowCount();
        $this->data = $statement->fetchAll(PDO::FETCH_ASSOC);
        // Destroy the statement as soon as possible. See
        // DatabaseConnection_sqlite::PDOPrepare() for explanation.
        unset($statement);

        $this->resultRowCount = count($this->data);

        if ($this->resultRowCount) {
            $this->columnNames = array_keys($this->data[0]);
        }
        else {
            $this->columnNames = array();
        }

        if (!empty($logger)) {
            $query_end = microtime(TRUE);
            $logger->log($this, $args, $query_end - $query_start);
        }

        // Initialize the first row in $this->currentRow.
        $this->next();

        return $return;
    }

    /**
     * Throw a PDO Exception based on the last PDO error.
     */
    protected function throwPDOException() {
        $error_info = $this->dbh->errorInfo();
        // We rebuild a message formatted in the same way as PDO.
        $exception = new PDOException("SQLSTATE[" . $error_info[0] . "]: General error " . $error_info[1] . ": " . $error_info[2]);
        $exception->errorInfo = $error_info;
        throw $exception;
    }

    /**
     * Grab a PDOStatement object from a given query and its arguments.
     *
     * Some drivers (including SQLite) will need to perform some preparation
     * themselves to get the statement right.
     *
     * @param $query
     *   The query.
     * @param array $args
     *   An array of arguments.
     * @return PDOStatement
     *   A PDOStatement object.
     */
    protected function getStatement($query, &$args = array()) {
        return $this->dbh->prepare($query);
    }

    /**
     * Return the object's SQL query string.
     */
    public function getQueryString() {
        return $this->queryString;
    }

    /**
     * @see PDOStatement::setFetchMode()
     */
    public function setFetchMode($fetchStyle, $a2 = NULL, $a3 = NULL) {
        $this->defaultFetchStyle = $fetchStyle;
        switch ($fetchStyle) {
            case PDO::FETCH_CLASS:
                $this->defaultFetchOptions['class'] = $a2;
                if ($a3) {
                    $this->defaultFetchOptions['constructor_args'] = $a3;
                }
                break;
            case PDO::FETCH_COLUMN:
                $this->defaultFetchOptions['column'] = $a2;
                break;
            case PDO::FETCH_INTO:
                $this->defaultFetchOptions['object'] = $a2;
                break;
        }

        // Set the values for the next fetch.
        $this->fetchStyle = $this->defaultFetchStyle;
        $this->fetchOptions = $this->defaultFetchOptions;
    }

    /**
     * Return the current row formatted according to the current fetch style.
     *
     * This is the core method of this class. It grabs the value at the current
     * array position in $this->data and format it according to $this->fetchStyle
     * and $this->fetchMode.
     *
     * @return
     *  The current row formatted as requested.
     */
    public function current() {
        if (isset($this->currentRow)) {
            switch ($this->fetchStyle) {
                case PDO::FETCH_ASSOC:
                    return $this->currentRow;
                case PDO::FETCH_BOTH:
                    // PDO::FETCH_BOTH returns an array indexed by both the column name
                    // and the column number.
                    return $this->currentRow + array_values($this->currentRow);
                case PDO::FETCH_NUM:
                    return array_values($this->currentRow);
                case PDO::FETCH_LAZY:
                // We do not do lazy as everything is fetched already. Fallback to
                // PDO::FETCH_OBJ.
                case PDO::FETCH_OBJ:
                    return (object) $this->currentRow;
                case PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE:
                    name = array_unshift($this->currentRow);
                // Deliberate no break.
                case PDO::FETCH_CLASS:
                    if (!isset($class_name)) {
                        $class_name = $this->fetchOptions['class'];
                    }
                    if (count($this->fetchOptions['constructor_args'])) {
                        $reflector = new ReflectionClass($class_name);
                        $result = $reflector->newInstanceArgs($this->fetchOptions['constructor_args']);
                    }
                    else {
                        $result = new $class_name();
                    }
                    foreach ($this->currentRow as $k => $v) {
                        $result->$k = $v;
                    }
                    return $result;
                case PDO::FETCH_INTO:
                    foreach ($this->currentRow as $k => $v) {
                        $this->fetchOptions['object']->$k = $v;
                    }
                    return $this->fetchOptions['object'];
                case PDO::FETCH_COLUMN:
                    if (isset($this->columnNames[$this->fetchOptions['column']])) {
                        return $this->currentRow[$k][$this->columnNames[$this->fetchOptions['column']]];
                    }
                    else {
                        return;
                    }
            }
        }
    }

    /* Implementations of Iterator. */

    public function key() {
        return $this->currentKey;
    }

    public function rewind() {
        // Nothing to do: our DatabaseStatement can't be rewound.
    }

    public function next() {
        if (!empty($this->data)) {
            $this->currentRow = reset($this->data);
            $this->currentKey = key($this->data);
            unset($this->data[$this->currentKey]);
        }
        else {
            $this->currentRow = NULL;
        }
    }

    public function valid() {
        return isset($this->currentRow);
    }

    /* Implementations of DatabaseStatementInterface. */

    public function rowCount() {
        return $this->rowCount;
    }

    public function fetch($fetch_style = NULL, $cursor_orientation = PDO::FETCH_ORI_NEXT, $cursor_offset = NULL) {
        if (isset($this->currentRow)) {
            // Set the fetch parameter.
            $this->fetchStyle = isset($fetch_style) ? $fetch_style : $this->defaultFetchStyle;
            $this->fetchOptions = $this->defaultFetchOptions;

            // Grab the row in the format specified above.
            $return = $this->current();
            // Advance the cursor.
            $this->next();

            // Reset the fetch parameters to the value stored using setFetchMode().
            $this->fetchStyle = $this->defaultFetchStyle;
            $this->fetchOptions = $this->defaultFetchOptions;
            return $return;
        }
        else {
            return FALSE;
        }
    }

    public function fetchColumn($index = 0) {
        if (isset($this->currentRow) && isset($this->columnNames[$index])) {
            // We grab the value directly from $this->data, and format it.
            $return = $this->currentRow[$this->columnNames[$index]];
            $this->next();
            return $return;
        }
        else {
            return FALSE;
        }
    }

    public function fetchField($index = 0) {
        return $this->fetchColumn($index);
    }

    public function fetchObject($class_name = NULL, $constructor_args = array()) {
        if (isset($this->currentRow)) {
            if (!isset($class_name)) {
                // Directly cast to an object to avoid a function call.
                $result = (object) $this->currentRow;
            }
            else {
                $this->fetchStyle = PDO::FETCH_CLASS;
                $this->fetchOptions = array('constructor_args' => $constructor_args);
                // Grab the row in the format specified above.
                $result = $this->current();
                // Reset the fetch parameters to the value stored using setFetchMode().
                $this->fetchStyle = $this->defaultFetchStyle;
                $this->fetchOptions = $this->defaultFetchOptions;
            }

            $this->next();

            return $result;
        }
        else {
            return FALSE;
        }
    }

    public function fetchAssoc() {
        if (isset($this->currentRow)) {
            $result = $this->currentRow;
            $this->next();
            return $result;
        }
        else {
            return FALSE;
        }
    }

    public function fetchAll($fetch_style = NULL, $fetch_column = NULL, $constructor_args = NULL) {
        $this->fetchStyle = isset($fetch_style) ? $fetch_style : $this->defaultFetchStyle;
        $this->fetchOptions = $this->defaultFetchOptions;
        if (isset($fetch_column)) {
            $this->fetchOptions['column'] = $fetch_column;
        }
        if (isset($constructor_args)) {
            $this->fetchOptions['constructor_args'] = $constructor_args;
        }

        $result = array();
        // Traverse the array as PHP would have done.
        while (isset($this->currentRow)) {
            // Grab the row in the format specified above.
            $result[] = $this->current();
            $this->next();
        }

        // Reset the fetch parameters to the value stored using setFetchMode().
        $this->fetchStyle = $this->defaultFetchStyle;
        $this->fetchOptions = $this->defaultFetchOptions;
        return $result;
    }

    public function fetchCol($index = 0) {
        if (isset($this->columnNames[$index])) {
            $column = $this->columnNames[$index];
            $result = array();
            // Traverse the array as PHP would have done.
            while (isset($this->currentRow)) {
                $result[] = $this->currentRow[$this->columnNames[$index]];
                $this->next();
            }
            return $result;
        }
        else {
            return array();
        }
    }

    public function fetchAllKeyed($key_index = 0, $value_index = 1) {
        if (!isset($this->columnNames[$key_index]) || !isset($this->columnNames[$value_index]))
            return array();

        $key = $this->columnNames[$key_index];
        $value = $this->columnNames[$value_index];

        $result = array();
        // Traverse the array as PHP would have done.
        while (isset($this->currentRow)) {
            $result[$this->currentRow[$key]] = $this->currentRow[$value];
            $this->next();
        }
        return $result;
    }

    public function fetchAllAssoc($key, $fetch_style = NULL) {
        $this->fetchStyle = isset($fetch_style) ? $fetch_style : $this->defaultFetchStyle;
        $this->fetchOptions = $this->defaultFetchOptions;

        $result = array();
        // Traverse the array as PHP would have done.
        while (isset($this->currentRow)) {
            // Grab the row in its raw PDO::FETCH_ASSOC format.
            $row = $this->currentRow;
            // Grab the row in the format specified above.
            $result_row = $this->current();
            $result[$this->currentRow[$key]] = $result_row;
            $this->next();
        }

        // Reset the fetch parameters to the value stored using setFetchMode().
        $this->fetchStyle = $this->defaultFetchStyle;
        $this->fetchOptions = $this->defaultFetchOptions;
        return $result;
    }

}
```
