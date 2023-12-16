import { Avatar, Button } from "flowbite-react"
import { Header } from "../Components/Header"
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Tooltip } from 'flowbite-react';
import stables from "../Constants/stables";
import { Helmet } from "react-helmet";
import { DisableTOTP } from "../Components/DisableTOTP";
import { ActivateTOTP } from "../Components/ActivateTOTP";

export const Profile = () => {
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
                <title>InfiniteTalk! - {userState.userInfo.username}&rsquo;s Profile</title>
            </Helmet>
            {userState.userInfo ? (
                <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center md:p-7 p-4'>
                    <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800">
                        <div className="flex items-center gap-2 justify-start">
                            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
                            <h1 className="text-2xl"> {userState.userInfo.mentor ? "Mentor" : "Mentee"} Profile</h1>
                        </div>
                        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                        <Avatar className="m-3" alt="User settings" img={
                            userState.userInfo.avatar
                                ? stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar
                                : "user.png"
                        } rounded bordered size="lg" status="online" statusPosition="top-right" />
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="w-full p-2 bg-slate-700 rounded-lg text-center"> <h1 className="text-2xl font-semibold">{userState.userInfo.fullName}</h1> {userState.userInfo.mentor ? <p className="text-green-300 font-semibold">Mentor @ {userState.userInfo.program}</p> : <p className="text-blue-300 font-semibold">Mentee @ {userState.userInfo.program}</p>}</li>
                        </ul>
                        <br />

                        <div className="flex flex-col justify-center items-center">

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 rounded-t-lg border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Full Name</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">{userState.userInfo.fullName}</p>
                                <div className="grow">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Email</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">{userState.userInfo.email}</p>
                                <div className="grow">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Username</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">{userState.userInfo.username}</p>
                                <div className="grow">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Program</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">{userState.userInfo.program}</p>
                                <div className="grow">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Last Sign In</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">
                                    {new Intl.DateTimeFormat('en-GB', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        hour12: false,
                                        minute: 'numeric',
                                        timeZone: 'Asia/Jakarta',
                                    }).format(new Date(userState.userInfo.lastLogin))}
                                </p>
                                <div className="grow">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">Member since</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">
                                    {new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(new Date(userState.userInfo.createdAt))}
                                </p>
                                <div className="grow">

                                </div>
                            </div>


                            {
                                userState?.userInfo?.admin && (
                                    <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 border-b border-gray-300">
                                        <p className="grow font-semibold text-sm text-white md:w-32 w-full">Admin</p>
                                        <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full">{userState.userInfo.admin ? "True" : "False"}</p>
                                        <div className="grow">

                                        </div>
                                    </div>
                                )
                            }

                            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-6 py-4 rounded-b-lg">
                                <p className="grow font-semibold text-sm text-white md:w-32 w-full">OTP Enabled</p>
                                <p className="grow font-semibold text-sm md:text-left text-center text-white md:w-32 w-full"> {userState.userInfo.otp_enabled ? <Tooltip content="OTP is enabled, your account is safer now."><DisableTOTP /></Tooltip> : <Tooltip content="OTP is disabled, your account is not safe, please enable OTP."><ActivateTOTP /></Tooltip>}</p>
                                <div className="grow">
                                  
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-center items-center">
                            <Link to='/profile-settings'>
                                <Button className='btn-dark-md mt-4'>
                                    Edit profile data
                                </Button>
                            </Link>
                        </div>

                    </div>

                </div>
            ) : (
                <></>
            )}

        </>
    )
}


