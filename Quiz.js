function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
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


function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("When was IPL started?", ["2008", "2009", "2007", "2006"], "2007"),
    new Question("Which player has made highest numbers of runs in IPL history?", ["Suresh Raina", "Virat Kohli", "Chris Gayle", " Murli Vijay"], "Virat Kohli"),
    new Question("Which player has taken most numbers of wickets in IPL so far?", ["Lasith Malinga", "Ravindra Jadeja", "Zaheer Khan", "None of the above"], "Lasith Malinga"),
    new Question("Which team has never won the IPL tournament?", ["Deccan Chargers", "Sunrisers Hyderabad", " Rajasthan Royals", "Royal Challengers Bangalore"], "Royal Challengers Bangalore"),
    new Question("Who has hit most sixes in all the IPL tournaments?", ["Rohit Sharma", "Suresh Raina", "Chris Gayle", "AB de Villiers"], "Chris Gayle")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();