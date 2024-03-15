import React, { useEffect, useState } from "react";
import { FaSoundcloud } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Landing.css";
import { IoIosArrowForward } from "react-icons/io";


// Events

const Section3 = () => {
  const [consolee, setConsolee] = useState(0);
  const navigate = useNavigate();

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
    const element = document.querySelector("#anchor3");
    const eventsTexts = document.querySelectorAll(".events-text");
    const observer = new IntersectionObserver((entries) => {
      eventsTexts.forEach((eventsText) => {
        eventsText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  });

  const condition = `${parseFloat(consolee) + 0.25 >= 1 && parseFloat(consolee) + 0.25 <= 2
    ? "text-white"
    : "text-[#181818]"
    }`;

  return (
    <div className="w-full h-full relative">
      <section
        id="section3"
        className="h-full w-full relative lg:px-[calc(100vw/12)] lg:p-16 flex flex-col-reverse lg:flex-row items-center"
      >
        <div className="w-full lg:w-[70vw] h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 p-8 lg:px-24 lg:pl-0 font-poppins gap-4 md:gap-8 lg:gap-10">
            <div className="p-4 space-y-2 events-text opacity-0 delay-100">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=kriyative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5238d1] to-[#8938d1] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/kriyative.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
               
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Let your imagination run wild with Kriyative! Whether you're an
                experienced artist, a hobbyist or a curious beginner, our events
                will inspire you to think outside the box, experiment with new
                techniques and express your unique vision.
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event/?ctg=kriyative"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>

            <div className="p-4 space-y-2 events-text opacity-0 delay-100">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=brainiac"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8f3ccf] to-[#df51ad] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/brainiac.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
                <p className="bg-clip-text text-xl py-2 tracking-wide [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#8f3ccf] to-[#df51ad]">
                  {" Brainiac "}
                </p>
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Unlock Your Inner Genius: Join the Brainiac Brigade! Brainiac
                events are designed to challenge your intellect, ignite your
                curiosity and push the boundaries of your knowledge. From trivia
                challenges to mind-bending puzzles, there's something for every
                cerebral superhero.
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event?ctg=brainiac"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>

            <div className="p-4 space-y-2 events-text opacity-0 delay-500">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=coding"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dc4fab] to-[#eb587b] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/coding.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
                <p className="bg-clip-text text-xl py-2 tracking-wide [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#dc4fab] to-[#eb587b]">
                  {" Coding "}
                </p>
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Whether you're a seasoned coder or just starting out, our events
                offer something for everyone. Explore cutting-edge technologies,
                connect with like-minded coders, and compete for glory in our
                exciting challenges. Unleash the power of programming and take
                your skills to the next level at our Coding Events!
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event?ctg=coding"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>

            <div className="p-4 space-y-2 events-text opacity-0 delay-500">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=circuit"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#e8567c] to-[#f48555] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/circuit.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
                <p className="bg-clip-text text-xl py-2 tracking-wide [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#e8567c] to-[#f48555]">
                  {" Circuit "}
                </p>
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Delve into the world of circuit engineering! From digital
                electronics to power systems, our Circuit Events cover it all.
                Get ready to master the fundamentals of circuit design and don’t
                miss out on this high-voltage opportunity to supercharge your
                knowledge and network with fellow circuit enthusiasts!
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event?ctg=circuit"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>

            <div className="p-4 space-y-2 events-text opacity-0 delay-700">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=core"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#eac64a] to-[#2ea47e] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/core.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
                <p className="bg-clip-text text-xl py-2 tracking-wide [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#eac64a] to-[#2ea47e]">
                  {" Core Engineering "}
                </p>
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Unleash the engineer in you and dive into the world of
                innovation with our cutting-edge Core Engineering events at this
                Kriya! Discover the power of engineering, and explore endless
                possibilities to put your skills to the test.
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event?ctg=core"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>

            <div className="p-4 space-y-2 events-text opacity-0 delay-700">
              <Link
                className="flex items-center space-x-4"
                to="/portal/event?ctg=management"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#02b7e6] to-[#00c37b] flex items-center justify-center">
                  <div
                    style={{
                      background: `url(/assets/CatLogo/manager.png)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="w-6 h-6 invert"
                  ></div>
                </div>
                <p className="bg-clip-text text-xl py-2 tracking-wide [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#02b7e6] to-[#00c37b]">
                  {" Management "}
                </p>
              </Link>
              <p className={`${condition} text-xs pb-2 text-justify`}>
                Calling all aspiring leaders and entrepreneurs! Explore the
                dynamic world of Management at Kriya. From strategic planning to
                marketing and innovation, join us for an engaging and
                exhilarating set of events that will put your leadership skills
                to the test.
              </p>
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                to="/portal/event?ctg=management"
              >
                <p className="">Explore more</p>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={16}
                />
              </Link>
            </div>
          </div>
        </div>

        
      
      </section>
      <a
        id="anchor3"
        className="absolute top-[40%] lg:top-[75%] w-full h-20 -z-10"
      ></a>
      <div className="absolute top-[100%] w-full h-10"></div>
    </div>
  );
};

export default Section3;


const CodingIcon = ({ fill }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="32.000000pt"
      height="32.000000pt"
      viewBox="0 0 32.000000 32.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path
          d="M880 4585 l0 -296 -25 -24 -24 -25 -296 0 -295 0 0 -1840 0 -1840
1520 0 1520 0 0 880 0 880 -535 0 -536 0 -24 25 -25 24 0 831 0 831 25 24 24
25 536 0 535 0 0 400 0 400 -1200 0 -1200 0 0 -295z m2240 55 l0 -80 -1040 0
-1040 0 0 80 0 80 1040 0 1040 0 0 -80z m0 -320 l0 -80 -1040 0 -1040 0 0 80
0 80 1040 0 1040 0 0 -80z m-1120 -320 l0 -80 -800 0 -800 0 0 80 0 80 800 0
800 0 0 -80z m0 -320 l0 -80 -800 0 -800 0 0 80 0 80 800 0 800 0 0 -80z m0
-320 l0 -80 -800 0 -800 0 0 80 0 80 800 0 800 0 0 -80z m0 -320 l0 -80 -800
0 -800 0 0 80 0 80 800 0 800 0 0 -80z m0 -320 l0 -80 -800 0 -800 0 0 80 0
80 800 0 800 0 0 -80z m-880 -640 l0 -80 -135 0 c-131 0 -137 -1 -160 -25 -24
-23 -25 -28 -25 -176 l0 -152 -102 -103 -102 -104 102 -104 102 -103 0 -152
c0 -148 1 -153 25 -176 23 -24 29 -25 160 -25 l135 0 0 -80 0 -80 -136 0
c-170 0 -204 9 -269 75 -64 63 -75 100 -75 251 l0 118 -120 121 c-159 161
-159 149 0 310 l120 121 0 118 c0 65 5 137 12 160 15 51 99 137 148 153 19 6
99 11 178 12 l142 1 0 -80z m1594 68 c55 -16 138 -99 154 -154 7 -23 12 -95
12 -160 l0 -118 120 -121 c105 -106 120 -126 120 -155 0 -29 -15 -49 -120
-155 l-120 -121 0 -118 c0 -151 -11 -188 -75 -251 -65 -66 -99 -75 -269 -75
l-136 0 0 80 0 80 135 0 c131 0 137 1 160 25 24 23 25 28 25 176 l0 152 102
103 102 104 -102 104 -102 103 0 152 c0 148 -1 153 -25 176 -23 24 -29 25
-160 25 l-135 0 0 80 0 80 136 0 c78 0 154 -5 178 -12z m-1194 -548 l0 -80 80
0 80 0 0 -80 0 -80 -80 0 -80 0 0 -80 0 -80 -80 0 -80 0 0 80 0 80 -80 0 -80
0 0 80 0 80 80 0 80 0 0 80 0 80 80 0 80 0 0 -80z m640 0 l0 -80 80 0 80 0 0
-80 0 -80 -80 0 -80 0 0 -80 0 -80 -80 0 -80 0 0 80 0 80 -80 0 -80 0 0 80 0
80 80 0 80 0 0 80 0 80 80 0 80 0 0 -80z"
        />
        <path
          d="M535 4580 l-180 -180 183 0 182 0 0 180 c0 99 -1 180 -3 180 -1 0
-83 -81 -182 -180z"
        />
        <path d="M3440 4320 l0 -240 80 0 80 0 0 240 0 240 -80 0 -80 0 0 -240z" />
        <path
          d="M2320 3200 l0 -720 1280 0 1280 0 0 720 0 720 -1280 0 -1280 0 0
-720z m794 548 c55 -16 138 -99 154 -154 7 -23 12 -67 12 -98 l0 -56 -80 0
-80 0 0 55 c0 46 -4 60 -25 80 -23 24 -31 25 -135 25 -104 0 -112 -1 -135 -25
l-25 -24 0 -351 0 -351 25 -24 c23 -24 31 -25 135 -25 104 0 112 1 135 25 21
20 25 34 25 80 l0 55 80 0 80 0 0 -56 c0 -87 -18 -133 -75 -189 -63 -64 -100
-75 -245 -75 -62 0 -131 5 -154 12 -55 16 -138 99 -154 154 -8 29 -12 146 -12
394 0 248 4 365 12 394 15 51 99 137 148 153 48 15 263 16 314 1z m646 -388
l0 -80 80 0 80 0 0 -80 0 -80 -80 0 -80 0 0 -80 0 -80 -80 0 -80 0 0 80 0 80
-80 0 -80 0 0 80 0 80 80 0 80 0 0 80 0 80 80 0 80 0 0 -80z m640 0 l0 -80 80
0 80 0 0 -80 0 -80 -80 0 -80 0 0 -80 0 -80 -80 0 -80 0 0 80 0 80 -80 0 -80
0 0 80 0 80 80 0 80 0 0 80 0 80 80 0 80 0 0 -80z"
        />
        <path
          d="M3440 1385 l0 -936 -25 -24 -24 -25 -1416 0 -1415 0 0 -80 0 -80
1520 0 1520 0 0 1040 0 1040 -80 0 -80 0 0 -935z"
        />
      </g>
    </svg>
  );

};
