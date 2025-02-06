import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

// FAQs

const Section8 = () => {
  const [faqOpenIdx, setFaqOpenIdx] = useState(-1);

  return (
    <div className="">
      <section
        id="section8"
        className="h-fit w-screen relative overflow-x-hidden lg:overflow-hidden px-[calc(100vw/12)] font-poppins py-24"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-white">
          Frequently Asked{" "}
          <span className="bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#FFDC73] to-[#FFDC73]">
            Questions
          </span>
        </h1>
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center w-full lg:w-[60vw] mt-16">
            {FAQContent.map((item, index) => (
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpened={index === faqOpenIdx}
                onClick={() => {
                  index === faqOpenIdx
                    ? setFaqOpenIdx(-1)
                    : setFaqOpenIdx(index);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FAQItem = ({ question, answer, isOpened = false, onClick }) => {
  return (
    <div className="w-full">
      <button
        className="p-4 lg:px-8 border-t border-gray-300 text-lg flex w-full justify-between items-center font-semibold"
        onClick={onClick}
      >
        <div
          className={`text-left text-base lg:text-lg py-2 ${
            isOpened ? "text-white font-bold" : "text-white font-normal"
          }`}
        >
          {question}
        </div>
        <div>
          <AiOutlinePlus
            className={`text-2xl ${
              isOpened ? "text-white rotate-45" : "text-white rotate-0"
            } transition-all`}
          />
        </div>
      </button>
      <div
        className={`${
          isOpened
            ? "text-white h-fit px-4 lg:px-8 py-4 "
            : "text-white h-0 overflow-y-hidden"
        } transition-all ease-in-out text-sm`}
      >
        {answer}
      </div>
    </div>
  );
};

const FAQContent = [
  {
    question: "What is Yutira ?",
    answer:
      "Yutira 2025 is a National level Technical Symposium conducted by the Department of Civil Engineering, PSG College of Technology. It encompasses 4 events, a workshop and a paper presentation.",
  },
  {
    question: "Who can participate in Yutira?",
    answer:
      "The contest is open for all Undergraduate and Postgraduate students from AICTE approved Technical Higher Educational Institutions of India.",
  },

  {
    question: "What is the fee to participate in Yutira?",
    answer:
      "The general registration fee is Rs. 100 for PSG Tech students and Rs. 150 for students from other colleges. No separate registration fee is required to participate in each event and paper presentations. However, participants have to pay separately to participate in workshops.",
  },
  {
    question: "Do we have to pay separately for attending workshops?",
    answer:
      "Yes, we have to pay separately for each workshop. The general registration fee doesn’t cover workshop participation.",
  },
  {
    question: "Will registration fees be refunded? ",
    answer: "No , we follow a non refund policy at any cost * ",
  },
];

export default Section8;
