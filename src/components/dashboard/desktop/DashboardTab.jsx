import { formatCurrency } from "../../../utils/formatter";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchMatricsEP } from "../../../services";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie, Radar } from "react-chartjs-2";
import { useState } from "react";
import { ArchiveBoxIcon, ShoppingBagIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";

export function DashboardTab() {
  const user = useSelector((state) => state.auth);
  // utils/Data.js
  const Datal = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const data = {
    labels: ["Red", "Orange", "Blue"],
    datasets: [
      {
        data: Datal.map((data) => data.userGain),
        label: ["User Gain"],
        backgroundColor: ["#7628C5", "#FF0092", "#00C5A4"],
        borderWidth: 1,
        // borderColor: "#777",
        tension: 0.3,
      },
    ],
  };

  const {
    isPending,
    error,
    data: matrics,
  } = useQuery({
    queryKey: ["matrics"],
    queryFn: fetchMatricsEP,
    staleTime: 10 * 1000,
  });
  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className=" space-y-8">
      <h1 className="">Welcome, {user?.firstName}!</h1>
      <div className="flex flex-wrap gap-4">
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  p-6 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="text-sm uppercase ">Total Income</h2>
            <p className="text-3xl">{formatCurrency(parseInt(matrics?.totalIncome))}</p>
          </div>
          <div className="">
            <WalletIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  p-6 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="text-sm uppercase ">Total Products</h2>
            <p className="text-3xl">{matrics?.totalProducts}</p>
          </div>
          <div className="">
            <ArchiveBoxIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  p-6 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="text-sm uppercase ">Total Orders</h2>
            <p className="text-3xl">{matrics?.totalOrders}</p>
          </div>
          <div className="">
            <ShoppingBagIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  p-6 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="text-sm uppercase ">Total Users</h2>
            <p className="text-3xl">{matrics?.totalUsers}</p>
          </div>
          <div className="">
            <UserIcon className="h-6 w-6" />
          </div>
        </div>
        {/* Add more metrics as needed */}
      </div>

      <div className="grid md:grid-cols-3 gap-4 ">
        <div className="  bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
          <h1 className="">Daily Sales</h1>
          <div className="">
            <Line data={data} className="w-full" />
          </div>
        </div>
        <div className="bg-[#ffffff] p-6 rounded-lg border shadow">
          <h1 className="">Top Products</h1>
          <Doughnut data={data} />
        </div>
        <div className="bg-[#ffffff] p-6 rounded-lg border shadow">
          <h1 className="">Top Products</h1>
          <Radar data={data} />
        </div>
        <div className="bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
          <h1 className="">Daily User</h1>
          <div className="">
            <Bar data={data} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
