# DatabaseStatementInterface

数据库预处理语句结果集接口。

该类中的一些方法被有意注释掉了。由于PHP定义 `PDoStatement` 的方式发生了变化，我们不能为那些在 `5.2.6` 以上版本和更高版本之间工作的方法定义签名。参见：[http://bugs.php.net/bug.php?id=42452](http://bugs.php.net/bug.php?id=42452)


## 实现方式

- 子类应该扩展 [PDOStatement](./pdostatement) 类

    ```php
    class DatabaseStatement_oracle extends PDOStatement implements DatabaseStatementInterface {}
    ```

- 自定义类必须在实现 `DatabaseStatementInterface` 前先实现 `Iterator` 接口

    ```php
    class DatabaseStatement_oracle implements Iterator, DatabaseStatementInterface {}
    ```

## 方法

### execute($args, $options)

执行一条预处理语句

参数:
- `$args`: `array`

    预处理语句的参数数组。默认 `[]`

- `$options`: `array`

    用于控制查询如何运行的关联选项数组。默认 `[]`

    详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: `boolean`


### getQueryString()

获取执行的SQL语句。

返回值: `string`


### rowCount()

返回受最近执行的 `DELETE`、`INSERT` 或 `UPDATE` 语句影响的行数。

详细参见 [PDOStatement::rowCount()](https://www.php.net/manual/zh/pdostatement.rowcount.php)


### setFetchMode($mode, ...)

设置此结果集的默认获取模式。

详细参见 [PDOStatement::setFetchMode()](https://www.php.net/manual/zh/pdostatement.setfetchmode.php)


### fetch($fetch_style, $cursor_orientation, $cursor_offset)

从结果集中获取下一条记录。如果没有下一条记录，则为 `FALSE`。

详细参见 [PDOStatement::fetch()](https://www.php.net/manual/zh/pdostatement.fetch.php)


### fetchField($index)

从结果集中获取下一条记录的单个字段。如果没有下一条记录，则为 `FALSE`。

参数:
- `$index`: `number`

    要返回的字段的数字索引。默认 `0` 第一个字段

返回值: `string` | `false`


### fetchObject($class_name, $ctor_args)

从结果集中获取下一条记录并将其作为对象返回。如果没有下一条记录，则为 `FALSE`。

详细参见 [PDOStatement::fetchObject()](https://www.php.net/manual/zh/pdostatement.fetchobject.php)


### fetchAssoc()

从结果集中获取下一条记录并将其作为关联数组返回。如果没有下一条记录，则为 `FALSE`。

返回值: `array` | `false`


### fetchAll($fetch_style, $fetch_argument, $ctor_args)

返回包含所有结果集行的数组。

详细参见 [PDOStatement::fetchAll()](https://www.php.net/manual/zh/pdostatement.fetchall.php)


### fetchCol($index)

以索引数组的形式返回结果集的整个单字段列。

参数:
- `$index`: `number`

    列的索引。默认 `0` 第一个字段

返回值: `array`


### fetchAllKeyed($key_index, $value_index)

以单个关联数组的形式返回整个结果集。

参数:
- `$key_index`: `number`

    用作数组键的字段的数字索引。默认 `0` 第一个字段

- `$value_index`: `number`

    用作数组值的字段的数值索引。默认 `1` 第二个字段

返回值: `array`


### fetchAllAssoc($key, $fetch)

将结果集作为给定字段的关联数组返回。如果给定的键出现多次，后面的记录将覆盖前面的记录。

参数:
- `$key`: `string`

    用于索引的字段的名称。

- `$fetch`: `number`

    结果集的返回值模式。默认 `NULL`，将使用查询的获取模式集。

    如果设置为 `PDO::FETCH_ASSOC` `PDO::FETCH_NUM` `PDO::FETCH_BOTH` 其中一个，返回数组；对于任何其他值，返回对象数组。

返回值: `array`


## 源代码
```php
interface DatabaseStatementInterface extends Traversable {

  /**
   * Executes a prepared statement
   *
   * @param $args
   *   An array of values with as many elements as there are bound parameters in
   *   the SQL statement being executed.
   * @param $options
   *   An array of options for this query.
   *
   * @return
   *   TRUE on success, or FALSE on failure.
   */
  public function execute($args = array(), $options = array());

  /**
   * Gets the query string of this statement.
   *
   * @return
   *   The query string, in its form with placeholders.
   */
  public function getQueryString();

  /**
   * Returns the number of rows affected by the last SQL statement.
   *
   * @return
   *   The number of rows affected by the last DELETE, INSERT, or UPDATE
   *   statement executed.
   */
  public function rowCount();

  /**
   * Sets the default fetch mode for this statement.
   *
   * See http://php.net/manual/pdo.constants.php for the definition of the
   * constants used.
   *
   * @param $mode
   *   One of the PDO::FETCH_* constants.
   * @param $a1
   *   An option depending of the fetch mode specified by $mode:
   *   - for PDO::FETCH_COLUMN, the index of the column to fetch
   *   - for PDO::FETCH_CLASS, the name of the class to create
   *   - for PDO::FETCH_INTO, the object to add the data to
   * @param $a2
   *   If $mode is PDO::FETCH_CLASS, the optional arguments to pass to the
   *   constructor.
   */
  // public function setFetchMode($mode, $a1 = NULL, $a2 = array());

  /**
   * Fetches the next row from a result set.
   *
   * See http://php.net/manual/pdo.constants.php for the definition of the
   * constants used.
   *
   * @param $mode
   *   One of the PDO::FETCH_* constants.
   *   Default to what was specified by setFetchMode().
   * @param $cursor_orientation
   *   Not implemented in all database drivers, don't use.
   * @param $cursor_offset
   *   Not implemented in all database drivers, don't use.
   *
   * @return
   *   A result, formatted according to $mode.
   */
  // public function fetch($mode = NULL, $cursor_orientation = NULL, $cursor_offset = NULL);

  /**
   * Returns a single field from the next record of a result set.
   *
   * @param $index
   *   The numeric index of the field to return. Defaults to the first field.
   *
   * @return
   *   A single field from the next record, or FALSE if there is no next record.
   */
  public function fetchField($index = 0);

  /**
   * Fetches the next row and returns it as an object.
   *
   * The object will be of the class specified by DatabaseStatementInterface::setFetchMode()
   * or stdClass if not specified.
   */
  // public function fetchObject();

  /**
   * Fetches the next row and returns it as an associative array.
   *
   * This method corresponds to PDOStatement::fetchObject(), but for associative
   * arrays. For some reason PDOStatement does not have a corresponding array
   * helper method, so one is added.
   *
   * @return
   *   An associative array, or FALSE if there is no next row.
   */
  public function fetchAssoc();

  /**
   * Returns an array containing all of the result set rows.
   *
   * @param $mode
   *   One of the PDO::FETCH_* constants.
   * @param $column_index
   *   If $mode is PDO::FETCH_COLUMN, the index of the column to fetch.
   * @param $constructor_arguments
   *   If $mode is PDO::FETCH_CLASS, the arguments to pass to the constructor.
   *
   * @return
   *   An array of results.
   */
  // function fetchAll($mode = NULL, $column_index = NULL, array $constructor_arguments);

  /**
   * Returns an entire single column of a result set as an indexed array.
   *
   * Note that this method will run the result set to the end.
   *
   * @param $index
   *   The index of the column number to fetch.
   *
   * @return
   *   An indexed array, or an empty array if there is no result set.
   */
  public function fetchCol($index = 0);

  /**
   * Returns the entire result set as a single associative array.
   *
   * This method is only useful for two-column result sets. It will return an
   * associative array where the key is one column from the result set and the
   * value is another field. In most cases, the default of the first two columns
   * is appropriate.
   *
   * Note that this method will run the result set to the end.
   *
   * @param $key_index
   *   The numeric index of the field to use as the array key.
   * @param $value_index
   *   The numeric index of the field to use as the array value.
   *
   * @return
   *   An associative array, or an empty array if there is no result set.
   */
  public function fetchAllKeyed($key_index = 0, $value_index = 1);

  /**
   * Returns the result set as an associative array keyed by the given field.
   *
   * If the given key appears multiple times, later records will overwrite
   * earlier ones.
   *
   * @param $key
   *   The name of the field on which to index the array.
   * @param $fetch
   *   The fetchmode to use. If set to PDO::FETCH_ASSOC, PDO::FETCH_NUM, or
   *   PDO::FETCH_BOTH the returned value with be an array of arrays. For any
   *   other value it will be an array of objects. By default, the fetch mode
   *   set for the query will be used.
   *
   * @return
   *   An associative array, or an empty array if there is no result set.
   */
  public function fetchAllAssoc($key, $fetch = NULL);
}
```
