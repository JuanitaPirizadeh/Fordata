// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Skapa frågor
let questions = [
    {
        question : "Vem grundade Facebook?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Mark Zuckerberg",
        choiceB : "Steve Zuckerberg",
        choiceC : "Rob Zuckerberg",
        correct : "A"
    },{
        question : "När grundades Facebook?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },{
        question : "Hur många bilder tror du laddas upp varje dag?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },{
        question : "Vilka av dessa företag har FB sammarbetat med?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },{
        question : "Vilka av dessa spel kan du spela på FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },{
        question : "Är det möjligt att radera ett meddelande du redan skickat?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },{
        question : "Vad stämmer inte in på FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "7 miljoner bilder",
        choiceB : "ca 14 miljoner bilder",
        choiceC : "32 miljoner bilder",
        correct : "B"
    },
    {
        question : "Vilka av dessa appar är kopplade till FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Snapchat",
        choiceB : "Twitter",
        choiceC : "Instagram",
        correct : "C"
    }
];

// Skapa variabler 

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// "render" en fråga
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// starta quizzet 
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// "render" progress 
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // Räkna ut antal rätt på frågorna i procent 
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

