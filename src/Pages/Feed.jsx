import { Header } from "../Components/Header"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export const Feed = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
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
        <title>InfiniteTalk! - Feed</title>
      </Helmet>
      <div className='h-screen flex flex-col gap-4 justify-center items-center'>
        <p className="text-2xl text-white">FEED</p>
      </div>
    </>

  )
}
