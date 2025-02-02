import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchConvertToPSG,
  fetchUpdateUser,
  fetchUserByEmail,
  fetchUserVerify,
} from "../../API/call";
import TextInput from "../../components/TextInput";
import { toast } from "react-hot-toast";

const RegisterPagePSG = ({ switchPage }) => {
  const [psgEmail, setPsgEmail] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const PSG_COLLEGE =
      "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

    if (!searchParams.get("email")) return;
    const email = searchParams.get("email");
    setAuthEmail(email);
  }, [searchParams]);

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

  const handleSendVerification = () => {
    toast.promise(fetchConvertToPSG(authEmail, psgEmail), {
      loading: "Sending Verification Email",
      success: (res) => {
        fetchUserVerify(psgEmail)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        return "Verification Email Sent";
      },
      error: (err) => {
        console.log(err);
        return err.response.data
          ? err.response.data.error
          : "Error Sending Verification Email";
      },
    });
  };

  useEffect(() => {
    if (!authEmail || authEmail.length <= 0) return;
    if (authEmail.endsWith("psgtech.ac.in")) setPsgEmail(authEmail);
  }, [authEmail]);

  return (
    <div className="w-full h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6">
      <div className="">
        <h3 className="text-sm text-gray-500">Register for Yutira 2025</h3>
        <h1 className="text-2xl font-bold text-[#181818]">
          For PSG Tech Students
        </h1>
      </div>
      <p className="">
        Kindly enter your PSG College of Technology email ID to verify your
        student status.
      </p>
      <TextInput
        title="PSG Tech Email ID"
        valueState={[psgEmail, setPsgEmail]}
      />
      <p className="">
        Your official PSG Tech email address will get a verification link.
        Kindly click the link in the email to proceed with further registration.
      </p>
      <p>
        You will only be able to access the portal using your official PSG Tech
        email address, here onwards.
      </p>
      <button
        onClick={handleSendVerification}
        className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full"
      >
        Send Email for verification
      </button>
    </div>
  );
};

export default RegisterPagePSG;
