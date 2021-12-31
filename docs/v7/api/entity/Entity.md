# Entity Class

实体基类。

主要用于将数据库查询到的数据，作为该类的属性，并提供一系列对数据的操作。

```php {5}
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity class' => 'Entity'
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
echo $mymodule instanceof Entity; // TRUE
```


## internalIdentifier()
- 返回值: `number` | `NULL`

返回当前实体 `[entity keys][id]` 指定的键值。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity keys' => array(
                'id' => 'mid'
            ),
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->internalIdentifier(); // return $mymodule->mid
```


## identifier()
- 返回值: `number` | `string` | `NULL`

返回当前实体 `[entity keys][name]` 指定的键值。

未设置 `[entity keys][name]` 时默认为 `[entity keys][id]`。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity keys' => array(
                'id' => 'mid',
                'name' => 'name', // default: 'name' => 'mid'
            ),
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->identifier(); // return $mymodule->name
```


## entityInfo()
- 返回值: `array`

返回当前实体的信息。


## entityType()
- 返回值: `string`

返回当前实体标识符。


## bundle()
- 返回值: `mixed`

如果有定义 `[entity keys][bundle]` ，返回实体 `[entity keys][bundle]` 指定键的值。否则，返回当前实体的 `ENTITY TYPE`。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity keys' => array(
                'bundle' => 'name'
            ),
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
// has set [entity keys][bundle]
$mymodule->bundle(); // return $mymodule->name
// not set [entity keys][bundle]
$mymodule->bundle(); // return 'mymodule'
```

## wrapper()
- 返回值: `EntityDrupalWrapper`

返回经过 `元数据` 封装后的对象。参见 [EntityDrupalWrapper](/)


## label()
- 返回值: `string`

返回实体的标签。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'label callback' => 'mymodule_label',
            ...
        )
    );
}
function mymodule_label($entity, $entuty_type) {
    return $entity->name;
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->label(); // return mymodule_label()
```


## defaultLabel() <Badge type="warn" text="protected"/>
- 返回值: `string`

返回实体默认的标签。

建议重写该方法，并将 `[label callback]` 设置为 `entity_class_label`。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity class' => 'MyModuleEntity',
            'label callback' => 'entity_class_label',
            'entity keys' => array(
                'label' => 'name'
            ),
            ...
        )
    );
}
class MyModuleEntity extends Entity {
    protected function defaultLabel() {
        return $this->{$this->entityInfo['entity keys']['label']};
    }
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->label(); // return $mymodule->name;
```


## uri()
- 返回值: `array`
  - `path`: `string`

    路径。如：`default/1`

返回 `uri` 路径。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'uri callback' => 'mymodule_uri', // 其次
            'entity keys' => array(
                'bundle' => 'type'
            ),
            'bundles' => array(
                'type' => array(
                    'uri callback' => 'mymodule_type_uri', // 优先
                )
            )
            ...
        )
    );
}
function mymodule_uri($entity, $entuty_type) {
    return array('path' => 'mymodule/1');
}
function mymodule_type_uri($entity, $entuty_type) {
    return array('path' => 'mymodule/type/1');
}

$mymodule = entity_load_single('mymodule', 1);
// has set `[bundles][BUNDLE][uri callback]`
$mymodule->uri(); // return mymodule_type_uri()
// not set `[bundles][BUNDLE][uri callback]`
$mymodule->uri(); // return mymodule_uri()
```


## defaultUri() <Badge type="warn" text="protected"/>
- 返回值: `array`
  - `path`: `string`

    路径。如：`default/1`

返回默认 `uri` 路径。

建议重写该方法，并将 `[uri callback]` 设置为 `entity_class_uri`。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'entity class' => 'MyModuleEntity',
            'uri callback' => 'entity_class_uri',
            'entity keys' => array(
                'id' => 'mid'
            ),
            ...
        )
    );
}
class MyModuleEntity extends Entity {
    protected function defaultUri() {
        return array('path' => 'default/' . $this->identifier());
    }
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->uri(); // return array('path' => 'default/1')
```


## hasStatus()
- 参数:
  - `$status`: `number`

- 返回值: `boolean` | `NULL`

当实体设置了 `exportable` 为 `TRUE` 时，才会判断实体的状态，否则返回 `NULL`。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'exportable' => TRUE, // 强制需要 status 和 module 字段
            'entity keys' => array(
                'id' => 'mid',
                'status' => 'status', // 数据库表必须有该字段
                'module' => 'module', // 数据库表必须有该字段
            ),
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
$mymodule->hasStatus(ENTITY_CUSTOM);     // 自定义
$mymodule->hasStatus(ENTITY_IN_CODE);    // 预设
$mymodule->hasStatus(ENTITY_OVERRIDDEN); // 覆写
```


## save()
参见 [EntityAPIControllerRevisionableInterface->save](#save)


## delete()
参见 [EntityAPIControllerRevisionableInterface->delete](#export)


## export()
- 参数:
  - `$prefix`: `string`。 默认 `''`

参见 [EntityAPIControllerRevisionableInterface->export](#export)


## view()
- 参数:
  - `$view_mode`: `string`。默认 `'full'`
  - `$langcode`: `string`。默认 `NULL`
  - `$page`: `mixed`。默认 `NULL`

参见 [EntityAPIControllerRevisionableInterface->view](#buildContent)


## buildContent()
- 参数:
  - `$view_mode`: `string`。默认 `'full'`
  - `$langcode`: `string`。默认 `NULL`

参见 [EntityAPIControllerRevisionableInterface->buildContent](#buildContent)


## getTranslation()
- 参数:
    - `$property`: `string`

        实体的属性键名。
    - `$langcode`: `string`。默认 `NULL`

        语言代码。

- 返回值：`mixed`

获取实体某个属性翻译后的值。


## isDefaultRevision()
- 返回值：`boolean`

判断是否为默认修订。

```php
function mymodule_entity_info() {
    return array(
        'mymodule' => array(
            ...
            'base table' => 'mymodule',
            'revision table' => 'mymodule_revision',
            'entity keys' => array(
                'id' => 'mid',
                'revision' => 'vid',
                'default revision' => 'vid', // default: 'default revision' => 'default_revision'
            ),
            ...
        )
    );
}

$mymodule = entity_load_single('mymodule', 1);
// has set [entity keys][revision]
$mymodule->isDefaultRevision(); // return !empty($this->vid)
// not set [entity keys][revision]
$mymodule->isDefaultRevision(); // return TRUE
```
