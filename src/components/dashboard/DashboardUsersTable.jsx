import React from "react";

export function DashboardUsersTable() {
  const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Administrator" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "User" },
    // Add more users as needed
  ];

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
          {usersData.map((user, index) => (
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
