import { formatCurrency } from "../../../utils/formatter";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchMatricsEP } from "../../../services";  
import { useState } from "react";
import { ArchiveBoxIcon, ShoppingBagIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts";

export function DashboardTab() {
  const user = useSelector((state: any) => state.auth);
  // utils/Data.js
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    }, 
  ];
 

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
    <div className=" text-xs space-y-8">
      <h1 className="">Welcome, {user?.firstName}!</h1>
      <div className="flex flex-wrap gap-4">
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Income</h2>
            <p className="md:text-3xl text-lg ">{formatCurrency(parseInt(matrics?.totalIncome))}</p>
          </div>
          <div className="">
            <WalletIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Products</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalProducts}</p>
          </div>
          <div className="">
            <ArchiveBoxIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Orders</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalOrders}</p>
          </div>
          <div className="">
            <ShoppingBagIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Users</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalUsers}</p>
          </div>
          <div className="">
            <UserIcon className="md:size-6 size-5" />
          </div>
        </div>
        {/* Add more metrics as needed */}
      </div>

      <div className="grid md:grid-cols-3 gap-4 ">
        <div className="  bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
          <h1 className="">Daily Sales</h1>
          <div className=" w-full h-[400px]">
            {/* <Line data={data} className="w-full" /> */}
            <ResponsiveContainer>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                <XAxis dataKey="name" tick={{fill:"#did5db"}} tickLine={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#ffffff] p-6 rounded-lg border shadow">
          <h1 className="">Top Products</h1>
          <div className=" w-full h-[400px]">
            <ResponsiveContainer>
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={15} data={data}>
                <RadialBar  background dataKey="uv" />
                </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#ffffff] p-6 rounded-lg border shadow">
          <h1 className="">Top Products</h1>
          <div className=" w-full h-[400px]">
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
          <h1 className="">Daily User</h1>
          <div className=" w-full h-[400px]">
            <ResponsiveContainer >
              <BarChart width={5} height={40} data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
