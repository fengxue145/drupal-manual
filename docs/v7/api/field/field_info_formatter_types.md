## field_info_formatter_types($formatter_type = NULL)

从 [hook_field_formatter_info()](/) 返回字段格式化程序的信息。

- 参数:
  - `$field_type`: `string`

    格式化程序类型名。如果省略，将返回所有格式化程序类型。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_formatter_info()
 */
function mymodule_field_formatter_info() {
    return array(
        'bank_default' => array(
            'label'       => t('Default'),
            'field types' => array('bank_card')
        ),
    );
}

field_info_formatter_types('bank_default');
// array (
//     'label' => 'Default',
//     'field types' => array (
//         0 => 'bank_card'
//     ),
//     'settings' => array (),
//     'module' => 'mymodule',
// )

field_info_formatter_types();
// array(
//     'bank_default' => array (
//         'label' => 'Default',
//         'field types' => array (
//             0 => 'bank_card'
//         ),
//         'settings' => array (),
//         'module' => 'mymodule',
//     ),
//     ...
// )
```
