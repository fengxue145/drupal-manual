# DatabaseSchema_sqlite

继承:
- [DatabaseSchema](../DatabaseSchema)



## $defaultSchema

## tableExists($table)

## fieldExists($table, $column)

## indexExists($table, $name)

## createTableSql($name, $table)

## createFieldSql($name, $spec)

## createIndexSql($tablename, $schema)

## createColumsSql($tablename, $schema)

## createKeySql($fields)

## processField($field)

## getFieldTypeMap()

## renameTable($table, $new_name)

## alterTable($table, $old_schema, $new_schema, array $mapping = array())

## dropTable($table)

## addField($table, $field, $spec, $new_keys = array())

## introspectSchema($table)

## dropField($table, $field)

## changeField($table, $field, $field_new, $spec, $keys_new = array())

## mapKeyDefinition(array $key_definition, array $mapping)

## addPrimaryKey($table, $fields)

## dropPrimaryKey($table)

## addUniqueKey($table, $name, $fields)

## dropUniqueKey($table, $name)

## addIndex($table, $name, $fields)

## dropIndex($table, $name)

## fieldSetDefault($table, $field, $default)

## fieldSetNoDefault($table, $field)

## findTables($table_expression)

## findTablesD8($table_expression)



## 源代码
```php
```
