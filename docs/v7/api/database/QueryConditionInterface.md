# QueryConditionInterface
<Badge>interface</Badge>

查询条件子句的接口。



## condition($field, $value, $operator)

构建最常见的条件子句。

参数:
- `$field`: `string`

    查询的字段名称。如果需要使用函数等复杂的查询条件，请使用 [where()](#where)

- `$value`: `mixed`

    查询的值。默认 `NULL`

- `$operator`: `string`

    比较运算符。例如 `=` `<` 或 `>=`，默认 `NULL`。

    也接受更复杂的选择词，如 `IN` `LIKE` `BETWEEN` 等。如果 `$value` 是一个数组，则默认为 `IN`，否则 `=`。

返回值: `this`


## where($snippet, $args)

向查询添加任意的 `WHERE` 子句。

参数:
- `$snippet`: `string`

    作为预备语句的 `WHERE` 子句的一部分，它必须使用命名占位符。

- `$args`: `array`

    占位符参数数组。

返回值: `this`


## isNull($field)

设置指定字段为 `NULL` 的条件。

参数:
- `$field`: `string`

返回值: `this`


## isNotNull($field)

设置指定字段为 `NOT NULL` 的条件。

参数:
- `$field`: `string`

返回值: `this`


## exists(SelectQueryInterface $select)

设置指定子查询返回值的条件。

参数:
- `$select`: [SelectQueryInterface](./SelectQueryInterface)

    必须包含结果的子查询。

返回值: `this`


## notExists(SelectQueryInterface $select)

设置指定子查询不返回值的条件。

参数:
- `$select`: [SelectQueryInterface](./SelectQueryInterface)

    不能包含结果的子查询。

返回值: `this`


## &conditions()

获取此条件子句中所有条件的完整列表。

此方法通过引用返回。这允许alter钩子直接访问数据结构，并在编译之前操作它。

返回值: `array`


## arguments()

获取要插入到预编译语句中的所有值的完整列表。

返回值: `array`


## compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder)

编译保存的条件以供以后检索。

编译保存的条件以供以后检索。这个方法不返回任何东西，只是准备通过toString()和arguments()检索的数据。

参数:
- `$connection`: [DatabaseConnection](./DatabaseConnection)
- `$queryPlaceholder`: [QueryPlaceholderInterface](./QueryPlaceholderInterface)

## compiled()

检查一个条件是否以前编译过。

返回值: `boolean`



## 源代码
```php
interface QueryConditionInterface {

    /**
     * Helper function: builds the most common conditional clauses.
     *
     * This method can take a variable number of parameters. If called with two
     * parameters, they are taken as $field and $value with $operator having a
     * value of IN if $value is an array and = otherwise.
     *
     * Do not use this method to test for NULL values. Instead, use
     * QueryConditionInterface::isNull() or QueryConditionInterface::isNotNull().
     *
     * @param $field
     *   The name of the field to check. If you would like to add a more complex
     *   condition involving operators or functions, use where().
     * @param $value
     *   The value to test the field against. In most cases, this is a scalar.
     *   For more complex options, it is an array. The meaning of each element in
     *   the array is dependent on the $operator.
     * @param $operator
     *   The comparison operator, such as =, <, or >=. It also accepts more
     *   complex options such as IN, LIKE, or BETWEEN. Defaults to IN if $value is
     *   an array, and = otherwise.
     *
     * @return QueryConditionInterface
     *   The called object.
     *
     * @see QueryConditionInterface::isNull()
     * @see QueryConditionInterface::isNotNull()
     */
    public function condition($field, $value = NULL, $operator = NULL);

    /**
     * Adds an arbitrary WHERE clause to the query.
     *
     * @param $snippet
     *   A portion of a WHERE clause as a prepared statement. It must use named
     *   placeholders, not ? placeholders.
     * @param $args
     *   An associative array of arguments.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function where($snippet, $args = array());

    /**
     * Sets a condition that the specified field be NULL.
     *
     * @param $field
     *   The name of the field to check.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function isNull($field);

    /**
     * Sets a condition that the specified field be NOT NULL.
     *
     * @param $field
     *   The name of the field to check.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function isNotNull($field);

    /**
     * Sets a condition that the specified subquery returns values.
     *
     * @param SelectQueryInterface $select
     *   The subquery that must contain results.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function exists(SelectQueryInterface $select);

    /**
     * Sets a condition that the specified subquery returns no values.
     *
     * @param SelectQueryInterface $select
     *   The subquery that must not contain results.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function notExists(SelectQueryInterface $select);

    /**
     * Gets a complete list of all conditions in this conditional clause.
     *
     * This method returns by reference. That allows alter hooks to access the
     * data structure directly and manipulate it before it gets compiled.
     *
     * The data structure that is returned is an indexed array of entries, where
     * each entry looks like the following:
     * @code
     * array(
     *   'field' => $field,
     *   'value' => $value,
     *   'operator' => $operator,
     * );
     * @endcode
     *
     * In the special case that $operator is NULL, the $field is taken as a raw
     * SQL snippet (possibly containing a function) and $value is an associative
     * array of placeholders for the snippet.
     *
     * There will also be a single array entry of #conjunction, which is the
     * conjunction that will be applied to the array, such as AND.
     */
    public function &conditions();

    /**
     * Gets a complete list of all values to insert into the prepared statement.
     *
     * @return
     *   An associative array of placeholders and values.
     */
    public function arguments();

    /**
     * Compiles the saved conditions for later retrieval.
     *
     * This method does not return anything, but simply prepares data to be
     * retrieved via __toString() and arguments().
     *
     * @param $connection
     *   The database connection for which to compile the conditionals.
     * @param $queryPlaceholder
     *   The query this condition belongs to. If not given, the current query is
     *   used.
     */
    public function compile(DatabaseConnection $connection, QueryPlaceholderInterface $queryPlaceholder);

    /**
     * Check whether a condition has been previously compiled.
     *
     * @return
     *   TRUE if the condition has been previously compiled.
     */
    public function compiled();
}
```




