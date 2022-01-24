# SelectQueryInterface
<Badge>interface</Badge>

`SELECT` 查询对象的接口定义。

继承:
- [QueryConditionInterface](./QueryConditionInterface)
- [QueryAlterableInterface](./QueryAlterableInterface)
- [QueryExtendableInterface](./QueryExtendableInterface)
- [QueryPlaceholderInterface](./QueryPlaceholderInterface)



## &getFields()

返回此查询的字段数组的引用。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑字段数组来进行更改。如果只是添加字段，那么最好使用 [addField()](#addField) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$fields =& $query->getFields();
```
:::

返回值: `array`


## &getExpressions()

返回此查询的表达式数组的引用。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑表达式数组来进行更改。如果只是添加表达式，那么最好使用 [addExpression()](#addExpression) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$expression =& $query->getExpressions();
```
:::

返回值: `array`


## &getOrderBy()

返回此查询的 `order-by` 数组的引用。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑 `order-by` 数组来进行更改。如果只是添加额外的排序字段，那么最好使用 [orderBy()](#orderBy) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$orderby =& $query->getOrderBy();
```
:::

返回值: `array`


## &getGroupBy()

返回此查询的 `group-by` 数组的引用。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑 `group-by` 数组来进行更改。如果只是添加额外的分组字段，那么最好使用 [groupBy()](#groupBy) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$groupby =& $query->getGroupBy();
```
:::

返回值: `array`


## &getTables()

返回对此查询的表数组的引用。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑表数组来进行更改。如果只是添加表，那么最好使用 [join()](#join) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$tables =& $query->getTables();
```
:::

返回值: `array`


## &getUnion()

返回此查询的联合查询的引用。这包括对 `UNION`、`UNION ALL` 和 `UNION DISTINCT` 的查询。

因为这个方法通过引用返回，所以 `alter` 钩子可以直接编辑联合查询数组来进行更改。如果只是添加联合查询，那么最好使用 [union()](#union) 方法。

::: tip
这个方法也必须通过引用来调用:
```php
$unions =& $query->getUnion();
```
:::

返回值: `array`


## getArguments(QueryPlaceholderInterface $queryPlaceholder = NULL)

编译并返回此准备好的语句的参数的关联数组。

参数:
- `$queryPlaceholder`: [QueryPlaceholderInterface](./QueryPlaceholderInterface)

    当收集子查询的参数时，主占位符对象应该作为这个参数传递。默认 `NULL`

返回值: `array`


## distinct($distinct = TRUE)

将此查询设置为 `DISTINCT`。

参数:
- `$distinct`: `boolean`

    默认 `TRUE`

返回值: `this`



## addField($table_alias, $field, $alias = NULL)

添加一个查询字段，并返回为该字段分配的唯一别名。

参数:
- `$table_alias`: `string`

    表别名。

- `$field`: `string`

    字段名称。

- `$alias`: `string`

    字段别名。默认 `NULL`

返回值: `string`



## fields($table_alias, array $fields = array())

添加多个查询字段。

此方法不返回为传递的字段设置的别名。但是，如果您确实需要知道别名，则可以调用  [getFields()](#getFields) 并检查结果以确定创建了什么别名。

参数:
- `$table_alias`: `boolean`

    表别名。

- `$fields`: `array`

    字段名称数组。

返回值: `this`


## addExpression($expression, $alias = NULL, $arguments = array())

将表达式添加到要选择的 "字段" 列表中，并返回该表达式的唯一别名。

参数:
- `$expression`: `string`

    表达式的字符串。可能包含 **命名占位符**。

- `$alias`: `array`

    此表达式的别名。

- `$arguments`: `array`

    此表达式所需的占位符关联数组。

返回值: `string`



## join($table, $alias = NULL, $condition = NULL, $arguments = array())

使用默认 `join` 连接数据库中的另一个表，并返回该表的唯一别名。

参数:
- `$table`: `string`

    要连接的表。

- `$alias`: `array`

    表的别名。

- `$condition`: `array`

    连接该表的条件。

    如果连接需要值，这个子句应该使用一个命名的占位符，要插入的值应该在第4个参数中传递。

- `$arguments`: `array`

    连接条件所需的占位符关联数组。

返回值: `string`


## innerJoin($table, $alias = NULL, $condition = NULL, $arguments = array())

使用 `Inner Join` 连接数据库中的另一个表，并返回该表的唯一别名。

参数:
- `$table`: `string`

    要连接的表。

- `$alias`: `array`

    表的别名。

- `$condition`: `array`

    连接该表的条件。

    如果连接需要值，这个子句应该使用一个命名的占位符，要插入的值应该在第4个参数中传递。

- `$arguments`: `array`

    连接条件所需的占位符关联数组。

返回值: `string`



## leftJoin($table, $alias = NULL, $condition = NULL, $arguments = array())

使用 `Left Join` 连接数据库中的另一个表，并返回该表的唯一别名。

参数:
- `$table`: `string`

    要连接的表。

- `$alias`: `array`

    表的别名。

- `$condition`: `array`

    连接该表的条件。

    如果连接需要值，这个子句应该使用一个命名的占位符，要插入的值应该在第4个参数中传递。

- `$arguments`: `array`

    连接条件所需的占位符关联数组。

返回值: `string`


## rightJoin($table, $alias = NULL, $condition = NULL, $arguments = array())

使用 `Right Join` 连接数据库中的另一个表，并返回该表的唯一别名。

参数:
- `$table`: `string`

    要连接的表。

- `$alias`: `array`

    表的别名。

- `$condition`: `array`

    连接该表的条件。

    如果连接需要值，这个子句应该使用一个命名的占位符，要插入的值应该在第4个参数中传递。

- `$arguments`: `array`

    连接条件所需的占位符关联数组。

返回值: `string`


## addJoin($type, $table, $alias = NULL, $condition = NULL, $arguments = array())

连接数据库中的另一个表，并返回该表的唯一别名。

参数:
- `$type`: `string`

    连接的类型。可选 `INNER`、 `LEFT OUTER` 或 `RIGHT OUTER`。

- `$table`: `string`

    要连接的表。

- `$alias`: `array`

    表的别名。

- `$condition`: `array`

    连接该表的条件。

    如果连接需要值，这个子句应该使用一个命名的占位符，要插入的值应该在第4个参数中传递。

- `$arguments`: `array`

    连接条件所需的占位符关联数组。

返回值: `string`


## orderBy($field, $direction = 'ASC')

添加排序字段。

如果多次调用，查询将按照调用该方法的顺序对每个指定字段进行排序。如果查询使用DISTINCT或GROUP BY条件，则必须选择用于订单的字段或表达式，以兼容PostgresQL等数据库。PostgresQL驱动程序可以自动处理简单的情况，但建议显式地指定它们。另外，在对别名排序时，必须在调用orderBy()之前添加别名。


参数:
- `$field`: `string`

    字段名称。

- `$direction`: `string`

    排序方向，可选 `ASC` 或 `DESC`。默认 `ASC`

返回值: `this`


## orderRandom()

对结果集进行随机排序。

这可能与其他orderBy()调用叠加在一起。如果是，查询将按调用的顺序按每个指定字段排序，包括这个字段。尽管此方法可能在同一查询上被多次调用，但这样做并不是特别有用

返回值: `this`


## range($start = NULL, $length = NULL)

将查询限制在结果集中的给定范围内。

如果不带参数调用此方法，将删除已设置的任何范围指令。

参数:
- `$start`: `int`

    要返回的结果集中的第一个记录。如果为NULL，则删除所有已设置的范围指令。

- `$length`: `int`

    从结果集中返回的记录数。

返回值: `this`


## union(SelectQueryInterface $query, $type = '')

将另一个Select查询添加到 `UNION` 中。

联合查询由两个或多个查询组成，它们的结果被有效地连接在一起。查询将按照指定的顺序进行联合，首先是tnis对象的查询。重复的列将被丢弃。支持所有形式的UNION，使用第二个'$type'参数。

参数:
- `$query`: `int`

    要返回的结果集中的第一个记录。如果为NULL，则删除所有已设置的范围指令。

- `$type`: `string`

    要添加到查询中的UNION的类型。默认为普通UNION

返回值: `this`


## groupBy($field)

按指定字段对结果集进行分组。

参数:
- `$field`: `string`

    字段名称。

返回值: `this`


## countQuery()

获取此查询的等效COUNT查询作为新查询对象。

一个新的SelectQuery对象，除了COUNT(*)之外，没有其他字段或表达式。

返回值: `SelectQueryInterface`


## isPrepared()

指示该对象是否已经调用了preExecute()。

返回值: `boolean`


## preExecute(SelectQueryInterface $query = NULL)

SELECT查询的一般准备和验证。

返回值: `boolean`


## havingCondition($field, $value = NULL, $operator = NULL)

构建HAVING条件子句。

参数:
- `$field`: `string`

    字段名称。

- `$value`: `string`

    字段值。

- `$operator`: `string`

    条件运算符。默认 `=`

返回值: `this`


## __clone()

克隆魔术方法。选择查询具有必须深度克隆的依赖对象。但是，连接对象本身不应该被克隆，因为那样会复制连接本身。


## forUpdate($set = TRUE)

向查询添加FOR UPDATE。

FOR UPDATE防止SELECT语句检索到的行被其他事务修改或删除，直到当前事务结束。试图对这些行进行UPDATE、DELETE或SELECT FOR UPDATE操作的其他事务将被阻塞，直到当前事务结束。

参数:
- `$set`: `boolean`

    如果为TRUE, FOR UPDATE将被添加到query中，如果为FALSE则不添加

返回值: `this`



## 源代码
```php
interface SelectQueryInterface extends QueryConditionInterface, QueryAlterableInterface, QueryExtendableInterface, QueryPlaceholderInterface {

    /* Alter accessors to expose the query data to alter hooks. */

    /**
     * Returns a reference to the fields array for this query.
     *
     * Because this method returns by reference, alter hooks may edit the fields
     * array directly to make their changes. If just adding fields, however, the
     * use of addField() is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getFields();
     * @endcode
     *
     * @return
     *   A reference to the fields array structure.
     */
    public function &getFields();

    /**
     * Returns a reference to the expressions array for this query.
     *
     * Because this method returns by reference, alter hooks may edit the expressions
     * array directly to make their changes. If just adding expressions, however, the
     * use of addExpression() is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getExpressions();
     * @endcode
     *
     * @return
     *   A reference to the expression array structure.
     */
    public function &getExpressions();

    /**
     * Returns a reference to the order by array for this query.
     *
     * Because this method returns by reference, alter hooks may edit the order-by
     * array directly to make their changes. If just adding additional ordering
     * fields, however, the use of orderBy() is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getOrderBy();
     * @endcode
     *
     * @return
     *   A reference to the expression array structure.
     */
    public function &getOrderBy();

    /**
     * Returns a reference to the group-by array for this query.
     *
     * Because this method returns by reference, alter hooks may edit the group-by
     * array directly to make their changes. If just adding additional grouping
     * fields, however, the use of groupBy() is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getGroupBy();
     * @endcode
     *
     * @return
     *   A reference to the group-by array structure.
     */
    public function &getGroupBy();

    /**
     * Returns a reference to the tables array for this query.
     *
     * Because this method returns by reference, alter hooks may edit the tables
     * array directly to make their changes. If just adding tables, however, the
     * use of the join() methods is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getTables();
     * @endcode
     *
     * @return
     *   A reference to the tables array structure.
     */
    public function &getTables();

    /**
     * Returns a reference to the union queries for this query. This include
     * queries for UNION, UNION ALL, and UNION DISTINCT.
     *
     * Because this method returns by reference, alter hooks may edit the tables
     * array directly to make their changes. If just adding union queries,
     * however, the use of the union() method is preferred.
     *
     * Note that this method must be called by reference as well:
     *
     * @code
     * $fields =& $query->getUnion();
     * @endcode
     *
     * @return
     *   A reference to the union query array structure.
     */
    public function &getUnion();

    /**
     * Compiles and returns an associative array of the arguments for this prepared statement.
     *
     * @param $queryPlaceholder
     *   When collecting the arguments of a subquery, the main placeholder
     *   object should be passed as this parameter.
     *
     * @return
     *   An associative array of all placeholder arguments for this query.
     */
    public function getArguments(QueryPlaceholderInterface $queryPlaceholder = NULL);

    /* Query building operations */

    /**
     * Sets this query to be DISTINCT.
     *
     * @param $distinct
     *   TRUE to flag this query DISTINCT, FALSE to disable it.
     * @return SelectQueryInterface
     *   The called object.
     */
    public function distinct($distinct = TRUE);

    /**
     * Adds a field to the list to be SELECTed.
     *
     * @param $table_alias
     *   The name of the table from which the field comes, as an alias. Generally
     *   you will want to use the return value of join() here to ensure that it is
     *   valid.
     * @param $field
     *   The name of the field.
     * @param $alias
     *   The alias for this field. If not specified, one will be generated
     *   automatically based on the $table_alias and $field. The alias will be
     *   checked for uniqueness, so the requested alias may not be the alias
     *   that is assigned in all cases.
     * @return
     *   The unique alias that was assigned for this field.
     */
    public function addField($table_alias, $field, $alias = NULL);

    /**
     * Add multiple fields from the same table to be SELECTed.
     *
     * This method does not return the aliases set for the passed fields. In the
     * majority of cases that is not a problem, as the alias will be the field
     * name. However, if you do need to know the alias you can call getFields()
     * and examine the result to determine what alias was created. Alternatively,
     * simply use addField() for the few fields you care about and this method for
     * the rest.
     *
     * @param $table_alias
     *   The name of the table from which the field comes, as an alias. Generally
     *   you will want to use the return value of join() here to ensure that it is
     *   valid.
     * @param $fields
     *   An indexed array of fields present in the specified table that should be
     *   included in this query. If not specified, $table_alias.* will be generated
     *   without any aliases.
     * @return SelectQueryInterface
     *   The called object.
     */
    public function fields($table_alias, array $fields = array());

    /**
     * Adds an expression to the list of "fields" to be SELECTed.
     *
     * An expression can be any arbitrary string that is valid SQL. That includes
     * various functions, which may in some cases be database-dependent. This
     * method makes no effort to correct for database-specific functions.
     *
     * @param $expression
     *   The expression string. May contain placeholders.
     * @param $alias
     *   The alias for this expression. If not specified, one will be generated
     *   automatically in the form "expression_#". The alias will be checked for
     *   uniqueness, so the requested alias may not be the alias that is assigned
     *   in all cases.
     * @param $arguments
     *   Any placeholder arguments needed for this expression.
     * @return
     *   The unique alias that was assigned for this expression.
     */
    public function addExpression($expression, $alias = NULL, $arguments = array());

    /**
     * Default Join against another table in the database.
     *
     * This method is a convenience method for innerJoin().
     *
     * @param $table
     *   The table against which to join.
     * @param $alias
     *   The alias for the table. In most cases this should be the first letter
     *   of the table, or the first letter of each "word" in the table.
     * @param $condition
     *   The condition on which to join this table. If the join requires values,
     *   this clause should use a named placeholder and the value or values to
     *   insert should be passed in the 4th parameter. For the first table joined
     *   on a query, this value is ignored as the first table is taken as the base
     *   table. The token %alias can be used in this string to be replaced with
     *   the actual alias. This is useful when $alias is modified by the database
     *   system, for example, when joining the same table more than once.
     * @param $arguments
     *   An array of arguments to replace into the $condition of this join.
     * @return
     *   The unique alias that was assigned for this table.
     */
    public function join($table, $alias = NULL, $condition = NULL, $arguments = array());

    /**
     * Inner Join against another table in the database.
     *
     * @param $table
     *   The table against which to join.
     * @param $alias
     *   The alias for the table. In most cases this should be the first letter
     *   of the table, or the first letter of each "word" in the table.
     * @param $condition
     *   The condition on which to join this table. If the join requires values,
     *   this clause should use a named placeholder and the value or values to
     *   insert should be passed in the 4th parameter. For the first table joined
     *   on a query, this value is ignored as the first table is taken as the base
     *   table. The token %alias can be used in this string to be replaced with
     *   the actual alias. This is useful when $alias is modified by the database
     *   system, for example, when joining the same table more than once.
     * @param $arguments
     *   An array of arguments to replace into the $condition of this join.
     * @return
     *   The unique alias that was assigned for this table.
     */
    public function innerJoin($table, $alias = NULL, $condition = NULL, $arguments = array());

    /**
     * Left Outer Join against another table in the database.
     *
     * @param $table
     *   The table against which to join.
     * @param $alias
     *   The alias for the table. In most cases this should be the first letter
     *   of the table, or the first letter of each "word" in the table.
     * @param $condition
     *   The condition on which to join this table. If the join requires values,
     *   this clause should use a named placeholder and the value or values to
     *   insert should be passed in the 4th parameter. For the first table joined
     *   on a query, this value is ignored as the first table is taken as the base
     *   table. The token %alias can be used in this string to be replaced with
     *   the actual alias. This is useful when $alias is modified by the database
     *   system, for example, when joining the same table more than once.
     * @param $arguments
     *   An array of arguments to replace into the $condition of this join.
     * @return
     *   The unique alias that was assigned for this table.
     */
    public function leftJoin($table, $alias = NULL, $condition = NULL, $arguments = array());

    /**
     * Right Outer Join against another table in the database.
     *
     * @param $table
     *   The table against which to join.
     * @param $alias
     *   The alias for the table. In most cases this should be the first letter
     *   of the table, or the first letter of each "word" in the table.
     * @param $condition
     *   The condition on which to join this table. If the join requires values,
     *   this clause should use a named placeholder and the value or values to
     *   insert should be passed in the 4th parameter. For the first table joined
     *   on a query, this value is ignored as the first table is taken as the base
     *   table. The token %alias can be used in this string to be replaced with
     *   the actual alias. This is useful when $alias is modified by the database
     *   system, for example, when joining the same table more than once.
     * @param $arguments
     *   An array of arguments to replace into the $condition of this join.
     * @return
     *   The unique alias that was assigned for this table.
     */
    public function rightJoin($table, $alias = NULL, $condition = NULL, $arguments = array());

    /**
     * Join against another table in the database.
     *
     * This method does the "hard" work of queuing up a table to be joined against.
     * In some cases, that may include dipping into the Schema API to find the necessary
     * fields on which to join.
     *
     * @param $type
     *   The type of join. Typically one one of INNER, LEFT OUTER, and RIGHT OUTER.
     * @param $table
     *   The table against which to join. May be a string or another SelectQuery
     *   object. If a query object is passed, it will be used as a subselect.
     * @param $alias
     *   The alias for the table. In most cases this should be the first letter
     *   of the table, or the first letter of each "word" in the table. If omitted,
     *   one will be dynamically generated.
     * @param $condition
     *   The condition on which to join this table. If the join requires values,
     *   this clause should use a named placeholder and the value or values to
     *   insert should be passed in the 4th parameter. For the first table joined
     *   on a query, this value is ignored as the first table is taken as the base
     *   table. The token %alias can be used in this string to be replaced with
     *   the actual alias. This is useful when $alias is modified by the database
     *   system, for example, when joining the same table more than once.
     * @param $arguments
     *   An array of arguments to replace into the $condition of this join.
     * @return
     *   The unique alias that was assigned for this table.
     */
    public function addJoin($type, $table, $alias = NULL, $condition = NULL, $arguments = array());

    /**
     * Orders the result set by a given field.
     *
     * If called multiple times, the query will order by each specified field in the
     * order this method is called.
     *
     * If the query uses DISTINCT or GROUP BY conditions, fields or expressions
     * that are used for the order must be selected to be compatible with some
     * databases like PostgreSQL. The PostgreSQL driver can handle simple cases
     * automatically but it is suggested to explicitly specify them. Additionally,
     * when ordering on an alias, the alias must be added before orderBy() is
     * called.
     *
     * @param $field
     *   The field on which to order.
     * @param $direction
     *   The direction to sort. Legal values are "ASC" and "DESC". Any other value
     *   will be converted to "ASC".
     * @return SelectQueryInterface
     *   The called object.
     */
    public function orderBy($field, $direction = 'ASC');

    /**
     * Orders the result set by a random value.
     *
     * This may be stacked with other orderBy() calls. If so, the query will order
     * by each specified field, including this one, in the order called. Although
     * this method may be called multiple times on the same query, doing so
     * is not particularly useful.
     *
     * Note: The method used by most drivers may not scale to very large result
     * sets. If you need to work with extremely large data sets, you may create
     * your own database driver by subclassing off of an existing driver and
     * implementing your own randomization mechanism. See
     *
     * http://jan.kneschke.de/projects/mysql/order-by-rand/
     *
     * for an example of such an alternate sorting mechanism.
     *
     * @return SelectQueryInterface
     *   The called object
     */
    public function orderRandom();

    /**
     * Restricts a query to a given range in the result set.
     *
     * If this method is called with no parameters, will remove any range
     * directives that have been set.
     *
     * @param $start
     *   The first record from the result set to return. If NULL, removes any
     *   range directives that are set.
     * @param $length
     *   The number of records to return from the result set.
     * @return SelectQueryInterface
     *   The called object.
     */
    public function range($start = NULL, $length = NULL);

    /**
     * Add another Select query to UNION to this one.
     *
     * Union queries consist of two or more queries whose
     * results are effectively concatenated together. Queries
     * will be UNIONed in the order they are specified, with
     * this object's query coming first. Duplicate columns will
     * be discarded. All forms of UNION are supported, using
     * the second '$type' argument.
     *
     * Note: All queries UNIONed together must have the same
     * field structure, in the same order. It is up to the
     * caller to ensure that they match properly. If they do
     * not, an SQL syntax error will result.
     *
     * @param $query
     *   The query to UNION to this query.
     * @param $type
     *   The type of UNION to add to the query. Defaults to plain
     *   UNION.
     * @return SelectQueryInterface
     *   The called object.
     */
    public function union(SelectQueryInterface $query, $type = '');

    /**
     * Groups the result set by the specified field.
     *
     * @param $field
     *   The field on which to group. This should be the field as aliased.
     * @return SelectQueryInterface
     *   The called object.
     */
    public function groupBy($field);

    /**
     * Get the equivalent COUNT query of this query as a new query object.
     *
     * @return SelectQueryInterface
     *   A new SelectQuery object with no fields or expressions besides COUNT(*).
     */
    public function countQuery();

    /**
     * Indicates if preExecute() has already been called on that object.
     *
     * @return
     *   TRUE is this query has already been prepared, FALSE otherwise.
     */
    public function isPrepared();

    /**
     * Generic preparation and validation for a SELECT query.
     *
     * @return
     *   TRUE if the validation was successful, FALSE if not.
     */
    public function preExecute(SelectQueryInterface $query = NULL);

    /**
     * Helper function to build most common HAVING conditional clauses.
     *
     * This method can take a variable number of parameters. If called with two
     * parameters, they are taken as $field and $value with $operator having a value
     * of IN if $value is an array and = otherwise.
     *
     * @param $field
     *   The name of the field to check. If you would like to add a more complex
     *   condition involving operators or functions, use having().
     * @param $value
     *   The value to test the field against. In most cases, this is a scalar. For more
     *   complex options, it is an array. The meaning of each element in the array is
     *   dependent on the $operator.
     * @param $operator
     *   The comparison operator, such as =, <, or >=. It also accepts more complex
     *   options such as IN, LIKE, or BETWEEN. Defaults to IN if $value is an array
     *   = otherwise.
     * @return QueryConditionInterface
     *   The called object.
     */
    public function havingCondition($field, $value = NULL, $operator = NULL);

    /**
     * Clone magic method.
     *
     * Select queries have dependent objects that must be deep-cloned.  The
     * connection object itself, however, should not be cloned as that would
     * duplicate the connection itself.
     */
    public function __clone();

    /**
     * Add FOR UPDATE to the query.
     *
     * FOR UPDATE prevents the rows retrieved by the SELECT statement from being
     * modified or deleted by other transactions until the current transaction
     * ends. Other transactions that attempt UPDATE, DELETE, or SELECT FOR UPDATE
     * of these rows will be blocked until the current transaction ends.
     *
     * @param $set
     *   IF TRUE, FOR UPDATE will be added to the query, if FALSE then it won't.
     *
     * @return QueryConditionInterface
     *   The called object.
     */
    public function forUpdate($set = TRUE);
}
```
