import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../API/call";

const GOOGLE_ICON = "https://cdn-icons-png.flaticon.com/512/281/281764.png";

const RegisterPageSwitch = ({ switchPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("referral")) return;
    if (searchParams.get("referral") === "invalid")
      return toast.error("Invalid Referral Code");
  }, [searchParams]);

  const handleRegisterWithEmail = () => {
    setSearchParams({ ...searchParams, type: "signup", page: "details" });
  };

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-black space-y-6">
      <div className="flex w-full justify-center lg:hidden items-center">
        <img
          src="https://i.ibb.co/VF2bqLh/yutira-rmbg-1.png"
          alt="yutira black"
          className="lg:hidden h-24 w-auto opacity-70"
        />
      </div>
      <button
        onClick={() => navigate(-2)}
        className="flex hover:cursor-pointer group text-sm items-center space-x-2 text-white"
      >
        <MdOutlineArrowBackIosNew size={12} />
        <p className="group-hover:underline text-white">Back</p>
      </button>
      <h1 className="text-2xl font-bold text-white">
        Register for Yutira 2024
      </h1>
      <p className="text-white">Choose the method of Registration</p>
      <a
        href={`${BACKEND_URL}/api/auth/google`}
        className="bg-white shadow-lg px-4 py-3 w-full hover:bg-gray-300 transition-all border-gray-300 border-2 rounded-lg flex items-center justify-center space-x-6"
      >
        <img
          src={GOOGLE_ICON}
          className="h-6 aspect-square w-6"
          alt="Google Icon"
        />
        <p className="text-black">Register with Google</p>
      </a>
      <button
        className="bg-white hover:bg-gray-700 transition-all duration-500 w-full text-black rounded-lg py-3 px-4"
        onClick={(e) => handleRegisterWithEmail()}
      >
        Register with Email
      </button>
      <button
        onClick={(e) => switchPage("login")}
        className="w-full text-center text-white"
      >
        Already have an account ? <u>Login</u>
      </button>
    </div>
  );
};

export default RegisterPageSwitch;
