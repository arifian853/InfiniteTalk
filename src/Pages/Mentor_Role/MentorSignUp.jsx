import { useState, useEffect } from 'react'
import { Alert, Button, Checkbox, Modal, Spinner } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { HiInformationCircle } from 'react-icons/hi'

import { useDispatch, useSelector } from "react-redux"
import { userActions } from '../../store/reducers/userReducers'
import { useMutation } from "@tanstack/react-query"
import { signUp } from '../../Services/index/users'

export const MentorSignUp = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  /*Utility states*/
  const [alert, setAlert] = useState('')
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState('')
  const [loading, setLoading] = useState(false)


  const { mutate } = useMutation({
    mutationFn: ({ username, email, password, fullName, program }) => {
      return signUp({ username, email, password, fullName, program });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      setAlert("Login succedeed!")
    },
    onError: (error) => {
      setError(error.message)
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      const timeoutId = setTimeout(() => {
        navigate('/mentors/mentors-signin');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);


  const registBtn = (data) => {
    setLoading(true);
    const { username, email, password, fullName, program } = data;
    mutate({ username, email, password, fullName, program });
  }

  const goBack = () => {
    navigate(-1)
  }


  return (
    <div className="forms flex flex-col justify-center items-center gap-4">
      <h1 className='text-3xl font-semibold'>Sign up to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
      <p>Welcome, new Mentor!</p>
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
        />
        <p>Email</p>
        <input id="email1"
          placeholder="name@flowbite.com"
          required
          type="email"
        />
        <p>Program</p>
        <select
          id="countries"
          required

        >
          <option>
            Choose your program
          </option>
          <option value='Hybrid Cloud & AI'>
            Hybrid Cloud & AI
          </option>
          <option value='Web Development'>
            Web Development
          </option>
          <option value='Mobile Development'>
            Mobile Development
          </option>
          <option value='Game Development'>
            Game Development
          </option>
        </select>
        <p>Username</p>
        <input id="username1"
          placeholder="Your username"
          required
          type="text"
        />
        <p>Password</p>
        <input id="password1"
          placeholder="Your Password"
          required
          type="password"
        />
        <div className="flex items-center gap-2 py-1">
          <Checkbox id="remember" />
          <a className='underline cursor-pointer' onClick={() => setOpenModal('default')}>Agree to our Terms of Service</a>
        </div>
        <Button disabled={loading} type='submit' onClick={registBtn}>
          {loading ? <span className='flex flex-row gap-2 items-center justify-center'>Sign Up <Spinner color="success" aria-label="Loader" size="xs" /></span> : 'Sign Up'}
        </Button>
        <div className='text-sm text-center'>
          <p> Already have an account? <Link to='/mentors-signin'> <span className='underline'>Login now</span> </Link></p>
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

