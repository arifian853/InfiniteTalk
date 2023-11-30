import { Avatar } from "flowbite-react"
import { Header } from "../Components/Header"
import { Table } from 'flowbite-react';
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

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
                        <Avatar className="m-3" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded bordered size="lg" status="online" statusPosition="top-right" />
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
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Email
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.email}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Username
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.username}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        Program
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.program}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        OTP Enabled
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_enabled ? "Enabled" : "Not Enabled"}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        OTP Enabled
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                        {userState.userInfo.otp_verified ? "Verified" : "Not Verified"}
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
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            ) : (
                <></>
            )}

        </>
    )
}


