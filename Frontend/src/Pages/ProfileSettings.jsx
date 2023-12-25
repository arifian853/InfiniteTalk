/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button } from "flowbite-react"
import { Header } from "../Components/Header"
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../Services/index/users";
import { useMemo } from "react";
import { userActions } from "../store/reducers/userReducers";
import { ProfilePicture } from "../Components/ProfilePicture";
import { Helmet } from "react-helmet";
import { FooterMain } from "../Components/FooterMain";

export const ProfileSettings = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
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

    return (
        <>
            <Header />
            <Helmet>
                <title>InfiniteTalk! - Profile Settings</title>
            </Helmet>
            {userState.userInfo ? (
                <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center md:p-7 p-4'>

                    <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800 shadow-lg">
                        <div className="flex items-center gap-2 justify-start">
                            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
                            <h1 className="text-2xl"> {userState.userInfo.mentor ? "Mentor" : "Mentee"} Profile Settings</h1>
                        </div>
                        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex items-center flex-row justify-center"><ProfilePicture avatar={profileData?.avatar} /></div>
                        <p className="text-xs text-center p-2">*Max 1MB & .jpg/.jpeg, and .png only is allowed </p>

                        <form className="mt-2 flex flex-col" onSubmit={handleSubmit(submitHandler)}>
                            <div className="flex flex-col justify-center items-center">

                                <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-4 py-4 rounded-t-lg border-b border-gray-300">
                                    <p className="grow font-semibold text-sm text-white md:w-32 w-full">Full Name</p>
                                    <input
                                        className="font-semibold text-sm rounded-md py-2 px-3 text-slate-800 md:w-1/3 w-full"
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
                                    <div className="grow">

                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-4 py-4 border-b border-gray-300">
                                    <p className="grow font-semibold text-sm text-white md:w-32 w-full">Email</p>
                                    <input
                                        className="font-semibold text-sm rounded-md py-2 px-3 text-slate-800 md:w-1/3 w-full"
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
                                    <div className="grow">

                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-4 py-4 border-b border-gray-300">
                                    <p className="grow font-semibold text-sm text-white md:w-32 w-full">Username</p>
                                    <input
                                        className="font-semibold text-sm rounded-md py-2 px-3 text-slate-800 md:w-1/3 w-full"
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
                                    <div className="grow">

                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-700 w-full px-4 py-4 rounded-b-lg">
                                    <p className="grow font-semibold text-sm text-white md:w-32 w-full">Password</p>
                                    <input
                                        className="rounded-md py-2 px-3 text-slate-800 md:w-1/3 w-full"
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
                                    <div className="grow">

                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <Button className='btn-dark-md mt-4' type="submit" disabled={!isValid || profileIsLoading || updateProfileIsLoading}>
                                    Update profile
                                </Button>
                            </div>
                        </form>
                    </div>
                </div >
            ) : (
                <></>
            )}
            <FooterMain />
        </>
    )

}


