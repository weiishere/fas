import React,{Component} from 'react';
import './toolbar.less';
import {Icon,Tooltip,Popconfirm} from 'antd';
class Toolbar extends Component{
  handleSave=()=>{
    this.props.handleSave();
  }
  render(){
    return (
      <ul className="toolbar-right" style={this.props.style}>

        <Tooltip placement='left' title="保存配置">
          <li className="save" onClick={this.handleSave}>
            <div className="icon">
              <Icon type="save" />
            </div>
            <div className="text">
              <span>保存</span>
            </div>
          </li>
        </Tooltip>
        <Tooltip placement='left' title="更多功能，敬请期待">
          <li className="more">
            <div className="icon">
              <Icon type="ellipsis" />
            </div>
            <div className="text">
              <span>更多</span>
            </div>
          </li>
        </Tooltip>
      </ul>
    )
  }
}
export default Toolbar;