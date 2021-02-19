module.exports = function () {
  return `
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import IndexPage from '../../../layouts/config/IndexPage';
const cfgIndex = require("./cfg_index.json");
const cfgModal = require("./cfg_modal.json");
const IndexPageComponent = IndexPage(cfgIndex, cfgModal);

function RouterConfig({ history }) {
  return (
    <ConfigProvider locale={zhCN} getPopupContainer={triggerNode => triggerNode && triggerNode.parentElement || document.body}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPageComponent} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default RouterConfig;
  ` 
}
