import React, { useEffect, useState, useCallback } from "react";
import { IoMdCall, IoLogoWhatsapp } from "react-icons/io";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaperById, fetchPaperDetailsByEmail, fetchPaperRegister, fetchUserByEmail } from "../API/call";
import { SiGmail } from "react-icons/si";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particleOptions from "../ParticleOptions";

const Paper = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generalPayment, setGeneralPayment] = useState(false);
  const [userPaperDetails, setUserPaperDetails] = useState([]);

  const particlesInit = useCallback(async engine => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  }

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { id } = useParams();

  const [paperDetail, setPaperDetail] = useState(null);

  useEffect(() => {
    fetchPaperDetailsByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data);
      setUserPaperDetails(res.data);
    });
  }, []);

  const handleRegister = () => {
    if (!isLoggedIn) {
      navigate("/auth?type=signup");
    } else if (!generalPayment) {
      navigate("/auth/payment?type=GENERAL");
    } else {
      fetchPaperRegister({
        email: localStorage.getItem("email"),
        paperId: id,
      }).then((res) => {
        console.log(res);
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    setPaperDetail(fetchPaperById(id));
  }, [id]);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data.user);
      setIsLoggedIn(true);
      setGeneralPayment(res?.data?.user?.isPaid);
    });
  }, []);

  return !paperDetail ? (
    <section className="w-full lg:px-16 font-poppins py-12 pt-36 lg:pt-12 h-screen  overflow-y-scroll">
      <p className="text-white text-xl px-8">Loading...</p>
    </section>
  ) : (
    <section className="w-full lg:px-16 font-poppins py-12 pt-28 lg:pt-12 h-screen bg-white overflow-y-scroll">
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} className="top-0 left-0 absolute" height="100vh" width="100vh" options={particleOptions} />
      <div className="w-fit">
        <h1 className="text-4xl text-black font-semibold px-8 lg:px-0">
          {toTitleCase(paperDetail.eventName)}
        </h1>
        <div className="w-[60%] lg:w-[80%] ml-8 lg:ml-0 mt-2 h-[4px] bg-gradient-to-r rounded-[2px] from-[#ffdc73] to-[#ffdc73]"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full lg:px-0 my-8 text-black ">

        <div className="flex flex-col w-full justify-between lg:w-3/5 space-y-5 ">



          <div className="bg-black text-white lg:rounded-3xl lg:px-0 space-y-8 relative py-8 px-8 h-full">
            <p className="text-2xl text-left pl-10 font-semibold tracking-wider text-white lg:text-white">
              Topics
            </p>
            <ul className=" list-disc text-left pl-10 lg:text-lg text-white lg:text-white space-y-2 lg:pr-16">
              {paperDetail.topic.split("\n").map((item, index) => (
                <li
                  key={index}
                  className={`${item.slice(-1) === ":"
                    ? "text-xl font-semibold -ml-2 py-2"
                    : "text-lg"
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black  lg:rounded-3xl lg:px-0 space-y-8 relative py-8 px-8 ">
            <p className="text-2xl font-semibold tracking-wider text-white pl-10">
              Guidelines
            </p>
            {paperDetail.ppid !== "PRPN0004" ? <ul className="list-disc text-base lg:text-base text-white pl-10 space-y-2 lg:pr-16">
              <li>Abstracts should be submitted in the Gform:<a href="https://forms.gle/rp2BNABJDoWDVyYP8" className="text-xl text-[#Ffcd73]"><br></br>Click here</a> </li>
              <li>Details such as Title of the Paper, Author Names, Degree, Year of Study, College Name, Contact Number should be clearly mentioned in the abstract.</li>
              <li>The abstracts prepared should be within 300 words describing the outline of the content.</li>
              <li>The papers/manuscript prepared should be within 6 to 10 pages including references. It should be typed in Times New Roman font with size 12.</li>
              <li>The papers submitted will be subjected to plagiarism detection to verify their originality by the organizing institution before the technical review process. (Accepted similarity: less than or equal to 15% for papers and 20% for review articles)</li>
              <li>Last date of receipt of Abstracts is 2nd April 2024.</li>
              <li>The papers will be reviewed by a panel of experts and the selected papers will be invited for presentation.
              </li></ul> :


              <ul className="list-disc text-base lg:text-base text-[#3c4043] pl-10 space-y-2 lg:pr-16">
                <li>கீழே கொடுக்கப்பட்டுள்ள டேப்  மூலம் அனைத்து சுருக்கங்களும் மின்னணு முறையில் மட்டுமே சமர்ப்பிக்கப்பட வேண்டும்.</li>
                <li>
                  ஆய்வு கட்டுரைக்ககான விருப்பமான அமைப்பு:
                  <ul className="list-disc pl-8 my-2">
                    <li>தலைப்பு:</li>
                    <li>சமர்ப்பிக்கும் பங்கேற்பாளர்(அடிக்கோடிட வேண்டும்)</li>
                    <li>இணை பங்கேற்பாளர் (கள்)</li>
                    <li>கல்வி நிறுவனம்</li>
                    <li>பங்கேற்பாளர்களின் துறை</li>
                    <li>அறிமுகம்</li>
                    <li>முடிவுகள்</li>
                    <li>கலந்துரையாடல்</li>
                    <li>முடிவுரை</li>
                  </ul>
                </li>
                <li>அனைத்து சுருக்கங்களும் இரண்டு பக்கங்களில் போர்ட்ரெய்ட் நோக்குநிலையில் PDF வடிவத்தில் மட்டுமே சமர்ப்பிக்கப்பட வேண்டும்.(அதிகபட்சம் இரண்டு பக்கங்கள்).</li>
                <li>ஹைப்பர்லிங்க்கள், அனிமேஷன் படங்கள் அல்லது வீடியோக்கள் அனுமதிக்கப்படமாட்டாது.</li>
                <li>கட்டுரையை சமர்ப்பிக்க விரும்பும் பங்கேற்பாளர்கள்  பொது பதிவுக் கட்டணத்தைச் செலுத்த வேண்டும். 1 பங்கேற்பாளர் மட்டுமே முன்வைக்க அனுமதிக்கப்படுகிறது. இணை பங்கேற்பாளர்கள் விளக்கக்காட்சியில் கலந்து கொள்ளத் தயாராக இருந்தால், அவர்கள் பொது பதிவு கட்டணம் செலுத்தியிருக்க வேண்டும்.</li>
                <li>பங்கேற்பாளர், கொடுக்கப்பட்ட தலைப்பில் இருந்து மட்டுமே தலைப்பைத் தேர்ந்தெடுத்து கட்டுரையை சமர்ப்பிக்க வேண்டும்.</li>
                <li>தாள்களின் சுருக்கங்கள் ஆசிரியர் குழுவால் ஆராயப்படும். ஆசிரியர் குழுவின் உடைய பரிந்துரையே இறுதியானது.</li>
                <li>கட்டுரையை சமர்ப்பிப்பதற்கான கடைசி நாள்: 15 பிப்ரவரி 2024</li>
                <li>பங்கேற்பாளர்கள் அனைவரும் கட்டாயம் முன்பதிவு செய்திருக்க வேண்டும் மற்றும் விளக்கக் காட்சியை சமர்ப்பிக்கும் போது நேரில் வர வேண்டும்.</li>
              </ul>
            }


          </div>
        </div>

        <div className="w-full lg:w-2/5 space-y-4 flex flex-col">
          {!userPaperDetails.find((i) => i.paperId === id) ? (
            <button
              className="bg-black lg:rounded-3xl p-8 lg:p-12 space-y-4 text-center lg:text-left flex justify-center lg:justify-start"
              onClick={() => {
                alert("Registrations Closed!")
              }}
            >
              <span className="text-3xl lg:text-3xl font-semibold tracking-wide bg-clip-text [-webkit-text-fill-color:transparent] bg-gradient-to-r from-[#FFDC73] to-[#FFDC73]">
                {/* {"Register Here!"} */}

              </span>
            </button>
          ) : (
            <div className="flex flex-row gap-4 w-full lg:px-0">
              <div className="bg-black w-full lg:rounded-3xl p-8 lg:p-12 space-y-4">
                <p className="text-xl font-semibold tracking-wider text-[#FFDC73]">
                  Submit the abstract to the mail ID
                </p>
                <p className="text-base text-[#FFDC73] space-y-4">
                  {paperDetail.eventMail.map((item, index) => (
                    <div className="flex flex-row items-center space-x-4 group w-full">
                      <SiGmail className="text-2xl group-hover:text-black" />
                      <button
                        key={index}
                        className="text-blue-700 group-hover:underline [overflow-wrap:break-word] w-[80%] text-left"
                        onClick={() => {
                          window.open(`mailto:${item}`);
                        }}
                      >
                        {item}
                      </button>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          )}

          <div className="bg-black lg:rounded-3xl p-8 lg:p-12 space-y-6 h-full">
            <p className="text-2xl font-semibold tracking-wide text-white lg:text-white">
              Abstract Submission Deadline
            </p>

            <div className="flex flex-row items-center gap-4 lg:gap-4">
              <p className="text-6xl lg:text-6xl font-semibold tracking-wide text-white lg:text-white">
                {paperDetail.deadline}
              </p>
              <div className="flex flex-col">
                <p className="text-lg font-semibold tracking-wide text-white lg:text-white">
                  April
                </p>
                <p className="text-lg font-semibold tracking-wide text-white lg:text-white">
                  2024
                </p>
              </div>
            </div>

            { <div>
              <p className="text-2xl font-semibold tracking-wide py-4 text-white lg:text-white">
                PRIZE
              </p>
              <ul className="text-2xl  list-disc   text-white lg:text-white py-4 space-y-2">
               Winner<br></br>
               <div className="text-xl">
               4000<br></br><br></br>
               </div>
               First Runner<br></br>
               <div className="text-xl">
               3000<br
               ></br><br></br>
</div>
               Second Runner<br>
               </br>
               <div className="text-xl">
               2000
               </div>
              </ul>
            </div> 
            }
            { <div>
              <p className="text-2xl font-semibold tracking-wide py-4 text-white lg:text-white">
                Note
              </p>
              <ul className="list-disc text-base text-white lg:text-white pl-4 space-y-2">
                <li>For teams, only <b className="font-semibold">one</b> team member needs to pay the general registration fee. (This is applicable only for paper presentations.)</li>
              </ul>
            </div>}
          </div>
        </div>
      </div>



      <div className="flex flex-col lg:flex-row space-x-5">
        <div className="bg-black w-full lg:rounded-3xl p-8 lg:p-12 space-y-4 ">
          <p className="text-2xl font-semibold tracking-wide text-white pb-4">
            Presentation Details
          </p>

          <div className="flex flex-row items-center gap-4 lg:gap-4">
            <p className="text-6xl lg:text-6xl font-semibold tracking-wide text-white">
              {paperDetail.date}
            </p>
            <div className="flex flex-col">
              <p className="text-lg font-semibold tracking-wide text-white">
                April
              </p>
              <p className="text-lg font-semibold tracking-wide text-white">
                2024
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 lg:gap-6">
            <p className="text-4xl font-semibold tracking-wide text-white p-3">
              <MdAccessTime />
            </p>
            <div className="pl-2 flex flex-col">
              <p className="text-base lg:text-lg font-semibold tracking-wider text-white">
                {paperDetail.time}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 lg:gap-6">
            <p className="text-4xl font-semibold tracking-wide text-white p-3">
              <MdOutlineLocationOn />
            </p>
            <div className="pl-2 flex flex-col">
              <p
                className={`text-base lg:text-lg font-semibold tracking-wider text-white`}
              >
                {paperDetail.hall}
              </p>
            </div>
          </div>
          {/* <div className="flex flex-row items-center gap-4 lg:gap-6">
                <p className="text-4xl font-semibold tracking-wide text-[#3c4043] p-3">
                  {paperDetail.teamSize !== "1" ? <AiOutlineTeam /> : <AiOutlineUser />}
                </p>
                <div className="pl-2 flex flex-col">
                  <p className="text-base lg:text-lg font-semibold tracking-wide text-[#3c4043]">
                    {paperDetail.teamSize} Member{paperDetail.teamSize !== "1" ? "s" : ""}
                  </p>
                </div>
              </div> */}
        </div>



        <div className="bg-black w-full h-auto lg:rounded-3xl p-8 space-y-5">
          <p className="text-3xl lg:text-3xl font-semibold tracking-wide text-white lg:text-white">
            Contact
          </p>

          <div className="flex flex-row items-center justify-between">
            <div className="w-1/2 lg:w-1/2">
              <p className="text-base lg:text-base font-semibold tracking-wide text-white lg:text-white">
                {toTitleCase(paperDetail.contact1[0])}
              </p>
              <p className="text-base lg:text-base tracking-wider text-white lg:text-white">
                {paperDetail.contact1[1]}
              </p>
            </div>
            <div className="space-x-8">
              <button
                onClick={() => {
                  window.open(`tel:${paperDetail.contact1[1]}`);
                }}
              >
                <IoMdCall className="hover:text-gray-200 text-white lg:text-white lg:hover:text-white text-3xl" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://wa.me/${paperDetail.contact1[1]}`);
                }}
              >
                <IoLogoWhatsapp className="hover:text-gray-200 text-white lg:text-white lg:hover:text-white text-3xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="w-1/2 lg:w-1/2">
              <p className="text-base lg:text-base font-semibold tracking-wide text-white lg:text-white">
                {toTitleCase(paperDetail.contact2[0])}
              </p>
              <p className="text-base lg:text-base tracking-wider text-white lg:text-white]">
                {paperDetail.contact2[1]}
              </p>
            </div>
            <div className="space-x-8">
              <button
                onClick={() => {
                  window.open(`tel:${paperDetail.contact2[1]}`);
                }}
              >
                <IoMdCall className="hover:text-gray-200 text-white lg:text-white lg:hover:text-white text-3xl" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://wa.me/${paperDetail.contact2[1]}`);
                }}
              >
                <IoLogoWhatsapp className="hover:text-white text-white lg:text-white lg:hover:text-white text-3xl" />
              </button>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Paper;
