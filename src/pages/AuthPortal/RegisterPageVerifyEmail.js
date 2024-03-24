import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchUserByEmail, fetchUserVerify } from "../../API/call.js";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import colleges from "../CollegeList";
import { toast } from "react-hot-toast";

const RegisterPageVerifyEmail = ({ switchPage }) => {
  const [authEmail, setAuthEmail] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("email")) return;
    const email = searchParams.get("email");
    setAuthEmail(searchParams.get("email"));
    fetchUserByEmail(email)
      .then((res) => {
        console.log(res.data.user);
      })
      .catch((err) => console.log("ERROR", err));
  }, [searchParams]);

  useEffect(() => {
    if (!authEmail || authEmail.length <= 0) return;
    sendMail();
  }, [authEmail]);

  const sendMail = () => {
    console.log(authEmail)
    toast.promise(fetchUserVerify(authEmail), {
      loading: "Sending email...",
      success: (res) => { console.log(res); return "Email sent!"; },
      error: (err) => { console.log(err); return "Could not send email" }
    }
    )
  };

  const onStorageUpdate = (e) => {
    if (e.key === "verify_email") {
      console.log("STORAGE UPDATED", e.newValue);
      setSearchParams({
        ...searchParams,
        type: "signup",
        email: authEmail,
        page: "password",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6">
      <div className="">
        <h3 className="text-sm text-gray-500">Register for Yutira 2024</h3>
        <h1 className="text-2xl font-bold text-[#181818]">Verify your email</h1>
      </div>
      <p className="">
        Your email address <b className="font-semibold">{authEmail}</b> has
        received an email. Please click the link in the email to confirm your
        email address. You may proceed with registration after you have
        verified.
      </p>
      <p className="">
        If you have not received the email, please check your spam folder.
      </p>
      <button onClick={sendMail} className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full">
        Resend Email
      </button>
    </div>
  );
};

export default RegisterPageVerifyEmail;
