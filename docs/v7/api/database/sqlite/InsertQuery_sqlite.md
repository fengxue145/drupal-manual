# InsertQuery_sqlite

继承:
- [InsertQuery](../InsertQuery)


## execute()

## __toString()


## 源代码
```php
class InsertQuery_sqlite extends InsertQuery {

  public function execute() {
    if (!$this->preExecute()) {
      return NULL;
    }
    if (count($this->insertFields) || !empty($this->fromQuery)) {
      return parent::execute();
    }
    else {
      return $this->connection->query('INSERT INTO {' . $this->table . '} DEFAULT VALUES', array(), $this->queryOptions);
    }
  }

  public function __toString() {
    // Create a sanitized comment string to prepend to the query.
    $comments = $this->connection->makeComment($this->comments);

    // Produce as many generic placeholders as necessary.
    $placeholders = array();
    if (!empty($this->insertFields)) {
      $placeholders = array_fill(0, count($this->insertFields), '?');
    }

    // If we're selecting from a SelectQuery, finish building the query and
    // pass it back, as any remaining options are irrelevant.
    if (!empty($this->fromQuery)) {
      $insert_fields_string = $this->insertFields ? ' (' . implode(', ', $this->insertFields) . ') ' : ' ';
      return $comments . 'INSERT INTO {' . $this->table . '}' . $insert_fields_string . $this->fromQuery;
    }

    return $comments . 'INSERT INTO {' . $this->table . '} (' . implode(', ', $this->insertFields) . ') VALUES (' . implode(', ', $placeholders) . ')';
  }

}
```
