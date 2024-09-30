import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import google from "../assets/image/google_g_icon.svg";
import bg from "../assets/image/bg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSuccess } from "../redux/auth";
import { useDispatch } from "react-redux";
import CustomInput from "../components/useinput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerEP } from "../services";
import { SignUpParamsProps } from "@/types";


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: "Password must conatain at least 5 Characters" }),
  firstName: z.string().min(1, { message: "First name is Required" }),
});


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignUpParamsProps>({
      resolver: zodResolver(schema),
    });

  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: registerEP,
      onSuccess: (data) => {
        toast.success("User created successfully");
        dispatch(registerSuccess(data));
            navigate("/");
      },
      onError: (error) => {
        console.log(error);
        toast.error("failed to create user");
      },
    });

  //  function to handle the form submission
  const submitHandler = async (data: SignUpParamsProps) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className=" bg-[#0F0F0F] flex h-[100vh] bg-[bg] text-slate-300 w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <img src={bg} alt="" className=" absolute w-full object-contain z-0 " />
      <div className="max-w-sm rounded-lg w-full  bg-[#191919] z-20 ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold ">Sign Up</h2>
          <div className="mt-2 text-center flex justify-center ">
            Do you have an account?{" "}
            <p
              className=" text-accent hover:underline ml-1 cursor-pointer "
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </p>
          </div>
        </div>
        <form className="mt-8 p-6 space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="rounded-md shadow-sm  space-y-2">
            <CustomInput
              type="text"
              variant="bordered"
              label="First name"
              name="firstName"
              placeholder="Enter your First name"
              errors={errors}
              classStyle="text-slate-400 "
              labelstyle=" text-slate-400 "
              register={register}
              icon={<UserIcon className="size-4 text-slate-300 pointer-events-none flex-shrink-0" />}
            />
            <CustomInput
              type="email"
              variant="bordered"
              label="Email"
              name="email"
              placeholder="emailyou@example.com"
              errors={errors}
              classStyle="text-slate-400 "
              labelstyle=" text-slate-400 "
              register={register}
              icon={<EnvelopeIcon className="size-5 text-slate-300 pointer-events-none " />}
            />
            <CustomInput
              type="password"
              variant="bordered"
              label="Password"
              name="password"
              placeholder="Enter your password"
              errors={errors}
              classStyle="text-slate-400 "
              labelstyle=" text-slate-400 "
              register={register}
              icon={<LockClosedIcon className="size-4 text-slate-300 pointer-events-none flex-shrink-0" />}
            />
          </div>

          <div>
            <Button
              type="submit"
              isLoading={isPending}
              className=" w-full flex text-slate-300  shadow-md text-sm font-medium rounded-md  bg-accent "
            >
              Sign up
            </Button>
          </div>

          <div className="flex items-center text-slate-300 gap-4">
            <div className="border-b border-default-500 w-full"></div>
            <div className="">OR</div>
            <div className="border-b border-default-500 w-full"></div>
          </div>
          <div className="flex justify-center cursor-pointer">
            <div className=" bg-[#252525] rounded px-10 py-1 ">
              <img src={google} alt="" className=" w-6 h-6" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
