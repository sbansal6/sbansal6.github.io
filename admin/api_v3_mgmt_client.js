var selectedProfileId;
 
function makeMgmtApiCall() {
  queryAccounts();
}

function queryAccounts() {
  printMgmtResults('Querying Accounts.');

  // Get a list of all Google Analytics accounts for this user
  gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}

function handleAccounts(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

        printMgmtResults("Found the following Accounts:");
        for(var i = 0; i < results.items.length;i++)
        {
            printMgmtResults(i + ". Account name: '" + results.items[i].name + "' Account ID: " + results.items[i].id)
        }

        printMgmtResults("Choosing the first Account as default.<br/>");

        // Get the first Google Analytics account
        var firstAccountId = results.items[0].id;

        // Query for Web Properties
        queryWebproperties(firstAccountId);

    } else {
      printMgmtResults('No accounts found for this user.')
    }
  } else {
    printMgmtResults('There was an error querying accounts: ' + results.message);
  }
}

function queryWebproperties(accountId) {
  printMgmtResults('Querying Web Properties in Selected Account.');

  // Get a list of all the Web Properties for the account
  gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
}

function handleWebproperties(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

        printMgmtResults("Found the following Web Properties:");
        for(var i = 0; i < results.items.length;i++)
        {
            printMgmtResults(i + ". Property name: '" + results.items[i].name + "' Property ID: " + results.items[i].id)
        }
        printMgmtResults("Choosing the first Web Property as default.<br/>");

        // Get the first Google Analytics account
        var firstAccountId = results.items[0].accountId;

        // Get the first Web Property ID
        var firstWebpropertyId = results.items[0].id;

        // Query for Profiles
        queryProfiles(firstAccountId, firstWebpropertyId);

    } else {
      printMgmtResults('No webproperties found for this user.');
    }
  } else {
    printMgmtResults('There was an error querying webproperties: ' + results.message);
  }
}

function queryProfiles(accountId, webpropertyId) {
  printMgmtResults('Querying Profiles in Selected Web Property.');

  // Get a list of all Profiles for the first Web Property of the first Account
  gapi.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': webpropertyId
  }).execute(handleProfiles);
}

function handleProfiles(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

        printMgmtResults("Found the following profiles:");
        for(var i = 0; i < results.items.length;i++)
        {
            printMgmtResults(i + ". Profile name: '" + results.items[i].name + "' Profile ID: " + results.items[i].id)
        }
        printMgmtResults("Choosing the first Profile as default.<br/>");

        // Save the first Profile ID
        selectedProfileId = results.items[0].id;

        //Show the Core Reporting Query UI 
        document.getElementById('coreReportQueryUI').style.visibility = '';

    } else {
      printMgmtResults('No profiles found for this user.');
    }
  } else {
    printMgmtResults('There was an error querying profiles: ' + results.message);
  }
}


function printMgmtResults(results) {
  var resultDiv = document.getElementById('mgmtQueryResults');
  resultDiv.innerHTML += results + '<br />';
}