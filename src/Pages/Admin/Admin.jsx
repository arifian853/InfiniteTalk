/* eslint-disable react/jsx-key */
import { Header } from "../../Components/Header"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa6";
import { FooterMain } from "../../Components/FooterMain";
import { FaCommentAlt, FaUser } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";

export const Admin = () => {
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
            <div data-aos="zoom-in" className=' flex flex-col gap-4 justify-center items-center md:p-7 p-4'>
                <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800 shadow-lg">
                    <Link className="flex items-center gap-2 justify-start" to='/feed'>
                        <h1 className="text-2xl cursor-pointer"> <FaArrowLeft /></h1>
                        <h1 className="text-2xl"> Admin Page</h1>
                    </Link>
                    <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <ul className="divide-y mt-4 mb-1 divide-gray-200 dark:divide-gray-400">
                        <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-xl font-semibold">Welcome, <span className="text-green-500">{userState.userInfo.fullName}</span></h1> As an admin, you can control user posts and comments, and can see how many users is enrolled. </li>
                    </ul>
                    <h1 className="text-2xl font-semibold my-2"></h1>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-center md:flex-row gap-2 w-full">
                            <button onClick={() => navigate("/admin/posts")}  className="cursor-pointer text-center rounded-lg h-40 w-full md:w-44 bg-slate-700 font-medium text-white flex flex-col items-center justify-center shadow-slate-800 shadow hover:border border-slate-400">
                                <span className="text-4xl"><CgFeed /></span>
                                Manage Posts
                            </button>
                            <button onClick={() => navigate("/admin/comments")} className="cursor-pointer text-center rounded-lg h-40 w-full md:w-44 bg-slate-700 font-medium text-white flex flex-col items-center justify-center shadow-slate-800 shadow hover:border border-slate-400">
                                <span className="text-4xl"><FaCommentAlt /></span>
                                Manage Comments
                            </button>
                            <button onClick={() => navigate("/admin/users")} className="cursor-pointer text-center rounded-lg h-40 w-full md:w-44 bg-slate-700 font-medium text-white flex flex-col items-center justify-center shadow-slate-800 shadow hover:border border-slate-400">
                                <span className="text-4xl"><FaUser /></span>
                                User List
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <FooterMain />
        </>
    )
}
