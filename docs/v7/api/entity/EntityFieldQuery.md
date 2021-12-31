# EntityFieldQuery Class


## entityCondition()
- 参数:
  - `$name`: `string`
  - `$value`: `mixed`
  - `$operator`: `string`。默认 `NULL`


## fieldCondition()
- 参数:
  - `$field`: `string`
  - `$column`: `unknown`。默认 `NULL`
  - `$value`: `mixed`。默认 `NULL`
  - `$operator`: `string`。默认 `NULL`
  - `$delta_group`: `unknown`。默认 `NULL`
  - `$language_group`: `unknown`。默认 `NULL`


## fieldLanguageCondition()
- 参数:
  - `$field`: `string`
  - `$value`: `mixed`。默认 `NULL`
  - `$operator`: `string`。默认 `NULL`
  - `$delta_group`: `unknown`。默认 `NULL`
  - `$language_group`: `unknown`。默认 `NULL`


## fieldDeltaCondition()
- 参数:
  - `$field`: `string`
  - `$value`: `mixed`。默认 `NULL`
  - `$operator`: `string`。默认 `NULL`
  - `$delta_group`: `unknown`。默认 `NULL`
  - `$language_group`: `unknown`。默认 `NULL`


## addFieldCondition()
- 参数:
  - `&$conditions`: `array`
  - `$field`: `string`
  - `$column`: `unknown`。默认 `NULL`
  - `$value`: `mixed`。默认 `NULL`
  - `$operator`: `string`。默认 `NULL`
  - `$delta_group`: `unknown`。默认 `NULL`
  - `$language_group`: `unknown`。默认 `NULL`


## propertyCondition()
- 参数:
  - `$column`: `unknown`
  - `$value`: `mixed`
  - `$operator`: `string`。默认 `NULL`


## entityOrderBy()
- 参数:
  - `$name`: `string`
  - `$direction`: `string`。默认 `ASC`


## fieldOrderBy()
- 参数:
  - `$field`: `string`
  - `$column`: `unknown`
  - `$direction`: `string`。默认 `ASC`


## propertyOrderBy()
- 参数:
  - `$column`: `unknown`
  - `$direction`: `string`。默认 `ASC`


## count()


## range()
- 参数:
  - `$start`: `number`。默认 `NULL`
  - `$length`: `number`。默认 `NULL`


## pager()
- 参数:
  - `$limit`: `number`。默认 `10`
  - `$element`: `unknown`。默认 `NULL`


## tableSort()
- 参数:
  - `&$headers`: `array`


## deleted()
- 参数:
  - `$deleted`: `boolean`。默认 `TRUE`


## age($age)
- 参数:
  - `$age`: `unknown`


## addTag($tag)
- 参数:
  - `$tag`: `string`


## addMetaData()
- 参数:
  - `$key`: `string`
  - `$object`: `object`


## execute()


## queryCallback()


## propertyQuery()


## initializePager()


## finishQuery()
- 参数:
  - `$select_query`: `SelectQuery`
  - `$id_key`: `string`。默认 `entity_id`


## addCondition()
- 参数:
  - `$select_query`: `SelectQuery`
  - `$sql_field`: `string`
  - `$condition`: `array`
  - `$having`: `unknown`。默认 `FALSE`










