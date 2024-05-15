"use client";

import React from "react";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { Employee } from "../utils";
import Image from "next/image";
import StickyHeadTable from "../components/Table";

const page = () => {
  return (
    <div className=" flex flex-col w-full h-screen p-4 space-y-4">
      <div className="flex w-full h-20  items-center px-12">
        <div className="w-96 p-1 pl-4 flex rounded-full bg-transparent border shadow-md shadow-white">
          <input
            placeholder="Search Employee"
            className="flex-1 bg-transparent focus:outline-none appearance-none"
          />
          <div className="p-1">
            <FaSearch />
          </div>
        </div>

        <div className="flex-1 flex justify-end space-x-2">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <div className="relative flex-row flex group">
            <h1 className="hover:cursor-pointer">Admin</h1>

            <div className="absolute p-2 w-28 bg-white group-hover:block rounded hidden top-6 right-[0.1px]">
              <button className="flex space-x-3 items-center text-black text-xs hover:text-gray-500">
                <FaSignOutAlt color="red" size={24} />
                <h1>Sign Out</h1>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/**section 2 */}
      <div className="flex w-full p-2  items-center px-12 ">
        {/**filter */}
        <div></div>

        {/**employee */}
        <div
          id="employee"
          className="flex overflow-x-auto space-x-6 items-center"
        >
          {Employee &&
            Employee.map((value, index) => (
              <div
                key={index}
                className="w-60 space-y-2 shadow-lg shadow-white hover:border-gray-400 flex flex-col flex-none h-60 border items-center justify-center  rounded-lg"
              >
                <img src={value.image} className="w-12 h-12 rounded-full" />
                <h1>{value.name}</h1>
                <h1 className="font-light text-gray-400 text-xs">
                  {value.role}
                </h1>
                <button className="w-40 text-xs hover:border-gray-500 h-10 rounded-full border ">
                  Profile Details
                </button>
              </div>
            ))}
        </div>
      </div>

      {/**section*/}
      <div className="flex w-full p-2  items-center px-12 ">
        <StickyHeadTable />
      </div>
    </div>
  );
};

export default page;
