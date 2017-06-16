import React,{Component,PropTypes} from 'react';
import Dragula from 'dragula';
import {message,Modal,Form,Input} from 'antd';
import './FundPop.less';
/**
 * anti-react 模式
 * 适应拖拽操作dom与react更新时机问题
 * 初始化之后，一切的数据操作均没有保存在state或者store中，全部保存在dom中
 * 提交的时候则从dom中去获取顺序和各个的详情，然后提交保存，并同步到store中去
 */
class FundPop extends Component {
  static propTypes = {
    hotFundList: PropTypes.array,
    fund: PropTypes.array
  }
  constructor(options) {
    super(options);
    let {fundId, fundContent}=this.props.fund[0];
    let {hotFundList}=this.props;
    this.state = {
      hotFundList,
      fundId,
      fundContent,
      showModal:false,
      modalTitle:''
    }
  }
  getSelectFund = () => {
    const elArr = this.refs.right.getElementsByClassName('fund-config');
    let tempArr = [];
    for (let i = 0; i < elArr.length; i++) {
      let el=elArr[i];
      let fundNameEl=el.getElementsByClassName('fund-name')[0];
      let annualYieldRangeEl=el.getElementsByClassName('annualYieldRange')[0];
      let fundName=fundNameEl.innerText||fundNameEl.innerHTML;
      let annualYieldRange=annualYieldRangeEl.innerText||annualYieldRangeEl.innerHTML;
      let sup1=el.getElementsByClassName('sup-1')[0];
      let sup2=el.getElementsByClassName('sup-2')[0];
      // let tags=[sup1.innerText||sup1.innerHTML,sup2.innerText||sup2.innerHTML];
      let fundLabel=el.getElementsByClassName('fund-input-hidden-fundLabel')[0];
      tempArr.push({
        fundId: elArr[i].id,
        fundName: fundName,
        annualYieldRange:annualYieldRange,
        // tags:tags,
        fundType:sup1.innerText||sup1.innerHTML,
        riskLevel:sup2.innerText||sup2.innerHTML,
        fundLabel:fundLabel.value?[fundLabel.value]:[]
      })
    }
    return tempArr
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.onOk && !this.props.onOk) {
      this.props.handleOk('fund', {
        fundId: this.state.fundId,
        fundContent: this.getSelectFund()
      })
    }
  }
  uniqueOneFund(el, target) {
    const elArr = target.getElementsByClassName('fund-config');
    let flag = 0;
    for (let i = 0; i < elArr.length; i++) {
      if (elArr[i].id === el.id) {
        flag++;
      }
    }
    if (flag > 1) {
      message.warning('已有该基金！')
      el.parentNode.removeChild(el);
      return true
    }
    return false;
  }
  componentDidMount() {
    const left = this.refs.left;
    const right = this.refs.right;
    const mirror = this.refs.mirror;
    this.drake = Dragula([right], {
      copy:false,
      removeOnSpill:true,
      mirrorContainer: mirror
    })
    //添加
    this.drake.on('drop', (el, target, source, sibling) => {
      //保证一个基金只被添加一次
      if(this.uniqueOneFund(el, target))return ;
      let elSource = source.getElementsByClassName(el.id)[0];
      let sourceClassName = source.className,
        targetClassName = elSource.className;
      if (sourceClassName.indexOf('left-fund-list') !== -1) {
        targetClassName += (targetClassName.replace(' active', '') + ' active')
        elSource.className = targetClassName;
      } else if (sourceClassName.indexOf('right-fund-list') !== -1) {
        //TODO
      }
    })
    //删除
    this.drake.on('remove', (el, container, source) => {
      let elSource = left.getElementsByClassName(el.id)[0];
      if(elSource){
        let sourceClassName = source.className,
          elSourceClass = elSource.className;
        if (sourceClassName.indexOf('right-fund-list') !== -1) {
          elSource.className = elSourceClass.replace(' active', '');
        } else if (sourceClassName.indexOf('left-fund-list') !== -1) {
          //TODO
        }
      }
    })
  }
  getLeftFundList = () => {
    const {hotFundList, fundContent}=this.state;
    let leftFundList = [], className;
    for (let i = 0; i < hotFundList.length; i++) {
      let tempFund = hotFundList[i];
      className = 'fund-config';
      for (let j = 0; j < fundContent.length; j++) {
        if (tempFund.fundId === fundContent[j].fundId) {
          className += ' active';
          break;
        }
      }
      leftFundList.push(<FundItem container="left" item={tempFund} key={tempFund.fundName+tempFund.fundId} className={className}/>)
    }
    return leftFundList;
  }
  iteratorParentNodeToFindTarget=(target,findingClassName,limitClassName)=>{
    let temp=target;
    while(temp.className.indexOf(limitClassName)===-1){
      if(temp.className.indexOf(findingClassName)!==-1){
        return temp;
      }
      temp=temp.parentNode;
    }
    return null;
  }
  filterRightFundById=(fundId)=>{
    const allRightFunds=this.refs.right.getElementsByClassName('fund-config');
    if(allRightFunds.length!==0){
      for(let i=0;i<allRightFunds.length;i++){
        const el=allRightFunds[i];
        if(el.id === fundId){
          return el;
        }
      }
    }
    return null;
  }
  leftContainerBtnClick=(event)=>{
    const target=this.iteratorParentNodeToFindTarget(event.target,'fund-config','left-fund-list');
    if(target){
       const targetExistInRight=this.filterRightFundById(target.id);
       if(targetExistInRight){
         targetExistInRight.parentNode.removeChild(targetExistInRight);
       }else{
         const cloneChild=target.cloneNode(true);
         cloneChild.style.cssText='position:absolute;left:0px;top:0px;margin:0px';
         target.appendChild(cloneChild);
         setTimeout(()=>{
           cloneChild.className+=' add-transit';
         },100)
         setTimeout(()=>{
           target.removeChild(cloneChild);
           cloneChild.className=cloneChild.className.replace(' add-transit','');
           cloneChild.style.cssText='';
           this.refs.right.appendChild(cloneChild);
         },300);
       }
       let className=target.className;
       if(className.indexOf('active')!==-1){
         className=className.replace(' active','');
       }else{
         className+=' active';
       }
       target.className=className;
    }
  }
  rightContainerBtnClick=(event)=>{
    const target=this.iteratorParentNodeToFindTarget(event.target,'fund-config','right-fund-list');
    if(target){
      const fundNameEl=target.getElementsByClassName('fund-name')[0];
      const fundName=fundNameEl.innerHTML||fundNameEl.innerText;
      const fundLabelEl=target.getElementsByClassName('fund-input-hidden-fundLabel')[0];
      const fundLabel=fundLabelEl.value;
      this.setState({
        showModal:true,
        modalTitle:fundName,
        // fundLabelHiddenEl:fundLabelEl,
        fundEl:target,
        modalContent:<Input placeholder="输入标签" type='text' className='fundLabel' id="fundLabel" defaultValue={fundLabel}/>
      })
    }
  }
  getFundFromStateByFundId=(fundId)=>{
    return this.state.fundContent.filter((item,index,arrSelf)=>{
      return item.fundId===fundId;
    })
  }
  handleOk=()=>{
    const fundEl=this.state.fundEl;
    const fundLabelInput=document.getElementById('fundLabel');
    const hiddenInput=fundEl.getElementsByClassName('fund-input-hidden-fundLabel')[0];
    //不能设置这个的值，因为state更新会重新覆盖掉。针对state渲染出来的组件
    //通过设置state来改变
    const fund=this.getFundFromStateByFundId(fundEl.id);
    if(fund&&fund.length!==0){
      fund[0].fundLabel=fundLabelInput.value?[fundLabelInput.value]:[];
    }else{
      hiddenInput.value=fundLabelInput.value;
    }
    const ribbon=fundEl.getElementsByClassName('ribbon')[0];
    if(!fundLabelInput.value){
      ribbon.className='ribbon ribbon-default'
    }else{
      ribbon.className='ribbon ribbon-hot';
    }
    this.setState({
      showModal:false,
      fundEl:null,
      //上面如果改变了fund的值，则会反映到数据源中，则可以直接设置
      fundContent:this.state.fundContent
    })
  }
  handleCancel=()=>{
    this.setState({
      showModal:false,
      fundEl:null
    })
  }
  getRightFundList = () => {
    const {hotFundList, fundContent}=this.state;
    const rightList=[];
    let className,flag;
    for(let i=0;i<fundContent.length;i++){
      flag=0;
      className = 'fund-config';
      for(let j=0;j<hotFundList.length;j++){
         if(fundContent[i].fundId===hotFundList[j].fundId){
           flag=1;
           break;
         }
      }
      if(flag===0){
        className+=' fund-offline';
      }
      rightList.push(<FundItem offline={flag===0} container="right" item={fundContent[i]} className={className} key={fundContent[i].fundName+fundContent[i].fundId}/>)
    }
    return rightList
  }
  render = () => {
    return (
      <div className="fund-pop" ref="mirror">
        <ul onClick={this.leftContainerBtnClick} ref="left" className="left-fund-list">
          {this.getLeftFundList()}
        </ul>
        <ul ref="right" onClick={this.rightContainerBtnClick} className="right-fund-list">
          {this.getRightFundList()}
        </ul>
        {this.state.showModal?<Modal
          closable={true}
          width={300}
          visible={this.state.showModal}
          title={"("+this.state.modalTitle+")的标签"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.modalContent}
        </Modal>:null}
      </div>
    )
  }
}
const FundItem=({item,className,container,offline})=>{
  let classNameSpan=offline?'offline-item':'';
  return <li id={item.fundId} className={className+" "+item.fundId}>
    <div className="mask-fund">
      <span className={classNameSpan}>{offline?"基金已下线":"点击编辑标签"}</span>
    </div>
    <div className="fund-item-entity-left">
      <div className="annualYieldRange" style={{height:'20px',width:'70px'}}>
        <strong className="fund-range">{item.annualYieldRange||'--'}</strong>
      </div>
      <div>
        <span>近一年收益率</span>
      </div>
    </div>
    <div className="fund-item-entity-right">
      <div className="overflow-text" style={{height:'20px',width:'101px'}}>
        <strong className="fund-name">{item.fundName||'--'}</strong>
      </div>
      <div className="overflow-text" style={{width:'101px'}}>
        <span className="sup-1">{item.fundType||'--'}</span>
        <span className="sup-2">{item.riskLevel||'--'}</span>
      </div>
    </div>
    <span className={'ribbon '+((!item.fundLabel||item.fundLabel.length===0)?'ribbon-default':'ribbon-hot')}></span>
    <input type="hidden" className="fund-input-hidden-fundLabel" value={typeof item.fundLabel==='string'?item.fundLabel:(item.fundLabel||[]).join('')}/>
  </li>
}
export default Form.create()(FundPop);