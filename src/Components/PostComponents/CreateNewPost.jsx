/* eslint-disable no-unused-vars */
import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { CreatePost } from "../../Services/index/posts";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UploadPicture } from "../UploadPicture";

export const CreateNewPost = () => {
    const userState = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState('')
    const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
        useMutation({
            mutationFn: ({ title, caption, tags, photo }) => {
                return CreatePost({
                    token: userState.userInfo.token, title, caption, tags, photo
                });
            },
            onSuccess: (data) => {
                toast.success("Posted!");
                setOpenModal("uploadPicture")
                queryClient.invalidateQueries(["posts"]);
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            caption: "",
            tags: "",
        },
        mode: "onChange",
    });

    const handleCreateNewPost = ({ title, caption, tags, photo }) => {
        mutateCreatePost({ title, caption, tags, photo })
    }

    return (
        <>
            <Button onClick={() => setOpenModal("default")} className="w-full btn-dark">
                <h1 className="flex flex-row gap-2 items-center justify-center"><p> Create a new post </p> <FaRegEdit /></h1>

            </Button>
            <div>
                <Modal data-aos="fade-in" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                    <div>
                        <Modal.Header className='modal-title'> <h1 className='modal-title'>Create new post</h1> </Modal.Header>
                        <Modal.Body className='modal-body'>
                            <form onSubmit={handleSubmit(handleCreateNewPost)} className="flex flex-col gap-3 w-full">
                                <h1>Title</h1>
                                <input className="rounded-md py-2 px-3 mb-3 text-slate-800 w-full " type="text"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Title is required",
                                        },
                                    })} />
                                {errors.title?.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title?.message}
                                    </p>
                                )}
                                <h1>Caption</h1>
                                <textarea className="rounded-md h-20 py-2 px-3 mb-3 text-slate-800 w-full " type="text" {...register("caption", {
                                    required: {
                                        value: true,
                                        message: "Caption is required",
                                    },
                                })} />
                                {errors.caption?.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.caption?.message}
                                    </p>
                                )}
                                <h1>Tags</h1>
                                <input className="rounded-md py-2 px-3 mb-3 text-slate-800 w-full " type="text"
                                    {...register("tags")}
                                />

                                <Button type="submit" disabled={isLoadingCreatePost} className="btn-dark">
                                    Post!
                                </Button>
                            </form>
                        </Modal.Body>
                    </div>
                </Modal>
                <Modal data-aos="fade-in" show={openModal === 'uploadPicture'} onClose={() => setOpenModal(undefined)}>
                    <div>
                        <Modal.Header className='modal-title'> <h1 className='modal-title'>Upload picture</h1> </Modal.Header>
                        <Modal.Body className='modal-body flex flex-col w-full justify-center items-center'>
                            <h1>Now , add picture to your post</h1>
                            <UploadPicture />
                            <div className="mt-2 w-full flex flex-row gap-2 justify-center items-center">
                                <Button className="btn-dark" onClick={() => setOpenModal(undefined)}>
                                    Without picture 
                                </Button>
                                <Button color="failure" onClick={""}>
                                    Set picture
                                </Button>
                            </div>


                        </Modal.Body>
                    </div>
                </Modal>
            </div>
        </>
    )
}
