"use strict";
$(document).ready(function(){
    // Used to detach the questions from the DOM
    let detaching = $(".questions").detach();
    $(".mainContainer").html(`<button type="button" class="start col-md-offset-3 col-md-6" id="start">Start</button>`);

    // add a start button before begining the game
$(document).on("click",".start", function(){
    $(".mainContainer").empty();
    $(".mainContainer").append(detaching);
    //invoke the start function
    start();

    });

    //Every code for playing the game is embedded in the code below 
    function start(){
    // array declared and asigned of the correct answers and the incorrect one
    let correctAnswers= ['Jamaica','Quito','2004','Micheal Owen','Turkey'];
    let incorrectAnswers=['Barbados','Lucia','Haiti','Porto','Novo','Mangua','2006','2005','2002','David Beckham','Wayne Rooney','Steven Gerrard','Burundi','Andorra','Morocco']

    // Used to prevent the counter increment whenever a player changes answer
    let answers= {
        answer1:true,
        answer2:true,
        answer3:true,
        answer4:true,
        answer5:true
    }

    let notanswers= {
            notanswer1:true,
            notanswer2:true,
            notanswer3:true,
            notanswer4:true,
            notanswer5:true
    }

    // variables declared for the storing the number of correct answers and wrong answers
    let correct = 0;
    let incorrect = 0;
    let unanswered = 5;
    let count = 20;
    let counter =setInterval(timer, 1000); //1000 will  run it every 1 second

    //varibles to store values that are displayed when either the given time is up or the player have answered all questions 
    let title=$(`<h2 class="col-md-offset-5 col-md-7" style="font-weight: bold;"><br>`).text(`All Done!!`);
    let correctResult=$(`<h2 class="col-md-offset-4 col-md-8">`).text(`Correct Answers:${correct}`);
    let incorrectResult=$(`<h2 class="col-md-offset-4 col-md-8">`).text(`Incorrect Answers:${incorrect}`);
    let unansweredQuestion=$(`<h2 class="col-md-offset-4 col-md-8">`).text(`Unanswered Questions:${unanswered}`);
    let result = $(`<div class="result">`).append(title).append(correctResult).append(incorrectResult).append(unansweredQuestion);

    // answers counter function 
    let correctCounter = function(){
        correct++;
    }

    let incorrectCounter = function(){
        incorrect++;
    }

    // unanwered question counter 
    let unansweredCounter = function(){
        unanswered = 5 - correct - incorrect;
    }

    // function for selected answers
    $('input:radio[name="answer1"],input:radio[name="answer2"], input:radio[name="answer3"], input:radio[name="answer4"], input:radio[name="answer5"]').change(function(){
        //variables to check if answers selected are either in correct or incorrect array
        let correctCheck= correctAnswers.indexOf($(this).val());
        let incorrectCheck= incorrectAnswers.indexOf($(this).val());
        console.log(notanswers[`not${$(this).attr("name")}`]);

        // condition if the correct answer is selected first 
        if (correctCheck > -1 && answers[$(this).attr("name")] && notanswers[`not${$(this).attr("name")}`]){
            answers[$(this).attr("name")] = false;
            console.log(answers[$(this).attr("name")])
        
            // console.log(!answer1);
            correctCounter();
            unansweredCounter();
            console.log(unanswered);
            console.log(correct);
            console.log(incorrect);
            correctResult.text(`Correct Answers:${correct}`);
            unansweredQuestion.text(`Unanswered Questions:${unanswered}`);

        }// condition if answer selected  is changed to correct option(answer is changed )
        else if(correctCheck > -1 &&  answers[$(this).attr("name")] && !notanswers[`not${$(this).attr("name")}`]){
            answers[$(this).attr("name")] = false;
            notanswers[`not${$(this).attr("name")}`] = true;
            incorrect-=1;
            correctCounter();
            unansweredCounter();
            console.log(unanswered);
            console.log(correct);
            console.log(incorrect);
            correctResult.text(`Correct Answers:${correct}`);
            incorrectResult.text(`Incorrect Answers:${incorrect}`);
            unansweredQuestion.text(`Unanswered Questions:${unanswered}`);

        } //condition if the incorrect answer is selected first 
        else if (incorrectCheck > -1 && notanswers[`not${$(this).attr("name")}`] && answers[$(this).attr("name")]){
            notanswers[`not${$(this).attr("name")}`] = false;
            incorrectCounter();
            unansweredCounter();
            console.log(unanswered);
            console.log(correct);
            console.log(incorrect);
            correctResult.text(`Correct Answers:${correct}`);
            incorrectResult.text(`Incorrect Answers:${incorrect}`);
            unansweredQuestion.text(`Unanswered Questions:${unanswered}`);

        }// condition if answer selected is changed to incorrect option(answer is changed )
        else if(incorrectCheck > -1 && notanswers[`not${$(this).attr("name")}`] && !answers[$(this).attr("name")]){
            answers[$(this).attr("name")] = true;
            notanswers[`not${$(this).attr("name")}`] = false;
            correct-=1;
            incorrectCounter();
            unansweredCounter();
            console.log(unanswered);
            console.log(correct);
            console.log(incorrect);
            correctResult.text(`Correct Answers:${correct}`);
            incorrectResult.text(`Incorrect Answers:${incorrect}`);
            unansweredQuestion.text(`Unanswered Questions:${unanswered}`);

        }

    });
    
    // click function for the done button
    $(".sendAnswer").on("click", function(){
        $(".mainContainer").text(``);
        $(".mainContainer").append(result);
        

    });
    
    // timer function
    function timer()
    {
    count=count-1;
    if (count <= 0)
    {
        clearInterval(counter);
        
    $(".mainContainer").text(``);
    $(".mainContainer").append(result)
        return ;
    }
        $("#timer").text(` Time Remaining: ${count}sec`);
    
    }

    
    }
});

    