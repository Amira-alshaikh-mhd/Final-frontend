
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';

// import Home from "./Pages/Home"
import Country from './Pages/country';
import City from './Pages/city';
import Signup from './Pages/signup';
import SignInPage from './Pages/signin';
import Home from './Pages/Home';
import CreateAdminForm from './Pages/Dashbourd';
import Footer from './Pages/Footer';
import Review from './Pages/review';
import BookingComponent from './Pages/booking';
// import Host from './Pages/hosts';
import Place from './Pages/place';
import Hosts from './Pages/hosts';
import Header from './Pages/Header';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      
   
        <Route path='/' element={<Home />} />
        <Route path='/country/:countryName' element={<Country />}/>
        <Route path='/city/:cityId' element={<City />} />
        <Route path='/place/:placeId' element={<Place />} />
        <Route path='Signup' element={<Signup />} />
        <Route path='Signin' element={<SignInPage />} />
        <Route path='dash' element={<CreateAdminForm />} />
        <Route path='footer' element={<Footer />} />
        <Route path='header' element={<Header />} />
        <Route path='review' element={<Review />} />
        <Route path='booking' element={<BookingComponent />} />
        <Route path='/host/:hostId' element={<Hosts />} />


      
      
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
