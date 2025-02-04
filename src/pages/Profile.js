import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GrTransaction, GrWorkshop } from "react-icons/gr";
import {
  MdEventAvailable,
  MdOutlineCancel,
  MdOutlineEmojiEvents,
  MdPending,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { BsCheck2Circle } from "react-icons/bs";
import {
  fetchEventDetailsByEmail,
  fetchEvents,
  fetchPaperDetailsByEmail,
  fetchPaymentDetailsByEmail,
  fetchUserByEmail,
  fetchWorkshops,
  fetchPapers,
  fetchAccomodationDetailsByEmail,
} from "../API/call";
import { IoIosArrowForward, IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particleOptions from "../ParticleOptions";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [paperDetails, setPaperDetails] = useState(null);
  const [accomodationDetails, setAccomodationDetails] = useState(false);
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserDetails(res.data.user);
    });
  }, []);

  useEffect(() => {
    fetchPaymentDetailsByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data.data);
      setPaymentDetails(
        res.data.data
          .filter((i) => i.status !== "ERROR")
          .sort((a, b) => a.datetime.localeCompare(b.datetime))
          .reverse()
      );
    });
  }, []);

  useEffect(() => {
    fetchEventDetailsByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setEventDetails(res.data);
    });
  }, []);

  useEffect(() => {
    fetchPaperDetailsByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setPaperDetails(res.data);
    });
  }, []);

  useEffect(() => {
    fetchAccomodationDetailsByEmail(localStorage.getItem("email")).then(
      (res) => {
        if (res.data.accommodations) {
          setAccomodationDetails(true);
        }
      }
    );
  }, []);

  const [events, setEvents] = useState(
    fetchEvents()
      .map((event) => ({
        name: event.eventName,
        id: event.eventId,
        date: event.date,
        desc: event.one_line_desc ? event.one_line_desc : event.description,
        category: event.category,
        time: event.timing.split("to")[0],
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  );

  const [workshops, setWorkshops] = useState(fetchWorkshops());
  const [papers, setPapers] = useState(fetchPapers());

  return (
    <section className="w-screen font-poppins h-screen overflow-x-hidden overflow-y-scroll pt-24 pb-8 lg:pt-0 lg:pb-24">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="top-0 left-0 absolute"
        height="100vh"
        width="100vh"
        options={particleOptions}
      />
      <div className="hidden lg:block w-full h-36 bg-gradient-to-r from-[#C80067] to-[#5451B6]"></div>
      <div className="lg:px-16 py-12 text-white flex flex-col items-center lg:items-start">
        <div
          className="h-48 w-48 rounded-full bg-white lg:-mt-36 relative"
          style={{
            backgroundImage: `url(${userDetails?.profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <button
            className="text-2xl bg-gray-100 text-black rounded-full p-2 absolute bottom-6 -right-2"
            onClick={() => {
              
            }}
          >
            <MdOutlineModeEditOutline />
          </button> */}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-4xl mt-8 font-bold text-white text-center lg:text-left px-4 lg:px-0">
              {userDetails ? userDetails?.name : "XXXXX"}
            </h1>
            <h3 className="text-sm text-gray-300 mt-2 tracking-widest text-center lg:text-left ">
              Profile
            </h3>
          </div>
          {}
          {/* <button
            onClick={() => {
              navigate(`${accomodationDetails ? "/portal/acc-registered" : "/portal/accommodation"}`);
            }}
            className="flex items-center gap-2 mt-8 bg-[#C80067] text-white px-4 py-2 rounded-lg font-semibold"
          >
            {accomodationDetails ? "View your acommodation details here" : "Apply for Accommodation"}
            <IoIosArrowForward />
          </button> */}
        </div>
      </div>
      {userDetails && (
        <div className="grid gap-16 grid-cols-1 lg:grid-cols-2 text-white px-8 lg:px-16">
          <div className="w-full pr-8">
            <div className="flex items-center space-x-4 w-full">
              <AiOutlineUser className="text-2xl" />
              <h1 className="text-2xl">About</h1>
            </div>
            <div className="grid grid-cols-1 gap-y-1 w-full mt-8 space-y-2">
              <TextOutput
                className="w-full lg:grid-cols-[100px_minmax(400px,1fr)] grid"
                heading="Name"
                content={userDetails.name}
              />
              <TextOutput
                className="w-full lg:grid-cols-[100px_minmax(400px,1fr)] grid"
                heading="Yutira ID"
                content={userDetails.kriyaId}
              />
              <TextOutput
                className="w-full lg:grid-cols-[100px_minmax(400px,1fr)] grid"
                heading="Email"
                content={userDetails.email}
              />
              <TextOutput
                className="w-full lg:grid-cols-[100px_minmax(400px,1fr)] grid"
                heading="Phone"
                content={userDetails.phone}
              />
              <TextOutput
                className="w-full lg:grid-cols-[100px_minmax(400px,1fr)] grid"
                heading="College"
                content={userDetails.college}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center space-x-4 w-full">
              <GrTransaction className="text-2xl text-white invert" />
              <h1 className="text-2xl">Transactions</h1>
            </div>
            <div className="mt-8 space-y-4 max-h-[40vh] overflow-y-auto pr-4">
              {paymentDetails?.length === 0 && (
                <div className="space-y-4">
                  <p className="text-lg">
                    Uh oh! You have'nt made any transactions yet !
                  </p>
                  <Link
                    className="bg-blue-500 text-white w-fit px-4 py-2 mt-2 rounded-xl text-sm flex items-center group"
                    to="/auth/payment?type=GENERAL"
                  >
                    <div className="pr-4">
                      <p className="font-[500]">Unlock the full experience!</p>
                      <p className="font-[500] pb-1">
                        Pay the general registration fee
                      </p>
                    </div>
                    <IoIosArrowForward
                      className="ml-1 group-hover:ml-2 transition-all"
                      size={32}
                    />
                  </Link>
                </div>
              )}
              {paymentDetails?.map((payment) => (
                <div className="flex flex-row items-center space-x-4">
                  {payment.status === "SUCCESS" ? (
                    <BsCheck2Circle className="text-3xl text-green-500" />
                  ) : payment.status === "INITIATED" ? (
                    <MdPending className="text-3xl text-amber-500" />
                  ) : (
                    <BiErrorCircle className="text-3xl text-red-500" />
                  )}

                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs">
                      <p className="">
                        Transaction ID: {payment.transactionId}
                      </p>
                      <div className="flex flex-col items-end">
                        <p className="text-right">
                          {new Date(payment.datetime).toDateString()}
                        </p>
                        <p className="text-right">
                          {
                            new Date(payment.datetime)
                              .toTimeString()
                              .split("GMT")[0]
                          }
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        payment.status === "SUCCESS"
                          ? "text-green-500"
                          : payment.status === "INITIATED"
                          ? "text-amber-500"
                          : "text-red-500"
                      } flex items-center justify-between`}
                    >
                      <p className="lg:text-lg w-3/4">
                        {payment.eventId === "-1"
                          ? "General"
                          : "Workshop " + payment.eventId}{" "}
                        registration{" "}
                        {payment.status === "SUCCESS"
                          ? "paid successfully"
                          : payment.status === "INITIATED"
                          ? "payment initiated"
                          : "payment unsuccessful"}
                      </p>
                      <p className="lg:text-lg">Rs. {payment.fee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {paymentDetails?.length !== 0 && !userDetails.isPaid && (
              <Link
                className="bg-blue-500 text-white w-fit px-4 py-2 mt-2 rounded-xl text-sm flex items-center group"
                to="/auth/payment?type=GENERAL"
              >
                <div className="pr-4">
                  <p className="font-[500]">Unlock the full experience!</p>
                  <p className="font-[500] pb-1">
                    Pay the general registration fee
                  </p>
                </div>
                <IoIosArrowForward
                  className="ml-1 group-hover:ml-2 transition-all"
                  size={32}
                />
              </Link>
            )}
          </div>

          <div className="w-full lg:pr-8">
            <div className="flex items-center space-x-4 w-full">
              <MdOutlineEmojiEvents className="text-2xl text-white" />
              <h1 className="text-2xl">Registered Events</h1>
            </div>
            <div className="mt-8 space-y-4 max-h-[40vh] overflow-y-auto pr-4">
              {eventDetails?.length === 0 && (
                <div className="space-y-4">
                  <p className="text-lg">
                    Uh oh! You have'nt registered for any events yet !
                  </p>
                  <Link
                    className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                    to="/portal/event"
                  >
                    <p className="">Register for events here !</p>
                    <IoIosArrowForward
                      className="ml-1 group-hover:ml-2 transition-all"
                      size={16}
                    />
                  </Link>
                </div>
              )}
              {eventDetails?.map((event) => (
                <div className="">
                  <div className="flex items-center justify-between text-xs">
                    <p className="">Event ID: {event.eventId}</p>
                    <p className="">
                      {events.find((i) => i.id === event.eventId).date === "28"
                        ? "Feb"
                        : "March"}{" "}
                      {events.find((i) => i.id === event.eventId).date}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <Link
                      to={`/portal/event/${event.eventId}`}
                      className="lg:text-lg hover:text-blue-400 hover:underline"
                    >
                      {events.find((i) => i.id === event.eventId).name}
                    </Link>
                    <p className="text-sm lg:text-base max-w-[50%]">
                      {events.find((i) => i.id === event.eventId).time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center space-x-4 w-full">
              <GrWorkshop className="text-2xl text-white invert" />
              <h1 className="text-2xl">Registered Workshops</h1>
            </div>
            <div className="mt-8 space-y-4 max-h-[40vh] overflow-y-auto pr-4">
              {paymentDetails?.filter(
                (w) => w.type === "WORKSHOP" && w.status === "SUCCESS"
              ).length === 0 && (
                <div className="space-y-4">
                  <p className="text-lg">
                    Uh oh! You have'nt registered for any workshops yet !
                  </p>
                  <Link
                    className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                    to="/../?sn=section5"
                  >
                    <p className="">Register for workshops here !</p>
                    <IoIosArrowForward
                      className="ml-1 group-hover:ml-2 transition-all"
                      size={16}
                    />
                  </Link>
                </div>
              )}
              {paymentDetails
                ?.filter((w) => w.type === "WORKSHOP" && w.status === "SUCCESS")
                .map((workshop) => (
                  <div className="">
                    <div className="flex items-center justify-between text-xs">
                      <p className="">Workshop ID: {workshop.eventId}</p>
                      <p className="">
                        Feb{" "}
                        {workshops.find((i) => i.wid === workshop.eventId).date}
                      </p>
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                      <Link
                        to={`/portal/workshop/${workshop.eventId}`}
                        className="lg:text-lg hover:text-blue-400 hover:underline w-3/4"
                      >
                        {
                          fetchWorkshops().find(
                            (i) => i.wid === workshop.eventId
                          ).workName
                        }
                      </Link>
                      <p className="lg:text-lg">Rs. {workshop.fee}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full lg:pr-8">
            <div className="flex items-center space-x-4 w-full">
              <HiOutlinePresentationChartBar className="text-2xl text-white" />
              <h1 className="text-2xl">Registered Paper Presentations</h1>
            </div>
            <div className="mt-8 space-y-4 max-h-[40vh] overflow-y-auto pr-4">
              {paperDetails?.length === 0 && (
                <div className="space-y-4">
                  <p className="text-lg">
                    Uh oh! You have'nt registered for any paper presentations
                    yet !
                  </p>
                  <Link
                    className="bg-blue-500 text-white w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
                    to="/../?sn=section52"
                  >
                    <p className="">Register for paper presentations here !</p>
                    <IoIosArrowForward
                      className="ml-1 group-hover:ml-2 transition-all"
                      size={16}
                    />
                  </Link>
                </div>
              )}
              {paperDetails?.map((paper) => (
                <div className="">
                  <div className="flex items-center justify-between text-xs">
                    <p className="">Paper Presentation ID: {paper.paperId}</p>
                    <p className="">
                      Feb {papers.find((i) => i.ppid === paper.paperId).date}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <Link
                      to={`/portal/paper/${paper.paperId}`}
                      className="lg:text-lg hover:text-blue-400 hover:underline"
                    >
                      {papers.find((i) => i.ppid === paper.paperId).eventName}
                    </Link>
                    <p className="text-sm lg:text-base max-w-[50%]">
                      {papers.find((i) => i.ppid === paper.paperId).time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="lg:hidden flex flex-row w-full py-4"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <IoMdLogOut size={24} className="mr-4" />
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

const TextOutput = ({ heading, content, className = "" }) => {
  return (
    <div className={`${className}`}>
      <p className="font-semibold text-white">{heading}</p>
      <p className="text-white">{content}</p>
    </div>
  );
};

export default Profile;
