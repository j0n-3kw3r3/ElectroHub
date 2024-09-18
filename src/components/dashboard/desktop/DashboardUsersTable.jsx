import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchUsersEP } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function DashboardUsersTable() {
  const [filtersUsers, setFiltersUsers] = useState([]);
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
  const handleSearchUser = (e) => {
    if (!users) return;
    const filteredData = users.filter((item) => {
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
            onChange={handleSearchUser}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg space-y-4 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase text-white bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {filtersUsers.length > 0
              ? filtersUsers.map((user, index) => (
                  <tr key={user?._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                  <td className="py-4 px-6">{user?.firstname} {user?.lastname }</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.role}</td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr key={user?._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                  <td className="py-4 px-6">{user?.firstname} {user?.lastname }</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.role}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
