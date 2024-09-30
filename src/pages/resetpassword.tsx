import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import bg from "../assets/image/bg.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "../components/useinput";
import { resetPasswordEP } from "../services";

const schema = z.object({
  password: z.string().min(5, { message: "Password must conatain at least 5 Characters" }),
  
});


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const { resetToken } = useParams();
  //  function to handle the form submission


      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<{ password: string }>({
        resolver: zodResolver(schema),
      });

      const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: { password: string }) => resetPasswordEP(data, resetToken),
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/auth/login");
        },
        onError: (error: any) => {
          console.log(error);
          toast.error(error.message || "An error occurred");
        },
      });

      //  function to handle the form submission
      const submitHandler: SubmitHandler<{ password: string }> = async (data) => {
        try {
          await mutateAsync(data);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="bg-[#0F0F0F] flex h-[100vh] bg-[bg] text-slate-300 w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <img src={bg} alt="" className=" absolute w-full object-contain z-0 " />
      <div className="max-w-sm rounded-lg w-full bg-[#191919] z-20 ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold ">Reset Password</h2>
        </div>
        <form className="mt-8 p-6 space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="rounded-md shadow-sm text-default-400 space-y-4">
            <CustomInput
              type="password"
              variant="bordered"
              label="Password" 
              name="password"
              placeholder="Enter your password"
              errors={errors}  
              classStyle="mt-10 text-white/90"
              labelstyle=" text-white/90 "
              register={register}
              icon={<LockClosedIcon className="size-4 text-default-400 pointer-events-none flex-shrink-0" />}
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
              className=" w-full flex shadow-md text-sm font-medium rounded-md  bg-accent "
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
