import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchPaymentDetailsByTxnId } from "../../API/call";
import { AiOutlineExclamationCircle } from "react-icons/ai";


const PaymentFailure = () => {

  useEffect(() => {
    localStorage.setItem("hasVideoPlayed", "false");
  }, []);

  const [searchParams, setsearchParams] = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!searchParams.get("txn")) return;
    console.log(searchParams.get("txn"));
    fetchPaymentDetailsByTxnId(searchParams.get("txn"))
      .then((res) => {
        console.log("ERRPR", res.data.data);
        if (res.data.data.status !== "ERROR")
          navigate(`/payment/failure?txn=${searchParams.get("txn")}`);
        setTransactionDetails(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center font-poppins">
      <div className="hidden lg:block w-4 bg-gradient-to-t from-[#C80067] to-[#5451B6] h-screen"></div>
      <main className="w-full h-screen flex-1 px-0 lg:px-[calc(100vw/12)] py-16 overflow-auto">
        <section className="bg-red-200 w-full py-6 lg:rounded-xl lg:border-dashed lg:border-2 border-red-700 px-8">
          <div className="flex space-x-2 items-start h-fit">
            <AiOutlineExclamationCircle size={32} className="text-red-500" />
            <h1 className="text-3xl font-bold text-red-500 mb-8">
              Payment Unsuccessful
            </h1>
          </div>
          {!transactionDetails ? (
            <p className="">Loading...</p>
          ) : (
            <Fragment>
              <p className="text-lg">
                The transaction{" "}
                <b className="font-semibold">
                  {" "}
                  {transactionDetails.transactionId}{" "}
                </b>{" "}
                of amount{" "}
                <b className="font-semibold">
                  {" "}
                  Rs. {transactionDetails.fee}.00{" "}
                </b>{" "}
                has failed. The details of the transaction of payment are as
                follows:
              </p>
              <section className="grid gid-cols-1 lg:grid-cols-3 my-8 gap-4">
                <TextOutput
                  label="Transaction ID"
                  value={transactionDetails.transactionId}
                />
                <TextOutput
                  label="Amount"
                  value={`Rs. ${transactionDetails.fee}.00`}
                />
                <TextOutput label="Type" value={transactionDetails.type} />
                <TextOutput
                  label="KriyaID"
                  value={transactionDetails.kriyaId}
                />
                <TextOutput label="Name" value={transactionDetails.name} />
                <TextOutput label="Email" value={transactionDetails.email} />
              </section>
              <div className="w-full">
                <button
                  onClick={() => {
                    navigate("/portal/profile");
                  }}
                  className="bg-black rounded-lg px-6 py-3 text-white"
                >
                  Go to Profile
                </button>
              </div>
            </Fragment>
          )}
        </section>
        <section className="mt-8 p-8 lg:p-0">
          <p className="">
            The payment could have failed for any of the following reasons:
          </p>
          <ul className="list-disc ml-8 mt-4">
            <li className="">
              The user had turned down the money in order to proceed.{" "}
            </li>
            <li className="">
              The user might have used a UPI ID whose server was unavailable. If
              this is the case, kindly try using a different payment method or
              UPI ID.
            </li>
            <li className="">
              Prior to the confirmation, the user had closed the payment portal.
              If so, kindly try again by clicking on the relevant links.
            </li>
          </ul>
          <p className="mt-4">
            On the{" "}
            <a href="/portal/profile" className="font-semibold">
              {" "}
              Transactions{" "}
            </a>{" "}
            column of your profile page, you can see your transactions,
            including the failed ones.
          </p>
        </section>
        <section className="mt-8 bg-gray-200 p-8 rounded-xl">
          <p className="text-gray-700">
            Please get in touch with our support staff if the money was taken
            out of your account and you received this notification of failure.
            Please take a screenshot of this page as well as the{" "}
            <b className="font-semibold"> SMS message</b> or{" "}
            <b className="font-semibold"> statement from your bank</b>{" "}
            confirming the debit (including the name of our service and your
            bank account identification). You can reach our service team at
            <a href="mailto:cea.civil@psgtech.ac.in" className="font-semibold text-blue-600">
              {" "}
              cea.civil@psgtech.ac.in{" "}
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

const TextOutput = ({ label, value }) => {
  return (
    <div className="space-y-0.5">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  );
};

export default PaymentFailure;
