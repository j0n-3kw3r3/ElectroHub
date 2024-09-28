import React, { useState } from "react";
import Nav from "../components/home/navbar";
import { InputComponent } from "../components/InputComponent";
import { updateUserEP } from "../services";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

export default function EditProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [data, setData] = useState({});
  const user = useSelector((state) => state.auth);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ formData, id }) => updateUserEP(formData, id),
    onSuccess: () => {
      toast.success("Product created successfully");
      setProfilePicture(null);
      setData({});
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create product");
    },
  });

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    data.firstName && formData.append("firstName", data.firstName);
    data.lastName && formData.append("lastName", data.lastName);
    data.email && formData.append("email", data.email);
    data.address && formData.append("address", data.address);
    data.phone && formData.append("phone", data.phone);
    data.street && formData.append("street", data.street);
    data.city && formData.append("city", data.city);
    data.country && formData.append("country", data.country);
    data.state && formData.append("state", data.state);
    data.postalCode && formData.append("postalCode", data.postalCode);

    const file = document.getElementById("profilePicture").files[0];
    formData.append("image", file);

    try {
      await mutateAsync({ formData, id: user.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen md:p-20 p-4 bg-primary/5 flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          <form onSubmit={handleSaveChanges}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                Profile Picture
              </label>
              <div className="relative">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="mt-4 w-32 h-32 rounded-full object-cover" />
                ) : (
                  <div className="mt-4 w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Upload Image</span>
                  </div>
                )}
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-4 w-full">
                <InputComponent
                  name="firstName"
                  type="text"
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  defaultValue={user?.firstName}
                />
                <InputComponent
                  name="lastName"
                  type="text"
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  defaultValue={user?.lastName}
                />
              </div>
              <InputComponent
                name="email"
                type="text"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                defaultValue={user?.email}
              />
              <InputComponent
                name="phone"
                type="tel"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                defaultValue={user?.phone}
              />
              <InputComponent
                name="street"
                type="text"
                onChange={(e) => setData({ ...data, street: e.target.value })}
                defaultValue={user?.address?.street}
              />
              <InputComponent
                name="city"
                type="text"
                onChange={(e) => setData({ ...data, city: e.target.value })}
                defaultValue={user?.address?.city}
              />
              <div className="flex space-x-4 w-full">
                <InputComponent
                  name="state"
                  type="text"
                  onChange={(e) => setData({ ...data, state: e.target.value })}
                  defaultValue={user?.address?.state}
                />
                <InputComponent
                  name="postal code"
                  type="text"
                  onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                  defaultValue={user?.address?.postalCode}
                />
              </div>
              <InputComponent
                name="country"
                type="text"
                onChange={(e) => setData({ ...data, country: e.target.value })}
                defaultValue={user?.address?.country}
              />

              <div className="flex items-center pt-8 justify-between">
                <Button
                  type="submit"
                  isLoading={isPending}
                  className=" w-full flex text-default-300  shadow-md text-sm font-medium rounded-md  bg-primary "
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
