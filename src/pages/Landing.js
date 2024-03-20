import React, { useEffect, useRef, useState } from "react";
import "../styles/Landing.css";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import Section8 from "./sections/Section8";
import Section9 from "./sections/Section9";
import Section10 from "./sections/Section10";
import Section11 from "./sections/Section11";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { fetchUserByEmail } from "../API/call";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { SiGmail, SiYoutube } from "react-icons/si";
import Section12 from "./sections/Section12";
import { IoMdClose } from "react-icons/io";
import Section3v4 from "./sections/Section3v4";
import Section1v2 from "./sections/Section1v2";
import Section13 from "./sections/Section13";
import Section52 from "./sections/Section5-2";
const Landing = () => {
  const [consolee, setConsolee] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [popup, setPopup] = useState(true);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      fetchUserByEmail(localStorage.getItem("email")).then((res) => {
        if (res.data.user.isPaid) {
          setPaid(true);
        }
      });
    } else {
      setPopup(false);
    }
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

  const getColorVal = (v) => {
    const a = 0.05; // alpha
    const w = 255; // white
    const b = 18; // black
    if (v < 1 - a) return b;
    let val = v % 2;
    if (val < a) return ((b - w) * (val - a)) / (2 * a) + b;
    if (val > a && val < 1 - a) return b;
    if (val > 1 - a && val < 1 + a)
      return ((w - b) * (val - 1 - a)) / (2 * a) + w;
    if (val > 1 + a && val < 2 - a) return w;
    if (val > 2 - a && val < 2)
      return ((b - w) * (a - 2)) / (2 * a) + (w + b) / 2;
  };

  useEffect(() => {
    if (!searchParams.get("sn")) return;
    const element = document.querySelector(`#${searchParams.get("sn")}`);
    element.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  const condition =
    parseFloat(consolee) + 0.25 >= 1 && parseFloat(consolee) + 0.25 <= 3;

  return (
    <React.Fragment>

      {/* <div className="bg-white p-4 hiddn rounded-lg fixed top-10 left-10 z-50">
        {consolee}
      </div> */}
      <div className="overflow-hidden">
        <NavBar consolee={consolee} />
        <NavBarForMobile consolee={consolee} />

        <main
          className={`w-screen overflow-x-hidden transition-all duration-300`}
          style={{
            background: `#0a0a0a`,

            flexBasis: "50%",
            overflowY: "scroll",
            transition: 'background 0.3 ease'
          }}
        >
          {!paid && popup && (
            <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-\[100\] hidden items-center justify-center`}>
              <div className="bg-gradient-to-l from-[#eccdde] to-[#cfbaea] w-[20rem] lg:w-[36rem] h-[24rem] p-8 rounded-2xl flex items-center justify-center relative">
                <button
                  className="absolute right-4 top-4 text-2xl text-black"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <IoMdClose />
                </button>
                <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-8 w-full lg:w-[60%] z-10 ml-20 ">
                  <h1 className={`text-3xl lg:text-4xl font-semibold font-poppins text-center lg:text-center`}>
                    Unlock the full{" "}
                    <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#C80067] to-[#5451B6]">
                      experience.
                    </span>
                  </h1>
                  <p className="text-lg font-poppins text-center lg:text-center">
                    Pay the general registration fee and gain access to the <b className="font-[500]">pro show</b> plus the chance to participate in <b className="font-[500]">all the exciting events</b>!
                  </p>
                  <button className="bg-[#5451B6] text-white font-poppins font-semibold text-lg px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
                    onClick={() => {
                      navigate("/auth/payment?type=GENERAL");
                    }}
                  >
                    Pay Now
                  </button>
                </div>
                {/* <img src="/assets/Design/im.png" alt="" className="hidden lg:block absolute bottom-0 right-0 rounded-br-2xl h-5/6" /> */}
              </div>
            </div>
          )}
          <Section1v2 scrollYByVH={consolee} />

          {/* <Section2 scrollYByVH={consolee} /> */}

          <Section3v4 scrollYByVH={consolee} />
          <Section4 scrollYByVH={consolee} />


          <Section5 scrollYByVH={consolee} />
          <Section52 scrollYByVH={consolee} />


          <Section6 scrollYByVH={consolee} />
          <Section7 scrollYByVH={consolee} />
          <Section8 />
          <Section9 />
        </main>
      </div>
    </React.Fragment>
  );
};

export default Landing;

const NavBar = ({ consolee }) => {
  const condition =
    parseFloat(consolee) + 0.25 >= 1 && parseFloat(consolee) + 0.25 <= 3;
  const navigate = useNavigate();

  return (
    <nav
      className={`${consolee >= 0.97 ? "fixed lg:flex" : "lg:hidden"
        } hidden top-0 w-full left-0 right-0 px-3 items-center justify-between lg:justify-evenly space-x-4 lg:space-x-8 z-[100] h-14 lg:h-12 shadow-md
      ${condition ? "bg-[#121212]" : "bg-black"} `}
    >
      <button
        onClick={(e) => {
          const element = document.getElementById("section3");
          element.scrollIntoView({ behavior: "smooth" });
        }}
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
      >
        Events
      </button>
      <button
        onClick={(e) => {
          const element = document.getElementById("section4");
          element.scrollIntoView({ behavior: "smooth" });
        }}
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
      >
        Paper Presentations
      </button>
      <button
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
        onClick={(e) => {
          const element = document.getElementById("section5");
          element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Workshops
      </button>

      <button
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
        onClick={(e) => {
          const element = document.getElementById("section6");
          element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Sponsors
      </button>



      <button
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
        onClick={(e) => {
          const element = document.getElementById("section8");
          element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        FAQs
      </button>
      <button
        className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
          } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
          } transition-all`}
        onClick={(e) => {
          const element = document.getElementById("section9");
          element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Contact Us
      </button>
      {localStorage.getItem("token") ? (
        <button
          className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
            } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
            } transition-all`}
          onClick={(e) => {
            navigate("/portal/profile");
          }}
        >
          Dashboard
        </button>
      ) : (
        <button
          className={`hidden lg:block text-xs w-1/12 ${condition ? "text-white" : "text-white"
            } leading-5 font-poppins ${condition ? "hover:text-white" : "hover:text-white"
            } transition-all`}
          onClick={(e) => {
            navigate("/auth?type=signup");
          }}
        >
          Register
        </button>
      )}
    </nav>
  );
};

const NavBarForMobile = ({ consolee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const condition =
    parseFloat(consolee) + 0.25 >= 1 && parseFloat(consolee) + 0.25 <= 3;

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserDetails(res.data.user);
    });
  }, []);

  useEffect(() => {
    const navOpen = document.querySelector("#landingNavOpen");
    const elements = document.querySelectorAll("#landingNavElements");

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        elements.forEach((tag) => {
          tag.classList.add("animate-fade-in-slow");
        });
      }
    });

    observer.observe(navOpen);
  });

  return (
    <nav
      className={`${consolee >= 0.25 ? "block" : "hidden"
        }  lg:hidden z-50 w-screen lg:w-1/4 ${!condition ? "bg-black" : "bg-black"
        } fixed lg:relative top-0 max-h-screen lg:h-screen overflow-y-scroll px-4 font-poppins shadow-md`}
    >
      <div className="flex w-full justify-between items-center sticky top-0 h-[3.25rem]">
        <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <button
          onClick={(e) => {
            const element = document.getElementById("section1");
            element.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-[4.5rem] h-[3.25rem] ${condition && "hidden"}`}
          style={{
            background: `url(public/assets/Logo/yutira_rmbg.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></button>
        <div className="flex justify-end">
          {userDetails ? (
            <Link
              to={"/portal/profile"}
              className={`w-8 h-8 rounded-full`}
              style={{
                backgroundImage: `url(${userDetails?.profilePhoto})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></Link>
          ) : (
            <Link to={"/auth?type=login"}>
              <FaRegUserCircle className={`text-3xl opacity-80 ${condition ? "text-white" : "text-black"}`} />
            </Link>
          )}
        </div>
      </div>

      <div
        className={`divide-y divide-gray-600 ${isOpen ? "h-fit" : "h-0 overflow-hidden"
          } transition-all w-5/6 ease-in-out duration-300`}
        id="landingNavOpen"
      >
        <div className="py-8 pl-4 w-full flex flex-col"
          id="landingNavElements"
        >
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section3");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            Events
          </button>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section4");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            Paper Presentations
          </button>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section5");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            Workshops
          </button>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section6");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            Sponsors
          </button>

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section8");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            FAQs
          </button>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              const element = document.getElementById("section9");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
              } text-left text-base py-2`}
            id="landingNavElements"
          >
            Contact Us
          </button>
          {localStorage.getItem("token") ? (
            <div>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  navigate("/portal/profile");
                }}
                className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
                  } text-left text-base py-2`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  localStorage.clear();
                  window.location.reload();
                }}
                className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
                  } text-left text-base py-2`}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                navigate("/auth?type=signup");
              }}
              className={`w-full ${condition ? "text-gray-200" : "text-gray-600"
                } text-left text-base py-2`}
            >
              Register / Login
            </button>
          )}
          <div className="flex flex-row space-x-8 pt-14">

            <button
              className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
              onClick={() =>
                window.open("https://www.instagram.com/kriya_psgtech/", "_blank")
              }
            >
              <BsInstagram
                size={24}
                className={`${condition ? "text-gray-400" : "text-gray-500"} hover:text-black`}
              />
            </button>
            <button
              className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
              onClick={() => window.open("mailto:cea.civil@psgtech.ac.in", "_blank")}
            >
              <SiGmail size={24} className={`${condition ? "text-gray-400" : "text-gray-500"} hover:text-black`} />
            </button>


          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuToggle = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="lg:hidden flex items-center p-1 text-red-300 lg:hover:text-white "
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
