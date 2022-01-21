# QueryAlterableInterface
<Badge>interface</Badge>

可以通过 `alter` 钩子操作的查询的接口。

给查询添加各种标签/元数据后，可以使用 [hook_query_alter()]() 等钩子在查询到数据后，对数据进行自定义的修改。如: 重新对数据排序、过滤数据格式等


## addTag($tag)

向此查询添加一个标签。

标记是标识查询的字符串。一个查询可以有任意数量的标记。标记用于标记查询，以便 `alter` 钩子可以决定是否要采取行动。标签应该全部为小写，只包含字母、数字和下划线，并以字母开头。也就是说，它们通常应该遵循与PHP标识符相同的规则。

参数:
- `$tag`: `string`

    要添加的标签。

返回值: `this`


## hasTag($tag)

检查此查询是否具有该标签。

参数:
- `$tag`: `string`

    要检查的标签。

返回值: `boolean`


## hasAllTags($tags)

检查此查询是否具有指定的所有标签。

参数:
- `$tags`: `array`

    要检查的标签列表。

返回值: `boolean`


## hasAnyTag($tags)

检查此查询是否具有指定的所有标签中的任意一个。

参数:
- `$tags`: `array`

    要检查的标签列表。

返回值: `boolean`


## addMetaData($key, $object)

向查询添加额外的元数据。

通常，查询可能需要提供额外的上下文数据来更改钩子。`alter` 钩子可以使用这些信息来决定是否采取行动以及如何采取行动。

参数:
- `$key`: `string`

    元数据的唯一标识符。必须是与其他PHP标识符遵循相同规则的字符串。

- `$object`: `mixed`

    要添加到查询中的附加数据。可以是任何有效的PHP变量。

返回值: `this`


## getMetaData($key)

检索给定的元数据。如果不存在，则返回 `NULL`

参数:
- `$key`: `string`

    要检索的元数据段的唯一标识符。

返回值: `mixed`



## 源代码
```php
interface QueryAlterableInterface {

    /**
     * Adds a tag to a query.
     *
     * Tags are strings that identify a query. A query may have any number of
     * tags. Tags are used to mark a query so that alter hooks may decide if they
     * wish to take action. Tags should be all lower-case and contain only
     * letters, numbers, and underscore, and start with a letter. That is, they
     * should follow the same rules as PHP identifiers in general.
     *
     * @param $tag
     *   The tag to add.
     *
     * @return QueryAlterableInterface
     *   The called object.
     */
    public function addTag($tag);

    /**
     * Determines if a given query has a given tag.
     *
     * @param $tag
     *   The tag to check.
     *
     * @return
     *   TRUE if this query has been marked with this tag, FALSE otherwise.
     */
    public function hasTag($tag);

    /**
     * Determines if a given query has all specified tags.
     *
     * @param $tags
     *   A variable number of arguments, one for each tag to check.
     *
     * @return
     *   TRUE if this query has been marked with all specified tags, FALSE
     *   otherwise.
     */
    public function hasAllTags();

    /**
     * Determines if a given query has any specified tag.
     *
     * @param $tags
     *   A variable number of arguments, one for each tag to check.
     *
     * @return
     *   TRUE if this query has been marked with at least one of the specified
     *   tags, FALSE otherwise.
     */
    public function hasAnyTag();

    /**
     * Adds additional metadata to the query.
     *
     * Often, a query may need to provide additional contextual data to alter
     * hooks. Alter hooks may then use that information to decide if and how
     * to take action.
     *
     * @param $key
     *   The unique identifier for this piece of metadata. Must be a string that
     *   follows the same rules as any other PHP identifier.
     * @param $object
     *   The additional data to add to the query. May be any valid PHP variable.
     *
     * @return QueryAlterableInterface
     *   The called object.
     */
    public function addMetaData($key, $object);

    /**
     * Retrieves a given piece of metadata.
     *
     * @param $key
     *   The unique identifier for the piece of metadata to retrieve.
     *
     * @return
     *   The previously attached metadata object, or NULL if one doesn't exist.
     */
    public function getMetaData($key);
}
```
