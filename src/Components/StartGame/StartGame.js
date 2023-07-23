import './StartGame.css';

function StartGame(props){
    function getSelectedList(){
      const selectedList = document.getElementById("listSelect").value
      return selectedList
    }
  
    return (
      <div className="lost" id="hideLost">
        <div className="backgroundAnimation">
          <span style={{"--time": 27}} className="toAnimate colour1"></span>
          <span style={{"--time": 38}} className="toAnimate colour2"></span>
          <span style={{"--time": 19}} className="toAnimate colour1"></span>
          <span style={{"--time": 23}} className="toAnimate colour2"></span>
          <span style={{"--time": 26}} className="toAnimate colour1"></span>
          <span style={{"--time": 15}} className="toAnimate colour2"></span>
          <span style={{"--time": 17}} className="toAnimate colour1"></span>
          <span style={{"--time": 35}} className="toAnimate colour2"></span>
          <span style={{"--time": 38}} className="toAnimate colour1"></span>
          <span style={{"--time": 40}} className="toAnimate colour2"></span>
          <span style={{"--time": 42}} className="toAnimate colour1"></span>
          <span style={{"--time": 15}} className="toAnimate colour2"></span>
          <span style={{"--time": 23}} className="toAnimate colour1"></span>
          <span style={{"--time": 43}} className="toAnimate colour2"></span>
          <span style={{"--time": 22}} className="toAnimate colour1"></span>
          <span style={{"--time": 35}} className="toAnimate colour2"></span>
          <span style={{"--time": 14}} className="toAnimate colour1"></span>
          <span style={{"--time": 33}} className="toAnimate colour2"></span>
          <span style={{"--time": 10}} className="toAnimate colour1"></span>
          <span style={{"--time": 28}} className="toAnimate colour2"></span>
          <span style={{"--time": 43}} className="toAnimate colour1"></span>
          <span style={{"--time": 30}} className="toAnimate colour2"></span>
          <span style={{"--time": 21}} className="toAnimate colour1"></span>
          <span style={{"--time": 40}} className="toAnimate colour2"></span>
          <span style={{"--time": 25}} className="toAnimate colour1"></span>
          <span style={{"--time": 32}} className="toAnimate colour2"></span>
          <span style={{"--time": 11}} className="toAnimate colour1"></span>
          <span style={{"--time": 25}} className="toAnimate colour2"></span>
          <span style={{"--time": 34}} className="toAnimate colour1"></span>
          <span style={{"--time": 27}} className="toAnimate colour2"></span>
          <span style={{"--time": 22}} className="toAnimate colour1"></span>
          <span style={{"--time": 35}} className="toAnimate colour2"></span>
          <span style={{"--time": 23}} className="toAnimate colour1"></span>
          <span style={{"--time": 43}} className="toAnimate colour2"></span>
          <span style={{"--time": 12}} className="toAnimate colour1"></span>
          <span style={{"--time": 42}} className="toAnimate colour2"></span>
          <span style={{"--time": 12}} className="toAnimate colour1"></span>
          <span style={{"--time": 5}} className="toAnimate colour2"></span>
          <span style={{"--time": 41}} className="toAnimate colour1"></span>
          <span style={{"--time": 16}} className="toAnimate colour2"></span>
          <span style={{"--time": 34}} className="toAnimate colour1"></span>
        </div>
  
        <div className="flex flex-col  p-6 rounded-xl shadow-2xl fixed backdrop-blur-sm">
            {props.lost ? <h3 className="text-4xl font-extrabold ">You Lost !</h3>: null}
            <h1 className="text-4xl pt-4 pb-2 font-bold">Higher or Lower Movies</h1>
            <p>Developed by <a target="blank" href="https://github.com/kenji-berry" className="font-medium text-orange-400 hover:underline duration-200">Kenji</a></p>

            <div className="pb-4 pt-2">
                <h3 className="font-semibold text-xl">How to play</h3>
                <p className="text-xl">Two random movies will appear, select the movie you think has a higher rating according to IMDb.</p>
            </div>

            <button type="button" onClick={() => props.newGame(getSelectedList())} id="playAgainButton" className="bg-zinc-950 text-white p-4 hover:bg-zinc-400 duration-500">{props.lost ? "Go Again":"Start Game"}</button>
            
            <select name="listSelect" id="listSelect" className="p-4">
                <option value="top_rated_english_250">Top 250 English Movies (Default) </option>
                <option value="top_rated_250">Top 250 Movies </option>
                <option value="top_boxoffice_200">Top 200 All Time Box Office Movies</option>
            </select>
        </div>
    </div>
    )
}
  














export default StartGame;