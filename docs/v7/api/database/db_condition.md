---
sidebarDepth: 0
---

## db_condition($conjunction)

获取一个新的 [DatabaseCondition](./DatabaseCondition) 对象。

建议优先使用 [db_and()](./db_and)、[db_or()](./db_or) 和 [db_xor()](./db_xor) 函数。

参数:
- <span class="required">*</span>`$conjunction`: `string`

  条件连接符。如 `AND`、`OR` 或 `XOR`。

返回值: [DatabaseCondition](./DatabaseCondition)
