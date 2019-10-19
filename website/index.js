const express = require("express");
const app = express();

const questions = [
  ["What is the definition of a thing?", "A thing is a thing"],
  ["How do you calculate mean?", "sum / # items"],
  ["Why is the sky blue?", "air is blue + scattering effects and shit"]
];

let i = 0;
let q = 0;

app.get("/", (req, res) => {
  const name = req.query.name;
  console.log(req.query);
  const greetings = ["howdy", "hello", "hi there", "g'day", "hola", "aloha"];
  const index = i % 6;
  res.end(greetings[index] + " " + name);
  i = i + 1;
});

const quizPage = (question, answer) => `
<html>
<head>
  <title>Quiz</title>
  <style>
    body {
      background: blue;
      color: white;
      font-size: 24px;
    }
    #answer {
      background: white;
      color: black;
      display: none;
    }
  </style>
</head>
<body>
  ${question}
  <br/>
  <button onclick="document.getElementById('answer').style.display = 'block'">Show Answer</button>
  <br/>
  <section id="answer">
    ${answer}
  </section>
</body>
</html>`;

app.get("/quiz", (req, res) => {
  const index = q % questions.length;

  const questionAnswerSet = questions[index];
  const question = questionAnswerSet[0];
  const answer = questionAnswerSet[1];

  res.end(quizPage(question, answer));
  q += 1;
});

app.listen(8090);
