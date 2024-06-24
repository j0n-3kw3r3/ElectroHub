import React, { useEffect, useState } from "react";



function getStatusColor(status) {
  switch (status) {
    case "Shipped":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}   

export function DashboardOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then((data) => setOrders(data));
  }, []);

  async function fetchOrders() {
    // Placeholder for fetching orders data
    // Replace with actual API call
    return [
      { id: 1, date: "2023-04-01", customer: "John Doe", total: "$100.00", status: "Shipped" },
      // Add more mock orders or fetch from an API
    ];
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Order ID
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Customer
            </th>
            <th scope="col" className="py-3 px-6">
              Total
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
              <td className="py-4 px-6">{order.id}</td>
              <td className="py-4 px-6">{order.date}</td>
              <td className="py-4 px-6">{order.customer}</td>
              <td className="py-4 px-6">{order.total}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
