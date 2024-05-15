"use client";

import Image from "next/image";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { supabase } from "./utils/supabase/client";

export default function Home() {
  // Validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <main className="flex-1 flex-col w-full h-screen items-center flex justify-center ">
      <Image src={"/logoat.png"} width={100} height={100} />
      <div className="w-[500px] p-4 flex-col items-center h-[60vh] flex border border-white shadow-lg shadow-white">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            supabase.auth
              .signInWithPassword({
                email: values.email,
                password: values.password,
              })
              .then((value) => {
                console.log(value);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-11/12 items-center flex flex-col space-y-4">
              <h1 className="text-xl">Login</h1>
              <div className="w-full">
                <Field
                  placeholder="Company Email"
                  className="w-full p-3 rounded text-black"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-full">
                <Field
                  placeholder="Password"
                  className="w-full p-3 rounded text-black"
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-40 h-10 bg-orange-500 rounded items-center justify-center flex"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
