# DatabaseCondition

用于查询中一系列条件的泛型类。


## $conditions
<Badge>protected</Badge>

查询条件数组。

- 类型: `array`
- 默认值: `[]`


## $arguments
<Badge>protected</Badge>

查询参数数组。

- 类型: `array`
- 默认值: `[]`


## $changed
<Badge>protected</Badge>

条件是否有所改变。如果条件自上次编译后已更改，则为TRUE; 如果条件已编译且未更改，则为FALSE。

- 类型: `boolean`
- 默认值: `false`


## $queryPlaceholderIdentifier
<Badge>protected</Badge>

此条件编译所依据的查询占位符的标识符。

- 类型: `string`



## __construct($conjunction)

参数:
- `$conjunction`: `string`
  用于组合条件的运算符: `AND` 或 `OR`


## count()

返回该条件的大小。条件数组的大小是其条件数组的大小减1，因为其中一个元素是合取。

返回值: `int`


## condition($field, $value = NULL, $operator = NULL)

参数:
- ``: ``

返回值: ``


## where($snippet, $args = array())

参数:
- ``: ``

返回值: ``


## isNull($field)

参数:
- ``: ``

返回值: ``


## isNotNull($field)

参数:
- ``: ``

返回值: ``


## exists(SelectQueryInterface $select)

参数:
- ``: ``

返回值: ``


## notExists(SelectQueryInterface $select)

参数:
- ``: ``

返回值: ``


## &conditions()

参数:
- ``: ``

返回值: ``


## arguments()

参数:
- ``: ``

返回值: ``


## compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder)

参数:
- ``: ``

返回值: ``


## compiled()

参数:
- ``: ``

返回值: ``


## __toString()

参数:
- ``: ``

返回值: ``


## __clone()

参数:
- ``: ``

返回值: ``


## mapConditionOperator($operator)

参数:
- ``: ``

返回值: ``



## 源代码
```php
class DatabaseCondition implements QueryConditionInterface, Countable {

  /**
   * Array of conditions.
   *
   * @var array
   */
  protected $conditions = array();

  /**
   * Array of arguments.
   *
   * @var array
   */
  protected $arguments = array();

  /**
   * Whether the conditions have been changed.
   *
   * TRUE if the condition has been changed since the last compile.
   * FALSE if the condition has been compiled and not changed.
   *
   * @var bool
   */
  protected $changed = TRUE;

  /**
   * The identifier of the query placeholder this condition has been compiled against.
   */
  protected $queryPlaceholderIdentifier;

  /**
   * Constructs a DataBaseCondition object.
   *
   * @param string $conjunction
   *   The operator to use to combine conditions: 'AND' or 'OR'.
   */
  public function __construct($conjunction) {
    $this->conditions['#conjunction'] = $conjunction;
  }

  /**
   * Implements Countable::count().
   *
   * Returns the size of this conditional. The size of the conditional is the
   * size of its conditional array minus one, because one element is the
   * conjunction.
   */
  public function count() {
    return count($this->conditions) - 1;
  }

  /**
   * Implements QueryConditionInterface::condition().
   */
  public function condition($field, $value = NULL, $operator = NULL) {
    if (!isset($operator)) {
      if (is_array($value)) {
        $operator = 'IN';
      }
      elseif (!isset($value)) {
        $operator = 'IS NULL';
      }
      else {
        $operator = '=';
      }
    }
    $this->conditions[] = array(
      'field' => $field,
      'value' => $value,
      'operator' => $operator,
    );

    $this->changed = TRUE;

    return $this;
  }

  /**
   * Implements QueryConditionInterface::where().
   */
  public function where($snippet, $args = array()) {
    $this->conditions[] = array(
      'field' => $snippet,
      'value' => $args,
      'operator' => NULL,
    );
    $this->changed = TRUE;

    return $this;
  }

  /**
   * Implements QueryConditionInterface::isNull().
   */
  public function isNull($field) {
    return $this->condition($field);
  }

  /**
   * Implements QueryConditionInterface::isNotNull().
   */
  public function isNotNull($field) {
    return $this->condition($field, NULL, 'IS NOT NULL');
  }

  /**
   * Implements QueryConditionInterface::exists().
   */
  public function exists(SelectQueryInterface $select) {
    return $this->condition('', $select, 'EXISTS');
  }

  /**
   * Implements QueryConditionInterface::notExists().
   */
  public function notExists(SelectQueryInterface $select) {
    return $this->condition('', $select, 'NOT EXISTS');
  }

  /**
   * Implements QueryConditionInterface::conditions().
   */
  public function &conditions() {
    return $this->conditions;
  }

  /**
   * Implements QueryConditionInterface::arguments().
   */
  public function arguments() {
    // If the caller forgot to call compile() first, refuse to run.
    if ($this->changed) {
      return NULL;
    }
    return $this->arguments;
  }

  /**
   * Implements QueryConditionInterface::compile().
   */
  public function compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder) {
    // Re-compile if this condition changed or if we are compiled against a
    // different query placeholder object.
    if ($this->changed || isset($this->queryPlaceholderIdentifier) && ($this->queryPlaceholderIdentifier != $queryPlaceholder->uniqueIdentifier())) {
      $this->queryPlaceholderIdentifier = $queryPlaceholder->uniqueIdentifier();

      $condition_fragments = array();
      $arguments = array();

      $conditions = $this->conditions;
      $conjunction = $conditions['#conjunction'];
      unset($conditions['#conjunction']);
      foreach ($conditions as $condition) {
        if (empty($condition['operator'])) {
          // This condition is a literal string, so let it through as is.
          $condition_fragments[] = ' (' . $condition['field'] . ') ';
          $arguments += $condition['value'];
        }
        else {
          // It's a structured condition, so parse it out accordingly.
          // Note that $condition['field'] will only be an object for a dependent
          // DatabaseCondition object, not for a dependent subquery.
          if ($condition['field'] instanceof QueryConditionInterface) {
            // Compile the sub-condition recursively and add it to the list.
            $condition['field']->compile($connection, $queryPlaceholder);
            $condition_fragments[] = '(' . (string) $condition['field'] . ')';
            $arguments += $condition['field']->arguments();
          }
          else {
            // For simplicity, we treat all operators as the same data structure.
            // In the typical degenerate case, this won't get changed.
            $operator_defaults = array(
              'prefix' => '',
              'postfix' => '',
              'delimiter' => '',
              'operator' => $condition['operator'],
              'use_value' => TRUE,
            );
            $operator = $connection->mapConditionOperator($condition['operator']);
            if (!isset($operator)) {
              $operator = $this->mapConditionOperator($condition['operator']);
            }
            $operator += $operator_defaults;

            $placeholders = array();
            if ($condition['value'] instanceof SelectQueryInterface) {
              $condition['value']->compile($connection, $queryPlaceholder);
              $placeholders[] = (string) $condition['value'];
              $arguments += $condition['value']->arguments();
              // Subqueries are the actual value of the operator, we don't
              // need to add another below.
              $operator['use_value'] = FALSE;
            }
            // We assume that if there is a delimiter, then the value is an
            // array. If not, it is a scalar. For simplicity, we first convert
            // up to an array so that we can build the placeholders in the same way.
            elseif (!$operator['delimiter']) {
              $condition['value'] = array($condition['value']);
            }
            if ($operator['use_value']) {
              foreach ($condition['value'] as $value) {
                $placeholder = ':db_condition_placeholder_' . $queryPlaceholder->nextPlaceholder();
                $arguments[$placeholder] = $value;
                $placeholders[] = $placeholder;
              }
            }
            $condition_fragments[] = ' (' . $connection->escapeField($condition['field']) . ' ' . $operator['operator'] . ' ' . $operator['prefix'] . implode($operator['delimiter'], $placeholders) . $operator['postfix'] . ') ';
          }
        }
      }

      $this->changed = FALSE;
      $this->stringVersion = implode($conjunction, $condition_fragments);
      $this->arguments = $arguments;
    }
  }

  /**
   * Implements QueryConditionInterface::compiled().
   */
  public function compiled() {
    return !$this->changed;
  }

  /**
   * Implements PHP magic __toString method to convert the conditions to string.
   *
   * @return string
   *   A string version of the conditions.
   */
  public function __toString() {
    // If the caller forgot to call compile() first, refuse to run.
    if ($this->changed) {
      return NULL;
    }
    return $this->stringVersion;
  }

  /**
   * PHP magic __clone() method.
   *
   * Only copies fields that implement QueryConditionInterface. Also sets
   * $this->changed to TRUE.
   */
  function __clone() {
    $this->changed = TRUE;
    foreach ($this->conditions as $key => $condition) {
      if ($key !== '#conjunction') {
        if ($condition['field'] instanceOf QueryConditionInterface) {
          $this->conditions[$key]['field'] = clone($condition['field']);
        }
        if ($condition['value'] instanceOf SelectQueryInterface) {
          $this->conditions[$key]['value'] = clone($condition['value']);
        }
      }
    }
  }

  /**
   * Gets any special processing requirements for the condition operator.
   *
   * Some condition types require special processing, such as IN, because
   * the value data they pass in is not a simple value. This is a simple
   * overridable lookup function.
   *
   * @param $operator
   *   The condition operator, such as "IN", "BETWEEN", etc. Case-sensitive.
   *
   * @return
   *   The extra handling directives for the specified operator, or NULL.
   */
  protected function mapConditionOperator($operator) {
    // $specials does not use drupal_static as its value never changes.
    static $specials = array(
      'BETWEEN' => array('delimiter' => ' AND '),
      'IN' => array('delimiter' => ', ', 'prefix' => ' (', 'postfix' => ')'),
      'NOT IN' => array('delimiter' => ', ', 'prefix' => ' (', 'postfix' => ')'),
      'EXISTS' => array('prefix' => ' (', 'postfix' => ')'),
      'NOT EXISTS' => array('prefix' => ' (', 'postfix' => ')'),
      'IS NULL' => array('use_value' => FALSE),
      'IS NOT NULL' => array('use_value' => FALSE),
      // Use backslash for escaping wildcard characters.
      'LIKE' => array('postfix' => " ESCAPE '\\\\'"),
      'NOT LIKE' => array('postfix' => " ESCAPE '\\\\'"),
      // These ones are here for performance reasons.
      '=' => array(),
      '<' => array(),
      '>' => array(),
      '>=' => array(),
      '<=' => array(),
    );
    if (isset($specials[$operator])) {
      $return = $specials[$operator];
    }
    else {
      // We need to upper case because PHP index matches are case sensitive but
      // do not need the more expensive drupal_strtoupper because SQL statements are ASCII.
      $operator = strtoupper($operator);
      $return = isset($specials[$operator]) ? $specials[$operator] : array();
    }

    $return += array('operator' => $operator);

    return $return;
  }

}
```
