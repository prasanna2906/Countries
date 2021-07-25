import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


const Name = (props) => {

    if(props.btn === 1){
    return (
      <p><b>{props.name}</b></p> 
    )
  }
  else{
    return(
      <><b>{props.name}</b> </>
    )
  }
}


const Weather = ({capital}) => {
  const access_key = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`
  console.log("ACCESS KEY IS ", access_key)
  console.log("URL IS ", url)

  console.log("capital is ", capital)
  const [data, setData] = useState(null)
  
  const getweather = () => {
    axios
      .get(url)
      .then(response => setData(response.data.current));
  }

  useEffect(getweather,[capital]);
  console.log("data is ", data)

  return(
    <div>
      <h2> Weather in {capital} is </h2>
      
      {
        data ?
        <>
          <p><b>Temperature is :</b> {data.temperature} C</p>
          <img src = {data.weather_icons[0]} alt = "weather Icon"/>
          <p><b>Wind Speed:</b> {data.wind_speed}km/h <b>Wind Directon:</b> {data.wind_dir}</p>
          <p><b>Humidity:</b> {data.humidity}</p>
        </>
        :
        <p>Loading</p>
      }
      
    </div>

  )


}

const Lang = (props) => {
  //console.log(props)
  return( <li>{props.lang}</li>)
}



const Country = ({countryObj}) => {
  var btn = 0;

  console.log(countryObj)

  console.log("the present value of arr before click is :", countryObj.arr)
  
  
  
  const handleClick=(event) => {
  
    const y = event.target.id;
    //console.log(y);
    //console.log("countryobj is ",countryObj)
    const copy = countryObj.result.filter(name => name.name === y )
    countryObj.setArr(copy)
    //console.log("countries ",countryObj.result)
    //console.log("arr is :::",countryObj.arr)
    
    countryObj.setObj(true)
    return(
      console.log("button")
    )
  }

  
  
  if(countryObj.size === true   && countryObj.result.length !== 1 && countryObj.Objectz === false){
    
    return(
      countryObj.result.map((names,i) => <div key = {i} > <Name key = {i} name = {names.name} btn = {btn} /> 
      <button id = {names.name} onClick = {handleClick}>show</button> </div>)
    )
  }
  
  else if(countryObj.size === true && countryObj.arr.length === 1 ){
    //console.log(countryObj.result[0].name);
    console.log("arr lang: ", countryObj.arr[0].languages)
    btn=1;
    return(
      
      countryObj ? 
      <>
        <Name name = { countryObj.arr[0].name} btn = {btn}/>
        <p><b>Capital :</b> {countryObj.arr[0].capital}</p>
        <p><b>Population :</b> {countryObj.arr[0].population}</p>
        <p><b>Languages :</b></p>
        <ul> {countryObj.arr[0].languages.map((lang,i) =><Lang key={i} lang = {lang.name} />)} </ul>
        <img src = {countryObj.arr[0].flag} width = {120} height = {100}/>
        <Weather capital = {countryObj.arr[0].capital} />
        {/*<button onClick ={() => setObj(false)}>Back</button>*/}
      </>
      :
      <p>LOADING DATA</p>
    )
  }
  
  else if(countryObj.size === true && countryObj.result.length ===1 && countryObj.arr.length !== 1){
    console.log("entered 2nd elseif")
    btn=1;
    return(
      
      countryObj ? 
      <>
        <Name name = { countryObj.result[0].name} btn = {btn}/>
        <p><b>Capital :</b> {countryObj.result[0].capital}</p>
        <p><b>Population :</b> {countryObj.result[0].population}</p>
        <p><b>Languages :</b></p>
        <ul> {countryObj.result[0].languages.map((lang,i) =><Lang key={i} lang = {lang.name} />)} </ul>
        <img src = {countryObj.result[0].flag} width = {120} height = {100}/>
        <Weather capital = {countryObj.result[0].capital} />
      </>
      
      :

      <p>LOADING DATA</p>
    )
  }

  else {
    return(
      <p>PLS BE MORE SPECIFIC</p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setResult] = useState([]);
  const [capital, setCapital] = useState('')


  const getall = () => {
    axios 
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)});
  }


  useEffect(getall,[])

  const [size, setSize] = useState(false);


  const handleSearch = (event) => {
    //console.log(event.target.value);
    setSearch(event.target.value);
    
  }
  


  const searchfunc = (event) => {
    event.preventDefault();
    //console.log(search);
    const arrs = countries.filter( names => {
      return(names.name.includes(search))
    })
    if(arrs.length > 10){
      setSize(false);
      setArr([])
      setObj(false)

    }
    else{
      setSize(true);
      setResult(arrs);
      setArr([])
      setObj(false) 
    }
    /*arr.forEach(item => console.log("country is : ",item.name))*/
    setSearch('')
   
  }

  const [arr, setArr] = useState([])
  const [Objectz, setObj] = useState(false)

  const countryObj = {
    result : searchResult,
    size : size,
    arr : arr,
    setArr : setArr,
    Objectz : Objectz,
    setObj : setObj,
    capital: capital,
    setCapital: setCapital
  }
  


  return(
    <div>
      <form onSubmit = {searchfunc} >
      search : <input value = {search} onChange = {handleSearch}/>
      </form>
      <Country countryObj = {countryObj} />
    </div>

  )
}


export default App;
