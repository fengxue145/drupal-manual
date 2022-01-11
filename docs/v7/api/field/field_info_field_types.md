## field_info_field_types($field_type = NULL)

从 [hook_field_info()](/) 返回有关字段类型的信息。

- 参数:
  - `$field_type`: `string`

    字段类型名。如果省略，将返回所有字段类型。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_info()
 */
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label'       => t('Bank Card'),
            'description' => t('This field stores varchar text in the database.')
        )
    );
}

field_info_field_types('bank_card');
// array (
//     'label' => 'Bank Card',
//     'description' => 'This field stores varchar text in the database.',
//     'settings' => array (),
//     'instance_settings' => array (
//         'user_register_form' => false,
//     ),
//     'module' => 'mymodule',
// )

field_info_field_types();
// array(
//     'bank_card' => array (
//         'label' => 'Bank Card',
//         'description' => 'This field stores varchar text in the database.',
//         'settings' => array (),
//         'instance_settings' => array (
//             'user_register_form' => false,
//         ),
//         'module' => 'mymodule',
//   ),
//   ...
// )
```
