module.exports = function (moduleName, gatwayName) {
  return `
import 'babel-polyfill';
import dva from 'dva';

import '../../../common.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('../../../models/${gatwayName}/${moduleName}').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
  ` 
}
