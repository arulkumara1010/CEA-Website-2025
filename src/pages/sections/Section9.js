import React from "react";
import { BsInstagram, BsLinkedin, BsTelephone } from "react-icons/bs";
import { SiLinktree } from "react-icons/si";
import { TbBrandLinktree } from "react-icons/tb";
import { SiGmail } from "react-icons/si";

// Contact Us

const Section9 = () => {
  return (
    <React.Fragment>
      {/* <section
        id="section9"
        style={{ background: "url(/assets/Design/errorbg.png)" }}
        className="w-screen px-[calc(100vw/12)] py-16 font-poppins flex items-center justify-center"
      >
        <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg flex flex-col items-center">
          <h1 className="text-4xl font-semibold font-poppins text-center">
            Reach Us for Queries
          </h1>
          <h2 className="mt-8 text-lg font-poppins text-center w-[80%]">
            Kindly contact us if you have any queries related to payments,
            accomodation, event schedules, or other necessities.{" "}
          </h2>
          <button className="text-xl px-6 py-2 border-2 border-black mt-8 rounded-lg">Know more</button>
        </div>
      </section> */}
      <section
        id="section9"
        className="w-screen bg-black px-[calc(100vw/12)] py-16 font-poppins"
      >
        <h1 className="text-5xl text-white font-bold pb-6">Contact Us</h1>
        <div className="flex flex-col lg:flex-row gap-8 flex-wrap text-white mt-8">
          <div className="space-y-6 lg:w-56 lg:mr-12">
            <button
              className="flex items-center space-x-4"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/studentsunion-psgtech/",
                  "_blank"
                )
              }
            >
              <BsLinkedin size={24} className="text-white" />
              <p className="text-lg">Civil Engineering Association</p>
            </button>
            <button
              className="flex items-center space-x-4"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/kriya_psgtech/",
                  "_blank"
                )
              }
            >
              <BsInstagram size={24} className="text-white" />
              <p className="text-lg"></p>
            </button>
            <button
              className="flex items-center space-x-4"
              onClick={() => window.open("mailto:events@psgkriya.in", "_blank")}
            >
              <SiGmail size={24} className="text-white" />
              <p className="text-lg"></p>
            </button>
            <button
              className="flex items-center space-x-4"
              onClick={() =>
                window.open(
                  "",
                  "_blank"
                )
              }
            >
              <SiLinktree size={24} className="text-white" />
              <p className="text-lg">Linktree</p>
            </button>
            {/* <button
              className="flex items-center space-x-4"
              onClick={() =>
                window.open("https://linktr.ee/su.psgtech", "_blank")
              }
            >
              <div
                style={{
                  background: `url(https://d1fdloi71mui9q.cloudfront.net/sdQF8AHkQY6RCSGRVJY5_HjZ8Yx97jSnr03x4)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-8 h-8 -mx-1"
              />
              <p className="text-lg">Linktree SU</p>
            </button> */}
          </div>
          <div className="flex-1 flex flex-col lg:flex-wrap gap-8 lg:gap-6 lg:gap-y-12 lg:flex-row items-center lg:justify-between">
            <div className="w-full lg:w-56">
              <h5 className="text-xs tracking-widest">Chairperson</h5>
              <ContactItem name="Kailesh Prabhu R" phone="+91 94426 99720" />

              <h5 className="text-xs tracking-widest mt-8">Co-Chairperson</h5>
              <ContactItem name="Arun A R" phone="+91 97895 89682" />
            </div>
            

            {/* <div className="w-full lg:w-56">
              <h5 className="text-xs tracking-widest">Accommodation Support</h5>
              <ContactItem name="Bharath R (Boys)" phone="+91 93447 85172" />
              <ContactItem
                name="Lisalini (Girls)"
                phone="+91 87544 16195"
                className="mt-4 lg:mt-14"
              />
            </div> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const ContactItem = ({ name, phone, className = "" }) => {
  return (
    <div className={`${className}`}>
      <h4 className="text-lg mt-2 font-semibold">{name}</h4>
      <button
        className="flex items-center space-x-4 mt-2"
        onClick={() => window.open(`tel:${phone}`)}
      >
        <BsTelephone className="text-white" />
        <p className="text-sm">{phone}</p>
      </button>
    </div>
  );
};

export default Section9;
