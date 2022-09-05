function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


var questions = [
    new Question("Javascript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a Javascript framework", ["Python Script", "JQuery", "Django", "NodeJS"], "Python Script"),
    new Question("Which is used to Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Javascript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];


function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    }else{
        let question = quiz.getQuestionByIndex();
        var element = document.getElementById("question");
        element.innerHTML = question.text;

        // show options
        var choices = question.choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn"+i, choices[i]);
        }
        showProgressBar();
    }
}

function showScores() {
    let scoreHtml = "<h1>Result</h1>";
    scoreHtml += "<h2 id='score'>Your score is : " + quiz.score + " </h2>"
    scoreHtml += "<h2 id='score'>Your percentage of correctly answered questions : " + quiz.score*100/5 + " percent </h2>"
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = scoreHtml;
}

function showProgressBar() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

let quiz = new Quiz(questions);
loadQuestions();