# Entity API

## Hook

### {hook}_entity_info()
- 返回值：`array`
- 用法：
    ```php
    function mymodule_entity_info() {
        $entitys = array();
        $entitys['mymodule'] => array(
            'label' => t('My Module'),
            'base table' => 'mymodule_table',
            'entity class' => 'Entity',
            'controller class' => 'EntityAPIController',
            'load hook' => 'mymodule_load',
            'entity keys' => array(
                'id' => 'id',
            )
        );
        return $entitys;
    }
    ```
- 触发时机：
    - 模块安装
    - 清除缓存
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_info()`
    - `includes/common.inc` -> `entity_get_info()`


用来定义一个或多个实体类型。

---

### {hook}_entity_info_alter(&$entity_info)
- 参数：
    - `array`: `&$entity_info`
- 用法：
    ```php
    function mymodule_entity_info_alter(array &$entity_info) {
        if (isset($entity_info['mymodule'])) {
            $entity_info['mymodule']['access callback'] = 'mymodule_access';
            $entity_info['mymodule']['admin ui'] = array(
                'path' => 'admin/content/mymodule',
                'controller class' => 'EntityDefaultUIController',
            );
        }
    }
    ```
- 触发时机：在 `{hook}_entity_info` 钩子之后调用
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_info_alter()`
    - `includes/common.inc` -> `entity_get_info()`


用来修改 `{hook}_entity_info` 钩子定义的信息。

::: warning
该钩子是一个通用钩子，其他模块的也可能会触发该方法。
`$entity_info` 参数包含不同模块定义的实体信息。
:::

---

### {hook}_entity_load(&$entities, $entity_type)
- 参数：
    - `array`: `&$entities` 查询结果的关联数组。
    - `string`: `$entity_type` 实体类型。
- 用法：
    ```php
    function mymodule_entity_load(&$entities, $entity_type) {
        if ($entity_type === 'mymodule') {
            foreach ($entities as $entity) {
                $entity->foo = mymodule_add_something($entity, $type);
            }
        }
    }
    ```
- 触发时机：当调用 `entity_load` 等相关查询实体操作时，就会触发 `{hook}_entity_load` 钩子。
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_load()`
    - `includes/entity.inc` -> `DrupalDefaultEntityController::attachLoad()`

实体加载时，用来交互的钩子。

通常是用来对数据进行额外处理，或附加额外字段到该数据上。

::: tip
如果在定义实体时，指定了 `hook load` 属性，则会在 `{hook}_entity_load` 钩子之后，触发 `{hook}_{hook load}` 钩子。
:::

::: warning
该钩子是一个通用钩子，其他模块的也可能会触发该方法。
:::

---

### {hook}_entity_presave($entity, $entity_type)
### {hook}_{ENTITY_TYPE}_presave($entity)
- 参数：
    - `Entity`: `$entity`
    - `string`: `$entity_type`
- 用法：
    ```php
    function mymodule_entity_info() {
        return array(
            'myentity_1' => array(...)
        );
    }
    // {hook}_entity_presave($entity, $entity_type)
    function mymodule_entity_presave($entity, $entity_type) {
        if ($entity_type === 'myentity_1') {
            $entity->update_time = REQUEST_TIME;
        }
    }
    // {hook}_{ENTITY_TYPE}_presave($entity)
    function mymodule_myentity_1_update($entity) {
        $entity->update_time = REQUEST_TIME;
    }
    ```
- 触发时机：在创建或更新实体之前调用（未修改数据库）
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_presave()`
    - `modules/entity/entity.inc` -> `EntityDefaultRulesController::eventInfo()`

在创建或更新实体之前对其进行操作。

---

### {hook}_entity_insert($entity, $entity_type)
### {hook}_{ENTITY_TYPE}_insert($entity)
- 参数：
    - `Entity`: `$entity`
    - `string`: `$entity_type`
- 用法：
    ```php
    function mymodule_entity_info() {
        return array(
            'myentity_1' => array(...)
        );
    }
    // {hook}_entity_insert($entity, $entity_type)
    function mymodule_entity_insert($entity, $entity_type) {
        if ($entity_type === 'myentity_1') {
            $name = $entity->name;
        }
    }
    // {hook}_{ENTITY_TYPE}_insert($entity)
    function mymodule_myentity_1_update($entity) {
        $name = $entity->name;
    }
    ```
- 触发时机：在创建实体之后调用（已修改数据库）
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_insert()`
    - `includes/file.inc` -> `file_save()`
    - `modules/entity/entity.inc` -> `EntityDefaultRulesController::eventInfo()`
    - `modules/entity/entity.api.php` -> `hook_ENTITY_TYPE_insert()`

实体插入后，用来交互的钩子。

---

### {hook}_entity_update($entity, $entity_type)
### {hook}_{ENTITY_TYPE}_update($entity)
- 参数：
    - `Entity`: `$entity`
    - `string`: `$entity_type`
- 用法：
    ```php
    function mymodule_entity_info() {
        return array(
            'myentity_1' => array(...)
        );
    }
    // {hook}_entity_update($entity, $entity_type)
    function mymodule_entity_update($entity, $entity_type) {
        if ($entity_type === 'myentity_1') {
            $name = $entity->name;
        }
    }
    // {hook}_{ENTITY_TYPE}_update($entity)
    function mymodule_myentity_1_update($entity) {
        $name = $entity->name;
    }
    ```
- 触发时机：在更新实体之后调用（已修改数据库）
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_update()`
    - `includes/file.inc` -> `file_save()`
    - `modules/entity/entity.inc` -> `EntityDefaultRulesController::eventInfo()`
    - `modules/entity/entity.api.php` -> `hook_ENTITY_TYPE_update()`

实体更新后，用来交互的钩子。

---

### {hook}_entity_delete($entity, $entity_type)
### {hook}_{ENTITY_TYPE}_delete($entity)
- 参数：
    - `Entity`: `$entity`
    - `string`: `$entity_type`
- 用法：
    ```php
    function mymodule_entity_info() {
        return array(
            'myentity_1' => array(...)
        );
    }
    // {hook}_entity_delete($entity, $entity_type)
    function mymodule_entity_update($entity, $entity_type) {
        if ($entity_type === 'myentity_1') {
            $name = $entity->name;
        }
    }
    // {hook}_{ENTITY_TYPE}_delete($entity)
    function mymodule_myentity_1_delete($entity) {
        $name = $entity->name;
    }
    ```
- 触发时机：在删除实体之后调用（已修改数据库）
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_delete()`
    - `includes/file.inc` -> `file_delete()`
    - `modules/entity/entity.inc` -> `EntityDefaultRulesController::eventInfo()`
    - `modules/entity/entity.api.php` -> `hook_ENTITY_TYPE_delete()`

实体删除后，用来交互的钩子。

---

### {hook}_entity_query_alter($query)
- 参数：
    - `EntityFieldQuery`: `$query`
- 用法：
    ```php
    function mymodule_entity_query_alter($query) {
        // 指定查询回调函数
        $query->executeCallback('mymodule_query_callback');
    }
    ```
- 触发时机：待定：在 `{hook}_entity_load` 钩子之前调用
- 代码参考：
    - `includes/system.api.php` -> `hook_entity_query_alter()`
    - `includes/entity.inc` -> `EntityFieldQuery::execute()`


用来修改或者执行一个 `EntityFieldQuery`。

---

### {hook}_entity_view($entity, $type, $view_mode, $langcode)
- 参数：
    - `Entity`: `$entity` 实体对象。
    - `string`: `$type` 被渲染的实体类型节点。
    - `string`: `$view_mode` 呈现实体的视图模式。
    - `string`: `$langcode` 用于呈现的语言代码。
- 用法：
    ```php
    ```

- 代码参考：
    - `includes/system.api.php` -> `hook_entity_view()`

在实体正在组装时，呈现(`render`)之前，用来交互的钩子。

---

### {hook}_entity_view_alter(&$build, $type)
- 参数：
    - `array`: `$build` 表示实体内容的可渲染数组。
    - `string`: `$type` 被渲染的实体类型节点。
- 用法：
    ```php
    ```

- 代码参考：
    - `includes/system.api.php` -> `hook_entity_view_alter()`

用来修改 `{hook}_entity_view` 的结果。


### {hook}_entity_view_mode_alter(&$view_mode, $context)
- 参数：
    - `string`: `$view_mode` 将用于显示实体的视图模式。
    - `array`: `$context` 包含上下文的信息数组。
        - `entity`: 实体对象
        - `entity_type`: 实体类型
        - `langcode`: 语言代码
- 用法：
    ```php
    ```

- 代码参考：
    - `includes/system.api.php` -> `hook_entity_view_mode_alter()`

用来修改正被显示的实体的查看模式。


### {hook}_entity_prepare_view
准备显示实体时，用来交互的钩子。


### entity_crud_{hook}_entity_info()

### entity_metadata_{hook}_entity_info()

### {hook}_entity_property_info()

### {hook}_entity_property_info_alter()

### entity_{hook}_field_info()

### {hook}_entity_views_field_handlers_alter(&$field_handlers)


### {hook}_{ENTITY_TYPE}_defaults_rebuild($entities, $originals)
- 参数：
    - `Entity[]`: `$entity`
    - `Entity[]`: `$originals`
- 用法：
    ```php
    // mymodule.install
    function mymodule_schema() {
        $schema = array(
            'myentity_1' => array(
                'fields' => array(
                'id' => array(
                    'type' => 'serial',
                ),
                'name' => array(
                    'type' => 'varchar',
                    'length' => 255,
                ) + entity_exportable_schema_fields(),
                'primary key' => array('id'),
            )
        );
        return $schema;
    }

    // mymodule.module
    function mymodule_entity_info() {
        return array(
            'myentity_1' => array(
                // ...
                'base table' => 'myentity_1',
                'entity keys' => array(
                    'id' => 'id',
                )
                'exportable' => true,
                'export' => array(
                    // 未设置：{hook}_default_{ENTITY_TYPE}
                    // 设置后：{hook}_myentity_1_export
                    // 'default hook' => 'myentity_1_export',
                )
            ),
            ...
        );
    }
    function mymodule_default_myentity_1() {
        $export = array();
        // 键 = [entity keys][id] 属性的值
        $export['1'] = array(
            'name' => '张三', // [base table]的字段
        );
        $export['2'] = array(
            'name' => '李四',
        );
        return $export;
    }
    function mymodule_entity_2_defaults_rebuild($entities, $originals) {
        // $entities  = 新值
        // $originals = 旧值
    }
    ```
- 触发时机：
    - 模块启用
    - 模块禁用
    - 清除缓存
- 代码参考：
    - `modules/entity/entity.api.php` -> `hook_ENTITY_TYPE_defaults_rebuild()`
    - `modules/entity/entity.module` -> `_entity_defaults_rebuild()`

默认实体的重新构建后，用来交互的钩子。

上面代码定义了 `myentity_1` 表。同时在 `hook_entity_info` 钩子中定义了 `myentity_1` 实体，并使用 `{hook}_default_{ENTITY_TYPE}` 钩子导出默认数据到数据库中。
- 更多参考：
    - [exportable](./)
    - [export](./)
    - [实体默认数据](./)




