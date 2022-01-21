# DeleteQuery_sqlite

继承:
- [DeleteQuery](../DeleteQuery)


## execute()


## 源代码
```php
class DeleteQuery_sqlite extends DeleteQuery {
  public function execute() {
    // When the WHERE is omitted from a DELETE statement and the table being
    // deleted has no triggers, SQLite uses an optimization to erase the entire
    // table content without having to visit each row of the table individually.
    // Prior to SQLite 3.6.5, SQLite does not return the actual number of rows
    // deleted by that optimized "truncate" optimization. But we want to return
    // the number of rows affected, so we calculate it directly.
    if (!count($this->condition)) {
      $total_rows = $this->connection->query('SELECT COUNT(*) FROM {' . $this->connection->escapeTable($this->table) . '}')->fetchField();
      parent::execute();
      return $total_rows;
    }
    else {
      return parent::execute();
    }
  }
}
```
