import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchPayGeneral,
  fetchPayWorkshop,
  fetchUserByEmail,
  fetchWorkshopById,
  fetchWorkshopStats,
} from "../../API/call";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import colleges from "../CollegeList";
import { toast } from "react-hot-toast";

const PSG_COLLEGE =
  "PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004";

const OtherPayments = ({ switchPage }) => {
  const [isPSG, setIsPSG] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [userDetails, setUserDetails] = useState(null);
  const [workshopDetails, setWorkshopDetails] = useState(null);
  const [currentCount , setCurrentCount] =useState(null);

  const navigate = useNavigate();


 
  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email"))
      .then((res) => {
        console.log("USER", res.data);
        setIsPSG(res.data.user.college === PSG_COLLEGE);
        setAlreadyPaid(res.data.user.isPaid);
        setUserDetails(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (
      !searchParams.get("type") &&
      searchParams.get("type") !== "GENERAL" &&
      searchParams.get("type") !== "WORKSHOP"
    ) {
      toast.error("Invalid URL for payment");
      navigate(-2);
      return;
    }
  }, []);

  const onStorageUpdate = (e) => {
    if (e.key === "txn") {
      console.log("STORAGE UPDATED", e.newValue);
      console.log(transaction);
      navigate(`/portal/workshop/${searchParams.get("eventId")}`);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  const id = searchParams.get("eventId")
  useEffect(() => {
    fetchWorkshopStats().then((res) => {
      setCurrentCount(
        res.data?.workshopWiseCount.find((i) => i._id === id)?.count
      );
    });
  }, [id]);
  const handlePayNowForGeneral = () => {
    if (!userDetails || !userDetails.email) {
      toast("Please login to continue");
      navigate("/auth?type=login");
      return;
    }

    fetchPayGeneral({
      email: userDetails.email,
      name: userDetails.name,
      kriyaId: userDetails.kriyaId,
      fee: isPSG ? 200 : 250,
    })
      .then((res) => {
        setTransaction(res.data);
        console.log("TXN", res.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePayNowForWorkshop = () => {
    fetchPayWorkshop(searchParams.get("eventId"), {
      email: localStorage.getItem("email"),
      name: userDetails.name,
      kriyaId: userDetails.kriyaId,
      fee: workshopDetails.actualFee, 
    })    
      .then((res) => {
        setTransaction(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!transaction) return;
    localStorage.setItem("txn", transaction.data.transactionId);
    localStorage.setItem(
      "txn_redirect_uri",
      `/portal/workshop/${searchParams.get("eventId")}`
    );
    console.log(transaction);
    window.open(transaction.url, "_blank");
  }, [transaction]);

  useEffect(() => {
    if (!searchParams.get("eventId")) return;
    setWorkshopDetails(fetchWorkshopById(searchParams.get("eventId")));
  }, []);



 
 

  return (
    <section className="h-screen w-screen flex  items-center bg-gray-100 font-poppins">
      <div className="hidden lg:block w-4 bg-gradient-to-t from-[#C80067] to-[#5451B6] h-screen"></div>
      <main className="flex w-full  h-screen items-center relative justify-center  overflow-x-hidden lg:overflow-y-hidden ">
        <div
          className="absolute h-[50vh] top-0 left-0 right-0 w-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(243,244,246,0) 50%, rgba(243,244,246,1) 100%), url(/assets/Design/paybg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {searchParams.get("type") === "WORKSHOP" && workshopDetails && (
          <div className="relative z-30 w-full lg:w-[30vw] h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6 ">
            <div className="flex w-full justify-center lg:hidden items-center">
              <img
                src="/public/assets/Logo/yutira_rmbg.png"
                alt="Kriya black"
                className="lg:hidden h-24 w-auto opacity-70"
              />
            </div>
            <div className="">
              <h3 className="text-sm text-gray-500">Confirm your payment</h3>
              <h1 className="text-2xl font-bold text-[#181818]">
                Pay for Workshop
              </h1>
            </div>
            <p className="">
              The registration for workshop -{" "}
              <b className="font-semibold"> {workshopDetails.workName} </b> in{" "}
              Kriya 2024 is{" "}
              {console.log(workshopDetails?.actualFee + "this is the fee details")}
              {console.log("current count is " + currentCount)}
              {console.log( (workshopDetails.maxCount/100)*20 )}
              {console.log(workshopDetails?.maxCount + "this is the max count ")}
              <b className="font-semibold">Rs. {currentCount > (workshopDetails.maxCount/100)*20   ? workshopDetails?.actualFee : workshopDetails?.alteredFee}.00</b>. You
              will be redirected to our payment gateway and an email will be
              sent as a confirmation.
            </p>
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-2 w-full">
              <button
                onClick={() => navigate(-1)}
                className="border-2 border-black bg-white hover:bg-gray-100 transition-all duration-500 text-black text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNowForWorkshop}
                className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
              >
                Pay now
              </button>
            </div>
          </div>
        )}
        {searchParams.get("type") === "GENERAL" && (
          <div>
            {alreadyPaid ? (
              <div className="relative z-30 w-full lg:w-[30vw] h-screen lg:h-fit py-12 px-6 lg:py-8 lg:px-8 shadow-xl bg-white space-y-10 ">
                <div className="flex w-full justify-center lg:hidden items-center">
                  <img
                    src="/public/assets/Logo/yutira_rmbg.png"
                    alt="Kriya black"
                    className="lg:hidden h-24 w-auto opacity-70"
                  />
                </div>
                <div className="">
                  <h1 className="text-xl text-[#181818]">
                    You've <b>already paid</b> your general registration fee!
                    Feel free to go ahead and register for events.
                  </h1>
                </div>
                <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-2 w-full">
                  <button
                    onClick={() => navigate("/")}
                    className="border-2 border-black bg-white hover:bg-gray-100 transition-all duration-500 text-black text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
                  >
                    Go to Home Page
                  </button>
                  <button
                    onClick={() => navigate("/portal/event")}
                    className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
                  >
                    Go to events
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-30 w-full lg:w-[30vw] h-screen lg:h-fit py-12 px-6 lg:py-16 lg:px-8 shadow-xl bg-white space-y-6 ">
                <div className="flex w-full justify-center lg:hidden items-center">
                  <img
                    src="/public/assets/Logo/yutira_rmbg.png"
                    alt="Kriya black"
                    className="lg:hidden h-24 w-auto opacity-70"
                  />
                </div>
                <div className="">
                  <h3 className="text-sm text-gray-500">
                    Confirm your payment
                  </h3>
                  <h1 className="text-2xl font-bold text-[#181818]">
                    Pay for your registration
                  </h1>
                </div>
                {!isPSG ? (
                  <p className="">
                    The general registration for Kriya 2024 is{" "}
                    <b className="font-semibold">Rs. 250</b>. You will be
                    redirected to our payment gateway and an email will be sent
                    as a confirmation.
                  </p>
                ) : (
                  <p className="">
                    The general registration for Kriya 2024 is{" "}
                    <b className="font-semibold">Rs. 200</b> for the students of
                    PSG College of Technology. You can pay now and register for
                    the events. You are also availed of the option to pay later.
                  </p>
                )}
                <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-2 w-full">
                  <button
                    onClick={() =>
                      navigate(-1) ? navigate(-1) : navigate("/portal/profile")
                    }
                    className="border-2 border-black bg-white hover:bg-gray-100 transition-all duration-500 text-black text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayNowForGeneral}
                    className="border-2 border-black bg-black hover:bg-gray-700 transition-all duration-500 text-white text-lg rounded-lg py-2 px-4 w-full lg:w-1/2"
                  >
                    Pay now
                  </button>
                </div>
                <p className="text-sm">
                  * After the transaction, the payment cannot be refunded. For
                  any queries, <Link className="text-blue-500 font-semibold" to="/?sn=section9"> Contact us </Link>.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default OtherPayments;
