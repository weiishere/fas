import React,{PropTypes,Component} from 'react';
import {Icon} from 'antd';
import './widgets.less';
class Widgets extends Component{
  static propTypes={
    module:PropTypes.object.isRequired,
    editHandler:PropTypes.func.isRequired,
    deleteHandler:PropTypes.func.isRequired
  }
  constructor(options){
    super(options);
    const {module,editHandler,deleteHandler}=this.props;
    const {moduleEl}=module;
    this.state={
      module:module.module,
      moduleEl,
      preEl:moduleEl.previousSibling,
      nextEl:moduleEl.nextSibling,
      editHandler,
      deleteHandler
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    const {module}=nextProps;
    const {moduleEl}=module;
    if(moduleEl!==this.props.moduleEl){
      this.setState({
        moduleEl:moduleEl,
        preEl:moduleEl.previousSibling,
        nextEl:moduleEl.nextSibling
      })
    }
  }
  moveHandler=(direction)=>{
    const {moduleEl,preEl,nextEl}=this.state;
    const parentNode=moduleEl.parentNode;
    let movedEl,positionEl;
    switch (direction){
      case 'up':
        movedEl=moduleEl;
        positionEl=preEl;
        break;
      case 'down':
        movedEl=nextEl;
        positionEl=moduleEl;
        break;
      default:
        ;
    }
    parentNode.insertBefore(movedEl,positionEl);
    this.setState({
      preEl:moduleEl.previousSibling,
      nextEl:moduleEl.nextSibling
    })
  }
  upWards=()=>{
   this.moveHandler('up');
  }
  downWards=()=>{
    this.moveHandler('down');
  }
  editHandler=()=>{
    const {moduleEl,editHandler}=this.state;
    editHandler({
      target:moduleEl
    });
  }
  deleteHandler=()=>{
    const {moduleEl,deleteHandler}=this.state;
    deleteHandler(moduleEl);
  }
  render(){
    const {preEl,nextEl}=this.state;
    return (
      <ul className="edit-widgets">
        <li onClick={this.deleteHandler}>
          <a title="删除">
            <Icon type="delete"></Icon>
          </a>
        </li>
        {
          preEl?<li onClick={this.upWards}>
            <a title="上移">
              <Icon type="caret-up"></Icon>
            </a>
          </li>:null
        }
        {
          nextEl?<li onClick={this.downWards}>
            <a title="下移">
              <Icon type="caret-down"></Icon>
            </a>
          </li>:null
        }
        <li onClick={this.editHandler}>
          <a title="编辑">
            <Icon type="edit"></Icon>
          </a>
        </li>
      </ul>
    )
  }
}
export default Widgets;