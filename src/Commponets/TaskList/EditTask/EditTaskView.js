import React ,{useState,useEffect} from 'react';
import "./EditTask.css";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';



export default function EditTaskView(props) {
    const [title,setTitle] = useState("");
    const [deadLine,setDeadLine] = useState("");
    const [description,setdescription] = useState("");
    const [isEditing,setIsEditing] = useState(false);
  
    useEffect(() => {
      if(props.isActive===true){
      axios.get("https://localhost:7000/Task/GetById?id="+props.id)
          .then(response => {
            setTitle(response.data.name);

            var w =response.data.deadLine;
            
            w=w.substr(0, 10);
            setDeadLine(w);
            setdescription(response.data.description);
          });
        }
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [props.isActive, props.id]);
    const handelDelete = async ()=>{
      try{
        const respons = await axios.delete("https://localhost:7000/Task/DeleteTask?id="+props.id
        );
        console.log(respons);
        window.location.reload(false);
      }catch(error){
        console.log(error);
      }
    }
    const handleSubmit = async () =>{
      try{
        const respons = await axios.put("https://localhost:7000/Task/UpdateTask",
        {
          "id":props.id,
          "description":description,
          "name":title,
          'end':false,
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
            <IconButton style={{float:"right"}} onClick={()=>setIsEditing(!isEditing)} color={ isEditing? 'warning':'default'}><EditIcon/></IconButton>
          <div className='SectionForm'>
            <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Title</h2>
            <input disabled={!isEditing} type="text" onChange={(event)=>{setTitle(event.target.value)}} className='TitleInput' placeholder=' Your Title' value={title}/>
          </div>
          <div className='SectionForm'>          
              <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Date</h2>
              <input  disabled={!isEditing} type="date" onChange={(event)=>{setDeadLine(event.target.value)}} className='TimeInput' placeholder=' Your Title' value={deadLine}/>
          </div>
          <div className='SectionForm'>
              <h2 style={{marginLeft:'10px', marginBottom:'10px'}}>Description</h2>
              <textarea disabled={!isEditing} className='TextArea' onChange={(event)=>{setdescription(event.target.value)}} rows="10" cols="" value={description}></textarea> 
          </div>
          <div className='buttons'>
            <button className='CancelButton'onClick={() => window.location.reload(false)}>Cancel</button>
            <button style={{display:  isEditing ? 'block': 'none'}} className='edditButton' onClick={handleSubmit}> Save Task</button>
            <button style={{display:  isEditing ?  'none':'block'}} className='deletButton' onClick={handelDelete}> Delete</button>
          </div>
        </div>
      </div>
    )
  }