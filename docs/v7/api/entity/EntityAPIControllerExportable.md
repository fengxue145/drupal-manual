# EntityAPIControllerExportable Class

## load()
- 参数:
  - `$ids`: `array`。默认 `[]`
  - `$conditions`: `array`。默认 `[]`


## buildQuery() <Badge type="warn" text="protected"/>
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`。默认 `[]`
  - `$revision_id`: `number`。默认 `FALSE`


## cacheGet($ids, $conditions = array()) <Badge type="warn" text="protected"/>
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`。默认 `[]`


## cacheGetByName($names, $conditions = array()) <Badge type="warn" text="protected"/>
- 参数:
  - `$names`: `array`
  - `$conditions`: `array`。默认 `[]`


## applyConditions($entities, $conditions = array()) <Badge type="warn" text="protected"/>
- 参数:
  - `$entities`: `Entity[]`
  - `$conditions`: `array`。默认 `[]`


## cacheSet($entities) <Badge type="warn" text="protected"/>
- 参数:
  - `$entities`: `Entity[]`


## attachLoad(&$queried_entities, $revision_id = FALSE) <Badge type="warn" text="protected"/>
- 参数:
  - `&$queried_entities`: `array`
  - `$revision_id`: `number`。默认 `FALSE`


## resetCache(array $ids = NULL)
- 参数:
  - `$ids`: `array`。默认 `NULL`


## delete()
- 参数:
  - `$ids`: `array`
  - `$transaction`: `DatabaseTransaction`。默认 `NULL`


## invoke()
- 参数:
  - `$hook`: `string`
  - `$entity`: `Entity`


## save()
- 参数:
  - `$entity`: `Entity`
  - `$transaction`: `DatabaseTransaction`。默认 `NULL`


## export()
- 参数:
  - `$entity`: `Entity`
  - `$prefix`: `string`。默认 `''`


## view()
- 参数:
  - `$entities`: `Entity[]`
  - `$view_mode`: `string`。默认 `'full'`
  - `$langcode`: `string`。默认 `NULL`
  - `$page`: `mixed`。默认 `NULL`











