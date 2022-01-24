---
sidebarDepth: 0
---

## db_truncate($table, $options)

获取一个 [TruncateQuery](./TruncateQuery) 对象，用于处理数据库的 `TRUNCATE` 操作。

参数:
- <span class="required">*</span>`$table`: `string`

  数据表名称。

- `$options`: `array`

  用于控制查询操作方式的选项数组。

返回值: [TruncateQuery](./TruncateQuery)
