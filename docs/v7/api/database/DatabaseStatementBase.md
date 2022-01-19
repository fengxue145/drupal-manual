# DatabaseStatementBase
数据库结果集基础对象，继承于 [PDOStatement](https://www.php.net/manual/zh/class.pdostatement.php)。

[DatabaseStatementInterface](./DatabaseStatementInterface) 接口的默认实现。


## $dbh

此结果集的数据库连接对象。

- 类型: [DatabaseConnection](./DatabaseConnection)


## __construct($dbh)

设置数据库连接对象。

参数:
- `$dbh`: [DatabaseConnection](./DatabaseConnection)

    数据库连接对象。


## execute($args, $options)

执行一条预处理语句

参数:
- `$args`: `array`

    预处理语句的参数数组。默认 `[]`

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 `[]`

    详细信息请参阅 [DatabaseConnection::defaultOptions()](./databaseconnection.html#defaultOptions)

返回值: `boolean`


## getQueryString()

获取执行的SQL语句。

返回值: `string`


## fetchCol($index)

以索引数组的形式返回结果集的整个单字段列。

参数:
- `$index`: `number`

    列的索引。默认 `0` 第一个字段

返回值: `array`


## fetchAllAssoc($key, $fetch)

将结果集作为给定字段的关联数组返回。如果给定的键出现多次，后面的记录将覆盖前面的记录。

参数:
- `$key`: `string`

    用于索引的字段的名称。

- `$fetch`: `number`

    结果集的返回值模式。默认 `NULL`，将使用查询的获取模式集。

    如果设置为 `PDO::FETCH_ASSOC` `PDO::FETCH_NUM` `PDO::FETCH_BOTH` 其中一个，返回数组；对于任何其他值，返回对象数组。

返回值: `array`


### fetchAllKeyed($key_index, $value_index)

以单个关联数组的形式返回整个结果集。

参数:
- `$key_index`: `number`

    用作数组键的字段的数字索引。默认 `0` 第一个字段

- `$value_index`: `number`

    用作数组值的字段的数值索引。默认 `1` 第二个字段

返回值: `array`


## fetchField($index)

从结果集中获取下一条记录的单个字段。如果没有下一条记录，则为 `FALSE`。

参数:
- `$index`: `number`

    要返回的字段的数字索引。默认 `0` 第一个字段

返回值: `string` | `false`


## fetchAssoc()

从结果集中获取下一条记录并将其作为关联数组返回。如果没有下一条记录，则为 `FALSE`。

返回值: `array` | `false`



## 源代码
```php
class DatabaseStatementBase extends PDOStatement implements DatabaseStatementInterface {

    /**
     * Reference to the database connection object for this statement.
     *
     * The name $dbh is inherited from PDOStatement.
     *
     * @var DatabaseConnection
     */
    public $dbh;

    protected function __construct($dbh) {
        $this->dbh = $dbh;
        $this->setFetchMode(PDO::FETCH_OBJ);
    }

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

        $return = parent::execute($args);

        if (!empty($logger)) {
            $query_end = microtime(TRUE);
            $logger->log($this, $args, $query_end - $query_start);
        }

        return $return;
    }

    public function getQueryString() {
        return $this->queryString;
    }

    public function fetchCol($index = 0) {
        return $this->fetchAll(PDO::FETCH_COLUMN, $index);
    }

    public function fetchAllAssoc($key, $fetch = NULL) {
        $return = array();
        if (isset($fetch)) {
            if (is_string($fetch)) {
                $this->setFetchMode(PDO::FETCH_CLASS, $fetch);
            }
            else {
                $this->setFetchMode($fetch);
            }
        }

        foreach ($this as $record) {
            $record_key = is_object($record) ? $record->$key : $record[$key];
            $return[$record_key] = $record;
        }

        return $return;
    }

    public function fetchAllKeyed($key_index = 0, $value_index = 1) {
        $return = array();
        $this->setFetchMode(PDO::FETCH_NUM);
        foreach ($this as $record) {
            $return[$record[$key_index]] = $record[$value_index];
        }
        return $return;
    }

    public function fetchField($index = 0) {
        // Call PDOStatement::fetchColumn to fetch the field.
        return $this->fetchColumn($index);
    }

    public function fetchAssoc() {
        // Call PDOStatement::fetch to fetch the row.
        return $this->fetch(PDO::FETCH_ASSOC);
    }
}
```
