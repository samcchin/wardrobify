import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsForm from './HatsForm';
import ShoesForm from './ShoesForm';
import HatsList from './HatsList';
import ShoesList from './ShoesList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList />}/>
            <Route path="new" element={<ShoesForm />}/>
          </Route>
          <Route path="hats">
            <Route index element={<HatsList />}/>
            <Route path="new" element={<HatsForm />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
