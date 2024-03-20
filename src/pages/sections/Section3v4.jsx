import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from 'framer-motion';
import { fetchEvents } from '../../API/call';
import EventGrid from '../../components/EventGrid';




const Section3v4 = () => {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (

    <div id='section3' className='flex justify-center flex-col bg-black text-white items-center py-28 '>

      <h1 className="text-4xl font-semibold lg:text-6xl lg:leading-none font-poppins text-center w-full text-white mb-6"><span className='bg-gradient-to-r from-[#FFDC73] to-[#FFDC73] text-transparent bg-clip-text'>EXCITING EVENTS</span></h1>
      {/* <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 px-[15%]'>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='hover:shadow-2xl flex flex-col space-y-4 lg:col-span-3 justify-between bg-1 bg-cover rounded-xl py-8 px-6 '>
          <h1 className='text-3xl sm:text-[2.25rem] font-poppins font-bold'>
            Kriyative
          </h1>

          <p className='text-sm sm:text-base font-poppins font-medium w-full lg:w-[70%]'>
            Let your imagination run wild with Kriyative! Whether you're an
            experienced artist, a hobbyist or a curious beginner, our events
            will inspire you to think outside the box, experiment with new
            techniques and express your unique vision
          </p>

          <Link
            className="bg-transparent mt-4 text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=kriyative"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>

        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-2 bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-3 justify-between rounded-xl bg-[#8f3ccf] py-8 px-6 '>
          <h1 className='text-3xl sm:text-[2.25rem] font-poppins font-bold'>
            Brainiac
          </h1>

          <p className='text-sm sm:text-base font-poppins font-medium w-full lg:w-[70%]'>
            Unlock Your Inner Genius: Join the Brainiac Brigade! Brainiac
            events are designed to challenge your intellect, ignite your
            curiosity and push the boundaries of your knowledge. From trivia
            challenges to mind-bending puzzles, there's something for every
            cerebral superhero.
          </p>

          <Link
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=brainiac"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>


        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-3 bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-3 justify-between rounded-xl bg-[#dc4fab] py-8 px-6 '>
          <h1 className='text-3xl sm:text-[2.25rem] font-poppins font-bold'>
            Coding
          </h1>

          <p className='text-sm sm:text-base font-poppins font-medium w-full lg:w-[70%]'>
            Whether you're a seasoned coder or just starting out, our events
            offer something for everyone. Explore cutting-edge technologies,
            connect with like-minded coders, and compete for glory in our
            exciting challenges. Unleash the power of programming and take
            your skills to the next level at our Coding Events!
          </p>

          <Link
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=coding"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>

        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-4 bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-3 justify-between rounded-xl bg-[#e8567c] py-8 px-6 '>
          <h1 className='text-3xl sm:text-[2.25rem] font-poppins font-bold'>
            Amuse
          </h1>

          <p className='text-sm sm:text-base font-poppins w-full lg:w-auto font-medium'>
            AMUSE beckons you into a realm of enchanting amusement, daring adventures, and boundless creativity.
            Follow the elusive whispers of the Electrifying Tech Quest, where the digital labyrinth reveals secrets through cosmic riddles, witness the ballet of creativity and dance of imagination.
            Each event becomes a chapter in the collective story, where the joy of play reigns supreme.
          </p>

          <Link
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=amuse"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>

        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-5 bg-right-bottom bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-2 justify-between rounded-xl bg-[#eac64a] py-8 px-6 '>
          <h1 className='text-3xl sm:text-[2.25rem] font-poppins font-bold'>
            Core Engineering
          </h1>

          <p className='text-sm w-full lg:w-auto sm:text-base font-poppins font-medium'>
            Unleash the engineer in you and dive into the world of
            innovation with our cutting-edge Core Engineering events at this
            Kriya! Discover the power of engineering, and explore endless
            possibilities to put your skills to the test.
          </p>

          <Link
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=core"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>

        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-2 bg-right-bottom bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-2 justify-between rounded-xl bg-[#e8567c] py-8 px-6 '>
          <h1
            className={`text-3xl sm:text-[2.25rem] font-poppins font-bold events-text text-white opacity-100 lg:text-left`}
          >
            Unleash your
            <span>
              {" potential"}
            </span>
            , participate in events.
          </h1>
          <button
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-3 rounded-xl font-poppins flex items-center group"
            onClick={() => navigate("/auth/payment?type=GENERAL")}
          >
            <p className="font-medium">Pay general registration fee!</p>
            <IoIosArrowForward
              className="ml-2 transition-all text-white group-hover:translate-x-2"
              size={24}
            />
          </button>

        </motion.div>

        <motion.div variants={variant1} initial='initial' whileHover='hover' className='bg-1 bg-right-bottom bg-cover hover:shadow-2xl flex flex-col space-y-4 lg:col-span-2  rounded-xl bg-[#02b7e6] py-8 px-6 overflow-hidden '>


          <h1 className='text-3xl lg:text-[2.25rem] font-poppins font-bold'>
            Management
          </h1>


          <p className='text-sm sm:text-base w-full lg:w-auto font-poppins font-medium'>
            Calling all aspiring leaders and entrepreneurs! Explore the
            dynamic world of Management at Kriya. From strategic planning to
            marketing and innovation, join us for an engaging and
            exhilarating set of events that will put your leadership skills
            to the test.
          </p>

          <Link
            className="bg-transparent text-white border-white border-2 w-fit px-4 py-2 rounded-xl text-sm flex items-center group"
            to="/portal/event/?ctg=management"
          >
            <p className="font-medium">Explore more</p>
            <IoIosArrowForward
              className="ml-1 group-hover:ml-2 transition-all"
              size={16}
            />
          </Link>


        </motion.div>



      </div> */}

      {/* we can use this for workshop  i.category === "Gold" to  i.category === "WorkShop once the events24.json  is edited is edited" */}
      {/* <div className='text-white text-3xl'></div> */}
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
      {/* <div className='text-white text-3xl'> Workshop</div>
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
        /> */}
      {/* <div className='text-white text-3xl'> Paper Presentation</div>
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



    </div>
  )
}

export default Section3v4

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

