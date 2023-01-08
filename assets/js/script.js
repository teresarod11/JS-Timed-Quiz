// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// Defining variables that I will later use

var title = document.querySelector('.title-layout');
var highScores = document.querySelector('#view-highscores');
var timerEl = document.querySelector(".timer");
var startBtn = document.querySelector('.start-button');
var t = document.querySelector('.top');

var questionsEl = document.querySelector('.questions');
var quesTitle = document.querySelector('.header');
var ans = document.querySelectorAll('.option');
var op1 = document.querySelector('#btn1');
var op2 = document.querySelector('#btn2');
var op3 = document.querySelector('#btn3');
var op4 = document.querySelector('#btn4');
var ansCheck = document.querySelector('.check');

var finalPage = document.querySelector('.final-score');
var end = document.querySelector('#finish');
var finalScore = document.querySelector('#score');
var enterInitials = document.querySelector('#initials');
var submitBtn = document.querySelector('.submit');
var highScoresPage = document.querySelector('.high-scores');

var scores = document.querySelector('#userscores');
var goBack = document.querySelector('#go-back');
var clearBtn = document.querySelector('#clear');
var timeLeft = document.querySelector('#timer');

var fnlScore = 0;
var quesNum = 0;
var scoreList = [];
var secsLeft = 60;
var timeInterval;
var quesCount = 1;

// list of questions
var listOfQuestions = [
    {
        question: "What does && mean?",
        options: ['a. or', 'b. and', 'c. else', 'd. if'],
        correctOption: 'b',
    },

    {
        question: "Inside which HTML element do we put the JavaScript in?",
        options: ['a. js', 'b. html', 'c. scripting', 'd. script'],
        correctOption: 'd',
    },

    {
        question: "Where is the correct place to put the JS in?",
        options: ['a. In the body', 'b. In the head', 'c. Both in head and body', 'd. In the title'],
        correctOption: 'b',
    },

    {
        question: " How do you write 'hello!' as an alert?",
        options: ['a. alertbox("hello!");', 'b. warning("hello!");', 'c. alert("hello!");', 'd. msg("hello!");'],
        correctOption: 'c',
    },

    {
        question: " What does || mean in JS?",
        options: ['a. and', 'b. nothing', 'c. or', 'd. else'],
        correctOption: 'c',
    }
];

// Event listeners

// event listener for the start quiz button
startBtn.addEventListener('click', startQuiz);
// a click function is applied to each of the answer buttons
ans.forEach(function (click) {
    click.addEventListener('click', answersCorrectOrWrong);
});
// event listener for the view highscores button 
highScores.addEventListener('click', function (event) {
    event.preventDefault();
    title.style.display = "none";
    highScoresPage.style.display = 'block';
    title.style.display = "none";
    questionsEl.style.display = "none";
    finalPage.style.display = 'none';
    t.style.display = 'none';
});

// event listener for the submit initials button 
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    title.style.display = "none";
    highScoresPage.style.display = 'block';
    title.style.display = "none";
    questionsEl.style.display = "none";
    finalPage.style.display = 'none';
    t.style.display = 'none';
    // initials stored into the store score funtions
    storeScores();
});
// event listener for the go back button 
goBack.addEventListener('click', function (event) {
    event.preventDefault();
    title.style.display = "block";
    t.style.display = 'block';
    enterInitials.style.display = 'none';
    highScoresPage.style.display = 'none';
    finalPage.style.display = 'none';
    questionsEl.style.display = "none";
    secsLeft = 60;
    timeLeft.textContent = "Time:" + secsLeft + "s";
    scores.innerHTML='';
});
// event listener for the clear button 
clearBtn.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    console.log(localStorage)
    scoreBoard();
});
// function that once the start 
function startQuiz() {
    title.style.display = "none";
    enterInitials.style.display = 'none';
    highScoresPage.style.display = 'none';
    highScores.style.display = 'none';
    finalPage.style.display = 'none';
    questionsEl.style.display = "block";
    quesNum = 0;
    runTimer();
    displayQuestions(quesNum);
};

// display the questions and answers once the start button is clicked
function displayQuestions(n) {
    quesTitle.textContent = listOfQuestions[n].question;
    op1.textContent = listOfQuestions[n].options[0];
    op2.textContent = listOfQuestions[n].options[1];
    op3.textContent = listOfQuestions[n].options[2];
    op4.textContent = listOfQuestions[n].options[3];
    quesNum = n;
};

// Starts the timer when the quiz starts
function runTimer() {
    timeInterval = setInterval(function () {
        secsLeft--;
        timeLeft.textContent = "Time:" + secsLeft +"s";
        // time stops when there is no time left and when done
        if (secsLeft <= 0 || quesNum >= listOfQuestions.length) {
            clearInterval(timeInterval);
            end.textContent = "Time's up";
            gameOver();
        }
    }, 1000);
};

// shows if the answer that the user chose is correct or wrong
function answersCorrectOrWrong(event) {
    event.preventDefault();
    ansCheck.style.display = "block";
    setTimeout(function () {
        ansCheck.style.display = "none";
    }, 1000);
    if (listOfQuestions[quesNum].correctOption == event.target.value) {
        ansCheck.textContent = 'Correct!';
        fnlScore = fnlScore + 2;
    } else {
        secsLeft = secsLeft - 10;
        ansCheck.textContent = 'Wrong!';
    }
    if (quesNum < listOfQuestions.length - 1) {
        displayQuestions(quesNum + 1);
    } else {
        gameOver();
    }
};
// once the quiz is over, the final page with the users score and to enter initials is displayed
function gameOver() {
    questionsEl.style.display = 'none';
    finalPage.style.display = 'block';
    enterInitials.style.display = 'block';
    highScores.style.display = 'block';
    highScoresPage.style.display = 'none';
    console.log(finalPage);
    finalScore.textContent = + fnlScore;
    clearTimeout(timeInterval);
};
// the users scores are stored in the local storage using this function 
function score() {
    var getScore = localStorage.getItem("Score");
    if (getScore !== null) {
        scoreList = JSON.parse(getScore);
        return scoreList;
    } else {
        fnlScore = 0;
    }
    return scoreList;
};
// this function will add any new scores to the array of scores
function addItem(n) {
    var add = JSON.parse(localStorage.getItem("hs")) || [];
    if (add.length === 0) {
        var add_array = [];
        add_array.push(n);
        localStorage.setItem('hs', JSON.stringify(add_array));

    } else {
        add.push(n);
        localStorage.setItem('hs',JSON.stringify(add));
    }
};
// stores scores and initials 
function storeScores() {
    var storeItems = {
        user: enterInitials.value,
        score: fnlScore
    }
    addItem(storeItems);
    scoreBoard();
};

// displays the scores and initials onto the page of Highscores
function scoreBoard() {
    var hs = JSON.parse(localStorage.getItem("hs")) || [];
    scores.innerHTML='';
    for (var i = 0; i < hs.length; i++) {
        var user = document.createElement("li");
        var context = document.createTextNode(hs[i].user + " - " + hs[i].score);
        user.appendChild(context);
        scores.appendChild(user);
    }
    if (hs.length===0){
        scores.innerHTML='';
    }
};


