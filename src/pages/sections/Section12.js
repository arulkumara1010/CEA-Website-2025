import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserByEmail } from "../../API/call";

// Countdown

const Section12 = ({ scrollYByVH }) => {
  const [consolee, setConsolee] = useState(0);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      if (res.data.user.isPaid) {
        setPaid(true);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (event) => {
        setConsolee((window.pageYOffset / window.innerHeight).toFixed(2));
      },
      { passive: true }
    );
  }, [consolee]);

  const bgUrl = `${
 "/assets/Design/black.jpg"
  }`;

  const mobBgUrl = "/assets/Design/MOB.jpg";

  const condition = `${
    parseFloat(consolee) < 0.25 ? "text-[#181818]" : "text-white"
  }`;
  const borderCondition = `${
    parseFloat(consolee) < 0.25 ? "border-[#181818]" : "border-white "
  }`;

  return (
    <div className="w-full h-full relative">
      <section
        id="section2"
        className="lg:h-screen w-full relative [scroll-snap-align:start] flex flex-col lg:flex-row lg:bg-black bg-transparent"
      >
        <img src={bgUrl} className="hidden lg:block h-full" alt="ProShow"/>
        <img src={mobBgUrl} className="pt-16 w-full lg:hidden h-full" alt="ProShow"/>

        <div className="flex-1 h-full flex flex-col items-center lg:items-end justify-center px-12 lg:pl-0 bg-black">
          <h1
            className={`mt-8 lg:mt-0 text-4xl lg:text-4xl font-poppins font-semibold ${condition} text-center lg:text-right`}
          >
            Entry
            <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#C80067] to-[#5451B6]">
              {" included "}
            </span>
            with general registration!
          </h1>
          {localStorage.getItem("email") ? (
            <div>
              {paid ? (
                <div className="grid w-full ">
                
                <button
                  className={`mt-16 w-fit px-4 py-2 text-lg font-poppins rounded-lg relative left-0 ${borderCondition} ${condition} border `}
                  onClick={() => {
                    navigate("/portal/profile")
                  }}
                >
                 Dashboard
                </button>
                <p className="text-white font-poppins mt-10 flex-wrap" >Use your Kriya ID <br></br>Card for Entry *</p>
                  </div>
                
                

                
              ) : (
                <button
                  className="bg-blue-500 text-white w-fit px-4 py-3 rounded-xl font-poppins flex items-center group mt-16"
                  onClick={() => navigate("/auth/payment?type=GENERAL")}
                >
                  <p className=" text-lg">Pay general registration fee!</p>
                  <IoIosArrowForward
                    className="ml-2 transition-all group-hover:translate-x-2"
                    size={24}
                  />
                </button>
              )}
            </div>
          ) : (
            <button
              className="lg:text-lg font-semibold w-fit text-center flex justify-center font-poppins text-white bg-[#C80067] border-2 border-[#C80067] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg mt-16 whitespace-nowrap lg:whitespace-normal"
              onClick={() => {
                navigate("/auth?type=signup");
              }}
            >
              Register Now!
            </button>
          )}
          <div className="mt-8 lg:mt-5">
            <div className="flex flex-wrap justify-end space-x-4 items-center mt-4">
              
            </div>
          </div>
        </div>
      </section>
      <a id="anchor2" className="absolute top-[35%] w-full h-20 -z-10"></a>
    </div>
  );
};

export default Section12;
