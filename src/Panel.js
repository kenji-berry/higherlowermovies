import './Panel.css';
import React, { useEffect, useState } from "react"


function Panel(props){
    let oldNew = props.oldnew;
  
    function RandomMovie(image,name,year,rating,numVotes) {
      this.image = image;
      this.name = name;
      this.year = year;
      this.rating = rating;
      this.numVotes = numVotes;
  }
  
    const [movie,setMovie] = useState("")
    useEffect(() => {
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
              console.log(rating)
              document.getElementById("panel").style.backgroundImage= data.primaryImage.url 
              setMovie(new RandomMovie(data.primaryImage.url,data.originalTitleText.text,data.releaseYear.year,rating.averageRating,rating.numVotes)) 

          })
          console.log(data)
      })
    }, [])
  
    const clickPanel  = function(){
      console.log(oldNew)
  
    }
  
    return(
        <div className='panel' id='panel' style={{ backgroundImage:`url(${movie.image})`, backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"}}>  
            <div id="panel-text">
                <p id="movie-name">{movie.name}</p>
                <p>({movie.year})</p>
            </div>  
        </div>
    )
  }

  export default Panel;