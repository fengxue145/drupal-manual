# 创建你的第一个模块

即将学到的要点：
[[开始一个新模块]]
[[创建.info文件]]
[[创建.module文件]]
[[增加一个block]]
[[查看效果]]


**目标：带区块的模块**
准备创建一个简单的模块，这个模块将用 block 子系统来添加一个新的 block，它能简单展示一个包括所有的现在可用的模块列表。

## 创建新模块
### 模块名
一个durpal模块有两个名字：
- 人类可读名：如 `Views`
- 机器可读名：drupal内部用

### 放置目录
drupal共有三个地方可放置模块：
- `project/modules`
  该目录不允许放任何东西的，它们都是drupal核心模块，在更新的时候将会被覆写掉。
- `project/site/all/modules`
  所有的第三方插件模块的地方 诸如Drush等，就会下载后存放到这里。我们的代码放到这里也是可以的，起码更新时不会被覆写掉。但是不推荐，除非你做多站，模块需要被所有站访问。
- `project/site/default/modules`
  推荐放到这里/sites/default/modules，缺省状态下你要自己建一个文件夹，这样做的好处不少，一个是我们找自己的代码好找，还有就是加载时顺序可以调整等等。它的缺点在于制作多站时模块不会被其他站读到。

### 创建模块目录
我们要在 `project/site/default/modules` 里创建一个新的模块，里面包含一个 `.info` 文件和一个 `.module` 文件.
```
modules
    └─ mymodule
        └─ mymodule.info
        └─ mymodule.module
```

### 编写 `.info` 文件
```
; project/site/default/modules/mymodule/mymodule.info

name = MyModule
description = my first module.
package = Drupal7 Development
core = 7.x
php = 5.6
files[] = mymodule.module
```

更多有关 `.info` 文件的信息，请参考 [xxxxx]()

### 编写 `.module` 文件
.module 是一个包含了主要钩子接口的 `php` 文件。
```php
// project/site/default/modules/mymodule/mymodule.info

<?php
/**
 * Implements hook_help()
 */
function mymodule_help($path, $args) {
    if ($path === 'admin/help#mymodule') {
        return t('A demonstration module');
    }
}

```