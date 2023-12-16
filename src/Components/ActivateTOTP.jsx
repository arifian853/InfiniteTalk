import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { userActions } from "../store/reducers/userReducers";
import { GenerateOTP } from "../Services/index/otp";
import { MdErrorOutline } from "react-icons/md";
import { VerifyOTPBtn } from "./VerifyOTPBtn";
export const ActivateTOTP = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const [openModal, setOpenModal] = useState("")
    const [qrcodeUrl, setqrCodeUrl] = useState("") 

    useEffect(() => {
        QRCode.toDataURL(userState.userInfo.otp_auth_url).then(setqrCodeUrl);
    }, [userState.userInfo.otp_auth_url]);

    const { mutate } = useMutation({
        mutationFn: ({ username }) => {
            return GenerateOTP({ username });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const generateOtpBtn = async () => {
        setOpenModal('default');
        const { username } = userState.userInfo;
        mutate({ username });
    };

    return (

        <>
            <Button className="btn-dark" onClick={generateOtpBtn}>
                Enable OTP <span className="pl-1"><MdErrorOutline /></span>
            </Button>
            <Modal data-aos="fade-in" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <div>
                    <Modal.Header className='modal-title'> <h1 className='modal-title'>Activate TOTP (Time-based OTP)</h1> </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <div className="space-y-6 divide-y">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <p className="text-center text-sm">Scan this QR Code or paste the Base32 Secret to your <span className="text-center text-sm font-semibold text-green-400">Authenticator App</span>.</p>

                                <img
                                    className="block w-64 h-64 object-contain rounded-md"
                                    src={qrcodeUrl}
                                    alt="qrcode url"
                                />
                                <p className="text-center">Base32 Secret : {userState.userInfo.otp_base32}</p>
                                <p className="text-center text-sm">You can use <span className="text-center text-sm font-semibold text-yellow-400"> Google Authenticator, IBM Security Verify, or Twilio Authy </span>for authenticating</p>

                            </div>
                            <div className="p-4 w-full flex flex-col justify-center items-center gap-2 text-sm">
                                <p> Input the 6-digit code that appeared in your <span className="text-center text-sm font-semibold text-green-400">Authenticator App</span> here</p>
                                <VerifyOTPBtn />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}
