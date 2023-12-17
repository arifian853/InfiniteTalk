/* eslint-disable react/jsx-key */
import { Header } from "../Components/Header"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeletePost, GetAllPosts } from "../Services/index/posts";
import { FooterMain } from "../Components/FooterMain";

export const Admin = () => {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const queryClient = useQueryClient();

    const {
        data: postsData,
        isLoading,
        isFetching,
    } = useQuery({
        queryFn: () => GetAllPosts(),
        queryKey: ["posts"],
    });

    const { mutate: mutateDeletePost } =
        useMutation({
            mutationFn: ({ slug, token }) => {
                return DeletePost({
                    slug,
                    token,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                toast.success("Post is deleted");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const deletePostHandler = ({ slug, token }) => {
        mutateDeletePost({ slug, token });
    };

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
                        <h1 className="text-2xl"> Manage Posts</h1>
                    </Link>
                    <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <ul className="divide-y mt-4 mb-1 divide-gray-200 dark:divide-gray-400">
                        <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-xl font-semibold">Welcome, <span className="text-green-500">{userState.userInfo.fullName}</span></h1> As an admin, you can control user posts </li>
                    </ul>
                    <h1 className="text-2xl font-semibold my-2">User posts</h1>
                    {
                        isLoading || isFetching ? (
                            <p>Loading</p>
                        ) : postsData?.data?.length === 0 ? (
                            <p>No post data</p>
                        ) : (
                            postsData?.data.map((post) => (

                                <div>
                                    <ul>
                                        <li className="w-full mt-2 rounded-md p-4 bg-slate-700 flex flex-col">
                                            <Link to={`/post/${post?.slug}`}> <h1 className="text-xl font-semibold">{post.title}</h1></Link>
                                            <p className="text-sm opacity-70"> by {post.user.fullName} ({post?.user.mentor ? <span className="text-white text-sm">Mentor @ {post?.user.program}</span> : <span className="text-white text-sm">Mentee @ {post?.user.program}</span>})</p>
                                            <p className="text-sm opacity-70">Posted at :
                                                <span className="px-1">
                                                    {post?.createdAt && (
                                                        new Intl.DateTimeFormat('en-GB', {
                                                            weekday: 'long',
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            hour12: false,
                                                            minute: 'numeric',
                                                            timeZone: 'Asia/Jakarta',
                                                        }).format(new Date(post.createdAt))
                                                    )}
                                                </span>
                                                <br />
                                                {post.comments && post.comments.length > 0 ? <span>{post?.comments.length} Comments</span> : "No comments yet"}
                                            </p>
                                            <div className="flex flex-row gap-3">
                                                <p onClick={() => {
                                                    deletePostHandler({
                                                        slug: post?.slug,
                                                        token: userState.userInfo.token,
                                                    });
                                                }} className="cursor-pointer text-red-500">
                                                    Delete
                                                </p>
                                                <p className="cursor-pointer text-yellow-500">
                                                    <Link to={`/post/edit/${post?.slug}`}>Edit post</Link>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            )
                            )
                        )}
                </div>

            </div>
            <FooterMain />
        </>
    )
}
