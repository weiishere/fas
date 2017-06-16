import React,{PropTypes,Component} from 'react';
import ReactDom from 'react-dom';
import {Layout,Modal,message,Tooltip,Icon} from 'antd';
const {Sider,Content}=Layout;
import {merchantIdInject} from '../../hoc/merchantIdInject';
import Dragula from 'dragula';
import {banner,addBanner,removeBanner,addFund,removeFund,fund,updateBanner,updateFund,updateStructure} from '../action';
import pageTitle from '../../utils/pageTitle';
import '../../style/dragula.less';
import Banner from '../components/BannerPop';
import Fund from '../components/FundPop';
import fetch from '../../utils/fetch';
import Toolbar from './toolbar/Toolbar';
import Widgets from './widgets/Widgets';
class EditArea extends Component{
  static propTypes={
    modules:PropTypes.array,
    structure:PropTypes.object,
    banner:PropTypes.array,
    fundList:PropTypes.array,
    hotFundList:PropTypes.array
  }
  static defaultProps={
    //模块名称
    moduleClasses:['banner','person','fund']
  }
  static contextTypes={
    dispatch:PropTypes.func,
    router:PropTypes.object
  }
  constructor(options){
    super(options);
    this.handleModuleClick=this.handleModuleClick.bind(this);
    this.editHandler=this.editHandler.bind(this);
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.triggerSubmit=this.triggerSubmit.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.cacheBanner=[];
    this.cacheFund=[];
    this.elCollection=[];
    this.countReactDOMElementsCollection=[];
    this.state={
      showModal:false,
      modalContent:null,
      modalTitle:'',
      bannerId:'',
      fundId:'',
      structure:this.props.structure,
      onOk:false,
      dataWarning:false,
      dataWarningStr:'',
      currentClickModule:{
        module:'',
        moduleEl:'',
      }
    }
  }
  handleSubmit(module,data){
    this.setState({
      showModal:false,
      onOk:false
    })
    switch (module){
      case 'banner':
        this.context.dispatch(banner(data));
        break;
      case 'fund':
        this.context.dispatch(fund(data));
        break;
      default:
        ;
    }
  }
  activeModule(currentEl){
    const container=document.getElementsByClassName('pageContainer')[0];
    const preActiveEl=container.getElementsByClassName('active')[0];
    //个人信息不支持编辑
    if(preActiveEl){
      preActiveEl.className=preActiveEl.className.replace(' active','');
    }
    currentEl.className+=' active';
  }
  handleModuleClick=(event)=>{
    const currentClickModule={};
    let target=event.target;
    let className=target.className;
    if(className.indexOf('inner-mask-tip')!==-1){
      target=target.parentNode;
      className=target.className;
    }
    this.activeModule(target);
    const tempClassName=((className||'').replace('module','')).trim();
    if(tempClassName.indexOf('banner')!==-1){
      currentClickModule.module='banner';
    }else if(tempClassName.indexOf('person')!==-1){
      currentClickModule.module='person';
    }else if(tempClassName.indexOf('fund')!==-1){
      currentClickModule.module='fund';
    }
    currentClickModule.moduleEl=target;
    this.setState({
      currentClickModule
    })
  }
  editHandler(object){
    const banner=this.props.banner;
    let target=object.target;
    let className=target.className;
    const tempClassName=((className||'').replace('module','')).trim();
    if(tempClassName.indexOf('banner')!==-1){
      this.setState({
        showModal:true,
        modalContent:'banner',
        bannerId:target.id,
        modalTitle:"Banner配置"
      })
    }else if(tempClassName.indexOf('fund')!==-1){
      this.setState({
        showModal:true,
        modalContent:'fund',
        fundId:target.id,
        modalTitle:'基金配置'
      })
    }else if(tempClassName.indexOf('person')!==-1){
      message.warning('个人信息模块暂时不支持编辑');
    }
  }
  documentClickHandler=(event)=>{
    const target=event.target,
      tClassName=target.className;
    if(tClassName.indexOf('pageContainer')===-1&&tClassName.indexOf('banner')===-1&&tClassName.indexOf('fund')===-1&&tClassName.indexOf('person')===-1){
      const container=document.getElementsByClassName('pageContainer')[0];
      const modules=container.getElementsByClassName('module');
      for(let i=0;i<modules.length;i++){
        modules[i].className=modules[i].className.replace(' active','');
      }
    }
  }
  watchDocumentClick(){
    document.addEventListener('click',this.documentClickHandler,false);
  }
  unbindDocumentClick(){
    document.removeEventListener('click',this.documentClickHandler);
  }
  componentWillUnMount(){
    this.unbindDocumentClick();
    window.clearInterval(this.loop);
  }
  /**
   * 收集由react创建的dom元素
   * @param instance
   */
  countReactDOMElements=(instance)=>{
    if(this.countReactDOMElementsCollection.indexOf(instance)===-1){
      this.countReactDOMElementsCollection.push(instance);
    }
  }
  loopCheckInnerEl=()=>{
    this.loop=setInterval(()=>{
      const modules=this.right.getElementsByClassName('module');
      const hiddenModules=this.right.getElementsByClassName('gu-hide');
      const length_1=modules.length;
      const length_2=hiddenModules.length;
      if(length_1===length_2){
        this.right.style.backgroundColor='transparent';
        this.title.style.backgroundColor='transparent';
      }else{
        this.right.style.backgroundColor='';
        this.title.style.backgroundColor='';
      }
    },100)
  }
  componentDidMount(){
      // this.watchDocumentClick();
      this.left=ReactDom.findDOMNode(this.refs.modulesContainer);
      this.right=ReactDom.findDOMNode(this.refs.pageContainer);
      this.title=ReactDom.findDOMNode(this.refs.pageTitle);
      this.mirror=ReactDom.findDOMNode(this.refs.mirrorContainer);
      this.loopCheckInnerEl();
      this.drake_1=Dragula([this.left,this.right],{
        copy: (el, source)=>{
          return source === this.left
        },
        accepts:(el, target)=>{
          return target !== this.left
        },
        moves:(el, source, handle, sibling)=>{
          return source===this.left;
        },
        // removeOnSpill:false,
        mirrorContainer:this.mirror
      })
    //拖拽复制
     this.drake_1.on('cloned',(clone,original,type)=>{
       //新建元素id，按时间生成（临时id）
       if(!clone.id){
         clone.id='new'+Date.now();
       }
     })
    //拖拽后放
     this.drake_1.on('drop',(el,target,source,sibling)=>{
       if(!(this.updateStructure(this.right,el))) return;
       //收集非react创建的dom元素
       if(this.countReactDOMElementsCollection.indexOf(el)===-1){
          this.elCollection.push(el);
       }
       let className=source.className,
         elClassName=el.className;
       if(className.indexOf('pageContainer')!==-1){
         //TODO
       }else if(className.indexOf('inner-modules-wrap')!==-1){
         if(elClassName.indexOf('banner')!==-1){
           this.context.dispatch(addBanner(el.id));
         }else if(elClassName.indexOf('person')!==-1){
           //TODO
         }else if(elClassName.indexOf('fund')!==-1){
           this.context.dispatch(addFund(el.id));
         }
       }
     })

    //拖拽删除
    this.drake_1.on('remove',(el,container,source)=>{
    })
  }
  handleRemove=(el)=>{
    el.parentNode.removeChild(el);
    this.updateStructure(this.right);
//因为初始化的元素是react渲染的，此处是手动操作dom删除。然而在react重新渲染时，react并不知道该节点已经删除，会去删除，此时el和container已经没有关系，最后报错
    if(this.countReactDOMElementsCollection.indexOf(el)!==-1){
      el.className+=' gu-hide';
      this.right.appendChild(el);
    }
    let index=this.elCollection.indexOf(el);
    if(index!==-1){
      this.elCollection.splice(index,1);
    }
    let elClassName=el.className;
    if(elClassName.indexOf('banner')!==-1){
      this.context.dispatch(removeBanner(el.id));
    }else if(elClassName.indexOf('person')!==-1){
      //TODO
    }else if(elClassName.indexOf('fund')!==-1){
      this.context.dispatch(removeFund(el.id));
    }
    this.setState({
      currentClickModule:{
        module:'',
        moduleEl:'',
      }
    })
  }
  updateStructure=(right,target)=>{
    let elementArr=right.getElementsByClassName('module'),
      idCollection=[],flag_banner=0,flag_person=0,flag_fund=0;
    let str='';
    function getModuleNameFromClassName(className){
      if(className.indexOf('gu-hide')!==-1){
        return 'gu-hide'
      }else if(className.indexOf('banner')!==-1){
        flag_banner++;
        str='已存在轮播图！';
        return 'banner'
      }else if(className.indexOf('person')!==-1){
        flag_person++;
        str='已存在个人信息！';
        return 'person'
      }else if(className.indexOf('fund')!==-1){
        flag_fund++;
        str='已存在基金列表！';
        return 'fund'
      }
    }
    for(let i=0;i<elementArr.length;i++){
      let moduleName=getModuleNameFromClassName(elementArr[i].className);
      //person模块只能在结构中存在一个
      if(flag_fund>1||flag_banner>1||flag_person>1){
        target.parentNode.removeChild(target);
        message.warning(`${str}`);
        return false;
      }else{
        if(moduleName!=='gu-hide'){
          idCollection.push({
            id:elementArr[i].id,
            module:moduleName
          });
        }
      }
    }
    //不适合分发action,会和插件冲突
    // this.context.dispatch(updateStructure(idCollection))
    this.setState({
      structure:Object.assign({},this.state.structure,{
        moduleContent:idCollection
      })
    })
    return true;
  }
  triggerSubmit(){
    const type=this.state.modalContent;
    if(type==='banner'){
      this.setState({
        onOk:true
      })
    }else if(type==='fund'){
      this.setState({
        onOk:true
      })
    }
  }
  handleOk(){
    this.triggerSubmit();
  }
  handleCancel(){
    this.setState({
      showModal:false
    })
  }
  filterTheBannerById(id){
    let arr=this.props.banner.filter((item, index, arrSelf)=>{
      return id===item.bannerId
    })
    if(arr.length===0){
      arr.push({
        bannerId:id,
        bannerContent:[]
      })
    }
    return arr;
  }
  filterTheFundById(id){
    let arr=this.props.fundList.filter(function(item,index,arrSelf){
      return id===item.fundId
    })
    if(arr.length===0){
      arr.push({
        fundId:id,
        fundContent:[]
      })
    }
    return arr;
  }
  setOnOkFalse=()=>{
    this.setState({
      onOk:false
    })
  }
  afterSendDataSuccess=()=>{
    const allModules=this.right.getElementsByClassName('module');
    let moduleContent=[];
    for(let i=0;i<allModules.length;i++){
      let module=allModules[i],
        id=module.id,
        className=module.className,
        moduleName;
      if(className.indexOf('gu-hide')!==-1){
        continue;
      }
      if(className.indexOf('banner')!==-1){
        moduleName='banner'
      }else if(className.indexOf('fund')!==-1){
        moduleName='fund';
      }else if(className.indexOf('person')!==-1){
        moduleName='person'
      }
      moduleContent.push({
        id:id,
        module:moduleName
      })
    }
    return moduleContent;
  }
  sendStructureData=(moduleContent,recordElArr)=>{
    const {structure,merchantId}=this.props;
    moduleContent=JSON.stringify(moduleContent);
    let options={
      type:'post',
      data:{
        templetId:this.context.router.params.id,
        merchantId,
        page:'index',
        moduleContent:moduleContent
      }
    }
    if(structure.moduleId){
      options.data.moduleId=structure.moduleId;
      options.url='/fas-sys/api/index/frame/set';
    }else{
      options.url='/fas-sys/api/index/frame/add'
    }
    fetch(this.context.dispatch,options).then((data)=>{
      message.success('保存配置成功！');
      this.context.dispatch(updateStructure({
        moduleId:structure.moduleId||(data.data&&data.data.moduleId)
      }))
    }).catch((err)=>{
      message.error(err);
    });
  }
  verifyFundListAndBannerEmpty=({fundList,banner})=>{
    let tipArr={
      fundContent:1,
      bannerContent:1
    };
    const findEmpty=({contentStr,list})=>{
      let i=0;
      for(;i<list.length;i++){
        const content=list[i][contentStr];
        if(!content||content.length===0){
          tipArr[contentStr]=0;
          break;
        }
      }
    }
    findEmpty({
      contentStr:'fundContent',
      list:fundList
    })
    findEmpty({
      contentStr:'bannerContent',
      list:banner
    })
    return tipArr;
  }
  dataWarningCancel=()=>{
    this.setState({
      dataWarning:false,
      dataWarningStr:''
    })
  }
  dataWarningOk=()=>{
    let {fundList,banner}=this.props;
    this.setState({
      dataWarning:false,
      dataWarningStr:''
    })
    this.doSubmitAll({
      fundList,
      banner
    })
  }
  doSubmitAll=({
    fundList,
    banner
  })=>{
    let config_fund={
        list:fundList,
        listName:'fundContent',
        keyOfId:'fundId',
        urlAdd:'/fas-sys/api/index/fund/add',
        urlUpdate:'/fas-sys/api/index/fund/update',
        iterator:[],
        idMap:{},
        keyOfContent:'fundContent'
      },
      config_banner={
        list:banner,
        listName:'bannerContent',
        keyOfId:'bannerId',
        urlAdd:'/fas-sys/api/index/banner/add',
        urlUpdate:'/fas-sys/api/index/banner/update',
        iterator:[],
        idMap:{},
        keyOfContent:'bannerContent'
      }
    this.cacheBanner=[];
    this.cacheFund=[];
    Promise.all(this.sendData(config_fund).concat(this.sendData(config_banner))).then((allArr)=>{
      //完成请求后去更新store里fund和banner的数据
      this.context.dispatch(updateBanner(this.cacheBanner));
      this.context.dispatch(updateFund(this.cacheFund));
      //用真实的id替换创建时的临时id
      let modulesElArr=this.right.getElementsByClassName('module');
      let tempIdMap=Object.assign({},config_fund.idMap,config_banner.idMap),
        el;
      for(let i=0;i<modulesElArr.length;i++){
        el=modulesElArr[i];
        el.id=tempIdMap[el.id]||el.id;
      }
      //更新完dom后，去保存结构配置
      this.sendStructureData(this.afterSendDataSuccess()/*,recordNewEl*/)
    }).catch((err)=>{
      console.log(err);
    });
  }
  submitAll=()=>{
    let {fundList,banner}=this.props;
    const tipArr=this.verifyFundListAndBannerEmpty({
      fundList,
      banner
    })
    let tipStr=[],
      tipFC=tipArr['fundContent'],
      tipBC=tipArr['bannerContent'];
    if(tipFC===0&&tipBC===0){
      tipStr.push('基金列表和轮播图未添加数据');
    }else if(tipFC===0){
      tipStr.push('基金列表未添加数据')
    }else if(tipBC===0){
      tipStr.push('轮播图未添加数据')
    }
    if(tipStr.length===0){
     this.doSubmitAll({
       fundList,
       banner
     })
    }else{
      this.setState({
        dataWarning:true,
        dataWarningStr:tipStr.join('')
      })
    }
  }
  sendData=({list,listName,keyOfId,urlAdd,urlUpdate,keyOfContent,iterator,idMap})=>{
    const {merchantId}=this.props;
    for(let i=0;i<list.length;i++){
      let module=list[i],
        moduleId=module[keyOfId],
        options={
          type:'post',
          url:'',
          data:{},
          success:((module,moduleId)=>{
            return (data)=>{
              //添加和更新返回结果不一样
              let entity=data.data,
                realId=moduleId;
              if(entity&&entity instanceof Object){
                realId=entity[keyOfId]
              }
              idMap[moduleId]=realId;
              //成功后收集成功后的信息，用来更新store里的banner数据和fund数据
              let tempArr;
              if(listName==='fundContent'){
                tempArr=this.cacheFund;
              }else if(listName==='bannerContent'){
                tempArr=this.cacheBanner;
              }
              let id,content;
              if(entity&&entity instanceof Object){
                id=entity[keyOfId];
                content=JSON.parse(entity[keyOfContent])
              }else{
                id=moduleId;
                content=module[listName];
              }
              tempArr.push({
                [keyOfId]:id,
                [listName]:content
              })
            }
          })(module,moduleId),
          error:(msg)=>{
          }
        }
      if(moduleId.indexOf('new')===0){
        options.data.merchantId=merchantId;
        options.url=urlAdd;
      }else{
        options.data[keyOfId]=moduleId;
        options.url=urlUpdate;
      }
      options.data[keyOfContent]=JSON.stringify(module[listName]);
      iterator.push(fetch(this.context.dispatch,options))
    }
    return iterator;
  }
  /**
   * 每次重新刷新编辑区域，首先去删除非react添加的dom元素
   */
  emptyMovedEl=()=>{
    for(let i=0;i<this.elCollection.length;i++){
      let child=this.elCollection[i];
      child.parentNode?child.parentNode.removeChild(child):'';
    }
    this.elCollection=[];
  }
  render(){
    const realHeight='100%';
    let siderStyle={
      backgroundColor:'#fff',
      height:realHeight,
      backgroundColor:'rgba(255,255,255,.5)',
      overflowY:'scroll'
    }
    let layoutStyle={
      backgroundColor:"#fff",
      overflowX:'hidden',
      height:'100%'
    }
    let contentStyle={
      height:realHeight,
      overflow:'hidden',
      position:'relative'
    }
    const {structure,hotFundList}=this.props;
    const fund=this.filterTheFundById(this.state.fundId);
    let moduleContent={
      'banner':<Banner
        setOnOkFalse={this.setOnOkFalse}
        banner={this.filterTheBannerById(this.state.bannerId)}
        handleSubmit={this.handleSubmit}
        onOk={this.state.onOk}
        hotFundList={hotFundList}
      ></Banner>,
      'fund':<Fund
        fund={fund}
        hotFundList={hotFundList}
        handleOk={this.handleSubmit}
        onOk={this.state.onOk}
      ></Fund>
    }

    //结构配置
    let nowHasModules='',moduleName={
      'banner':'轮播图',
      'person':'个人信息',
      'fund':'基金列表'
    }
    if(structure&&structure.moduleContent&&structure.moduleContent instanceof Array){
      nowHasModules=structure.moduleContent.map((item, index, arrSelf)=>{
        return <ModuleHtml
          countReactDOMElements={this.countReactDOMElements}
          key={item.module+item.id}
          className={'module '+item.module}
          id={item.id}
          maskClassName={item.module}
          moduleName={moduleName[item.module]}
        />
      })
    }
    const tooltipContent=<ul className="tooltip-list">
      <li>1，拽左边栏模块进入手机屏幕区域</li>
      <li>2，编辑完成，点击右侧'保存'配置</li>
    </ul>
    return (
      <Layout ref='mirrorContainer' style={layoutStyle}>
        <Sider width={'auto'} style={siderStyle}>
          <div className="inner-modules-wrap" ref='modulesContainer'>
            {
              this.props.modules.map(function (item, index, arrSelf) {
                return <ModuleHtml
                  className={"module "+item.className}
                  key={item.module}
                  maskClassName={item.module}
                  moduleName={moduleName[item.module]}
                />
              })
            }
          </div>
        </Sider>
        <Content style={contentStyle} className="edit-area-content">
          <div className="edit-area-fix">
            <Toolbar handleSave={this.submitAll} />
            {this.state.currentClickModule.module?<Widgets
              module={this.state.currentClickModule}
              editHandler={this.editHandler}
              deleteHandler={this.handleRemove}
            />:null}
            <div className="scroll-wrap">
              <div className="pageContainer-wrap">
                <Tooltip trigger="hover"  title={tooltipContent} placement='left'>
                  <div className="question">
                    <div className="icon">
                      <Icon type="question-circle" />
                    </div>
                  </div>
                </Tooltip >
                <div className="inner-page-wrap">
                  <h3 ref="pageTitle" className="page-title">{pageTitle[structure.page]}</h3>
                  <div onClick={this.handleModuleClick} className="pageContainer" ref='pageContainer'>
                    {nowHasModules}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        {this.state.showModal?<Modal
          closable={true}
          width={700}
          visible={this.state.showModal}
          title={this.state.modalTitle}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.modalContent?moduleContent[this.state.modalContent]:''}
        </Modal>:null}
        {
          this.state.dataWarning?<Modal
            closable={false}
            visible={this.state.dataWarning}
            width={350}
            title={'警告'}
            onOk={this.dataWarningOk}
            onCancel={this.dataWarningCancel}
            cancelText="去添加"
            okText='保存'
          >
            <div className="warning-str">
              您还有{this.state.dataWarningStr}，确定保存?
            </div>
          </Modal>:null
        }
      </Layout>
    )
  }
}
const ModuleHtml=function ({countReactDOMElements,className,id,maskClassName,moduleName}) {
  return (
    <div ref={countReactDOMElements||function () {

    }} className={className} id={id}>
      <div className={"inner-mask-tip "+maskClassName}>
        <span></span>
      </div>
      <div className="module-info">
        <span>{moduleName}</span>
      </div>
    </div>
  )
}
export default merchantIdInject(EditArea);