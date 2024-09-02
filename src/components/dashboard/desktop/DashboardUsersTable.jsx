import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function DashboardUsersTable() {
  const auth = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_URL}/auth`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setUsers(res?.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
 ;

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {users.map((user, index) => (
            <tr key={user.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
