
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';

// import Home from "./Pages/Home"
import Country from './Pages/country';
import City from './Pages/city';
import Signup from './Pages/signup';
import SignInPage from './Pages/signin';
import Home from './Pages/Home';
import CreateAdminForm from './Pages/Dashbourd';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      
   
        <Route path='/' element={<Home />} />
        <Route path='/country/:countryName' element={<Country />}/>
        <Route path='/city' element={<City />} />
        <Route path='Signup' element={<Signup />} />
        <Route path='Signin' element={<SignInPage />} />
        <Route path='dash' element={<CreateAdminForm />} />
      

      
      
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
