import React, { useState, useEffect, useRef } from "react";

// Countdown

const Section2 = ({ scrollYByVH }) => {
  const [fadeInAnimate, setFadeInAnimate] = useState(false);
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

  const [timer, setTimer] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
    days: "0",
  });

  const timerRef = useRef(null);

  const startTimer = (e) => {
    let { total, hours, minutes, seconds, days } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer({ hours, minutes, seconds, days });
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer({
      hours: "00",
      minutes: "00",
      seconds: "00",
      days: "00",
    });

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timerRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date("2025-04-05");
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);
    return {
      total,
      hours,
      minutes,
      seconds,
      days,
    };
  };

  useEffect(() => {
    const element = document.querySelector("#anchor2");
    const numberTags = document.querySelectorAll(".number-tag");
    const calenderTexts = document.querySelectorAll(".calender-text");
    const observer = new IntersectionObserver((entries) => {
      numberTags.forEach((numberTag) => {
        numberTag.classList.add("animate-fade-in-bottom");
      });
      calenderTexts.forEach((calenderText) => {
        calenderText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  });

  useEffect(() => {}, []);

  // const condition = `${parseFloat(consolee) < 0.50 || parseFloat(consolee)>2.50 ? "text-[#181818]" : "text-white"}`;
  // const borderCondition = `${parseFloat(consolee) < 0.50 || parseFloat(consolee)>2.50 ? "border-[#181818]" : "border-white"}`;
  const condition = "text-white";
  const borderCondition = "border-white";

  return (
    <div className="w-full h-full relative">
      <section
        id="section2"
        className="h-screen w-full relative [scroll-snap-align:start] m-0 p-0 py-12 lg:py-16 flex flex-col lg:flex-row lg:justify-center"
      >
        <div className="w-full lg:w-[50vw] lg:pl-[calc(100vw/12)] py-16 lg:pr-16 h-full flex flex-col items-center lg:items-start justify-center">
          <h1
            className={`text-6xl lg:text-7xl opacity-0 px-8 lg:p-0  font-[600] ${condition} transition-color duration-300 ease-in-out calender-text font-poppins text-center lg:text-left`}
          >
            Mark your{" "}
            <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#FFDC73] to-[#FFDC73]">
              calendar
            </span>
          </h1>
          <p
            className={`text-xl mt-8 opacity-0 px-8 lg:p-0 ${condition} transition-color duration-300 ease-in-out calender-text font-poppins text-center lg:text-left`}
          >
            Join us at the forefront of technological advancements and gain
            valuable insights at our upcoming technical symposium Yutira 2025 !
          </p>
          <div className="px-8 lg:p-0 ">
            <button
              className={`calender-text opacity-0 mt-8 w-fit px-4 py-2 text-lg font-poppins rounded-lg ${borderCondition} transition-color duration-300 ease-in-out ${condition} border`}
              onClick={() => {
                window.open(
                  "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20250223T093000Z%2F20250223T113000Z&details=&location=PSG College of Technology&text=Kriya%20%2724%20Inauguration"
                );
              }}
            >
              Add to Calendar
            </button>
          </div>
          <div className="gap-4 lg:hidden grid grid-cols-2 items-center justify-center w-full mt-12 px-16 lg:p-0 ">
            <NumberAndTagForMobile number={timer.days} tag="days" />
            {/* <h1 className="text-3xl font-poppins font-bold">:</h1> */}
            <NumberAndTagForMobile number={timer.hours} tag="hours" />
            {/* <h1 className="text-3xl font-poppins font-bold">:</h1> */}
            <NumberAndTagForMobile number={timer.minutes} tag="minutes" />
            {/* <h1 className="text-3xl font-poppins font-bold">:</h1> */}
            <NumberAndTagForMobile number={timer.seconds} tag="seconds" />
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-x-0 w-full lg:w-[50vw] pr-[calc(100vw/12)] relative">
          <NumberAndTag
            fadeInAnimate={fadeInAnimate}
            number={timer.days}
            tag="days"
          />
          <NumberAndTag
            fadeInAnimate={fadeInAnimate}
            number={timer.hours}
            tag="hours"
          />
          <NumberAndTag
            fadeInAnimate={fadeInAnimate}
            number={timer.minutes}
            tag="minutes"
          />
          <NumberAndTag
            fadeInAnimate={fadeInAnimate}
            number={timer.seconds}
            tag="seconds"
          />
        </div>
      </section>
      <a id="anchor2" className="absolute top-[35%] w-full h-20 -z-10"></a>
    </div>
  );
};

const NumberAndTag = ({ number, tag, fadeInAnimate }) => {
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

  // const condition = `${parseFloat(consolee) < 0.50 || parseFloat(consolee)>2.50 ? "text-[#181818]" : "text-white"}`;
  // const gradientCondition = `${parseFloat(consolee) < 0.75 ? "from-[rgba(18,18,18,0.3)] to-[rgba(18,18,18,0.6)]" : "from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.6)]"}`;
  const condition = "text-white";
  const gradientCondition =
    "from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.6)]";

  return (
    <div className="relative w-[40ch] number-tag">
      <h1
        className={`pr-4 absolute bottom-4 right-4 [line-height:40vh] bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-t ${gradientCondition} text-[30vh] 2xl:text-[40vh] text-red-400 font-oswald font-bold tracking-[-0.1em]`}
      >
        {parseInt(number) % 10 === parseInt(number) ? `0${number}` : number}
        &nbsp;
      </h1>
      <p
        className={`absolute right-4 bottom-8 uppercase ${condition} transition-color duration-300 ease-in-out text-5xl font-bold font-oswald`}
      >
        {tag}
      </p>
    </div>
  );
};

const NumberAndTagForMobile = ({ number, tag }) => {
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

  // const condition = `${parseFloat(consolee) < 0.50 || parseFloat(consolee)>2.50 ? "text-[#181818]" : "text-white"}`;
  const condition = "text-white";

  return (
    <div
      className={`space-y-2 flex flex-col justify-center ${condition} transition-color duration-300 ease-in-out`}
    >
      <h1 className="text-6xl  font-poppins font-bold text-center bg-gradient-to-bl from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
        {parseInt(number) % 10 === parseInt(number) ? `0${number}` : number}
      </h1>
      <p className="text-center text-xs uppercase tracking-widest">{tag}</p>
    </div>
  );
};

export default Section2;
