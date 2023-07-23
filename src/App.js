import "./App.css"
import React, {useState} from "react"
import Panel from "./Components/Panel/Panel.js"
import Or from "./Components/Or/Or.js"
import StartGame from "./Components/StartGame/StartGame.js";
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
  let [movie1,setMovie1] = useState({})
  let [movie2,setMovie2] = useState({})
  const [isLoading,setisLoading] = useState(false)
  let [panelNum,setPanelNum] = useState([1,2])
  const [score,setScore] = useState(0)
  const[lost,setLost] = useState(false)
  const [start,setStart] = useState(false)
  const [list,setList] = useState("")

  function setUpGame(list){
    setList(list)
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    setisLoading(true)
    setLost(false)
    setScore(0)
    getData("1", false,0, list)
    getData("2", true,0, list)
  }

  function getData(whichPanel, ready, delay, list){
    const url = `https://moviesdatabase.p.rapidapi.com/titles/random?limit=1&list=${list}`;
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

  const resetPanel = (whichPanel) =>{    
    document.getElementById("outerApp").style.backgroundColor = "#FFFFFF" 
    let panels = document.getElementsByClassName("panel")
    panels = Array.prototype.slice.call(panels)
    const resetChangePanel = (element) =>{
      element.style.transition="1s"
      element.style.borderColor="#708090"
    }
    let ratingPanel = document.getElementsByClassName("rating")
    ratingPanel = Array.prototype.slice.call(ratingPanel)
    ratingPanel = ratingPanel[parseInt(whichPanel)-1]
    ratingPanel.style.display="none"
    ratingPanel.style.opacity="0"
    panels.forEach(resetChangePanel)
  }

  const compare = (whichPanel,movieDataFromPanel)=>{
    const removePanels = () =>{
      const a =document.getElementsByClassName("toHide")[0]
      a.style.display="none"
      setLost(true)
    }

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

    const changePanel = (colour, coloursecond) =>{        
      document.getElementById("outerApp").style.backgroundColor = coloursecond
      let panels = document.getElementsByClassName("panel")
      panels = Array.prototype.slice.call(panels)
      const changePanel = (element) =>{
        element.style.transition="0.5s"
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

  function RandomMovie(image,name,year,rating,numVotes) {
    this.image = image;
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.numVotes = numVotes;
  }

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
