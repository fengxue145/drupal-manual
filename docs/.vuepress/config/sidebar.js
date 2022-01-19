const path = require('path')
const helper = require('../helper')

// const _api = require('./pages/v7/api.json')
const _case = require('./pages/v7/case.json')
const _core = require('./pages/v7/core.json')
const _guide = require('./pages/v7/guide.json')
const _module = require('./pages/v7/module.json')


const apis = [
    {
        link: "/v7/api/",
        filepath: path.resolve(__dirname, 'pages/v7/api/'),
        files: [
            'database.json'
        ]
    }
]

module.exports = {
    ...helper.createSidebar(apis),
    ..._case,
    ..._core,
    ..._guide,
    ..._module
}
