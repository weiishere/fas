import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Row, Col, Card, Tag, Icon, Tooltip, Popconfirm} from 'antd';
import './versionList.less';
import {getVersionList, activateVersion,deleteVersion,visibleVersionList,getFrameData} from './action';
import {updateStructure,updateFund,updateBanner} from '../../action';
import {merchantIdInject} from '../../../hoc/merchantIdInject';
class VersionCardRow extends Component {
  static propTypes = {
    cardList: PropTypes.array,
  }
  render() {
    const cardsInRow = this.props.cardList.map(function (item, index, listSelf) {
      return <VersionCard key={item.templetId} card={item} />
    })
    return (
      <Row>
        {cardsInRow}
      </Row>
    )
  }
}
class VersionCard extends Component {
  static propTypes = {
    card: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object
  }
  constructor(options) {
    super(options);
  }
  render() {
    let style = {
      'margin': '16px',
      'textAlign':'center',
      'cursor': 'pointer'
    }
    let extra = null;
    if (this.props.card.status == '1') {
      extra = <Tag color="#ff6666">活跃</Tag>
      style = {
        'margin': '16px',
        'cursor': 'pointer',
        'textAlign':'center',
        'color':'#fff',
        'backgroundColor':'#478BDF'
      }
    }
    const CardWidgetsWrapped=merchantIdInject(CardWidgets);
    return (
      <Col span="8">
        <Card
          style={style}
          bordered={this.props.card.flag !== 'add'}
        >
         <div style={{'paddingBottom':20,'textAlign':'center','fontSize':18}}>{this.props.card.templetName}</div>
         <CardWidgetsWrapped card={this.props.card}
        />
        </Card>
      </Col>
    )
  }
}
class CardWidgets extends Component {
  static propTypes = {
    card: PropTypes.object
  }
  static contextTypes = {
    mainProps: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    parent: React.PropTypes.object.isRequired,
  }
  constructor(options) {
    super(options);
    this.clickCardJump = this.clickCardJump.bind(this);
    this.state = {
      loading: false
    }
  }
  handletoActive = () => {
    const {dispatch} = this.context.mainProps;
    const {merchantId}=this.props;
    this.setState({ loading: true });
    var _self=this;
    dispatch(activateVersion(this.props.card.templetId,merchantId,function(){
      _self.setState({ loading: false })
    }));
  }
  handleDelete= () => {
    const {merchantId}=this.props;
    const {dispatch} = this.context.mainProps;
    var _self=this;
    dispatch(deleteVersion(this.props.card.templetId,merchantId,function(){
      if(_self.context.mainProps.versionId===_self.props.card.templetId){
        dispatch(updateStructure({
          moduleContent:[]
        }));
        dispatch(updateFund([]));
        dispatch(updateBanner([]));
        _self.context.router.replace('/index/');
      }
    }));
  }
  clickCardJump(e) {
    const {dispatch} = this.context.mainProps;
    dispatch(visibleVersionList(false));
    this.context.router.push('/index/' + this.props.card.templetId);
  }
  render() {
    const btnStyle = {
      marginRight: 16,
      border:'solid  1px #73A6E6',
      width:80,height:25
    }
    const disabled = this.props.card.status == '1';
    const isShow = this.props.card.flag !== 'add';
    const content = isShow ?
    <div>
      {disabled ?
        <Button icon="check-circle-o" style={{display:'none'}} type='primary' size="small" disabled={disabled}>激活</Button> :
        <Tooltip placement='top' title="设置为当前应用版本">
          <Button onClick={this.handletoActive} className='btnStyle2 mr16' loading={this.state.loading} type='primary' size="small" disabled={disabled}>
            <i className='editIcon list_icon3'></i>激活</Button>
        </Tooltip>}
        
        {disabled ? <Button type='primary' style={btnStyle} size='small' onClick={this.clickCardJump}>
          <i className='editIcon list_icon2'></i>编辑</Button>:
        <Button type='primary' className='btnStyle2 mr16' size='small' onClick={this.clickCardJump}>
          <i className='editIcon list_icon'></i>编辑</Button>}
        

      {disabled ? <Button icon='delete' type='primary' size='small'  style={{display:'none'}}>删除</Button> :
        <Popconfirm title="确定删除该版本吗？" onConfirm={this.handleDelete}>
          <Button icon='delete' type='primary' size='small' className='btnStyle2'>删除</Button>
        </Popconfirm>}
        
    </div> :
    <div  style={{marginTop:'10px'}} role='add' onClick={this.context.parent.openVersionIn}>
        {this.props.card.creator}
    </div>;
    return (
      content
    )
  }
}
class VersionList extends Component {
  static propTypes = {
    versionList: PropTypes.array
  }
  static childContextTypes = {
    mainProps: React.PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      mainProps: this.props
    }
  }
  handleCancel = (e) => {
    const {dispatch} = this.props;
    dispatch(visibleVersionList(false));
  }
  static defaultProps = {
    closable: false,
    visible:true

  }
  state = {
    visible: this.props.visible,
    cardsInEveryRow: 3,
    inputModalVisible:false
  }
  render() {
    let cardList = null;
    let tempArr = [], innerArr = [], i = 0;
    for (; i < this.props.versionList.length; i++) {
      if (i === this.props.versionList.length) {
      }
      if (i % this.state.cardsInEveryRow === 0) {
        if (i !== 0) {
          tempArr.push(innerArr);
        }
        innerArr = [];
        innerArr.push(this.props.versionList[i]);
        if (i === this.props.versionList.length - 1) {
          tempArr.push(innerArr);
        }
      } else {
        innerArr.push(this.props.versionList[i]);
        if (i === this.props.versionList.length - 1) {
          tempArr.push(innerArr);
        }
      }
    }
    cardList = tempArr.map(function (item, index, tempArr) {
      return <VersionCardRow key={index} cardList={item} />
    })
    const iconStyle = { 'margin': "16px", 'cursor': 'pointer', 'width': 18, 'height': 18, 'fontSize': 18, 'float': 'right', color: '#e9e9e9' }
    return (<Modal
      width={1024}
      visible={this.props.visibleVersionList}
      onOk={function () {
      }}
      confirmLoading={false}
      onCancel={this.handleCancel}
      closable={this.props.closable}
      maskClosable={false}
      footer={null}
    >
      {cardList}
    </Modal>
    )
  }
}

function insertDefaultAddCard(list) {
  const style = {
    fontSize: 48,
    color: '#e9e9e9',
    marginTop:'-15px'
  }
  const addCard = {
    templetId: "addCard",
    name: '',
    flag: 'add',
    creator: <Icon type="plus" style={style} />
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].flag === 'add') {
      return list;
    }
  }
  list.push(addCard);
  return list;
}

function mapStateToProps(state, ownProps) {
  const versions = state.get('versionList');
  const versionList = insertDefaultAddCard(versions.get('versionList'));
  const caches = state.get('caches');
  const visibleVersionList=versions.get('visibleVersionList');
  return {
    caches,
    versionList,
    visibleVersionList
  }
}
function mapDispatchToProps(dispatch) {
  return {
    bindList: (merchantId) => dispatch(getVersionList(merchantId))
  }
}
export default connect(mapStateToProps)(VersionList)