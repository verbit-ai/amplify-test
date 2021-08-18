import Amplify, { Auth } from "aws-amplify";
import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import logo from './logo.png';
import React, { useState, useEffect } from 'react';
import { Nav, Logo, Headline, AppBody, Title } from './styled';
import './App.css';
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {

  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
}, []);

    return (
    <div className="App">
      <Nav>
        <Logo alt="logo" src={logo}/>
      <Headline>Verbit Test App</Headline>
      {authState === AuthState.SignedIn && user ? <AmplifySignOut/> : null}
      </Nav>
      { authState === AuthState.SignedIn && user ? (
      <AppBody>
      <Title>Welcome to Verbit</Title>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod a ligula eget lobortis. Sed blandit ante non volutpat sollicitudin. Nullam quis quam rutrum, interdum mi eu, posuere nunc. Aenean porttitor augue et euismod scelerisque. Nunc accumsan nunc sed dignissim ultrices. </p>
      </AppBody>
      ) : (
      <AmplifyAuthenticator/>
      )}
    </div>
  );
}

export default App;
