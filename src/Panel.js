import './Panel.css';
import React, { useEffect, useState } from "react"


function Panel(props){
  console.log(props)
  const showRating= () =>{
    let startValue=0;
    let endValue=props.movie.rating;
    let duration = 30
    let counter = setInterval(function(){
      duration+=100
      startValue+=0.1;
      startValue = Math.round(startValue*10)/10
      document.getElementById("rating").textContent=startValue;
      if(startValue === endValue){
        clearInterval(counter)
      }
    }, duration)
  }

    console.log(props)
    let movie = props.movie
    let clickfunction = props.onClick

    console.log(movie)

    return(
      <div>
        <div className='panel' id='panel' onClick={event => clickfunction[0](props.panelNumber,props.panelNumArr,clickfunction[1],props.setPanelNum)} style={{backgroundImage: `url(${movie.image})`, backgroundSize: "cover", backgroundPosition: "center center"}}>  
            <div id="panel-text">
              <div>{movie.name} ({movie.year})</div>
              <div id="rating">;</div>
              <div>{movie.numVotes}</div>

            </div>  
        </div>
        <button onClick={showRating}>hello</button>
      </div>

    )
  }

  export default Panel;