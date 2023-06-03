import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsForm from './HatsForm';
import ShoesForm from './ShoesForm';
import HatsList from './HatsList';
import ShoesList from './ShoesList';


function App(props) {
  const [ locations, setLocations ] = useState([]);
  const [ bins, setBins ] = useState([]);
  const [ hats, setHats ] = useState([]);
  const [ shoes, setShoes ] = useState([]);

  async function getLocations(){
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);
    if (response.ok){
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  async function getBins(){
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok){
      const data = await response.json();
      setBins(data.bins);
      console.log(data)
    }
  }

  async function loadHats(){
    const response = await fetch('http://localhost:8090/api/hats/')
    console.log(response)
    if (response.ok){
      const data = await response.json();
      setHats(data.hats);
    } else {
      console.error(response);
    }
  }

  async function loadShoes(){
    const response = await fetch('http://localhost:8080/api/shoes/')
    if (response.ok){
      const data = await response.json();
      setShoes(data.shoes);
      console.log(data)
    } else {
      console.error(response);
    }
  }

  useEffect(()=>{
    getLocations();
    getBins();
    loadHats();
    loadShoes();
    console.log("Use effect fired!")
  }, []);


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList shoes={shoes}/>}/>
            <Route path="new" element={<ShoesForm getBins={getBins} bins={bins} />}/>
          </Route>
          <Route path="hats">
            <Route index element={<HatsList hats={hats} />}/>
            <Route path="new" element={<HatsForm hats={hats} getLocations={getLocations}/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
