import { Avatar } from '@nextui-org/react';
import React from 'react';
import { DashboardTab } from '../desktop/DashboardTab';

export default function MobileOverview() {
  return (
    <div>
          {/* ///hero */}
          <div className=" bg-primary text-white p-4 ">
              <div className="flex justify-between ">
                  <div className="">
                      <h1 className="font-bold text-lg">Overview</h1>

                  </div>
              <Avatar/>
              </div>
              <div className="w-[100%] overflow-x-auto ">
                  <DashboardTab/>
              </div>
          </div>
    </div>
  );
}
