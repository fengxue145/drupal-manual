# QueryExtendableInterface
<Badge>interface</Badge>


## extend($extender_name)



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