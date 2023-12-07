import { Header } from "../Components/Header"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet";

export const About = () => {
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
        <title>InfiniteTalk! - Project About</title>
      </Helmet>
      <div data-aos="zoom-in" className='flex flex-col gap-4 justify-center items-center p-7'>
        <div className="profile-section bg-slate-800">
          <div className="flex items-center gap-2 justify-start">
            <h1 className="text-2xl cursor-pointer" onClick={goBack}> <FaArrowLeft /></h1>
            <h1 className="text-2xl"> About Project</h1>
          </div>
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-400">
            <li className="w-full rounded-lg p-2 bg-slate-700 text-center"> <h1 className="text-3xl font-semibold"><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> v1.0</h1> <p>A place for Mentors and Mentees <b className="text-blue-400">connect</b> and <b className="text-green-400">grow</b>!</p> </li>
          </ul>
          <br />
          <Table>
            <Table.Body className="divide-y divide-gray-200 dark:divide-gray-400">
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Hacker
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  <a className="underline" href="https://arifian853.vercel.app" target="_blank" rel="noreferrer noopener">Arifian Saputra</a> (2001020029)
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Hipster
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  <a className="underline" href="https://tpa-4.vercel.app/" target="_blank" rel="noreferrer noopener">Samuel Miskan Hanock</a> (2001020037)
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  University
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  <a className="underline" href="https://umrah.ac.id" target="_blank" rel="noreferrer noopener">Universitas Maritim Raja Ali Haji</a> (UMRAH)
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Program
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Intern Project @ <a className="text-green-400 underline" href="https://infinitelearning.id" target="_blank" rel="noreferrer noopener">Infinite Learning</a>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  FE Tech Stack
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Vite React, Tailwind CSS, Flowbite-React, React-Redux, EasyCrop, Axios, AOS, etc.
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  BE Tech Stack + DB
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  NodeJS, ExpressJS, Axios, BcryptJS, JSONWebtoken, + MongoDB
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  Repository
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium bg-slate-700 text-gray-900 dark:text-white">
                  <a className="underline" href="https://github.com/arifian853/InfiniteTalk" target="_blank" rel="noreferrer noopener">GitHub</a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

      </div>
    </>
  )
}
