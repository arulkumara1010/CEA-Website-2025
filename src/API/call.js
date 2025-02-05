import axios from "axios";
// import EventsList from "../data/eventsList2.json";
import EventsList from "../data/eventdetails24.json";

// import PapersList from "../data/ppList.json";
import PapersList from "../data/ppr24.json";

// import WorkList from "../data/workList.json";
// import WorkList from '../data/workshopList2.json';
import WorkList from "../data/workshop24.json";

export const BACKEND_URL = "https://yutira25-backend.vercel.app";
//export const BACKEND_URL = "https://yutiradb.psgtech.ac.in";

const BASE_URL = `${BACKEND_URL}/api`;
const USER_URL = `${BASE_URL}/auth`;
const EVENT_URL = `${BASE_URL}/register`;
const PAYMENT_URL = `${BASE_URL}/payment`;
const PAPER_URL = `${BASE_URL}/paper`;

export const fetchLogin = (formData) =>
  axios.post(`${USER_URL}/login`, formData, {});

export const fetchLoginByGoogle = (formData) =>
  axios.post(`${USER_URL}/login-google`, formData, {});

export const fetchLoginVerify = (email, token) =>
  axios.get(`${USER_URL}/login-verify/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchUserByEmail = (email) =>
  axios.post(`${USER_URL}/user-details`, { email: email }, {});

export const fetchUpdateUser = (email = "", formData) =>
  email.length <= 0
    ? axios.put(`${USER_URL}/user-details/create`, formData, {})
    : axios.put(`${USER_URL}/user-details/${email}`, formData, {});

export const fetchConvertToPSG = (fromEmail, toEmail) =>
  axios.put(`${USER_URL}/convert-to-psg`, { fromEmail, toEmail }, {});

export const fetchUserVerify = (email) =>
  axios.get(`${USER_URL}/verify-email/${email}`, {});

export const fetchUserVerifyConfirm = (id) =>
  axios.get(`${USER_URL}/verify-confirm/${id}`, {});

export const fetchUpdateUserPassword = (email, password) =>
  axios.post(`${USER_URL}/user-password/${email}`, { password: password }, {});

export const fetchMasterAccommodation = () =>
  axios.get(`${BASE_URL}/acc/stats`, {});

export const fetchAccomodationRegister = (formData) =>
  axios.post(`${BASE_URL}/acc/`, formData, {});

export const fetchAccomodationDetailsByEmail = (email) =>
  axios.get(`${BASE_URL}/acc/email/${email}`, {});

export const fetchPayGeneral = (formData) =>
  axios.post(`${PAYMENT_URL}/pay-general`, formData, {});

export const fetchPayWorkshop = (eventId, formData) =>
  axios.post(`${PAYMENT_URL}/pay-workshop/${eventId}`, formData, {});

export const fetchPaymentDetailsByTxnId = (txnId) =>
  axios.get(`${PAYMENT_URL}/payment-details/${txnId}`, {});

export const fetchPaymentDetailsByEmail = (email) =>
  axios.get(`${PAYMENT_URL}/user-payment-details/${email}`, {});

export const fetchEventDetailsByEmail = (email) =>
  axios.get(`${EVENT_URL}/events-from-user/${email}`, {});

export const fetchEventRegister = (formData) =>
  axios.post(`${EVENT_URL}/`, formData, {});

export const fetchPaperRegister = (formData) =>
  axios
    .post(`${PAPER_URL}/`, formData, {})
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Server responded with a status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
      throw error; // Re-throw the error to handle it elsewhere if needed
    });

export const fetchPaperDetailsByEmail = (email) =>
  axios.get(`${PAPER_URL}/papers-from-user/${email}`, {});

export const fetchWorkshopStats = () =>
  axios.get(`${BASE_URL}/statistics/workshop-stats`, {});

// export const fetchEvents = () => axios.get(`${EVENT_URL}/`);

// export const fetchEventById = (id) => axios.get(`${EVENT_URL}/${id}`);

export const fetchEvents = () => {
  return EventsList;
};

export const fetchEventById = (id) => {
  return EventsList.find((i) => i.eventId === id);
};

export const fetchPapers = () => {
  return PapersList;
};

export const fetchPaperById = (id) => {
  return PapersList.find((i) => i.ppid === id);
};

export const fetchWorkshops = () => {
  return WorkList;
};

export const fetchWorkshopById = (id) => {
  return WorkList.find((i) => i.wid === id);
};

export const fetchRegister = (formData) => {
  return axios.post(`${USER_URL}/register`, formData);
};
