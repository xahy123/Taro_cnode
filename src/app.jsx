import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Test from './pages/test'
import dva from './utils/dva'
import models from './models'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'

import './app.less'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/demo/index',
      'pages/index/index',
      'pages/list/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
      <Test />
      </Provider>
      
    )
  }
}

Taro.render(<App />, document.getElementById('app'))