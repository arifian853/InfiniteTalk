import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "../../Services/index/posts";
import toast from "react-hot-toast";
import { Alert, Spinner } from "flowbite-react";
import PostCard from "./PostCard";
import { HiInformationCircle } from 'react-icons/hi';

export const Post = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => GetAllPosts(),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });
    return (
        <div className="bg-transparent md:w-4/5 w-10/12 flex flex-col my-10 gap-6">
            <h1 className="text-2xl font-semibold text-white">Latest posts</h1>
            {isLoading ? (
                [...Array(1)].map((item, index) => (
                    <div key={index} className="h-screen flex flex-col justify-center items-center">
                        <p className="text-3xl text-white">Loading posts... <Spinner /></p>
                    </div>
                ))
            ) : isError ? (
                <div className="h-screen flex flex-col justify-center items-center">
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error</span> fetching data
                    </Alert>
                </div>
            ) : (
                data?.data.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        className="w-full bg-slate-700 text-white md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                    />
                ))
            )}
        </div>
    )
}
