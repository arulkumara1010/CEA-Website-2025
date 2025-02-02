import React, { useEffect, useState } from "react";
import Inputfield from "../../components/TextInput";
import {
  fetchAccomodationDetailsByEmail,
  fetchAccomodationRegister,
  fetchMasterAccommodation,
  fetchUserByEmail,
} from "../../API/call";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { fetchPaymentDetailsByEmail } from "../../API/call";
import { IoIosArrowForward } from "react-icons/io";
import Toggle from "../../components/Toggle";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Accomodation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kriyaId: "",
    college: "",
    residentialAddress: "",
    city: "",
    phone: "",
    gender: "Male",
    roomType: "",
    from: "22nd February Night",
    to: "25th February Evening",
    breakfast1: false,
    breakfast2: false,
    breakfast3: false,
    lunch1: false,
    lunch2: false,
    lunch3: false,
    dinner1: false,
    dinner2: false,
    days: 0,
    amount: 0,
    amenities: "No",
    vacated: false,
  });
  const [paid, setPaid] = useState(false);
  const fromDates = [
    "22nd February Night",
    "23rd February Morning",
    "24th February Morning",
    "24th February Morning",
  ];
  const toDates = [
    "23rd February Night",
    "24th February Night",
    "25th February Evening",
  ];
  const roomCost = {
    "Common Free Hall": 0,
    Room: 125,
    "Two Sharing": 125,
    "Two Sharing with common bathroom": 250,
  };
  const [accomodationDetails, setAccomodationDetails] = useState(false);
  const [maleCurrent, setMaleCurrent] = useState(0);
  const [femaleCurrent, setFemaleCurrent] = useState(0);
  const maleMax = 45;
  const femaleMax = 16;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaymentDetailsByEmail(localStorage.getItem("email")).then((res) => {
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].status === "SUCCESS") {
          setPaid(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    fetchUserByEmail(localStorage.getItem("email")).then((res) => {
      console.log(res.data.user);
      setFormData({
        ...formData,
        name: res.data.user.name,
        email: res.data.user.email,
        kriyaId: res.data.user.kriyaId,
        college: res.data.user.college,
        phone: res.data.user.phone,
      });
    });
  }, []);

  useEffect(() => {
    toast.promise(
      fetchAccomodationDetailsByEmail(localStorage.getItem("email")),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.data.accommodations) {
            setAccomodationDetails(true);
          }
          return "Loaded Successfully";
        },
        error: (err) => {
          console.log(err);
        },
      }
    );
  }, []);

  useEffect(() => {
    fetchMasterAccommodation().then((res) => {
      setMaleCurrent(
        res.data?.maleStats?.find(
          (item) => item.roomType === "Common Free Hall"
        )?.count
      );
      setFemaleCurrent(
        res.data?.femaleStats?.find(
          (item) => item.roomType === "Common Free Hall"
        )?.count
      );
    });
  }, []);

  const handleProceed = async () => {
    const newFormData = {
      ...formData,
      days:
        formData.from === "22nd February Night"
          ? toDates.indexOf(formData.to) - fromDates.indexOf(formData.from) + 1
          : toDates.indexOf(formData.to) - fromDates.indexOf(formData.from) + 2,
      amount:
        (formData.from === "22nd February Night"
          ? toDates.indexOf(formData.to) - fromDates.indexOf(formData.from) + 1
          : toDates.indexOf(formData.to) -
            fromDates.indexOf(formData.from) +
            2) *
          roomCost[formData.roomType] +
        50 *
          (formData.breakfast1 +
            formData.breakfast2 +
            formData.breakfast3 +
            formData.lunch1 +
            formData.lunch2 +
            formData.lunch3 +
            formData.dinner1 +
            formData.dinner2),
    };

    toast.promise(fetchAccomodationRegister(newFormData), {
      loading: "Registering...",
      success: (res) => {
        navigate("/portal/acc-registered");
        return "Registered Successfully";
      },
      error: (err) => {
        return "Error Occured";
      },
    });
  };

  return (
    <main className="h-full w-full p-8 pt-16 lg:py-8 lg:px-20 font-poppins bg-white">
      <section className="overflow-y-scroll h-full w-full pr-2 pb-12">
        <div className="w-fit">
          <h1 className="mt-1 text-4xl font-bold relative z-10">
            Apply for Accomodation
          </h1>
          <div className="w-[60%] lg:w-[80%] ml-8 lg:ml-0 mt-2 h-[4px] bg-gradient-to-r rounded-[2px] from-[#3b82f6] to-[#8b5cf6]"></div>
        </div>

        {!accomodationDetails ? (
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              <section className="lg:w-1/2 w-full space-y-4">
                <p className="font-semibold">Dear participant, </p>
                <p className="">
                  Rooms are available from the night of{" "}
                  <b className="font-semibold"> 22nd February 2025</b> to the{" "}
                  <b className="font-semibold"> 25th February 2025 evening</b>.
                  (No accommodation will be provided on the 25th of February
                  night).
                </p>
                {!localStorage.getItem("email") && (
                  <React.Fragment>
                    <p className="">
                      Kindly login to proceed with the application for the same.
                    </p>
                    <div className="flex flex-row space-x-6 w-full">
                      <button
                        className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins text-white bg-[#3b82f6] border-2 border-[#3b82f6] shadow-lg hover:bg-[#83144d] transition-all px-6 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal relative z-40"
                        onClick={() => {
                          navigate("/auth?type=signup");
                        }}
                      >
                        Register
                      </button>
                      <button
                        className="lg:text-lg font-semibold w-full text-center flex justify-center font-poppins bg-white text-[#3b82f6] border-2 border-[#3b82f6] shadow-lg hover:bg-gray-100 transition-all px-8 py-2 rounded-lg my-8 lg:mb-16 whitespace-nowrap lg:whitespace-normal"
                        onClick={() => {
                          navigate("/auth?type=login");
                        }}
                      >
                        Login
                      </button>
                    </div>
                  </React.Fragment>
                )}
                {localStorage.getItem("email") && !paid && (
                  <div>
                    <p className="">
                      <b className="font-semibold">Note: </b>Accommodation will
                      be provided to participants who have either{" "}
                      <b className="font-semibold">
                        paid the general registration fee
                      </b>{" "}
                      (or) registered for{" "}
                      <b className="font-semibold">atleast one workshop</b>.
                    </p>
                    <button
                      className="bg-blue-500 text-white w-fit px-4 py-3 rounded-xl font-poppins flex items-center group mt-4"
                      onClick={() => navigate("/auth/payment?type=GENERAL")}
                    >
                      <p className="">Pay general registration fee!</p>
                      <IoIosArrowForward
                        className="ml-2 transition-all group-hover:translate-x-2"
                        size={24}
                      />
                    </button>
                  </div>
                )}
              </section>
              <section className="lg:w-1/2 w-full flex flex-row justify-center lg:justify-end">
                <img
                  src="/assets/Design/acc.jpg"
                  alt="accomodation"
                  className="lg:h-64 w-auto lg:-mt-20"
                />
              </section>
            </div>
            {localStorage.getItem("email") && paid && (
              <section className="w-full">
                <div className="flex flex-col lg:flex-row gap-6 mt-8">
                  <Inputfield
                    title="Name"
                    isDisabled
                    valueState={[formData.name]}
                  />
                  <Inputfield
                    title="Email"
                    isDisabled
                    valueState={[formData.email]}
                  />
                  <Inputfield
                    title="Kriya ID"
                    isDisabled
                    valueState={[formData.kriyaId]}
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 mt-8">
                  <Inputfield
                    title="College"
                    isDisabled
                    valueState={[formData.college]}
                  />
                  <Inputfield
                    placeholder="Enter your current resident address"
                    title="Residential Address"
                    valueState={[
                      formData.residentialAddress,
                      (val) =>
                        setFormData({ ...formData, residentialAddress: val }),
                    ]}
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 mt-8">
                  <Dropdown
                    title="Gender"
                    valueState={[
                      formData.gender,
                      (val) => setFormData({ ...formData, gender: val }),
                    ]}
                    options={["Male", "Female"]}
                  />
                  <Inputfield
                    title="City"
                    valueState={[
                      formData.city,
                      (val) => setFormData({ ...formData, city: val }),
                    ]}
                  />
                  <Inputfield
                    title="Phone"
                    valueState={[
                      formData.phone,
                      (val) => setFormData({ ...formData, phone: val }),
                    ]}
                  />
                </div>

                <p className="mt-8">
                  *Note : All the amount indicated below are for{" "}
                  <b className="font-semibold">per head per day</b>.
                </p>
                {formData.gender === "Male" ? (
                  <div className="flex flex-col gap-6 mt-8">
                    <h1 className="mt-1 text-2xl font-semibold">
                      Boys Accomodation
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <Toggle
                        title="Room Type"
                        valueState={[
                          formData.roomType,
                          (val) => setFormData({ ...formData, roomType: val }),
                        ]}
                        // options={maleCurrent >= maleMax ? ["Two Sharing"] : ["Common Free Hall", "Two Sharing"]}
                        options={["Common Free Hall"]}
                        // amount={maleCurrent >= maleMax ? ["₹ 150"] : ["Free", "₹ 150"]}
                        amount={["Free"]}
                        className="w-full lg:w-1/2"
                      />
                      <div className="flex flex-col w-full lg:w-1/2 justify-center">
                        <Dropdown
                          title="From"
                          valueState={[
                            formData.from,
                            (val) => setFormData({ ...formData, from: val }),
                          ]}
                          options={fromDates}
                        />
                        <Dropdown
                          title="To"
                          valueState={[
                            formData.to,
                            (val) => setFormData({ ...formData, to: val }),
                          ]}
                          options={toDates}
                        />
                        <p className="mt-2 pl-2">
                          No. of days:{" "}
                          <b className="font-semibold">
                            {formData.from === "22nd February Night"
                              ? toDates.indexOf(formData.to) -
                                fromDates.indexOf(formData.from) +
                                1
                              : toDates.indexOf(formData.to) -
                                fromDates.indexOf(formData.from) +
                                2}
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 mt-8">
                    <h1 className="mt-1 text-2xl font-semibold">
                      Girls Accomodation
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex flex-col lg:w-2/3">
                        <Toggle
                          title="Room Type"
                          valueState={[
                            formData.roomType,
                            (val) =>
                              setFormData({ ...formData, roomType: val }),
                          ]}
                          // options={femaleCurrent >= femaleMax ? ["2 Sharing with common bathroom", "2 Sharing with attached bathroom"] : [
                          //   "Common Free Hall", "2 Sharing with common bathroom", "2 Sharing with attached bathroom",]}
                          //   options={femaleCurrent >= femaleMax ? ["Two Sharing with common bathroom"] : [
                          //    "Two Sharing with common bathroom",]}
                          // amount={femaleCurrent >= femaleMax ? ["₹ 150", "₹ 600"] : ["₹ 250"]}
                          options={["Two Sharing with common bathroom"]}
                          amount={["₹ 250"]}
                          // amount={femaleCurrent >= femaleMax ? ["₹ 150", "₹ 600"] : ["Free", "₹ 250", "₹ 600"]}
                          className="w-full lg:w-2/3"
                        />
                        <h1>*Accommodation will be provided at PSG IMSR</h1>
                      </div>
                      <div className="flex flex-col w-full lg:w-1/3 justify-center">
                        <Dropdown
                          title="From"
                          valueState={[
                            formData.from,
                            (val) => setFormData({ ...formData, from: val }),
                          ]}
                          options={fromDates}
                        />
                        <Dropdown
                          title="To"
                          valueState={[
                            formData.to,
                            (val) => setFormData({ ...formData, to: val }),
                          ]}
                          options={toDates}
                        />
                        <p className="mt-2 pl-2">
                          No. of days:{" "}
                          <b className="font-semibold">
                            {formData.from === "22nd February Night"
                              ? toDates.indexOf(formData.to) -
                                fromDates.indexOf(formData.from) +
                                1
                              : toDates.indexOf(formData.to) -
                                fromDates.indexOf(formData.from) +
                                2}
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row w-full mt-16 space-y-8 lg:space-y-0">
                  <div
                    className={
                      "w-full lg:w-1/2 " +
                      (formData.gender === "Male" ? "inline" : "hidden")
                    }
                  >
                    <h1 className="mt-1 text-lg font-semibold">Meals</h1>
                    <h1 className="mt-1 text-sm">
                      Amount - <b className="font-semibold">Rs.50</b> per meal
                      (Optional)
                    </h1>

                    <div className="flex flex-row mt-4 w-full font-semibold">
                      <p className="w-1/3">Date</p>
                      <p className="w-1/3 flex justify-center">Breakfast</p>
                      <p className="w-1/3 flex justify-center">Lunch</p>
                      <p className="w-1/3 flex justify-center">Dinner</p>
                    </div>
                    <div className="flex flex-row mt-4 w-full items-center">
                      <p className="w-1/3">23rd February</p>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.breakfast1 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              breakfast1: !formData.breakfast1,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.lunch1 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              lunch1: !formData.lunch1,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.dinner1 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              dinner1: !formData.dinner1,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row mt-4 w-full items-center">
                      <p className="w-1/3">24th February</p>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.breakfast2 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              breakfast2: !formData.breakfast2,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.lunch2 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              lunch2: !formData.lunch2,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.dinner2 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              dinner2: !formData.dinner2,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row mt-4 w-full items-center">
                      <p className="w-1/3">25th February</p>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.breakfast3 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              breakfast3: !formData.breakfast3,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button
                          className={`${
                            formData.lunch3 && "bg-[#3b82f6]"
                          } border-2 border-[#3b82f6] text-white rounded-lg font-poppins flex items-center`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              lunch3: !formData.lunch3,
                            });
                          }}
                        >
                          <FiCheck className="w-8 h-8" />
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center"></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    {formData.gender === "Male" ? (
                      <></>
                    ) : (
                      <div>
                        <h1 className="mt-1 text-lg font-semibold">
                          Amenities
                        </h1>
                        <h1 className="mt-1 text-sm">
                          Enjoy inclusive amenities during your stay.
                        </h1>
                        <ul className="mt-1 text-sm list-disc pl-4">
                          <li>Bed + Bed cover</li>
                          <li>Pillow + Pillow cover</li>
                          <li>Bedsheet</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full mt-24 space-y-8 lg:space-y-0 items-end">
                  <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                    <p className="my-2 text-2xl font-semibold">Total Amount</p>
                    <div className="flex flex-row w-full items-center">
                      <div className="w-1/2">
                        <p className="font-semibold">Accomodation</p>
                        <p className="text-sm">{formData.roomType}</p>
                        <p className="text-sm">
                          {formData.from === "22nd February Night"
                            ? toDates.indexOf(formData.to) -
                              fromDates.indexOf(formData.from) +
                              1
                            : toDates.indexOf(formData.to) -
                              fromDates.indexOf(formData.from) +
                              2}{" "}
                          Days
                        </p>
                      </div>

                      <p className="text-lg font-semibold w-1/2 flex justify-end">
                        ₹
                        {(formData.from === "22nd February Night"
                          ? toDates.indexOf(formData.to) -
                            fromDates.indexOf(formData.from) +
                            1
                          : toDates.indexOf(formData.to) -
                            fromDates.indexOf(formData.from) +
                            2) * roomCost[formData.roomType]}
                      </p>
                    </div>
                    {formData.gender === "Male" ? (
                      <div className="flex flex-row w-full items-center">
                        <p className="w-1/2">
                          Meals x{" "}
                          {formData.breakfast1 +
                            formData.breakfast2 +
                            formData.breakfast3 +
                            formData.lunch1 +
                            formData.lunch2 +
                            formData.lunch3 +
                            formData.dinner1 +
                            formData.dinner2}
                        </p>
                        <p className="text-lg font-semibold w-1/2 flex justify-end">
                          ₹{" "}
                          {50 *
                            (formData.breakfast1 +
                              formData.breakfast2 +
                              formData.breakfast3 +
                              formData.lunch1 +
                              formData.lunch2 +
                              formData.lunch3 +
                              formData.dinner1 +
                              formData.dinner2)}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="flex flex-row w-full items-center border-t border-black pt-2">
                      <p className="w-1/2 text-lg">Total</p>
                      <p className="text-xl font-semibold w-1/2 flex justify-end">
                        ₹{" "}
                        {(formData.from === "22nd February Night"
                          ? toDates.indexOf(formData.to) -
                            fromDates.indexOf(formData.from) +
                            1
                          : toDates.indexOf(formData.to) -
                            fromDates.indexOf(formData.from) +
                            2) *
                          roomCost[formData.roomType] +
                          (formData.gender == "Male"
                            ? 50 *
                              (formData.breakfast1 +
                                formData.breakfast2 +
                                formData.breakfast3 +
                                formData.lunch1 +
                                formData.lunch2 +
                                formData.lunch3 +
                                formData.dinner1 +
                                formData.dinner2)
                            : 0)}
                      </p>
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full flex flex-col justify-center lg:justify-end items-center lg:items-end pt-12 lg:pt-0 lg:pr-16">
                    <p className="text-sm pb-4 text-center lg:text-right">
                      You can pay <b className="font-semibold">on the spot</b>{" "}
                      when you arrive. <br />
                      We accept only{" "}
                      <b className="font-semibold">UPI Payments</b>.
                    </p>
                    <button
                      className="bg-[#3b82f6] w-fit text-white font-semibold rounded-lg py-3 px-8 flex justify-center items-center"
                      onClick={() => {
                        if (
                          formData.city === "" ||
                          formData.residentialAddress === "" ||
                          formData.phone === "" ||
                          formData.roomType === ""
                        ) {
                          toast.error("Please fill all the details");
                        } else if (
                          (formData.from === "22nd February Night"
                            ? toDates.indexOf(formData.to) -
                              fromDates.indexOf(formData.from) +
                              1
                            : toDates.indexOf(formData.to) -
                              fromDates.indexOf(formData.from) +
                              2) <= 0
                        ) {
                          toast.error("Please select valid dates");
                        } else {
                          handleProceed();
                        }
                      }}
                    >
                      <p className="text-lg">Apply</p>
                    </button>
                  </div>
                </div>

                <p className="mt-16 text-sm">
                  For accommodation related queries, contact:
                  <br />
                  <b className="font-semibold">
                    MITHUN P- <a href="tel:6380348811">6380348811</a>
                  </b>
                  <br />
                  <b className="font-semibold">
                    AKSHAYAA MAHESH - <a href="tel:9042301353">9042301353</a>
                  </b>
                  <br />
                </p>
              </section>
            )}
          </div>
        ) : (
          <div className="mt-12">
            <h1 className="text-2xl font-semibold">
              You have already applied for accomodation.
            </h1>
            <button
              onClick={() => {
                navigate("/portal/acc-registered");
              }}
              className="flex items-center gap-2 mt-8 bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-semibold"
            >
              View your details here
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Accomodation;
