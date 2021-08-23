import Amplify, { Auth } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp, AmplifyConfirmSignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import { Nav, Logo, Headline, AppBody, Title } from "./styled";
import "./App.css";
import awsconfig from "./aws-exports";
import AuthChallenge from "./AuthChallenge";

Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    authenticationFlowType: "CUSTOM_AUTH",
  },
});

Auth.configure(awsconfig);

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    console.log("Auth State is: ", authState);
  }, [authState]);

  const HandleCaptcha = () => {
    if (authState === AuthState.CustomConfirmSignIn && user) {
      return <AuthChallenge user={user} override={"AmplifyAuthenticator"} />;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <Nav>
        <Logo alt="logo" src={logo} />
        <Headline>Verbit Test App</Headline>
        {authState === AuthState.SignedIn && user ? <AmplifySignOut /> : null}
      </Nav>
      {authState === AuthState.SignedIn && user ? (
        <AppBody>
          <Title>Welcome to Verbit</Title>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod a ligula eget lobortis. Sed blandit ante non volutpat sollicitudin. Nullam
            quis quam rutrum, interdum mi eu, posuere nunc. Aenean porttitor augue et euismod scelerisque. Nunc accumsan nunc sed dignissim ultrices.{" "}
          </p>
        </AppBody>
      ) : (
        <>
          <HandleCaptcha />
          <AmplifyAuthenticator>
            <AmplifySignUp
              slot="sign-up"
              usernameAlias="email"
              formFields={[
                {
                  type: "email",
                  label: "Custom Email Label",
                  placeholder: "Custom email placeholder",
                  inputProps: { required: true, autocomplete: "username" },
                },
                {
                  type: "password",
                  label: "Custom Password Label",
                  placeholder: "Custom password placeholder",
                  inputProps: { required: true, autocomplete: "new-password" },
                },
                {
                  type: "phone_number",
                  label: "Custom Phone Label",
                  placeholder: "Custom phone placeholder",
                },
              ]}
            />
            <AmplifyConfirmSignUp headerText="Hilulit..." slot="confirm-sign-up" usernameAlias="username"></AmplifyConfirmSignUp>
          </AmplifyAuthenticator>
        </>
      )}
    </div>
  );
}

export default App;
