import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Panel oldnew="old"></Panel>
      <Or></Or>
      <Test></Test>
      <Panel oldnew="new"></Panel>

    </div>
  );
}

function Panel(props){
  let hell = props.oldnew;

  const clickPanel  = function(){
    console.log(hell)

  }

  return(
    <div className="panel" onClick={clickPanel}>
      
      <h1>{props.oldnew}<Test></Test></h1>
    </div>
  )
}

function Or(){
  return (
    <div className="divOr">
      <h2 className="Or">OR</h2>
    </div>
  )
}

function Test(){
  const [data,setData] = useState();
  const [test,setTest] = useState();

  useEffect(() => {

    async function hello (){
      const url = 'https://moviesdatabase.p.rapidapi.com/titles/tt12343534/ratings';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3d73a62809msh2aaaeab14d79a03p1edeabjsn3ff2daa48d59',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
        
      };
      try{
        const resp = await fetch(url,options)
        const data = await resp.json()
        setData(data.results)
        return data
      }
      catch(err){
        console.log(err)
      }
    }
      const a = hello();
  },[]);

  console.log(data.averageRating)

  return (
    <div>
      <h1>{data.averageRating}</h1>
    </div>
  );
}

export default App;
