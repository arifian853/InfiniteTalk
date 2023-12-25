import { useState, useEffect } from 'react'
import { Button, Checkbox, Modal, Spinner } from 'flowbite-react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { userActions } from '../../store/reducers/userReducers'
import { useMutation } from "@tanstack/react-query"
import { signInMentor } from '../../Services/index/users'

export const MentorSignIn = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  /*Utility states*/
  const [openModal, setOpenModal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useMutation({
    mutationFn: ({ email, password }) => {
      setIsLoading(true)
      return signInMentor({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success(data.message)
      setIsLoading(false)
    },
    onError: (error) => {
      setIsLoading(false)
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
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userState.userInfo) {
      if (userState.userInfo.otp_enabled === false) {
        navigate('/feed');
      } else if (userState.userInfo.otp_enabled === true) {
        navigate('/otp');
      }
    }
  }, [userState.userInfo, navigate]);

  const loginBtn = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="forms flex flex-col justify-center items-center gap-4">
      <h1 className='text-3xl font-semibold'>Sign in to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
      <p>Welcome back, Mentor!</p>
      <Helmet>
        <title>InfiniteTalk! - Sign In Mentor</title>
      </Helmet>

      <form onSubmit={handleSubmit(loginBtn)}>
        <div data-aos="zoom-in" className="text-sm form-light flex flex-col text-left items-left gap-2 p-3">
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
          <Button
            className='disabled:opacity-70 disabled:cursor-not-allowed'
            type='submit'
            disabled={!isValid || isLoading}
          >
            {isLoading ? <span className='flex gap-2'>Signing in ... <Spinner size="sm" /></span> : 'Sign In'}

          </Button>
          <div className='text-sm text-center'>
            <p> Doesn&rsquo;t have an account? <Link to='/signup-mentor'> <span className='underline'>Register now</span> </Link></p>
            <span onClick={goBack} className='underline cursor-pointer'>Cancel</span>
          </div>
        </div>
      </form>
      <Modal data-aos="fade-in" data-aos-duration="200" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
        <Modal.Header className='modal-title'> <h1 className='modal-title'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> Terms of Service</h1></Modal.Header>
        <Modal.Body className='modal-body'>
          <div className="text-justify">
            <h1 className='text-xl font-semibold'>Terms of Service for InfiniteTalk</h1>
            <p>Last Updated: [17/12/2023]</p>
            <br />
            <p>Welcome to InfiniteTalk! A place for Mentors and Mentees to connect and grow. We&rsquo;re excited to have you on board. Before you start your journey with InfiniteTalk, please read and understand our Terms of Service. By using InfiniteTalk, you agree to comply with and be bound by the following terms and conditions:</p>
            <br />
            <h2 className='font-semibold'>1. Acceptance of Terms</h2>
            <p>By accessing or using InfiniteTalk, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.</p>
            <br />
            <h2 className='font-semibold'>2. Prohibited Content</h2>
            <p>You agree not to use InfiniteTalk for any purpose that is prohibited by these terms. This includes, but is not limited to:
              <ul className='pl-5 list-disc'>
                <li><strong>No Politics:</strong> Users are prohibited from engaging in political discussions or promoting political content.</li>
                <li><strong>No Hate Speech:</strong> Content that promotes discrimination, hostility, or violence against individuals or groups based on attributes such as ethnicity, religion, race, or societal affiliations is strictly prohibited.</li>
                <li><strong>No Discrimination:</strong> Users are not allowed to engage in or promote discriminatory practices on the basis of characteristics such as race, ethnicity, religion, or social background.</li>
                <li><strong>No Pornography:</strong> Any sexually explicit or pornographic material is not allowed.</li>
                <li><strong>No Fake Accounts:</strong> Users are not permitted to create fake or misleading accounts.</li>
                <li><strong>No Misinformation:</strong> Disseminating false or misleading information is strictly prohibited.</li>
                <li><strong>No Fake News:</strong> Users must not spread fake news or fabricated information.</li>
                <li><strong>No Swearing or Profanity:</strong> The use of offensive language, swearing, or profanity is not allowed.</li>
              </ul>
            </p>
            <br />
            <h2 className='font-semibold'>3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your InfiniteTalk account and password. If you suspect any unauthorized use of your account, please notify us immediately.</p>
            <br />
            <h2 className='font-semibold'>4. Unauthorized Disclosure of Personal Information</h2>
            <p>Engaging in the unauthorized disclosure of personal information about individuals (commonly known as &rsquo;doxxing&rsquo;) in InfiniteTalk! environment is strictly prohibited.</p>
            <br />
            <h2 className='font-semibold'>5. Consequences of Violations</h2>
            <p>Violation of these terms may result in the termination of your InfiniteTalk account or other actions deemed necessary by the InfiniteTalk team. We reserve the right to remove any content that violates these terms.</p>
            <br />
            <h2 className='font-semibold'>6. Changes to Terms</h2>
            <p>InfiniteTalk reserves the right to modify or revise these terms at any time. We will notify users of any significant changes.</p>
            <br />
            <h2 className='font-semibold'>7. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of Republic of Indonesia.</p>
            <br />
            <p>By using InfiniteTalk, you agree to abide by these terms. If you have any questions or concerns, please contact us at :
              <br />
              <br />
              <a className='underline' href="mailto:arifiansaputra43@gmail.com">arifiansaputra43@gmail.com</a>
              <br />
              <a className='underline' href="mailto:samuelmiskan@gmail.com">samuelmiskan@gmail.com</a>
            </p>
            <br />
            <p>Thank you for being a part of InfiniteTalk! A place for Mentors and Mentees to connect and grow.</p>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  )
}

