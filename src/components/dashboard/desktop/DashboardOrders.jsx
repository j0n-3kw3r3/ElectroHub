import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatToCustomDate } from "../../../utils/formatter";

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
  const user = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_URL}/orders`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setOrders(res?.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {orders.length > 0 ? (
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
                <td className="py-4 px-6">{order._id}</td>
                <td className="py-4 px-6">{order.createdAt && formatToCustomDate(order.createdAt)}</td>
                <td className="py-4 px-6">{order.user?.name}</td>
                <td className="py-4 px-6">{order.totalAmount}</td>
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
      ) : (
        <div className=" py-4 mx-auto w-fit text-gray-500 ">No Order.</div>
      )}
    </div>
  );
}
