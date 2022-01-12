## db_delete($table, array $options = array())

创建一个 `DeleteQuery` 对象，用于处理数据库的 `DELETE` 操作。

- 参数:
  - `$table`: `string`

    数据表名称。

  - `$options`: `array`

    用于控制查询操作方式的选项数组。

- 返回值: `DeleteQuery`

    返回一个 [DeleteQuery](./DeleteQuery) 对象。
