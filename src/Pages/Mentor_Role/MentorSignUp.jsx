import { useState } from 'react';
import { Button, Checkbox, Modal } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const MentorSignUp = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  const [openModal, setOpenModal] = useState('')

  return (
    <div className="forms flex flex-col justify-center items-center gap-4">
      <h1 className='text-3xl font-semibold'>Sign up to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
      <p>Welcome, <b>new Mentors!</b></p>
      <Helmet>
        <title>InfiniteTalk! - Mentors Sign Up</title>
      </Helmet>
      <div data-aos="zoom-in" className="text-sm form-light flex flex-col text-left items-left gap-2 p-3">
        <p>Full Name</p>
        <input type="text" />
        <p>Email</p>
        <input type="email" />
        <p>Program</p>
        <select
          id="countries"
          required
        >
          <option>
            Hybrid Cloud & AI
          </option>
          <option>
            Web Development
          </option>
          <option>
            Mobile Development
          </option>
          <option>
            Game Development
          </option>
        </select>
        <p>Username</p>
        <input type="text" />
        <p>Password</p>
        <input type="password" name="" id="" />
        <div className="flex items-center gap-2 py-1">
          <Checkbox id="remember" />
          <a className='underline cursor-pointer' onClick={() => setOpenModal('default')}>Agree to our Terms of Service</a>
        </div>
        <Button>
          Sign Up
        </Button>
        <div className='text-sm text-center'>
          <p> Already have an account? <Link to='/mentors/mentors-signin'> <span className='underline'>Login now</span> </Link></p>
          <span onClick={goBack} className='underline cursor-pointer'>Cancel</span>
        </div>
      </div>
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
        <div data-aos="zoom-in" data-aos-duration="200">
          <Modal.Header className='modal-title'> <h1 className='modal-title'>Terms of Service</h1></Modal.Header>
          <Modal.Body className='modal-body'>
            <div className="space-y-6">
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta commodi id, quasi numquam quae esse optio nisi quo expedita sapiente.
              </p>
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae expedita aut maiores modi nesciunt vitae nihil eum sunt a tempore neque est, odit delectus rem unde veniam error consequatur earum.
              </p>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  )
}
