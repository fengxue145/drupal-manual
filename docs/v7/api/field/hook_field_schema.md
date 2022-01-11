## {hook}_field_schema($field)

为字段结构定义字段API模式。在创建字段时调用此函数，以便从定义字段类型的模块中获取数据库模式。这个钩子必须在模块的.install文件中定义，以便在安装和升级期间检测到它。

- 参数:
- [$field](/): `struct`

    一个字段的结构。

- 返回值: `struct`

    - `columns`: `array`

        与 `Schema API` 的列定义一致。按列名键。这指定了给定字段的值由什么组成。例如，一个数字字段的值是简单的'value'，而一个格式化的文本字段的值是'value'和'format'的组合，建议在可能的情况下避免列定义依赖于字段设置。不应该对存储引擎如何在内部使用原始列名来构建其存储空间做任何假设

    - `indexes`: `array`

        与 `Schema API` 的索引定义一致。只允许出现在'columns'数组中的列。这些索引将用作默认索引。

        field_create_field()的调用者可以指定额外的索引，或者自担风险修改由field-type模块指定的默认索引。一些storaqe引擎可能不支持索引。

    - `foreign keys`: `array`

        与 `Schema API` 的外键定义一致。

```php
/**
 * Implement {hook}_field_schema
 */
function mymodule_field_schema($field) {
    if ($field['type'] == 'text_long') {
        $columns = array(
            'value' => array(
                'type'     => 'text',
                'size'     => 'big',
                'not null' => FALSE,
            ),
        );
    }
    else {
        $columns = array(
            'value' => array(
                'type'     => 'varchar',
                'length'   => $field['settings']['max_length'],
                'not null' => FALSE,
            ),
        );
    }
    $columns += array(
        'format' => array(
            'type'     => 'varchar',
            'length'   => 255,
            'not null' => FALSE,
        ),
    );
    return array(
        'columns' => $columns,
        'indexes' => array(
            'format' => array(
                'format',
            ),
        ),
        'foreign keys' => array(
            'format' => array(
                'table' => 'filter_format',
                'columns' => array(
                    'format' => 'format',
                ),
            ),
        ),
    );
}
```