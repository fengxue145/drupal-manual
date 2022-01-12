## db_transaction($name = NULL, array $options = array())

创建一个 `DatabaseTransaction` 对象，用于处理数据库的事务操作。

- 参数:
  - `$table`: `string`

    事务的可选名称。

  - `$options`: `array`

    用于控制事务操作方式的选项数组，仅 `target` 属性可用。

- 返回值: `DatabaseTransaction`

    返回一个 [DatabaseTransaction](./DatabaseTransaction) 对象。
