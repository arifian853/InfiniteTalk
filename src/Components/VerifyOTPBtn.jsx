import { useMutation } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/reducers/userReducers";
import { VerifyOTP } from "../Services/index/otp";
import { useForm } from "react-hook-form";

export const VerifyOTPBtn = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: ({ token, username }) => {
      return VerifyOTP({ token, username });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("OTP Enabled!");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

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

  const otpVerify = async (data) => {
    const { token, username } = data;
    mutate({ token, username });
  };

  return (
      <form className="w-2/3 flex justify-center gap-2 flex-col items-center" onSubmit={handleSubmit(otpVerify)}>
        <input {...register("token")} className="rounded-md py-2 px-3 mb-3 text-slate-800 md:w-full w-full text-center" type="number" />
        <Button type="submit" disabled={!isValid} className="btn-dark w-32 h-10">
          Verify OTP
        </Button>
      </form>
  )
}
