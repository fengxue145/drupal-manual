## field_info_instance_settings($type)

返回字段类型的默认实例设置。

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
            'label'             => t('Bank Card'),
            'description'       => t('This field stores varchar text in the database.'),
            'settings'          => array(
                'max_length' => 21
            ),
            'instance_settings' => array(
                'text_processing' => 0
            )
        )
    );
}

field_info_instance_settings('bank_card');
// array(
//     'text_processing' => 0
// )
```
