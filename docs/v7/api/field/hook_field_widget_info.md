## {hook}_field_widget_info()

定义 `Field API` 控件类型。

- 返回值

    描述由模块实现的控件类型的数组。

    键是控件类型名称。为了避免名称冲突，控件类型名称应该以公开它们的模块名称作为前缀。

    - `label`: `string`

        控件类型的人类可读的名称。

    - `description`: `string`

        控件类型的简短描述。

    - `field types`: `array`

        控件支持的字段类型数组。

    - `settings`: `struct`

        一个数组，其键是可用于小部件类型的设置的名称，其值是这些设置的默认值。

    - `behaviors`: `struct`

        一个描述 `widget` 行为的数组，包含以下元素:

        - `multiple`: `number`

            以下常量之一：
            1. `FIELD BEHAVIOR DEFAULT` <badge>Default</badge>: 如果小部件允许输入单个字段值(最常见的情况)。
            2. `FIELD BEHAVIOR CUSTOM`: 如果一个小部件的单个副本可以接收多个字段值。例如:复选框，多重选择，逗号分隔的文本框。

        - `default value`: `number`

            以下常量之一:
            1. `FIELD_BEHAVIOR_DEFAULT` <badge>Default</badge>: 支持默认值。
            2. `FIELD_BEHAVIOR_NONE`: 不支持默认值。

    - `weight`: `number`

        一个整数，用来确定这个小部件相对于Field UI中其他小部件的权重。


```php {7,26,30,34}
/**
 * Implement {hook}_field_widget_info()
 */
function mymodule_field_widget_info() {
    return array(
        // 定义一个ID为 bank_default 的格式化程序
        'bank_textfield' => array(
            'label' => t('Text field'),
            'field types' => array('bank_card', 'bank_name', 'bank_pass'),
            'settings' => array('size' => 60),
            'behaviors' => array(
                'multiple values' => FIELD_BEHAVIOR_DEFAULT,
                'default value' => FIELD_BEHAVIOR_DEFAULT,
            ),
        ),
    );
}

/**
 * Implement {hook}_field_info()
 */
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label' => t('Bank Card'),
            'default_widget' => 'bank_textfield',
        ),
        'bank_name' => array(
            'label' => t('Bank Name'),
            'default_widget' => 'bank_textfield',
        ),
        'bank_pass' => array(
            'label' => t('Bank Card Password'),
            'default_widget' => 'bank_textfield',
        )
    );
}
```