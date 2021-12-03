module.exports = {
    // 导航栏 logo
    logo: '/logo.png',

    // 网站 header 内容
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

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

    // 多语言配置（使用多语言是，必须配置该项。否则 themeConfig 的多语言配置不生效）
    locales: {
        '/': {
            lang: 'en-US',
            title: "Drupal Manual",
            description: "Drupal develop a document",
        },
        '/zh/': {
            lang: 'zh-CN',
            title: "Drupal 手册",
            description: "Drupal 开发文档",
        }
    },

    // 主题配置
    themeConfig: {
        // 代码仓库配置
        repo: "https://github.com/fengxue145/drupal-manual", // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repoLabel: "GitHub",                                 // 自定义仓库链接文字。
        repoDisplay: true,                                   // 是否在导航栏右侧显示仓库链接。默认为 `true`

        // 主题多语言配置
        locales: {
            '/': {
                selectText: 'Languages',    // 多语言下拉菜单的标题
                label: 'English',           // 该语言在下拉菜单中的标签

                // 导航配置
                nav: [
                    { text: 'Guide', link: '/v7/guide/' },
                    {
                        text: 'Versions',
                        ariaLabel: 'Version Menu',
                        items: [
                            { text: 'v7.x', link: '/v7/guide', target:'_blank' },
                            // { text: 'v8.x', link: '/v8/guide', target:'_blank' },
                            // { text: 'v9.x', link: '/v9/guide', target:'_blank' }
                        ]
                    }
                ],

                // 侧边栏
                sidebar: [
                    {
                        title: '指南',          // 必要的，分组的标题文字
                        collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
                        sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
                        children: [             // 必要的，分组的子项目
                            {
                                title: '介绍',
                                path: '/v7/guide/',
                            },
                            {
                                title: '站点搭建',
                                path: '/v7/guide/site-set-up',
                            },
                            {
                                title: '目录结构',
                                path: '/v7/guide/directory-structure',
                            }
                        ]
                    },
                    {
                        title: '核心概念',       // 必要的，分组的标题文字
                        collapsable: false,     // 可选的, 设置分组是否可以折叠，默认值是 true
                        sidebarDepth: 3,        // 可选的, 嵌套渲染深度，默认值是 2
                        children: [             // 必要的，分组的子项目
                            {
                                title: '模块',
                                path: '/v7/guide/core/module',
                            },
                            {
                                title: '钩子',
                                path: '/v7/guide/core/hook',
                            },
                            {
                                title: '主题',
                                path: '/v7/guide/core/theme',
                            },
                            {
                                title: '节点',
                                path: '/v7/guide/core/node',
                            },
                            {
                                title: '区块',
                                path: '/v7/guide/core/block',
                            },
                            {
                                title: '菜单',
                                path: '/v7/guide/core/menu',
                            },
                            {
                                title: '用户',
                                path: '/v7/guide/core/user',
                            }
                        ]
                    }
                ]
            },
            '/zh/': {
                selectText: '选择语言',      // 多语言下拉菜单的标题
                label: '简体中文',           // 该语言在下拉菜单中的标签

                // 导航配置
                nav: [
                    { text: '指南', link: '/zh/v7/guide/' },
                    {
                        text: '选择版本',
                        ariaLabel: 'Version Menu',
                        items: [
                            { text: 'v7.x', link: '/zh/v7/guide', target:'_blank' },
                            // { text: 'v8.x', link: '/zh/v8/guide', target:'_blank' },
                            // { text: 'v9.x', link: '/zh/v9/guide', target:'_blank' }
                        ]
                    }
                ],
            }
        }
    },

    // 目录别名
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': './public'
            }
        }
    },
}
