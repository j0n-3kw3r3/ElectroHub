import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchUsersEP, toggleRoleEP } from "../../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserProps } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "../../../assets/image/avatar.svg";

export function DashboardUsersTable() {
  const [filtersUsers, setFiltersUsers] = useState([]);
  const queryClient = useQueryClient(); // Get the query client instance

  const { mutateAsync } = useMutation({
    mutationFn: toggleRoleEP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSwitch = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update product");
    }
  };

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersEP,
    staleTime: 3 * 1000,
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Function filters logistics data based on search input
  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!users) return;
    const filteredData = users.filter((item: UserProps) => {
      return (
        item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFiltersUsers(filteredData ? filteredData : users);
  };

  return (
    <div className="overflow-x-auto  space-y-4 ">
      <div className="flex justify-end ">
        <div className="flex items-center p-1 px-3 rounded border  text-default-600 placeholder-default-600/70 w-fit  ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none border-none transition text-sm duration-150 ease-in-out"
            style={{ backdropFilter: "blur(5px)" }}
            // onChange={handleSearchUser}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
      </div>
      <div className="overflow-x-auto relative border shadow-md sm:rounded-lg space-y-4 ">
        <table className="w-full text-sm text-left text-gray-500  ">
          <thead className="text-xs text-primary font-[700] uppercase border border-b-primary ">
            <tr>
              <th scope="col" className="py-3 px-6">
                {" "}
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6 ">
                toggle admin
              </th>
            </tr>
          </thead>
          <tbody>
            {filtersUsers.length > 0
              ? filtersUsers.map((user: UserProps, index) => (
                  <tr key={user?.id} className={`${index % 2 === 0 ? "bg-white/80" : "bg-gray-50"} hover:bg-primary/5`}>
                    <td className="py-4 px-6">
                      <Avatar>
                        <AvatarImage
                          className=" w-full h-full overflow-hidden rounded-full "
                          src={(user.profilePicture && user.profilePicture[0]?.url) ?? ""}
                        />
                        <AvatarFallback>
                          <span aria-label="avatar" className=" w-full h-full overflow-hidden rounded-full " role="img">
                            <img src={avatar} alt="" />
                          </span>
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="py-4 px-6">
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.role}</td>
                  </tr>
                ))
              : users.map((user: UserProps, index: number) => (
                  <tr key={user?.id} className={`${index % 2 === 0 ? "bg-white/80" : "bg-gray-50"} hover:bg-primary/5`}>
                    <td className="py-4 px-6">
                      <Avatar>
                        <AvatarImage
                          className=" w-full h-full overflow-hidden rounded-full "
                          src={(user.profilePicture && user.profilePicture[0]?.url) ?? ""}
                        />
                        <AvatarFallback>
                          <span aria-label="avatar" className=" w-full h-full overflow-hidden rounded-full " role="img">
                            <img src={avatar} alt="" />
                          </span>
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="py-4 px-6">
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.role}</td>
                    <td className="py-4 px-6">
                    <Switch checked={ user?.role === "admin" } onCheckedChange={ () => handleSwitch(user.id) }  />
                      <p> {user?.role === "user" ? "user" : "admin"}</p>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
