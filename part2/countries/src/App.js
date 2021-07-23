import {useState, useEffect} from 'react'
import axios from 'axios'
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY

const OneCountry = (props) => {
  const {name,capital, pops, languages, flag} = props
  const [ weather, setWeather ] = useState({
    "location":{
      "name":'',
    },
    "current":{
      "temp_c":'',
      "wind_kph":'',
      "wind_dir":'',
      "condition":{
        "icon":'',
      },
    },
  })

  const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${capital}&days=1&aqi=no&alerts=no`

  useEffect(() => {
    axios.get(URL)
      .then(res => setWeather(res.data))
  }, [])

  console.log(weather['location'])

  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {pops}</p>
      
      <h3>languages</h3>
      {languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
      <br/>
      <img src={flag} alt='' width={160} heigth={120}/>

      <h3>Weather in {capital}</h3>
      <p><b>temperatur:</b> {weather.current.temp_c} Celcius</p>
      <img src={weather.current.condition.icon} width={80} heigth={80} alt=""/>
      <p><b>wind: </b>{weather.current.wind_kph} kph direction <b>{weather.current.wind_dir}</b> </p>
    </>
  )
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ country, setCountry ] = useState([])

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountry(res.data)
      })
  }, [])

  const countryList = country.reduce((r, o) => {
    if(o.name.includes(filter)){
      return r.concat(o)
    }
    return r
  }, [])

  let toShow = <p></p>
  
  if(countryList.length >= 10){
    toShow = <p>Too many matches, specify another filter</p>
  } if(countryList.length === 1){
    toShow = <OneCountry name={countryList[0].name} capital={countryList[0].capital} pops={countryList[0].population} languages={countryList[0].languages} flag={countryList[0].flag}/>
  } if((countryList.length <= 10) && (countryList.length >1)){
    toShow = countryList.map((p, i) => <li key={i}>{p.name}</li>)
  }
  

  return (
    <div>
        find countries <input value={filter || ''} onChange={handleFilter}/>
        {toShow}
    </div>
  )
}

export default App;
