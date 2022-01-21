# UpdateQuery_sqlite

继承:
- [UpdateQuery](../UpdateQuery)


## execute()


## 源代码
```php
class UpdateQuery_sqlite extends UpdateQuery {
  public function execute() {
    if (!empty($this->queryOptions['sqlite_return_matched_rows'])) {
      return parent::execute();
    }

    // Get the fields used in the update query.
    $fields = $this->expressionFields + $this->fields;

    // Add the inverse of the fields to the condition.
    $condition = new DatabaseCondition('OR');
    foreach ($fields as $field => $data) {
      if (is_array($data)) {
        // The field is an expression.
        $condition->where($field . ' <> ' . $data['expression']);
        $condition->isNull($field);
      }
      elseif (!isset($data)) {
        // The field will be set to NULL.
        $condition->isNotNull($field);
      }
      else {
        $condition->condition($field, $data, '<>');
        $condition->isNull($field);
      }
    }
    if (count($condition)) {
      $condition->compile($this->connection, $this);
      $this->condition->where((string) $condition, $condition->arguments());
    }
    return parent::execute();
  }

}
```
