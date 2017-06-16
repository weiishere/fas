import React,{Component,PropTypes} from 'react';
import {Form,Input,Card,Row,Col,Button,Icon,Select,Upload,message} from 'antd'
const Option=Select.Option;
const FormItem=Form.Item;
import {merchantIdInject} from '../../hoc/merchantIdInject';
import './BannerPop.less';
const WrapUpload=(WrappedComponent)=>{

  return class extends Component{
    state = {
      fileList: this.props.imgItem.imgUrl? [{
        uid: -1,
        name: this.props.imgItem.imgUrl,
        status: 'done',
        url: this.props.imgItem.imgUrl,
        thumbUrl: this.props.imgItem.imgUrl
      }]:[]
    }
    render(){
      const uploadProps={
        name:'file',
        action:'/fas-sys/api/index/banner/uploadImg',
        accept:'.jpg,.png',
        data:{
          merchantId:this.props.merchantId
        },
        listType: 'picture',
        fileList: this.state.fileList,
        onChange:({file,fileList,event})=>{
          //let _fileList=fileList;
          if (file.status !== 'uploading') {
            
          }
          if (file.status === 'done') {
            const {response}=file;
            if(response.code==='00000'){
              this.props.onChange('imgUrl',this.props.row,this.props.index,response.data.downLoadUrl);
              message.success(`${file.name} 文件上传成功！`);
              fileList=fileList.slice(-1);
            }else{
              message.error(`${file.name} ${response.msg}！`);
            }
          } else if (file.status === 'error') {
            message.error(`${file.name} 文件上传失败！`);
          }
          this.setState({ fileList });
        }
      }
      return <WrappedComponent {...this.props} {...uploadProps} ></WrappedComponent>
    }
  }
}
let NewUpload=WrapUpload(Upload);
/**
 * anti-react 模式
 * 适应拖拽操作dom与react更新时机问题
 */
class Banner extends Component{
  static propTypes={
    banner:PropTypes.array
  }
  constructor(options){
    super(options);
    this.handleValues=this.handleValues.bind(this);
    this.insertDefaultBanner=this.insertDefaultBanner.bind(this);
    this.addCardClickHandler=this.addCardClickHandler.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    const {hotFundList}=this.props;
    let {bannerId,bannerContent}=this.props.banner[0];
    this.state={
      bannerId,
      bannerContent,
      hotFundList
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.onOk&&!this.props.onOk){
      this.props.form.validateFields(function (err, values) {
        if(!err){
          this.props.handleSubmit('banner',{
            bannerId:this.state.bannerId,
            bannerContent:this.handleValues(values)
          });
        }else{
          this.props.setOnOkFalse();
        }
      }.bind(this))
    }
  }
  onChange=(key,row,index,e)=>{
    let value;
    if(e&&e.target){
      value = e.target.value;
    }else{
      value=e;
    }
    const realIndex=row*2+index;
    let newBanner=[];
    for(let i=0;i<this.state.bannerContent.length;i++){
        newBanner[i]=Object.assign({},this.state.bannerContent[i]);
    }
    newBanner[realIndex][key]=value;
    this.setState({
      bannerContent:newBanner
    })
  }
  handleDelete(row,index){
    const realIndexInBannerList=row*2+index;
    const bannerList=this.state.bannerContent;
    let afterDeleteBanner=bannerList.filter(function (item, index, arraySelf) {
      return index!==realIndexInBannerList;
    })
    this.setState({
      bannerContent:afterDeleteBanner
    })
  }
  handleValues(values){
    let imageUrl=[],fundId=[],finalResult;
    const reduceArr=function (imgUrlArr, fundIdArr) {
      let newObjectArr=[];
      for(let i=0;i<imgUrlArr.length;i++){
        for(let j=0;j<fundIdArr.length;j++){
          if(imgUrlArr[i].index.replace('imgurl','')===fundIdArr[j].index.replace('fundid','')){
            newObjectArr.push({
              imgUrl:imgUrlArr[i].value,
              fundId:fundIdArr[i].value
            })
          }
        }
      }
      return newObjectArr;
    }
    for(let i in values){
      if(values.hasOwnProperty(i)){
        let value=values[i];
        if(i.indexOf('imgurl')!==-1){
          imageUrl.push({
            index:i,
            value:value
          });
        }else if(i.indexOf('fundid')!==-1){
          fundId.push({
            index:i,
            value:value
          });
        }
      }
    }
    finalResult=reduceArr(imageUrl,fundId);
    return finalResult;
  }
  addCardClickHandler(){
    let tempBanner=[];
    let banner=this.state.bannerContent;
    for(let i=0;i<banner.length;i++){
      tempBanner[i]=banner[i];
    }
    this.setState({
      bannerContent:tempBanner.concat([{
        jumpUrl:'',
        imgUrl:''
      }])
    })
  }
  insertDefaultBanner(bannerList){
    let tempArr=[],flag=false;
    const style={
      fontSize:48,
      color:'#e9e9e9',
      marginTop:'12px'
    }
    const addCard={
      flag:'add',
      content:<Icon type="plus" style={style}></Icon>
    }
    for(let i=0;i<bannerList.length;i++){
      tempArr[i]=bannerList[i];
      if(bannerList[i].flag==='add'){
        flag=true;
      }
    }
    if(!flag){
      tempArr.push(addCard);
    }
    return tempArr;
  }
  getFinalList=()=>{
    const {getFieldDecorator}=this.props.form;
    let banner=this.state.bannerContent;
    banner=this.insertDefaultBanner(banner);
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const cardStyle={
      // width:330,
    }
    let newList=[],tempList=[];
    for(let i=0;i<banner.length;i++){
      if(i%2!==0){
        tempList.push(banner[i]);
        if(i===banner.length-1){
          newList.push(tempList);
        }
      }else{
        if(i===banner.length-1){
          newList.push(tempList);
          tempList=[];
          tempList.push(banner[i]);
          newList.push(tempList);
        }else if(i===0){
          tempList.push(banner[i]);
        }else {
          newList.push(tempList);
          tempList=[];
          tempList.push(banner[i]);
        }
      }
    }
    const rowStyle={
      marginBottom:16
    }
    const bannerWidgetsStyle={
      textAlign:'right'
    }
    return newList.map((item, order, arrSelfOuter)=>{
      return <Row key={order} style={rowStyle}>
        {item.map((item, index, arrSelfInner)=>{
          let offset;
          if(index===1){
            offset=2
          }
          return <Col key={index} span={11} offset={offset}>
            {item.flag!=='add'?<Card key={index} style={cardStyle}>
              <FormItem
                {...formItemLayout}
                label="图片链接"
                hasFeedback
              >
                <NewUpload onChange={this.onChange.bind(this)} imgItem={item} merchantId={this.props.merchantId} row={order} index={index}>
                {getFieldDecorator(['imgurl',order,index].join(''),{
                    rules:[{
                      required:true,message:'请上传图片'
                    }],
                    initialValue:item.imgUrl,
                  })(<Input readOnly={true} type="text" /*onChange={this.onChange.bind(this,'imgUrl',order,index)}*/ />)}
                </NewUpload>
              </FormItem>

              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="跳转链接"*/}
              {/*hasFeedback*/}
              {/*>*/}
              {/*{getFieldDecorator(['jumpurl',order,index].join(''),{*/}
              {/*rules:[],*/}
              {/*initialValue:item.jumpUrl*/}
              {/*})(<Input type='text' onChange={this.onChange.bind(this,'jumpUrl',order,index)}/>)}*/}
              {/*</FormItem>*/}
              <FormItem
                {...formItemLayout}
                label="基金"
                hasFeedback
              >
                {getFieldDecorator(['fundid',order,index].join(''),{
                  rules:[],
                  initialValue:item.fundId
                })(<Select placeholder='选择跳转基金'>
                  {this.state.hotFundList.map((item,index,arrSelf)=>{
                    return <Option key={item.fundId+item.fundName} value={item.fundId}>{item.fundName}</Option>
                  })}
                </Select>)}
              </FormItem>
              <div className="banner-widgets" style={bannerWidgetsStyle}>
                <Button onClick={this.handleDelete.bind(this,order,index)} type='danger' size='small'>删除</Button>
              </div>
            </Card>:<Card onClick={this.addCardClickHandler} key={index} bordered={false} style={{textAlign:'center',cursor:'pointer',marginTop:(arrSelfOuter[0].length===0&&arrSelfInner.length===1)?0:40}}>
              {item.content}
            </Card>}
          </Col>
        })}
      </Row>
    })
  }
  render(){
    return <Form
      ref={this.props.getFormInstance}
    >
      {this.getFinalList()}
    </Form>;
  }
}
const WrappedRegistrationForm = Form.create()(merchantIdInject(Banner));
export default WrappedRegistrationForm;
