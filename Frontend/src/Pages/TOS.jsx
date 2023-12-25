import { Header } from "../Components/Header"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { FooterMain } from "../Components/FooterMain";

export const TOS = () => {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);

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
        <>
            <Header />
            <Helmet>
                <title>InfiniteTalk! - Terms of Service</title>
            </Helmet>
            <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center px-5 md:px-7 my-7 w-full'>
                <div className="flex flex-col w-full md:w-11/12 text-white rounded-lg p-5 bg-slate-800 shadow-lg">
                    <div className="flex items-center gap-2 justify-start">
                        <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
                        <h1 className="text-2xl"> Terms of Service</h1>
                    </div>
                    <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-400">
                        <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-2xl font-semibold">Terms of Service for <span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> </h1> <p>A place for Mentors and Mentees <b className="text-blue-400">connect</b> and <b className="text-green-400">grow</b>!</p> </li>
                    </ul>
                    <br />

                    <div className="w-full bg-slate-700 rounded-lg p-5">
                        <div className="text-justify text-ellipsis whitespace-break-spaces">
                            <p>Last Updated: [17/12/2023]</p>
                            <br />
                            <p>Welcome to InfiniteTalk! A place for Mentors and Mentees to connect and grow. We&rsquo;re excited to have you on board. Before you start your journey with InfiniteTalk, please read and understand our Terms of Service. By using InfiniteTalk, you agree to comply with and be bound by the following terms and conditions:</p>
                            <br />
                            <h2 className='font-semibold'>1. Acceptance of Terms</h2>
                            <p>By accessing or using InfiniteTalk, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.</p>
                            <br />
                            <h2 className='font-semibold'>2. Prohibited Content</h2>
                            <p>You agree not to use InfiniteTalk for any purpose that is prohibited by these terms. This includes, but is not limited to:
                                <ul className='pl-5 list-disc'>
                                    <li><strong>No Politics:</strong> Users are prohibited from engaging in political discussions or promoting political content.</li>
                                    <li><strong>No Hate Speech:</strong> Content that promotes discrimination, hostility, or violence against individuals or groups based on attributes such as ethnicity, religion, race, or societal affiliations is strictly prohibited.</li>
                                    <li><strong>No Discrimination:</strong> Users are not allowed to engage in or promote discriminatory practices on the basis of characteristics such as race, ethnicity, religion, or social background.</li>
                                    <li><strong>No Pornography:</strong> Any sexually explicit or pornographic material is not allowed.</li>
                                    <li><strong>No Fake Accounts:</strong> Users are not permitted to create fake or misleading accounts.</li>
                                    <li><strong>No Misinformation:</strong> Disseminating false or misleading information is strictly prohibited.</li>
                                    <li><strong>No Fake News:</strong> Users must not spread fake news or fabricated information.</li>
                                    <li><strong>No Swearing or Profanity:</strong> The use of offensive language, swearing, or profanity is not allowed.</li>
                                </ul>
                            </p>
                            <br />
                            <h2 className='font-semibold'>3. User Accounts</h2>
                            <p>You are responsible for maintaining the confidentiality of your InfiniteTalk account and password. If you suspect any unauthorized use of your account, please notify us immediately.</p>
                            <br />
                            <h2 className='font-semibold'>4. Unauthorized Disclosure of Personal Information</h2>
                            <p>Engaging in the unauthorized disclosure of personal information about individuals (commonly known as &rsquo;doxxing&rsquo;) in InfiniteTalk! environment is strictly prohibited.</p>
                            <br />
                            <h2 className='font-semibold'>5. Consequences of Violations</h2>
                            <p>Violation of these terms may result in the termination of your InfiniteTalk account or other actions deemed necessary by the InfiniteTalk team. We reserve the right to remove any content that violates these terms.</p>
                            <br />
                            <h2 className='font-semibold'>6. Changes to Terms</h2>
                            <p>InfiniteTalk reserves the right to modify or revise these terms at any time. We will notify users of any significant changes.</p>
                            <br />
                            <h2 className='font-semibold'>7. Governing Law</h2>
                            <p>These terms shall be governed by and construed in accordance with the laws of Republic of Indonesia.</p>
                            <br />
                            <p>By using InfiniteTalk, you agree to abide by these terms. If you have any questions or concerns, please contact us at :
                                <br />
                                <br />
                                <a className='underline' href="mailto:arifiansaputra43@gmail.com">arifiansaputra43@gmail.com</a>
                                <br />
                                <a className='underline' href="mailto:samuelmiskan@gmail.com">samuelmiskan@gmail.com</a>
                            </p>
                            <br />
                            <p>Thank you for being a part of InfiniteTalk! A place for Mentors and Mentees to connect and grow.</p>
                        </div>


                    </div>
                </div>
            </div>
            <FooterMain />
        </>
    )
}
