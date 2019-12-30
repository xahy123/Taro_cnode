import * as listApi from './service';

export default {
  namespace: 'list',
  state: {
    info: {}
  },

  effects: {
    * getDetail( {payload, callback}, { call, put }) {
      let res = yield call(listApi.getDetail,payload)
      if (res.success) {
        yield put({
          type: 'saveDetail',
          data: res.data
        })
      }
    },
  },

  reducers: {
    saveDetail(state,payload){
      let _state = JSON.parse(JSON.stringify(state))
      _state.info = payload.data
      return _state
    }
  },

};
