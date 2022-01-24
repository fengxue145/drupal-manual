---
sidebarDepth: 0
---

## db_transaction($name, $options)

获取一个 [DatabaseTransaction](./DatabaseTransaction) 对象，用于处理数据库的事务操作。

参数:
- <span class="required">*</span>`$table`: `string`

  事务的名称。默认 `NULL`

- `$options`: `array`

  用于控制事务操作方式的选项数组，仅 `target` 属性可用。默认 `[]` 当前活动连接

返回值: [DatabaseTransaction](./DatabaseTransaction)
