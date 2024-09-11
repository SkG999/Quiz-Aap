const questionElement = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceContainers = Array.from(
  document.getElementsByClassName("choice-container")
);
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let score = 0;
let availableQuestions = [];

const questions = [
  {
    question: "What is the capital of France?",
    choice1: "Berlin",
    choice2: "Madrid",
    choice3: "Paris",
    choice4: "Lisbon",
    answer: 3,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choice1: "Earth",
    choice2: "Mars",
    choice3: "Jupiter",
    choice4: "Venus",
    answer: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    choice1: "Atlantic Ocean",
    choice2: "Indian Ocean",
    choice3: "Arctic Ocean",
    choice4: "Pacific Ocean",
    answer: 4,
  },
  {
    question: "What is the capital of Japan?",
    choice1: "Beijing",
    choice2: "Tokyo",
    choice3: "Seoul",
    choice4: "Bangkok",
    answer: 2,
  },

  {
    question:
      "Which programming language is known as the 'language of the web'?",
    choice1: "Java",
    choice2: "Python",
    choice3: "JavaScript",
    choice4: "C++",
    answer: 3,
  },

  {
    question: "What does CSS stand for?",
    choice1: "Creative Style Sheets",
    choice2: "Cascading Style Sheets",
    choice3: "Computer Style Sheets",
    choice4: "Colorful Style Sheets",

    answer: 2,
  },

  {
    question: "Which HTML tag is used to create a hyperlink?",
    choice1: "<a>",
    choice2: "<link>",
    choice3: "<href>",
    choice4: "<url>",

    answer: 1,
  },

  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choice1: "The global object",
    choice2: "The current function",
    choice3: "The parent object",
    choice4: "The current instance/object",
    answer: 4,
  },
];

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    questionElement.innerHTML = `<div class="final-message">Quiz completed! You got ${score} out of ${questions.length} questions correct.</div>`;
    choiceContainers.forEach((container) => {
      container.style.display = "none";
    });
    return;
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choiceContainers.forEach((choiceContainer) => {
  choiceContainer.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target
      .closest(".choice-container")
      .querySelector(".choice-text");
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      score++;
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
