## field_create_field($field)
创建一个字段。

这个函数不将字段绑定到任何bundle, 若需要请使用 [field_create_instance()](/)。

- 参数:

  - `$field`: `struct`

    字段定义数组。其中 `field_name` 和 `type` 字段必填。

- 返回值: `struct`

    填充了 `id` 属性的 `$field` 数组。

- 触发钩子：
  - [hook_field_schema()](/)
  - [hook_field_storage_create_field()](/)
  - [hook_field_create_field()](/)


```php
function mymodule_field_info() {
    return array(
        'bank_card' => array(
            'label' => t('Bank Card'),
            'description' => t('This field stores varchar text in the database.'),
            'settings' => array(
                'max_length' => 21
            ),
            'instance_settings' => array(
                'text_processing' => 0
            )
        )
    )
}
```



### `$field` 属性详解

    - <span style="color: red;">*</span>`field_name`: `string`

        字段名。必须满足以下条件：
        - 字段名只能由小写字母、数字和下划线组成，且非数字打头。
        - 字段长度不能超过32位。
        - 每个字段名在 `Field API` 中是唯一的。
        - 字段名不能与所有实体的 `entity keys` 冲突。

        当一个字段附加到一个实体上时，该字段的数据存储在`$entity->{field_name}`中。

    - <span style="color: red;">*</span>`type`: `string`

        字段的类型，如 `text` 或 `image`。字段类型是由实现 `hook_field_info()`的模块定义的。

    - `entity_types`: `array`

        可以保存该字段实例的实体类型数组。如果为空或未指定，该字段可以具有任何实体类型的实例。

    - `cardinality`: `number`

        该字段可以包含的值的数量。合法值是任何 `正整数` 或 `FIELD_CARDINALITY_UNLIMITED`。默认：`1`

    - `translatable`: `number`

        字段是否可翻译。

    - `locked`: `number`

        该字段是否可编辑。如果为TRUE，则用户不能更改字段设置或在UI中创建字段的新实例。默认: `false`

    - `indexes`: `array`

        额外的数据索引数组，与 `Schema API` 索引规范相同的定义格式。

        数据列上的索引数组，使用与 `Schema API` 索引规范相同的定义格式。只允许出现在“列”设置中的列。

        注意，字段类型可以指定默认索引，当创建字段时，可以修改或添加默认索引。

    - `foreign keys`: `array`

        一个关联关系数组，使用与 `hook_schema()` 的外键定义相同的结构。但是，请注意，字段数据不一定存储在SQL中。此外，可能的用法是有限的，因为您不能指定另一个相关的字段，只能指定现有的SQL表，如过滤器格式。

    - `settings`: `array`

        字段类型特定设置的键/值对的子数组。每个字段类型模块定义并记录自己的字段设置。

    - `storage`: `array`

        一个子数组键/值对标识存储后端使用的字段:

        - `type`: `string`

            该字段使用的存储后端。存储后端是由实现 `hook_field_storage info()` 的模块定义的。

        - `settings`: `array`

            设置的键/值对的子数组。每个存储后端定义并记录自己的设置。




