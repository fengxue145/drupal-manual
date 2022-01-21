# SelectQuery_sqlite

继承:
- [SelectQuery](../SelectQuery)


## forUpdate($set = TRUE)



## 源代码
```php
class SelectQuery_sqlite extends SelectQuery {
  public function forUpdate($set = TRUE) {
    // SQLite does not support FOR UPDATE so nothing to do.
    return $this;
  }
}
```
