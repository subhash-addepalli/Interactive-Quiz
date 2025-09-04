
const question=document.getElementById("question");
const option_1=document.getElementById("option-1");
const option_2=document.getElementById("option-2");
const option_3=document.getElementById("option-3");
const option_4=document.getElementById("option-4");
const Previous=document.getElementById("previous");
const Next=document.getElementById("next");
let correctAnswers=[1,2,4,2,3];
let corrected=0;
let currentQuestion=0;
let selected=[false,false,false,false,false];


let Data=[
    {Question:"Q1. Which of the following is the correct way to declare a JavaScript variable?",
        O1:" var x = 10;",
        O2:" int x = 10;",
        O3:" let x == 10;",
        O4:" variable x = 10;",
    },
    {Question:"Q2. What will typeof [] return in JavaScript?",
        O1:" array",
        O2:" object",
        O3:" list",
        O4:" undefined",

    },
    {Question:"Q3. Which of the following methods is used to add an element at the end of an array?",
        O1:" unshift()",
        O2:" shift()",
        O3:" pop()",
        O4:" push()",
    },
    {Question:`Q4. What will be the output of this code? console.log("5" + 2);`,
        O1:" 7",
        O2:" 52",
        O3:" NaN",
        O4:" Error",
        
    },
    {Question:"Q5. Which symbol is used for strict equality in JavaScript?",
        O1:" ==",
        O2:" !=",
        O3:" ===",
        O4:" !==",
        
    }
];
let answers=Array(Data.length).fill(null);
display(currentQuestion);
function display(num)
{
    if (num==4)
    {
        Next.style.display="none";
    }
    if (num==0)
    {
        Previous.style.display="none";
    }
    if (num>0 && num<4)
    {
        Next.style.display="flex";
        Previous.style.display="flex";
    }
    question.textContent=Data[num].Question;
    option_1.textContent=Data[num].O1;
    option_2.textContent=Data[num].O2;
    option_3.textContent=Data[num].O3;
    option_4.textContent=Data[num].O4;
    const options = [option_1, option_2, option_3, option_4];

    // clear active state
    options.forEach(btn => btn.classList.remove("active"));

    // restore previous selection
    if (answers[num] !== null) {
        options[answers[num] - 1].classList.add("active");
    }

    options.forEach((btn, index) => {
        btn.onclick = function () {
            selected[num]=true;
            answers[num] = index + 1; // save selected option

            // remove previous highlight and add new
            options.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // recalculate score
            corrected = answers.filter(
                (ans, i) => ans === correctAnswers[i]
            ).length;
        };
    });
    const container = document.querySelector(".moves");

    // create submit button once
    if (!document.getElementById("submit-btn"))
    {
        const newButton = document.createElement("button");
        newButton.textContent = "Submit";
        newButton.id = "submit-btn";

        // insert before "Next"
        const nextBtn = document.getElementById("next");
        container.insertBefore(newButton, nextBtn);
    }

    const sub = document.getElementById("submit-btn");
    sub.onclick = () => {
        const data = document.getElementsByClassName("data")[0]; // pick the first element
        const para = document.createElement("p");
        para.textContent = `Correct answers are ${corrected} out of 5`;
        data.innerHTML = "";
        data.appendChild(para);
        const moves=document.getElementsByClassName("moves")[0];
        moves.innerHTML=`<button onclick="location.reload()">Reload</button>`;
    };

}

Previous.onclick=function()
{
    if(currentQuestion>0 )
    {
        currentQuestion-=1;
        display(currentQuestion);
    }
}
Next.onclick=function()
{
    if(currentQuestion<4 )
    {
        currentQuestion+=1;
        display(currentQuestion);
    }
}

const joke=document.getElementById("button-2");
joke.addEventListener("click", async ()=>{
    const quiz=document.getElementsByClassName("quiz")[0];
    quiz.innerHTML="";
    const jokedata=document.createElement("div");
    jokedata.id="jokedata";
    jokedata.innerHTML=`
        <p class="api-setup"></p>
        <p class="api-punchline"></p>
        <button class="api-button">Reload Joke</button>
    `;

    quiz.append(jokedata);

    const set=document.getElementsByClassName("api-setup")[0];
    const punch=document.getElementsByClassName("api-punchline")[0];
    const btn=document.getElementsByClassName("api-button")[0];

    // function to fetch and display joke
    async function loadJoke() {
        try {
            let response = await fetch("https://official-joke-api.appspot.com/random_joke");
            let data = await response.json();
            set.textContent=data.setup;
            punch.textContent=data.punchline;
        } catch(err) {
            set.textContent="Oops! Couldn't fetch a joke.";
            punch.textContent="";
            console.error(err);
        }
    }

    // load first joke immediately
    loadJoke();

    // reload on button click
    btn.addEventListener("click", loadJoke);
});

const quizbut=document.getElementById("button-1");
quizbut.addEventListener("click",()=>
{
    location.reload();
})