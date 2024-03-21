import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { SiGmail, SiYoutube } from "react-icons/si";
import { CgScrollV } from "react-icons/cg";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import BgPlate from "./yutira_1.png";
const variant1 = {
    initial: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 7,
            duration: 0.5,
        },
    },
};

function Section1v2({ scrollByVH }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    function Number({ n }) {
        const [animate, setAnimate] = useState(true);

        const props = useSpring({
            from: { number: 0 },
            number: n,
            immediate: !animate,
            onRest: () => setAnimate(false),
            config: { mass: 1, tension: 20, friction: 10 },
        });

        useEffect(() => {
            const handleScroll = (e) => {
                e.preventDefault();
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return <animated.span>{props.number.to((n) => n.toFixed(0))}</animated.span>;
    }

    const toggleSection = (e) => {
        setIsOpen(!isOpen);
    };

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

    return (
        <React.Fragment>

            <div
                className={`lg:hidden pt-12 flex flex-row w-screen ${isOpen && "shadow-lg"
                    } h-auto absolute`}
            >
                <div className={`px-4 ${isOpen ? "h-full pb-[110%]" : "h-fit"} z-40 bg-black`}>
                    <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />

                </div>
                <div
                    className={`w-screen divide-y divide-gray-600 ${isOpen ? "h-auto overflow-hidden z-60" : "hidden h-0 overflow-hidden"
                        } transition-all ease-in-out duration-300 w-5/6 bg-black`}
                >


                    <div
                        className={`w-5/6 flex flex-col font-poppins absolute ${isOpen ? "z-70 h-[50%]" : "-z-20"
                            } transition-all ease-in-out duration-300 bg-black`}
                    >
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                window.open("https://campustour.psgtech.ac.in")
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Campus Tour
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                window.open("/portal/accommodation")
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Accomodation
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section3");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Events
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section6");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Paper Presentations
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section5-2");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Workshops
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section6");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            Sponsors
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section8");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2`}
                        >
                            FAQs
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                const element = document.getElementById("section9");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            id="nav-button"
                            className={`w-full text-white text-left text-base py-2 mb-8`}
                        >
                            Contact Us
                        </button>



                        <div className="flex flex-row space-x-8 pb-8">

                            <button
                                className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                                onClick={() =>
                                    window.open(
                                        "https://www.instagram.com/cea_ici_psgtech/",
                                        "_blank"
                                    )
                                }
                            >
                                <BsInstagram
                                    size={24}
                                    className=" text-white hover:text-white"
                                />
                            </button>
                            <button
                                className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                                onClick={() =>
                                    window.open("mailto:cea.civil@psgtech.ac.in", "_blank")
                                }
                            >
                                <SiGmail
                                    size={24}
                                    className=" text-white hover:text-white"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center lg:hidden py-16">
                <img src="/assets/Logo/Yutira_black.png" />

            </div>

            <h1
                id="tagline"
                className="uppercase lg:hidden delay-500 font-poppins text-3xl lg:text-[3.5rem] font-semibold ml-8 -mt-24 mb-6 lg:-ml-40 lg:-mt-0 lg:mb-8"
            >
                <span className=" text-white leading-[7rem] lg:leading-[8rem] relative font-poppins">
                    BRIDGING IDEAS , BUILDING REALITIES.
                </span>
            </h1>
            <div className="w-screen flex flex-col items-center">
                <div className="lg:hidden flex flex-row w-full text-[#3c4043] font-poppins font-semibold justify-between">
                </div>
                {localStorage.getItem("token") ? (
                    <div className="flex flex-row space-x-6 lg:hidden mt-8 items-center justify-center lg:px-12 w-full px-16 z-10">
                        <button
                            id="registration-prompt"
                            className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                            onClick={() => {
                                navigate("/portal/profile");
                            }}
                        >
                            Dashboard
                        </button>
                        <button
                            id="registration-prompt"
                            className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-transparent text-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row space-x-6 lg:hidden mt-8 items-center justify-center lg:px-12 w-full px-16 z-10">
                        <button
                            id="registration-prompt"
                            className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                            onClick={() => {
                                navigate("/auth?type=signup");
                            }}
                        >
                            Register
                        </button>
                        <button
                            id="registration-prompt"
                            className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-transparent text-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                            onClick={() => {
                                navigate("/auth?type=login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>



            <div
                className={`flex flex-row space-x-8 lg:hidden  w-full justify-center ${consolee >= 0.75 && "invert"
                    }`}
            >
                <div
                    className="w-16 h-auto"
                    style={{
                        background: `url(https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png)`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                    }}
                ></div>
                <div className=" text-sm lg:text-base w-fit  ">
                    <p className="uppercase tracking-wider font-poppins text-sm w-fit">
                        Presented By
                    </p>
                    <p className="font-semibold font-poppins  mt-2 w-fit">
                        CEA and ICI-Students Chapter
                    </p>
                    <p className="font-poppins text-xs  w-fit">
                        PSG College of Technology
                    </p>
                </div>
            </div>


            {isOpen && (
                <div className="hidden lg:flex absolute top-0 left-0 transition-all w-1/2  max-h-max bg-black z-20 items-center">
                    <div className="lg:flex flex-col w-[25vw] h-full pl-[calc(100vw/24)] py-[calc(100vw/24)] justify-between">
                        <div className="lg:space-y-4 flex flex-col m-20 w-[80%]">

                            <button
                                onClick={() => {
                                    const element = document.getElementById("section3");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                Events
                            </button>
                            <button
                                onClick={() => {
                                    const element = document.getElementById("section4");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                Paper Presentations
                            </button>
                            <button
                                onClick={() => {
                                    const element = document.getElementById("section5-2");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                Workshop
                            </button>
                            <button
                                onClick={() => {
                                    const element = document.getElementById("section6");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                Sponsors
                            </button>

                            <button
                                onClick={() => {
                                    const element = document.getElementById("section8");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                FAQ
                            </button>
                            <button
                                onClick={() => {
                                    const element = document.getElementById("section9");
                                    console.log(element);
                                    element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-left text-lg text-white font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-white"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* MOB SECTION */}








            <div className="hidden lg:grid grid-rows-5 px-20 min-h-screen w-auto bg-transparent relative z-10">

                <img className="hidden md:hidden lg:block absolute -z-10 h-full w-full" src={BgPlate} alt="" />





                {/* first section */}
                <div className="flex row-span-3 bg-transparent flex-row justify-between">
                    <div className=" sm:hidden lg:flex flex-col w-auto">
                        {/* <img
              className="h-96  "
              src="/assets/Logo/Kriya_KLA_Logo_Final.png"
              alt="it is not available"
            /> */}
                    </div>

                    {/* nav section */}

                    <div className="flex flex-col mt-10 items-start justify-start ">
                        <div>
                            <ul className="flex flex-row justify-end text-sm ml-28">
                                {/* <li
                                    onClick={() => {
                                        navigate("/portal/accommodation")
                                    }}
                                    className="mt-5 text-sm text-gray-600 font-poppins uppercase hover:cursor-pointer tracking-wide  hover:text-black mx-4"
                                >
                                    Accommodation
                                </li> */}
                                {/* <li
                  onClick={() => {
                    const element = document.getElementById("section8");
                    element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 text-sm text-gray-600 font-poppins uppercase hover:cursor-pointer tracking-wide  hover:text-black mx-4"
                >
                  FAQ
                </li>
                <li
                  onClick={() => {
                    const element = document.getElementById("section9");
                    element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 text-sm text-gray-600 font-poppins uppercase hover:cursor-pointer tracking-wide hover:text-black mx-4"
                >
                  Contact Us
                </li> */}

                                <li
                                    onClick={() => {
                                        window.open("https://campustour.psgtech.ac.in/")
                                    }}
                                    className="mt-5 text-sm text-white font-poppins uppercase hover:cursor-pointer tracking-wide  hover:text-white mx-4"
                                >
                                    Campus Tour
                                </li>
                                <li
                                    onClick={() => {
                                        window.open("https://forms.gle/Fxeuz5SPBko2hYWq5")
                                    }}
                                    className="mt-5 text-sm text-white font-poppins uppercase hover:cursor-pointer tracking-wide  hover:text-white mx-4"
                                >
                                    Accommodation
                                </li>

                                {/* <li
                                    onClick={() => {
                                        const element = document.getElementById("section3");
                                        console.log(element);
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="mt-5 text-sm text-white font-poppins uppercase hover:cursor-pointer tracking-wide  hover:text-black mx-4"
                                >
                                    Events
                                </li> */}

                                <div className="flex ml-10 items-end justify-start h-full">
                                    <button
                                        className="h-16 w-16 bg-black rounded-full flex justify-center items-center"
                                        onClick={toggleSection}
                                    >
                                        {!isOpen ? (
                                            <AiOutlineMenu className="text-white " size={20} />
                                        ) : (
                                            <AiOutlineClose className="text-white " size={20} />
                                        )}
                                    </button>
                                </div>
                            </ul>
                        </div>

                        <div className="flex flex-col justify-end h-full items-start relative left-[2rem] mt-28">
                            <div className="flex justify-start items-start">
                                <div className="w-full font-poppins text-2xl font-semibold tracking-wider text-[#FFDC73] ">
                                    <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#FFC740] to-[#FFDC73]">
                                        April <br></br>
                                    </span>{" "}
                                    5<sup>th</sup>& 6<sup>th</sup> 2024
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-between mt-5">
                                <div className="w-full text-white text-start text-4xl font-bold text-red font-poppins">
                                    <h1 className="leading-10">
                                        BRIDGING{" "}
                                        <span className="decoration-slate-700">
                                            IDEAS , <br></br>
                                        </span>{" "}
                                    </h1>
                                    BUILDING REALITIES
                                    <div className="w-[60%] lg:w-[80%] ml-8 lg:ml-0  h-[4px] bg-gradient-to-r rounded-[2px] from-[#FFC740] to-[#FFDC73]"></div>
                                </div>
                                <div className="flex">
                                    <div className="hidden lg:flex flex-row w-full text-[#3c4043] font-poppins font-semibold justify-between mt-10 space-x-10">
                                        {/* <div className="w-1/3 flex flex-col items-center justify-between space-y-2">
                                            <div className="text-5xl">
                                                <Number n={40} />+
                                            </div>
                                            <h1 className="text-sm text-center tracking-wide uppercase">
                                                Events
                                            </h1>
                                        </div> */}
                                        {/* <div className="w-1/3 flex flex-col items-center justify-between space-y-2">
                                            <div className="text-5xl">
                                                <Number n={10} />+
                                            </div>
                                            <h1 className="text-sm text-center tracking-wide uppercase">
                                                Workshops
                                            </h1>
                                        </div> */}
                                        {/* <div className="w-1/3 flex flex-col items-center justify-between space-y-5">
                                            <div className="text-5xl">
                                                <Number n={4} />
                                            </div>
                                            <h1 className="text-xs text-center tracking-wide uppercase">
                                                Paper Presentations
                                            </h1>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex row-span-2 flex- bg-transparent max-w-full items-center justify-between">
                    <div className="flex flex-row space-x-8  justify-start  mt-32">

                        <button
                            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/cea_ici_psgtech/",
                                    "_blank"
                                )
                            }
                        >
                            <BsInstagram
                                size={24}
                                className=" text-white hover:text-white"
                            />
                        </button>
                        <button
                            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                            onClick={() => window.open("mailto:cea.civil@psgtech.ac.in", "_blank")}
                        >
                            <SiGmail size={25} className=" text-white hover:text-white" />
                        </button>

                        <button
                            style={{
                                background: `url(https://d1fdloi71mui9q.cloudfront.net/sdQF8AHkQY6RCSGRVJY5_HjZ8Yx97jSnr03x4)`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                            }}
                            className="w-6 h-6 invert hover:-translate-y-2 transition-all duration-500 ease-in-out opacity-60 hover:opacity-100"
                            onClick={() =>
                                window.open("https://linktr.ee/su.psgtech", "_blank")
                            }
                        ></button>
                    </div>
                    <div className="mt-32 ml-10">
                        <button
                            onClick={() => {
                                const element = document.querySelector("#section2");
                                element.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="text-left  text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
                        >
                            <CgScrollV size={30} />
                        </button>
                    </div>

                    <div className="flex flex-col justify-evenly">
                        <div className="flex flex-row space-x-5 mr-2 mb-5">
                            {localStorage.getItem("token") ? (
                                <div className="flex flex-row space-x-6 lg:items-center justify-center lg:px-12 w-full px-16 z-10">
                                    <button
                                        id="registration-prompt"
                                        className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                                        onClick={() => {
                                            navigate("/portal/profile");
                                        }}
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        id="registration-prompt"
                                        className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-transparent text-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                                        onClick={() => {
                                            localStorage.clear();
                                            window.location.reload();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-row space-x-6 lg:items-center justify-center lg: pl-10 w-full  z-10">
                                    <button
                                        id="registration-prompt"
                                        className="lg:text-lg font-semibold text-[white w-full text-center flex justify-center font-poppins text-white bg-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                                        onClick={() => {
                                            navigate("/auth?type=signup");
                                        }}
                                    >
                                        Register
                                    </button>
                                    <button
                                        id="registration-prompt"
                                        className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-transparent text-[#FFDC73] border-2 border-[#FFDC73] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                                        onClick={() => {
                                            navigate("/auth?type=login");
                                        }}
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row  mb-16">
                            <div className="flex ml-10">
                                <div
                                    className="w-16 h-16 "
                                    style={{
                                        background: `url(https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png)`,

                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain",
                                    }}
                                ></div>
                                <div className="flex flex-col ml-3 text-white">
                                    <p className="flex  font-semibold ">
                                        Presented By CEA and ICI-Students Chapter
                                    </p>
                                    <p className="text-sm">PSG College of Technology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
const MenuToggle = ({ isOpen, setIsOpen }) => {
    return (
        <button
            className="lg:hidden flex items-center p-1 text-white lg:hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            ) : (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            )}
        </button>
    );
};

export default Section1v2;
