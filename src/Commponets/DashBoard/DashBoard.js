import React, { Component } from 'react'
import './DashBoard.css';
import axios from "axios";
import Switch from '@mui/material/Switch';
import Clock from './Clock';
import Grid from '@mui/material/Grid';
import NoteComponnet from '../NoteList/NoteComponnet/NoteComponnet';

export class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks:[],
      Notes:[],
    }
  }
  formatDate(date){
    if(date.length>10){

     date=date.substr(0, 10);;
   }
    return date;
  }
  componentDidMount() {
    axios.get("https://localhost:7000/Task/GetAllTodayTask").then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ tasks: data });
    });
    console.log(this.state.tasks);

    try{
      axios.get("https://localhost:7000/Note/GetAllNotes").then((res)=>{
        const data = res.data;  
        this.setState({Notes:data.slice(-3)});
        console.log(data);}
        
        );
    
    }catch(err){
      console.log(err);
    }
  }
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
  render() {
    return (
      <div className='DashBoard'>
         <div style={{ clear: "both" }}></div>
        <div className="Header">
          <div className="Col1">
            <h1 style={{marginLeft:'1%'}}>Home</h1>
          </div>
        </div>
        <div className="content" style={{backgroundColor:'black'}}>
        <div className='TaskTody'>
          <h2 style={{marginLeft:20}}>Todays tasks.</h2>
          <div style={{overflow:"auto"}}>
        {this.state.tasks.map((task) => (
                <div className="ListElement" key={task.id}>
                  
                  <div style={{float:"left",paddingTop:"15px"}}>
                    <Switch onChange={()=>this.handleEnd(task)} defaultChecked={task.isCompleted} /> 
                  </div>
                  <h3 style={{float:"left", marginLeft:"10px"}}>{task.name}</h3>
                  
                  <h5 style={{float:"right", marginTop:"40px",marginRight:20,marginBottom:0}}>{this.formatDate(task.deadLine)}</h5>
                  <div style={{clear:"both"}}></div>
                </div>
              ))}
              </div>
        </div>
        <div className='Clock'>
          <Clock/>
        </div>  
        </div>
        <div style={{clear:'both'}}>
        
        <div className='Notes'>
          <h1>Recent notes</h1>
          <Grid container rowSpacing={0} columnSpacing={1}>
          {
            this.state.Notes.map((note,index)=>(
              <Grid  item xs={4} key={index}>
              <NoteComponnet id={note.id} context={note.context}/>
              </Grid>
            ))
          }
          </Grid>
        </div>
      </div>
      </div>
    )
  }
}

export default DashBoard
