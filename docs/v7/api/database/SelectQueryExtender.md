# QueryExtendableInterface

可扩展查询对象的接口。

"扩展器" 遵循 "装饰器" OOP设计模式。也就是说，它们包装并 "装饰" 另一个对象。在我们的例子中，它们实现了与选择查询相同的接口，并包装了一个选择查询，它们将几乎所有的操作都委托给了这个查询。该类的子类可以实现额外的方法，也可以根据需要重写现有的方法。扩展器还可以包装其他扩展器对象，允许任意复杂的“增强”查询。


## extend($extender_name)

通过将该对象封装到扩展器对象中来增强该对象。

参数:
- `$extender_name`: `string`

    扩展类的基名。基名将根据当前数据库连接进行检查，以允许特定于驱动程序的子类，使用与查询对象本身相同的逻辑。例如，PagerDefault_mysql是PagerDefault的特定于mysql的覆盖。

返回值: `QueryExtendableInterface`



## 源代码
```php
interface QueryExtendableInterface {

    /**
     * Enhance this object by wrapping it in an extender object.
     *
     * @param $extender_name
     *   The base name of the extending class.  The base name will be checked
     *   against the current database connection to allow driver-specific subclasses
     *   as well, using the same logic as the query objects themselves.  For example,
     *   PagerDefault_mysql is the MySQL-specific override for PagerDefault.
     * @return QueryExtendableInterface
     *   The extender object, which now contains a reference to this object.
     */
    public function extend($extender_name);
}
```











