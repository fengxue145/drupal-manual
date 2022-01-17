# DatabaseStatementEmpty

数据库结果集的空实现。

该类虽然实现了 [DatabaseStatementInterface](./DatabaseStatementInterface) 和 `Iterator`，但实际上不包含数据。当开发人员需要安全返回空结果集而不连接到数据库时，它很有用。


## 源代码
```php
class DatabaseStatementEmpty implements Iterator, DatabaseStatementInterface {

    public function execute($args = array(), $options = array()) {
        return FALSE;
    }

    public function getQueryString() {
        return '';
    }

    public function rowCount() {
        return 0;
    }

    public function setFetchMode($mode, $a1 = NULL, $a2 = array()) {
        return;
    }

    public function fetch($mode = NULL, $cursor_orientation = NULL, $cursor_offset = NULL) {
        return NULL;
    }

    public function fetchField($index = 0) {
        return NULL;
    }

    public function fetchObject() {
        return NULL;
    }

    public function fetchAssoc() {
        return NULL;
    }

    function fetchAll($mode = NULL, $column_index = NULL, array $constructor_arguments = array()) {
        return array();
    }

    public function fetchCol($index = 0) {
        return array();
    }

    public function fetchAllKeyed($key_index = 0, $value_index = 1) {
        return array();
    }

    public function fetchAllAssoc($key, $fetch = NULL) {
        return array();
    }

    /* Implementations of Iterator. */

    public function current() {
        return NULL;
    }

    public function key() {
        return NULL;
    }

    public function rewind() {
        // Nothing to do: our DatabaseStatement can't be rewound.
    }

    public function next() {
        // Do nothing, since this is an always-empty implementation.
    }

    public function valid() {
        return FALSE;
    }
}
```
