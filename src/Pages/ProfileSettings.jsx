import { Button, Modal } from "flowbite-react"
import { Header } from "../Components/Header"
import { Table } from 'flowbite-react';
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateTOTP, getUserProfile, updateProfile } from "../Services/index/users";
import { useMemo } from "react";
import { userActions } from "../store/reducers/userReducers";
import { MdErrorOutline } from "react-icons/md";
import { ProfilePicture } from "../Components/ProfilePicture";
import QRCode from "qrcode";

export const ProfileSettings = () => {
    const [openModal, setOpenModal] = useState('')
    const [qrcodeUrl, setqrCodeUrl] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const goBack = () => {
        navigate(-1)
    }
    useEffect(() => {
        QRCode.toDataURL(userState.userInfo.otp_auth_url).then(setqrCodeUrl);
    }, [userState.userInfo.otp_auth_url]);

    useEffect(() => {
        if (!userState.userInfo) {
            const timeoutId = setTimeout(() => {
                navigate('/');
                toast.error("Not authenticated! Login first.")
            }, 50);
            return () => clearTimeout(timeoutId);
        }
    }, [userState.userInfo, navigate]);

    const { data: profileData, isLoading: profileIsLoading } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.userInfo.token });
        },
        queryKey: ["profile"],
    });
    const { mutate, isLoading: updateProfileIsLoading } = useMutation({
        mutationFn: ({ fullName, email, username, password }) => {
            return updateProfile({
                token: userState.userInfo.token,
                userData: { fullName, email, username, password },
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile is updated");
        },
        onError: (error) => {
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
            fullName: userState.userInfo?.fullName,
            email: userState.userInfo?.email,
            username: userState.userInfo?.username,
            password: null,
        },
        values: useMemo(() => {
            return {
                fullName: profileIsLoading ? "" : profileData.fullName,
                email: profileIsLoading ? "" : profileData.email,
                username: profileIsLoading ? "" : profileData.username,
            };
        }, [profileData?.email, profileData?.fullName, profileData?.username, profileIsLoading]),
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { fullName, email, username, password } = data;
        mutate({ fullName, email, username, password });
    };

    const generateOtpBtn = () => {
        generateTOTP({
            token: userState.userInfo.token,
        });
        setOpenModal('default')
    }



    return (
        <>
            <Header />
            {userState.userInfo ? (
                <div className='flex flex-col gap-4 justify-center items-center p-7'>
                    <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                        <div data-aos="zoom-in" data-aos-duration="200">
                            <Modal.Header className='modal-title'> <h1 className='modal-title'>Activate TOTP (Time-based OTP)</h1> </Modal.Header>
                            <Modal.Body className='modal-body'>
                                <div className="space-y-6 divide-y">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <p className="text-center">Scan this QR Code or paste the Base32 Secret to the Authenticator App.</p>

                                        <img
                                            className="block w-64 h-64 object-contain"
                                            src={qrcodeUrl}
                                            alt="qrcode url"
                                        />
                                        <p className="text-center">Base32 Secret : {userState.userInfo.otp_base32}</p>
                                    </div>
                                    <div className="p-4 w-full flex flex-col justify-center items-center gap-2">
                                        Verify the code in your Authenticator App here
                                        <input className="rounded-md py-2 px-3 text-slate-800 md:w-1/2 w-full text-center" type="number" max="999999" min="0" />
                                        <Button className="btn-dark w-32 h-10">
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                    </Modal>
                    <div className="profile-section bg-slate-800">
                        <div className="flex items-center gap-2 justify-start">
                            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
                            <h1 className="text-2xl"> {userState.userInfo.mentor ? "Mentor" : "Mentee"} Profile Settings</h1>
                        </div>
                        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                        {/* <Avatar className="m-3" alt="User settings" img={profileData?.avatar} rounded bordered size="lg" status="online" statusPosition="top-right" /> */}
                        <div className="flex items-center flex-row justify-center"><ProfilePicture avatar={profileData?.avatar} /></div>
                        <p className="text-xs text-center p-2">*Max 1MB</p>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="w-full p-2 bg-slate-700 rounded-lg text-center"> Update data and profile picture</li>
                        </ul>
                        <form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
                            <Table>
                                <Table.Body className="divide-y divide-gray-200 dark:divide-gray-400">
                                    <Table.Row>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            Full Name
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            <input
                                                className="rounded-md py-2 px-3 text-slate-800 md:w-1/2 w-full"
                                                id="fullName"
                                                {...register("fullName", {
                                                    minLength: {
                                                        value: 1,
                                                        message: "Your full name length must be at least 1 character",
                                                    },
                                                    required: {
                                                        value: true,
                                                        message: "Full name is required",
                                                    },
                                                })}
                                                placeholder="Enter your new name"
                                                required
                                                type="text"
                                            />
                                            {errors.fullName?.message && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.fullName?.message}
                                                </p>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            Email
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            <input
                                                className="rounded-md py-2 px-3 text-slate-800 md:w-1/2 w-full"
                                                id="email"
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
                                                placeholder="Enter your new email"
                                                required
                                                type="email"
                                            />
                                            {errors.email?.message && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.email?.message}
                                                </p>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            Username
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            <input
                                                className="rounded-md py-2 px-3 text-slate-800 md:w-1/2 w-full"
                                                id="username"
                                                placeholder="Enter your new username"
                                                required
                                                {...register("username", {
                                                    minLength: {
                                                        value: 1,
                                                        message: "Username length must be at least 1 character",
                                                    },
                                                    required: {
                                                        value: true,
                                                        message: "Username is required",
                                                    },
                                                })}
                                                type="text"
                                            />
                                            {errors.username && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.username?.message}
                                                </p>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            Password
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            <input
                                                className="rounded-md py-2 px-3 text-slate-800 md:w-1/2 w-full"
                                                id="password"
                                                {...register("password", {
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password length must be at least 8 characters",
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*\d)(?=.*[A-Z])/,
                                                        message: "Password must contain at least one number and one capital letter",
                                                    },
                                                })}
                                                placeholder="Enter your new password"
                                                type="password"
                                            />
                                            {errors.password && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.password?.message}
                                                </p>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                                            OTP Authentication
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">

                                            {userState.userInfo.otp_enabled ? <Button className='btn-dark-md'> Disable OTP <FaCheck /> </Button> : <Button className='btn-dark-md' onClick={generateOtpBtn}> Enable OTP <MdErrorOutline /> </Button>}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div className="flex justify-center items-center">
                                <Button className='btn-dark-md mt-4' type="submit" disabled={!isValid || profileIsLoading || updateProfileIsLoading}>
                                    Update profile
                                </Button>
                            </div>

                        </form>

                    </div>
                </div>
            ) : (
                <></>
            )}

        </>
    )

}


