import React ,{useState} from 'react';
import "./AddTaskStyle.css";
import axios from 'axios';




export default function AddTaskView(props) {
  const [title,setTitle] = useState("");
  const [deadLine,setDeadLine] = useState(Date.now());
  const [description,setdescription] = useState("");


  const handleSubmit = async () =>{
    try{
      const respons = await axios.post("https://localhost:7000/Task/AddTask/",
      { 
        "name":title,
        "description":description,
        'isCompleted':false,
        "deadLine":deadLine
      }
      );
      console.log(respons);
      window.location.reload(false);
    }catch(error){
      console.log(error);
    }
  }    
  return (
    <div 
        className='addTask'
        style={{width: props.isActive ? '50%': '0%' , 
                float:"left",display:  props.isActive ? 'block': 'none'}}
    >
      <div className='form'>        
        <div className='SectionForm'>
          <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Title</h2>
          <input type="text" onChange={(event)=>{setTitle(event.target.value)}} className='TitleInput' placeholder=' Your Title'/>
        </div>
        <div className='SectionForm'>          
            <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Date</h2>
            <input type="date" onChange={(event)=>{setDeadLine(event.target.value)}} className='TimeInput' placeholder=' Your Title'/>
        </div>
        <div className='SectionForm'>
            <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Description</h2>
            <textarea className='TextArea' onChange={(event)=>{setdescription(event.target.value)}} rows="10" cols=""></textarea> 
        </div>
        <div className='buttons'>
          <button className='CancelButton'onClick={() => window.location.reload(false)}>Cancel</button>
          <button className='AddButton' onClick={handleSubmit}> Add Task</button>
        </div>
      </div>
    </div>
  )
}
