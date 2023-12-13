/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../Header";
import { DeletePost, GetSinglePost } from "../../Services/index/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown, Modal, Spinner } from "flowbite-react";
import stables from "../../Constants/stables";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { CommentContainer } from "../CommentComponents/CommentContainer";

export const PostDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState('')

    const { data, isError } = useQuery({
        queryFn: () => GetSinglePost({ slug }),
        queryKey: ["posts", slug],
        onSuccess: () => {
            setIsLoading(false)
        },
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
                navigate('/feed')
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const deletePostHandler = ({ slug, token }) => {
        mutateDeletePost({ slug, token });
    };

    const postBelongsToUser = data?.user._id === userState.userInfo?._id;

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
        <div>
            <Helmet>
                <title>InfiniteTalk! - Post</title>
            </Helmet>
            <Header />
            <>
                {isLoading ? (
                    <div className="h-screen flex flex-col justify-center items-center">
                        <p className="text-3xl text-white">Loading... <Spinner /></p>
                    </div>
                ) : isError ? (
                    <div className="h-screen flex flex-col justify-center items-center">
                        <p className="text-3xl text-white">Error loading data</p>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <div
                            data-aos="zoom-in"
                            className={'w-11/12 flex flex-col md:my-10 my-5 bg-slate-800 text-white rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'}
                        >
                            <div className="flex items-center gap-2 justify-between m-5">
                                <span className="flex cursor-pointer flex-row gap-3" onClick={goBack}>
                                    <h1 className="text-2xl"> <FaArrowLeft /></h1>
                                    <h1 className="text-1xl"> Back</h1>
                                </span>
                                {postBelongsToUser ?
                                    (
                                        <>
                                            <Dropdown inline>
                                                <Dropdown.Item onClick={() => setOpenModal('default')}>Delete post</Dropdown.Item>
                                                <Dropdown.Item> <Link to={`/post/edit/${data?.slug}`}>Edit post</Link></Dropdown.Item>
                                            </Dropdown>
                                            <Modal data-aos="fade-in" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                                                <div>
                                                    <Modal.Header className='modal-title'> <h1 className='modal-title'>Delete post</h1> </Modal.Header>
                                                    <Modal.Body className='modal-body'>
                                                        <div className="space-y-6 divide-y">
                                                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                                                <p>Delete this post?</p>
                                                                <div className="mt-2 flex flex-row gap-2">
                                                                    <Button className="btn-dark" onClick={() => setOpenModal(undefined)}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button color="failure" onClick={() => {
                                                                        deletePostHandler({
                                                                            slug: data?.slug,
                                                                            token: userState.userInfo.token,
                                                                        });
                                                                    }}>
                                                                        Delete post!
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </div>
                                            </Modal>
                                        </>
                                    ) : (<> </>)
                                }
                            </div>
                            <div className="w-full flex flex-col justify-center items-center">
                                <img
                                    src={
                                        data?.photo
                                            ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                                            : "/no-img.png"
                                    }
                                    alt="title"
                                    className="w-full rounded-md"
                                />
                            </div>
                            <div className="p-5">

                                <h1 className="font-semibold text-xl md:text-2xl lg:text-[28px]">
                                    {data?.title}
                                </h1>
                                <span className="font-semibold opacity-70">
                                    at {data?.createdAt && (
                                        new Intl.DateTimeFormat('en-GB', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            hour12: false,
                                            minute: 'numeric',
                                            timeZone: 'Asia/Jakarta',
                                        }).format(new Date(data.createdAt))
                                    )}
                                </span>
                                <p className="text-md font-semibold">
                                    {
                                        data?.tags && data?.tags.length > 0 ? <span> Tags : {data?.tags.join(', ')} </span> : ""
                                    }
                                </p>
                                <br />
                                <p className="w-full md:w-2/3 mt-2 text-md text-justify text-ellipsis whitespace-break-spaces">
                                    {data?.caption}
                                </p>

                                <div className="flex flex-col mt-6">

                                    <div className="flex items-center gap-x-2 md:gap-x-2.5">
                                        <img
                                            src={
                                                data?.user.avatar
                                                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.user.avatar
                                                    : "/user.png"
                                            }
                                            alt="post profile"
                                            className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold">
                                                <span className="px-1">{data?.user.fullName}</span> <br />
                                                {data?.user.mentor ? <span className="rounded-md bg-green-300 text-slate-800 px-2 py-1 text-xs">Mentor @ {data?.user.program}</span> : <span className="rounded-md bg-blue-300 text-slate-800 px-2 py-1 text-xs">Mentee @ {data?.user.program}</span>}
                                            </h1>
                                        </div>
                                    </div>
                                    <hr className="w-full h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
                                    <h1 className="text-xl font-semibold">Comments</h1>
                                    <div className="md:w-2/3 w-full p-2">
                                        <CommentContainer
                                            comments={data?.comments}
                                            className="mt-10"
                                            logginedUserId={userState?.userInfo?._id}
                                            postSlug={slug}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </>
        </div>
    )
}
