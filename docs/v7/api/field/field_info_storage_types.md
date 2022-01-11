## field_info_storage_types($storage_type = NULL)

从 [hook_field_storage_info()](/) 返回关于字段存储的信息。

- 参数:
  - `$field_type`: `string`

    存储类型名称。如果省略，将返回所有存储类型。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_storage_info()
 */
function mymodule_field_storage_info() {
    return array(
        'bank_sql_storage' => array(
            'label' => t('Default SQL storage'),
            'description' => t('Stores fields in the local SQL database.')
        ),
    );
}

field_info_storage_types('bank_sql_storage');
// array (
//     'label' => 'Default SQL storage',
//     'description' => 'Stores fields in the local SQL database.',
//     'settings' => array (),
//     'module' => 'mymodule',
// )

field_info_storage_types();
// array(
//     'bank_sql_storage' => array (
//         'label' => 'Default SQL storage',
//         'description' => 'Stores fields in the local SQL database.',
//         'settings' => array (),
//         'module' => 'mymodule',
//     ),
//     ...
// )
```