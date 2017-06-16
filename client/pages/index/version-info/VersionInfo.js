import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {pageCardStatusChange,getFrameData,defaultStructure,getHotFundList} from './action';
import {Layout,Menu,Icon,Button,Modal,Input,message,Tag} from 'antd';
const {Content,Sider,Header}=Layout;
const {Item}=Menu;
import EditArea from './modules/EditArea';
import './versionInfo.less';
import { visibleVersionList,addVersion ,getVersionList} from './modules/version-list/action';
import VersionList from './modules/version-list/VersionList';
import { browserHistory } from 'react-router';
import {merchantIdInject} from '../hoc/merchantIdInject';

class VersionNameInputModal extends Component{
  constructor(options) {
    super(options);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.Change = this.Change.bind(this);
  }

  static contextTypes = {
    parent: React.PropTypes.object.isRequired
  }
  handleOk=()=>{
    //console.log(this.context.parent.state.versionName);
    if(!this.context.parent.state.versionName.replace(/(^\s*)|(\s*$)/g,'')){
      message.error('版本名称请勿置空，谢谢~');
      return false;
    }else if(this.context.parent.state.versionName.replace(/(^\s*)|(\s*$)/g,'').length>=15){
      message.error('版本名称请勿超过15个字符，谢谢~');
      return false;
    }

    this.context.parent.setState({addVersionVisible: false,});
    //console.log(this.context.parent.state.versionName);
    this.context.parent.props.dispatch(addVersion(this.context.parent.state.versionName.replace(/(^\s*)|(\s*$)/g,''),this.context.parent.props.merchantId,function(templetId){
      //dispatch(visibleVersionList(false));
      browserHistory.push('/fas-sys/index/' + templetId);
    }));
  }
  handleCancel=()=>{
    this.context.parent.setState({addVersionVisible: false,});
  }
  Change=(e)=>{
      this.context.parent.setState({versionName:e.currentTarget.value});
    }
  render(){

    return (
      <div>
        <Modal title="请输入您要添加的版本名称" visible={this.context.parent.state.addVersionVisible}
          onOk={this.handleOk} onCancel={this.handleCancel} width='300px'
          okText="确认" cancelText="取消">
              <Input placeholder="请输入版本名称（不超过15个字符）" onChange={this.Change} />
        </Modal>
      </div>
    );
  }
}
class VersionInfo extends Component{
  static propTypes={
    versionInfo:PropTypes.object,
    pageList:PropTypes.array,
    merchantId:PropTypes.string.isRequired
  }

  static childContextTypes={
    router:PropTypes.object,
    location:PropTypes.object,
    dispatch:PropTypes.func,
    parent: PropTypes.object
  }
  getChildContext(){
    return {
      router:this.props.router,
      location:this.props.location,
      dispatch:this.props.dispatch,
      parent: this
    }
  }
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.routeParams.id!==this.props.routeParams.id){
      this.pageLoad(nextProps.routeParams.id);
    }
  }
  constructor(options){
    super(options);
    const versionId=this.props.routeParams.id;
    //路径中没有版本id的话，则弹出列表
    if(!versionId){
      this.props.dispatch(visibleVersionList(true));
    }else{
      this.props.dispatch(visibleVersionList(false));
    }
    this.toggle=this.toggle.bind(this);
    this.state={
      collapsed: false,
      addVersionVisible:false
    }
    this.pageClickHandler=this.pageClickHandler.bind(this);
    this.showVersionList=this.showVersionList.bind(this);
    this.openVersionIn=this.openVersionIn.bind(this);
  }
  pageClickHandler(item){
    const {dispatch}=this.props;
    dispatch(pageCardStatusChange(item));
  }
  openVersionIn(){
    this.setState({
      addVersionVisible: true,
    });
  }
  showVersionList(){
    const {dispatch}=this.props;
    dispatch(visibleVersionList(true));
  }
  menuItemClick=({item,key,keyPath})=>{
    this.pageLoad(this.props.routeParams.id);
  }
  pageLoad=(templetId)=>{
    const {dispatch}=this.props;
    const {merchantId}=this.props;
    this.refs.editArea.instance.emptyMovedEl();
    dispatch(getVersionList(merchantId));
    dispatch(defaultStructure());
    //后续扩展此处page需设为变量
    dispatch(getFrameData({
      templetId:templetId,
      merchantId,
      page:'index'
    }))
    dispatch(getHotFundList(merchantId));
  }
  componentDidMount(){
    //进来默认获取左边栏第一个页面的配置
    const {merchantId}=this.props;
    if(this.props.routeParams.id){
      this.pageLoad(this.props.routeParams.id);
    }else{
      this.props.dispatch(getVersionList(merchantId));
    }
  }
  getVersion=()=>{
    const {versionList} = this.props;
    let flag=false,currentVersion,i=0;
    for(;i<versionList.length;i++){
      if(versionList[i].templetId===this.props.routeParams.id){
        flag=true;
        break;
      }
    }
    if(flag){
      return currentVersion=versionList[i];
    }else{
      if(this.props.routeParams.id)this.props.router.push('/index/');
    }
    return {};
  }
  render(){
    const {merchantId}=this.props;
    if(!merchantId){
      return false;
    }
    const pageList=this.props.pageList.map(function (item, index, arrSelf) {
      return <Item style={{height:52,lineHeight:'52px',textAlign:'center'}}
        key={item.page}
      >
        <span className="nav-text">{item.alias}</span>
        </Item>;
    }.bind(this))
    const {modules,structure,banner,person,fund,hotFundList}=this.props;
    const height='100%';
    const style={
      height:height
    }
    return (
      <Layout style={style}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{}}
        >
          <Menu onClick={this.menuItemClick} theme="dark" mode="inline" defaultSelectedKeys={['index']}>
            {pageList}
          </Menu>
        </Sider>
        <Layout style={{backgroundColor:'#fff',height:'100%'}}>
          <Content style={{ margin: '0', padding: '0px 0px', background: '#fff', minHeight: '280px',position:'relative','height':'100%'}}>
            <EditArea
              ref="editArea"
              modules={modules}
              structure={structure}
              banner={banner}
              personInfo={person}
              fundList={fund}
              hotFundList={hotFundList}
            />
          </Content>
        </Layout>
        <VersionList closable={!!this.props.routeParams.id} openVersionIn={this.openVersionIn} versionId={this.props.routeParams.id}></VersionList>
        <div><VersionNameInputModal></VersionNameInputModal></div>
      </Layout>
    )
  }
}
function mapStateToProps(state,ownprops) {
  const versionInfo=state.get('versionInfo');
  const pageList=versionInfo.get('pageList');
  const modules=versionInfo.get('modules');
  const structure=versionInfo.get('structure');
  const banner=versionInfo.get('banner');
  const person=versionInfo.get('person');
  const fund=versionInfo.get('fund');
  const hotFundList=versionInfo.get('hotFundList');
  const caches=state.get('caches');
  const routing=state.get('routing');
  const versionList = state.get('versionList').get('versionList');
  console.log(versionList);
  return {
    routing,
    caches,
    pageList,
    modules,
    structure,
    banner,
    person,
    fund,
    hotFundList,
    versionList
  }
}
export default connect(mapStateToProps)(merchantIdInject(VersionInfo));