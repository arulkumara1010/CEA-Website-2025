import React, { useEffect, useState, useCallback } from "react";
import { FaSoundcloud } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import EventGrid from "../components/EventGrid";
import { fetchEvents } from "../API/call";
import "../styles/gradientAnimation.css";

import { loadSlim } from "tsparticles-slim";
import particleOptions from "../ParticleOptions";

const EventList = () => {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };






  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState(
    fetchEvents()
      .map((event) => ({
        name: event.eventName,
        id: event.eventId,
        date: event.date,
        desc: event.one_line_desc ? event.one_line_desc : event.description,
        category: event.category,
        time: event.timing.split("-")[0],
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  );

  useEffect(() => {
    if (!searchParams.get("ctg")) return;
    const element = document.querySelector(`#${searchParams.get("ctg")}`);
    element.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    // Your logic here to reset hasVideoPlayed to false
    localStorage.setItem("hasVideoPlayed", "false");
  }, []);
  return (


    <div className="w-full font-poppins py-12 pt-24 lg:pt-12 h-screen overflow-y-scroll">



      <section className="h-fit w-full relative overflow-x-hidden lg:overflow-hidden font-poppins px-6 lg:px-8 flex flex-col items-center lg:block p-8">

        {/* <div className="w-full my-8 lg:mt-0">
          <h1 className={`text-4xl lg:text-6xl text-white font-semibold font-poppins text-center py-2`}
            id="soon-text"
          >
            ✨ EVENTS ✨
          </h1>
        </div> */}
        <h1
          className={`text-4xl bg-gradient-to-r from-[#ffee35] to-[#ffa228] bg-clip-text text-transparent lg:text-5xl tracking-wide font-semibold text-center pt-8`}
          id="gold"
        >
          EVENTS
        </h1>
        <EventsGrid
          imgurl={
            "https://media.istockphoto.com/id/1181359760/vector/gold-glitter-and-shiny-golden-rain-on-black-background-vector-square-luxury-background.jpg?s=612x612&w=0&k=20&c=L8On7JUZdmNYNTMBeD03-45lsBvaD1E0c2z8h-MsVOs="
          }
          arrowCircleStart="from-[#8B5523]"
          arrowCircleEnd="to-[#F2CC3E]"
          obj={events.filter((i) => i.category === "Gold")}
          topCurve="bg-[#010101]"
          rightCurve="bg-[#010101]"
          iconImg={"https://cdn-icons-png.flaticon.com/512/3309/3309977.png"}
        />



        {/* <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="kriyative"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#a861ff] to-[#8938d1]">
            Kriyative
          </span>
        </h1>
        <EventsGrid
          imgurl={
            "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/1"
          }
          arrowCircleStart="from-[#121a43]"
          arrowCircleEnd="to-[#a21cd9]"
          obj={events.filter((i) => i.category === "Kriyative")}
          topCurve="bg-[#7d1ab2]"
          rightCurve="bg-[#551789]"
          iconImg={
            "/assets/CatLogo/kriyative.png"
          }
        />



        <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="brainiac"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#e8567c] to-[#f48555]">
            Brainiac
          </span>
        </h1>
        <EventsGrid
          imgurl={
            "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/circuit"
          }
          arrowCircleStart="from-[#e8567c]"
          arrowCircleEnd="to-[#f48555]"
          obj={events.filter((i) => i.category === "Brainiac")}
          topCurve="bg-[#770658]"
          rightCurve="bg-[#630a3d]"
          iconImg={
            "/assets/CatLogo/brainiac.png"
          }
        />




        <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="amuse"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#8f3ccf] to-[#df51ad]">
            Amuse
          </span>
        </h1>
        <EventsGrid
          imgurl={
             "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/brainiac"
          }
          arrowCircleStart="from-[#8f3ccf]"
          arrowCircleEnd="to-[#df51ad]"
          obj={events.filter((i) => i.category === "Amuse")}
          topCurve="bg-[#e04918]"
          rightCurve="bg-[#e04918]"
          iconImg={
            "/assets/CatLogo/circuit.png"
          }
        />

        <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="coding"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#dc4fab] to-[#eb587b]">
            Coding
          </span>
        </h1>
        <EventsGrid
          imgurl={
            "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/coding"
          }
          arrowCircleStart="from-[#c61b59]"
          arrowCircleEnd="to-[#371243]"
          obj={events.filter((i) => i.category === "Coding")}
          topCurve="bg-[#b21a56]"
          rightCurve="bg-[#891750]"
          iconImg={
            "/assets/CatLogo/coding.png"
          }
        />

        <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="core"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#eac64a] to-[#2ea47e]">
            Core Engineering
          </span>
        </h1>
        <EventsGrid
          imgurl={
            "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/core"
          }
          arrowCircleStart="from-[#029893]"
          arrowCircleEnd="to-[#0d2e50]"
          obj={events.filter((i) => i.category === "Core Engineering")}
          topCurve="bg-[#066b77]"
          rightCurve="bg-[#0a4c63]"
          iconImg={
            "/assets/CatLogo/core.png"
          }
        />

        <h1
          className={`text-3xl lg:text-4xl font-semibold text-center pt-8`}
          id="management"
        >
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#02b7e6] to-[#27eba2]">
            Management
          </span>
        </h1>
        <EventsGrid
          imgurl={
            "https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/management"
          }
          arrowCircleStart="from-[#2696d9]"
          arrowCircleEnd="to-[#152e60]"
          obj={events.filter((i) => i.category === "Management")}
          topCurve="bg-[#28a5ea]"
          rightCurve="bg-[#28a5ea]"
          iconImg={
            "/assets/CatLogo/manager.png"
          }
        /> */}
      </section>

    </div>
  );
};

export default EventList;

const EventsGrid = ({
  obj,
  imgurl,
  arrowCircleStart,
  arrowCircleEnd,
  topCurve,
  rightCurve,
  iconImg,
}) => {
  const toTitleCase = (phrase) => {
    const wordsToIgnore = ["of", "in", "for", "and", "a", "an", "or"];
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

  return (
    <div className="flex-wrap flex gap-8 py-12 justify-center">
      {obj.map((i) => {
        return (
          i.eventId === 'EVNT0043' ? (
            <React.Fragment key={i.id}></React.Fragment>
          ) : (
            <EventGrid
              key={i.id}
              title={toTitleCase(i.name)}
              description={i.desc}
              date={i.date}
              time={i.time}
              iconImg={iconImg}
              imgurl={imgurl}
              arrowCircleStart={arrowCircleStart}
              arrowCircleEnd={arrowCircleEnd}
              topCurve={topCurve}
              rightCurve={rightCurve}
              to={`/portal/event/${i.id}`}
            />
          )
        );
      })}
    </div>
  );
};