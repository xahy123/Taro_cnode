import * as indexApi from './service'
import Taro from '@tarojs/taro'
export default {
  namespace: 'index',
  state: {
    page: 1,
    limit: 20,
    tab: '',
    list: []
  },

  effects: {
    //获取数据
    * getList({ payload, callback }, { call, put, select }) {
      Taro.showLoading()
      if (payload && payload.type == 'menu') {
        yield put({
          type: 'initData'
        })
      }
      const { page, limit, tab } = yield select(state => state.index)
      let params = {
        page,
        limit,
        tab
      }
      console.log(1111111,params)
      let res = yield call(indexApi.getList,params)
      if (res.success) {
        Taro.hideLoading()
        yield put({
          type: 'saveList',
          data: res.data
        })
      }
      // callback(res)
    },
    * nextPage( { callback }, { put }) {
      yield put({
        type: 'savePage'
      })
      callback(1)
    },
    * changeTab( { payload,callback }, { put }) {
      yield put({
        type: 'saveTab',
        payload
      })
      callback(1)
    }
  },

  reducers: {
    saveList(state,payload){
      let _state = JSON.parse(JSON.stringify(state))
      _state.list = _state.list.concat(payload.data)
      return _state
    },
    //改变tab
    saveTab(state,payload){
      let _state = JSON.parse(JSON.stringify(state))
      _state.tab = payload.payload.title == 'all' ? '' : payload.payload.title
      return _state
    },
    //分页
    savePage(state,payload){
      let _state = JSON.parse(JSON.stringify(state))
      _state.page += 1
      return _state
    },
    initData(state,payload){
      let _state = JSON.parse(JSON.stringify(state))
      _state.page = 1
      _state.limit = 20
      _state.list = []
      return _state
    }
  },
  // subscriptions: {
  //   scroll({dispatch,history}) {
  //     console.log('监听的111',dispatch)
  //   }
  // }
};
