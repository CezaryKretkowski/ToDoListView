import React, { Component } from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

export default class NoteComponnet extends Component {
  constructor(props){
    super(props);
    this.state={
        id:props.id,
        context:props.context,
        isEditing:false,
    }
  }

  handleEditNote=(e)=>{
    try{
        axios.put("https://localhost:7000/Note/UpdateNote",{
            "id": this.state.id,
            "context": this.state.context
        });
        this.setState({isEditing:false});
    }catch(err){
        console.log(err);
    }
  }
  handleDeleteNote=(e)=>{
    try{
        axios.delete("https://localhost:7000/Note/DeleteNote?id="+this.state.id);
        window.location.reload(true)
       
    }catch(err){
        console.log(err);
    }
  }
    render() {
    return (
      <div  className='Note'>
        <h2 style={{float:'left',marginTop:0}}>Note</h2>
        <div style={{float:'right'}}>
        <IconButton>
            <DeleteIcon onClick={(e)=>{this.handleDeleteNote(e)}} style={{display: this.state.isEditing?'none':'block'}} />
            <CheckIcon  onClick={(e)=>{this.handleEditNote(e)}}  style={{display: this.state.isEditing?'block':'none'}} />
        </IconButton>        
        <IconButton onClick={(e)=>{this.setState({isEditing:!this.state.isEditing})}}>
            <EditIcon/>
        </IconButton> 
        </div>
         <textarea disabled={!this.state.isEditing} className='TextAreaNote' value={this.state.context} onChange={(e)=>this.setState({context:e.target.value})}/>
        </div>
    )
  }
}
