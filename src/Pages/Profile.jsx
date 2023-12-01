import { Avatar, Button } from "flowbite-react"
import { Header } from "../Components/Header"
import { Table } from 'flowbite-react';
import { useSelector } from "react-redux";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { Tooltip } from 'flowbite-react';
import stables from "../Constants/stables";

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
    return (
        <>
            <Header />
            {userState.userInfo ? (
                <div className='flex flex-col gap-4 justify-center items-center p-7'>
                    <div className="profile-section bg-slate-800">
                        <div className="flex items-center gap-2 justify-start">
                            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
                            <h1 className="text-2xl"> {userState.userInfo.mentor ? "Mentor" : "Mentee"} Profile</h1>
                        </div>
                        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                        <Avatar className="m-3" alt="User settings" img={stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar} rounded bordered size="lg" status="online" statusPosition="top-right" />
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="w-full p-2 bg-slate-700 rounded-lg text-center"> <h1 className="text-2xl font-semibold">{userState.userInfo.fullName}</h1> {userState.userInfo.mentor ? "Mentor" : "Mentee"} @ {userState.userInfo.program}</li>
                        </ul>
                        <br />
                        <Table>
                            <Table.Body className="divide-y divide-gray-200 dark:divide-gray-400">
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Full Name
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.fullName}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Email
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.email}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Username
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.username}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Program
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.program}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Last Sign In
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {new Intl.DateTimeFormat('en-US', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            hour12: false,
                                            minute: 'numeric',
                                            timeZone: 'Asia/Jakarta',
                                        }).format(new Date(userState.userInfo.lastLogin))}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                    </Table.Cell>
                                </Table.Row>
                                {
                                    userState?.userInfo?.admin && (
                                        <Table.Row>
                                            <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                                Admin
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                                {userState.userInfo.admin ? "True" : "False"}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        OTP Enabled
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_enabled ? "Enabled" : "Not Enabled"}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_enabled ? <p className="text-2xl text-green-500"><Tooltip content="OTP is enabled, your account is safer now."><FaCheck className="cursor-pointer" /></Tooltip></p> : <p className="text-2xl text-yellow-500"><Tooltip content="OTP is disabled, your account is not safe, please enable OTP."><MdErrorOutline className="cursor-pointer" /></Tooltip></p>}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        OTP Verified
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_verified ? "Verified" : "Not Verified"}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_verified ? <p className="text-2xl text-green-500"><Tooltip content="OTP is verified, your account is safer now."><FaCheck className="cursor-pointer" /></Tooltip></p> : <p className="text-2xl text-yellow-500"><Tooltip content="OTP is not verified, your account is not safe, please verify OTP."><MdErrorOutline className="cursor-pointer" /></Tooltip></p>}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
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


