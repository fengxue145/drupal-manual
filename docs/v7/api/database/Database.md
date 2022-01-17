# Database
<Badge>abstract</Badge>

数据库系统的主要控制器。

这个类是不可实例化和不可扩展的。 它的作用是将所有数据库连接的控制和引导封装到单个位置，而不使用全局变量。


## CONST
- `RETURN_NULL`: `0`

指示一个没有合理返回值的查询返回 `NULL`。

- `RETURN_STATEMENT`: `1`

指示查询返回结果集对象。

- `RETURN_AFFECTED`: `2`

指示查询返回受影响的行数。

- `RETURN_INSERT_ID`: `3`

指示查询返回最后插入的ID。


## $connections
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

所有活动数据库连接的数组。它的键名是数据库名称和目标。

```php
array(
    $db_key => array(
        $db_target => DatabaseConnection object.
    )
)
```


## $databaseInfo
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `NULL`

数据库连接信息。来自 `settings.php` 的数据库连接信息的已处理副本。


## $ignoreTargets
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

可以忽略的数据库目标列表。


## $activeKey
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `string`
- 默认值: `default`

当前活动的数据库连接的键。


## $logs
<Badge>static</Badge>
<Badge>protected</Badge>

- 类型: `array`
- 默认值: `[]`

活动的查询日志对象数组。

```php
array(
    $db_key => DatabaseLog object.
);
```


## startLog($logging_key, $key)
<Badge>final</Badge>
<Badge>static</Badge>

在指定的连接上开始日志记录。

参数:
- `$logging_key`: `string`

    日志请求的标识键。

- `$key`: `string`

    要启用日志记录的数据库连接键。默认 `default`

返回值: [DatabaseLog](./databaselog)


## getLog($logging_key, $key)
<Badge>final</Badge>
<Badge>static</Badge>

获取指定连接已记录的查询日志。

参数:
- `$logging_key`: `string`

    日志请求的标识键。

- `$key`: `string`

    要启用日志记录的数据库连键。默认 `default`

返回值: `array`

更多详细参见 [DatabaseLog::$queryLog](./databaselog.html#querylog)


## getConnection($target, $key)
<Badge>final</Badge>
<Badge>static</Badge>

获取一个数据库连接对象。

参数:
- `$target`: `string`

    数据库目标。默认 `default`

- `$key`: `string`

    数据库连接键。默认 `NULL`，表示活动键。

返回值: [DatabaseConnection](./databaseconnection)


## isActiveConnection()
<Badge>final</Badge>
<Badge>static</Badge>

判断是否有活动连接。

返回值: `boolean`


## setActiveConnection($key)
<Badge>final</Badge>
<Badge>static</Badge>

设置默认数据库连接。如果成功，则返回旧的数据库连接键。

参数:
- `$key`: `string`

    数据库连接键。默认 `default`

返回值: `string` | `null`

```php
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('extra', 'default', $connection_info['default']);

echo Database::setActiveConnection('extra'); // default
```


## parseConnectionInfo()
<Badge>final</Badge>
<Badge>static</Badge>

处理数据库信息的配置文件 `settings.php`。


## addConnectionInfo($key, $target, $info)
<Badge>static</Badge>

添加一个数据库连接信息。

参数:
- `$key`: `string`

    数据库连接键。

- `$target`: `string`

    数据库目标。

- `$info`: `array`

    数据库连接信息。

```php
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('default', 'slave', $connection_info['default']);
```


## getConnectionInfo($key)
<Badge>final</Badge>
<Badge>static</Badge>

获取指定数据库的连接信息。

参数:
- `$key`: `string`

    数据库连接键。默认 `default`

返回值: `string`

```php
$connectionInfo = Database::getConnectionInfo('default');
```


## renameConnection($old_key, $new_key)
<Badge>final</Badge>
<Badge>static</Badge>

重命名数据库连接，并更新其连接信息。

参数:
- `$old_key`: `string`

    旧的数据库连接键。

- `$new_key`: `string`

    新的数据库连接键。

返回值: `boolean`

```php
Database::renameConnection('default', 'slave');
```


## removeConnection($key, $close)
<Badge>final</Badge>
<Badge>static</Badge>

关闭数据库连接，并删除其连接信息。

参数:
- `$key`: `string`

    数据库连接键。

- `$close`: `boolean`

    是否关闭连接。默认 `TRUE`

返回值: `boolean`

```php
Database::removeConnection('default');
```


## openConnection($key, $target)
<Badge>final</Badge>
<Badge>static</Badge>
<Badge>protected</Badge>

打开一个指定数据库连接。

参数:
- `$key`: `string`

    数据库连接键，在 `settings.php` 中指定。默认 `default`

- `$target`: `string`

    要打开的数据库目标。


## closeConnection($target = NULL, $key = NULL)
<Badge>final</Badge>
<Badge>static</Badge>

关闭指定的数据库连接。

参数:
- `$target`: `string`

    数据库目标名称。默认 `NULL`，表示关闭所有目标连接。

- `$key`: `string`

    数据库连接键。默认 `NULL`，表示活动键。

```php
$db1 = Database::getConnection('default', 'default');

// 尝试关闭默认连接，然后打开一个新的连接。
Database::closeConnection('default', 'default');
$db2 = Database::getConnection('default', 'default');

if ($db1 !== $db2) {
    echo "Opening the default connection after it is closed returns a new object.";
}
```


## ignoreTarget($key, $target)修改文案：

<Badge>final</Badge>
<Badge>static</Badge>

指定需要忽略的数据库目标。被忽略的目标始终会返回 `default`。

参数:
- `$key`: `string`

    数据库连接键。

- `$target`: `string`

    需要忽略的数据库目标名称。

```php {5}
// 获取默认连接信息，并添加一个新连接
$connection_info = Database::getConnectionInfo('default');
Database::addConnectionInfo('default', 'slave', $connection_info['default']);

Database::ignoreTarget('default', 'slave');

$db1 = Database::getConnection('default', 'default');
$db2 = Database::getConnection('slave', 'default');

if ($db1 === $db2) {
    echo "Both targets refer to the same connection.";
}
```


## loadDriverFile($driver, array $files = array())
<Badge>final</Badge>
<Badge>static</Badge>

加载数据库驱动文件。

参数:
- `$driver`: `string`

    数据库驱动名称。

- `$files`: `array`

    驱动文件列表。相对于 `includes/database` 或 `includes/database/{$driver}`目录。

```php
// 目录结构
├── includes
│   ├── database
│   │   ├── query.inc
│   │   ├── select.inc
│   │   ├── mysql
│   │   │   └── query.inc

Database::loadDriverFile('mysql', array('query.inc', 'select.inc'))
// 加载顺序如下：
// includes/database/query.inc
// includes/database/mysql/query.inc
// includes/database/select.inc
```


## 源代码
```php
abstract class Database {

    /**
     * Flag to indicate a query call should simply return NULL.
     *
     * This is used for queries that have no reasonable return value anyway, such
     * as INSERT statements to a table without a serial primary key.
     */
    const RETURN_NULL = 0;

    /**
     * Flag to indicate a query call should return the prepared statement.
     */
    const RETURN_STATEMENT = 1;

    /**
     * Flag to indicate a query call should return the number of affected rows.
     */
    const RETURN_AFFECTED = 2;

    /**
     * Flag to indicate a query call should return the "last insert id".
     */
    const RETURN_INSERT_ID = 3;

    /**
     * An nested array of all active connections. It is keyed by database name
     * and target.
     *
     * @var array
     */
    static protected $connections = array();

    /**
     * A processed copy of the database connection information from settings.php.
     *
     * @var array
     */
    static protected $databaseInfo = NULL;

    /**
     * A list of key/target credentials to simply ignore.
     *
     * @var array
     */
    static protected $ignoreTargets = array();

    /**
     * The key of the currently active database connection.
     *
     * @var string
     */
    static protected $activeKey = 'default';

    /**
     * An array of active query log objects.
     *
     * Every connection has one and only one logger object for all targets and
     * logging keys.
     *
     * array(
     *   '$db_key' => DatabaseLog object.
     * );
     *
     * @var array
     */
    static protected $logs = array();

    /**
     * Starts logging a given logging key on the specified connection.
     *
     * @param $logging_key
     *   The logging key to log.
     * @param $key
     *   The database connection key for which we want to log.
     *
     * @return DatabaseLog
     *   The query log object. Note that the log object does support richer
     *   methods than the few exposed through the Database class, so in some
     *   cases it may be desirable to access it directly.
     *
     * @see DatabaseLog
     */
    final public static function startLog($logging_key, $key = 'default') {
        if (empty(self::$logs[$key])) {
            self::$logs[$key] = new DatabaseLog($key);

            // Every target already active for this connection key needs to have the
            // logging object associated with it.
            if (!empty(self::$connections[$key])) {
                foreach (self::$connections[$key] as $connection) {
                    $connection->setLogger(self::$logs[$key]);
                }
            }
        }

        self::$logs[$key]->start($logging_key);
        return self::$logs[$key];
    }

    /**
     * Retrieves the queries logged on for given logging key.
     *
     * This method also ends logging for the specified key. To get the query log
     * to date without ending the logger request the logging object by starting
     * it again (which does nothing to an open log key) and call methods on it as
     * desired.
     *
     * @param $logging_key
     *   The logging key to log.
     * @param $key
     *   The database connection key for which we want to log.
     *
     * @return array
     *   The query log for the specified logging key and connection.
     *
     * @see DatabaseLog
     */
    final public static function getLog($logging_key, $key = 'default') {
        if (empty(self::$logs[$key])) {
            return NULL;
        }
        $queries = self::$logs[$key]->get($logging_key);
        self::$logs[$key]->end($logging_key);
        return $queries;
    }

    /**
     * Gets the connection object for the specified database key and target.
     *
     * @param $target
     *   The database target name.
     * @param $key
     *   The database connection key. Defaults to NULL which means the active key.
     *
     * @return DatabaseConnection
     *   The corresponding connection object.
     */
    final public static function getConnection($target = 'default', $key = NULL) {
        if (!isset($key)) {
            // By default, we want the active connection, set in setActiveConnection.
            $key = self::$activeKey;
        }
        // If the requested target does not exist, or if it is ignored, we fall back
        // to the default target. The target is typically either "default" or
        // "slave", indicating to use a slave SQL server if one is available. If
        // it's not available, then the default/master server is the correct server
        // to use.
        if (!empty(self::$ignoreTargets[$key][$target]) || !isset(self::$databaseInfo[$key][$target])) {
            $target = 'default';
        }

        if (!isset(self::$connections[$key][$target])) {
            // If necessary, a new connection is opened.
            self::$connections[$key][$target] = self::openConnection($key, $target);
        }
        return self::$connections[$key][$target];
    }

    /**
     * Determines if there is an active connection.
     *
     * Note that this method will return FALSE if no connection has been
     * established yet, even if one could be.
     *
     * @return
     *   TRUE if there is at least one database connection established, FALSE
     *   otherwise.
     */
    final public static function isActiveConnection() {
        return !empty(self::$activeKey) && !empty(self::$connections) && !empty(self::$connections[self::$activeKey]);
    }

    /**
     * Sets the active connection to the specified key.
     *
     * @return
     *   The previous database connection key.
     */
    final public static function setActiveConnection($key = 'default') {
        if (empty(self::$databaseInfo)) {
            self::parseConnectionInfo();
        }

        if (!empty(self::$databaseInfo[$key])) {
            $old_key = self::$activeKey;
            self::$activeKey = $key;
            return $old_key;
        }
    }

    /**
     * Process the configuration file for database information.
     */
    final public static function parseConnectionInfo() {
        global $databases;

        $database_info = is_array($databases) ? $databases : array();
        foreach ($database_info as $index => $info) {
            foreach ($database_info[$index] as $target => $value) {
                // If there is no "driver" property, then we assume it's an array of
                // possible connections for this target. Pick one at random. That allows
                //  us to have, for example, multiple slave servers.
                if (empty($value['driver'])) {
                    $database_info[$index][$target] = $database_info[$index][$target][mt_rand(0, count($database_info[$index][$target]) - 1)];
                }

                // Parse the prefix information.
                if (!isset($database_info[$index][$target]['prefix'])) {
                    // Default to an empty prefix.
                    $database_info[$index][$target]['prefix'] = array(
                        'default' => '',
                    );
                }
                elseif (!is_array($database_info[$index][$target]['prefix'])) {
                    // Transform the flat form into an array form.
                    $database_info[$index][$target]['prefix'] = array(
                        'default' => $database_info[$index][$target]['prefix'],
                    );
                }
            }
        }

        if (!is_array(self::$databaseInfo)) {
            self::$databaseInfo = $database_info;
        }

        // Merge the new $database_info into the existing.
        // array_merge_recursive() cannot be used, as it would make multiple
        // database, user, and password keys in the same database array.
        else {
            foreach ($database_info as $database_key => $database_values) {
                foreach ($database_values as $target => $target_values) {
                    self::$databaseInfo[$database_key][$target] = $target_values;
                }
            }
        }
    }

    /**
     * Adds database connection information for a given key/target.
     *
     * This method allows the addition of new connection credentials at runtime.
     * Under normal circumstances the preferred way to specify database
     * credentials is via settings.php. However, this method allows them to be
     * added at arbitrary times, such as during unit tests, when connecting to
     * admin-defined third party databases, etc.
     *
     * If the given key/target pair already exists, this method will be ignored.
     *
     * @param $key
     *   The database key.
     * @param $target
     *   The database target name.
     * @param $info
     *   The database connection information, as it would be defined in
     *   settings.php. Note that the structure of this array will depend on the
     *   database driver it is connecting to.
     */
    public static function addConnectionInfo($key, $target, $info) {
        if (empty(self::$databaseInfo[$key][$target])) {
            self::$databaseInfo[$key][$target] = $info;
        }
    }

    /**
     * Gets information on the specified database connection.
     *
     * @param $connection
     *   The connection key for which we want information.
     */
    final public static function getConnectionInfo($key = 'default') {
        if (empty(self::$databaseInfo)) {
            self::parseConnectionInfo();
        }

        if (!empty(self::$databaseInfo[$key])) {
            return self::$databaseInfo[$key];
        }
    }

    /**
     * Rename a connection and its corresponding connection information.
     *
     * @param $old_key
     *   The old connection key.
     * @param $new_key
     *   The new connection key.
     * @return
     *   TRUE in case of success, FALSE otherwise.
     */
    final public static function renameConnection($old_key, $new_key) {
        if (empty(self::$databaseInfo)) {
            self::parseConnectionInfo();
        }

        if (!empty(self::$databaseInfo[$old_key]) && empty(self::$databaseInfo[$new_key])) {
            // Migrate the database connection information.
            self::$databaseInfo[$new_key] = self::$databaseInfo[$old_key];
            unset(self::$databaseInfo[$old_key]);

            // Migrate over the DatabaseConnection object if it exists.
            if (isset(self::$connections[$old_key])) {
                self::$connections[$new_key] = self::$connections[$old_key];
                unset(self::$connections[$old_key]);
            }

            return TRUE;
        }
        else {
            return FALSE;
        }
    }

    /**
     * Remove a connection and its corresponding connection information.
     *
     * @param $key
     *   The connection key.
     * @param $close
     *   Whether to close the connection.
     * @return
     *   TRUE in case of success, FALSE otherwise.
     */
    final public static function removeConnection($key, $close = TRUE) {
        if (isset(self::$databaseInfo[$key])) {
            if ($close) {
                self::closeConnection(NULL, $key);
            }
            unset(self::$databaseInfo[$key]);
            return TRUE;
        }
        else {
            return FALSE;
        }
    }

    /**
     * Opens a connection to the server specified by the given key and target.
     *
     * @param $key
     *   The database connection key, as specified in settings.php. The default is
     *   "default".
     * @param $target
     *   The database target to open.
     *
     * @throws DatabaseConnectionNotDefinedException
     * @throws DatabaseDriverNotSpecifiedException
     */
    final protected static function openConnection($key, $target) {
        if (empty(self::$databaseInfo)) {
            self::parseConnectionInfo();
        }

        // If the requested database does not exist then it is an unrecoverable
        // error.
        if (!isset(self::$databaseInfo[$key])) {
            throw new DatabaseConnectionNotDefinedException('The specified database connection is not defined: ' . $key);
        }

        if (!$driver = self::$databaseInfo[$key][$target]['driver']) {
            throw new DatabaseDriverNotSpecifiedException('Driver not specified for this database connection: ' . $key);
        }

        // We cannot rely on the registry yet, because the registry requires an
        // open database connection.
        $driver_class = 'DatabaseConnection_' . $driver;
        require_once DRUPAL_ROOT . '/includes/database/' . $driver . '/database.inc';
        $new_connection = new $driver_class(self::$databaseInfo[$key][$target]);
        $new_connection->setTarget($target);
        $new_connection->setKey($key);

        // If we have any active logging objects for this connection key, we need
        // to associate them with the connection we just opened.
        if (!empty(self::$logs[$key])) {
            $new_connection->setLogger(self::$logs[$key]);
        }

        return $new_connection;
    }

    /**
     * Closes a connection to the server specified by the given key and target.
     *
     * @param $target
     *   The database target name.  Defaults to NULL meaning that all target
     *   connections will be closed.
     * @param $key
     *   The database connection key. Defaults to NULL which means the active key.
     */
    public static function closeConnection($target = NULL, $key = NULL) {
        // Gets the active connection by default.
        if (!isset($key)) {
            $key = self::$activeKey;
        }
        // To close a connection, it needs to be set to NULL and removed from the
        // static variable. In all cases, closeConnection() might be called for a
        // connection that was not opened yet, in which case the key is not defined
        // yet and we just ensure that the connection key is undefined.
        if (isset($target)) {
            if (isset(self::$connections[$key][$target])) {
                self::$connections[$key][$target]->destroy();
                self::$connections[$key][$target] = NULL;
            }
            unset(self::$connections[$key][$target]);
        }
        else {
            if (isset(self::$connections[$key])) {
                foreach (self::$connections[$key] as $target => $connection) {
                    self::$connections[$key][$target]->destroy();
                    self::$connections[$key][$target] = NULL;
                }
            }
            unset(self::$connections[$key]);
        }
    }

    /**
     * Instructs the system to temporarily ignore a given key/target.
     *
     * At times we need to temporarily disable slave queries. To do so, call this
     * method with the database key and the target to disable. That database key
     * will then always fall back to 'default' for that key, even if it's defined.
     *
     * @param $key
     *   The database connection key.
     * @param $target
     *   The target of the specified key to ignore.
     */
    public static function ignoreTarget($key, $target) {
        self::$ignoreTargets[$key][$target] = TRUE;
    }

    /**
     * Load a file for the database that might hold a class.
     *
     * @param $driver
     *   The name of the driver.
     * @param array $files
     *   The name of the files the driver specific class can be.
     */
    public static function loadDriverFile($driver, array $files = array()) {
        static $base_path;

        if (empty($base_path)) {
            $base_path = dirname(realpath(__FILE__));
        }

        $driver_base_path = "$base_path/$driver";
        foreach ($files as $file) {
            // Load the base file first so that classes extending base classes will
            // have the base class loaded.
            foreach (array("$base_path/$file", "$driver_base_path/$file") as $filename) {
                // The OS caches file_exists() and PHP caches require_once(), so
                // we'll let both of those take care of performance here.
                if (file_exists($filename)) {
                    require_once $filename;
                }
            }
        }
    }
}
```
























