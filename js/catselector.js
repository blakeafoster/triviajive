var cats; // categories object
var currentCat=0 // current category
var questions;
var quiz;
var timeleft=15
function changeBg(){
    $("body").css("background-image", "url(images/cat/"+currentCat+".jpg)");
};
function endquiz(){
     $("title").html("I got "+quiz.score+" out of 10 in " +cats[currentCat].name);
    if (timeleft<=0){
         $(".endscreen").css("visibility", "visible");
        document.getElementById("end").innerHTML="YOU RAN OUT OF TIME! <br><br>You got <span id='endscore'>" +quiz.score+ "</span>/10 in <span id='endcat'><br>" +quiz.questions[0].category+ "!</span> <br>Share with your friends and see how they do!" ;} else {

            $(".endscreen").css("visibility", "visible");
        document.getElementById("end").innerHTML="You got <span id='endscore'>" +quiz.score+ "</span>/10 correct before you answered incorrectly in<span id='endcat'><br>" +quiz.questions[0].category+ "!</span> <br>Share with your friends and see how they do!" ;
        };
   

};

// Randomly order questions so that the correct answer isn't always at the end of the list of buttons.
function randomFlex(){
 $(".guess3").css("order", (Math.floor(Math.random() * 7)).toString());
                  $(".guess2").css("order", (Math.floor(Math.random() * 7)).toString()); 
                                   $(".guess1").css("order", (Math.floor(Math.random() * 76)).toString()); 
                                                    $(".guess0").css("order", (Math.floor(Math.random() * 7)).toString()); 
                  };
var quizAction = {
    displayNext: function () {
            this.displayQuestion();
            this.displayChoices();
            randomFlex(); // Line 23


        },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().question);
    },
    displayChoices: function() {

        for(var i = 0; i < quiz.getCurrentQuestion().incorrect_answers.length; i++) {
            this.populateIdWithHTML("choice" + i, quiz.getCurrentQuestion().incorrect_answers[i]);
           this.guessHandler("choice" + i, quiz.getCurrentQuestion().incorrect_answers[i]);
        };
         $("#choice3").blur();
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(name, guess) {
        var button = document.getElementById(name);
        button.onclick = function() {
            new Audio("audio/catclick.mp3").play();
            quiz.getCurrentQuestion().incorrect_answers;
            quiz.guess(guess);

        }
    },
    
};
function changeCategory(){
            new Audio("audio/catclick.mp3").play();
        document.getElementById("category").innerHTML=cats[currentCat].name; //click event to change category
}


// Pull category data
$.getJSON( "https://opentdb.com/api_category.php?format=JSON", function( data ) { //call JSON object
    
    cats= data.trivia_categories; // Create variable to store categories
    
    //renamed some categories here
    cats[1].name="Books";
    cats[2].name="Film";
    cats[3].name="Music";
    cats[4].name="Musicals & Theater";
    cats[5].name="Television"
    cats[6].name="Video Games";
    cats[7].name="Board Games";
    cats[9].name="Computers";
    cats[10].name="Mathematics";
    cats[20].name="Comics";
    cats[21].name="Gadgets";
    cats[22].name="Anime & Manga";
    cats[23].name="Cartoon & Animation"
    
    document.getElementById("category").innerHTML=cats[0].name; //set starting category to the first category name in the cats array.
    
    
    $("#category").click(function(){ // category click handler
        
        //skiped a category that was not functional through the API I used.
        if (currentCat===3){
            currentCat++};
        changeCategory();
        if (currentCat<=22){
            currentCat++;
        changeCategory();
        }else if (currentCat === 23){
            currentCat=0;
            changeCategory();
        }
    });
    
    
});

//catgory select click handler
$("#category_select").click(function(){ 
    new Audio("audio/catclick.mp3").play();
    changeBg();
    
    //text animations and other css modifications
    $(".category-wrap").animate({top: "2000"}, 4000);
    $("#heading").animate({left: "-600"}, 2000);
    $("#category_select").css("display", "none")
    $(".answer-container button").css("display", "block")
    
    //get questions from the current selected category
    $.getJSON( "https://opentdb.com/api.php?amount=10&type=multiple&category="+cats[currentCat].id+"&format=JSON", function( data ){
        questions = data.results;
        $("#category_select").css("display", "none");
        $(".answer-container button").css("display", "block");
            $.each(questions, function(i, item){  // Compile all answers from the JSON into one array by pushing the correct answer into the incorrect answers key.
            item.incorrect_answers.push(item.correct_answer);
                         //create and start the quiz by creating a new Quiz instance
    quiz = new Quiz(questions);
    quizAction.displayNext();
    $(".title").html("Question "+parseInt(+quiz.currentQuestionIndex+1));
    });
    });
    
// Progress bar. This is sitll fucky because I have to set the time to 20000 or the endscreen will end up showing "OUT OF TIME" after 15 seconds even if the user just guesses wrong. Refer quiz.js prototypes  
// Can't figur eout how to get the time leftvariable to stay static after the quiz ends.
    $("#progressBar").css("visibility","visible");
    var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 15 - --timeleft;
    if(timeleft <= 0)
      endquiz();
},1000);
});



    


    



    










