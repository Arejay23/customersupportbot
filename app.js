var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = 3000;
app.use(express.static("."));
    
server.listen(port, function () {
    console.log("Listening server at port: " + port);
});

const dialogflow = require('dialogflow');
const uuid = require('uuid'); //package creates unque id bycryptography
 
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'customersupportbot-1df49') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: '2 medical college',
        // The language used by the client (en-US)
        languageCode: 'English — en',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;  
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentMessages[0].text.text}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}
runSample();

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});