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
      <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center p-7'>
        <div className="profile-section bg-slate-800">
          <div className="flex items-center gap-2 justify-start">
            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
            <h1 className="text-2xl"> Admin Dashboard</h1>
          </div>
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-400">
            <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-xl font-semibold">Welcome, {userState.userInfo.fullName}</h1> Here you can control some posts and comments </li>
          </ul>
          <br />
          {
            isLoading || isFetching ? (
              <p>Loading</p>
            ) : postsData?.data?.length === 0 ? (
              <p>No post data</p>
            ) : (
              postsData?.data.map((post) => (

                <>
                  <ul className="divide-y mt-2 divide-gray-200 dark:divide-gray-400">
                    <li className="w-full rounded-lg p-2 bg-slate-700 flex flex-col">  <Link to={`/post/${post?.slug}`}><h1 className="text-xl font-semibold">{post.title}</h1></Link> by {post.user.fullName}
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
                      </li>
                  </ul>

                </>
              )
              )
            )}
        </div>

      </div>
    </>
  )
}
