import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

import { LandingPage } from './Pages/LandingPage'
import { NotFound } from './Pages/NotFound'

//Mentee Role Components
import { SignIn } from './Pages/Mentee_Role/SignIn'
import { SignUp } from './Pages/Mentee_Role/SignUp'

//Mentor Role Components
import { MentorPage } from './Pages/Mentor_Role/MentorPage';
import { MentorSignIn } from './Pages/Mentor_Role/MentorSignIn' 
import { MentorSignUp } from './Pages/Mentor_Role/MentorSignUp' 

//AOS Animation
import AOS from 'aos'
import 'aos/dist/aos.css' 
import { Feed } from './Pages/Feed';
import { MenteePage } from './Pages/Mentee_Role/MenteePage';
import { Toaster } from 'react-hot-toast';
import { About } from './Pages/About';
import { Admin } from './Pages/Admin';
import { Profile } from './Pages/Profile';
import { ProfileSettings } from './Pages/ProfileSettings';
import { ValidateTOTP } from './Pages/ValidateTOTP';

function App() {
  useEffect(() => {
    AOS.init();
  })

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' exact element={<LandingPage />} />

        <Route path='*' element={<NotFound />}/>

        <Route path='/signin' element={<SignIn />} />

        <Route path='/signup' element={<SignUp />} />

        <Route path='/mentors' element={<MentorPage />} />
        
        <Route path='/mentees' element={<MenteePage />} />

        <Route path='/signin-mentor' element={<MentorSignIn />} />

        <Route path='/signup-mentor' element={<MentorSignUp />} />

        <Route path='/feed' element={<Feed />} />

        <Route path='/about' element={<About />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/profile-settings' element={<ProfileSettings />} />

        <Route path='/admin' element={<Admin />} />

        <Route path='/otp' element={<ValidateTOTP />} />

      </Routes>
    </>
  )
}

export default App
