## field_info_widget_settings($type)

返回字段部件的默认设置。

- 参数:
  - `$type`: `string`

    字段部件类型名。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_widget_info()
 */
function mymodule_field_widget_info() {
    return array(
        'bank_textfield' => array(
            'label'       => t('Text field'),
            'field types' => array('bank_card'),
            'behaviors'   => array(
                'multiple values' => FIELD_BEHAVIOR_CUSTOM,
                'default value'   => FIELD_BEHAVIOR_NONE,
            ),
            'settings'    => array(
                'disabled' => 0
            )
        ),
    );
}

field_info_widget_settings('bank_textfield');
// array(
//     'disabled' => 0
// )
```