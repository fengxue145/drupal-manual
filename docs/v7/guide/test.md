# 弹层创建

已 http://caogtja.drupal7.cn/zh-hant/wam/backend/user 链接为例

搜索到 wam/backend/user 属于 sites\all\modules\contrib_custom\ttl_contrib\ttl_contrib_user\ttl_contrib_user.module 该文件的 15 行。

发现：
    hook_admin_paths 用于注册页面弹出层
    例如：
    ```php
    function module_admin_paths() {
        $path = array(
            'wam/backend/user/add' => TRUE
        );
        return $path;
    }
    ```
    弹层链接为：http://caogtja.drupal7.cn/zh-hant/wam/backend/user#overlay=zh-hant/wam/backend/user/add
    其中最主要是：#overlay=zh-hant/wam/backend/user/add

同时还需要注册路由，看 sites\all\modules\contrib_custom\ttl_contrib\ttl_contrib_user\includes\ttl_contrib_user.router.inc 的第 81 行。

发现：
    hook_menu 钩子被实现，并且注册了 `wam/backend/user/add` 路径。
    例如：
    ```
    function module_menu() {
        $items = array();
        $items['wam/backend/user/add'] = array(
            // 页面标题
            'title' => 'New user',
            // 进入页面的回调函数
            'page callback' => 'drupal_get_form',
            // 页面回调函数参数
            'page arguments' => array('ttl_contrib_user_add_form'),
            // 页面访问权限回调
            'access callback' => 'ttl_contrib_access',
            // 访问权限回调参数
            'access arguments' => array('add users'),
            // 该页面的触发形式
            // MENU_LOCAL_ACTION = 按钮形式
            // MENU_LOCAL_TASK = 选项卡形式
            // 更多菜单项，请参考：https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_menu/7.x
            'type' => MENU_LOCAL_ACTION,
            // 该页面依赖的代码文件
            'file' => 'forms/ttl_contrib_user.forms.inc',
            // 代码文件路径
            'file path' => drupal_get_path('module', 'ttl_contrib_user'),
        );
        return $items;
    }
    ```






