import { useState, useEffect } from 'react'
import { Button, Checkbox, Modal } from 'flowbite-react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { userActions } from '../../store/reducers/userReducers'
import { useMutation } from "@tanstack/react-query"
import { signUp } from '../../Services/index/users'

export const SignUp = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  /*Utility states*/
  const [openModal, setOpenModal] = useState('')
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, email, password, fullName, program }) => {
      return signUp({ username, email, password, fullName, program });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      program: ""
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userState.userInfo) {
      const timeoutId = setTimeout(() => {
        navigate('/signin');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);


  const registBtn = (data) => {
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

      <form onSubmit={handleSubmit(registBtn)}>
        <div data-aos="zoom-in" className="text-sm form-light flex flex-col text-left items-left gap-2 p-3">
          <p>Full Name</p>
          <input id="fullName"
            {...register("fullName", {
              minLength: {
                value: 1,
                message: "Your full name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Full name is required",
              },
            })}
            placeholder="Your Name"
            required
            type="text"
          />
          {errors.fullName?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName?.message}
            </p>
          )}
          <p>Email</p>
          <input id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            placeholder="name@email.com"
            required
            type="email"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email?.message}
            </p>
          )}
          <p>Program</p>
          <select
            id="countries"
            required
            {...register("program", { required: "Please select your program" })}
          >
            <option value="" disabled>
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
          {errors.program && (
            <p className="text-red-500 text-xs mt-1">
              {errors.program?.message}
            </p>
          )}
          <p>Username</p>
          <input id="username1"
            placeholder="Your username"
            required
            {...register("username", {
              minLength: {
                value: 1,
                message: "Username length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            type="text"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username?.message}
            </p>
          )}
          <p>Password</p>
          <input id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password length must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[A-Z])/,
                message: "Password must contain at least one number and one capital letter",
              },
            })}
            placeholder="Your Password"
            required
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          )}
          <div className="flex items-center gap-2 py-1">
            <Checkbox id="remember" required />
            <a className='underline cursor-pointer' onClick={() => setOpenModal('default')}>Agree to our Terms of Service</a>
          </div>
          <Button className='disabled:opacity-70 disabled:cursor-not-allowed' type='submit' disabled={!isValid || isLoading}>
            Sign Up
          </Button>
          <div className='text-sm text-center'>
            <p> Already have an account? <Link to='/signin'> <span className='underline'>Login now</span> </Link></p>
            <span onClick={goBack} className='underline cursor-pointer'>Cancel</span>
          </div>
        </div>
      </form>
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
    </div >
  )
}

