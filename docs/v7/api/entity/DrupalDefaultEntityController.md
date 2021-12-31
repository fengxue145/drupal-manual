# EntityDefaultMetadataController

实体 `CURD` 基类，主要提供实体的 `查`、`改`、`删` 操作。


## resetCache()
- 参数:
  - `$ids`: `array`。默认 `NULL`


## load()
- 参数:
  - `$ids`: `array`。默认 `[]`
  - `$conditions`: `array`。默认 `[]`


## cleanIds() <Badge type="warn" text="protected"/>
- 参数:
  - `&$ids`: `array`


## filterId() <Badge type="warn" text="protected"/>
- 参数:
  - `$id`: `string` | `number`。


## buildQuery() <Badge type="warn" text="protected"/>
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`。默认 `[]`
  - `$revision_id`: `number`。默认 `FALSE`


## attachLoad() <Badge type="warn" text="protected"/>
- 参数:
  - `&$queried_entities`: `array`
  - `$revision_id`: `number`。默认 `FALSE`


## cacheGet() <Badge type="warn" text="protected"/>
- 参数:
  - `$ids`: `array`
  - `$conditions`: `array`。默认 `[]`


## cacheSet() <Badge type="warn" text="protected"/>
- 参数:
  - `$entities`: `object[]`


