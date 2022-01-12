## db_next_id($existing_id = 0)

获取一个唯一的id。

如果由于某些原因不能使用串行字段，请使用此函数。使用串行字段是首选，InsertQuery::execute()返回插入的最后一个ID的值。

- 参数:
  - `$existing_id`: `number`

    在数据库导入之后，序列表可能是滞后的，因此通过传入最小ID，可以确保我们永远不会发出相同的ID。

- 返回值: `number`

    大于此序列之前返回的任何数字的整数。