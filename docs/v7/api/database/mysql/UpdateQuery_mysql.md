# UpdateQuery_mysql

继承:
- [UpdateQuery](../UpdateQuery)


## __toString()

返回当前查询语句字符串。

返回值: `string`



## 源代码
```php
class UpdateQuery_mysql extends UpdateQuery {
  public function __toString() {
    if (method_exists($this->connection, 'escapeField')) {
      $escapedFields = array();
      foreach ($this->fields as $field => $data) {
        $field = $this->connection->escapeField($field);
        $escapedFields[$field] = $data;
      }
      $this->fields = $escapedFields;
    }
    return parent::__toString();
  }
}
```
