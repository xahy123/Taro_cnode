import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { 
  AtIcon,
  AtDrawer
} from 'taro-ui'
import { connect } from '@tarojs/redux'
@connect(({index}) => ({
  ...index
}))
class Menu extends Component {
  state = {
    show: false,
    title: '全部',
    categoryData: [
      '全部',
      // '精华',
      '分享',
      '问答'
    ]
  }

  changeCategory = () => {
    this.setState({
      show: true
    })
  }

  onClose = () => {
    this.setState({
      show: false
    })
  }

  getList = (index) => {
    console.log(index)
    let newTab
    if (index == 0) {
      newTab = ''
      this.setState({
        title: '全部'
      }, () => this.changeTab('all') )
    } else if (index == 1) {
      newTab = 'share'
      this.setState({
        title: '分享'
      }, () => this.changeTab('share') )
    } else {
      newTab = 'ask'
      this.setState({
        title: '问答'
      }, () => this.changeTab('ask') )
    }
    
  }

  changeTab = (title) => {
    this.props.dispatch({
      type: 'index/changeTab',
      payload: {
        title: title
      },
      callback: res => {
        if (res) {
          this.props.dispatch({
            type: 'index/getList',
            payload: {
              type: 'menu'
            }
          })
        }
      }
    })
  }

  render () {
    const { show, categoryData, title } = this.state
    return (
      <View>
        <View className='menu'>
          <View className='left' onClick={this.changeCategory}>
            <AtIcon value='list' size='30'></AtIcon>
          </View>
          <View className='title'>
            <Text>{title}</Text>
          </View>
          <View className='right'>
            <AtIcon value='user' size='30'></AtIcon>
          </View>
        </View>
        <AtDrawer
          show={show} 
          mask 
          onClose={this.onClose}
          onItemClick={this.getList}
          items={categoryData}
        ></AtDrawer>
      </View>
    )
  }
}

export default Menu