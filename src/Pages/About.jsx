import { Header } from "../Components/Header"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { FooterMain } from "../Components/FooterMain";

export const About = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (!userState.userInfo) {
      const timeoutId = setTimeout(() => {
        navigate('/');
        toast.error("Not authenticated! Login first.")
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);

  useEffect(() => {
    if (!userState.userInfo.otp_valid && userState.userInfo.otp_enabled === true) {
      const timeoutId = setTimeout(() => {
        navigate('/otp');
        toast.error("OTP Not Authenticated.")
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);
  return (
    <>
      <Header />
      <Helmet>
        <title>InfiniteTalk! - Project About</title>
      </Helmet>
      <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center px-5 md:px-7 my-7 w-full'>
        <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800 shadow-lg">
          <div className="flex items-center gap-2 justify-start">
            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
            <h1 className="text-2xl"> About Project</h1>
          </div>
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-400">
            <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-3xl font-semibold"><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> v1.0</h1> <p>A place for Mentors and Mentees <b className="text-blue-400">connect</b> and <b className="text-green-400">grow</b>!</p> </li>
          </ul>
          <br />

          <div className="w-full bg-slate-700 rounded-lg p-5">
            <p className="text-justify">
              <span className="font-semibold">InfiniteTalk!</span> A place for mentors and mentees to <b className="text-blue-400">connect</b> and <b className="text-green-400">grow</b>!
              This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other&rsquo;s posts to help or share information!
            </p>

            <br />
            <p className="font-semibold">Core features : </p>
            <ul className="pl-4 list-decimal">
              <li>Create, delete, edit, posts</li>
              <li>Create, delete, edit, reply comments</li>
              <li>Secure sign in with TOTP Function</li>
              <li>Admin page for controlling all user posts</li>
              <li>Mentee or Mentor + Admin Role</li>
            </ul>

            <br />
            <p className="font-semibold">Dev Teams & Information</p>
            <ul className="pl-4 list-decimal">
              <li>Hacker : <a className="underline" href="https://arifian853.vercel.app" target="_blank" rel="noreferrer noopener">Arifian Saputra</a> (2001020029)</li>
              <li>Hipster :  <a className="underline" href="https://tpa-4.vercel.app/" target="_blank" rel="noreferrer noopener">Samuel Miskan Hanock</a> (2001020037)</li>
              <li>University :  <a className="underline" href="https://umrah.ac.id" target="_blank" rel="noreferrer noopener">Universitas Maritim Raja Ali Haji</a> (UMRAH)</li>
              <li>Program :  Intern Project @ <a className="text-green-400 underline" href="https://infinitelearning.id" target="_blank" rel="noreferrer noopener">Infinite Learning</a></li>
            </ul>
            <br />

            <hr className="w-full h-px my-2 bg-gray-400 border-0" />
            <div className="flex flex-col md:flex-row justify-center items center">

              <div className="mt-2 w-full">
                <p className="font-semibold">Front - End Tech Stack</p>
                <p>A. UI</p>
                <ul className="pl-4 list-disc">
                  <li>React + Vite</li>
                  <li>Tailwind CSS</li>
                  <li>Flowbite React</li>
                  <li>AOS Animation</li>
                  <li>React Hot Toast</li>
                </ul>
                <br />
                <p>B. Data Management</p>
                <ul className="pl-4 list-disc">
                  <li>React-Redux</li>
                  <li>Redux Toolkit</li>
                  <li>Tanstack React-Query</li>
                  <li>Axios</li>
                </ul>
              </div>

              <div className="mt-2 w-full">
                <p className="font-semibold">Back - End Tech Stack</p>
                <p>A. Server</p>
                <ul className="pl-4 list-disc">
                  <li>Express</li>
                  <li>NodeJS</li>
                </ul>
                <br />
                <p>B. Security</p>
                <ul className="pl-4 list-disc">
                  <li>BcryptJS</li>
                  <li>JSONWebtoken</li>
                  <li>OTPAuth</li>
                  <li>CORS</li>
                </ul>
                <br />
                <p>C. Database + Tools</p>
                <ul className="pl-4 list-disc">
                  <li>MongoDB</li>
                  <li>MongoDB Compass</li>
                  <li>Postman</li>
                </ul>
              </div>

            </div>
            <hr className="w-full h-px my-2 bg-gray-400 border-0" />
            <Link to='/tos'>
              <p className="text-center"> <span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> Terms of Service</p>
            </Link>
          </div>
        </div>
      </div>
      <FooterMain />
    </>
  )
}
