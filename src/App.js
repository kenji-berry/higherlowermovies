import "./App.css"
import React, { useEffect, useState } from "react"
import Panel from "./Panel.js"
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
  let [movie1,setMovie1] = useState({})
  let [movie2,setMovie2] = useState({})
  const [isLoading,setisLoading] = useState(false)
  let [panelNum,setPanelNum] = useState([1,2])
  const [score,setScore] = useState(0)
  const[lost,setLost] = useState(false)
  const [start,setStart] = useState(false)

  function setUpGame(){
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    setisLoading(true)
    setLost(false)
    setScore(0)
    getData("1", false)
    getData("2", true)

  }



  function getData(whichPanel, ready){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=top_rated_english_250';
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
          setRandomMovie(whichPanel,data,rating, ready)
        })
    })
  }

  const setRandomMovie = (whichPanel,data,rating, ready) =>{
    if (whichPanel == "1"){
      setMovie1(new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes))
    }

    else if (whichPanel =="2"){
      setMovie2(new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes))      
    }

    if (ready){
      setStart(true)
      setisLoading(false)
    }
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

  const compare = (whichPanel,movieDataFromPanel)=>{
    const removePanels = () =>{
      const a =document.getElementsByClassName("toHide")[0]
      a.style.display="none"
      setLost(true)
    }

    const showRating = () =>{

      console.log(movie1)
      let count=0
      let ratingsShow = document.getElementsByClassName("rating")
      ratingsShow  = Array.prototype.slice.call(ratingsShow)
      const changePanel = (element,panelNum) =>{
        element.style.display="block"
        element.style.opacity="100"
        let startValue=1;
        let endValue =movie1.rating;

        if (whichPanel === "2"){
          endValue = movie2.rating;
        }

  

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
      if (movie1.rating >= movie2.rating){
        console.log("higher1")
        setScore(score+1)
        changePanel("#34b233")
        showRating(whichPanel)
        getData("1")
        
      }
      else{
        console.log("lower1")
        changePanel("#ff2a26")
        showRating(whichPanel)
        
        setTimeout(() => {removePanels()},3000)
      }
    }
    else{
      if (movie2.rating >= movie1.rating){
        console.log("higher1")
        setScore(score+1)
        showRating(whichPanel)
        getData("2")
        
        changePanel("#34b233")
      }
      else{
        console.log("lower2")
        const a =document.getElementsByClassName("toHide")[0]
        changePanel("#ff2a26")
        showRating(whichPanel)
        
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
  const testing= () =>{
    console.log("hello")
  }

  function test23(){
    console.log(movie1)
    console.log(movie2)
  }

  function changetest(){
    setMovie1("hwllo")
  }

  const test = (props) =>{
    console.log(props)
  }


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
        {!start ? <button onClick={setUpGame}>bbbbbbbbbbbb</button>:null}
        {start ?         <div className="toHide">
          <Panel onClick={[compare, ,test]} setPanelNum={setPanelNum} panelNumber="1" panelNumArr={panelNum} movie={movie1}></Panel>
          <Or score={score}></Or>
          <Panel onClick={[compare,,test]} setPanelNum={setPanelNum} panelNumber="2" panelNumArr={panelNum} movie={movie2}></Panel>
        </div>: null}

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
  return (
    <div className="lost" id="hideLost">
      <div className="inner">
      You lost !
      <button type="button" onClick={props.newGame} id="playAgainButton">Play Again</button>
      </div>

    </div>
  )
}




function StartGame(props){
  return (
    <div className="lost" id="hideLost">
      <div className="inner">
      You lost !
      <button type="button" onClick={props.newGame} id="playAgainButton">Play Again</button>
      </div>

    </div>
  )
  

}


export default App;
