import './Panel.css';
import React, { useEffect, useState } from "react"


function Panel(props){
  console.log(props)
  const test = () =>{
    let ratingsShow = document.getElementsByClassName("rating")
    ratingsShow  = Array.prototype.slice.call(ratingsShow)
    
    const changePanel = (element) =>{
      element.style.opacity="100"
      let startValue=1;
      let endValue=movie.rating;
      console.log(endValue)
      let duration = 30
      let counter = setInterval(function(){
        duration+=100
        startValue+=0.1;
        startValue = Math.round(startValue*10)/10
        element.textContent=startValue;
        if(startValue === endValue){
          clearInterval(counter)
        }
      }, duration)
      
    }
    ratingsShow.forEach(changePanel)
  }

    console.log(props)
    let movie = props.movie
    let clickfunction = props.onClick

    console.log(movie)

    return(
      <div>
        <div className='panel' id='panel' onClick={function(event){ clickfunction[0](props.panelNumber,props.panelNumArr,clickfunction[1],props.setPanelNum); test();}} style={{backgroundImage: `url(${movie.image})`, backgroundSize: "cover", backgroundPosition: "center center"}}>  
            <div id="panel-text">
              <div>{movie.name} ({movie.year})</div>
              <div id="rating" className='rating'>{movie.rating}</div>
              <div>{movie.numVotes}</div>
            </div>  
        </div>

      </div>

    )
  }

  export default Panel;