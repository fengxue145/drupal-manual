## db_delete($table, array $options = array())

创建一个 `TruncateQuery` 对象，用于处理数据库的 `TRUNCATE` 操作。

- 参数:
  - `$table`: `string`

    数据表名称。

  - `$options`: `array`

    用于控制查询操作方式的选项数组。

- 返回值: `TruncateQuery`

    返回一个 [TruncateQuery](./TruncateQuery) 对象。
