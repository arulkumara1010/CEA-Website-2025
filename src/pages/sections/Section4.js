import React, { useEffect, useState } from "react";
import "../../styles/Landing.css";
import { fetchPapers } from "../../API/call";
import { useNavigate } from "react-router-dom";

// Paper Presentations

const Section4 = ({ scrollYByVH }) => {
  const [consolee, setConsolee] = useState(0);
  const navigate = useNavigate();

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
    const element = document.querySelector("#anchor5");
    const workshopTexts = document.querySelectorAll(".workshop-text");
    const observer = new IntersectionObserver((entries) => {
      workshopTexts.forEach((workshopText) => {
        workshopText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  });

  const [onMouseHoverIndex, setOnMouseHoverIndex] = useState(0);

  const condition = "text-[#181818]";

  return (
    <div className="w-full h-full relative">
      
      <a id="anchor5" className="absolute top-[90%] w-full h-1 -z-10"></a>
    </div>
  );
};

const PaperPresentationItemDesktop = ({
  index,
  onMouseHoverIndex,
  setOnMouseHoverIndex,
  data,
}) => {
  const navigate = useNavigate();

 
};

const PaperPresentationItemMobile = ({ data }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-64 h-[90%] flex items-end rounded-lg p-4"
      onClick={() => {
        navigate(`/portal/paper/${data.ppid}`);
      }}
      style={{
        background: `linear-gradient(to top, #202020 1%, rgba(255,255,255,0) 50%), url("${data.image}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <p className="font-semibold font-poppins text-2xl text-gray-100">
        {data.eventName}
      </p>
    </button>
  );
};

export default Section4;
