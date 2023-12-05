import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { userActions } from "../store/reducers/userReducers";
import { GenerateOTP } from "../Services/index/users";
import { MdErrorOutline } from "react-icons/md";
import { VerifyOTPBtn } from "./VerifyOTPBtn";
export const ActivateTOTP = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const [openModal, setOpenModal] = useState('')
    const [qrcodeUrl, setqrCodeUrl] = useState("");

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
                Enable OTP <MdErrorOutline />
            </Button>
            <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <div>
                    <Modal.Header className='modal-title'> <h1 className='modal-title'>Activate TOTP (Time-based OTP)</h1> </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <div className="space-y-6 divide-y">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <p className="text-center">Scan this QR Code or paste the Base32 Secret to the Authenticator App.</p>

                                <img
                                    className="block w-64 h-64 object-contain rounded-md"
                                    src={qrcodeUrl}
                                    alt="qrcode url"
                                />
                                <p className="text-center">Base32 Secret : {userState.userInfo.otp_base32}</p>
                            </div>
                            <div className="p-4 w-full flex flex-col justify-center items-center gap-2">
                                Verify the code in your Authenticator App here
                                <VerifyOTPBtn />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}
