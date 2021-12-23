# 实体的默认数据
在实际业务开发中，经常遇到某些表创建后，需要写一些默认数据。以前大部分都是使用 `{hook}_install` 钩子实现，但是现在有了 `Entity` 模块，提供了特定的钩子以及管理界面来帮助我们更好的处理默认数据。

需求：创建一个角色模块，要求使用实体，并在模块启动后设置两个默认角色 `Admin` 和 `Manager`。


## 创建 `cao_role` 模块
结构如下：
```
cao
|__cao_role
|    |_ cao_role.info
|    |_ cao_role.install
|    |_ cao_role.module
|__cao.info
|__cao.module
```


### `cao_role.info`
```info
name = CAO Role
description = 默认实体的处理案例
core = 7.x
php = 5.6
package = case

dependencies[] = cao
```


### `cao_role.install`
```php
<?php

/**
 * Implement {hook}_schema
 */
function cao_role_schema() {
    $schema = array(
        'cao_role' => array(
            'description' => 'CAO用户角色表',
            'fields' => array(
                'rid' => array(
                    'type' => 'serial',
                    'not null' => TRUE,
                    'description' => '自增ID',
                ),
                'name' => array(
                    'type' => 'varchar',
                    'length' => 64,
                    'not null' => TRUE,
                    'description' => '角色名称',
                ),
                'create_time' => array(
                    'type' => 'int',
                    'not null' => TRUE,
                    'default' => '0',
                    'description' => '创建时间',
                ),
            ) + entity_exportable_schema_fields(),
            'primary key' => array('rid'),
            'unique keys' => array(
                'name' => array('name')
            ),
        )
    );

    return $schema;
}
```

上面代码定义了一张数据库表，生成的SQL语句如下：
```sql
CREATE TABLE `cao_role` (
	`rid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`name` VARCHAR(64) NOT NULL COMMENT '角色名称' COLLATE 'utf8_general_ci',
	`create_time` INT(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
	`status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT 'The exportable status of the entity.',
	`module` VARCHAR(255) NULL DEFAULT NULL COMMENT 'The name of the providing module if the entity has been defined in code.' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`rid`) USING BTREE,
	UNIQUE INDEX `name` (`name`) USING BTREE
)
COMMENT='CAO用户角色表' COLLATE='utf8_general_ci' ENGINE=InnoDB;
```

与代码作对比，可以看出多了 `status` 和 `module` 字段。其实这两个字段是由 `entity_exportable_schema_fields()` 创建的，其内部实现如下：
```php
// file: modules/entity/entity.module 1089
function entity_exportable_schema_fields($module_col = 'module', $status_col = 'status') {
  return array(
    $status_col => array(
      'type' => 'int',
      'not null' => TRUE,
      // Set the default to ENTITY_CUSTOM without using the constant as it is
      // not safe to use it at this point.
      'default' => 0x01,
      'size' => 'tiny',
      'description' => 'The exportable status of the entity.',
    ),
    $module_col => array(
      'description' => 'The name of the providing module if the entity has been defined in code.',
      'type' => 'varchar',
      'length' => 255,
      'not null' => FALSE,
    ),
  );
}
```

这两个字段的用途，后面会说到。


### `cao_role.module`
```php
<?php
/**
 * Implement {hook}_entity_info
 *
 * 作用：
 *   定义多个实体的信息
 *
 * 返回值：
 *   array
 */
function cao_role_entity_info() {
    return array(
        'cao_role' => array(
            'label' => t('CAO Role'),
            'plural label' => t('CAO Role'),
            'description' => t('CAO Role Description'),
            'base table' => 'cao_role',
            'entity class' => 'Entity',
            // 'controller class' => 'EntityAPIController',
            'controller class' => 'EntityAPIControllerExportable',
            'module' => 'cao_role',
            'exportable' => true,
            'entity keys' => array(
                'name' => 'name',
                'id' => 'rid',
                'label' => 'name',
                'status' => 'status',
                'module' => 'module',
            ),
            'admin ui' => array(
                'path' => 'admin/config/cao/role',
                'controller class' => 'EntityDefaultUIController',
            ),
            'label callback' => 'entity_class_label',
            'access callback' => 'cao_role_access',
            // 'export' => array(
            //     'default hook' => 'cao_role_export'
            // ),
        )
    );
}
```

上面代码定义了一个 `cao_role` 实体，这里只介绍部分属性，其余属性请前往 [Entity Info](/) 查看。

我们重点关注 `exportable` `entity keys` 和 `export` 这三个属性。

- `exportable` 定义了实体是否可以导出。
- `entity keys` 所有属性都是对应数据表的字段。
  - `id`: 其主要用于标识实体的唯一性。字段值必须是数字。
  - `name`: 和 `id` 用途一致。
  - `label`: 显示的标签。
  - `status`: 用于标记实体的状态。
  - `module`: 用于标记实体的所属模块。
- `export` 定义实体导出的函数。
  - `default hook` 定义导出实体默认值的钩子。默认值：`default_{ENTITY_TYPE}`

以上，一个实体创建完成，可以安装模块了。

---

## 实现 `access callback` 函数
当 `cao_role` 模块安装好后，进入配置页面，会出现如下错误：
<img :src="$withBase('/images/module/entity/entity_default-2.jpg')" alt="foo">

这是因为使用了 `Entity` 模块提供的 `EntityDefaultUIController` 管理界面类。其内部实现了 `{hook}_menu` 钩子，访问页面时会调用 `access callback` 函数进行验证权限。

`cao_role.module` 文件追加如下代码：
```php
// file: cao/cao_role/cao_role.module
/**
 * 参数：
 *   - $op           string       操作。如：view、update、create、delete
 *   - $entity       Entity|null  当前操作的实体对象
 *   - $account      User|null    用户实体
 *   - $entity_type  string       实体类型
 *
 * 返回值：
 *   boolean
 */
function cao_role_access($op, $entity, $account, $entity_type) {
    return user_access('administer site configuration');
}
```

代码添加后，发现找不到模块。这是因为菜单项没有父菜单。

解决方案（选其中一种即可）：
- 修改 [admin ui][path] 路径。

    如：`admin/config/cao/role` -> `admin/config/people/role`
    <img :src="$withBase('/images/module/entity/entity_default-3.jpg')" alt="foo">

- 在 `cao.module` 文件下添加父菜单。

    ```php
    // file: cao/cao.module
    /**
    * Implement {hook}_menu
    */
    function cao_menu() {
        $items = array();
        $items['admin/config/cao'] = array(
            'title' => t('CAO'),
            'description' => t('实体相关案例'),
            'access callback' => TRUE,
            'page callback' => 'system_admin_menu_block_page',
            'page arguments' => array('access administration pages'),
            'file' => 'system.admin.inc',
            'file path' => drupal_get_path('module', 'system'),
            'weight' => -100,
        );
        return $items;
    }
    ```
    <img :src="$withBase('/images/module/entity/entity_default-1.jpg')" alt="foo">

---

## 实现 `{hook}_default_{ENTITY TYPE}` 函数
当我们进入 `CAO Role` 页面后，会发现什么都没有。
<img :src="$withBase('/images/module/entity/entity_default-4.jpg')" alt="foo">

要想实现模块安装后，自动写入默认数据，有很多种方式。例如：
1. 在 `{hook}_install` 钩子里面写 `sql` 进行添加。
    - 坏处：默认值的修改麻烦
2. 在 `{hook}_default_{ENTITY TYPE}` 钩子导出默认数据。
    - 好处：默认值的由 `Entity` 模块管理，修改容易，且不会覆盖已重写的数据

这里我们使用第二种方式实现，代码如下：
```php
// file: cao/cao_role/cao_role.module
/**
 * Implement {hook}_default_{ENTITY TYPE}
 *
 * 作用：
 *   定义实体的默认数据
 *
 * 触发时间：
 *   - 模块启用
 *   - 清除缓存 / drush edr {module_name}
 */
function cao_role_default_cao_role() {
    // 定义两个默认角色
    $export = array(
        'Admin' => entity_create('cao_role', array()),
        'Manager' => entity_create('cao_role', array())
    );
    return $export;
}
/**
 * Implement {hook}_default_{ENTITY TYPE}_alter
 *
 * 作用：
 *   实体默认值的额外处理
 *
 * 触发时间：
 *   - {hook}_default_{ENTITY TYPE} 之后触发
 */
function cao_role_default_cao_role_alter(&$entities) {
    // 为默认角色添加创建时间
    foreach ($entities as $v) {
        $v->create_time = REQUEST_TIME;
    }
}
```

上面代码导出了两个实体默认值。当模块 `安装` 或 `清除缓存 / drush edr {module_name}` 时，会将导出的实体写入到对应的数据表中。

其中 `Admin` 和 `Manager` 对应实体的主键值。
- 当未定义 `[entity keys][name]` 属性时，我们需要这样写：
    ```php
    $export = array(
        1 => entity_create('cao_role', array('name' => 'Admin')),
        2 => entity_create('cao_role', array('name' => 'Manager'))
    );
    ```

使用 `[entity keys][id]` 作为实体的唯一标识，可能会发生冲突。最好还是使用 `[entity keys][name]` 属性来作为实体的唯一标识。


::: tip
在 `{hook}_entity_info` 钩子里有一个 `export` 属性，其 `default hook` 属性指定导出默认值的函数。

如 `'export' => array('default hook' => 'cao_role_export')`, 触发的钩子如下：
- {hook}_cao_role_export
- {hook}_cao_role_export_alter

未指定该属性时，默认触发 `{hook}_default_{ENTITY TYPE}` 和 `{hook}_default_{ENTITY TYPE}_alter` 钩子。
:::

除了上面的钩子外，还有另外一个钩子 `{hook}_{ENTITY_TYPE}_defaults_rebuild` 也与默认值有关。
```php
/**
 * Implement {hook}_{ENTITY_TYPE}_defaults_rebuild
 *
 * 参数：
 *   - $entities   Entity[]  新的实体默认值（代码）
 *   - $originals  Entity[]  旧的实体默认值（数据库）
 *
 * 作用：
 *   当重新构建实体的默认值时，会触发该钩子。
 *
 * 触发时间：
 *   - 模块安装
 *   - 模块禁用
 *   - 清除缓存
 *
 * @see _entity_defaults_rebuild()
 */
function cao_role_cao_role_defaults_rebuild($entities, $originals) {
    // 基本上用不到...
}
```

**最后需要注意的是，`[base table]` 对应的表必须有 `[entity keys][status]` 和 `[entity keys][module]` 属性指定的字段。**

其内部处理如下：
```php
// file: modules/entity/entity.module
function _entity_defaults_rebuild($entity_type) {
    if (lock_acquire('entity_rebuild_' . $entity_type)) {
        $info = entity_get_info($entity_type);
        $hook = isset($info['export']['default hook']) ? $info['export']['default hook'] : 'default_' . $entity_type;
        $keys = $info['entity keys'] + array('module' => 'module', 'status' => 'status', 'name' => $info['entity keys']['id']);

        // Check for the existence of the module and status columns.
        if (!in_array($keys['status'], $info['schema_fields_sql']['base table']) || !in_array($keys['module'], $info['schema_fields_sql']['base table'])) {
            trigger_error("Missing database columns for the exportable entity $entity_type as defined by entity_exportable_schema_fields(). Update the according module and run update.php!", E_USER_WARNING);
            return;
        }

        // ...
        module_invoke_all($entity_type . '_defaults_rebuild', $entities, $originals);
        // ...
    }
}
```



## 总结
完成上面的步骤，清空缓存就可以看到数据了，如下：
<img :src="$withBase('/images/module/entity/entity_default-5.jpg')" alt="foo">

可以看到，与普通的实体管理界面相比，多出了 `import` `export` `clone` 和 `reset` 操作和 `status` 列。

- `Admin` 和 `Manage` 是代码导出的默认数据。
- `Teacher` 是通过 `Import cao role` 导入的。
- `Student` 是通过 `Add cao role` 新增的。
- `Manager` 是通过 `edit` 编辑过的，所以状态变为 `覆写`。

可以发现，实体的状态都是由 `Entity` 模块负责的。当我们修改代码的默认值时，`Entity` 模块会按照一定规则进行处理 `↓`。


### 实体的状态分三种
- **默认**: 代码导出的默认数据。无法删除，可以编辑。且编辑后状态变更为 `覆写`。
- **覆写**: 对默认数据进行修改。
- **自定义**: 通过导入或新增的数据，状态都为 `自定义`。


### 实体默认值重写规则
- 当数据状态为 `默认` 时，与代码导出的默认值做对比：
    - 代码有，数据库无，则新增
    - 代码无，数据库有，则删除
    - 代码有，数据库有，则更新

- 当数据状态为 `覆写` 时，与代码导出的默认值做对比：
    - 代码无，数据库有，状态变为 `自定义`
    - 代码有，数据库有，无变化

- 当数据状态为 `自定义` 时，与代码导出的默认值做对比：
    - 代码无，数据库有，无变化
    - 代码有，数据库有，状态变为 `覆写`



## 注意
- `exportable` 属性必须为 `true`, 否则不会处理默认值。

- `[base table]` 必须具有 `[entity keys][status]` 和 `[entity keys][module]` 字段。

- 最好使用 `EntityAPIControllerExportable` 来处理实体的 `CURD` 操作，其内部对"可导出"的实体做了专门的操作。

- 若想使用 `EntityAPIController` 来处理实体的 `CURD` 操作，则必须注意以下几点：
    - `[entity keys][name]` 与 `[entity keys][id]` 必须一致
        ```php {6,11}
        // file: cao/cao_role/cao_role.module
        function cao_role_entity_info() {
            return array(
                'cao_role' => array(
                    // ...
                    'controller class' => 'EntityAPIController',
                    'exportable' => true,
                    'entity keys' => array(
                        'id' => 'rid',
                        'label' => 'name',
                        // 'name' => 'rid',
                        // 'status' => 'status', // 字段名称为 status 可忽略不写
                        // 'module' => 'module', // 字段名称为 module 可忽略不写
                    ),
                )
            );
        }
        ```
    - 导出的默认值"键名"修改
        ```php {4,5}
        // file: cao/cao_role/cao_role.module
        function cao_role_default_cao_role() {
            $export = array(
                '1' => entity_create('cao_role', array('name' => 'Admin')),
                '2' => entity_create('cao_role', array('name' => 'Manager'))
            );
            return $export;
        }
        ```
    - 实体状态的处理与 `EntityAPIControllerExportable` 会有些区别。
        - 导入实体时，状态为"默认"
        - 编辑"默认"的实体时，状态不会变化
        - ...
