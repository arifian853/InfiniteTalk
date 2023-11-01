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

function App() {
  useEffect(() => {
    AOS.init();
  })

  return (
    <>
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='*' element={<NotFound />}/>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mentors' element={<MentorPage />} />
        <Route path='/mentors/mentors-signin' element={<MentorSignIn />} />
        <Route path='/mentors/mentors-signup' element={<MentorSignUp />} />

        <Route path='/feed' element={<Feed />} />
      </Routes>
    </>
  )
}

export default App
