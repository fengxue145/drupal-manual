# Entity API


## entity_load
`entity_load($entity_type, $ids = FALSE, $conditions = array(), $reset = FALSE)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$ids`: `string[]` | `number[]`

    实体ID列表。默认 `FALSE` 查询所有

  - `$conditions`: `array`

    查询条件的关联数组。默认 `[]`

  - `$reset`: `array`

    是否重置内部缓存。默认 `FALSE`

- 返回值: `array`

```php
function mymodule_entity_info() {
    return array(
        'test_entity' => array(
            ...
            'entity class' => 'Entity',
            'controller class' => 'TestEntityController',
            'entity keys' => array(
                'id' => 'id'
            )
            ...
        )
    )
}

// EntityAPIController extends DrupalDefaultEntityController
class TestEntityController extends EntityAPIController {
    public function load($ids = array(), $conditions = array()) {
        echo "load";
        parent::load($ids, $conditions);
    }
}

// 查询 id IN(1, 2) 并且 status > 1 的数据
$test = entity_load('test_entity', [1, 2], array('status', '1', '>')); // output: load
// $test 结构如下:
//   array(
//       '1' => Entity Object, // 键是实体ID
//       '2' => Entity Object,
//   )
```

从数据库中加载实体。实体存储在静态内存缓存中，如果在同一页面请求期间再次加载，则不需要访问数据库。

实际的加载是通过一个必须实现 `DrupalEntityControllerInterface` 接口的类来完成。默认情况下使用 [DrupalDefaultEntityController](../entity/DrupalDefaultEntityController.md)。实体类型可以通过在 `{hook}_entity_info()` 中设置 `[controller class]` 指定一个不同的类。这些类可以实现 `DrupalEntityControllerInterface` 接口，或者，最常见的是，扩展 `DrupalDefaultEntityController` 类。

`Entity` 模块提供了 [EntityAPIController](../entity/EntityAPIController.md) 和 [EntityAPIController](../entity/EntityAPIControllerExportable.md) 类，这两个类扩展于 `DrupalDefaultEntityController` 类。


## entity_load_unchanged
`entity_load_unchanged($entity_type, $id)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$id`: `string` | `number`

    实体ID。

- 返回值: `object` | `false`

    查询不到数据，返回 `false`。

```php
$user = entity_load_unchanged('user', 1);
```

从数据库加载单个实体。与 [entity_load()](#entity-load) 不同，此函数绕过任何静态缓存，直接从数据库加载实体。


## entity_load_single
`entity_load_single($entity_type, $id)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$id`: `string` | `number`

    实体ID。

- 返回值: `object` | `false`

    查询不到数据，返回 `false`。

```php
// 查询 uid = 1 的用户
$user = entity_load_single('user', 1);

// 等同于
$users = entity_load('user', array(1));
$user = reset($users);
```

从数据库加载单个实体。内部使用 [entity_load()](#entity-load) 处理。


## entity_load_multiple_by_name
`entity_load_multiple_by_name($entity_type, $names = FALSE, $conditions = array())`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$names`: `string` | `number`

    实体ID。默认 `FALSE` 查询所有

  - `conditions`: `array`

    查询条件的关联数组。默认 `[]`

- 返回值: `array`

```php
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'entity class' => 'Entity',
            'controller class' => 'EntityAPIController', // 重点
            'entity keys' => array(
                'id' => 'id',
                'name' => 'name', // 重点
            )
            ...
        ),
        'second_entity' => array(
            ...
            'entity class' => 'Entity',
            'controller class' => 'EntityAPIControllerExportable', // 重点
            'entity keys' => array(
                'id' => 'id',
                'name' => 'name', // 重点
            )
            ...
        )
    )
}

// EntityAPIController 不支持 [entity keys][name] 查询。
// 如果未定义 [entity keys][name]，则返回的结构与 entity_load() 一致。
$first = entity_load_multiple_by_name('first_entity', [1, 2]);
// $first 结构如下：
//   array(
//       'zhangsan' => Entity Object,
//       'lisi'     => Entity Object,
//   )

// EntityAPIControllerExportable 支持 [entity keys][name] 查询。
$second = entity_load_multiple_by_name('second_entity', ['zhangsan', 'lisi']);
// $second 结构如下：
//   array(
//       'zhangsan' => Entity Object,
//       'lisi'     => Entity Object,
//   )
```

从数据库中查询实体。与 [entity_load()](#entity-load) 类似，只不过查询出来的数据以 `[entity keys][name]` 作为键名。


## entity_save
`entity_save($entity_type, $entity)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

- 返回值: `int` | `false`

    没有任何修改，返回 `false`。

```php
$user = entity_load_single('user', 1);
$user->name = 'zhangsan';

entity_save('user', $user); // === $user->save();
```

保存实体的更改到数据库。内部含三种保存实体的处理方式：
- 执行 `$entity` 的 `save()`，如果有。
- 执行 `hook_entity_info()` 定义的 `[save callback]` 回调函数，如果有。
- 执行 `hook_entity_info()` 定义的 `[controller class]` 类的 `save()`，如果有。


## entity_delete
`entity_delete($entity_type, $id)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$id`: `string` | `number`

    实体ID。

- 返回值: `void` | `false`

    没有任何删除，返回 `false`。

```php
entity_delete('user', 1);
```

从数据库中删除单个实体。内部调用 [entity_delete_multiple()](#entity-delete-multiple) 处理。


## entity_delete_multiple
`entity_delete_multiple($entity_type, $ids)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$ids`: `string` | `number`

    实体ID列表。

- 返回值: `void` | `false`

    没有任何删除，返回 `false`。

```php
entity_delete('user', array(1, 2));
```

从数据库中删除多个实体。内部含两种删除实体的处理方式：
- 执行 `hook_entity_info()` 定义的 `[deletion callback]` 回调函数，如果有。
- 执行 `hook_entity_info()` 定义的 `[controller class]` 类的 `delete()`，如果有。


## entity_create
`entity_create($entity_type, array $values)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$values`: `array`

    要设置的值数组，键名为属性名。如果实体类型有bundle，则必须指定bundle键。

- 返回值: `object` | `false`

    创建失败，返回 `false`

```php
$new_user = entity_create('user', array(
    'user'      => 'jok',
    'pass'      => '123456',
    'mail'      => 'jokddd@163.com',
    'timezone'  => 'Asia/Shanghai',
    'status'    => 1,
));
```

创建一个新的实体。


## entity_export
`entity_export($entity_type, $entity, $prefix = '')`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

  - `$prefix`: `string`

    每一行的前缀。默认 `''`

- 返回值: `string` | `void`

    返回序列化后的实体字符串。适用于 [entity_import()](#entity-import)

```php
$user = entity_load_single('myuser', 1);
echo entity_export('myuser', $user);
// output:
// {
//   "uid" : "1",
//   "name" : "admin",
//   "pass" : "$S$DuDsJQFJF2q\/fnsUG6mL4.9WyDGtjdOh6BsXPxdyyG6frtqgGEXC",
//   "mail" : "admin@admin.com",
//   "signature" : "",
//   "created" : "1638511267",
//   "access" : "1640932442",
//   "login" : "1640835403",
//   "status" : "1",
//   "rdf_mapping" : []
// }
```

导出一个实体。内部含两种导出实体的处理方式：
- 执行 `$entity` 的 `export()`，如果有。
- 执行 `hook_entity_info()` 定义的 `[controller class]` 类的 `export()`，如果有。


## entity_import
`entity_import($entity_type, $export)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$export`: `string`

    序列化后的实体字符串。参见 [entity_export()](#entity-export)

- 返回值: `object` | `false` | `void`

    返回导入后的实体对象，失败返回 `false`。

```php
$user = entity_load_single('myuser', 1);
$export = entity_export('myuser', $user);
$new_user = entity_import('myuser', $export);
echo $user === $new_user; // false
```

导入一个实体。

::: tip 注意
这只适用于 `[controller class]` 实现 `EntityAPIControllerInterface` 接口的实体。
:::


## entity_revision_load
`entity_revision_load($entity_type, $revision_id)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$revision_id`: `number`

    实体的修订历史ID。

- 返回值: `object` | `false`

    查询不到数据，返回 `false`。

```php
// 查询 ['entity keys']['revision'] = 10 的文章
$node = entity_revision_load('node', 10);
```

从数据库中查询实体的历史数据。参见 [实体的修订表](/)


## entity_revision_delete
`entity_revision_delete($entity_type, $revision_id)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$revision_id`: `number`

    实体的修订历史ID。

- 返回值: `boolean`

```php
// 删除 ['entity keys']['revision'] = 10 的文章
$node = entity_revision_delete('node', 10);
```

从数据库中删除实体的历史数据。内部含两种删除实体的处理方式：
- 执行 `hook_entity_info()` 定义的 `[revision deletion callback]` 回调函数，如果有。
- 执行 `hook_entity_info()` 定义的 `[controller class]` 类的 `deleteRevision()`，如果有。


## entity_revision_is_default
`entity_revision_is_default($entity_type, $entity)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

- 返回值: `boolean`

```php
$node = entity_revision_delete('node', 1);
echo entity_revision_is_default('node', $node); // false
```

检查给定的实体是否为默认版本。

注意，新创建的实体将总是在默认版本中创建，因此对于尚未保存的实体返回TRUE。


## entity_revision_set_default
`entity_revision_set_default($entity_type, $entity)`
- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

```php
$node = entity_revision_delete('node', 1);
entity_revision_set_default('node', $node);
echo entity_revision_is_default('node', $node); // true
```

将给定的实体修订设置为默认修订。

::: tip 注意
这只适用于 `[controller class]` 实现 `EntityAPIControllerRevisionableInterface` 接口的实体。
:::


## entity_type_is_fieldable
`entity_type_is_fieldable($entity_type)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

```php
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'fieldable' => TRUE,
            ...
        )
    )
}

echo entity_type_is_fieldable('first_entity'); // TRUE
```

检查实体是否可扩展字段。


## entity_id
`entity_id($entity_type, $entity)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

```php
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'entity keys' => array(
                'id' => 'id',
                'name' => 'name'
            ),
            ...
        )
    )
}

$entity = entity_create('first_entity', array('id' => 1, 'name' => 'zhangsan'));
// has set [entity keys][name]
echo entity_id($entity); // zhangsan
// not set [entity keys][name]
echo entity_id($entity); // 1
```

获取实体ID。若实体指定了 `[entity keys][name]`，则优先返回 `[entity keys][name]` 对应键的值。


## entity_extract_ids


## entity_build_content
`entity_build_content($entity_type, $entity, $view_mode = 'full', $langcode = NULL)`
- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

  - `$view_mode`: `string`

    视图渲染模式。

  - `$langcode`: `string`

    请求的语言代码。默认 `NULL` 全局

- 返回值: `array` | `void`

```php
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'controller class' => 'FirstEntityController',
            ...
        )
    )
}

class FirstEntityController extends EntityAPIController {
    public function buildContent($entity, $view_mode = 'full', $langcode = NULL, $content = array()) {
        return array(
            '#markup' => t('Hello')
        )
    }
}

$entity = entity_load_single('first_entity', 1);
entity_build_content('first_entity', $entity); // array('#markup' => 'Hello')
```

构建表示实体内容的结构化数组。为实体构建的内容将根据 `$view_mode` 参数的不同而不同。

::: tip 注意
这只适用于 `[controller class]` 实现 `EntityAPIControllerInterface` 接口的实体。
:::


## entity_view
`entity_view($entity_type, $entities, $view_mode = 'full', $langcode = NULL, $page = NULL)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entities`: `object[]`

    实体对象数组。

  - `$view_mode`: `string`

    视图渲染模式。

  - `$langcode`: `string`

    请求的语言代码。默认 `NULL` 全局

  - `$page`: `boolean`

    控制实体是否呈现。该参数只支持 `[controller class]` 实现 `EntityAPIControllerInterface` 接口的实体.

- 返回值: `array` | `false`

```php
$user = entity_load('user');
entity_view('user', $user); // array(...)
```

生成一个数组来呈现给定的实体。内部含两种呈现实体的处理方式：
- 执行 `hook_entity_info()` 定义的 `[view callback]` 回调函数，如果有。
- 执行 `hook_entity_info()` 定义的 `[controller class]` 类的 `view()`，如果有。


## entity_access
`entity_access($op, $entity_type, $entity = NULL, $account = NULL)`

- 参数:
  - `$op`: `string`

    正在执行的操作。`view` `update` `create` `delete` 中的一个。

  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

  - `$account`: `UserController`

    当前操作的用户。

- 返回值: `boolean` | `void`

```php
$node = entity_create('node', array('type' => 'page'));
$access = entity_access('create', 'node', $node, $account);
```

确定给定用户是否可以对实体执行操作。内部调用实体的 `[access callback]` 回调函数。


## entity_form
`entity_form($entity_type, $entity)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

- 返回值: `array` | `void`

  如果没有实体形式或缺少元数据，则返回FALSE。

获取表单的可呈现数组。


## entity_key_array_by_property
`entity_key_array_by_property(array $entities, $property)`

- 参数:
  - `$entities`: `object[]`

    实体对象数组。

  - `$property`: `string`

    实体属性名。

- 返回值: `array`

将实体数组转换为由给定属性的值作为键值的数组。类似 `array_column($entities, NULL, $property)`


## entity_has_status
`entity_has_status($entity_type, $entity, $status)`

- 参数:
  - `$entity_type`: `string`

    实体类型。

  - `$entity`: `object`

    实体对象。

  - `$status`: `number`

    实体状态。可选 `ENTITY_CUSTOM` `ENTITY_IN_CODE` `ENTITY_OVERRIDDEN` `ENTITY_FIXED`

```php
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'entity keys' => array(
                'status' => 'status'
            ),
            ...
        )
    )
}

$entity = entity_create('first_entity', array('id' => 1, 'status' => ENTITY_CUSTOM));
entity_has_status('first_entity', $entity, ENTITY_CUSTOM);     // 自定义
entity_has_status('first_entity', $entity, ENTITY_IN_CODE);    // 预设
entity_has_status('first_entity', $entity, ENTITY_OVERRIDDEN); // 重写
entity_has_status('first_entity', $entity, ENTITY_FIXED);      // 固定
```

检查给定实体是否具有特定的可导出状态。


## entity_var_export
`entity_var_export($var, $prefix = '')`

- 参数:
  - `$var`: `mixed`

    要解析的变量。

  - `$prefix`: `string`

    每行的前缀。默认 `''`

- 返回值: `string`

返回实体的可解析字符串表示。类似 `var_export($entity, true)`


## entity_var_json_export
`entity_var_json_export($var, $prefix = '')`

- 参数:
  - `$var`: `mixed`

    要解析的变量。

  - `$prefix`: `string`

    每行的前缀。默认 `''`

- 返回值: `string`

与 [entity_var_export()](#entity-var-export) 类似，不过该函数返回的是 `json` 格式的字符串。


## entity_defaults_rebuild
`entity_defaults_rebuild($entity_types = NULL)`

- 参数:
  - `$entity_types`: `array`

    需要重新构建的实体类型列表。默认 `NULL` 无

重新构建实体的默认数据。参见 [实体的默认数据](/)


## entity_exportable_schema_fields
`entity_exportable_schema_fields($module_col = 'module', $status_col = 'status')`

- 参数:
  - `$module_col`: `string`

    模块列的字段名。

  - `$status_col`: `status`

    状态列的字段名。

- 返回值: `array`

```php
function mymodule_schema() {
    $schema['first_entity'] = array(
        'fields' => array(
            'id' => array(
                'type' => 'serial',
                'unsigned' => TRUE,
                'not null' => TRUE,
                'description' => 'Primary Key: Unique user ID.',
            ),
            'name' => array(
                'type' => 'varchar',
                'length' => 60,
                'not null' => TRUE,
                'default' => '',
                'description' => 'Unique user name.',
            ),
            // + entity_exportable_schema_fields(), 不建议使用这种方式

            // 复制过来即可
            'status' => array(
                'type' => 'int',
                'not null' => TRUE,
                'default' => 0x01,
                'size' => 'tiny',
                'description' => 'The exportable status of the entity.',
            ),
            'module' => array(
                'description' => 'The name of the providing module if the entity has been defined in code.',
                'type' => 'varchar',
                'length' => 255,
                'not null' => FALSE,
            )
        ),
        'primary key' => array('id'),
        'unique keys' => array(
            'name' => array('name'),
        )
    );

    return $schema;
}

function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'exportable' => TRUE, // 需要 status 和 module
            'entity keys' => array(
                'id' => 'id',
                'name' => 'name',
                'status' => 'status', // 必须
                'module' => 'module', // 必须
            ),
            ...
        )
    )
}
```

定义可导出实体所需的字段。


## entity_class_label
`entity_class_label($entity)`

- 参数:
  - `$entity`: `object`

- 返回值: `string`

返回实体的标签。


## entity_class_uri
`entity_class_uri($entity)`

- 参数:
  - `$entity`: `object`

- 返回值: `string`

返回实体的 uri。


## entity_i18n_string


## entity_ui_controller
`entity_ui_controller($type = NULL)`

- 参数:
  - `$type`: `string`

    实体类型。默认 `NULL` 返回默认控制器

```php {7}
function mymodule_entity_info() {
    return array(
        'first_entity' => array(
            ...
            'admin ui' => array(
                'path' => 'admin/content/first_entity',
                'controller class' => 'EntityDefaultUIController',
            ),
            ...
        )
    )
}

entity_ui_controller('first_entity'); // EntityDefaultUIController object
```

获取实体的UI控制器类。


## entity_get_controller

## entity_get_extra_fields_controller

## entity_get_info

## entity_info_cache_clear



## entity_metadata_wrapper

## entity_metadata_site_wrapper

## entity_metadata_convert_schema








## entity_create_stub_entity

## entity_prepare_view

## entity_view_mode_prepare

## entity_uri

## entity_label

## entity_language

## entity_form_field_validate

## entity_form_submit_build_entity

