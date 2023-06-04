import React, { Component } from 'react'
import './NoteList.css';
import axios from 'axios';
import NoteComponnet from './NoteComponnet/NoteComponnet';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';


export class NoteList extends Component {
  constructor(props){
    super(props);
    this.state={
      Notes:[],
    }
  }
  componentDidMount(){
    try{
      axios.get("https://localhost:7000/Note/GetAllNotes").then((res)=>{
        const data = res.data;  
        this.setState({Notes:data});
        console.log(data);}
        
        );
    
    }catch(err){
      console.log(err);
    }
  }
  AddNote=()=>{
    try{
      axios.post('https://localhost:7000/Note/AddNote',{"context":"Empty note"});
      window.location.reload(true);
    }catch(err){
      console.log(err);
    }
  }
  render() {
    return (
      <div className='NoteList'>
        <div style={{ clear: "both" }}></div>
        <div className="Header">
          <div className="Col1">
            <h3 style={{marginLeft:'1%'}}>Notes</h3>
          </div>
        </div>
        <Button onClick={(e)=>{this.AddNote()}} style= {{marginLeft:10,marginTop:20,marginBottom:20}}variant='contained'>
            Add <AddIcon/>
          </Button>
        <div style={{height:'75vh',overflow:"auto"}}>
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
    )
  }
}

export default NoteList
