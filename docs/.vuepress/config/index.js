const head = require('./head')
const nav = require('./nav')
const sidebar = require('./sidebar')
const helper = require('../helper')


module.exports = {
    // 基础设置
    // base: '/v7',
    title: "Drupal 开发文档",
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
    },
    markdown: {
        // lineNumbers: true,
        slugify: helper.makedownSlugify
    },
    plugins: [
        [
            (pluginOptions, context) => ({
                name: 'md-hash-plugin',
                extendMarkdown: md => {

                    const link_open = md.renderer.rules.link_open
                    const link_close = md.renderer.rules.link_close


                    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
                        console.log('link_open', tokens.content)
                        return link_open(tokens, idx, options, env, self)
                    }

                    // md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
                    //     console.log('link_close', tokens.content)
                    //     return link_close(tokens, idx, options, env, self)
                    // }

                }
            })
        ]
    ]
}
