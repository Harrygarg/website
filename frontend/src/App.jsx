import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './Context/UserContext'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'

// Footer pages
import HelpCentre from './pages/HelpCentre'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import SafetyInfo from './pages/SafetyInfo'
import Accessibility from './pages/Accessibility'
import CancellationOptions from './pages/CancellationOptions'
import Sitemap from './pages/Sitemap'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  let {userData} = useContext(userDataContext)
 
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/listingpage1' 
      element={userData != null ? <ListingPage1/>:<Navigate to={"/login"}/>}/>
      <Route path='/listingpage2' 
      element={userData != null ? <ListingPage2/>:<Navigate to={"/login"}/>}/>
      <Route path='/listingpage3'
       element={userData != null ? <ListingPage3/>:<Navigate to={"/login"}/>}/>
      <Route path='/mylisting'
       element={userData != null ? <MyListing/>:<Navigate to={"/login"}/>}/>
       {/* ViewCard accessible to all - can browse without login */}
        <Route path='/viewcard' element={<ViewCard/>}/>
         <Route path='/mybooking'
       element={userData != null ? <MyBooking/>:<Navigate to={"/login"}/>}/>
       <Route path='/booked'
       element={userData != null ? <Booked/>:<Navigate to={"/login"}/>}/>
      
      {/* Footer pages - accessible to all */}
      <Route path='/help' element={<HelpCentre/>}/>
      <Route path='/privacy' element={<PrivacyPolicy/>}/>
      <Route path='/terms' element={<Terms/>}/>
      <Route path='/safety' element={<SafetyInfo/>}/>
      <Route path='/accessibility' element={<Accessibility/>}/>
      <Route path='/cancellation' element={<CancellationOptions/>}/>
      <Route path='/sitemap' element={<Sitemap/>}/>

      {/* Admin Dashboard */}
      <Route path='/admin' element={userData != null ? <AdminDashboard/>:<Navigate to={"/login"}/>}/>

    </Routes>
    </>
  )
}

export default App
