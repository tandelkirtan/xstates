  import "./App.css";
  import { useEffect, useState } from "react";

  let Country_api = "https://location-selector.labs.crio.do/countries";

  function App() {
    const [countrydata, setCuntryData] = useState([]);
    const [statedata, setStateData] = useState([]);
    const [citydata, setCityData] = useState([]);
    const [stateAllow, setStateAllow] = useState(false);
    const [cityAllow, setCityAllow] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const fetchCountries = async () => {
      try{
        const response = await fetch(Country_api);
        const data = await response.json();
        setCuntryData(data);
      }
      catch(error){
        console.log("Error fetching countries:", error);
      }
      finally {
        setIsLoading(false);
      }
    }

    const fetchState = async () => {
      try{
        const response = await fetch(`https://location-selector.labs.crio.do/country=${country}/states`);
        const data = await response.json();
        setStateData(data);
      }
      catch(error){
        console.log("Error fetching countries:", error);
      }
      setStateAllow(true);
    }

    const fetchCity = async () => {
      try{
        const response = await fetch(`https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`);
        const data = await response.json();
        setCityData(data);
      }
      catch(error){
        console.log("Error fetching countries:", error);
      }
      setCityAllow(true);
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    useEffect(() => {
      if(country)
      {
        fetchState();
      }
    }, [country])

    useEffect(() => {
      if(state)
      {
        fetchCity();
      }
    }, [state])

    const handleCountry = (e) => {
      setCountry(e.target.value);
    }
    const handleState = (e) => {
      setState(e.target.value);
    }
    const handleCity = (e) => {
      setCity(e.target.value);
      setShow(true);
    }

    if (isLoading) {
      return (
        <div className="App">
          <h1>Select Location</h1>
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Select Location</h1>
        <div>
          <select className="select_button" onChange={handleCountry} value={country}>
            <option value="" disabled>Select Country</option>
            {countrydata.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <select className="select_button" onChange={handleState} value={state} disabled={!stateAllow}>
            <option value="" disabled>Select State</option>
            {statedata.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <select className="select_button" onChange={handleCity} value={city} disabled={!cityAllow}>
            <option value="" disabled>Select City</option>
            {citydata.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        {show ? <h2>You selected {city}, {state}, {country}</h2> : null}
      </div>
    );
  }

  export default App;