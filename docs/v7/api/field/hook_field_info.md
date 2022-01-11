## {hook}_field_info()

定义 `Field API` 字段类型。

- 返回值:
  - `label`: `string`

    字段类型名称。

  - `description`: `string`

    字段类型描述。

  - `settings`: `array`

    一个数组，它的键是字段类型可用设置的名称，它的值是这些设置的默认值。

  - `instance_settings`: `array`

    一个数组，其键是字段类型实例可用的设置的名称，其值是这些设置的默认值。实例级设置可以在每个字段实例上有不同的值，因此允许比字段级设置更大的灵活性。建议尽可能将设置放在实例级别。值得注意的例外情况:作用于模式定义的设置，或者视图需要跨字段实例使用的设置(例如，允许值的列表)。

  - `default_widget`: `string`

    字段控件的插件id，用于指示默认控件。

  - `default_formatter`: `string`

    字段格式化器的插件id，用于指示默认格式化器。

  - `no_ui`: `boolean`

    是否允许用户通过`UI`创建此字段类型的字段和实例。

    若为 TRUE，就只能通过 field_create_field() 和 field_create_instance() 以编程方式创建。默认 `FALSE`


```php
/**
 * Implement {hook}_field_widget_info()
 */
function mymodule_field_widget_info() {
    return array(
        'bank_textfield' => array(
            'label'       => t('Text field'),
            'field types' => array('bank_card', 'bank_name', 'bank_pass')
        ),
    );
}

/**
 * Implement {hook}_field_formatter_info()
 */
function mymodule_field_formatter_info() {
    return array(
        'bank_default' => array(
            'label'       => t('Default'),
            'field types' => array('bank_card', 'bank_name', 'bank_pass')
        ),
    );
}

/**
 * Implement {hook}_field_info()
 */
function mymodule_field_info() {
    $fields = array();

    // 银行卡号
    $fields['bank_card'] = array(
        'label' => t('Bank Card'),
        'description' => t('This field stores varchar text in the database.'),
        'settings' => array(
            'max_length' => 21
        ),
        'instance_settings' => array(
            'text_processing' => 0
        ),
        'default_widget' => 'bank_textfield',
        'default_formatter' => 'bank_default',
    );
    // 银行名称
    $fields['bank_name'] = array(
        'label' => t('Bank Name'),
        'description' => t('This field stores varchar text in the database.'),
        'settings' => array(
            'max_length' => 128
        ),
        'instance_settings' => array(
            'text_processing' => 0
        ),
        'default_widget' => 'bank_textfield',
        'default_formatter' => 'bank_default',
    );
    // 银行密码
    $fields['bank_pass'] = array(
        'label' => t('Bank Pass'),
        'description' => t('This field stores varchar text in the database.'),
        'settings' => array(
            'max_length' => 255
        ),
        'instance_settings' => array(
            'text_processing' => 0
        ),
        'default_widget' => 'bank_textfield',
        'default_formatter' => 'bank_default',
    );
    return $fields;
}
```
