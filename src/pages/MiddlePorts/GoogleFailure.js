import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GoogleFailure = () => {
  useEffect(() => {
    localStorage.setItem("hasVideoPlayed", "false");
  }, []);
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen overflow-x-hidden bg-gray-200 flex font-poppins">
      <div className="hidden lg:block w-4 bg-gradient-to-t from-[#C80067] to-[#5451B6] h-screen"></div>
      <div className="h-screen w-full flex items-center justify-center">
        <section className="w-full lg:w-[40vw] h-screen lg:h-fit p-8 lg:px-16 bg-white shadow-lg flex flex-col">
          <div className="flex w-full justify-center lg:hidden items-center">
            <img
              src="/public/assets/Logo/yutira_rmbg.png"
              alt="Kriya black"
              className="lg:hidden h-24 w-auto opacity-70"
            />
          </div>
          <h1 className="font-bold text-2xl text-center">
            Failed to Sign in with Google
          </h1>
          <p className="mt-8">
            Failed to sign in with the provided Google Account. Kindly try again
            with another Google account or try registering with email.
          </p>
          <button
            onClick={() => navigate("/auth?type=login")}
            className="mt-8 bg-black px-6 py-3 rounded-lg text-white"
          >
            Go to Login Page
          </button>
        </section>
      </div>
    </main>
  );
};

export default GoogleFailure;
