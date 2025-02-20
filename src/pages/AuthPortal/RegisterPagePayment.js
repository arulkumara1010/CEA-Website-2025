import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { fetchPayGeneral, fetchUserByEmail } from "../../API/call";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import colleges from "../CollegeList";
import { QRCodeCanvas } from "qrcode.react";
const PSG_COLLEGE =
  "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

const RegisterPagePayment = ({ switchPage }) => {
  const [isPSG, setIsPSG] = useState(false);
  const [formData, setFormData] = useState({});
  const [authEmail, setAuthEmail] = useState("");
  const [transaction, setTransaction] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const upiGeneralURL = `upi://pay?pa=1481267367@CBIN0280913.ifsc.npci&pn=Yutira%202025&am=${
    isPSG ? 100 : 150
  }&cu=INR&tn=General%20Registration%20Fee`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("email")) return;
    const email = searchParams.get("email");
    setAuthEmail(email);
    fetchUserByEmail(email)
      .then((res) => {
        setFormData(res.data.user);
        console.log(res.data.user, res.data.user.college === PSG_COLLEGE);
        setIsPSG(res.data.user.college === PSG_COLLEGE);
      })
      .catch((err) => {
        console.log("ERROR", err);
        if (err.response.status >= 400) navigate("/auth?type=login");
      });
  }, [searchParams]);

  const onStorageUpdate = (e) => {
    if (e.key === "txn") {
      console.log("STORAGE UPDATED", e.newValue);
      console.log(transaction);
      setSearchParams({
        ...searchParams,
        type: "signup",
        email: authEmail,
        page: "final",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  const handlePayNow = () => {
    fetchPayGeneral({
      email: formData.email,
      name: formData.name,
      kriyaId: formData.kriyaId,
      fee: isPSG ? 100 : 150,
    })
      .then((res) => {
        setTransaction(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!transaction) return;
    window.open("https://forms.gle/7VWF6eioNpefui4YA");
    navigate(`/portal/profile`);
  }, [transaction]);

  const handlePayLater = () => {
    setSearchParams({
      ...searchParams,
      type: "signup",
      email: authEmail,
      page: "final",
    });
  };

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6">
      <div className="flex w-full justify-center lg:hidden items-center">
        <img
          src="https://i.ibb.co/VF2bqLh/yutira-rmbg-1.png"
          alt="yutira black"
          className="lg:hidden h-24 w-auto opacity-70"
        />
      </div>
      <div className="">
        <h3 className="text-sm text-gray-500">Register for Yutira 2025</h3>
        <h1 className="text-2xl font-bold text-[#181818]">
          Pay for your registration
        </h1>
      </div>
      {!isPSG ? (
        <p className="">
          The general registration for Yutira 2025 is{" "}
          <b className="font-semibold">Rs. 150</b>. You can pay now and register
          for all the events. You are also availed of the option to pay later.
        </p>
      ) : (
        <p className="">
          The general registration for Yutira 2025 is{" "}
          <b className="font-semibold">Rs. 100</b> for the students of PSG
          College of Technology. You can pay now and register for all the
          events. You are also availed of the option to pay later.
        </p>
      )}
      <div className="flex flex-col items-center space-y-4">
        <QRCodeCanvas value={upiGeneralURL} size={150} />
        <a href={upiGeneralURL} className="text-blue-500 font-semibold">
          Pay Now (Click here to open UPI link)
        </a>
      </div>
      <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-2 w-full">
        <button
          onClick={handlePayLater}
          className="border-2 border-black bg-white hover:bg-gray-100 transition-all duration-500 text-black text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
        >
          Pay Later
        </button>
        <button
          onClick={handlePayNow}
          className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
        >
          Go to Forms
        </button>
      </div>
      <p className="text-sm">
        * After the transaction, the payment cannot be refunded. For any
        queries,{" "}
        <Link className="text-blue-500 font-semibold" to="/?sn=section9">
          {" "}
          Contact us{" "}
        </Link>
        .
      </p>
      <button
        onClick={(e) => switchPage("login")}
        className="w-full text-center"
      >
        Already have an account ? <u>Login</u>
      </button>
    </div>
  );
};

export default RegisterPagePayment;
