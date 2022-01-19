# DatabaseLog
数据库查询日志记录器。


## $queryLog
<Badge>protected</Badge>

SQL查询记录列表。

- 类型: `array`
- 默认值: `[]`

```php
array(
    $logging_key = array(
        array(
            query  => '',       // SQL语句字符串
            args   => array(),  // 预处理参数数组
            caller => array(),  // 最近的调用栈
            target => '',       // 目标数据库
            time   => 0         // SQL执行所花费的时间
        ),
        ...
    ),
);
```


## $connectionKey
<Badge>protected</Badge>

数据库连接 `key`。

- 类型: `string`
- 默认值: `default`


## __construct($key)

参数:
- `$key`: `string`

    要启用日志记录的数据库连接 `key`。默认 `default`


## start($logging_key)

开始日志记录。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。通过指定不同的日志记录键，我们能够同时启动和停止多个日志记录运行，而不会发生碰撞。


## get($logging_key)

获取到目前为止记录的查询日志。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## clear($logging_key)

清空查询日志。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## end($logging_key)

停止日志记录。

参数:
- `$logging_key`: `string`

    此日志请求的标识键。


## log($statement, $args, $time)

记录对所有活动日志键的查询。

参数:
- `$statement`: [DatabaseStatementInterface](./DatabaseStatementInterface)

    数据库结果集对象。

- `$args`: `array`

    预处理参数数组。

- `$time`: `number`

    执行查询所花费的时间(以毫秒为单位)。


## findCaller()

返回调用此查询的执行栈。

返回值: `array`


## 演示
```php
Database::startLog('testing');

db_query('SELECT name FROM {test} WHERE age > :age', array(':age' => 25))->fetchCol();
db_query('SELECT age FROM {test} WHERE name = :name', array(':name' => 'Ringo'))->fetchCol();

// Trigger a call that does not have file in the backtrace.
call_user_func_array('db_query', array('SELECT age FROM {test} WHERE name = :name', array(':name' => 'Ringo')))->fetchCol();

$queries = Database::getLog('testing', 'default');
if (count($queries) === 3) {
    echo "Correct number of queries recorded.";
}
```


## 源代码
```php
class DatabaseLog {

    /**
     * Cache of logged queries. This will only be used if the query logger is enabled.
     *
     * The structure for the logging array is as follows:
     *
     * array(
     *   $logging_key = array(
     *     array(query => '', args => array(), caller => '', target => '', time => 0),
     *     array(query => '', args => array(), caller => '', target => '', time => 0),
     *   ),
     * );
     *
     * @var array
     */
    protected $queryLog = array();

    /**
     * The connection key for which this object is logging.
     *
     * @var string
     */
    protected $connectionKey = 'default';

    /**
     * Constructor.
     *
     * @param $key
     *   The database connection key for which to enable logging.
     */
    public function __construct($key = 'default') {
        $this->connectionKey = $key;
    }

    /**
     * Begin logging queries to the specified connection and logging key.
     *
     * If the specified logging key is already running this method does nothing.
     *
     * @param $logging_key
     *   The identification key for this log request. By specifying different
     *   logging keys we are able to start and stop multiple logging runs
     *   simultaneously without them colliding.
     */
    public function start($logging_key) {
        if (empty($this->queryLog[$logging_key])) {
            $this->clear($logging_key);
        }
    }

    /**
     * Retrieve the query log for the specified logging key so far.
     *
     * @param $logging_key
     *   The logging key to fetch.
     * @return
     *   An indexed array of all query records for this logging key.
     */
    public function get($logging_key) {
        return $this->queryLog[$logging_key];
    }

    /**
     * Empty the query log for the specified logging key.
     *
     * This method does not stop logging, it simply clears the log. To stop
     * logging, use the end() method.
     *
     * @param $logging_key
     *   The logging key to empty.
     */
    public function clear($logging_key) {
        $this->queryLog[$logging_key] = array();
    }

    /**
     * Stop logging for the specified logging key.
     *
     * @param $logging_key
     *   The logging key to stop.
     */
    public function end($logging_key) {
        unset($this->queryLog[$logging_key]);
    }

    /**
     * Log a query to all active logging keys.
     *
     * @param $statement
     *   The prepared statement object to log.
     * @param $args
     *   The arguments passed to the statement object.
     * @param $time
     *   The time in milliseconds the query took to execute.
     */
    public function log(DatabaseStatementInterface $statement, $args, $time) {
        foreach (array_keys($this->queryLog) as $key) {
            $this->queryLog[$key][] = array(
                'query' => $statement->getQueryString(),
                'args' => $args,
                'target' => $statement->dbh->getTarget(),
                'caller' => $this->findCaller(),
                'time' => $time,
            );
        }
    }

    /**
     * Determine the routine that called this query.
     *
     * We define "the routine that called this query" as the first entry in
     * the call stack that is not inside includes/database and does have a file
     * (which excludes call_user_func_array(), anonymous functions and similar).
     * That makes the climbing logic very simple, and handles the variable stack
     * depth caused by the query builders.
     *
     * @link http://www.php.net/debug_backtrace
     * @return
     *   This method returns a stack trace entry similar to that generated by
     *   debug_backtrace(). However, it flattens the trace entry and the trace
     *   entry before it so that we get the function and args of the function that
     *   called into the database system, not the function and args of the
     *   database call itself.
     */
    public function findCaller() {
        $stack = debug_backtrace();
        $stack_count = count($stack);
        for ($i = 0; $i < $stack_count; ++$i) {
            if (!empty($stack[$i]['file']) && strpos($stack[$i]['file'], 'includes' . DIRECTORY_SEPARATOR . 'database') === FALSE) {
                $stack[$i] += array('args' => array());
                return array(
                    'file' => $stack[$i]['file'],
                    'line' => $stack[$i]['line'],
                    'function' => $stack[$i + 1]['function'],
                    'class' => isset($stack[$i + 1]['class']) ? $stack[$i + 1]['class'] : NULL,
                    'type' => isset($stack[$i + 1]['type']) ? $stack[$i + 1]['type'] : NULL,
                    'args' => $stack[$i + 1]['args'],
                );
            }
        }
    }
}
```