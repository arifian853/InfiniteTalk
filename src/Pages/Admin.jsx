import { Header } from "../Components/Header"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa6";

export const Admin = () => {
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
    if (userState.userInfo.admin === false) {
      const timeoutId = setTimeout(() => {
        navigate('/feed');
        toast.error("Not an Admin!")
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
        <title>InfiniteTalk! - Admin Page</title>
      </Helmet>
      <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center p-7'>
        <div className="profile-section bg-slate-800">
          <div className="flex items-center gap-2 justify-start">
            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
            <h1 className="text-2xl"> Admin Dashboard</h1>
          </div>
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-400">
            <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-xl font-semibold">Welcome, {userState.userInfo.fullName}</h1> Here you can control some posts and comments </li>
          </ul>
          <br />
        
        </div>

      </div>
    </>
  )
}
