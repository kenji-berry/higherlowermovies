import './Panel.css';

function Panel(props){
  let movie = props.movie
  let clickfunction = props.onClick

  return(
    <div>
      <div className='panel' id='panel' onClick={function(event){ clickfunction[0](props.panelNumber,props.panelNumArr,clickfunction[1],props.setPanelNum);}} style={{backgroundImage: `url(${movie.image})`, backgroundSize: "cover", backgroundPosition: "center center"}}>  
          <div id="panel-text">
            <div>{movie.name} ({movie.year})</div>
            <div id="rating" className='rating'>{movie.rating}</div>
          </div>  
      </div>
    </div>
  )
}

export default Panel;