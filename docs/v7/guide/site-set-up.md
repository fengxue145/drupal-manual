# 站点搭建
drupal 可以使用 composer 进行下载
https://www.drupal.org/download

浏览器输入网址 `http://local.drupal.cn/` 后会出现下面的安装界面

<img :src="$withBase('/images/site-set-up-1.png')" alt="foo">

- `Standard` 会预先安装常用的模块
- `Minimal`  仅会安装几个必须的模块

### Choose language
选择语言，默认仅有 `English` 语言。其他语言可以在站点搭建完成后，再进行设置。

Drupal 语言文件下载地址：`https://localize.drupal.org/download`

<img :src="$withBase('/images/site-set-up-2.png')" alt="foo">

### Verify requirements
这一步会验证当前服务器的配置，是否满足站点的最低要求。检测通过后，会自动进入下一步。


### Set up database
这一步设置数据库信息，并向数据库导入数据。

::: tip
数据库必须预先创建好，否则会出现错误：
`SQLSTATE[HY000] [1049] Unknown database 'drupal_local'.`
:::

<img :src="$withBase('/images/site-set-up-4.png')" alt="foo">


### Install profile
这一步会安装模块以及语言。

::: tip
8.x及以上的版本可以选择多语言，但需要联网向 `https://localize.drupal.org/download` 下载对应的语言包。**大概率会失败，毕竟天朝的网络环境...**
:::

<img :src="$withBase('/images/site-set-up-5.png')" alt="foo">


### Configure site
配置站点的基本信息，以及创建管理员。

<img :src="$withBase('/images/site-set-up-6.png')" alt="foo">

需要注意 `Update notifications` 的两项：
- `Check for updates automatically` 检查版本更新。如没有升级打算，不建议选
- `Receive e-mail notifications` 邮件订阅及通知。


### Finished
以上配置完成就可以进入站点。

<img :src="$withBase('/images/site-set-up-7.png')" alt="foo">

<img :src="$withBase('/images/site-set-up.png')" alt="foo">