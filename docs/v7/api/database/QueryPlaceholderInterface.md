# QueryPlaceholderInterface
<Badge>interface</Badge>

接收占位符的查询的接口。


## uniqueIdentifier()

返回此对象的唯一标识符。

返回值: `string`


## nextPlaceholder()

返回下一个占位符ID。

返回值: `int`


## 源代码
```php
interface QueryPlaceholderInterface {

    /**
     * Returns a unique identifier for this object.
     */
    public function uniqueIdentifier();

    /**
     * Returns the next placeholder ID for the query.
     *
     * @return
     *   The next available placeholder ID as an integer.
     */
    public function nextPlaceholder();
}
```
