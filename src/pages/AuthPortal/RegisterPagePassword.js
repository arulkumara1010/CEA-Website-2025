import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchUpdateUser,
  fetchUpdateUserPassword,
  fetchUserByEmail,
} from "../../API/call";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import colleges from "../CollegeList";
import { toast } from "react-hot-toast";

const RegisterPagePassword = ({ switchPage }) => {
  const [authEmail, setAuthEmail] = useState("");

  const [formData, setFormData] = useState({
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const PSG_COLLEGE =
      "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

    if (!searchParams.get("email")) return;
    const email = searchParams.get("email");
    setAuthEmail(searchParams.get("email"));
    fetchUserByEmail(email).catch((err) => {
      console.log("ERROR", err);
      if (err.response.status >= 400) navigate("/auth?type=login");
    });
  }, [searchParams]);

  const handleSubmit = () => {
    if (formData.password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return;
    }
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    toast.promise(
      fetchUpdateUserPassword(searchParams.get("email"), formData.password),
      {
        loading: "Updating password",
        success: (res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.user.email);
          setSearchParams({
            ...searchParams,
            type: "signup",
            page: "payment",
            email: authEmail,
          });
          return "Password updated successfully";
        },
        error: (err) => {
          console.log(err);
          return "Error updating password";
        },
      }
    );
  };

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6">
      <div className="flex w-full justify-center lg:hidden items-center">
        <img
          src="/public/assets/Logo/yutira_rmbg.png"
          alt="Kriya black"
          className="lg:hidden h-24 w-auto opacity-70"
        />
      </div>
      <div className="">
        <h3 className="text-sm text-gray-500">Register for Kriya 2024</h3>
        <h1 className="text-2xl font-bold text-[#181818]">
          Enter your password
        </h1>
      </div>
      <TextInput
        title="Password"
        className="w-full"
        type="password"
        valueState={[
          formData.password,
          (val) => setFormData({ ...formData, password: val }),
        ]}
      />
      <TextInput
        title="Confirm Password"
        type="password"
        className="w-full"
        valueState={[confirmPassword, setConfirmPassword]}
      />

      <button
        onClick={handleSubmit}
        className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full "
      >
        Submit
      </button>

      <button
        onClick={(e) => switchPage("login")}
        className="w-full text-center"
      >
        Already have an account ? <u>Login</u>
      </button>
    </div>
  );
};

export default RegisterPagePassword;
