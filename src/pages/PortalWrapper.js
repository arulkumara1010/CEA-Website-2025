import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoMdClose, IoMdArrowDropright, IoMdLogOut } from "react-icons/io";
import {
  fetchEvents,
  fetchPapers,
  fetchUserByEmail,
  fetchWorkshops,
} from "../API/call";
import { AiOutlinePlus, AiOutlineHome } from "react-icons/ai";
import { GrWorkshop } from "react-icons/gr";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/gradientAnimation.css";
import { BiBuildingHouse } from "react-icons/bi";

const PortalWrapper = ({ children }) => {
  useEffect(() => {
    // Your logic here to reset hasVideoPlayed to false
    localStorage.setItem("hasVideoPlayed", "false");
  }, []);
  return (
    <main className="w-screen h-screen overflow-x-hidden flex items-center bg-[#181818] ">

      <NavBarForDesktop />
      <NavBarForMobile />
      <Outlet />
    </main>
  );
};

const NavBarForDesktop = () => {
  const events = fetchEvents()
    .map((event) => ({
      name: event.eventName,
      category: event.category,
      id: event.eventId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const goldEvents = fetchEvents()
    .filter((event) => event.category === "Gold")
    .map((event) => ({
      name: event.eventName,
      category: event.category,
      id: event.eventId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const papers = fetchPapers()
    .map((paper) => ({
      name: paper.eventName,
      id: paper.ppid,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const workshops = fetchWorkshops().map((workshop) => ({
    name: workshop.workName,
    id: workshop.wid,
  }));

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserDetails(res.data.user);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <nav className="hidden lg:block z-50 w-screen lg:w-1/4 bg-white fixed lg:relative top-0 max-h-screen lg:h-screen overflow-y-scroll font-poppins shadow-md">
      <div className="flex w-full z-10 justify-center items-center sticky top-0 bg-white px-6 shadow-sm">
        <Link
          to={"/"}
          className="w-28 h-28 mt-4"
          style={{
            background: `url(/assets/Logo/black.png)`,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></Link>
      </div>

      <div
        className={`divide-y divide-gray-600 h-fit transition-all ease-in-out duration-300 px-6 bg-black `}
      >
        <div className="py-8 w-full flex flex-col">
          {/* <Link to="/auth" className="w-full text-gray-600 text-left hover:text-black text-base py-2">
            Register
          </Link> */}
          {(!userDetails || !localStorage.getItem("token")) && (
            <button
              onClick={() => navigate("/auth?type=signup")}
              className="bg-white text-black rounded-lg px-6 py-3 text-lg mb-4"
            >
              Register/Login
            </button>
          )}
          <Link
            to="/"
            className="w-full text-white text-left hover:text-white text-base py-2 flex items-center space-x-4"
          >
            <AiOutlineHome className="text-2xl" />
            <p className="">Home</p>
          </Link>
          <Link
            to="/portal/event"
            className="w-full text-white text-left hover:text-white text-base py-2 flex items-center space-x-4"
          >
            <MdOutlineEmojiEvents className="text-2xl" />
            <p className="">Events</p>
          </Link>
          <Link
            to="/../?sn=section5"
            className="group w-full text-white text-left hover:text-white text-base py-2 flex items-center space-x-4"
          >
            <GrWorkshop className="text-xl opacity-70 group-hover:opacity-100" />
            <p className="">Workshops</p>
          </Link>
          <Link
            to="/../?sn=section4"
            className="w-full text-white text-left hover:text-white text-base py-2 flex items-center space-x-4"
          >
            <HiOutlinePresentationChartBar className="text-2xl" />
            <p className="">Paper Presentations</p>
          </Link>
          {/* <Link
            to="/portal/accommodation"
            className="w-full text-gray-600 text-left hover:text-black text-base py-2 flex items-center space-x-4"
          >
            <BiBuildingHouse className="text-2xl" />
            <p className="">Accommodations</p>
          </Link> */}
        </div>
        <div className="py-8">
          {/* <div className="flex space-x-4 items-center">
            <h3 className="text-base font-semibold py-3">Workshops</h3>
            <div className="w-fit h-fit p-2 rounded-lg"
              id="early-bird"
            >
              <p className="text-white text-xs font-poppins">✨ Early Bird Offer ✨</p>
            </div>
          </div> */}
          <h3 className="text-base text-white  font-semibold py-3">Workshops</h3>
          <WorkNav noMargin workshops={workshops} />
          <h3 className="text-base text-white font-semibold py-3">Events</h3>
          {/* <EventNav category="Kriyative" noMargin events={events} />
          <EventNav category="Brainiac" events={events} />
          <EventNav category="Coding" events={events} />
          <EventNav category="Amuse" events={events} />
          <EventNav category="Core Engineering" events={events} />
          <EventNav category="Management" events={events} />
          <h3 className="text-base font-semibold py-3">Gold Events</h3> */}
          <GoldNav noMargin goldEvents={goldEvents} />
          <h3 className="text-base text-white font-semibold py-3">Paper Presentations</h3>
          <PaperNav noMargin papers={papers} />
        </div>
      </div>

      {localStorage.getItem("token") && userDetails && (
        <div className="flex w-full z-10 justify-between items-center sticky bottom-0 bg-white shadow-black shadow-lg p-2 px-6 space-x-4">
          <Link
            to="/portal/profile"
            className="w-8 aspect-square h-8 rounded-full"
            style={{
              backgroundImage: `url(${userDetails?.profilePhoto})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Link>
          <Link to="/portal/profile" className="flex-1">
            <h2 className="text-base font-semibold">{userDetails?.name}</h2>
            <h4 className="text-xs text-gray-600">{userDetails.kriyaId}</h4>
          </Link>
          <button
            className=""
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <IoMdLogOut size={24} />
          </button>
        </div>
      )}
    </nav>
  );
};

const NavBarForMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const events = fetchEvents()
    .map((event) => ({
      name: event.eventName,
      category: event.category,
      id: event.eventId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const papers = fetchPapers()
    .map((paper) => ({
      name: paper.eventName,
      id: paper.ppid,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const workshops = fetchWorkshops().map((workshop) => ({
    name: workshop.workName,
    id: workshop.wid,
  }));

  const goldEvents = fetchEvents()
    .filter((event) => event.category === "Gold")
    .map((event) => ({
      name: event.eventName,
      category: event.category,
      id: event.eventId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const navOpen = document.querySelector("#navOpen");
    const elements = document.querySelectorAll("#navElements");

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        elements.forEach((tag) => {
          tag.classList.add("animate-fade-in-slow");
        });
      }
    });

    observer.observe(navOpen);
  });

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserDetails(res.data.user);
    });
  }, []);

  return (
    <nav className="lg:hidden z-50 w-screen lg:w-1/4 bg-black fixed lg:relative top-0 max-h-screen lg:h-screen overflow-y-scroll font-poppins shadow-md">
      <div className="flex w-full z-10 justify-between items-center sticky top-0 bg-black px-4">
        <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} className="" />
        <div className="flex justify-center">
          <Link
            to={"/"}
            className="w-[4.5rem] h-[3.25rem]"
            style={{
              background: `url(/assets/Logo/Kriya_KLA_Logo_Final.png)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></Link>
        </div>
        <div className="flex justify-end">
          {userDetails ? (
            <Link
              to={"/portal/profile"}
              className="w-8 h-8 rounded-full"
              style={{
                backgroundImage: `url(${userDetails?.profilePhoto})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></Link>
          ) : (
            <Link
              to={"/auth?type=login"}
              className="w-fit  rounded-lg text-black"
            >
              <FaRegUserCircle size={32} />
            </Link>
          )}
        </div>
      </div>

      <div
        className={`divide-y divide-gray-600 ${isOpen ? "h-fit" : "h-0 overflow-hidden"
          } transition-all ease-in-out duration-300`}
      >
        <div className="py-8 w-full flex flex-col px-6">
          <Link
            to="/"
            id="navElements"
            className="w-full text-white text-left hover:text-white text-base py-2"
          >
            Home
          </Link>
          {localStorage.getItem("token") && userDetails ? (
            <Link
              to="/portal/profile"
              className="w-full text-white text-left hover:text-white text-base py-2"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/auth?type=login"
              className="w-full text-white text-left hover:text-white text-base py-2"
            >
              Register / Login
            </Link>
          )}
          <Link
            to="/portal/event"
            id="navElements"
            className="w-full text-white text-left hover:text-white text-base py-2"
          >
            Event
          </Link>
          <Link
            to="/../?sn=section5"
            id="navElements"
            className="w-full text-white text-left hover:text-white text-base py-2"
          >
            Workshops
          </Link>
          <Link
            to="/../?sn=section4"
            id="navElements"
            className="w-full text-white text-left hover:text-white text-base py-2"
          >
            Paper Presentations
          </Link>
          {/* <Link
                        to="/portal/accommodation"
                        id="navElements"
                        className="w-full text-gray-600 text-left hover:text-black text-base py-2"
                    >
                        Accommodations
                    </Link> */}
        </div>
        <div className="py-8 pb-16 px-6" id="navOpen">
          <div className="flex space-x-4 items-center">
            <h3 className="text-white font-semibold py-3" id="navElements">
              Workshops
            </h3>
            {/* <div className="w-fit h-fit p-2 rounded-lg"
              id="early-bird"
            >
              <p className="text-white text-xs font-poppins">✨ Early Bird Offer ✨</p>
            </div> */}
          </div>
          <WorkNav
            openState={[isOpen, setIsOpen]}
            isMobile
            noMargin
            workshops={workshops}
          />
          <h3 className="text-base text-white font-semibold py-3" id="navElements">
            Event
          </h3>
          {/* <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Kriyative"
            noMargin
            events={events}
          />
          <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Brainiac"
            events={events}
          />
          <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Coding"
            events={events}
          />
          <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Amuse"
            events={events}
          />
          <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Core Engineering"
            events={events}
          />
          <EventNav
            openState={[isOpen, setIsOpen]}
            isMobile
            category="Management"
            events={events}
          />
          <h3 className="text-base font-semibold py-3" id="navElements">
            Gold Events
          </h3> */}
          <GoldNav
            openState={[isOpen, setIsOpen]}
            isMobile
            noMargin
            goldEvents={goldEvents}
          />
          <h3 className="text-base text-white  font-semibold py-3" id="navElements">
            Paper Presentations
          </h3>
          <PaperNav
            openState={[isOpen, setIsOpen]}
            isMobile
            noMargin
            papers={papers}
          />
        </div>

        {localStorage.getItem("token") && (
          <div className="flex w-full z-10 justify-between items-center sticky bottom-0 bg-white shadow-lg">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="py-4 px-6 flex flex-row items-center gap-x-4"
            >
              <IoMdLogOut className="text-2xl" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PortalWrapper;

const EventNav = ({
  category,
  noMargin = false,
  events,
  isMobile = false,
  openState = [true, () => { }],
}) => {
  const [isOpen, setIsOpen] = openState;
  const [hideContent, setHideContent] = useState(false);

  const navigate = useNavigate();

  const toTitleCase = (phrase) => {
    const wordsToIgnore = ["of", "in", "for", "and", "an", "or"];
    const wordsToCapitalize = ["it", "cad"];

    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (wordsToIgnore.includes(word)) {
          return word;
        }
        if (wordsToCapitalize.includes(word)) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  useEffect(() => {
    if (!isOpen) {
      setHideContent(false);
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <button
        className={`flex justify-between group items-center ${!noMargin && "mt-0"
          } my-2`}
        onClick={() => setHideContent(!hideContent)}
        id="navElements"
      >
        <div>
          <IoMdArrowDropright
            className={`text-lg text-gray-500 ${hideContent ? "rotate-90" : "rotate-0"
              } transition-all`}
          />
        </div>
        <p
          className={`w-full text-sm uppercase tracking-widest text-gray-500 py-2 pl-1`}
        >
          {category}
        </p>
      </button>
      <div
        className={`${!hideContent ? "h-0 overflow-hidden" : "flex h-fit mb-8"
          } transition-all overflow-hidden flex flex-col`}
        id="navElements"
      >
        {events
          .filter((e) => e.category === category)
          .map((e) =>
            isMobile ? (
              <button
                onClick={(event) => {
                  console.log("clicked", e);
                  setIsOpen(!isOpen);
                  navigate(`/portal/event/${e.id}`);
                }}
                className="w-full text-white text-left hover:text-white text-base py-2 px-8 block"
              >
                {toTitleCase(e.name)}
              </button>
            ) : (
              <Link
                to={`/portal/event/${e.id}`}
                className="w-full text-white text-left hover:text-white text-base py-2 px-8 block"
              >
                {toTitleCase(e.name)}
              </Link>
            )
          )}
      </div>
    </React.Fragment>
  );
};

const GoldNav = ({
  noMargin = false,
  goldEvents,
  isMobile = false,
  openState = [true, () => { }],
}) => {
  const [isOpen, setIsOpen] = openState;
  const [hideContent, setHideContent] = useState(false);
  const navigate = useNavigate();

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  useEffect(() => {
    if (!isOpen) {
      setHideContent(false);
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <div
        className={`${"flex h-fit mb-4"} transition-all overflow-hidden flex flex-col`}
        id="navElements"
      >
        {goldEvents.map((e) =>
          isMobile ? (
            <button
              onClick={(event) => {
                console.log("clicked", e);
                setIsOpen(!isOpen);
                navigate(`/portal/event/${e.id}`);
              }}
              className="w-full text-white text-left hover:text-whitetext-base py-2 px-4 block"
            >
              {toTitleCase(e.name)}
            </button>
          ) : (
            <Link
              to={`/portal/event/${e.id}`}
              className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
            >
              {toTitleCase(e.name)}
            </Link>
          )
        )}
      </div>
    </React.Fragment>
  );
};

const WorkNav = ({
  noMargin = false,
  workshops,
  isMobile = false,
  openState = [true, () => { }],
}) => {
  const [isOpen, setIsOpen] = openState;
  const [hideContent, setHideContent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setHideContent(false);
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <div
        className={`${"flex h-fit"} transition-all overflow-hidden flex flex-col`}
        id="navElements"
      >
        {workshops
          .filter((item, index) => index < 3)
          .map((e) =>
            isMobile ? (
              <button
                onClick={(event) => {
                  console.log("clicked", e);
                  setIsOpen(!isOpen);
                  navigate(`/portal/workshop/${e.id}`);
                }}
                className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
              >
                {e.name}
              </button>
            ) : (
              <Link
                to={`/portal/workshop/${e.id}`}
                className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
              >
                {e.name}
              </Link>
            )
          )}
      </div>
      <button
        className={`flex justify-between group items-center ${!noMargin && "mt-0"
          } my-2 pl-2`}
        onClick={() => setHideContent(!hideContent)}
        id="navElements"
      >


      </button>
      <div
        className={`${!hideContent ? "h-0 overflow-hidden" : "flex h-fit mb-8"
          } transition-all overflow-hidden flex flex-col`}
        id="navElements"
      >
        {workshops
          .filter((item, index) => index >= 3)
          .map((e) =>
            isMobile ? (
              <button
                onClick={(event) => {
                  console.log("clicked", e);
                  setIsOpen(!isOpen);
                  navigate(`/portal/workshop/${e.id}`);
                }}
                className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
              >
                {e.name}
              </button>
            ) : (
              <Link
                to={`/portal/workshop/${e.id}`}
                className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
              >
                {e.name}
              </Link>
            )
          )}
      </div>
    </React.Fragment>
  );
};

const PaperNav = ({
  noMargin = false,
  papers,
  isMobile = false,
  openState = [true, () => { }],
}) => {
  const [isOpen, setIsOpen] = openState;
  const [hideContent, setHideContent] = useState(false);
  const navigate = useNavigate();

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  useEffect(() => {
    if (!isOpen) {
      setHideContent(false);
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <div
        className={`${"flex h-fit mb-4"} transition-all overflow-hidden flex flex-col`}
        id="navElements"
      >
        {papers.map((e) =>
          isMobile ? (
            <button
              onClick={(event) => {
                console.log("clicked", e);
                setIsOpen(!isOpen);
                navigate(`/portal/paper/${e.id}`);
              }}
              className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
            >
              {toTitleCase(e.name)}
            </button>
          ) : (
            <Link
              to={`/portal/paper/${e.id}`}
              className="w-full text-white text-left hover:text-white text-base py-2 px-4 block"
            >
              {toTitleCase(e.name)}
            </Link>
          )
        )}
      </div>
    </React.Fragment>
  );
};

const MenuToggle = ({ isOpen, setIsOpen, className }) => {
  return (
    <button
      className={`${className} lg:hidden relative z-20 flex items-center p-1 text-white lg:hover:text-white`}
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