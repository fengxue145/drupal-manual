const head = require('./head')
const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
    // 基础设置
    // lang: 'zh-CN',
    title: "Drupal 手册",
    description: "Drupal 开发文档",

    // 导航栏 logo
    logo: '/logo.png',

    // 网站 header 内容
    head,

    // 内置搜索
    search: true,             // 是否开启搜索
    searchMaxSuggestions: 10, // 搜索结果数量

    // 最后更新时间
    lastUpdated: true,        // 在每页底部显示文件最后一次更新时间

    // 上一篇/下一篇
    prevLinks: true,          // 是否开启上一篇链接
    nextLinks: true,          // 是否开启下一篇链接

    // 页面滚动
    smoothScroll: true,       // 是否开启页面滚动

    // 主题配置
    themeConfig: {
        // 代码仓库配置
        repo: "https://github.com/fengxue145/drupal-manual", // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repoLabel: "GitHub",                                 // 自定义仓库链接文字。
        repoDisplay: true,                                   // 是否在导航栏右侧显示仓库链接。默认为 `true`

        // 导航配置
        nav,

        // 侧边栏配置
        sidebar,

        //         // 侧边栏
        //         sidebar: [
        //             {
        //                 title: '指南',          // 必要的，分组的标题文字
        //                 collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
        //                 sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
        //                 children: [             // 必要的，分组的子项目
        //                     {
        //                         title: '介绍',
        //                         path: '/v7/guide/',
        //                     },
        //                     {
        //                         title: '站点搭建',
        //                         path: '/v7/guide/site-set-up',
        //                     },
        //                     {
        //                         title: '目录结构',
        //                         path: '/v7/guide/directory-structure',
        //                     }
        //                 ]
        //             },
        //             {
        //                 title: '核心概念',       // 必要的，分组的标题文字
        //                 collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
        //                 sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
        //                 children: [             // 必要的，分组的子项目
        //                     {
        //                         title: '模块',
        //                         path: '/v7/guide/core/module',
        //                     },
        //                     {
        //                         title: '钩子',
        //                         path: '/v7/guide/core/hook',
        //                     },
        //                     {
        //                         title: '主题',
        //                         path: '/v7/guide/core/theme',
        //                     },
        //                     {
        //                         title: '节点',
        //                         path: '/v7/guide/core/node',
        //                     },
        //                     {
        //                         title: '区块',
        //                         path: '/v7/guide/core/block',
        //                     },
        //                     {
        //                         title: '菜单',
        //                         path: '/v7/guide/core/menu',
        //                     },
        //                     {
        //                         title: '用户',
        //                         path: '/v7/guide/core/user',
        //                     }
        //                 ]
        //             },
        //             {
        //                 title: '速查表',         // 必要的，分组的标题文字
        //                 collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
        //                 sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
        //                 children: [             // 必要的，分组的子项目
        //                     {
        //                         title: '表单 API',
        //                         path: '/v7/guide/form/',
        //                     }
        //                 ]
        //             },
        //             {
        //                 title: '案例',         // 必要的，分组的标题文字
        //                 // collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
        //                 // sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
        //                 children: [             // 必要的，分组的子项目
        //                     {
        //                         title: '用户相关',
        //                         children: [
        //                             {
        //                                 title: '用户登录',
        //                                 path: '/v7/guide/form/',
        //                             }
        //                         ],
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     '/zh/': {
        //         selectText: '选择语言',      // 多语言下拉菜单的标题
        //         label: '简体中文',           // 该语言在下拉菜单中的标签

        //         // 导航配置
        //         nav: [
        //             { text: '指南', link: '/zh/v7/guide/' },
        //             {
        //                 text: '选择版本',
        //                 ariaLabel: 'Version Menu',
        //                 items: [
        //                     { text: 'v7.x', link: '/zh/v7/guide', target:'_blank' },
        //                     // { text: 'v8.x', link: '/zh/v8/guide', target:'_blank' },
        //                     // { text: 'v9.x', link: '/zh/v9/guide', target:'_blank' }
        //                 ]
        //             }
        //         ],
        //     }
        // }
    },

    // 目录别名
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@public': '../../public/'
    //         }
    //     }
    // }
}