import './Panel.css';
import React, { useEffect, useState } from "react"


function Panel(props){
    let movie = props.movie
    console.log(movie)

    return(
        <div className='panel' id='panel' style={{backgroundImage: `url(${movie.image})`, backgroundSize: "cover", backgroundPosition: "center center"}}>  
            <div id="panel-text">
              <div>{movie.name}</div>
              <div>({movie.rating})</div>
              <div>{movie.numVotes}</div>
            </div>  
        </div>
    )
  }

  export default Panel;