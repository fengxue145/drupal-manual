## field_info_formatter_settings($type)

返回字段格式化程序的默认设置。

- 参数:
  - `$type`: `string`

    字段格式化程序类型名。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_formatter_info()
 */
function mymodule_field_formatter_info() {
    return array(
        'bank_default' => array(
            'label'       => t('Default'),
            'field types' => array('bank_card'),
            'settings'    => array(
                'trim' => TRUE
            )
        ),
    );
}

field_info_formatter_settings('bank_default');
// array(
//     'trim' => TRUE
// )
```
