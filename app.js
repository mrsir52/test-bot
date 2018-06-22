var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector();
server.post('/api/messages', connector.listen());

// var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Hi, I am a virtual assistant. I can help you book an appointment" )
    session.beginDialog('setAppointment');
});

bot.dialog('setAppointment', [(session, args, next) => {
    builder.Prompts.text(session, "Whats your name?");
}, (session, results) => {
    session.userData.name = results.response;
    builder.Prompts.number(session, "Great! What is a good number to reach you at?");
}, (session, results) => {
    session.userData.number = results.response;

    session.send("Thank you, someone will call you at " + session.userData.number + " in 24 hours");

}]);


// var restify = require('restify');
// var builder = require('botbuilder');
//
// // Setup Restify Server
// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
//    console.log('%s listening to %s', server.name, server.url);
// });
//
// // var connector = new builder.ConsoleConnector().listen();
// // var bot = new builder.UniversalBot(connector, function(session) {
// //     session.send("hello there. You said " + session.message.text);
// // });
//
// var appId = ""
// var appPassword = ""
//
// var connector = new builder.ChatConnector();
// server.post('/api/messages', connector.listen());
//
// var bot = new builder.UniversalBot(connector, function (session, args) {
//     session.send('You reached the default message handler. You said \'%s\'.', session.message.text);
// });
//
// var luisAppId = "6a92a962-b865-4d98-96a0-f9cd3b355f92";
// var luisAPIKey = "d539c93e091245f0b2d85c7beec70b72";
// var luisAPIHostName = "westus.api.cognitive.microsoft.com";
//
// const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;
//
// var recognizer = new builder.LuisRecognizer(LuisModelUrl);
// bot.recognizer(recognizer);
//
//
// bot.dialog('setAppointment' [])


// bot.dialog('GreetingDialog',
//     (session) => {
//         session.send('whats up!!!!', session.message.text);
//         session.endDialog();
//     }
// ).triggerAction({
//     matches: 'Greeting'
// })
//
// bot.dialog('HelpDialog',
//     (session) => {
//         session.send('You reached the Help intent? You said \'%s\'.', session.message.text);
//         session.endDialog();
//     }
// ).triggerAction({
//     matches: 'Help'
// })
//
// bot.dialog('CancelDialog',
//     (session) => {
//         session.send('I will stop now.', session.message.text);
//         session.endDialog();
//     }
// ).triggerAction({
//     matches: 'Cancel'
// })
//
// bot.dialog('ShowWeather',
//     (session) => {
//         session.send('you reached the weather intent.', session.message.text);
//         session.endDialog();
//     }
// ).triggerAction({
//     matches: 'showWeather'
// })
//
