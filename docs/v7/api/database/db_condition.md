## db_condition($conjunction)

返回一个新的databaseconcondition，设置为指定的连接。

内部API函数调用。 优先使用db_and()、db_or()和db_xor()函数。

- 参数:
  - `$conjunction`: `string`

    用于查询条件(AND、OR 或 XOR)。

- 返回值: `DatabaseCondition`