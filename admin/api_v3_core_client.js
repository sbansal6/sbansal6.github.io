function queryCoreReportingApi(profileId) {
  console.log('Querying Core Reporting API.');

  // Use the Analytics Service Object to query the Core Reporting API
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:' + profileId,
    'start-date': document.getElementById('startDate').value,
    'end-date': document.getElementById('endDate').value,
    'metrics': document.getElementById('metric').value
  }).execute(handleCoreReportingResults);
}

function handleCoreReportingResults(results) {
  if (results.error) {
    printReportingError('There was an error querying core reporting API: ' + results.message);
  } else {
    printReportingResults(results);
  }
}

function printReportingResults(results) {
  var resultDiv = document.getElementById('queryResults');

  resultDiv.innerHTML = "";

  if (results.rows && results.rows.length) {
      resultDiv.innerHTML + 'Profile Name: ' + results.profileInfo.profileName + '<br/>';

      for(var i = 0; i < results.rows.length;i++ )
      {
          for(var j = 0; j < results.rows[i].length;j++ ){
              resultDiv.innerHTML += results.columnHeaders[j].name + ": " + results.rows[i][j] + "&nbsp;";
          }
              
      }
  } else {
    resultDiv.innerHTML = 'No results found';
  }

}

function printReportingError(message){
    var resultDiv = document.getElementById('queryResults');
    resultDiv.innerHTML = message;
}