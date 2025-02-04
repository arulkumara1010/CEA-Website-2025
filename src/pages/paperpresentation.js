import React, { useEffect, useState, useCallback } from "react";
import { IoMdCall, IoLogoWhatsapp } from "react-icons/io";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEventById,
  fetchEventDetailsByEmail,
  fetchEventRegister,
  fetchUserByEmail,
} from "../API/call";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particleOptions from "../ParticleOptions";

const Event = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generalPayment, setGeneralPayment] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userEventDetails, setUserEventDetails] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

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

  const { id } = useParams();

  const [eventDetail, setEventDetail] = useState(null);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data.user);
      setUserDetails(res.data.user);
      setIsLoggedIn(true);
      setGeneralPayment(res.data.user.isPaid);
    });
  }, []);

  useEffect(() => {
    fetchEventDetailsByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserEventDetails(res.data);
    });
  }, []);

  useEffect(() => {
    setEventDetail(fetchEventById(id));
  }, [id]);

  const handleRegister = () => {
    if (!isLoggedIn) {
      navigate("/auth?type=signup");
    } else if (!generalPayment) {
      navigate("/auth/payment?type=GENERAL");
    } else {
      fetchEventRegister({
        email: localStorage.getItem("email"),
        eventId: id,
      }).then((res) => {
        console.log(res);
        window.location.reload();
      });
    }
  };

  return !eventDetail ? (
    <section className="w-full lg:px-16 font-poppins py-12 pt-36 lg:pt-12 h-screen overflow-y-scroll">
      <p className="text-white text-xl px-8">Loading...</p>
    </section>
  ) : (
    <section className="w-full lg:px-16 font-poppins py-12 pt-36 lg:pt-12 h-screen overflow-y-scroll">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="top-0 left-0 absolute"
        height="100vh"
        width="100vh"
        options={particleOptions}
      />
      <h2 className="text-base mb-2 text-gray-400 tracking-widest px-8 lg:px-0">
        {eventDetail.category}
      </h2>
      <div className="w-fit">
        <h1 className="text-3xl text-white font-semibold px-8 lg:px-0">
          {toTitleCase(eventDetail.eventName)}
        </h1>
        <div className="w-[60%] lg:w-[80%] ml-8 lg:ml-0 mt-2 h-[4px] bg-gradient-to-r rounded-[2px] from-[#3b82f6] to-[#8b5cf6]"></div>
      </div>
      <p className="text-white text-justify mt-8 text-base w-full lg:w-[90%] pb-8 px-8 lg:px-0">
        {eventDetail.description}
      </p>

      <div className="flex flex-col lg:flex-row gap-4 w-full lg:px-0 my-4 text-black">
        <div className="bg-white w-full lg:w-2/3 lg:rounded-3xl lg:p-12 space-y-12 relative py-8 px-8">
          <RoundDescription
            roundNumber={1}
            title={eventDetail.round_title_1}
            description={eventDetail.round_desc_1}
          />

          {eventDetail.round_title_2.length > 0 &&
            eventDetail.round_desc_2.length > 0 && (
              <RoundDescription
                roundNumber={2}
                title={eventDetail.round_title_2}
                description={eventDetail.round_desc_2}
              />
            )}

          {eventDetail.round_title_3.length > 0 &&
            eventDetail.round_desc_3.length > 0 && (
              <RoundDescription
                roundNumber={3}
                title={eventDetail.round_title_3}
                description={eventDetail.round_desc_3}
              />
            )}

          {eventDetail.round_title_4.length > 0 &&
            eventDetail.round_desc_4.length > 0 && (
              <RoundDescription
                roundNumber={4}
                title={eventDetail.round_title_4}
                description={eventDetail.round_desc_4}
              />
            )}
        </div>
        <div className="w-full lg:w-1/3 space-y-4 flex flex-col justify-between">
          {eventDetail.closed ? (
            <div className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start">
              <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#fcc] to-[#8b5cf6]">
                Registrations Closed
              </span>
            </div>
          ) : (
            <button
              className="lg:bg-white lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
              onClick={() => {
                !userEventDetails.find((i) => i.eventId === id) &&
                  (window.confirm("Are you sure you want to register ?")
                    ? handleRegister()
                    : console.log("Cancelled"));
              }}
            >
              {userEventDetails && (
                <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                  {userEventDetails.find((i) => i.eventId === id)
                    ? "Registered"
                    : "Register Here!"}
                </span>
              )}
            </button>
          )}
          {/* <p className="bg-gradient-to-r from-[#C80067] to-[#7470ff] py-4 px-6 rounded-xl shadow-lg shadow-gray-900 lg:shadow-md w-fit text-white text-2xl hover:underline">Register Here !</p> */}

          <div className="bg-[#ffffff] flex flex-col lg:rounded-3xl p-8 lg:p-12 space-y-2 justify-center">
            <div className="flex flex-row items-center gap-4 lg:gap-4">
              <p className="text-6xl lg:text-6xl font-semibold tracking-wide text-[#3c4043]">
                {eventDetail.date}
              </p>
              <div className="flex flex-col">
                <p className="text-lg font-semibold tracking-wide text-[#3c4043]">
                  {eventDetail.date === 28 ? "February" : "March"}
                </p>
                <p className="text-lg font-semibold tracking-wide text-[#3c4043]">
                  2025
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 lg:gap-6">
              <p className="text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                <MdAccessTime />
              </p>
              <div className="pl-2 flex flex-col">
                <p className="text-base lg:text-base font-semibold tracking-wider text-[#3c4043]">
                  {eventDetail.timing}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 lg:gap-6">
              <p className="text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                <MdOutlineLocationOn />
              </p>
              <div className="pl-2 flex flex-col">
                <p
                  className={`text-base ${
                    eventDetail.hall.length > 15 ? "lg:text-base" : "lg:text-lg"
                  } font-semibold tracking-wider text-[#3c4043]`}
                >
                  {eventDetail.hall}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 lg:gap-6">
              <p className="text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                {eventDetail.teamSize !== "1" ? (
                  <AiOutlineTeam />
                ) : (
                  <AiOutlineUser />
                )}
              </p>
              <div className="pl-2 flex flex-col">
                <p className="text-base lg:text-lg font-semibold tracking-wide text-[#3c4043]">
                  {eventDetail.teamSize} Member
                  {eventDetail.teamSize !== "1" ? "s" : ""}
                </p>
              </div>
            </div>
            {eventDetail.teamSize !== "1" && (
              <div>
                <p className="text-2xl font-semibold tracking-wide py-4 text-[#3c4043]">
                  Note
                </p>
                <ul className="list-disc text-base text-[#3c4043] pl-4 space-y-2">
                  <li>
                    For team events,{" "}
                    <b className="font-semibold">every member</b> of the team is
                    required to register for the event and pay the general
                    registration fee.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {eventDetail.eventRules && eventDetail.eventRules.length > 0 && (
        <div className="flex flex-row gap-4 w-full my-4 lg:px-0">
          <div className="bg-[#ffffff] w-full lg:rounded-3xl p-8 lg:p-12 space-y-4">
            <p className="text-3xl font-semibold tracking-wider text-[#3c4043]">
              Rules
            </p>
            <ul className="list-disc text-base tracking-wide text-justify text-[#3c4043] pl-4">
              {eventDetail.eventRules.split("\n").map((rule, index) => (
                <div>
                  {rule.startsWith("->") ? (
                    <li key={index} className="ml-4">
                      {rule.substring(2)}
                    </li>
                  ) : (
                    <li key={index}>{rule}</li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const RoundDescription = ({ roundNumber, description, title = "" }) => {
  const toTitleCase = (phrase) => {
    const wordsToIgnore = ["of", "in", "for", "and", "a", "an", "or", "the"];
    const formattedPhrase = phrase
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (wordsToIgnore.includes(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    return formattedPhrase.charAt(0).toUpperCase() + formattedPhrase.slice(1);
  };

  return (
    <div className="flex w-full ">
      <p className="hidden lg:block w-28 pr-4 text-9xl font-jetbrains tracking-wider text-[#3c4043] z-10 opacity-40 text-right">
        {roundNumber}
      </p>
      <div className="space-y-2 z-30 flex-1">
        {title.length > 0 && title.split(" ")[0].toLowerCase() !== "round" ? (
          <React.Fragment>
            <p className="tracking-wider uppercase">ROUND {roundNumber}</p>
            <div className="flex flex-row items-end gap-y-4">
              <p className="text-3xl font-semibold tracking-wide text-[#3c4043]">
                {toTitleCase(title)}
              </p>
            </div>
          </React.Fragment>
        ) : (
          <div className="flex flex-row items-end gap-y-4">
            <p className="text-3xl font-semibold tracking-wide text-[#3c4043]">
              ROUND {roundNumber}
            </p>
          </div>
        )}
        <p className="text-base lg:text-base text-justify text-[#3c4043] pt-4 lg:pt-0">
          {description.split("\n").map((desc, index) => (
            <div>
              <p key={index}>{desc}</p>
              <br></br>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Event;
