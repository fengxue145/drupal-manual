# 实体 Bundle

bundle 到底是什么？ 目前来看，可以理解为类似数据库 "外键" 的定义。

我们来看看 `node` 模块的结构：

`node` 表其中的 `type` 字段与 `node_types` 的 `type` 字段是外键关系。

在 "内容 > 添加内容" 页，显示的是 `node_types` 的所有数据。
这里可以看到文章属于某个分类。








bundle of 会为实体设置 [bundle keys][bundle]

bundles 结构如下：
```php
'bundles' => array(
    'bundle_name' => array(
        'properties' => array(
            // property info
            'id' => array(
                'type' => 'text',
                'setter callback' => 'entity_property_verbatim_set',
                'schema field' => 'id',
            ),
            'name' => array(
                'type' => 'text',
                'setter callback' => 'entity_property_verbatim_set',
                'schema field' => 'name',
            )
        )
    )
)
```