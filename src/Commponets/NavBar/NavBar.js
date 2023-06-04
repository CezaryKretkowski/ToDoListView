import { Component } from 'react';
import { Link} from "react-router-dom"
import './NavBar.css';
import {FaHome,FaListUl} from 'react-icons/fa';
import { BiNotepad ,BiCalendar} from 'react-icons/bi';

const IkonStyle = {
    position:'relative' ,
    top:'4px',
    rigth:'4px',
    
};
class NavBar extends Component{

    render(){
    return (       
        <div className='NavBar'>
        
            <Link className='Links' to="/">
                <div className='MenuButton'>
                    <h2 className='h2'><FaHome style={IkonStyle} size={30}/> Home</h2>
                </div>
            </Link> 
            <Link className='Links'  to="/TaskList">
                <div className='MenuButton'>
                    <h2 className='h2'><FaListUl style={IkonStyle} size={30} /> Task List</h2>
                    </div>
            </Link> 
            <Link className='Links' to="/NoteList">
                <div className='MenuButton'>
                    <h2 className='h2'> <BiNotepad style={IkonStyle} size={30} /> Notes</h2>
                </div>
            </Link> 
            <Link className='Links' to="/Calendar"> 
                <div className='MenuButton'>
                    <h2  className='h2'><BiCalendar style={IkonStyle} size={30} /> Calendar</h2>
                </div>
            </Link> 
        </div>       
    );
   }
}

export default NavBar;
