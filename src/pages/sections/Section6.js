import React, { useEffect, useState } from "react";
import "../../styles/Landing.css";

// Sponsors

const Section6 = () => {
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
    const element = document.querySelector("#anchor7");
    const sponsorsTexts = document.querySelectorAll(".sponsors-text");
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting);

      sponsorsTexts.forEach((eventsText) => {
        eventsText.classList.add("animate-fade-in");
      });
    });

    observer.observe(element);
  });

  return (
    <div className="w-full h-full relative">
      <section
        id="section6"
        className="h-full w-full relative lg:px-[calc(100vw/12)] lg:p-24 flex flex-col-reverse lg:flex-row items-center"
      >
        <div className="w-full lg:w-[100%] overflow-x-hidden h-full">
          <div className="flex flex-col p-8 lg:pl-0 font-poppins space-y-8 lg:space-y-4">
            <div className="flex flex-col lg:flex-row justify-center items-center">
              <div className=" p-4 px-6 space-y-4 flex lg:w-[30%] flex-col items-center lg:justify-center sponsors-text opacity-0 delay-100">
                <p className="text-2xl font-semibold tracking-wider text-center lg:text-left text-white">
                  <span className="bg-clip-text text-3xl py-2 [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#FFDC73] to-[#FFDC73]">
                    {"TITLE "}
                  </span>
                  Sponsor
                </p>

                <div className="flex flex-col gap-y-2 w-48 lg:w-80">
                  <div className="bg-opacity-50 bg-gray-200 flex justify-center items-center p-4 lg:p-6 h-28 lg:w-80 lg:h-48 rounded-2xl">
                    <div
                      style={{
                        background:`url("${"https://i.ibb.co/VpR2x9w/RKCPL-Logo.jpg"}")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                      className={`w-full h-full`}
                    ></div>
                  </div>
                  <p className="uppercase text-6xl text-base font-bold lg:text-lg text-white tracking-wider text-center">
                    {"RKCPL"}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col lg:flex-row justify-center items-center">
              <div className=" p-4 px-6 space-y-4 flex flex-col items-center lg:justify-center sponsors-text opacity-0 delay-100"> */}
            {/* <p className="text-2xl font-semibold tracking-wider text-center lg:text-left text-white">
                  <span className="bg-clip-text text-3xl py-2 [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#5238d1] to-[#8938d1]">
                    {"CO "}
                  </span>
                  Sponsor
                </p> */}

            {/* <div className="flex flex-row">
                  <div className="flex flex-col gap-y-2 w-48 lg:w-80">
                    <div className="bg-opacity-50 bg-gray-200 flex justify-center items-center p-4 lg:p-6 h-28 lg:w-80 lg:h-48 rounded-2xl">
                      <div
                        style={{
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                        className={`flex justify-center items-center w-full h-full bg-white`}
                      ><img src="https://www.societegenerale.com/sites/default/files/image/logo/logo-en.svg" /></div>
                    </div>
                    <p className="uppercase text-base font-bold lg:text-lg text-[#181818] tracking-wider text-center">
                      {"Societe Generale"}
                    </p>
                  </div>
                </div> */}
            {/* </div> */}
            {/* <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className=" p-4 px-6 space-y-4 flex flex-col items-center lg:justify-center sponsors-text opacity-0 delay-100"> */}
            {/* <p className="text-2xl font-semibold tracking-wider text-center lg:text-left text-white">
                    <span className="bg-clip-text text-3xl py-2 [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#5238d1] to-[#8938d1]">
                      {"CO "}
                    </span>
                    Sponsor
                  </p> */}

            {/* <div className="flex flex-col gap-y-2 w-48 lg:w-80">
                    <div className="bg-opacity-50 bg-gray-200 flex justify-center items-center p-4 lg:p-6 h-28 lg:w-80 lg:h-48 rounded-2xl">
                      <div
                        style={{
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                        className={`flex justify-center items-center w-full h-full bg-white`}
                      ><img src="https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/vites" /></div>
                    </div>
                    <p className="uppercase font-bold text-base lg:text-lg text-[#181818] tracking-wider text-center">
                      {"VITES TECHNOLOGIES"}
                    </p>
                  </div> */}
            {/* </div>
              </div>
            </div> */}




            {/* <div className="p-0 lg:p-4 flex justify-center space-y-4 sponsors-text opacity-0 delay-100">
              <p className="text-2xl font-semibold tracking-wider text-center lg:text-left">
                <span className="bg-clip-text text-3xl py-2 [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#5238d1] to-[#8938d1]">
                  {"MEDIA "}
                </span>
                Sponsor
              </p>
              <div className="flex flex-wrap gap-6  lg:justify-start">
                <Sponsors
                  imgurl="https://www.exchange4media.com/news-photo/100947-expresslogo.jpg"
                  title="The Indian Express"
                />
              </div>
            </div> */}

            {/* <div className="p-0 lg:p-4 space-y-10 sponsors-text opacity-0 delay-100">
              <p className="text-2xl font-semibold tracking-wider text-center lg:text-left">
                <span className="bg-clip-text text-3xl py-2 [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#5238d1] to-[#8938d1]">
                  {"OTHER "}
                </span>
                Sponsors
              </p>

              <div className="w-screen h-48">
                <div className="flex space-x-6 absolute whitespace-nowrap [will-change:transform] animate-marquee">
                  {Array(4).fill(
                    <React.Fragment>
                      <Sponsors
                        imgurl="/assets/Stalls/Waffle.jpg"
                        title="Waffle Cart"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/PolarBear.png"
                        title="Polar Bear"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/FrozenStick.jpeg"
                        title="The Frozen Stick"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/Creamery.jpeg"
                        title="Creamery"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/KCOverseas.jpg"
                        title="KC Overseas"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/Time.jpg"
                        title="T.I.M.E"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/Annapoorna.jpg"
                        title="Annapoorna"
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>

              <div className="w-screen h-48">
                <div className="flex w-fit space-x-6 absolute whitespace-nowrap [will-change:transform] animate-marquee-rev">
                  {Array(4).fill(
                    <React.Fragment>
                      <Sponsors
                        imgurl="/assets/Stalls/Tibbs.jpeg"
                        title="Tibbs Frankie"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/TheCrunchyTreats.jpeg"
                        title="The Crunchy Treats"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/ZenTreat.jpg"
                        title="Zen Treat"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/Marvel.jpeg"
                        title="Marvel"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/Fabino.jpg"
                        title="Fabino"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/RoyalZip.jpg"
                        title="Royal Zip"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/saranya.jpeg"
                        title="Studio 11"
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>

              <div className="w-screen h-48">
                <div className="flex w-fit space-x-6 absolute whitespace-nowrap [will-change:transform] animate-marquee">
                  {Array(4).fill(
                    <React.Fragment>
                      <Sponsors
                        imgurl="/assets/Stalls/ChocoCrush.jpg"
                        title="Choco Crush"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/boc.png"
                        title="Bluestone Overseas"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/sjs.jpeg"
                        title="SJS Phone Accessories"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/parvesh.jpeg"
                        title="90's Kids Mittai"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/zee.jpeg"
                        title="Zee Taurus"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/chai.jpeg"
                        title="Chai N Gupshup"
                      />
                      <Sponsors
                        imgurl="/assets/Stalls/marudhamalai.png"
                        title="Marudhamalai Juice"
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section >
      <a
        id="anchor7"
        className="absolute top-[40%] lg:top-[75%] w-full h-20 -z-10"
      ></a>
      <div className="absolute top-[100%] w-full h-10"></div>
    </div >
  );
};

const Sponsors = ({ imgurl, title }) => {
  return (
    <div className="flex flex-col gap-y-2 w-48 lg:w-64">
      <div className="bg-opacity-50 bg-gray-200 flex justify-center items-center p-4 lg:p-6 h-28 lg:w-64 lg:h-36 rounded-2xl">
        <div
          style={{
            background: `url("${imgurl}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className={`w-full h-full`}
        ></div>
      </div>
      <p className="uppercase text-base lg:text-lg text-[#181818] tracking-wider text-center">
        {title}
      </p>
    </div>
  );
};

export default Section6;
