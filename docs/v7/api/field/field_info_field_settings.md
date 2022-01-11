## field_info_field_settings($type)

返回字段类型的默认设置。

- 参数:
  - `$type`: `string`

    字段类型名。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_info()
 */
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label'       => t('Bank Card'),
            'description' => t('This field stores varchar text in the database.'),
            'settings'    => array(
                'max_length' => 21
            )
        )
    );
}

field_info_field_settings('bank_card');
// array(
//     'max_length' => 21
// )
```
