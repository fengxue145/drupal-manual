---
sidebarDepth: 0
---

## db_update($table, $options)

获取一个 [UpdateQuery](./UpdateQuery) 对象，用于处理数据库的 `UPDATE` 操作。

参数:
- <span class="required">*</span>`$table`: `string`

  数据表名称。

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [UpdateQuery](./UpdateQuery)
