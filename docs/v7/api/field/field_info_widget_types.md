## field_info_widget_types($widget_type = NULL)

从 [hook_field_widget_info()](/) 返回字段部件的信息。

- 参数:
  - `$field_type`: `string`

    部件类型名。如果省略，将返回所有字段部件类型。

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
        ),
    );
}

field_info_widget_types('bank_textfield');
// array (
//     'label' => 'Text field',
//     'field types' => array (
//         0 => 'bank_card',
//     ),
//     'behaviors' => array (
//         'multiple values' => 4,
//         'default value' => 1,
//     ),
//     'settings' => array (),
//     'module' => 'mymodule',
// )

field_info_widget_types();
// array(
//     'bank_textfield' => array (
//         'label' => 'Text field',
//         'field types' => array (
//             0 => 'bank_card',
//         ),
//         'behaviors' => array (
//             'multiple values' => 4,
//             'default value' => 1,
//         ),
//         'settings' => array (),
//         'module' => 'mymodule',
//     ),
//     ...
// )
```
