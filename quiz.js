// Välj element! 
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
        choiceA : "Februari 2006",
        choiceB : "Februari 2004",
        choiceC : "Februari 2002",
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
        choiceA : "Spotify",
        choiceB : "Coca Cola",
        choiceC : "Nike",
        correct : "A"
    },{
        question : "Vilka av dessa spel kan du spela på FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Nail art Design",
        choiceB : "Candy Crush",
        choiceC : "Sonic the hedgehog",
        correct : "A"
    },{
        question : "Är det möjligt att radera ett meddelande du redan skickat?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Nej, det går inte",
        choiceB : "Ja, meddelandet raderas helt",
        choiceC : "Meddelandet raderas enbart för dig själv",
        correct : "B"
    },{
        question : "Vad skulle det ursprungligen stå på 'Like-knappen'?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Great!",
        choiceB : "Wow!",
        choiceC : "Awesome!",
        correct : "C"
    },{
        question : "Vad är det man delar med sig mest av på FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Videor",
        choiceB : "Bilder",
        choiceC : "Gifs",
        correct : "A"
    },{
        question : "Vem föreställde den första bilden som laddades upp FB?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Charlie Chaplin",
        choiceB : "Al Pachino",
        choiceC : "Grace Kelly",
        correct : "B"
    },
    {
        question : "Vilka av dessa appar ägs av Facebook?",
        imgSrc : "/Users/juanitapirizadeh/Desktop/projekt2/images/fb-logo.png",
        choiceA : "Snapchat",
        choiceB : "Twitter",
        choiceC : "WhatsApp",
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

// Skapa/Göra en fråga
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

// Skapa/göra progress 
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// Göra räknare/counter

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;

// Byta färg till röd beroende på poäng

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

// Undersök svaren = checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // Svaret är korrekt
        score++;
        // Byt färg till grönt
        answerIsCorrect();
    }else{
        // Svaret är fel
        // Byt färg till rött
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // Avsluta quiz och visa poäng
        clearInterval(TIMER);
        scoreRender();
    }
}

// Rätt svar
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// Fel svar
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Göra poängen
function scoreRender(){
    scoreDiv.style.display = "block";
    
// Räkna ut antal rätt på frågorna i procent 
    const scorePerCent = Math.round(100 * score/questions.length);
    

    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    alert ("Tack för din medverkan, ditt svar kommer skickas till Facebooks huvudkontor!");
}


