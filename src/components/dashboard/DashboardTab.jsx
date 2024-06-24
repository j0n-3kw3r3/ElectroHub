import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatter";

export function DashboardTab() {
  const [data, setData] = useState({
    totalIncome: 0,
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    // Add more metrics as needed
  });

  async function fetchTotalIcomeCount() {
    // Simulate an API call
    return 520000; // Example count
  }
  async function fetchProductsCount() {
    // Simulate an API call
    return 120; // Example count
  }

  async function fetchOrdersCount() {
    // Simulate an API call
    return 80; // Example count
  }

  async function fetchUsersCount() {
    // Simulate an API call
    return 45; // Example count
  }

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Replace with actual data fetching logic
      const productsCount = await fetchProductsCount();
      const totalIncome = await fetchTotalIcomeCount();
      const ordersCount = await fetchOrdersCount();
      const usersCount = await fetchUsersCount();
      setData({ productsCount, ordersCount, usersCount, totalIncome });
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-primary text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Income</h2>
          <p className="text-3xl">{formatCurrency(parseInt(data.totalIncome))}</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Products</h2>
          <p className="text-3xl">{data.productsCount}</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Orders</h2>
          <p className="text-3xl">{data.ordersCount}</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase ">Total Users</h2>
          <p className="text-3xl">{data.usersCount}</p>
        </div>
        {/* Add more metrics as needed */}
      </div>
    </div>
  );
}
