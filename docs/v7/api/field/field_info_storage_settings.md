## field_info_storage_settings($type)

返回字段存储类型的默认设置。

- 参数:
  - `$field_type`: `string`

    字段存储类型名称。

- 返回值: `array`

```php
/**
 * Implement {hook}_field_storage_info()
 */
function mymodule_field_storage_info() {
    return array(
        'bank_sql_storage' => array(
            'label'       => t('Default SQL storage'),
            'description' => t('Stores fields in the local SQL database.'),
            'settings'    => array(
                'default' => '622600000000000000'
            )
        ),
    );
}

field_info_storage_settings('bank_sql_storage');
// array(
//     'default' => '622600000000000000'
// )
```