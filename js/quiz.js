function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    
    if(answer===quiz.getCurrentQuestion().correct_answer) {
        this.score++;
        this.currentQuestionIndex++;
        timeleft=16;
        $(".title").html("Question "+parseInt(+quiz.currentQuestionIndex+1));
    } else {
        $(".endscreen").css("visibility", "visible");
        endquiz();
        timeleft=20000
    };
    if (quiz.score<10) {
        randomFlex();
            quizAction.displayNext();
    } else {
        endquiz();
        timeleft=20000
    };
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

function isCorrect (choice) {
    return this.answer === choice;
};