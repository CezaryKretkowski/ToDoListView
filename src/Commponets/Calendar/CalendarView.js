import React, { Component } from 'react'
import './Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";


export class CalendarView extends Component {
  constructor(props){
    super(props);
    this.state={
      events:[],
      tasks:[]
    }
  }

  componentDidMount() {
    axios.get("https://localhost:7000/Task/GetAllTask").then((res) => {
      const data = res.data;
      var ev= [];
      console.log(data);
      data.map((x)=>(
        ev.push({title: x.name, start: x.deadLine}) 
      ));

      this.setState({ events: ev });


    });
    console.log(this.state.tasks);
    

  }
  
  renderEventContent(eventInfo) {
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  
  
  render() {
    return (
      <div className='Calendar'>
        <div className="Header">
          <div className="Col1" >
            <h3 style={{marginLeft:'1%'}}>Calendar</h3>
          </div>
        </div>
        <div className='calendar-container'>
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        // style={{width:"90%",margin:10}}
        events={this.state.events}
        eventContent={this.renderEventContent}

      />
        </div>
        
      </div>
    )
  }
}

export default CalendarView
