---
sidebarDepth: 0
---

## db_merge($table, $options)

获取一个 [MergeQuery](./MergeQuery) 对象，用于处理数据库的合并操作。

参数:
- <span class="required">*</span>`$table`: `string`

  数据表名称。

- `$options`: `array`

  用于控制查询如何运行的关联选项数组。默认 `[]`

  详细信息请参阅 [DatabaseConnection::defaultOptions()](./DatabaseConnection.html#defaultOptions)

返回值: [MergeQuery](./MergeQuery)
