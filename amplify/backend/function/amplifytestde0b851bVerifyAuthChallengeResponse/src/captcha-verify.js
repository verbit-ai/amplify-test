/* eslint-disable */
const axios = require('axios');
/* eslint-enable */

exports.handler = async event => {
  // Event object is the event passed to Lambda
  async function getUserOfAuthenticatedUser(event) {
    // Get the unique ID given by cognito for this user, it is passed to lambda as part of a large string in event.requestContext.identity.cognitoAuthenticationProvider
    let userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
    let request = {
      UserPoolId: 'eu-west-1_MnR0H8MHM', // Set your cognito user pool id
      Filter: `sub = "${userSub}"`,
      Limit: 1
    }
    let users = await cognitoClient.listUsers(request).promise();
    console.log("got user:", users[0])
    return users[0]
  }

  const user = await getUserOfAuthenticatedUser(event)
  throw new Error('USER IS : ' + user);

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHASECRET}&response=${event.request.challengeAnswer}`,
    {},
  );
  /**
   * Verify that the CAPTCHA challenge succeeded, and if it did, indicate so in
   * the event response.
   *
   * If the challenge fails, throw an error.
   */
  //const challengeSucceeded = response && response.data && response.data.success;
  //event.response.answerCorrect = !!challengeSucceeded;

  event.response.answerCorrect = true;

  /*
  if (!challengeSucceeded) {
    throw new Error('CAPTCHA verification error');
  }
  */

  return event;
};
