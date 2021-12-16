const _api = require('./pages/v7/api.json')
const _case = require('./pages/v7/case.json')
const _core = require('./pages/v7/core.json')
const _guide = require('./pages/v7/guide.json')
const _module = require('./pages/v7/module.json')

module.exports = {
    ..._api,
    ..._case,
    ..._core,
    ..._guide,
    ..._module
}
