import React, { useEffect, useState } from "react";
import "../../styles/Landing.css";
import TeamDetails from "./TeamDetails.js";
import "../../styles/FlipCard.css";

// Our Team

const Section7 = () => {
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

  useEffect(() => {
    const element = document.querySelector("#anchor8");
    const teamTexts = document.querySelectorAll(".team-text");
    const observer = new IntersectionObserver((entries) => {
      teamTexts.forEach((eventsText) => {
        eventsText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  });

  const [fixedPosition, setFixedPosition] = useState("relative");

  useEffect(() => {
    const rightGrid = document.querySelector("#right-grid");
    const leftGrid = document.querySelector("#left-grid");
    if (
      leftGrid.getBoundingClientRect().top <= 0 &&
      leftGrid.getBoundingClientRect().bottom > window.innerHeight &&
      fixedPosition !== "fixed"
    ) {
      setFixedPosition("fixed");
    } else if (leftGrid.getBoundingClientRect().top > 0) {
      setFixedPosition("relative");
    } else if (leftGrid.getBoundingClientRect().bottom <= window.innerHeight) {
      setFixedPosition("absolute");
    }
    console.log(
      leftGrid.getBoundingClientRect(),
      fixedPosition,
      window.innerHeight
    );
  });

  return (
    <div className="w-full relative">
      <section
        id="section7"
        className="w-full relative flex items-start team-text opacity-0 mt-12 lg:mt-24"
      >
        <div
          className={``}
          id="left-grid"
        >
          
          
          
        </div>

      
      </section>
      <a id="anchor8" className="absolute top-[75%] w-full h-20 -z-10"></a>
    </div>
  );
};

export default Section7;

const ImageGrid = ({ vertical }) => {
  const IMAGE_URL_1 =
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
  const IMAGE_URL_2 =
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80";

  return (
    <React.Fragment>
      <h2 className="text-[#181818] text-2xl mt-8 mb-4">{vertical}</h2>
      {/* <div className="flex flex-wrap justify-evenly  gap-2 w-full bg-gray-100 shadow-xl rounded-lg px-auto py-4"> */}
      <div className="flex flex-wrap justify-evenly  gap-2 w-full">
        {TeamDetails.filter((i) => i.vertical === vertical).map((item, i) => {
          return (
            <div
              className="w-24 h-24 lg:w-36 lg:h-36 aspect-square overflow-hidden rounded-full "
              id="flip-card"
            >
              <div className="w-full h-full" id="flip-card-inner">
                <div
                  loading="lazy"
                  className="w-full h-full "
                  style={{
                    background: `url(${item.image_url}), #f5f5f5`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    // filter: "grayscale(100%)",
                  }}
                  id="flip-card-front"
                ></div>
                <div
                  className="flex flex-col w-full h-full justify-center p-2 bg-gray-200 "
                  id="flip-card-back"
                >
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs">{item.position}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
