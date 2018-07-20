var clientId;
var apiKey;

// The scope is always this value when using analytics APIs
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// This function is called after the Client Library has finished loading
function handleClientLoad(){
    printAuthStatus("JavaScript Client Ready. Authorization not checked yet.");
}


function initAuth() {
  clientId = document.getElementById('clientID').value;
  apiKey = document.getElementById('apiKey').value;

  // 1. Set the API Key
  gapi.client.setApiKey(apiKey);

  // 2. Call the function that checks if the user is Authenticated. This is defined in the next section
  //window.setTimeout(checkAuth,1);
  handleAuth();
}

function handleAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  //return false;
}

function handleAuthResult(authResult) {
  if (authResult) {
    // The user has authorized access
    // Load the Analytics Client. This function is defined in the next section.
    loadAnalyticsClient();
  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}

function loadAnalyticsClient() {
  // Load the Analytics client and set handleAuthorized as the callback function
  gapi.client.load('analytics', 'v3', handleAuthorized);
}

// Authorized user
function handleAuthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-mgmt-api-call-button');

  // Show the 'Get Profile' button and hide the 'Authorize' button
  makeApiCallButton.style.visibility = '';
  authorizeButton.style.visibility = 'hidden';

  printAuthStatus("User authorized."); 
}

// Unauthorized user
function handleUnAuthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-mgmt-api-call-button');

  // Show the 'Authorize Button' and hide the 'Get Visits' button
  makeApiCallButton.style.visibility = 'hidden';
  authorizeButton.style.visibility = '';

  printAuthStatus("User not authorized.");
}


function printAuthStatus(status) {
  var resultDiv = document.getElementById('status');

  resultDiv.innerHTML = status;
}

//function checkAuth() {
//  // Call the Google Accounts Service to determine the current user's auth status.
//  // Pass the response to the handleAuthResult callback function
//  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
//}