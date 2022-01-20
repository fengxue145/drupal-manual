const path = require('path')
const fs = require('fs')

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’–—<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

/**
 * Interface
 *
 * 侧边栏索引：
 * $indexes: {
 *   link: string;     // 访问的基础路径
 *   filepath: string; // 文件路径
 *   files: string[];  // 需要引入的文件列表
 * }[]
 *
 *
 * 侧边栏结构：
 * $sidebar: {
 *   path: string;         // 访问路径，会嵌入下一层
 *   children: $sidebar[]  // 侧边栏结构
 * }
 */




/**
 * 格式化侧边栏路径
 * @param {*} $basepath URL基础路径
 * @param {*} $sidebar  侧边栏结构对象
 */
function reslovePath($basepath, $sidebar) {
    if (Array.isArray($sidebar)) {
        $sidebar.forEach(v => reslovePath($basepath, v))
    } else if (Object.prototype.toString.call($sidebar) === '[object Object]') {
        if ($sidebar.children !== undefined) {
            $sidebar.children.forEach(v => reslovePath($basepath + ($sidebar.path || ''), v))
        } else {
            $sidebar.path = $basepath + ($sidebar.path || '')
        }
    }
}

/**
 * 创建API侧边栏
 * @param {*} $indexes 侧边栏索引
 * @returns
 */
function createSidebar($indexes) {
    const sidebar = {}

    $indexes.forEach($item => {
        const link = $item.link || ''
        const filepath = $item.filepath || path.resolve()

        if (sidebar[link] === undefined) {
            sidebar[link] = []
        }

        if ($item.files !== undefined) {
            $item.files.forEach(v => {
                const file = path.resolve(filepath, v)
                const [filename, _] = path.basename(file).split('.')

                if (fs.existsSync(file)) {
                    const data = require(file)
                    reslovePath(link + filename + '/', data)
                    sidebar[link].push(data)
                } else {
                    console.warn('File not Found: ', file)
                }
            })
        }
    })

    return sidebar
}

function markdownSlugify (str) {
    if (/^[a-zA-Z_&]+\(.*\)$/.test(str)) {
        // Remove function params
        return str.replace(/^&?([a-zA-Z_]+)\(.*\)$/i, '$1')
    } else {
        return str.normalize('NFKD')
            // Remove accents
            .replace(rCombining, '')
            // Remove control characters
            .replace(rControl, '')
            // Replace special characters
            .replace(rSpecial, '-')
            // Remove continuous separators
            .replace(/\-{2,}/g, '-')
            // Remove prefixing and trailing separators
            .replace(/^\-+|\-+$/g, '')
            // ensure it doesn't start with a number (#121)
            .replace(/^(\d)/, '_$1')
            // lowercase
            //.toLowerCase()
    }
}


module.exports = {
    reslovePath,
    createSidebar,
    markdownSlugify
}
