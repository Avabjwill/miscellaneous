/*Set up a test for console connection*/
var mood = `All Good, Coffee Needed`;

console.log(mood);

//list all questions, choices and answers
var questions = [
    {
        title: "Whats blacks and white with stripes all over?",
        choices: [`zebra`, `horse`, `penguin`],
        answer: "zebra"
    },
    {
        title: "If you work 40 hours per week from age 20-65, yopu will work about how many hours in total?",
        choices: [`50,000`, `75,000`, `90,000`],
        answer: "90,000"
    },
    {
        title: "On average how many times will you be yubikeyed within a year?",
        choices: [`1`, `5`, `10`],
        answer: "10"
    }
]

//variables to keep track of Quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements 
var questionEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    startBtn.addEventListener('click', function(){

        questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
    })
   
    
}

function getQuestion() {
    // get current question object from array
    var currentQuestion = question[currentQuestionIndex];

    var titleEl = document.getElementById("quesstion-title");
    titleEl.textContent = currentQuestion.title;

    //clear previous choices
    choicesEl.innerHTML = "";

    //loop over choices 
    currentQuestion.choices.forEach(function (choice, i) {
        //create new button for each choice
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", "choice");

        choiceNode.textContent = i + 1 + "." + choice;

        //attach click event listener to each choice
        choiceNode.onclick = questionClick;

        //display on page
        choicesEl.appendChild(choiceNode);

    });

}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // display new time on page
        timerEl.textContent = time;

        // play "wrong" sound effect
        sfxWrong.play();

        feedbackEl.textContent = "Wrong!";
    } else {
        // play "right" sound effect
        sfxRight.play();

        feedbackEl.textContent = "Correct!";
    }

    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}
