import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "../../Services/index/posts";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import PostCard from "./PostCard";

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
        <div>
            {isLoading ? (
                [...Array(3)].map((item, index) => (
                    <div key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] bg-slate-700">
                        <p>Wait <Spinner /></p>
                    </div>
                ))
            ) : isError ? (
                <p>Error fetching data</p>
            ) : (
                data?.data.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                    />
                ))
            )}
        </div>
    )
}
