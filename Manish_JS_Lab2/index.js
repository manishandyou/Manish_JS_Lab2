//Prototype - Object is automatically get 1 property that is called prototype
//Quiz Prototype
function Quiz(questions){
    this.score=0;
    this.questionIndex=0;
    this.questions=questions;

}
//Function to return questions from current index number
Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}

//Function to check end of the quiz
Quiz.prototype.isEnded=function(){
return this.questions.length===this.questionIndex;
}

//Function to check correct answer and move to next question index
Quiz.prototype.checkOptionWithAnswer=function(answer){
if(this.getQuestionByIndex().isCorrectAnswer(answer)){
    this.score++;
}
this.questionIndex++;
}

//Question Prototype
function Question(text, choices, answer){
this.text=text;
this.choices=choices;
this.answer=answer;
}
Question.prototype.isCorrectAnswer=function(choice){
    return this.answer===choice;

}

function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }
    else{

       
        //Show next question
       var element= document.getElementById("question");//fetch <p id="question">
       element.innerHTML=quiz.getQuestionByIndex().text;

       //Display options
       var choices=quiz.getQuestionByIndex().choices;
       for(var i=0;i<choices.length;i++){

        //Fetching span to dsplay Options
         var element_choice=document.getElementById("choice"+i);
         element_choice.innerHTML=choices[i];
         handleOptionButton("btn"+i,choices[i]);
       }
       showProgress();
    }
}
function handleOptionButton(id,choice){
    var button=document.getElementById(id);
    button.onclick=function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

//Progress
function showProgress(){
    var currentQuestionNumber=quiz.questionIndex+1;
    var progressbar=document.getElementById("progress");
    progressbar.innerHTML="Question "+currentQuestionNumber + " of "+ quiz.questions.length;

}

//Displaying Scorecard
function showScores(){
 var result="<h1>Result<h1><h2 id='score'> Your Score - ";
 result+=quiz.score;
 result+="<br>Percentage is - "+(quiz.score/questions.length*100) +" %"

 //Fetching quiz div and put result over it
 var element=document.getElementById("quiz");
 element.innerHTML=result;
}

//Array of Object of Questions asked in the Quiz
var questions = [
    new Question("JavaScript ignores?", ["newlines", "tabs","spaces", "All of the above"], "All of the above"),
    new Question("In JavaScript, single line comment begins with ___.?", ["#", "/*", "$", "//"], "//"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];


//Create object of quiz
var quiz=new Quiz(questions);
loadQuestions();


