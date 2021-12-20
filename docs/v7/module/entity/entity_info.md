# {hook}_entity_info

## 完整用法
```php
```

## 属性解析

### label
- 类型：`string`
- 必填：`true`
- 用法：
    ```php
    'label' => t('User')
    ```

人类可读的类型名称。


### plural label
- 类型：`string`
- 必填：`false`
- 用法：
    ```php
    'plural label' => t('User List')
    ```

实体入口的菜单名称。若未定义，则使用 `label`。


## description
- 类型：`string`
- 必填：`false`
- 用法：
    ```php
    'description' => t('This is a user entity.')
    ```

实体的描述信息。

## static cache
- 类型：`boolean`
- 默认值：`true`
- 用法：
    ```php
    'static cache' => FALSE,
    ```

如果需要在页面请求期间禁用实体的静态缓存，请设置为 `FALSE`。

## field cache
- 类型：`boolean`
- 默认值：`true`
- 用法：
    ```php
    'field cache' => FALSE,
    ```

用于Field API加载和保存字段数据。如果需要禁用 `Field API` 对字段数据的持久缓存，请设置为 `FALSE`。

> 仅当实体类型有更高级别的持久缓存可用时才建议使用。


## entity cache
- 类型：`boolean`
- 默认值：`false`


## load hook
- 类型：`string`
- 用法：
    ```php
    'load hook' => 'node_load',
    ```

应该被 `DrupalDefaultEntityController::attachLoad()` 调用的钩子的名称，例如'node_load'。

TODO: 待实验


## fieldable
- 类型：`boolean`
- 默认值：`false`
- 用法：
    ```php
    'fieldable' => TRUE,
    ```

是否允许对实体附加字段。
TODO: 待实验


## exportable
- 类型：`boolean`
- 默认值：`false`
- 用法：
    ```php
    'exportable' => TRUE,
    ```
实体是否可以导出。


## module
- 类型：`string`
- 用法：
    ```php
    'module' => 'module_name',
    ```

提供实体类型的模块。这是可选的，但强烈建议。


## translation
- 类型：`string`


## base table
- 类型：`string`
- 必填：`true`
- 用法：
    ```php
    'base table' => 'user',
    ```

实体类型的基表名称，即实体的数据来源。(由 DrupalDefaultEntityController 类使用)


## revision table
- 类型：`string`
- 必填：`true`
- 用法：
    ```php
    'revision table' => 'user_type',
    ```

实体类型的修订表的名称。


## entity class
- 类型：`string`
- 必填：`false`
- 用法：
    ```php
    'entity class' => 'User',
    ```

提供一个可CURD操作的类对实体进行实例化。建议对基类 `Entity` 进行扩展。

上面的代码会实例化一个 `User` 对象，若 `User` 对象继承于 `Entity`，则可以使用 `Entity` 提供的CURD方法。如：
```php
$user->save();
$user->delete();
$user->export();
```
更多操作，请看 `Entity` 类实现。


## controller class
- 类型：`string`
- 用法：
    ```php
    'controller class' => 'EntityAPIController',
    ```

用于加载对象的类名。该类必须实现 `DrupalEntityControllerInterface` 接口，默认使用 `DrupalDefaultEntityController` 类。

::: tip
该类是真正实现对数据库的CURD操作类。`entity class` 指定的类，其内部的CURD操作实际上是调用 `controller class` 的方法。
:::


## rules controller class
- 类型：`string`


## metadata controller class
- 类型：`string`


## extra fields controller class
- 类型：`string`


## features controller class
- 类型：`string`


## i18n controller class
- 类型：`string`


## views controller class
- 类型：`string`


## entity keys
- 类型：`array`
- 详细：
    - `id`: `string`

    - `revision`: `string`

        默认：''
    - `bundle`: `string`

        默认：''
    - `label`: `string`

        默认：''
    - `language`: `string`

    - `name`: `string`


    - `module`: `string`

        默认：'module'
    - `status`：`string`

        默认：'status'
    - `default revision`：`string`

        默认：'default_revision'

- 示例：
    ```php
    'entity keys' => array(
        'id' => 'entity_id',
        'name' => 'entity_name',
        'module' => ''
    ),
    ```

## export
- 类型：`array`
- 详细：
    - `default hook`: `string`


## admin ui
- 类型：`array`
- 详细：
    - `path`: `string`
    - `controller class`: `string`
    - `file`: `string`
    - `file path`: `string`
    - `menu wildcard`: `string`


## view modes
- 类型：`array`
- 详细：
    - `label`: `string`
    - `custom settings`: `boolean`


## label callback
- 类型：`string`


## uri callback
- 类型：`string`


## access callback
- 类型：`string`


## form callback
- 类型：`string`


## language callback
- 类型：`string`


## bundle keys
- 类型: `array`
- 详细：
    - `bundle`: `string`


## bundles
- 类型: `array`
- 详细：
    - `label`: `string`
    - `uri callback`: `string`
    - `admin`: `array`
        - `path`: `string`
        - `bundle argument`: `string`
        - `real path`: `string`
        - `path`: `string`
        - `access callback`: `string`
        - `access arguments`: `string`


## bundle of
- 类型: `string`

