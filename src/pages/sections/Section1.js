import React, { useEffect, useRef, useState } from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { SiGmail, SiYoutube } from "react-icons/si";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

//  Landing

function Number({ n }) {
  const props = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.span>{props.number.to((n) => n.toFixed(0))}</animated.span>;
}

const Section1 = ({ scrollByVH }) => {
  const navigate = useNavigate();

  const slides = [
    "/assets/Landing/2two.jpg",
    "/assets/Landing/1one.jpg",
    "/assets/Landing/3three.jpg",
    "/assets/Landing/5five.jpg",
    "/assets/Landing/4four.jpg",
    "/assets/Landing/12twelve.jpg",
    "/assets/Landing/6six.jpg",
    "/assets/Landing/7seven.jpg",
    "/assets/Landing/11eleven.jpg",
    "/assets/Landing/13thirteen.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(1);
  const timeoutRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentSlide((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

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

  console.log(`url(/assets/Logo/Kriya_KLA_Logo_Final.png)`);

  useEffect(() => {
    const element = document.querySelector("#anchor1");
    const registrationPrompt = document.querySelector("#registration-prompt");
    const kriyaLogo = document.querySelector("#kriya-logo");
    const imageMulti = document.querySelector("#image-multi");
    const imageMulti2 = document.querySelector("#image-multi-2");
    const tagline = document.querySelector("#tagline");
    const navElements = document.querySelectorAll("#nav-button");

    const observer = new IntersectionObserver((entries) => {
      // numberTags.forEach((numberTag) => {
      //   numberTag.classList.add("animate-fade-in-bottom");
      // });
      if (entries[0].isIntersecting) {
        imageMulti.classList.add("animate-clip-in");
        kriyaLogo.classList.add("animate-bounce-in");
        registrationPrompt.classList.add("animate-flicker-in");
        imageMulti2.classList.add("animate-clip-in-side");
        tagline.classList.add("animate-clip-in-side");
        navElements.forEach((navElement) => {
          navElement.classList.add("animate-fade-in-slow");
        });
      }
      // else {
      //   imageMulti.classList.remove("animate-clip-in");
      //   kriyaLogo.classList.remove("animate-bounce-in");
      //   registrationPrompt.classList.remove("animate-flicker-in");
      // }
    });

    observer.observe(element);
  });

  return (
    <section
      id="section1"
      className="h-screen w-screen flex flex-row items-center relative "
    >
      <a id="anchor1" className="w-screen absolute h-20 top-[75vh] -z-10"></a>
      <div className="hidden lg:flex flex-col w-[25vw] h-full pl-[calc(100vw/24)] py-[calc(100vw/24)] justify-between">
        <div
          id="kriya-logo"
          className="w-36 h-36"
          style={{
            background: `url(/assets/Logo/Kriya_KLA_Logo_Final.png)`,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>

        <div className="space-y-4 flex flex-col items-start justify-start">
          <button
            onClick={() => {
              const element = document.querySelector("#section3");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            Events

          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#section4");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            Paper Presentations
          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#section5");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            Workshops
          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#section6");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            Sponsors
          </button>

          <button
            onClick={() => {
              const element = document.querySelector("#section8");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#section9");
              element.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left text-lg text-gray-600 font-poppins uppercase font-semibold tracking-wide hover:tracking-widest hover:translate-x-2 transition-all duration-300 ease-out hover:text-black"
          >
            Contact Us
          </button>
        </div>

        <div className="flex flex-row space-x-8">
          <button
            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/studentsunion-psgtech/",
                "_blank"
              )
            }
          >
            <BsLinkedin size={24} className=" text-gray-500 hover:text-black" />
          </button>
          <button
            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
            onClick={() =>
              window.open("https://www.instagram.com/kriya_psgtech/", "_blank")
            }
          >
            <BsInstagram
              size={24}
              className=" text-gray-500 hover:text-black"
            />
          </button>
          <button
            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
            onClick={() => window.open("mailto:events@psgkriya.in", "_blank")}
          >
            <SiGmail size={24} className=" text-gray-500 hover:text-black" />
          </button>
          <button
            className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
            onClick={() =>
              window.open(
                "https://youtube.com/c/StudentsUnionPSGTech",
                "_blank"
              )
            }
          >
            <SiYoutube size={24} className=" text-gray-500 hover:text-black" />
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
      </div>

      <div
        className="hidden lg:block w-[35vw] h-full relative"
        id="image-multi"
      >
        {slides.map((slide, index) => (
          <div
            className={`w-full h-full absolute top-0 right-0 left-0 transition-all duration-100 ease-linear ${currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            style={{
              background: `url(${slides[index]})`,
              backgroundPosition: "50% 50%  ",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>

      <div className="w-full lg:w-[35vw] h-full pb-8 pt-4 lg:px-16 lg:pb-12 lg:pt-24 flex flex-col items-center lg:items-start justify-between">
        <div className="flex items-center space-x-4 w-full px-6">
          <div
            className="lg:hidden w-32 h-28"
            style={{
              background: `url(/assets/Logo/Kriya_KLA_Logo_Final.png)`,
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>
          <div className="w-full font-poppins text-lg font-semibold tracking-wider text-gray-600">
            <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#C80067] to-[#5451B6]">
              March <br></br>
            </span>{" "}
            24<sup>th</sup>, 25<sup>th</sup> & 26<sup>th</sup> 2023
          </div>
        </div>
        <div
          className={`lg:hidden flex flex-row w-full ${isOpen && "shadow-lg"
            } h-[50vh]`}
        >
          <div className={`px-4 ${isOpen ? "h-full" : "h-fit"} z-10 bg-white`}>
            <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div
            className={`divide-y divide-gray-600 ${isOpen ? "h-full overflow-hidden" : "h-0 overflow-hidden"
              } transition-all ease-in-out duration-300`}
          >
            <div
              className={`w-full flex flex-col font-poppins absolute ${isOpen ? "z-20 h-[50%]" : "-z-20"
                } bg-white transition-all ease-in-out duration-300`}
            >
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  const element = document.getElementById("section3");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                id="nav-button"
                className={`w-full text-gray-600 text-left text-base py-2`}
              >
                Events
              </button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  const element = document.getElementById("section4");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                id="nav-button"
                className={`w-full text-gray-600 text-left text-base py-2`}
              >
                Paper Presentations
              </button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  const element = document.getElementById("section5");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                id="nav-button"
                className={`w-full text-gray-600 text-left text-base py-2`}
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
                className={`w-full text-gray-600 text-left text-base py-2`}
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
                className={`w-full text-gray-600 text-left text-base py-2`}
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
                className={`w-full text-gray-600 text-left text-base py-2`}
              >
                Contact Us
              </button>
              <div className="flex-1"></div>
              <div className="flex flex-row space-x-8 pb-8">
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/studentsunion-psgtech/",
                      "_blank"
                    )
                  }
                >
                  <BsLinkedin
                    size={24}
                    className=" text-gray-500 hover:text-black"
                  />
                </button>
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/kriya_psgtech/",
                      "_blank"
                    )
                  }
                >
                  <BsInstagram
                    size={24}
                    className=" text-gray-500 hover:text-black"
                  />
                </button>
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() =>
                    window.open("mailto:events@psgkriya.in", "_blank")
                  }
                >
                  <SiGmail
                    size={24}
                    className=" text-gray-500 hover:text-black"
                  />
                </button>
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() =>
                    window.open(
                      "https://youtube.com/c/StudentsUnionPSGTech",
                      "_blank"
                    )
                  }
                >
                  <SiYoutube
                    size={24}
                    className=" text-gray-500 hover:text-black"
                  />
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
            </div>
          </div>
          <div className="w-full h-full relative" id="image-multi-2">
            {slides.map((slide, index) => (
              <div
                className={`w-full h-full absolute top-0 right-0 left-0 ${currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                style={{
                  background: `url(${slides[index]})`,
                  backgroundPosition: "50% 50%  ",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            ))}
          </div>
        </div>

        <h1
          id="tagline"
          className="uppercase lg:delay-500 font-poppins text-3xl lg:text-[2.5rem] font-semibold ml-8 -mt-24 lg:-ml-40 lg:-mt-0 lg:mb-8"
        >
          <span className="bg-gradient-to-r from-[#C80067] to-[#7300fe] text-white leading-[3.25rem] lg:leading-[4rem] relative z-10">
            The Global Clash of Techno Talents.
          </span>
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="hidden lg:flex flex-row w-full text-[#3c4043] font-poppins font-semibold justify-between">
            <div className="w-1/3 flex flex-col items-center justify-between space-y-2">
              <div className="text-5xl">
                <Number n={35} />+
              </div>
              <h1 className="text-sm text-center tracking-wide uppercase">
                Events
              </h1>
            </div>
            <div className="w-1/3 flex flex-col items-center justify-between space-y-2">
              <div className="text-5xl">
                <Number n={12} />+
              </div>
              <h1 className="text-sm text-center tracking-wide uppercase">
                Workshops
              </h1>
            </div>
            <div className="w-1/3 flex flex-col items-center justify-between space-y-2">
              <div className="text-5xl">
                <Number n={6} />
              </div>
              <h1 className="text-xs text-center tracking-wide uppercase">
                Paper Presentations
              </h1>
            </div>
          </div>
          {localStorage.getItem("token") ? (
            <div className="flex flex-row space-x-6 lg:mt-8 items-center justify-center lg:px-12 w-full px-16 z-10">
              <button
                id="registration-prompt"
                className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#C80067] border-2 border-[#C80067] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                onClick={() => {
                  navigate("/portal/profile");
                }}
              >
                Dashboard
              </button>
              <button
                id="registration-prompt"
                className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-white text-[#C80067] border-2 border-[#C80067] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row space-x-6 lg:mt-8 items-center justify-center lg:px-12 w-full px-16 z-10">
              <button
                id="registration-prompt"
                className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#C80067] border-2 border-[#C80067] shadow-lg hover:scale-110 transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                onClick={() => {
                  navigate("/auth?type=signup");
                }}
              >
                Register
              </button>
              <button
                id="registration-prompt"
                className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-white text-[#C80067] border-2 border-[#C80067] shadow-lg hover:scale-110 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
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
          className={`flex flex-row space-x-8 lg:space-x-4 w-full justify-center ${consolee >= 0.75 && "invert"
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
              Students Union
            </p>
            <p className="font-poppins text-xs  w-fit">
              PSG College of Technology
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-[5vw] h-[70%] bg-[#7300fe]">
        <div className="w-full h-full relative">
          {slides.map((slide, index) => (
            <div
              className={`w-full h-full absolute top-0 right-0 left-0 ${currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              style={{
                background: `linear-gradient(to bottom, rgba(200,0,103,0.7) , rgba(84,81,182,0.7) ), url(${slides[index]})`,
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;

const MenuToggle = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="lg:hidden flex items-center p-1 text-gray-500 lg:hover:text-gray-300"
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
