## field_read_field($field_name, $include_additional = array())

直接从数据库读取单个字段记录。通常，您应该使用字段info field()这个函数不会返回已删除的字段。使用field_read_fields()代替此目的。


- 参数
  - `$field_name`: `string`

    要读取的字段名。

  - `$include_additional`: `array`

    此函数的默认行为是不返回非活动字段。设置`$include_additional['include_inactive']` 为TRUE将覆盖此行为。









