## field_behaviors_widget($op, $instance)

返回小部件的操作行为。

- 参数:
  - `$op`: `string`

    操作的名称。目前支持: `default value` `multiple values`。

  - [$instance](/): `struct`

    字段实例。

- 返回值: `number`
  - `FIELD_BEHAVIOR_NONE`: 不要为这个操作做任何事情。
  - `FIELD_BEHAVIOR_CUSTOM`: 使用小部件的回调函数。
  - `FIELD_BEHAVIOR_DEFAULT`: 使用 `field.module` 的默认行为。

```php
/**
 * Implement {hook}_field_info()
 */
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label' => t('Bank Card'),
            'description' => t('This field stores varchar text in the database.'),
            'default_widget' => 'bank_textfield',
        )
    );
}

/**
 * Implement {hook}_field_widget_info()
 */
function mymodule_field_widget_info() {
    return array(
        'bank_textfield' => array(
            'label'       => t('Text field'),
            'field types' => array('bank_card'),
            'behaviors' => array(
                'multiple values' => FIELD_BEHAVIOR_CUSTOM,
                'default value' => FIELD_BEHAVIOR_NONE,
            ),
        ),
    );
}
```