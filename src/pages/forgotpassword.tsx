import { EnvelopeIcon,  } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import bg from "../assets/image/bg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordEP } from "../services";
import CustomInput from "../components/useinput";

const schema = z.object({
  email: z.string().email(),
  
});

function ForgotPassword() {
  const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<{ email: string }>({
      resolver: zodResolver(schema),
    });

  
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: forgotPasswordEP,
      onSuccess: () => {        
        toast.success("Check your email for the reset link");
      },
      onError: (error) => {
        console.log(error);
        toast.error("failed to create user");
      },
    });

  //  function to handle the form submission
  const submitHandler = async (data: { email: string }) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="bg-[#0F0F0F] text-slate-300 flex h-[100vh] bg-[bg] text-default-300 w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <img src={bg} alt="" className=" absolute w-full object-contain z-0 " />
      <div className="max-w-sm rounded-lg w-full bg-[#191919] z-20 ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold ">Forgot Password</h2>
        </div>
        <form className="mt-8 p-6 space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="rounded-md shadow-sm text-default-400 space-y-4">
            <CustomInput
              type="email"
              variant="bordered"
              label="Email" 
              name="email"
              placeholder="emailyou@example.com"
              errors={errors} 
              classStyle="mt-10  text-white/90"
              labelstyle=" text-white/90 "
              register={register}
              icon={<EnvelopeIcon className="size-5 text-default-400 pointer-events-none " />}
            />
          </div>

          <div className="text-right">
            <p
              className="text-accent text-sm hover:underline cursor-pointer"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Back To Login{" "}
            </p>
          </div>
          <div>
            <Button
              type="submit"
              isLoading={isPending}
              className=" w-full flex text-default-300  shadow-md text-sm font-medium rounded-md  bg-accent "
            >
              Forgot Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
