## `$field` 属性详解

- `id`: `number` <Badge>readonly</Badge>

    字段主要标识符。由 [field_create_field()](/) 自动分配。

- `field_name`: `string`

    字段的名称。名称必须满足以下条件：
    - 字段名只能由小写字母、数字和下划线组成，且非数字打头。
    - 字段长度不能超过32位。
    - 每个字段名在 `Field API` 中是唯一的。
    - 字段名不能与所有实体的 `entity keys` 冲突。

    将字段附加到实体时，该字段的数据存储在`$entity->{field_name}`中。

- `type`: `string`

    字段的类型，如 `text` 或 `image`。字段类型是由实现 [hook_field_info()](/) 的模块定义的。

- `entity_types`: `array`

    可以保存该字段实例的实体类型数组。如果为空或未指定，该字段可以具有任何实体类型的实例。

- `cardinality`: `number`

    该字段可以包含的值的数量。

    合法值: `任何正整数` 或 `FIELD_CARDINALITY_UNLIMITED`。默认 `1`

- `translatable`: `boolean`

    字段是否可翻译。默认 `FALSE`

- `locked`: `number`

    该字段是否可编辑。如果为 `TRUE`，则用户不能更改字段设置或在UI中创建字段的新实例。默认 `FALSE`

- `module`: `string` <Badge>readonly</Badge>

    实现字段类型的模块的名称。

- `active`: `boolean` <Badge>readonly</Badge>

    如果当前启用了实现字段类型的模块，则为 `TRUE`，否则为 `FALSE`。

- `deleted`: `number` <Badge>readonly</Badge>

    如果此字段已被删除，则为 `TRUE`，否则为 `FALSE`。

    字段附加 API 将忽略已删除的字段。此属性之所以存在，是因为可以将字段标记为删除，但只能由单独的垃圾回收过程实际销毁。

- `columns`: `struct`

    用于存储此字段的每个值的 `Field API` 列的数组。`Field API` 列规范与 `Schema API` 列规范完全相同，但根据所使用的字段存储模块，列的名称可能不表示 SQL 数据库中的实际列。

    注: 列只能在 [hook_field_schema()](/) 中定义。

    ```php
    // mymodule.install
    function mymodule_field_schema($field) {
        $schema = array();
        // bank 字段包含三个列：bank_card、bank_name、bank_pass
        if ($field['type'] === 'bank') {
            $schema['columns'] = array(
                'bank_card' => array('type' => 'varchar', 'length' => 21),
                'bank_name' => array('type' => 'varchar', 'length' => 128),
                'bank_pass' => array('type' => 'varchar', 'length' => 256),
            );
        }
        return $schema;
    }

    // mymodule.module
    function mymodule_field_info() {
        return array(
            // 定义了一个 bank 字段
            'bank' => array('label' => t('Bank Card'))
        );
    }
    ```

- `indexes`: `array`

    数据列上的索引数组，使用与 `Schema API` 索引规范相同的定义格式。

    注: 默认索引可在 [hook_field_schema()](/) 中定义。当创建字段时，可以修改或添加默认索引。

    ```php
    // mymodule.install
    function mymodule_field_schema($field) {
        $schema = array();
        if ($field['type'] === 'bank') {
            // bank 字段包含三个列：bank_card、bank_name、bank_pass
            $schema['columns'] = array(
                'bank_card' => array('type' => 'varchar', 'length' => 21),
                'bank_name' => array('type' => 'varchar', 'length' => 128),
                'bank_pass' => array('type' => 'varchar', 'length' => 256),
            );
            $schema['indexes'] = array(
                'bank_card' => array('bank_card'),
            );
        }
        return $schema;
    }

    // mymodule.module
    function mymodule_field_info() {
        return array(
            // 定义了一个 bank 字段
            'bank' => array('label' => t('Bank Card'))
        );
    }
    field_create_field(array(
        ...,
        'indexes' => array(
            // 为 bank_name 列添加索引
            'bank_name' => array('bank_name'),
        ),
        ...
    ))
    ```

- `foreign keys`: `array`

    关联关系数组，使用与 `Schema API` 外键规范相同的定义格式。但是，请注意，字段数据不一定存储在SQL中。

    注: 外键只能在 [hook_field_schema()](/) 中定义。

- `settings`: `array`

    字段类型特定设置的键/值对的子数组。每个字段类型模块定义并记录自己的字段设置。

- `storage`: `array`

    字段存储类型的相关信息。

    - `type`: `string`

        该字段使用的存储类型。默认 `field_sql_storage`

    - `settings`: `array`

        存储类型的默认配置数组。

    - `module`: `string` <Badge>readonly</Badge>

        实现存储类型的模块的名称。

    - `active`: `boolean` <Badge>readonly</Badge>

        如果当前启用了实现存储类型的模块，则为 TRUE，否则为 FALSE。



## `$instance` 属性详解






















