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
};

 

export default Section12;
