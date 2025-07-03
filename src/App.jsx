import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Userprofile from './components/Userprofile';
import { UserProvider } from './Context';
import Terms from './components/terms';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import AdminLogin from './components/adminpanel/Adminlogin';
import AdminPanel from './components/adminpanel/AdminPanel';

export default function App() {
  return (
    <div className='bg-gray-300 h-max w-full'>
      <UserProvider>
        <BrowserRouter>
          <React.StrictMode>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/registrationform' element={<Form />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='userprofile/:id' element={<Userprofile />} />
              <Route path='/termsofservices' element={<Terms />}/>
              <Route path='/policy' element={<PrivacyPolicy />}/>
              <Route path='/contact' element={<ContactUs />}/>
              <Route path='/adminlogin' element={<AdminLogin />}/>
              <Route path='/adminpanel' element={<AdminPanel />}/>
            </Routes>
          </React.StrictMode>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
