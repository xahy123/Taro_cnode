import Taro, { Component } from '@tarojs/taro'
import { 
  View, 
  ScrollView, 
  Image 
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Menu from '../../components/menu'
import './index.less'

@connect(({index}) => ({
  ...index,
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Cnode-taro-dva',
  }

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount = () => {
    this.getList()
    console.log('地址',this.$router)
  }

  getList = () => {
    this.props.dispatch({
      type: 'index/getList',
    })
  }

  onScrollToLower = () => {
    this.props.dispatch({
      type: 'index/nextPage',
      callback: res => {
        if (res) {
          this.getList()
        }
      }
    })
  }

  getDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/list/index?id=${id}`
    })
  }

  render() {
    const { list } = this.props
    const getTab = {
      ask: '问答',
      share: '分享',
      good: '精华',
    }
    const scrollStyle = {
      height: '680px'
    }
    return (
      <View className="index-page">
        <Menu />
        <ScrollView 
          className="list"
          style={scrollStyle}
          scrollY={true}
          onScrollToLower={this.onScrollToLower}
        >
          {
            list && list.map(item => (
              <View key={item.id} onClick={() => this.getDetail(item.id)} className="box_list">
                <View >
                  <Image className="img" src={item.author.avatar_url} alt=""/>
                </View>
                <Text className={item.top ? "top" : "tag"}>{item.top ? '置顶' : getTab[item.tab]}</Text>
                <View className="desc">
                  <Text className="title">{item.title}</Text>
                  <Text className="num">{item.reply_count + '/' + item.visit_count}</Text>
                </View>
                
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}
