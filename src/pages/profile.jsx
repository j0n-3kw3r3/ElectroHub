import { useSelector } from "react-redux";
import Nav from "../components/home/navbar";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.auth);
  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex items-center mb-6 space-x-4 ">
            <Avatar
              // isBordered
              as="button"
              className="transition-transform"
              color="neutral"
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
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Profile Information</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {user?.address}
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
