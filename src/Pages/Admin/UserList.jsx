/* eslint-disable react/jsx-key */
import { Header } from "../../Components/Header"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { FooterMain } from "../../Components/FooterMain";
import { getAllUser } from "../../Services/index/users";
import { Spinner, Table } from "flowbite-react";
import stables from "../../Constants/stables";

export const UserList = () => {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);

    const { data: profileData, isLoading, isError, isFetching } = useQuery({
        queryFn: () => {
            return getAllUser({ token: userState.userInfo.token });
        },
        queryKey: ["profile"],
    });

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
                <title>InfiniteTalk! - User List Page</title>
            </Helmet>
            <div data-aos="zoom-in" className=' flex flex-col gap-4 justify-center items-center md:p-7 p-4'>
                <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800 shadow-lg">
                    <div className="flex items-center gap-2 justify-start cursor-pointer" onClick={() => navigate(-1)}>
                        <h1 className="text-2xl"> <FaArrowLeft /></h1>
                        <h1 className="text-2xl"> User Lists</h1>
                    </div>
                    <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <ul className="divide-y mt-4 mb-1 divide-gray-200 dark:divide-gray-400">
                        <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-xl font-semibold">Welcome, <span className="text-green-500">{userState.userInfo.fullName}</span></h1> Users enrolled in InfiniteTalk!</li>
                    </ul>
                    <h1 className="text-2xl font-semibold my-2">Users list</h1>
                    {isLoading || isFetching ? (
                        <span className='flex gap-4'>Loading ... <Spinner size="sm" /></span>
                    ) : isError ? (
                        <p>Error loading data</p>
                    ) : !Array.isArray(profileData) || profileData?.length === 0 ? (
                        <p>No user data</p>
                    ) : (
                        <div className="overflow-auto">
                            <Table>
                                <Table.Body className="divide-y divide-gray-200 rounded-lg">
                                    <Table.Row className="bg-gray-700">
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">

                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Full Name
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Email
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Role
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Program
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Account created
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium capitalize text-white">
                                            Last sign in
                                        </Table.Cell>
                                    </Table.Row>
                                    {profileData.map((profile) => (
                                        <Table.Row className="bg-slate-700">
                                            <Table.Cell key={profile._id} className="  font-medium text-white">
                                                <img
                                                    src={
                                                        profile.avatar
                                                            ? stables.UPLOAD_FOLDER_BASE_URL + profile.avatar
                                                            : "/user.png"
                                                    }
                                                    alt="post profile"
                                                    className="w-20 rounded-full"
                                                />
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className="  whitespace-nowrap font-medium text-white">
                                                {profile.fullName}
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className="  whitespace-nowrap font-medium text-white">
                                                {profile.email}
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className="  whitespace-nowrap font-medium text-white">
                                                {profile.mentor ? "Mentor/Admin" : "Mentee"}
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className=" font-medium text-white">
                                                {profile.program}
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className="font-medium text-white">
                                                {new Intl.DateTimeFormat('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }).format(new Date(profile.createdAt))}
                                            </Table.Cell>
                                            <Table.Cell key={profile._id} className=" font-medium text-white">
                                                {new Intl.DateTimeFormat('en-GB', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: 'numeric',
                                                    hour12: false,
                                                    minute: 'numeric',
                                                    timeZone: 'Asia/Jakarta',
                                                }).format(new Date(profile.lastLogin))}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>

                    )}
                </div>

            </div >
            <FooterMain />
        </>
    )
}
