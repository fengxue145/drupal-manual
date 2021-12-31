# EntityDefaultUIController Class

## hook_menu()


## hook_forms()


## overviewForm()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`


## overviewFormValidate()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`


## overviewFormSubmit()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`


## overviewTable()
- 参数:
  - `$conditions`: `array`。默认 `[]`


## overviewTableHeaders() <Badge type="warn" text="protected"/>
- 参数:
  - `$conditions`: `array`
  - `$rows`: `array`
  - `$additional_header`: `array`。默认 `[]`


## operationCount() <Badge type="warn" text="protected"/>


## overviewTableRow() <Badge type="warn" text="protected"/>
- 参数:
  - `$conditions`: `array`
  - `$id`: `number`
  - `$entity`: `Entity`
  - `$additional_cols`: `array`。默认 `[]`


## operationForm()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`
  - `$entity`: `Entity`
  - `$op`: `string`


## operationFormValidate()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`


## applyOperation()
- 参数:
  - `$entity`: `Entity`
  - `$op`: `string`


## entityFormSubmitBuildEntity()
- 参数:
  - `$form`: `array`
  - `&$form_state`: `array`














