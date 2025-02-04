import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EventGrid = ({
  handleClick = () => {},
  title = "",
  description = "",
  className = "",
  iconImg = "",
  date = "",
  time = "",
  arrowColor = "bg-[#181818]",
  imgurl = "",
  arrowCircleStart = "from-[#fff]",
  arrowCircleEnd = "to-[#fff]",
  topCurve = "bg-white",
  rightCurve = "bg-white",
  to = "",
}) => {
  const navigate = useNavigate();

  return (
    <button
      className="group relative transition-all hover:z-30 font-poppins w-full lg:w-[21rem] text-left"
      onClick={() => navigate(to)}
    >
      <div className="hidden lg:block absolute group-hover:shadow-lg opacity-0 -translate-y-20 group-hover:-translate-y-2 group-hover:opacity-100 left-0 top-[100%] w-full group-hover:scale-[110%] bg-gray-200 rounded-b-3xl px-4 pt-2 transition-all ease-in-out">
        <div className="flex flex-row justify-evenly py-4 text-gray-700">
          <div className="pt-2">
            <p className="font-poppins font-semibold text-center">
              {date}
              {date == "28" ? <sup>th</sup> : <sup>st</sup>}{" "}
              {date == "28" ? "February" : "March"}
            </p>
            <p className="font-poppins text-center">Date</p>
          </div>

          <div className="pt-2">
            <p className="font-poppins font-semibold text-center">{time}</p>
            <p className="font-poppins text-center">Time</p>
          </div>
        </div>
      </div>

      <div
        className={`${className} group-hover:shadow-lg z-20 text-lg text-blue rounded-xl lg:rounded-3xl h-full relative bg-gray-200 lg:group-hover:scale-[110%] transition-all`}
        style={{
          background: `url("${imgurl}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          onClick={() => navigate(to)}
          className={`hidden lg:block ${arrowColor} rounded-bl-3xl p-2  absolute top-0 right-0 z-20`}
        >
          <div className={`absolute top-0 -left-4 ${arrowColor}`}></div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick(e);
            }}
            className={`bg-gradient-to-tr ${arrowCircleStart} ${arrowCircleEnd} text-white rounded-full p-4`}
          >
            <FiArrowUpRight className="text-white text-3xl" />
          </button>
          <div className={`absolute -bottom-4 right-0 ${arrowColor}`}></div>
        </button>

        <div className="p-6 pb-3 rounded-t-3xl flex flex-row  lg:flex-col items-center lg:items-start">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center lg:mb-4 mr-4">
            <div
              style={{
                background: `url("${iconImg}")`,
                backgroundPosition: "center",
                backgroundSize: "cover,contain",
                backgroundRepeat: "no-repeat",
              }}
              className="w-8 h-8"
            ></div>
          </div>

          <p className="font-semibold font-poppins text-xl w-[70%] text-gray-200 tracking-wider">
            {title}
          </p>
        </div>

        <div className=" p-6 pt-3 lg:rounded-b-3xl backdrop-blur-sm lg:backdrop-blur-md lg:group-hover:backdrop-blur-none transition-all text-gray-200">
          <p className="font-poppins text-base [display:-webkit-box] [-webkit-line-clamp:3] overflow-hidden [-webkit-box-orient:vertical]">
            {description}
          </p>
        </div>

        <div className="lg:hidden shadow-lg w-full bg-gray-200 rounded-b-xl px-4 font-poppins">
          <div className="flex flex-row justify-evenly py-2 text-gray-700 text-base">
            <div className="pt-2">
              <p className="font-poppins font-semibold text-center">
                {date}
                {date == "28" ? <sup>th</sup> : <sup>st</sup>}{" "}
                {date == "28" ? "February" : "March"}
              </p>
              <p className="font-poppins text-center">Date</p>
            </div>

            <div className="pt-2">
              <p className="font-poppins font-semibold text-center">{time}</p>
              <p className="font-poppins text-center">Time</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default EventGrid;
