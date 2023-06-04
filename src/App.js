import Navbar from "./Commponets/NavBar/NavBar.js";
import TaskList from "./Commponets/TaskList/TaskList.js";
import NoteList from "./Commponets/NoteList/NoteList.js";
import DashBoard from "./Commponets/DashBoard/DashBoard.js";
import CalendarView from "./Commponets/Calendar/CalendarView.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/TaskList" element={<TaskList />} />
      <Route path="/NoteList" element={<NoteList />} />
      <Route path="/Calendar" element={<CalendarView/>}/>
      </Routes>
      <div className="Fotter"></div>
    </div>
    </BrowserRouter>
  );
}

export default App;
