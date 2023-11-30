import { Header } from "../Components/Header"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

    return (
        <>
            <Header />
            <div className='h-screen flex flex-col gap-4 justify-center items-center'>
            <p className="text-2xl text-white">FEED</p>
            </div>
        </>

    )
}
