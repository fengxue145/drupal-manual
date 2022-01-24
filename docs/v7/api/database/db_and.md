---
sidebarDepth: 0
---

## db_and()

获取一个新的 [DatabaseCondition](./DatabaseCondition) 对象，并将所有条件使用 `AND` 连接。

返回值: [DatabaseCondition](./DatabaseCondition)

```php
class Placeholder implements QueryPlaceholderInterface {
  protected $uniqueIdentifier;
  protected $nextPlaceholder = 0;

  public function __construct() {
    $this->uniqueIdentifier = uniqid('', TRUE);
  }

  public function uniqueIdentifier() {
    return $this->uniqueIdentifier;
  }

  public function nextPlaceholder() {
    return $this->nextPlaceholder++;
  }
}

$condition = db_and();
$condition->condition('status', 1);
$condition->condition('title', '%今日', 'LIKE');;
$condition->compile($conn, new Placeholder());
echo (string)$condition;
// (status = :db_condition_placeholder_0) AND (title LIKE :db_condition_placeholder_1 ESCAPE '\\')
```
