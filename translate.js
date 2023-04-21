const express = require('express')
const request = require("request")
const app = express();

// openai ChatGPT
const { Configuration, OpenAIApi } = require("openai");
const cfg_ChatGPT = new Configuration({
    organization: "org-4Z0UrLBQSmmedIP6FCkKaqCX",
    apiKey: "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",
});
const openai = new OpenAIApi(cfg_ChatGPT);
// const response = await openai.listEngines();

var client_id = 'ZkXTCOcrWgVJWM9h3uP4';
var client_secret = 'EMuUjqK7am';
var query = "I go.";

var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
var options = {
    url: api_url,
    form: {'source':'en', 'target':'ko', 'text':query},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        module.exports = body;
        console.log(body);

    } else {
        // res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
    }
});

// module.exports = [
//     {
//       id: 1,
//       task: "Fix Sink",
//     },
//     {
//       id: 2,
//       task: "Buy Groceries",
//     },
//     {
//       id: 3,
//       task: "Wash the dishes",
//     },
//   ];
  