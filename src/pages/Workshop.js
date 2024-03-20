import React, { useState, useEffect, useCallback } from "react";
import { IoMdCall, IoLogoWhatsapp } from "react-icons/io";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPaymentDetailsByEmail,
  fetchUserByEmail,
  fetchWorkshopById,
  fetchWorkshopStats,
} from "../API/call";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particleOptions from "../ParticleOptions";

const Workshop = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [earlyBird, setEarlyBird] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { id } = useParams();
    
  const [workshopDetail, setWorkshopDetail] = useState(null);

  useEffect(() => {
    setWorkshopDetail(fetchWorkshopById(id));
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      setIsLoggedIn(true);
    });
  }, []);

  useEffect(() => {
    fetchPaymentDetailsByEmail(localStorage.getItem("email")).then((res) => {
      setPaymentDetails(res.data.data);
    });
  }, []);

  useEffect(() => {
    fetchWorkshopStats().then((res) => {
      setCurrentCount(
        res.data?.workshopWiseCount.find((i) => i._id === id)?.count
      );
    });
  }, [id]);


  console.log(id);
  
  useEffect(() => {
    if (currentCount >= Number((workshopDetail?.maxCount / 100)  * 20)) {
      setEarlyBird(0);
    }
    else if(id === "WKSP0014"){
        setEarlyBird(0);
    }
    else {
      setEarlyBird(0);
    }
  }, [currentCount]);



  const handleRegister = () => {
    if (!isLoggedIn) {
      navigate("/auth?type=login");
      console.log("redirecting 1 ");
    } else {
      console.log("redirecting 2 ");
      navigate(`/auth/payment?type=WORKSHOP&eventId=${id}`);
    }
  };

  return !workshopDetail ? (
    <section className="w-full lg:px-16 font-poppins py-12 pt-36 lg:pt-12 h-screen overflow-y-scroll">
      <p className="text-white text-xl px-8">Loading...</p>
    </section>
  ) : (
    <section className="w-full lg:px-16 font-poppins py-12 pt-24 lg:pt-12 h-screen overflow-y-scroll">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="top-0 left-0 absolute"
        height="100vh"
        width="100vh"
        options={particleOptions}
      />
      {earlyBird && (
        <div className="flex w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)] overflow-x-hidden space-x-6 whitespace-nowrap py-2 mb-12 text-white bg-gradient-to-r from-[#C80067] to-[#5451B6] -mx-16">
          <div className="animate-marquee [will-change:transform] whitespace-nowrap flex space-x-6">
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
            <p className="">
              ✨ Early Bird Offer ! ✨ For first 20% registrations on all
              workshops
            </p>
          </div>
        </div>
      )}
      <div className="w-fit">
        <h1 className="text-3xl text-white font-semibold px-8 lg:px-0">
          {workshopDetail.workName}
        </h1>
        <div className="w-[60%] lg:w-[80%] ml-8 lg:ml-0 mt-2 h-[4px] bg-gradient-to-r rounded-[2px] from-[#3b82f6] to-[#8b5cf6]"></div>
      </div>{" "}
      {/* <h2 className="text-base mt-2 text-gray-400 tracking-widest px-8 lg:px-0">
        {workshopDetail.assnName}
      </h2> */}
      {id === "WKSP0009" ? (
        <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
          <p className="text-white whitespace-pre-line text-justify lg:text-left mt-8 text-base w-full lg:w-3/4 lg:pb-12 px-8 lg:px-0">
            {workshopDetail.desc}
          </p>
          <img
            src="/assets/Design/robot.png"
            alt=""
            className="w-3/4 lg:w-1/4"
          />
        </div>
      ) : (
        <p className="text-white whitespace-pre-line text-justify mt-8 text-base w-full lg:w-[90%] pb-12 px-8 lg:px-0">
          {workshopDetail.desc}
        </p>
      )}
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:px-0 my-6">
        <div className="bg-white w-full lg:w-2/3 lg:rounded-3xl lg:p-12 relative py-12 px-8">
          <div className="text-4xl font-bold mb-8 text-[#3c4043]">Agenda</div>

          {workshopDetail?.agenda.length > 0 && (
            <div>
              <div className="flex flex-row items-center gap-4 mb-8">
                <p className="text-6xl lg:text-6xl font-semibold tracking-wide text-[#3c4043]">
                  {workshopDetail.date}
                </p>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold tracking-wide text-[#3c4043]">
                    February
                  </p>
                  <p className="text-lg font-semibold tracking-wide text-[#3c4043]">
                    2024
                  </p>
                </div>
              </div>
              {workshopDetail?.agenda[0]?.map((item, index) => (
                <div className="ml-8">
                  <div className="flex flex-row gap-4 items-center">
                    <div className="w-6 h-6 z-10 rounded-full bg-[#3c4043]"></div>
                    <div className="text-xl font-semibold text-[#3c4043]">
                      {item.time}
                    </div>
                  </div>
                  <ol className="list-disc pt-2 border-l-[#3c4043] border-l-2 border-dashed ml-3 pl-12 pb-8 space-y-2">
                    {item.description.map((desc) => (
                      <li>{desc}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 space-y-4 flex flex-col justify-between">
          {
            id === "WKSP0006" ? (
              <>
                   <button
              className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
              onClick={() => {
                console.log("paymentDetails:", paymentDetails);
                console.log("currentCount:", currentCount);
                console.log("workshopDetail.maxCount:", workshopDetail?.maxCount);
  
                // Rest of your code...
  
                !paymentDetails
                  ?.filter((w) => w.type === "WORKSHOP" && w.status === "SUCCESS")
                  .find((i) => i.eventId === id) &&
                  // currentCount < workshopDetail.maxCount &&
                  (window.confirm("Are you sure you want to register ?")
                    ? handleRegister()
                    : console.log("Cancelled"));
              }}
            >
              {paymentDetails && (
                <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                  {paymentDetails
                    ?.filter(
                      (w) => w.type === "WORKSHOP" && w.status === "SUCCESS"
                    )
                    .find((i) => i.eventId === id) ? (
                    "Registered"
                  ) : currentCount / workshopDetail?.maxCount >= 0.5 &&
                    currentCount < workshopDetail?.maxCount ? (
                    <div>
                      Registrations Closing Soon!<br></br>
                      <span className="whitespace-nowrap text-sm font-normal bg-clip-text [-webkit-text-fill-color:transparent] bg-white lg:bg-[#3c4043]">
                        Limited Seats Available. Hurry Up!
                      </span>
                    </div>
                  ) : currentCount >= workshopDetail?.maxCount ? (
                    "Registrations Closed!"
                  ) : (
                    "Register Here for Session 1 !"
                  )}
                </span>
              )}
            </button>
            <button
              className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
              onClick={() => {
                console.log("paymentDetails:", paymentDetails);
                console.log("currentCount:", currentCount);
                console.log("workshopDetail.maxCount:", workshopDetail?.maxCount);
  
                // Rest of your code...
  
                !paymentDetails
                  ?.filter((w) => w.type === "WORKSHOP" && w.status === "SUCCESS")
                  .find((i) => i.eventId === id) &&
                  // currentCount < workshopDetail.maxCount &&
                  (window.confirm("Are you sure you want to register ?")
                    ? handleRegister()
                    : console.log("Cancelled"));
              }}
            >
              {paymentDetails && (
                <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                  {paymentDetails
                    ?.filter(
                      (w) => w.type === "WORKSHOP" && w.status === "SUCCESS"
                    )
                    .find((i) => i.eventId === id) ? (
                    "Registered"
                  ) : currentCount / workshopDetail?.maxCount >= 0.5 &&
                    currentCount < workshopDetail?.maxCount ? (
                    <div>
                      Registrations Closing Soon!<br></br>
                      <span className="whitespace-nowrap text-sm font-normal bg-clip-text [-webkit-text-fill-color:transparent] bg-white lg:bg-[#3c4043]">
                        Limited Seats Available. Hurry Up!
                      </span>
                    </div>
                  ) : currentCount >= workshopDetail?.maxCount ? (
                    "Registrations Closed!"
                  ) : (
                    "Register Here for Session 2!"
                  )}
                </span>
              )}
            </button>
              </>
             
            
            


            
            ) : (
              <button
              className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
              onClick={() => {
                console.log("paymentDetails:", paymentDetails);
                console.log("currentCount:", currentCount);
                console.log("workshopDetail.maxCount:", workshopDetail?.maxCount);
              
                if (
                  currentCount >= workshopDetail?.maxCount ||
                  paymentDetails?.filter((w) => w.type === "WORKSHOP" && w.status === "SUCCESS").find((i) => i.eventId === id)
                ) {
                  console.log("Registration not allowed due to max count reached or already registered.");
                } else {
                  if (window.confirm("Are you sure you want to register?")) {
                    handleRegister();
                  } else {
                    console.log("Cancelled");
                  }
                }
              }}
            >
              {paymentDetails && (
                <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                  {paymentDetails
                    ?.filter(
                      (w) => w.type === "WORKSHOP" && w.status === "SUCCESS"
                    )
                    .find((i) => i.eventId === id) ? (
                    "Registered"
                  ) : currentCount / workshopDetail?.maxCount >= 0.5 &&
                    currentCount < workshopDetail?.maxCount ? (
                    <div>
                      Registrations Closing Soon!<br></br>
                      <span className="whitespace-nowrap text-sm font-normal bg-clip-text [-webkit-text-fill-color:transparent] bg-white lg:bg-[#3c4043]">
                        Limited Seats Available. Hurry Up!
                      </span>
                    </div>
                  ) : currentCount >= workshopDetail?.maxCount ? (
                    "Registrations Closed!"
                  ) : (
                    "Register Here!"
                  )}
                </span>
              )}
            </button>
            )
          }


          {/* <button
            className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
            onClick={() => {
              console.log("paymentDetails:", paymentDetails);
              console.log("currentCount:", currentCount);
              console.log("workshopDetail.maxCount:", workshopDetail?.maxCount);

              // Rest of your code...

              !paymentDetails
                ?.filter((w) => w.type === "WORKSHOP" && w.status === "SUCCESS")
                .find((i) => i.eventId === id) &&
                // currentCount < workshopDetail.maxCount &&
                (window.confirm("Are you sure you want to register ?")
                  ? handleRegister()
                  : console.log("Cancelled"));
            }}
          >
            {paymentDetails && (
              <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                {paymentDetails
                  ?.filter(
                    (w) => w.type === "WORKSHOP" && w.status === "SUCCESS"
                  )
                  .find((i) => i.eventId === id) ? (
                  "Registered"
                ) : currentCount / workshopDetail?.maxCount >= 0.5 &&
                  currentCount < workshopDetail?.maxCount ? (
                  <div>
                    Registrations Closing Soon!<br></br>
                    <span className="whitespace-nowrap text-sm font-normal bg-clip-text [-webkit-text-fill-color:transparent] bg-white lg:bg-[#3c4043]">
                      Limited Seats Available. Hurry Up!
                    </span>
                  </div>
                ) : currentCount >= workshopDetail?.maxCount ? (
                  "Registrations Closed!"
                ) : (
                  "Register Here!"
                )}
              </span>
            )}
          </button> */}



          <div className="flex flex-col bg-[#ffffff] lg:rounded-3xl p-8 space-y-2 justify-center">
            <div className="flex flex-row items-center gap-4">
              <p className="text-4xl lg:text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                <MdOutlineLocationOn />
              </p>
              <div className="flex flex-col pl-2">
                <p className="text-base lg:text-lg font-semibold tracking-wide text-[#3c4043]">
                  {workshopDetail.hall}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <p className="text-4xl lg:text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                <BiRupee />
              </p>

              {
                (workshopDetail?.alteredFee && workshopDetail?.actualFee) && 
                (
                  <div className="flex flex-col pl-2">
                  {console.log(earlyBird + "this is the early bird ")}
                  {earlyBird ? (
                    <React.Fragment>
                      <p className="text-lg lg:text-2xl font-semibold tracking-wide text-[#3c4043]">
                        Rs. {workshopDetail?.alteredFee}*
                        <span className="line-through text-sm ml-2 font-normal">
                          Rs. {workshopDetail?.actualFee}
                        </span>
                      </p>
                      <p className="text-xs">* Early bird offer</p>
                      {/* <p className="text-xs mt-1">
                        {" "}
                        <span className="font-bold">
                          {" "}
                          {Number.isNaN(
                            Number((workshopDetail?.maxCount / 100) * 20)
                          )
                            ? 0
                            : Number((workshopDetail?.maxCount / 100) * 20) -
                              currentCount}
                        </span>{" "}
                        seats left 
                      </p> */}
                      {console.log()}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p className="text-lg lg:text-2xl font-semibold tracking-wide text-[#3c4043]">
                        Rs. {workshopDetail.actualFee}
                      </p>
                      {/* <p className="text-xs">Early bird offers closed for this workshop. Only few seats left. Hurry Up!</p> */}
                    </React.Fragment>
                  )}
                </div>
                )
              }
             
            </div>
          </div>

          <div className="lg:bg-[#ffffff] flex-1 flex flex-col lg:rounded-3xl p-8 lg:px-0 lg:pb-0 lg:pt-12 space-y-6">
            <p className="text-3xl lg:text-3xl font-semibold tracking-wide text-white lg:text-[#3c4043] lg:px-12">
              Contact
            </p>

            <div className="flex flex-row items-center justify-between lg:px-12">
              <div className="w-1/2 lg:w-1/2">
                <p className="text-base lg:text-base font-semibold tracking-wide text-white lg:text-[#3c4043]">
                  {toTitleCase(workshopDetail.c1Name)}
                </p>
                <p className="text-base lg:text-base tracking-wider text-white lg:text-[#3c4043]">
                  {workshopDetail.c1Num}
                </p>
              </div>
              <div className="space-x-8">
                <button
                  onClick={() => {
                    window.open(`tel:${workshopDetail.c1Num}`);
                  }}
                >
                  <IoMdCall className="text-white hover:text-gray-200 lg:text-[#3c4043] lg:hover:text-[#5f6164] text-3xl" />
                </button>
                <button
                  onClick={() => {
                    window.open(`https://wa.me/${workshopDetail.c1Num}`);
                  }}
                >
                  <IoLogoWhatsapp className="text-white hover:text-gray-200 lg:text-[#3c4043] lg:hover:text-[#5f6164] text-3xl" />
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between lg:px-12">
              <div className="w-1/2 lg:w-1/2">
                <p className="text-base lg:text-base font-semibold tracking-wide text-white lg:text-[#3c4043]">
                  {toTitleCase(workshopDetail.c2Name)}
                </p>
                <p className="text-base lg:text-base tracking-wider text-white lg:text-[#3c4043]">
                  {workshopDetail.c2Num}
                </p>
              </div>
              <div className="space-x-8">
                <button
                  onClick={() => {
                    window.open(`tel:${workshopDetail.c2Num}`);
                  }}
                >
                  <IoMdCall className="text-white hover:text-gray-200 lg:text-[#3c4043] lg:hover:text-[#5f6164] text-3xl" />
                </button>
                <button
                  onClick={() => {
                    window.open(`https://wa.me/${workshopDetail.c2Num}`);
                  }}
                >
                  <IoLogoWhatsapp className="text-white hover:text-gray-200 lg:text-[#3c4043] lg:hover:text-[#5f6164] text-3xl" />
                </button>
              </div>
            </div>

            <div
              className=" hidden lg:block flex-1  rounded-b-3xl"
              style={{
                background:
                  "linear-gradient(to bottom, white 10%, rgba(255,255,255,0) 100%), url(/assets/Design/heightFiller.png) ",
                backgroundSize: "350%",
              }}
            ></div>
          </div>
        </div>
      </div>
      {workshopDetail.prerequisites ? (
        <div className="flex flex-row gap-4 w-full my-4 lg:px-0">
          <div className="bg-[#ffffff] w-full lg:rounded-3xl p-8 lg:p-12 space-y-4">
            <p className="text-3xl font-semibold tracking-wider text-[#3c4043]">
              Prerequisites
            </p>
            <p className="mt-5"> - {workshopDetail.prerequisites}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Workshop;