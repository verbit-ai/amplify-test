import { Auth } from "aws-amplify";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const AuthChallenge = (user) => {
  const onChange = (data) => {
    Auth.sendCustomChallengeAnswer(user.user, data).then((user) => {
    //   console.log("user signed in! ", user);
    //   setAuthState("signedIn", user.user);
    });
  };
  return (
    <div className="captcha">
      <ReCAPTCHA sitekey="6LeqCfMbAAAAAJXK3HsqgdpwlrNn-wdZ08fGfB15" onChange={onChange} />
    </div>
  );
};

export default AuthChallenge;
