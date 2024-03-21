import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUserByEmail } from "../../API/call";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import colleges from "../CollegeList";

const RegisterPageFinal = ({ switchPage }) => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const PSG_COLLEGE =
      "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

    if (!searchParams.get("email")) return;
    const email = searchParams.get("email");
    fetchUserByEmail(email)
      .then((res) => {
        console.log(res.data.user);
        setFormData(res.data.user);
      })
      .catch((err) => console.log("ERROR", err));
  }, [searchParams]);

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6">
      <div className="flex w-full justify-center lg:hidden items-center">
        <img
          src="https://i.ibb.co/c8nS8cg/yutira-rmbg.png"
          alt="Kriya black"
          className="lg:hidden h-24 w-auto opacity-70"
        />
      </div>
      <div className="">
        <h3 className="text-sm text-gray-500">Your Kriya ID is</h3>
        <h1 className="text-2xl font-bold text-[#181818]">
          {formData ? formData.kriyaId : "KRIYA00XXX"}
        </h1>
      </div>
      <p className="">
        The ticket for the event has been sent to your email{" "}
        <b className="font-semibold">
          {formData ? formData.email : "XXXXXX@.com"}
        </b>
        . You can login to the portal with your email address.
      </p>
      <p className=""> Thank you for registering for Kriya 2024.</p>
      <button
        className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </button>

    </div>
  );
};

export default RegisterPageFinal;
