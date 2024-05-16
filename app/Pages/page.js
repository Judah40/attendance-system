"use client";

import React, { useState } from "react";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { Department, Employee, Position } from "../utils";
import Image from "next/image";
import StickyHeadTable from "../components/Table";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import { supabase } from "../utils/supabase/client";
import {Spinner} from "react-activity"
import "react-activity/dist/library.css";

const page = () => {
  const [inputs, setInputs] = useState({});
  const [modal, setModal] = useState(true);
  const [isLoading, setIsLoading]=useState(false)
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSelect=(event)=>{
    const name = event.name;
    const value = event.value;
    setInputs((values) => ({ ...values, [name]: value }));

  }

  return (
    <div className=" flex flex-col w-full h-screen p-4 space-y-4">
      {modal && (
        <div className="fixed text-gray-700 z-50 bg-white bg-opacity-70 flex w-full h-full top-0 bottom-0 left-0 right-0 items-center justify-center">
          <div className="w-[600px] space-y-4 flex-col p-4 h-3/5 flex bg-white border rounded items-center">
            {/**header */}
            <div className="w-11/12 flex h-10 ">
              <h1 className="">Add Employee</h1>

              <div className="flex-1 justify-end flex">
                <button
                  onClick={() => setModal(false)}
                  className=" text-white  p-2 w-10 h-10 rounded-full"
                >
                  <IoIosCloseCircle color="red" size={24} />
                </button>
              </div>
            </div>

            {/**form */}
            <form
              onSubmit={(e) => {
                setIsLoading(true)
                e.preventDefault();
                console.log(inputs)
                supabase.auth.signUp({
                  email: inputs.email,
                  password: inputs.password,
                  options: {
                    data: {
                      first_name: inputs.firstname,
                      last_name: inputs.lastname,
                      position: inputs.Positions,
                      department: inputs.Department,
                      role: "employee",
                    },
                  },
                }).then((value)=>{
                  console.log(value)
                  setIsLoading(false)
                  alert("Successfully Created")
                }).catch((error)=>{
                  console.log(error)
                  setIsLoading(false)
                })
              }}
              className="grid grid-cols-2 gap-8"
            >
              {/**email */}
              <div className="flex flex-col ">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>
              {/**email */}
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  maxLength={8}
                  id="password"
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              {/**firstname */}
              <div className="flex flex-col">
                <label htmlFor="firstname">First Name</label>

                <input
                  id="firstname"
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  required
                />
              </div>
              {/**last name */}
              <div className="flex flex-col">
                <label htmlFor="lastname">Last Name</label>
                <input
                  maxLength={8}
                  id="lastname"
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  required
                />
              </div>
              {/**position */}
              <div className="flex flex-col space-y-4">
                <label htmlFor="firstname">Position</label>

                <select
                  name="Positions"
                  id="positions"
                  onChange={handleChange}
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                >
                  {Position.map((value, index) => (
                    <option key={index} value={value.role}>
                      {value.role}
                    </option>
                  ))}
                </select>
              </div>
              {/**ldepartment */}
              <div className="flex flex-col space-y-4">
                <label htmlFor="lastname">Department</label>
                <select
                  name="Department"
                  id="Department"
                  onChange={handleChange}
                  className="focus:ring-0 focus:rind-transparent border-b-2 decoration border-0"
                >
                  {Department.map((value, index) => (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center p-3 text-white hover:bg-orange-700 rounded bg-orange-500"
              >
              {
                isLoading?<Spinner/>:"Submit"
              }
                
              </button>
            </form>
          </div>
        </div>
      )}
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
        <div className="w-60 space-y-2 shadow-lg shadow-white hover:border-gray-400 flex flex-col flex-none h-60 border items-center justify-center  rounded-lg">
          <button
            type="button"
            onClick={() => {
              setModal(true);
            }}
            className="hover:cursor-pointer"
          >
            <IoIosAddCircle size={40} className="hover:text-gray-500" />
          </button>
        </div>

        {/**employee */}
        <div
          id="employee"
          className="flex overflow-x-auto space-x-6 items-center"
        >
          <div></div>
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
