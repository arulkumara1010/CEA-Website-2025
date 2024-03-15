import React, { useEffect, useState } from "react";
import { FaSoundcloud } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/Landing.css";
import { IoIosArrowForward } from "react-icons/io";
import { useSpring, animated } from "react-spring";

// Events

const Section11 = () => {
  const [consolee, setConsolee] = useState(0);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (event) => {
        setConsolee((window.pageYOffset / window.innerHeight).toFixed(2));
      },
      { passive: true }
    );
  }, [consolee]);

  useEffect(() => {
    const element = document.querySelector("#anchor11");
    const eventsTexts = document.querySelectorAll(".events-text");
    const observer = new IntersectionObserver((entries) => {
      eventsTexts.forEach((eventsText) => {
        eventsText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  }, []);

  const condition = "text-[#181818]";

  const condition_bg = "255,255,255";

  const condition_direction = "to bottom";

  function Number({ n }) {
    const props = useSpring({
      from: { number: 559990 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.span>
      {props.number.to((n) => n.toLocaleString('en-IN').split('.')[0])}
    </animated.span>;
  }

  return (
      <section
        id="section11"
        className="w-full relative lg:px-[calc(100vw/12)] lg:p-16 flex flex-col-reverse lg:flex-row items-center justify-center"
       >
       <a
        id="anchor11"
        className="hidden top-[40%] lg:top-[75%] w-full h-20 -z-10"
      ></a>
      <div className="hidden top-[100%] w-full h-10"></div>
      </section>
      
  );
};

export default Section11;