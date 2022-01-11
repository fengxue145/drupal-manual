# {hook}_field_instance_settings_form()

定义字段实例设置的表单。

- 参数
  - `$field`: `struct`

    正在配置的字段结构。

  - `$instance`: `struct`

    正在配置的实例结构。

- 返回值: `struct`

    返回字段实例设置的表单定义。


```php
/**
 * Implements {hook}_field_info().
 */
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label' => t('Bank Card'),
            'description' => t('This field stores varchar text in the database.'),
            'settings' => array(
                'default_value' => 'this is default value'
            )
        )
    );
}

/**
 * Implements {hook}_field_instance_settings_form().
 */
function mymodule_field_instance_settings_form($field, $instance) {
    $form = array();
    $form['hook_field_instance_settings_form'] = array(
        '#type'          => 'textfield',
        '#title'         => t('hook_field_instance_settings_form'),
        // tips: 保存后的值，会存储在 $instance['setting']['hook_field_instance_settings_form'].
        '#default_value' => $field['setting']['hook_field_instance_settings_form'] ?? '',
        '#weight'        => -1,
    );
    return $form;
}
```

展示效果如下：
<img :src="$withBase('/images/module/field_ui/hook_field_instance_settings_form.png')" alt="foo">
