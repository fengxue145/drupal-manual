## db_select($table, $alias = NULL, array $options = array())

创建一个 `SelectQuery` 对象，用于处理数据库的 `SELECT` 操作。

- 参数:
  - `$table`: `string`

    查询的基表名称，可以是字符串或另一个 `SelectQuery` 对象。如果传递了 `SelectQuery`，它将被用作子查询。

  - `$alias`: `string`

    表别名。

  - `$options`: `array`

    用于控制查询操作方式的选项数组。

- 返回值: `SelectQuery`

    返回一个 [SelectQuery](./SelectQuery) 对象。
