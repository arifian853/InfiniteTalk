import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ValidateOTP } from "../Services/index/otp";
import { userActions } from "../store/reducers/userReducers";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

export const ValidateTOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: ({ token, username }) => {
      return ValidateOTP({ token, username });
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

  useEffect(() => {
    if (!userState.userInfo) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
        toast.error("Not authenticated! Login first.")
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);

  useEffect(() => {
    if (userState.userInfo.otp_enabled === false) {
      const timeoutId = setTimeout(() => {
        navigate('/feed');
        toast.error("Enable OTP first")
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [userState.userInfo, navigate]);

  useEffect(() => {
    if (userState.userInfo && userState.userInfo.otp_valid === true) {
      const timeoutId = setTimeout(() => {
        navigate('/feed');
      }, 50);
      return () => clearTimeout(timeoutId);
    } else if (!userState.userInfo.otp_valid === true || !userState.userInfo.otp_valid) {
      // If no valid OTP, prevent navigation
      navigate('/otp');
    }
  }, [userState.userInfo, navigate]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      token: "",
      username: userState.userInfo.username
    },
    mode: "onChange",
  });

  const otpValidate = async (data) => {
    const { token, username } = data;
    mutate({ token, username });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Helmet>
        <title>InfiniteTalk! - TOTP Authentication</title>
      </Helmet>
      <div className="bg-slate-800 otp w-11/12 md:w-2/5">
        <h1 className="text-2xl font-semibold"><span className="text-blue-400"> Time-Based OTP</span><span className="text-green-400"> Authentication</span></h1>
        <hr className="w-full h-px my-1 bg-gray-200 border-0 dark:bg-gray-500" />
        <p>Open your <span className="text-center font-semibold text-green-400">Authenticator App</span> and insert the One Time Password code for <span className="font-semibold">{userState.userInfo.email}</span> </p>
        <form className="w-2/3 flex justify-center gap-2 flex-col items-center" onSubmit={handleSubmit(otpValidate)}>
          <input {...register("token")} className="rounded-md py-2 px-3 mb-3 text-slate-800 md:w-2/3 w-full text-center" type="number" />
          <Button type="submit" disabled={!isValid} className="btn-dark">
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  )
}
