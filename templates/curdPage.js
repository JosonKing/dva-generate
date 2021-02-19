module.exports = function (modelName, gatwayName) {
  let capitalModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  return `
import * as service from '../../utils/service';

export default {
  namespace: '${modelName}',
  state: {
    ${modelName}s: [],
    page${capitalModelName}s: [],
    totalSize: 0,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },
  effects: {
    *get${capitalModelName}s({ payload, callback }, { put, call, select }) {
      let data = yield call(service.getCmd, '${gatwayName}/${modelName}s');
      console.log('get${capitalModelName}s', data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_save${capitalModelName}s', payload: data });
      callback && callback(data);
    },
    *add${capitalModelName}({ payload, callback }, { put, call, select }) {
      var data = yield call(service.postCmd, '${gatwayName}/${modelName}', payload);
      console.log('add${capitalModelName}', data);
      // if (!!data.error) {
      //   return;
      // }
      yield put({ type: '_add${capitalModelName}', payload: data });
      callback && callback(data);
    },
    *edit${capitalModelName}({ payload, callback }, { put, call, select }) {
      var data = yield call(service.putCmd, '${gatwayName}/${modelName}', payload);
      console.log('edit${capitalModelName}', data);
      // if (!!data.error) {
      //   return;
      // }
      yield put({ type: '_edit${capitalModelName}', payload: data });
      callback && callback(data);
    },
    *delete${capitalModelName}({ payload, callback }, { put, call, select }) {
      var data = yield call(service.deleteCmd, \`${gatwayName}/${modelName}/\$\{payload}\`);
      console.log('delete${capitalModelName}', data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_delete${capitalModelName}', payload: payload });
      callback && callback(data);
    },
    *getPage${capitalModelName}s({ payload }, { put, call, select }) {
      var data = yield call(service.getCmd, '${gatwayName}/${modelName}/pages', payload.data);
      console.log("get${capitalModelName}s", data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_savePage${capitalModelName}s', payload: data });
    },
  },
  reducers: {
    _save${capitalModelName}s(state, { payload }) {
      return { ...state, ${modelName}s: payload };
    },
    _add${capitalModelName}(state, { payload }) {
      let { ${modelName}s } = state;
      ${modelName}s.push(payload);
      return { ...state, ${modelName}s: [...${modelName}s] };
    },
    _edit${capitalModelName}(state, { payload }) {
      let { ${modelName}s, prisonRooms } = state;
      for (var i = 0; i < ${modelName}s.length; i++) {
        if (${modelName}s[i].id === payload.id) {
          ${modelName}s[i] = payload;
          break;
        }
      }
      for (var i = 0; i < prisonRooms.length; i++) {
        if (prisonRooms[i].id === payload.id) {
          prisonRooms[i] = payload;
          break;
        }
      }
      return { ...state, ${modelName}s: [...${modelName}s], prisonRooms: [...prisonRooms] };
    },
    _delete${capitalModelName}(state, { payload }) {
      let { ${modelName}s } = state;
      ${modelName}s = ${modelName}s.filter(u => u.id !== payload);
      return { ...state, ${modelName}s };
    },
    _savePage${capitalModelName}s(state, { payload }) {
      return { ...state, page${capitalModelName}s: payload.list, totalSize: payload.totalSize };
    },
  },
};
  ` 
}