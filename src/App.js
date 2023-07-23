import "./App.css"
import {Helmet} from "react-helmet";
import React, {useState} from "react"
import Panel from "./Components/Panel/Panel.js"
import Or from "./Components/Or/Or.js"
import StartGame from "./Components/StartGame/StartGame.js";
import PropagateLoader from "react-spinners/PropagateLoader";


function App() {
  //all state variables
  let [movie1,setMovie1] = useState({})
  let [movie2,setMovie2] = useState({})
  const [isLoading,setisLoading] = useState(false)
  let [panelNum,setPanelNum] = useState([1,2])
  const [score,setScore] = useState(0)
  const[lost,setLost] = useState(false)
  const [start,setStart] = useState(false)
  const [list,setList] = useState("")

  // function to call all other relevant functions and set states to start the game
  function setUpGame(list){
    setList(list)
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    setisLoading(true)
    setLost(false)
    setScore(0)
    getData("1", false,0, list)
    getData("2", true,0, list)
  }

  // function which uses fetch api to retrieve data from API
  function getData(whichPanel, ready, delay, list){
    const url = `https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=${list}`;
    const options = {
      method: 'GET',
      headers: {
        // get your own FREE API key at https://rapidapi.com/SAdrian/api/moviesdatabase
        'X-RapidAPI-Key': `3d73a62809msh2aaaeab14d79a03p1edeabjsn3ff2daa48d59`,
        'X-RapidAPI-Host': `moviesdatabase.p.rapidapi.com`,
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
          setTimeout(() => {setRandomMovie(whichPanel,data,rating, ready)},delay)
        })
        .catch(error =>{
          console.log(error)
          setStart(false)
        })
    })
    .catch(error =>{
      console.log(error)
      setStart(false)
    })
  }
  
  // function which updates the state variables with their relevant movies
  const setRandomMovie = (whichPanel,data,rating, ready) =>{
    if (whichPanel === "1"){
      setMovie1(new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes))
    }
    else if (whichPanel === "2"){
      setMovie2(new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes))      
    }
    if (ready){
      setStart(true)
      setisLoading(false)
    }
  }

  // function which resets all of the styling applied when an answer is correct
  const resetPanel = (whichPanel) =>{    
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    let panels = document.getElementsByClassName("panel")
    panels = Array.prototype.slice.call(panels)
    const resetChangePanel = (element) =>{
      element.style.borderColor="#708090"
    }
    let ratingPanel = document.getElementsByClassName("rating")
    ratingPanel = Array.prototype.slice.call(ratingPanel)
    ratingPanel = ratingPanel[parseInt(whichPanel)-1]
    ratingPanel.style.display="none"
    ratingPanel.style.opacity="0"
    panels.forEach(resetChangePanel)
  }

  //compares the two numbers, and does all things encapsulated within 
  const compare = (whichPanel)=>{
    // removes the panels from user 
    const removePanels = () =>{
      const a =document.getElementsByClassName("toHide")[0]
      a.style.display="none"
      setLost(true)
    }

    // animates the ratings showing up
    const showRating = () =>{
      let ratingsShow = document.getElementsByClassName("rating")
      ratingsShow  = Array.prototype.slice.call(ratingsShow)
      const changePanelRating = (element,panelNum) =>{
        let endValue = 0;
        if(panelNum === 0){endValue = movie1.rating}
        else if (panelNum === 1){endValue = movie2.rating}
        element.style.display="block"
        element.style.opacity="100"
        let startValue=1;
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
        changePanelRating(ratingsShow[i],i)
      }
    }

    // changes the colour/ does all the effects when an answer is right/wrong
    const changePanel = (colour, coloursecond) =>{        
      document.getElementById("outerApp").style.backgroundColor = coloursecond
      let panels = document.getElementsByClassName("panel")
      panels = Array.prototype.slice.call(panels)
      const changePanel = (element) =>{
        element.style.borderColor=colour
      }
      panels.forEach(changePanel)
    }

    if (whichPanel === "1"){
      if (movie1.rating >= movie2.rating){
        setScore(score+1)
        showRating(whichPanel)
        getData("1",true,900,list)
        changePanel("#66cd00","#5bb800")
        setTimeout(() => {resetPanel(whichPanel)},2600)
      }
      else{
        changePanel("#990000","#b20000")
        showRating(whichPanel)
        setTimeout(() => {removePanels()},3000)
      }
    }
    else{
      if (movie2.rating >= movie1.rating){
        setScore(score+1)
        showRating(whichPanel)
        getData("2",true,900, list)
        changePanel("#66cd00","#5bb800")
        setTimeout(() => {resetPanel(whichPanel)},2600)
      }
      else{
        changePanel("#990000","#b20000")
        showRating(whichPanel)
        setTimeout(() => {removePanels()},3000)
      }
    }
    }

  // constructor function for a movie
  function RandomMovie(image,name,year,rating,numVotes) {
    this.image = image;
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.numVotes = numVotes;
  }

  // loading screen
  if(isLoading === true) {
    return (      
      <div className="loading">
        <PropagateLoader color="#ffa500" />
      </div>
    )
  }

  else{
    return (
      <div className="App" id="outerApp">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Higher Or Lower Movies</title>

        </Helmet>
        {lost ? <StartGame newGame={setUpGame} lost={lost}></StartGame> : null}
        {!start ? <StartGame newGame={setUpGame} lost={lost}></StartGame>:null}
        {start ?         <div className="toHide">
          <Panel onClick={[compare]} setPanelNum={setPanelNum} panelNumber="1" panelNumArr={panelNum} movie={movie1}></Panel>
          <Or score={score}></Or>
          <Panel onClick={[compare]} setPanelNum={setPanelNum} panelNumber="2" panelNumArr={panelNum} movie={movie2}></Panel>
        </div>: null}

      </div>
    );
  }

  
}

export default App;
