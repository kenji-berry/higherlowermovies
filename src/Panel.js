import './Panel.css';
import React, { useEffect, useState } from "react"


function Panel(props){
    console.log(props)
    let movie = props.movie
    let clickfunction = props.onClick
    console.log(movie)

    return(
        <div className='panel' id='panel' onClick={event => clickfunction[0](props.panelNumber,props.panelNumArr,clickfunction[1])} style={{backgroundImage: `url(${movie.image})`, backgroundSize: "cover", backgroundPosition: "center center"}}>  
            <div id="panel-text">
              <div>{movie.name}</div>
              <div>({movie.rating})</div>
              <div>{movie.numVotes}</div>
            </div>  
        </div>
    )
  }

  export default Panel;