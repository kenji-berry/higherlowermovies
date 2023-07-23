import "./App.css"
import React, {useState} from "react"
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
    console.log(arguments)
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
          console.log(data)
          console.log(rating)
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
    const changePanel = (element) =>{
      element.style.borderColor="#708090"
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
        element.style.borderColor=colour
        element.style.transform="scale(0.8)"
      }
      panels.forEach(changePanel)
    }

    if (whichPanel === "1"){
      if (movie1.rating >= movie2.rating){
        setScore(score+1)
        showRating(whichPanel)
        getData("1",true,1500,list)
        changePanel("#66cd00","#5bb800")
        setTimeout(() => {resetPanel(whichPanel)},3000)
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
        getData("2",true,1500, list)
        changePanel("#66cd00","#5bb800")
        setTimeout(() => {resetPanel(whichPanel)},3000)
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
        <h1>Loading...</h1>
        <PropagateLoader color="#36d7b7" />
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


function StartGame(props){
  function getSelectedList(){
    const selectedList = document.getElementById("listSelect").value
    return selectedList
  }

  return (
    <div className="lost" id="hideLost">
      <div className="backgroundAnimation">
        <span style={{"--time": 25}} className="toAnimate colour1"></span>
        <span style={{"--time": 25}} className="toAnimate colour2"></span>
        <span style={{"--time": 20}} className="toAnimate colour1"></span>
        <span style={{"--time": 4}} className="toAnimate colour2"></span>
        <span style={{"--time": 31}} className="toAnimate colour1"></span>
        <span style={{"--time": 8}} className="toAnimate colour2"></span>
        <span style={{"--time": 9}} className="toAnimate colour1"></span>
        <span style={{"--time": 10}} className="toAnimate colour2"></span>
        <span style={{"--time": 11}} className="toAnimate colour1"></span>
        <span style={{"--time": 12}} className="toAnimate colour2"></span>
        <span style={{"--time": 33}} className="toAnimate colour1"></span>
        <span style={{"--time": 1}} className="toAnimate colour2"></span>
        <span style={{"--time": 13}} className="toAnimate colour1"></span>
        <span style={{"--time": 14}} className="toAnimate colour2"></span>
        <span style={{"--time": 34}} className="toAnimate colour1"></span>
        <span style={{"--time": 16}} className="toAnimate colour2"></span>
        <span style={{"--time": 17}} className="toAnimate colour1"></span>
        <span style={{"--time": 27}} className="toAnimate colour2"></span>
        <span style={{"--time": 19}} className="toAnimate colour1"></span>
        <span style={{"--time": 21}} className="toAnimate colour2"></span>
        <span style={{"--time": 3}} className="toAnimate colour1"></span>
        <span style={{"--time": 22}} className="toAnimate colour2"></span>
        <span style={{"--time": 23}} className="toAnimate colour1"></span>
        <span style={{"--time": 24}} className="toAnimate colour2"></span>
        <span style={{"--time": 5}} className="toAnimate colour1"></span>
        <span style={{"--time": 13}} className="toAnimate colour2"></span>
        <span style={{"--time": 42}} className="toAnimate colour1"></span>
        <span style={{"--time": 15}} className="toAnimate colour2"></span>
        <span style={{"--time": 25}} className="toAnimate colour1"></span>
        <span style={{"--time": 7}} className="toAnimate colour2"></span>
        <span style={{"--time": 30}} className="toAnimate colour1"></span>
        <span style={{"--time": 19}} className="toAnimate colour2"></span>
        <span style={{"--time": 6}} className="toAnimate colour1"></span>
        <span style={{"--time": 35}} className="toAnimate colour2"></span>
        <span style={{"--time": 18}} className="toAnimate colour1"></span>
        <span style={{"--time": 25}} className="toAnimate colour2"></span>
        <span style={{"--time": 2}} className="toAnimate colour1"></span>
        <span style={{"--time": 20}} className="toAnimate colour2"></span>
        <span style={{"--time": 4}} className="toAnimate colour1"></span>
        <span style={{"--time": 31}} className="toAnimate colour2"></span>
        <span style={{"--time": 8}} className="toAnimate colour1"></span>
      </div>

      <div className="flex flex-col  p-6 rounded-xl shadow-lg fixed backdrop-blur-sm">
        {props.lost ? <h3>You Lost !</h3>: null}
        <h1 className="text-4xl p-4">Which movie has a higher rating game</h1>
        <div className="pb-4 pt-4">
          <h3>How to play</h3>
          <p>Two random movies will appear, select the movie you think has a higher rating according to imdb.</p>
        </div>

        <button type="button" onClick={() => props.newGame(getSelectedList())} id="playAgainButton" className="bg-zinc-950 text-white p-4 hover:bg-zinc-400">{props.lost ? "Go Again":"Start Game"}</button>
          <select name="listSelect" id="listSelect" className="p-4">
            <option value="top_rated_english_250">Top 250 English Movies (Default) </option>
            <option value="top_rated_250">Top 250 Movies </option>
            <option value="top_boxoffice_200">Top 200 All Time Box Office Movies</option>
          </select>
      </div>

    </div>
  )
  

}


export default App;
