import Taro, { Component } from '@tarojs/taro';
import { View, RichText } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

@connect(({list}) => ({
  ...list,
}))
export default class List extends Component {
  config = {
    navigationBarTitleText: 'list',
  }

  componentDidMount = () => {
    this.getDetail()
  }

  getDetail = () => {
    this.props.dispatch({
      type: 'list/getDetail',
      payload: {
        id: this.$router.params.id
      }
    })
  }

  render() {
    // console.log('list页面的',this.props.info)
    const { info } = this.props
    return (
      <View className="list-page">
        <RichText nodes={info.content} />
      </View>
    )
  }
}
