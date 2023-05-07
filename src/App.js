import './App.css';
import './index.css'
import {Routes,Route} from 'react-router-dom'
import PartnerLoginpage from './Pages/Partner/PartnerLoginPage';

import { ToastContainer, toast } from 'react-toastify';
import Login from './Pages/User/Login';
import Home from './Pages/User/Home';
import {UserContext, UserProvider} from './Context/UserContext'
import Registration from './Pages/User/Registration';
import PartnerRegPage from './Pages/Partner/PartnerRegPage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import PartnerHome from './Pages/Partner/PartnerHome';
import { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminHome from './Pages/Admin/AdminHome';
import ChatPage from './Pages/User/ChatPage';
import ListView from './Pages/User/ListView';
import TurfView from './Pages/User/TurfView';
import ApproveTurfPage from './Pages/Admin/ApproveTurfPage';
import UsersList from './Pages/Admin/UsersList';
import BookingPage from './Pages/User/BookingPage';
import AdminBookingsView from './Pages/Admin/AdminBookingsView';
import BookingViewTurf from './Pages/Partner/BookingViewTurf';
import { TurfProvider } from './Context/TurfContext';
import ShowBookings from './Pages/User/ShowBookings';
import EarningsPage from './Pages/Partner/EarningsPage';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="892466016773-cf1ccscpnij2q9bes9684vb1erd186ov.apps.googleusercontent.com">
      <UserProvider >
        <TurfProvider>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='/admin' element={<AdminLoginPage/>}/>
        <Route path='/list' element={<h1>List</h1>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/turf-list' element ={<ListView/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/booking-user' element={<BookingPage/>}/>
        <Route path='/partner_login' element ={<PartnerLoginpage/>}></Route>
        <Route path='/partner-reg' element = {<PartnerRegPage/>}></Route>
        <Route path='/partner-home' element = {<PartnerHome/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/chat' element={<ChatPage/>}></Route>
        <Route path='/approve-turf' element={<ApproveTurfPage/>}></Route>
        <Route path='/view-turf/:id' element={<TurfView/>}></Route>
        <Route path='/users' element={<UsersList/>}/>
        <Route path = '/admin-bookings' element ={<AdminBookingsView/>}/>
        <Route path = '/partner-bookings' element = {<BookingViewTurf/>}/>
        <Route path = '/user-bookings' element={<ShowBookings/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
        <Route path='/earnings/:id' element={<EarningsPage/>}/>
      </Routes>
      </TurfProvider>
      </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
