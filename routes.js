const express = require("express");
const todos = require("./todos");
const request = require("request")
const router = express.Router();

// console.log(process.env.OPEN_API_KEY)



// openai ChatGPT
const { Configuration, OpenAIApi } = require("openai");
const cfg_ChatGPT = new Configuration({
    organization : process.env.OPEN_API_ORG,
    apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(cfg_ChatGPT);
const response = openai.listEngines();


router.get("/todos", (req, res) => {
  res.json(todos);
});

let ChatGPT = (query) => new Promise((rp)=>{
  console.log("ChatGPT", query)
  rp(openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
      max_tokens: 300,
      temperature: 1.0 ,
    }));
});


var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
let translate = (query, from, to) => new Promise((res)=>{
  console.log(query)
  console.log(from)
  console.log(to)
  var options = {
    url: 'https://openapi.naver.com/v1/papago/n2mt',
    form: {'source':from, 'target':to, 'text': query},
    headers: {'X-Naver-Client-Id':process.env.NAVER_API_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET}
  };
  request.post(options, function (error, trans_response, body) {
    if (!error && trans_response.statusCode == 200) {
      // console.log(body.message)
      res(JSON.parse(body));
        
    } else {
        // res.status(trans_response.statusCode).end();
        console.log('error ' + trans_response.statusCode);
    }
});
})



router.get("/GPT", (req, res) => {
  translate(req.query.q, 'ko', 'en')
  .then((t_res) =>ChatGPT(t_res.message.result.translatedText))
  .then((g_res) => new Promise(() => {
    // console.log(result.data.choices[0].text)
    console.log("last", g_res)
    var query = g_res.data.choices[0].text
    var options = {
      url: 'https://openapi.naver.com/v1/papago/n2mt',
      form: {'source':'en', 'target': 'ko', 'text': query},
      headers: {'X-Naver-Client-Id':'ZkXTCOcrWgVJWM9h3uP4', 'X-Naver-Client-Secret': 'EMuUjqK7am'}
    };
    request.post(options, function (error, trans_response, body) {
      if (!error && trans_response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(trans_response.statusCode).end();
        console.log('error = ' + trans_response.statusCode);
      }
    });
  }));
});


module.exports = router;

