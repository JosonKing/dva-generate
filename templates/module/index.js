const index = require('./common');
const model = require('./common/models/model');
const router = require('./common/router');
const readme = require('./common/readme');
const curdCfgIndex = require('./curd/cfg_index');
const curdCfgModal = require('./curd/cfg_modal');
const curdPageCfgIndex = require('./curdPage/cfg_index');
const curdPageCfgModal = require('./curdPage/cfg_modal');

module.exports = [
  { name: 'curd', src: index, srcModel: model, srcRouter: router, srcCfgIndex: curdCfgIndex, srcCfgModal: curdCfgModal, srcReadme: readme },
  { name: 'curdPage', src: index, srcModel: model, srcRouter: router, srcCfgIndex: curdPageCfgIndex, srcCfgModal: curdPageCfgModal, srcReadme: readme },
]