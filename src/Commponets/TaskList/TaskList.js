import React, { Component } from "react";
import axios from "axios";

import { AiOutlinePlus} from "react-icons/ai";
import "./TaskList.css";
import AddTaskView from "./AddTaskView/AddTaskView";
import EditTask from "./EditTask/EditTaskView";
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isActive: false,
      isAdd:false,
      isEdit:false,
      vtaskID:1,
      
    };
  }

  formatDate(date){
    if(date.length>10){

     date=date.substr(0, 10);;
   }
    return date;
  }
  handelAdd = () => {
    if(this.state.isAdd === false){
      this.setState({ isActive: true,isAdd:true,isEdit:false});
    }else{
      this.setState({ isActive: false,isAdd:false,isEdit:false});
    }
    
  };
  handleEnd= async (task) =>{
    try{
      const respons = await axios.patch("https://localhost:7000/Task/CompleteTask?id="+task.id

      );
      console.log(respons);
      window.location.reload(false);
    }catch(error){
      console.log(error);
    }
  }    
  handleEdit(task){

    
    
    this.setState({ vtaskID:task});
    if(this.state.isEdit === false){
      this.setState({ isActive: true,isAdd:false,isEdit:true});
      
    }else{
      this.setState({ isActive: false,isAdd:false,isEdit:false});
    }
  }

  componentDidMount() {
    axios.get("https://localhost:7000/Task/GetAllTask").then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ tasks: data });
    });
    console.log(this.state.tasks);
  }



  render() {
    return (
      <div className="TaskList">
        <div style={{ clear: "both" }}></div>
        <div className="Header">
          <div className="Col1">
            <h3 style={{marginLeft:'1%'}}>Tasks</h3>
          </div>
        </div>
        <div className="content">
          <div
            className="list"
            style={{
              float: this.state.isActive ? "left" : "none",
              width: this.state.isActive ? "50%" : "100%",
            }}
          >
            <div className="AddTask" onClick={this.handelAdd}>
              <p>
                <AiOutlinePlus style={{ marginLeft: "20px" }} /> Add new task
              </p>
            </div>
            <div className="ListCanvas">
              {this.state.tasks.map((task) => (
                <div className="ListElement" key={task.id}>
                  
                  <div style={{float:"left",paddingTop:"15px"}}>
                    <Switch onChange={()=>this.handleEnd(task)} defaultChecked={task.isCompleted} /> 
                  </div>
                  <h3 style={{float:"left", marginLeft:"10px"}}>{task.name}</h3>
                  
                  <IconButton aria-label="delete"  onClick={()=>this.handleEdit(task.id)}   style={{float:"right", marginTop:"20px",marginBottom:0}}> <ArrowForwardIosIcon /></IconButton>
                  <h5 style={{float:"right", marginTop:"40px",marginRight:20,marginBottom:0}}>{this.formatDate(task.deadLine)}</h5>
                  <div style={{clear:"both"}}></div>
                </div>
              ))}
            </div>
          </div>
          <AddTaskView isActive={this.state.isAdd}/>
          <EditTask id={this.state.vtaskID} isActive={this.state.isEdit}/>
        </div>
      </div>
    );
  }
}

export default TaskList;
