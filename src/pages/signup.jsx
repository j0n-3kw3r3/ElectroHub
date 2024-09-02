import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import google from "../assets/image/google_g_icon.svg";
import bg from "../assets/image/bg.svg";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

    const googleAuth = () => {
      window.open(`${import.meta.env.VITE_URL}/auth/google`, "_self");
    };
  return (
    <div className=" bg-[#0F0F0F] flex h-[100vh] bg-[bg] text-white w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <img src={bg} alt="" className=" absolute w-full object-contain z-0 " />
      <div className="max-w-sm rounded-lg w-full bg-[#191919] z-20 ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold ">Sign Up</h2>
          <div className="mt-2 text-center flex justify-center ">
            Do you have an account?{" "}
            <p
              className=" text-primary hover:underline ml-1 cursor-pointer "
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </p>
          </div>
        </div>
        <form className="mt-8 p-6 space-y-4" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm text-default-400 space-y-4">
            <div className="border flex w-full rounded p-2 items-center gap-3 ">
              <EnvelopeIcon className="size-4 text-default-400 pointer-events-none flex-shrink-0" />
              <input
                id="username"
                name="username"
                type="text"
                required
                className=" focus:outline-none bg-transparent w-full "
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="border flex w-full rounded p-2 items-center gap-3 ">
              <LockClosedIcon className="size-4 text-default-400 pointer-events-none flex-shrink-0" />
              <input
                id="password"
                name="password"
                required
                className=" focus:outline-none bg-transparent w-full "
                placeholder="Password"
                value={password}
                type={isVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isVisible ? (
                <div className="" onClick={toggleVisibility}>
                  <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
                </div>
              ) : (
                <div className="" onClick={toggleVisibility}>
                  <EyeIcon className="size-5 text-default-400 pointer-events-none" />
                </div>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className=" w-full flex text-white  shadow-md text-sm font-medium rounded-md  bg-primary "
            >
              Sign up
            </Button>
          </div>

          <div className="flex items-center text-default-400 gap-4">
            <div className="border-b border-default-500 w-full"></div>
            <div className="">OR</div>
            <div className="border-b border-default-500 w-full"></div>
          </div>
          <div className="flex justify-center cursor-pointer">
            <div className=" bg-[#252525] rounded px-10 py-1 " onClick={googleAuth}>
              <img src={google} alt="" className=" w-6 h-6" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
