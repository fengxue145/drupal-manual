---
sidebarDepth: 0
---

## db_like($string)

转义在 `LIKE` 模式中作为通配符使用的字符(`%` `_` `\`)。

参数:
- <span class="required">*</span>`$string`: `string`

  `LIKE` 查询子句。

返回值: `string`


```php
db_query(
    'SELECT * FROM person WHERE name LIKE :pattern',
    array(':pattern' => db_like('维多%_') . '%')
);
```
