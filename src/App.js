import "./App.css"
import React, { useEffect, useState } from "react"
import Panel from "./Panel.js"
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
  let [movie,setMovie] = useState([{}])
  const [isLoading,setisLoading] = useState(true)
  let [panelNum,setPanelNum] = useState([1,2])
  const [score,setScore] = useState(0)
  const[lost,setLost] = useState(false)





  const compare = (whichPanel,movieDataFromPanel)=>{
    function getData(){
      const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=most_pop_movies';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3d73a62809msh2aaaeab14d79a03p1edeabjsn3ff2daa48d59',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        }
      };

      fetch(url, options)
      .then(response =>  response.json())
      .then(data=> data.results[0])
      .then(data =>{
        
          const ratingUrl = `https://moviesdatabase.p.rapidapi.com/titles/${data.id}/ratings` 
          fetch(ratingUrl,options)
          .then(response => response.json())
          .then(rating=>{
            rating = rating.results
            console.log(data)
            console.log(rating)
            setTimeout(() => {setRandomMovie(whichPanel,data,rating)},3000)
          })
      })
    }

    const resetPanel = (whichPanel) =>{    
      document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
      let panels = document.getElementsByClassName("panel")
      panels = Array.prototype.slice.call(panels)
      const changePanel = (element) =>{
        element.style.borderColor="#FFFFFF"
        element.style.transform="scale(1)"
      }
      let ratingPanel = document.getElementsByClassName("rating")
      ratingPanel = Array.prototype.slice.call(ratingPanel)
      ratingPanel = ratingPanel[parseInt(whichPanel)-1]
      ratingPanel.style.display="none"
      ratingPanel.style.opacity="0"

      panels.forEach(changePanel)

    }
    const setRandomMovie = (whichPanel,data,rating) =>{
      if (whichPanel == "1"){
        resetPanel(whichPanel)
        setMovie([movie[0], new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes), movie[2]]) 
      }
      else{
        resetPanel(whichPanel)
        setMovie([movie[0],movie[1],new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes)])               
      }
    }



    const removePanels = () =>{
      const a =document.getElementsByClassName("toHide")[0]
      a.style.display="none"
      setLost(true)
    }

    const showRating = () =>{
      let count=0
      let ratingsShow = document.getElementsByClassName("rating")
      ratingsShow  = Array.prototype.slice.call(ratingsShow)
      const changePanel = (element,panelNum) =>{
        element.style.display="block"
        element.style.opacity="100"
        let startValue=1;
        let endValue=movie[movieDataFromPanel[panelNum]].rating;
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
      for(let i=0 ; i<ratingsShow.length;i++){
        changePanel(ratingsShow[i],i)
      }
    }




    const changePanel = (colour) =>{        
      document.getElementById("outerApp").style.backgroundColor = colour
      let panels = document.getElementsByClassName("panel")
      panels = Array.prototype.slice.call(panels)
      const changePanel = (element) =>{
        element.style.borderColor=colour
        element.style.transform="scale(0.8)"
      }
      panels.forEach(changePanel)
    }

    console.log(whichPanel)

    if (whichPanel === "1"){
      if (movie[movieDataFromPanel[0]].rating >= movie[movieDataFromPanel[1]].rating){
        console.log("higher1")
        setScore(score+1)
        changePanel("#34b233")
        showRating()
        getData()
        
      }
      else{
        console.log("lower1")
        changePanel("#ff2a26")
        showRating()
        
        setTimeout(() => {removePanels()},3000)
      }
    }
    else{
      if (movie[movieDataFromPanel[1]].rating >= movie[movieDataFromPanel[0]].rating){
        console.log("higher1")
        setScore(score+1)
        showRating()
        getData()
        
        changePanel("#34b233")
      }
      else{
        console.log("lower2")
        const a =document.getElementsByClassName("toHide")[0]
        changePanel("#ff2a26")
        showRating()
        
        setTimeout(() => {removePanels()},3000)

      }
    }

    }




  function RandomMovie(image,name,year,rating,numVotes) {
    this.image = image;
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.numVotes = numVotes;
  }


  const setUpGame = () => {
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    setLost(false)
    setScore(0)
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=top_rated_english_250';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3d73a62809msh2aaaeab14d79a03p1edeabjsn3ff2daa48d59',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      }
    };
    setisLoading(true)
    fetch(url, options)
    .then(response =>  response.json())
    .then(data=> data.results[0])
    .then(data =>{
        const ratingUrl = `https://moviesdatabase.p.rapidapi.com/titles/${data.id}/ratings` 
        fetch(ratingUrl,options)
        .then(response => response.json())
        .then(rating=>{
            rating = rating.results
            console.log(rating)
            console.log(movie)

            setMovie([...movie, new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes)]) 

            if (movie.length>=2){
              setisLoading(false)
            }

        })
    })
  }

  const test = (props) =>{
    console.log(props)
  }

  useEffect(() => {
    setUpGame()
  }, [movie.length === 1])

  if(isLoading === true) {
    return (      
      <div className="loading">
        <PropagateLoader color="#36d7b7" />
      </div>
    )
  }


  else{
    return (
      <div className="App" id="outerApp">
        {lost ? <Lost isLost={lost} newGame={setUpGame}></Lost> : null}
        
        <div className="toHide">
          <Panel onClick={[compare, ,test]} setPanelNum={setPanelNum} panelNumber="1" panelNumArr={panelNum} movie={movie[1]}></Panel>
          <Or score={score}></Or>
          <Panel onClick={[compare,,test]} setPanelNum={setPanelNum} panelNumber="2" panelNumArr={panelNum} movie={movie[2]}></Panel>
        </div>
      </div>
    );
  }

  
}


function Or(props){
  const newHighScore = (score) =>{
    if (score>localStorage.getItem("HighScore")){
      localStorage.setItem("HighScore",score)
    }
  }
  newHighScore(props.score)
  return (
    <div>
    <div className="divOr">
      <div className="scoresMiddle">
        <p>HIGHSCORE: {localStorage.getItem("HighScore") ? localStorage.getItem("HighScore") : 0}</p>
        <p>SCORE: {props.score}</p>
        <h2 className="Or">OR</h2>
      </div>

    </div>

  </div>
  )
}

function Lost(props){
  if (props.isLost){
    return (
      <div className="lost" id="hideLost">
        <div className="inner">
        You lost !
        <button type="button" onClick={props.newGame} id="playAgainButton">Play Again</button>
        </div>

      </div>
    )
  }
  else{
    return(null) 
  }

}



export default App;
