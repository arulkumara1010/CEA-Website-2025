import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserByEmail } from "../../API/call";

// Countdown

const Section13 = ({ scrollYByVH }) => {
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


  

  const mobBgUrl = "/assets/sponsor_event.jpg";


  return (
      <section
        id="section2"
        className="lg:flex-row lg:justify-around items-center px-4 space-y-8  bg-no-repeat  [scroll-snap-align:start] flex flex-col" 
      >

      <div className="lg:w-[60%] w-full lg:h-full flex justify-center items-center">
      <img src={mobBgUrl} className="w-full"/>

      </div>


      

       

      </section>
  );
};

export default Section13;
