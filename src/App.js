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





  const compare = (whichPanel,movieDataFromPanel,updatePanelFunc) =>{
    const removePanels = () =>{
      const a =document.getElementsByClassName("toHide")[0]
      a.style.display="none"
      setLost(true)
    }

    const test = () =>{
      let count=0
      let ratingsShow = document.getElementsByClassName("rating")
      ratingsShow  = Array.prototype.slice.call(ratingsShow)
      const changePanel = (element,panelNum) =>{
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
        test()
        setTimeout(() => {getRandomMovie(whichPanel)},3000)
        
      }
      else{
        console.log("lower1")
        changePanel("#ff2a26")
        test()
        setTimeout(() => {removePanels()},3000)
      }
    }
    else{
      if (movie[movieDataFromPanel[1]].rating >= movie[movieDataFromPanel[0]].rating){
        console.log("higher1")
        setScore(score+1)
        test()
        setTimeout(() => {getRandomMovie(whichPanel)},3000)
        changePanel("#34b233")
      }
      else{
        console.log("lower2")
        const a =document.getElementsByClassName("toHide")[0]
        changePanel("#ff2a26")
        test()
        setTimeout(() => {removePanels()},3000)

      }
    }

    }
  

  const getRandomMovie = (whichPanel)=>{
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

            if (whichPanel == "1"){
              setMovie([movie[0], new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes), movie[2]]) 
            }
            else{
              setMovie([movie[0],movie[1],new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes)])               
            }
            
            console.log(score)
            setisLoading(false)
        })
    })
  }



  function RandomMovie(image,name,year,rating,numVotes) {
    this.image = image;
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.numVotes = numVotes;
  }


  const setUpGame = () => {
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
      <div className="App">
        {lost ? <Lost isLost={lost} newGame={setUpGame}></Lost> : null}
        
        <div className="toHide">
          <Panel onClick={[compare, getRandomMovie,test]} setPanelNum={setPanelNum} panelNumber="1" panelNumArr={panelNum} movie={movie[1]}></Panel>
          <Or score={score}></Or>
          <Panel onClick={[compare,getRandomMovie, test]} setPanelNum={setPanelNum} panelNumber="2" panelNumArr={panelNum} movie={movie[2]}></Panel>
        </div>


          <div class="custom-shape-divider-top-1689271681">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>
      <div class="custom-shape-divider-bottom-1689271754">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
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
