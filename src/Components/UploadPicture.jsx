/* eslint-disable react/prop-types */
import { useState } from "react"
import stables from "../Constants/stables"
import CropEasy from "./ImageCropper/CropEasy"
import { HiOutlineCamera } from 'react-icons/hi'
import { createPortal } from "react-dom"
import { Button, Modal } from "flowbite-react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { UploadNewPicture } from "../Services/index/posts"

export const UploadPicture = ({posts}) => {
    const userState = useSelector((state) => state.user);
    const [openCrop, setOpenCrop] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState('')

    const { mutate: mutatePicture } =
    useMutation({
      mutationFn: ({ token, formData, slug, }) => {
        return UploadNewPicture({ token, formData, slug  });
      },
      onSuccess: () => {
        toast.success(
          "Upload success"
        );
        window.location.reload();
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto({ url: URL.createObjectURL(file), file });
        setOpenCrop(true);
    }

    const handleDeleteImage = () => {
        const formData = new FormData();
        formData.append("uploadPicture", undefined);
        mutatePicture({ token: userState.userInfo.token, formData: formData });
        setOpenModal(undefined)
    };

    return (
        <>

            {
                openCrop && createPortal(<CropEasy photo={photo} setOpenCrop={setOpenCrop} />, document.getElementById('portal'))
            }
            <div className="my-5 flex items-center gap-x-4">
                <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden">
                    <label
                        htmlFor="profilePicture"
                        className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
                    >
                        {posts?.photo ? (
                            <img
                                src={stables.UPLOAD_FOLDER_BASE_URL + posts?.photo}
                                alt="picture"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                                <HiOutlineCamera className="w-7 h-auto text-primary" />
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        className="sr-only"
                        id="profilePicture"
                        onChange={handleFileChange}
                    />
                </div>
                <Button
                    onClick={() => setOpenModal('default')}
                    type="button"
                    color="failure"
                >
                    Delete profile picture
                </Button>

                <Modal data-aos="fade-in" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                    <div>
                        <Modal.Header className='modal-title'> <h1 className='modal-title'>Delete Profile Picture?</h1> </Modal.Header>
                        <Modal.Body className='modal-body'>
                            <div className="space-y-6 divide-y">
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <h1 className="text-2xl font-semibold">Are you sure?</h1>

                                    <div className="mt-2 flex flex-row gap-2">
                                        <Button className="btn-dark" onClick={() => setOpenModal(undefined)}>
                                            Cancel
                                        </Button>
                                        <Button color="failure" onClick={handleDeleteImage}>
                                            Delete picture
                                        </Button>
                                    </div>

                                </div>

                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </div>
        </>
    )
}
