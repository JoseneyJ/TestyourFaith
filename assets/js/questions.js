// all questions given 
var questions = [
  {
    title: "Be ____ and know that I am God. I will be exalted among the nations, I will be exalted in the earth!:",
    choices: ["humble", "still", "quiet", "worried"],
    answer: "still",
  },
  {
    title: "For nothing will be ____ with God.",
    choices: ["easy", "possible", "cpmplicated", "impossible"],
    answer: "impossible",
  },
  {
    title: "Therefore, since we have been justified through ____ , we have peace with God through our Lord Jesus Christ.",
    choices: [
      "faith",
      "endurance",
      "work",
      "love",
    ],
    answer: "faith",
  },
  {
    title:
      "What are the fruits of the spirit? ",
    choices: ["love", "joy", "peace", "patience", "kindness", "goodness", "gentleness", "self-control",  "all the above"],
    answer: "all the above",
  },
  {
    title:
      "Before  reading your  bible you should?",
    choices: ["sing", "eat", "pray", "take a nap"],
    answer: "pray",
  },
];

// all my selectors & declarations 
var viewHighScoresEl = document.getElementById("high-scores");
var timerEl = document.querySelector("#timer");
var containerStartEl = document.querySelector(".container");
var btnStartEl = document.querySelector("#start-quiz");
var containerQuestionEl = document.getElementById("questioncontainer");
var questionEl = document.getElementById("questions");
var answerButtonsEl = document.getElementById("answerbuttons");
var containerEndEl = document.getElementById("endcontainer");
var containerScoreBannerEl = document.getElementById("scorebanner");
var containerFormInitialsEl = document.getElementById("initialbox");
var containerHighScoresEl = document.getElementById("high-scores-container");
var highScoresListEl = document.getElementById("high-scores-list");
var btnGoBackEl = document.querySelector("#goback");
var btnClearHighScores = document.querySelector("#clearhighscores");
var correctEl = document.getElementById("Correct");
var wrongEl = document.getElementById("Wrong");
var score = 0;
var endGame;
var timeLeft;
timerEl.innerText = 0;
var HighScores = [];
var arrayShuffleQuestions;
var QuestionIndex = 0;


var startOver = function () {
  containerHighScoresEl.classList.add("hide");
  containerHighScoresEl.classList.remove("show");
  containerStartEl.classList.remove("hide");
  containerStartEl.classList.add("show");
  containerScoreBannerEl.removeChild(containerScoreBannerEl.lastChild);
  QuestionIndex = 0;
  endGame = "";
  timerEl.textContent = 0;
  score = 0;

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }
  if ((wrongEl.className = "show")) {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};


// setting the time interval 
var Interval = function () {
  timeLeft = 60;

  var timecheck = setInterval(function () {
    timerEl.innerText = timeLeft;
    timeLeft--;

    if (endGame) {
      clearInterval(timecheck);
    }

    if (timeLeft < 0) {
      showScore();
      timerEl.innerText = 0;
      clearInterval(timecheck);
    }
  }, 1000);
};

// start of the quiz 
var startQuiz = function () {
  containerStartEl.classList.add("hide");
  containerQuestionEl.classList.remove("hide");
  arrayShuffleQuestions = questions.sort(() => Math.random() - 0.6);

  Interval();
  generateQuestion();
};

// generate any random question 
var generateQuestion = function () {
  resetAnswer();
  showQuestion(arrayShuffleQuestions[QuestionIndex]);
};

var resetAnswer = function () {
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
};

// Questions are being prompted at random
var showQuestion = function (index) {
  questionEl.innerText = index.title;
  console.log(index);
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement("button");
    answerbutton.innerText = index.choices[i];
    answerbutton.classList.add("btn");
    answerbutton.classList.add("answerbtn");
    answerbutton.addEventListener("click", checkAnswer);
    answerButtonsEl.appendChild(answerbutton);
  }
};

//checking for right answer
var answeredRight = function () {
  if ((correctEl.className = "hide")) {
    correctEl.classList.remove("hide");
    correctEl.classList.add("banner");
    wrongEl.classList.remove("banner");
    wrongEl.classList.add("hide");
  }
};

//checking for wrong answer
var answeredWrong = function () {
  if ((wrongEl.className = "hide")) {
    wrongEl.classList.remove("hide");
    wrongEl.classList.add("banner");
    correctEl.classList.remove("banner");
    correctEl.classList.add("hide");
  }
};

var checkAnswer = function (event) {
  var answerpicked = event.target;
  if (arrayShuffleQuestions[QuestionIndex].answer === answerpicked.innerText) {
    // add 5 secs from if answered correctly 
    answeredRight();
    score = score + 5;
  } else {
    // remove 5 secs from if answered incorrectly 
    answeredWrong();
    score = score - 5;
    timeLeft = timeLeft - 5;
  }

  QuestionIndex++;
  if (arrayShuffleQuestions.length > QuestionIndex + 1) {
    generateQuestion();
  } else {
    endGame = "true";
    showScore();
  }
};

//displays the score on the page
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var displayScore = document.createElement("p");
  displayScore.innerText = "Your Score is: " + score + "";
  containerScoreBannerEl.appendChild(displayScore);
};

var createHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  //alert window incase if user submits a blank on the initials box
  if (!initials) {
    alert("Please Enter your Initials");
    console.log(event);
    return;
  }

  containerFormInitialsEl.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  HighScores.push(HighScore);
  HighScores.sort((a, b) => {
    return b.score - a.score;
  });

  while (highScoresListEl.firstChild) {
    highScoresListEl.removeChild(highScoresListEl.firstChild);
  }
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.className = "high-score";
    highscoreEl.innerHTML =
      HighScores[i].initials + " : " + HighScores[i].score;
    highScoresListEl.appendChild(highscoreEl);
  }

  savedHighScores();
  showHighScores();
};

// saving score to local storage 
var savedHighScores = function (event) {
  console.log(event);
  localStorage.setItem("HighScores", JSON.stringify(HighScores));
};


var showHighScores = function () {
  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  endGame = "true";

  containerScoreBannerEl.classList.add('hide')

  if ((containerEndEl.className = "show")) {
    containerEndEl.classList.remove("show");
    // containerEndEl.classList.add("hide");
  }
  if ((containerStartEl.className = "show")) {
    containerStartEl.classList.remove("show");
    containerStartEl.classList.add("hide");
  }
  if ((containerQuestionEl.className = "show")) {
    containerQuestionEl.classList.remove("show");
    containerQuestionEl.classList.add("hide");
  }
  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }
  if ((wrongEl.className = "show")) {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};
// clearing out highscores 
var clearScores = function () {
  HighScores = [];

  while (highScoresListEl.firstChild) {
    highScoresListEl.removeChild(highScoresListEl.firstChild);
  }
  localStorage.clear(HighScores);
};

// event listeners 
btnStartEl.addEventListener("click", startQuiz);
containerFormInitialsEl.addEventListener("submit", createHighScore);
viewHighScoresEl.addEventListener("click", showHighScores);
btnGoBackEl.addEventListener("click", startOver);
btnClearHighScores.addEventListener("click", clearScores);
