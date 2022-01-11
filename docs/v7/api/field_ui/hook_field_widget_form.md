# {hook}_field_widget_form()

定义单个字段控件的表单。

字段构件表单元素应基于传入的 `$element`，其中包含从字段配置派生的基本表单元素属性。

字段 API 将为每个表单元素设置权重、字段名称和增量值。如果此字段有多个值，则字段 API 将根据需要多次调用此挂钩。

- 参数
  - `$form`: `struct`

    附加控件的表单结构。这可能是完整表单结构，也可能是较大表单的子元素。

  - `$form_state`: `struct`

    包含表单的当前状态的关联数组。

  - `$field`: `struct`

    字段结构。

  - `$instance`: `struct`

    字段实例。

  - `$langcode`: `struct`

    与 `$items` 相关的语言。

  - `$items`: `struct`

    此字段的默认值数组。

  - `$delta`: `struct`

    此项目在子元素数组（0、1、2 等）中的顺序。

  - `$element`: `struct`

    包含小部件基本属性的表单元素数组:
    - `#entity_type`：字段附加到的实体的名称。
    - `#bundle`：包含该字段的字段捆绑包的名称。
    - `#field_name`：字段的名称。
    - `#language`：正在编辑字段的语言。
    - `#field_parents`：表单中字段的"父"空间。大多数小部件可以简单地忽略此属性。这标识字段值在 $form_state['values'] 中的位置，并用于通过 field_form_get_state （） 和field_form_set_state（） 函数访问字段的处理信息。
    - `#columns`：字段的字段存储列的列表。
    - `#title`：字段实例的已清理元素标签，准备输出。
    - `#description`：字段实例的清理元素描述，准备输出。
    - `#required`：指示元素值是否需要的布尔值;对于必需的多个值字段，只需要第一个小组件的值。
    - `#delta`：此项目在子元素数组中的顺序;见上文$delta。


```php
/**
 * Implements {hook}_field_widget_form().
 */
function cao_field_field_widget_form(&$form, &$form_state, $field, $instance, $langcode, $items, $delta, $element) {
    $element += array(
        '#type'          => 'textfield',
        '#default_value' => '',
    );
    return array($element);
}
```

展示效果如下：

<img :src="$withBase('/images/module/field_ui/hook_field_widget_form.png')" alt="foo">












