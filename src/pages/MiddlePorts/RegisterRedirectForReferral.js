import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import referralList from '../../data/referralCodes.js';

const RegisterRedirectForReferral = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("code")) return;
    if (!referralList.includes(searchParams.get("code"))) return navigate("/auth?type=signup&page=switch&referral=invalid");
    localStorage.setItem("referral", searchParams.get("code"));
    navigate("/auth?type=signup&page=switch");
  }, [searchParams]);

  useEffect(() => {
    // Your logic here to reset hasVideoPlayed to false
    localStorage.setItem("hasVideoPlayed", "false");
  }, []);

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center space-y-6">
      <img
        src="public//assets//Logo//yutira_rmbg.png"
        alt=""
        className="h-24 invert"
      />
      <div class="loadingio-spinner-spinner-o7mafz45j6n">
        <div class="ldio-r21hzjwurfo">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  )
}

export default RegisterRedirectForReferral