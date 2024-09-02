import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../../utils/formatter";
import axios from "axios";
import { useSelector } from "react-redux";

export function DashboardTab() {
  const user = useSelector((state) => state.auth);
  const [data, setData] = useState({
    totalIncome: 0,
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    // Add more metrics as needed
  });

  const getMatrics = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_URL}/matrics`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setData({
            totalIncome: res.data.totalIncome,
            productsCount: res.data.totalProducts,
            ordersCount: res.data.totalOrders,
            usersCount: res.data.totalUsers,
          });
          console.log(res);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMatrics();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="md:bg-primary bg-white  md:text-white text-primary w-[250px] p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Income</h2>
          <p className="text-3xl">{formatCurrency(parseInt(data.totalIncome))}</p>
        </div>
        <div className="md:bg-primary bg-white  md:text-white text-primary w-[250px] p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Products</h2>
          <p className="text-3xl">{data.productsCount}</p>
        </div>
        <div className="md:bg-primary bg-white  md:text-white text-primary w-[250px] p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Orders</h2>
          <p className="text-3xl">{data.ordersCount}</p>
        </div>
        <div className="md:bg-primary bg-white  md:text-white text-primary w-[250px] p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Users</h2>
          <p className="text-3xl">{data.usersCount}</p>
        </div>
        {/* Add more metrics as needed */}
      </div>
    </div>
  );
}
