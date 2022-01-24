---
sidebarDepth: 0
---

## db_delete($table, $options)

获取一个 [DeleteQuery](./DeleteQuery) 对象，用于处理数据库的 `DELETE` 操作。

参数:
- <span class="required">*</span>`$table`: `string`

  数据表名称。

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值:
- [DeleteQuery](./DeleteQuery)
- [DeleteQuery_sqlite](./sqlite/DeleteQuery_sqlite)
