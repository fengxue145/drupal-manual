# 实体 Property

`Property` 即属性。简单来说，就是给实体添加各种属性值。在开发中，我们经常使用 `class` 来定义类，同时为其添加各种属性值，而这些属性值可通过 `__set()` 和 `__get()` 等魔术方法进行拦截处理。

实体的 `Property` 属性主要充当这部分的处理，省去重复繁琐的工作，提供了一个抽象结构来定义属性。其中支持对属性的 `设置` `获取` `验证` `权限` `初始化` `过滤` 等操作。




## 定义 `Property` 方式
定义实体的 `property` 有四种方式, 如下：
1. [default property info](#default-property-info)

    默认实体属性。

2. [hook_entity_property_info](#hook-entity-property-info)

    `{hook}_entity_property_info` 钩子定义实体属性。

3. [entity_metadata_wrapper](#entity-metadata-wrapper)

    `entity_metadata_wrapper()` 第三个参数定义实体属性。

4. [metadata controller class](#metadata-controller-class)

    元数据类定义实体属性。**推荐**



### default property info

当使用 `entity_metadata_wrapper` 包装时，会自动根据实体字段来生成默认的 `property info`。

```php
$my_user = entity_load_single('my_user', 1);
$wrapper = entity_metadata_wrapper('my_user', $my_user);
// 属性默认是 只读 的.
$wrapper->name = "zhangsan"; // error


// 可通过第三个参数，修改自动生成的属性定义。
$wrapper2 = entity_metadata_wrapper('my_user', $my_user, array(
    'property defaults' => array(
        'getter callback'   => 'entity_property_verbatim_get',
    ),
    // 或者使用 property info alter 选项
));
$wrapper2->name = "zhangsan"; // ok
```

::: tip
默认生成的属性是 `readonly` 的.
:::


### hook_entity_property_info

实现 `{hook}_entity_property_info` 或 `{hook}_entity_property_info_alter` 钩子。

```php
/**
 * Implements {hook}_entity_property_info()
 *
 * 作用：
 *   定义实体属性
 */
function my_user_entity_property_info() {
    $info = array();
    $properties = &$info['my_user']['properties'];
    $properties['name'] = array(
        'label'             => t("Name"),
        'description'       => t("The login name of the user account."),
        'getter callback'   => 'entity_metadata_user_get_properties',
        'setter callback'   => 'entity_property_verbatim_set',
        'sanitize'          => 'filter_xss',
        'required'          => TRUE,
        'access callback'   => 'entity_metadata_user_properties_access',
        'schema field'      => 'name',
    );
    return $info;
}

/**
 * Implements {hook}_entity_property_info_alter
 *
 * 作用：
 *   追加/修改 实体属性定义
 */
function my_user_entity_property_info_alter(&$info) {
    $properties = &$info['my_user']['properties'];
    $properties['mail'] = array(
        'label'                 => t("Email"),
        'description'           => t("The email address of the user account."),
        'setter callback'       => 'entity_property_verbatim_set',
        'validation callback'   => 'valid_email_address',
        'required'              => TRUE,
        'access callback'       => 'entity_metadata_user_properties_access',
        'schema field'          => 'mail',
    );
}
```
详细参见 [Property info 选项](#property-info-选项)


### entity_metadata_wrapper

`entity_metadata_wrapper()` 传入第三个参数来定义属性。

```php
$my_user = entity_load_single('my_user', 1);
$warpper = entity_metadata_wrapper('my_user', $my_user, array(
    'property info' => array(
        'name' => array(
            'label'                 => t('User Name'),
            'description'           => t('The login name of the user account.'),
            'getter callback'       => 'entity_property_verbatim_get',
            'setter callback'       => 'entity_property_verbatim_set',
            'sanitize'              => 'filter_xss',
            'required'              => TRUE,
            'access callback'       => 'cao_user_property_access',
            'schema field'          => 'name'
        ),
        'mail' => array(
            'label'                 => t("Email"),
            'description'           => t("The email address of the user account."),
            'setter callback'       => 'entity_property_verbatim_set',
            'validation callback'   => 'valid_email_address',
            'required'              => TRUE,
            'access callback'       => 'entity_metadata_user_properties_access',
            'schema field'          => 'mail',
        ),
    ),
));
```
详细参见 [Property 选项](#property-选项)

::: tip
对使用 `{hook}_entity_info` 钩子定义的实体，**不建议**使用该方式定义实体的属性。默认该属性会被 `{hook}_entity_peoperty_info` 钩子重写（非覆盖）。
<br><br>
若未定义 `{hook}_entity_peoperty_info` 钩子，则会自动生成属性。参考 [default property info](#default-property-info)
:::


### metadata controller class

使用 `metadata controller class` 定义实体的属性信息。

```php {5}
function my_user_entity_info() {
    return array(
        'my_user' => array(
            ...
            'metadata controller class' => 'MyUserMetadataController',
            ...
        )
    );
}

class MyUserMetadataController extends EntityDefaultMetadataController {
    public function entityPropertyInfo()
    {
        // 获取自动生成的属性定义
        $info = parent::entityPropertyInfo();
        $properties = &$info[$this->type]['properties'];

        // 追加属性定义
        $properties['real_name'] = array(
            'label'           => t('real name'),
            'setter callback' => 'entity_property_verbatim_set',
            'schema field'    => 'name',
        );
        return $info;
    }
}

$my_user = entity_load_single('my_user', 1);
$warpper = entity_metadata_wrapper('my_user', $my_user);
$warpper->real_name = "张三";

echo $warpper->real_name->value(); // output: 张三
echo $my_user->name;               // output: 张三
```




## `Property` 选项
完整结构如下：
```php
array(
    'langcode' => 'en',
    'bundle' => array(),
    'auto creation' => 'auto_creation',
    'property info' => array(
        'name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            'schema field'     => 'name'
        ),
        ...
    ),
    'property info alter' => 'user_property_info_alter',
    'property defaults' => array(
        'type'              => 'text',
        'getter callback'   => 'entity_property_verbatim_get',
        'clear'             => array()
    ),
)
```


### `langcode`
- 类型：`string`
- 默认值: `NULL`

```php
'langcode' => 'en',
```

如果属性是基于语言的，请定义。


### `bundle`
- 不懂。日后回来填坑


### `auto creation`
- 类型: `string`
- 定义: `auto_creation($name, $info)`
    - `$name`: `string`

        属性的名称。

    - `$info`: `struct`

        属性的定义信息。

```php
function auto_creation($name, $info) {
    return [];
}

$wrapper = entity_metadata_wrapper(NULL, NULL, array(
    'auto creation' => 'auto_creation',
    'property info' => array(
        'name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            'schema field'     => 'name'
        )
    ),
));
```

初始化属性的数据对象。


### `property info`
- 类型: `struct`

```php
'property info' => array(
    'name' => array(
        'type'             => 'text',
        'setter callback'  => 'entity_property_verbatim_set',
        'schema field'     => 'name'
    )
),
```

定义数据的属性信息。同 `{hook}_entity_property_info` 钩子返回数据的结构一致。

参见 [Property info 选项](#property-info-选项)


### `property info alter`
- 类型: `string`

```php
'property info alter' => 'user_property_info_alter',

function user_property_info_alter($wrapper, $info) {
    $info['properties']['name']['required'] = TRUE;
    return $info;
}
```

在包装器被使用之前，修改/新增 `property info`。 同 `{hook}_entity_property_info_alter` 钩子一样的作用。


### `property defaults`
- 类型: `struct`
- 默认值：
    ```php
    array(
        'type'              => 'text',
        'getter callback'   => 'entity_property_verbatim_get',
        'clear'             => array()
    )
    ```

```php
'property info' => array(
    'name' => array(
        'setter callback'  => 'entity_property_verbatim_set',
        'schema field'     => 'name'
    ),
    // 实际完整如下：
    // 'name' => array(
    //     'setter callback'  => 'entity_property_verbatim_set',
    //     'schema field'     => 'name',
    //     'type'             => 'text',
    //     'getter callback'  => 'entity_property_verbatim_get',
    //     'clear'            => array()
    // ),
),
```

实体属性默认选项。




## `Property info` 选项
完整结构如下:
```php
'{name}' => array(
    'type'                  => 'text',
    'label'                 => t('Label'),
    'description'           => t('Description'),
    'setter callback'       => 'entity_property_verbatim_set',
    'getter callback'       => 'entity_property_verbatim_get',
    'raw getter callback'   => 'entity_property_verbatim_get',
    'access callback'       => 'entity_metadata_user_properties_access',
    'setter permission'     => 'administer users',
    'required'              => 'TRUE',
    'validation callback'   => 'valid_email_address',
    'options list'          => 'entity_metadata_user_status_options_list',
    'sanitized'             => TRUE,
    'sanitize'              => 'filter_xss',
    'clear'                 => [],
    // ... 可自由追加自定义属性
)
```
[更多 >>](https://www.drupal.org/docs/7/api/entity-api/data-types)


### `type`
- 类型: `string`
- 默认值: `text`

```php
'type'  => 'text',
```

属性数据类型。参见 [Property 数据类型](#property-数据类型)


### `label`
- 类型: `string`

```php
'label'  => t('Label'),
```

属性标签名。


### `description`
- 类型: `string`

```php
'description'  => t('Description'),
```

属性描述信息。


### `setter callback`
- 类型: `string`
- 定义: `setter_callback($data, $name, $value, $langcode, $type, $info) => void`
    - `$data`: `array` | `object`

        完整的属性数据对象。

    - `$name`: `string`

        属性的名称。

    - `$value`: `mixed`

        新设置的值。

    - `$langcode`: `string` | `NULL`

        属性的语言。

    - `$type`: `string`

        属性的类型。

    - `$info`: `struct`

        属性的定义信息。

```php
'setter callback'  => 'entity_property_verbatim_set',
```

设置属性值的函数。若未设置该选项，默认属性`只读`。

::: tip
若使用内置的 `entity_property_verbatim_set()` 函数来设置属性值，可能需要额外定义 `schema field` 选项。
:::

```php
entity_metadata_wrapper(null, ['real_name' => ''], array(
    'property info' => array(
        'name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            'schema field'     => 'real_name', // 实际数据结构的键。
        )
    ),
));

entity_metadata_wrapper(null, ['real_name' => ''], array(
    'property info' => array(
        'real_name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            // 'schema field'     => 'real_name', // 同名可不设置
        )
    ),
));
```


### `getter callback`
- 类型: `string`
- 默认值: `entity_property_verbatim_get`
- 定义: `getter_callback($data, $options, $name, $type, $info) => mixed`
    - `$data`: `array` | `object`

        完整的属性数据对象。

    - `$options`: `array`

        其他选项。含 `language`

    - `$name`: `string`

        属性的名称。

    - `$type`: `string`

        属性的类型。

    - `$info`: `struct`

        属性的定义信息。


```php
'getter callback'  => 'entity_property_verbatim_get',
```

获取属性值的函数。

::: tip
若使用内置的 `entity_property_verbatim_get()` 函数来获取属性值，可能需要额外定义 `schema field` 选项。
参见 [setter callback](#setter-callback)
:::


### `raw getter callback`
- 类型: `string`
- 定义: `raw_getter_callback($data, $options, $name, $type, $info) => mixed`
    - `$data`: `array` | `object`

        完整的属性数据对象。

    - `$options`: `array`

        其他选项。含 `language`

    - `$name`: `string`

        属性的名称。

    - `$type`: `string`

        属性的类型。

    - `$info`: `struct`

        属性的定义信息。

```php
'raw getter callback'  => 'entity_property_verbatim_get',
```

获取原始属性值的函数。未设置，默认使用 `getter callback`.


### `access callback`
- 类型: `string`
- 定义: `access_callback($op, $name, $data, $account, $type) => boolean`
    - `$op`: `string`

        正在执行的操作。`view` 或 `edit` 其中一个。

    - `$name`: `string`

        属性的名称。

    - `$data`: `mixed`

        属性的值。

    - `$account`: `User` | `NULL`

        当前访问的用户。

    - `$type`: `string`

        属性的类型。

```php
'access callback'  => 'entity_metadata_user_properties_access',
```

访问/设置属性值的权限验证函数。


### `setter permission`
- 类型: `string`

```php
'setter permission'  => 'administer users',
```

同 `access callback` 选项作用相同，固定使用 `user_access()` 来检查权限。

若设置了 `access callback` 选择，则该选项无效。


### `required`
- 类型: `boolean`

```php
'required'  => 'TRUE',
```

设置属性值时，该属性是否必填。


### `validation callback`
- 类型: `string`
- 定义：`validation_callback($value, $info) => boolean`
    - `$value`: `mixed`

        最新的属性值。

    - `$info`: `struct`

        属性的定义信息。

```php
'validation callback'  => 'valid_email_address',
```

设置属性值时的验证函数。


### `options list`
- 类型: `string` | `function`
- 定义: `options_list($name, $info, $op) => array`
    - `$name`: `string`

        属性的名称。

    - `$info`: `struct`

        属性的定义信息。

    - `$op`: `string`

        当前正在进行的操作。`view` 或 `edit` 其中一个。

```php
'options list' => 'entity_metadata_user_status_options_list',

function entity_metadata_user_status_options_list() {
    return array(
        0 => t('Blocked'),
        1 => t('Active'),
    );
}
```

返回属性的可能值选项列表。


### `sanitized`
- 类型: `boolean`
- 默认值：`FALSE`

```php
'sanitized' => 'TRUE',
```

获取数据时是否对数据进行过滤。


### `sanitize`
- 类型: `string`
- 默认值: `filter_xss`

```php
'sanitize' => 'TRUE',
```

获取属性值时的过滤函数。


### `clear`
- 类型: `array`
- 默认值: `[]`

```php
'clear' => array('name', 'token'),
```

当前属性依赖的其他属性列表。




## `Property` 数据类型

### `text`
一个普通标量类型，标量变量是指 int、float、string 或 bool 类型的变量。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'name' => array(
            'type'              => 'text',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'name'
        )
    )
));

$wrapper->name = "lisi";    // ok
$wrapper->name = false;     // ok
$wrapper->name = [];        // error
```

内部实现：
```php
is_scalar($data);
```


### `token`
仅包含小写字母、数字和下划线的字符串。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'name' => array(
            'type'              => 'token',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'name'
        )
    )
));

$wrapper->name = "abc";     // ok
$wrapper->name = "abc_";    // ok
$wrapper->name = "abc_a";   // ok
$wrapper->name = "ABC";     // error
$wrapper->name = "_abc";    // error
$wrapper->name = "abc_A";   // error
```

内部实现：
```php
is_scalar($data) && preg_match('!^[a-z][a-z0-9_]*$!', $data);
```


### `integer`
PHP 整数。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'age' => array(
            'type'              => 'integer',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'age'
        )
    )
));

$wrapper->age = "1";    // ok
$wrapper->age = "000";  // ok
$wrapper->age = 1;      // ok
$wrapper->age = -100;   // ok
$wrapper->age = 1.0;    // error
$wrapper->age = "1.0";  // error
```

内部实现：
```php
is_numeric($data) && strpos($data, '.') === FALSE;
```


### `decimal`
PHP 浮点数或整数。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'age' => array(
            'type'              => 'decimal',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'age'
        )
    )
));

$wrapper->age = "1";    // ok
$wrapper->age = "000";  // ok
$wrapper->age = 1;      // ok
$wrapper->age = -100;   // ok
$wrapper->age = 1.0;    // ok
$wrapper->age = "1.0";  // ok
```

内部实现：
```php
is_numeric($data);
```


### `date`
日期时间戳。同 [integer](#integer)


### `duration`
以秒为单位的时间段。同 [integer](#integer).


### `boolean`
PHP 布尔值。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'is_vip' => array(
            'type'              => 'boolean',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'is_vip'
        )
    )
));

$wrapper->is_vip = true;   // ok
$wrapper->is_vip = false;  // ok
$wrapper->is_vip = 1;      // ok
$wrapper->is_vip = 0;      // ok
$wrapper->is_vip = "aa";   // ok
$wrapper->is_vip = null;   // ok
$wrapper->is_vip = [];     // error
```

内部实现：
```php
is_scalar($data) && (is_bool($data) || $data == 0 || $data == 1);
```


### `uri`
完整的 URL 链接。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'url' => array(
            'type'              => 'uri',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'url'
        )
    )
));

$wrapper->url = 'https://wwww.baidu.com/';          // ok
$wrapper->url = 'https://wwww.baidu.com/?node=1';   // ok
$wrapper->url = 'wwww.baidu.com';                   // error
$wrapper->url = '/node/1';                          // error
```

内部实现：
```php
valid_url($data, TRUE);
function valid_url($url, $absolute = FALSE) {
  if ($absolute) {
    return (bool)preg_match("
      /^                                                      # Start at the beginning of the text
      (?:ftp|https?|feed):\/\/                                # Look for ftp, http, https or feed schemes
      (?:                                                     # Userinfo (optional) which is typically
        (?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*      # a username or a username and password
        (?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@          # combination
      )?
      (?:
        (?:[a-z0-9\-\.]|%[0-9a-f]{2})+                        # A domain name or a IPv4 address
        |(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\])         # or a well formed IPv6 address
      )
      (?::[0-9]+)?                                            # Server port number (optional)
      (?:[\/|\?]
        (?:[\w#!:\.\?\+=&@$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})   # The path and query (optional)
      *)?
    $/xi", $url);
  }
  else {
    return (bool)preg_match("/^(?:[\w#!:\.\?\+=&@$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})+$/i", $url);
  }
}
```


### `entities`
实体类型。
```php {4,24,26,43,46}
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'role' => array(
            'type'              => 'role', // 这里并不是 `entities`, 而是已注册的实体类型标识符。
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'role'
        )
    )
));

// (weight: 1)
$wrapper->role = entity_load_single('role', 1); // ok
$wrapper->role->value();                        // return RoleEntity
$wrapper->role = new stdClass();                // ok
$wrapper->role->value();                        // return stdClass

// (weight: 2)
// 取决于 role 实体定义中的 [entity keys][name] 属性
function xxx_entity_info() {
    return array(
        'role' => array(
            ...
            'entity class' => 'Entity',
            'controller class' => 'EntityAPIController',
            'entity keys' => array(
                'id' => 'rid',
                ...
            )
            ...
        )
    )
}
$wrapper->role = 'admin';                       // ok
$wrapper->role->value();                        // return RoleEntity

// (weight: 3)
// 取决于 role 实体定义中的 [entity keys][id] 属性
function xxx_entity_info() {
    return array(
        'role' => array(
            ...
            'entity class' => 'Entity',
            'controller class' => 'EntityAPIControllerExportable',
            'entity keys' => array(
                'id' => 'rid',
                'name' => 'name',
                ...
            )
            ...
        )
    )
}
$wrapper->role = 1;                             // ok
$wrapper->role->value();                        // return RoleEntity
```

内部实现：
```php
// First off check for entities, which may be represented by their ids too.
if (isset($info[$type])) {
    if (is_object($data)) {
        return TRUE;
    }
    elseif (isset($info[$type]['entity keys']['name'])) {
        // Read the data type of the name key from the metadata if available.
        $key = $info[$type]['entity keys']['name'];
        $property_info = entity_get_property_info($type);
        $property_type = isset($property_info['properties'][$key]['type']) ? $property_info['properties'][$key]['type'] : 'token';
        return entity_property_verify_data_type($data, $property_type);
    }
    return entity_property_verify_data_type($data, empty($info[$type]['fieldable']) ? 'text' : 'integer');
}
```


### `entity`
实体元数据包装类。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'role' => array(
            'type'              => 'entity',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'role'
        )
    )
));

$wrapper->role = entity_metadata_wrapper('role', NULL);                          // ok
$wrapper->role = entity_metadata_wrapper('role', entity_load_single('role', 1)); // ok
```

内部实现：
```php
is_object($data) && $data instanceof EntityDrupalWrapper;
```


### `list`
普通数组 或 `EntityMetadataArrayObject` 对象。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'address_list' => array(
            'type'              => 'list',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'address_list'
        )
    )
));

$wrapper->address_list = [];                                    // ok
$wrapper->address_list = [1, 2];                                // ok
$wrapper->address_list = ["first address"];                     // ok
$wrapper->address_list = ["a" => "first address", ];            // error

$arr = ["a" => "first address"];
$wrapper->address_list = new EntityMetadataArrayObject($arr);   // ok
```

内部实现：
```php
(is_array($data) && array_values($data) == $data) || (is_object($data) && $data instanceof EntityMetadataArrayObject);
```


### `unknown`
任意类型。
```php
$warpper = entity_metadata_wrapper('user', [], array(
    'property info' => array(
        'theme' => array(
            'type'              => 'unknown',
            'setter callback'   => 'entity_property_verbatim_set',
            'schema field'      => 'theme'
        )
    )
));

$wrapper->url = 1;              // ok
$wrapper->url = false;          // ok
$wrapper->url = [];             // ok
$wrapper->url = new stdClass(); // ok
```




## `Property` 包装器

### EntityDrupalWrapper
主要为已注册的 `实体` 设置属性。

::: tip
该包装器仅识别 `{hook}_entity_property_info()` 钩子定义的实体属性。
其他 `entity_metadata_wrapper()` 传入的第三个参数中的 `property info`属性无效。
:::

```php
$entity = entity_load_single('user', 1);
echo $entity->name;              // output: admin

$wrapper = entity_metadata_wrapper('user', $entity);
$wrapper->name = 'zhangsan';     // 设置名称
$wrapper->save();                // 更新实体

echo $entity->name;              // output: zhangsan
```


### EntityStructureWrapper
主要为 `自定义的数据` 设置属性值。

```php
$wrapper1 = entity_metadata_wrapper(null, [], array(
    'property info' => array(
        'name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            'schema field'     => 'name'
        )
    ),
));
$wrapper2 = entity_metadata_wrapper(null, new stdClass(), array(
    'property info' => array(
        'name' => array(
            'type'             => 'text',
            'setter callback'  => 'entity_property_verbatim_set',
            'schema field'     => 'name'
        )
    ),
));

$wrapper1->name = "zhangsan";
$wrapper2->name = "zhangsan";
echo $wrapper1->name->value(); // output: Array([name] => zhangsan)
echo $wrapper2->name->value(); // output: stdClass Object([name] => zhangsan)
```


### EntityListWrapper
主要负责处理 `type` 为 `list` 或 `list<type>` 的属性。

```php
$roles = entity_metadata_wrapper('list<integer>', NULL, array(
    'type'             => 'list<integer>',
    'setter callback'  => 'entity_property_verbatim_set',
    'getter callback'  => 'entity_property_verbatim_get',
    'schema field'     => 'roles'
));

// $roles->get(null) 指向数组末尾 + 1 的元素
$roles->set(["aa", "bb"]);              // ok
$roles->get(null)->set("cc");           // error
$roles->get(6)->set(66);                // ok
$roles->get(null)->set(33);             // ok

print_r($roles->value());               // output: Array(0 => "aa", 1 => "bb", 6 => 66, 7 => 33)
print_r($roles->get(0)->value());       // output: "aa"
print_r($roles->get(2)->value());       // output: NULL
print_r($roles->get(null)->value());    // output: NULL
```


### EntityValueWrapper
主要负责处理简单类型的属性。

```php
$name = entity_metadata_wrapper('text', NULL, array(
    'type'             => 'text',
    'setter callback'  => 'entity_property_verbatim_set',
    'getter callback'  => 'entity_property_verbatim_get',
    'schema field'     => 'name'
));

$name->set("zhangsan"); // ok
$name->set([]);         // error
echo $name->value();    // output: zhangsan
```



## `entity_metadata_wrapper` 函数
参数：
- `$type`: `string` 传递的数据类型。
- `$data`: `mixed`  要包装的数据。默认 `NULL`
- `$info`: `struct` 为传递的数据指定额外的信息。默认 `[]`
  - `langcode`: `string | null`

        如果数据是基于特定语言的，请设置。默认 `NULL`

  - `bundle`: `struct`

        指定要返回包装器的bundle

  - `property info`: `struct`

        与 `{hook}_entity_property_info()` 钩子相同的结构信息。

  - `property info alter`: `string`

        当第一次获取属性时，动态设置 `实体的属性`。可使用 `->clear()` 重置。

  - `property defaults`: `struct`

        实体每个属性的默认值。


返回值：
- `EntityDrupalWrapper`

    当 `$type` 的值为已注册的 `实体标识符` 时，返回 `EntityDrupalWrapper` 包装器。

- `EntityListWrapper`

    当 `$type` 的值为 `list` 或 `list<xxxx>` 时，返回 `EntityListWrapper` 包装器。

- `EntityStructureWrapper`

    当 `$info` 存在 `property info` 属性时，返回 `EntityStructureWrapper` 包装器。

- `EntityValueWrapper`

    不匹配上面时，返回 `EntityValueWrapper` 包装器。

