# TruncateQuery_sqlite

继承:
- [TruncateQuery](../TruncateQuery)


## __toString()


## 源代码
```php
class TruncateQuery_sqlite extends TruncateQuery {
  public function __toString() {
    // Create a sanitized comment string to prepend to the query.
    $comments = $this->connection->makeComment($this->comments);

    return $comments . 'DELETE FROM {' . $this->connection->escapeTable($this->table) . '} ';
  }
}
```