const questions = [
    {
        question : "In reference to object,color,height,weight and name are all examples of?",
        answers : [
            {text: "variable",correct: false},
            {text: "properties",correct: true},
            {text: "methods",correct: false},
            {text:"nouns",correct: false},
        ]
    },
    {
        question: "To access the 'color' property of 'hair' object using dot syntax is?",
        answers: [
            {text: " color.hair",correct: false},
            {text: "color.{hair}",correct: false},
            {text: "hair.color",correct:true},
            {text:"hair.{color}",correct:false},
                
        ]

    },
    {
        question: " How do you declare a variable in javascript?",
        answers: [
            {text: "object name;",correct:false},
            {text: "input name;",correct:false},
            {text: "var name;",correct:true},
            {text: "get name;",correct:false},
        ]
    },
    {
        question: "What is the purpose of the 'const' keyword in javascript?",
        answers: [
            {text: "let you declare variable that can change", correct:false},
            {text: "let you modify your variable",correct:false},
            {text: "let you assign only string variable",correct:false},
            {text: "let you declare variable that can't be reassign",correct:true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
     }else{
        selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     });
     nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});

startQuiz();
