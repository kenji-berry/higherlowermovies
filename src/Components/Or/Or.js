function Or(props){
    const newHighScore = (score) =>{
      if (score>localStorage.getItem("HighScore")){
        localStorage.setItem("HighScore",score)
      }
    }
    newHighScore(props.score)
    return (
      <div className="p-2">
        <div className="flex flex-col w-1/10">
          <div className="p-4 bg-zinc-400 rounded-lg shadow-md font-semibold shadow-zinc-950 border-solid border-2 border-zinc-500">
            <p>HIGHSCORE: {localStorage.getItem("HighScore") ? localStorage.getItem("HighScore") : 0}</p>
            <p>SCORE: {props.score}</p>
          </div>
        </div>
        <h2 className=" mt-2 p-2.5 bg-orange-400 rounded-lg shadow-lg shadow-orange-500/50 font-black w-1/10 border-solid border-2 border-orange-500">OR</h2>
      </div>
  
    )
}

export default Or;
