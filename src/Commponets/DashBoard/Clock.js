import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);
  const getDateString =()=>{
    var data =new Date();
    var m=data.getMonth();
    var d=data.getDate();
    var month='';
    var day='';
    if(m<10){
        month='0'+m;
    }else{
        month=m;
    }
    if(d<10){
        day='0'+d;
    }else{
        day=m;
    }
    return data.getFullYear()+'-'+month+'-'+day;
  } 
  const tick = () => {
    setTime(new Date());
  };

  return (
    <div style={{textAlign:"center"}}>
      
      <h1 style={{fontSize:60}}>{time.toLocaleTimeString()}</h1>
      <h2>{getDateString()}</h2>
    </div>
  );
};

export default Clock;