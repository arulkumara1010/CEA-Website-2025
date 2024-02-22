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
    parseFloat(consolee) < 0.40
      ? "/assets/Design/PC.jpg"
      : "/assets/Design/PC.jpg"
  }`;

  const mobBgUrl = "/assets/Design/135.jpg";

  const condition = `${
    parseFloat(consolee) < 0.25 ? "text-[#181818]" : "text-white"
  }`;
  const borderCondition = `${
    parseFloat(consolee) < 0.25 ? "border-[#181818]" : "border-white"
  }`;

  return (
    <div className="w-full h-full relative">
      <section
        id="section2"
        className="lg:h-screen w-full relative  [scroll-snap-align:start] flex flex-col lg:flex-row" 
      >

        <img src={bgUrl} className="hidden lg:block w-full  h-full " alt="Syed Subahan"/>
        <img src={mobBgUrl} className="mt-20 w-screen lg:hidden" alt="Syed Subahan"/>

        <div className=" lg:hidden flex-1 h-full flex flex-col items-center lg:items-end justify-center px-12 lg:pl-0">
          <h1
            className={`mt-8 lg:mt-0 text-4xl lg:text-4xl font-poppins font-semibold ${condition} transition-colors duration-300 ease-in-out text-center lg:text-right`}
          >
            Entry
            <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
              {" included "}
            </span>
            with general registration!
          </h1>


          {localStorage.getItem("email") ? (
            <div>
              {paid ? (
                <button
                  className={`mt-16 w-fit px-4 py-2 text-lg font-poppins rounded-lg tra ${borderCondition} transition-colors duration-300 ease-in-out ${condition} border`}
                  onClick={() => {
                    window.open(
                      "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230325T120000Z%2F20230325T150000Z&details=&location=PSG%20College%20of%20Technology&text=Kriya%20%2723%20Pro%20Show"
                    );
                  }}
                >
                  Add to Calendar
                </button>
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
          <div className="mt-8 lg:mt-16">
            <p className={`${condition} transition-colors duration-300 ease-in-out font-poppins text-lg text-center lg:text-right`}>
              Know more
            </p>
            <div className="flex flex-wrap justify-end space-x-4 items-center mt-4">
              {/* <button
                onClick={() =>
                  window.open(
                    "https://open.spotify.com/artist/3gQ8iee3y7UsGTMuhjzEuD"
                  )
                }
                className="border-[#1DB954] border-2 rounded-lg p-4 [box-shadow:0px_0px_32px_rgba(30,215,96,0.5)] hover:[box-shadow:0px_0px_32px_rgba(30,215,96,0.9)]"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
                  alt=""
                  className="w-8 h-8"
                />
              </button> */}
              <button
                onClick={() =>
                  window.open(
                    "https://youtube.com/c/StudentsUnionPSGTech"
                  )
                }
                className="border-[#ff0000] border-2 rounded-lg p-4 [box-shadow:0px_0px_32px_rgba(255,0,0,0.5)] hover:[box-shadow:0px_0px_32px_rgba(255,0,0,0.9)]"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                  alt=""
                  className="w-8 h-8"
                />
              </button>
              <button
                onClick={() =>
                  window.open("https://www.instagram.com/kriya_psgtech/")
                }
                className="border-[#C53A59] border-2 rounded-lg p-4 [box-shadow:0px_0px_32px_rgba(197,58,89,0.5)] hover:[box-shadow:0px_0px_32px_rgba(197,58,89,0.9)]"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                  alt=""
                  className="w-8 h-8"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
      <a id="anchor2" className="absolute top-[35%] w-full h-20 -z-10"></a>
    </div>
  );
};

export default Section12;
