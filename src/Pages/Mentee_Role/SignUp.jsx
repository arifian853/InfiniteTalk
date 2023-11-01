import { useState } from 'react'
import { Alert, Button, Checkbox, Modal } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { HiInformationCircle } from 'react-icons/hi'

import axios from 'axios';

export const SignUp = () => {
  /*Signin states*/
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  /*Utility states*/
  const [alert, setAlert] = useState('')
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState('')

  const changeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError('')
  }

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError('')
  }

  const changeFullName = (e) => {
    const value = e.target.value;
    setFullName(value);
    setError('')
  }

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError('')
  }

  const changeProgram = (e) => {
    const value = e.target.value;
    setProgram(value);
    setError('')
  }

  const registBtn = () => {
    const data = {
      username: username,
      email: email,
      fullName: fullName,
      password: password,
      program: program,
      accountRole: 'Mentee'
    }
    axios.post('http://localhost:7777/user/register', data)
      .then(result => {
        if (result) {
          if (result.data) {
            setUsername('')
            setEmail('')
            setPassword('')
            setAlert(result.data.message)
            setTimeout(() => {
              setAlert('')
              window.location.href = '/signin'
            }, 2000)
          }
        }
      })
      .catch(e => {
        setError(e.response.data.message)
        setTimeout(() => {
          setError('')
        }, 7000)
      })
  }

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }


  return (
    <div className="forms flex flex-col justify-center items-center gap-4">
      <h1 className='text-3xl font-semibold'>Sign up to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
      <p>Welcome, new Mentee!</p>
      <Helmet>
        <title>InfiniteTalk! - Sign Up</title>
      </Helmet>
      <div data-aos="zoom-in" className="text-sm form-light flex flex-col text-left items-left gap-2 p-3">
        {
          error && (
            <Alert
              color="failure"
              icon={HiInformationCircle}
            >
              <span>
                <p>
                  <span className="font-medium">
                    {error}
                  </span>

                </p>
              </span>
            </Alert>
          )
        }
        {
          alert && (
            <Alert
              color="success"
              icon={HiInformationCircle}
            >
              <span>
                <p>
                  <span className="font-medium">
                    {alert}
                  </span>

                </p>
              </span>
            </Alert>
          )
        }
        <p>Full Name</p>
        <input id="name1"
          placeholder="John Doe"
          required
          type="text"
          value={fullName}
          onChange={changeFullName} />
        <p>Email</p>
        <input id="email1"
          placeholder="name@flowbite.com"
          required
          type="email"
          value={email}
          onChange={changeEmail} />
        <p>Program</p>
        <select
          id="countries"
          required
          value={program}
          onChange={changeProgram}
        >
           <option>
            Choose your program
          </option>
          <option value='Hybrid Cloud & AI'>
            Hybrid Cloud & AI
          </option>
          <option value='Web Developement'>
            Web Development
          </option>
          <option value='Mobile Developement'>
            Mobile Development
          </option>
          <option value='Game Developement'>
            Game Development
          </option>
        </select>
        <p>Username</p>
        <input id="username1"
          placeholder="Your username"
          required
          type="text"
          value={username}
          onChange={changeUsername} />
        <p>Password</p>
        <input id="password1"
          placeholder="Your Password"
          required
          type="password"
          value={password}
          onChange={changePassword} />
        <div className="flex items-center gap-2 py-1">
          <Checkbox id="remember" />
          <a className='underline cursor-pointer' onClick={() => setOpenModal('default')}>Agree to our Terms of Service</a>
        </div>
        <Button onClick={registBtn}>
          Sign Up
        </Button>
        <div className='text-sm text-center'>
          <p> Already have an account? <Link to='/signin'> <span className='underline'>Login now</span> </Link></p>
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
