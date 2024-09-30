import React, { useEffect, useState } from "react";
import { formatToCustomDate } from "../../../utils/formatter";
import { fetchOrdersEP } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function getStatusColor(status) {
  switch (status) {
    case "Shipped":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-primary/5 text-gray-800";
  }
}

export function DashboardOrders() {
  const [filtersOrders, setFiltersOrders] = useState([]);

  const {
    isPending,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrdersEP,
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Function filters logistics data based on search input
  const handleSearchOrder = (e) => {
    if (!orders) return;
    const filteredData = orders.filter((item) => {
      return (
        item.orderId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.user?.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.user?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.dateOrdered.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.totalAmount.toString().toLowerCase().includes(e.target.value.toLowerCase()) || // Corrected
        item.status.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFiltersOrders(filteredData ? filteredData : orders);
  };

  return (
    <div className=" relative  rounded-lg space-y-4">
      <div className="flex ">
        <div className="flex items-center p-1 px-3 rounded border  text-default-600 placeholder-default-600/70 w-fit  ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none border-none bg-transparent transition text-sm duration-150 ease-in-out"
            style={{ backdropFilter: "blur(5px)" }}
            onChange={handleSearchOrder}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide ">
        {orders.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500  ">
            <thead className="text-xs  uppercase border border-b-primary  ">
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
                  Email
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
              {filtersOrders.length > 0
                ? filtersOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`${index % 2 === 0 ? "bg-white/80" : "bg-gray-50"} hover:bg-primary/5`}
                    >
                      <td className="py-4 px-6">{order.orderId}</td>
                      <td className="py-4 px-6">{order.dateOrdered && formatToCustomDate(order.dateOrdered)}</td>
                      <td className="py-4 px-6">{order.user?.name}</td>
                      <td className="py-4 px-6">{order.user?.email}</td>
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
                  ))
                : orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`${index % 2 === 0 ? "bg-white/80" : "bg-gray-50"} hover:bg-primary/5`}
                    >
                      <td className="py-4 px-6">{order.orderId}</td>
                      <td className="py-4 px-6">{order.dateOrdered && formatToCustomDate(order.dateOrdered)}</td>
                      <td className="py-4 px-6">{order.user?.name}</td>
                      <td className="py-4 px-6">{order.user?.email}</td>
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
        )}{" "}
      </div>
    </div>
  );
}
