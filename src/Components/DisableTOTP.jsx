import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { userActions } from "../store/reducers/userReducers";
import { DisableOTP } from "../Services/index/otp";
import { FaCheck } from "react-icons/fa6";
export const DisableTOTP = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const [openModal, setOpenModal] = useState('')

    const { mutate } = useMutation({
        mutationFn: ({ username }) => {
            return DisableOTP({ username });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const disableOtpBtn = async () => {
        const { username } = userState.userInfo;
        mutate({ username });
    };

    return (

        <>
            <Button className="btn-dark" onClick={() => setOpenModal('default')}>
                Disable OTP <FaCheck />
            </Button>
            <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <div>
                    <Modal.Header className='modal-title'> <h1 className='modal-title'>Disable TOTP (Time-based OTP)?</h1> </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <div className="space-y-6 divide-y">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <h1 className="text-2xl text-red-500 font-semibold">Are you sure?</h1>
                                <p className="text-center">This action will cause your account <span className="text-red-500 font-semibold">not safe</span>  anymore!</p>
                                <div className="mt-2 flex flex-row gap-2">
                                    <Button className="btn-dark" onClick={() => setOpenModal(undefined)}>
                                        Cancel
                                    </Button>
                                    <Button color="failure" onClick={disableOtpBtn}>
                                        Disable OTP
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}
