# EntityAPIController Class


## buildQuery() <Badge type="warn" text="protected"/>
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`。默认 `[]`
  - `$revision_id`: `number`。默认 `FALSE`


## query()
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`
  - `$revision_id`: `number`。默认 `FALSE`


## load()
- 参数:
  - `$ids`: `array`。默认 `[]`
  - `$conditions`: `array`。默认 `[]`


## resetCache()
- 参数:
  - `$ids`: `array`。默认 `NULL`


## invoke()
- 参数:
  - `$hook`: `string`
  - `$entity`: `Entity`


## delete()
- 参数:
  - `$ids`: `array`
  - `$transaction`: `DatabaseTransaction`。默认 `NULL`


## deleteRevision()
- 参数:
  - `$revision_id`: `number`


## save()
- 参数:
  - `$entity`: `Entity`
  - `$transaction`: `DatabaseTransaction`。默认 `NULL`


## saveRevision() <Badge type="warn" text="protected"/>
- 参数:
  - `$entity`: `Entity`


## create()
- 参数:
  - `$values`: `array`。默认 `[]`


## export($entity, $prefix = '')
- 参数:
  - `$entity`: `Entity`
  - `$prefix`: `string`。默认 `''`


## import($export)
- 参数:
  - `$export`: `string`


## buildContent()
- 参数:
  - `$entity`: `Entity`
  - `$view_mode`: `string`。默认 `'full'`
  - `$langcode`: `string`。默认 `NULL`
  - `$content`: `array`。默认 `[]`


## renderEntityProperty() <Badge type="warn" text="protected"/>
- 参数:
  - `$wrapper`: `EntityDrupalWrapper`
  - `$name`: `string`
  - `$property`: `string`
  - `$view_mode`: `string`
  - `$langcode`: `string`
  - `&$content`: `array`


## view() <Badge type="warn" text="protected"/>
- 参数:
  - `$entities`: `Entity[]`
  - `$view_mode`: `string`。默认 `'full'`
  - `$langcode`: `string`。默认 `NULL`
  - `$page`: `mixed`。默认 `NULL`



