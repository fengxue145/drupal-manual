---
sidebarDepth: 0
---

## db_close($options)

关闭数据库连接。

参数:
- `$options`: `array`

  一个选项数组，用于控制关闭哪个连接，仅 `target` 键有效。默认 `[]` 关闭所有目标连接。

```php
$db1 = Database::getConnection('default');
$db2 = Database::getConnection('slave1');
$db3 = Database::getConnection('slave2');

db_close(['target' => 'slave1']); // close slave1
db_close();                       // close all
```
