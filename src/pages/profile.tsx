import { useSelector } from "react-redux";
import Nav from "../components/home/navbar";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state:any) => state.auth);
  return (
    <div className=" h-screen">
      <Nav />
      <div className="bg-primary/5 h-[80%] flex md:items-center pt-10 md:pt-0 justify-center">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-lg">
          <div className="flex justify-between">
            
          <div className="flex items-center mb-6 space-x-4 ">
            <Avatar
              // isBordered
              as="button"
              className="transition-transform" 
              showFallback
              name={user?.name}
              size="lg"
              src={user.profilePicture ? user?.profilePicture[0]?.url : ""}
              />
            <div className="">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
              </div>
            <Link  to="/auth/change-password" className=" h-fit text-xs hover:underline hover:text-accent " >  Change password</Link>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Profile Information</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {user?.address?.street}, {user?.address?.city}, {user?.address?.state},{" "}
              {user?.address?.postalCode}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">About Me</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec libero fermentum, at
              cursus odio bibendum.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/my-account/edit"
              className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
