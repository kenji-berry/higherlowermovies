import "./App.css"
import React, { useEffect, useState } from "react"
import Panel from "./Panel.js"

function App() {
  return (
    <div className="App">
      <Panel oldnew="old"></Panel>
      <Or></Or>
      <Panel oldnew="new"></Panel>

    </div>
  );
}


function Or(){
  return (
    <div className="divOr">
      <h2 className="Or">OR</h2>
    </div>
  )
}

export default App;
