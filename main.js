const buttonCheck = document.querySelector("#buttonCheck");
const inputValue = document.querySelector("#valueNumberSecret");
const generateNewNumber = document.querySelector("#generatenewnumber");
const continue_at_this_level = document.querySelector("#continue_at_this_level");

const modalContainer = document.querySelector(".modalContainer");
const modal_Result = document.querySelector(".modal_Result");
const mensagem = document.querySelector(".mensagem");
const mensage_strong = document.querySelector(".mensage_strong");
const reactionToResponse = document.querySelector(".reactionToResponse");
const sugestionNumber = document.querySelector(".sugestionNumber");
const numberAttempts = document.querySelector(".numberAttempts");
const elementPunctuation = document.querySelector(".punctuation");

const first_level = document.querySelector(".first_level");
const second_level = document.querySelector(".second_level");
const third_level = document.querySelector(".third_level");

let attempts;
let numSecret;
let qtdNumbers;
let level;

window.addEventListener("load", getLocalStorage());

const phrasesAcert = [
  //https://www.bibliaon.com/transformacao/
  ' "O Senhor, pois, é aquele que vai adiante de ti; ele será contigo, não te deixará, nem te desamparará; não temas, nem te espantes." Deuteronômio 31:8 ',
  ' "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; Eu o segurarei com a minha mão direita vitoriosa." Isaías 41:10 ',
  ' "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente, para que sejam capazes de experimentar e comprovar a boa, agradável e perfeita vontade de Deus." Romanos 12:2',
  ' "Não por causa de atos de justiça por nós praticados, mas devido à sua misericórdia, ele nos salvou pelo lavar regenerador e renovador do Espírito Santo,"Tito 3:5',
  ' "Nenhuma palavra torpe saia da boca de vocês, mas apenas a que for útil para edificar os outros, conforme a necessidade, para que conceda graça aos que a ouvem."Efésios 4:29'
];
const phrasesPersist = [
  //https://www.bibliaon.com/versiculos_encorajamento/
  ' "Resistam-lhe, permanecendo firmes na fé, sabendo que os irmãos que vocês têm em todo o mundo estão passando pelos mesmos sofrimentos." 1 Pedro 5:9 '
];

const phraseAcert = `${
  phrasesAcert[Math.floor(Math.random() * phrasesAcert.length)]
}`;
const phrasePersist = `${
  phrasesPersist[Math.floor(Math.random() * phrasesPersist.length)]
}`;

function chooselevel() {
  first_level.addEventListener("click", () => {
    qtdNumbers = parseInt(first_level.dataset.level);
    numberSecret(qtdNumbers);
    modalContainer.classList.add("activeModal");
    level = 1;
    attempts = 3;
    numberAttempts.innerHTML = `Você tem ${attempts} chances 👍🏽`;
    console.log(attempts, "tentativas");
  });

  second_level.addEventListener("click", () => {
    qtdNumbers = parseInt(second_level.dataset.level);
    numberSecret(qtdNumbers);
    modalContainer.classList.add("activeModal");
    level = 2;
    attempts = 5;
    numberAttempts.innerHTML = `Você tem ${attempts} chances 👍🏽`;
    console.log(attempts, "tentativas");
  });

  third_level.addEventListener("click", () => {
    qtdNumbers = parseInt(third_level.dataset.level);
    numberSecret(qtdNumbers);
    modalContainer.classList.add("activeModal");
    level = 3;
    attempts = 10;
    numberAttempts.innerHTML = `Você tem ${attempts} chances 👍🏽`;
    console.log(attempts, "tentativas");
  });
}
chooselevel();
function numberSecret(qtdNumbers) {
  numSecret = Math.floor(Math.random() * qtdNumbers);
  console.log(numSecret);
  return numSecret;
}

function getLocalStorage() {
  let pontuation_update = localStorage.getItem("pontuação");
  elementPunctuation.innerHTML = ` Sua pontuação: <span> ${pontuation_update}</span>`;
}

function clearInput() {
  inputValue.value = "";
}

function verificationNumber() {
  buttonCheck.addEventListener("click", event => {
    console.log(attempts, "tentativas");
    event.preventDefault();
    let points = parseInt(localStorage.getItem("pontuação"));
    console.log(points);
    if (inputValue.value == numSecret) {
      modal_Result.classList.add("activeModal");
      mensagem.innerHTML = `Acertou!! Parabéns 👏👏🥳 `;
      mensage_strong.innerHTML = ` 
            </br> </br> 
            ${phraseAcert}
            </br> </br>
            `;
      elementPunctuation.innerHTML = ` Sua pontuação: <span> ${(points =
        points + 1)}</span>`;
      buttonCheck.style.display = "none";
      localStorage.setItem("pontuação", `${points}`);
    //   if (attempts === 5) attempts = attempts - 1;
    //   else if (attempts === 4) attempts = attempts - 1;
    //   else if (attempts === 3) attempts = attempts - 1;
    //   else if (attempts === 2) attempts = attempts - 1;
    //   else if (attempts === 1) attempts = attempts * 1;
    } //=============
    else if (
      (inputValue.value > numSecret && attempts == 1) ||
      (inputValue.value < numSecret && attempts == 1)
    ) {
      modal_Result.classList.add("activeModal");
      mensagem.innerHTML = `acabou as tentativas 👋🤙. O número secreto era  ${numSecret} `;
      mensage_strong.innerHTML = ` 
            </br> </br> 
            ${phrasePersist}
            </br> </br> `;
      buttonCheck.style.display = "none";

      if (points === 0) {
        elementPunctuation.innerHTML = `Sua pontuação: <span>${points}</span>`;
        localStorage.setItem("pontuação", `${points}`);
      } else if (points > 0) {
        elementPunctuation.innerHTML = ` Sua pontuação: <span>${(points -= 1)}</span>`;
        localStorage.setItem("pontuação", `${points}`);
      }
    } //=============
    else if (inputValue.value > numSecret) {
      sugestionNumber.innerHTML = `Número secreto é menor que <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. `;
      sugestionNumber.classList.remove("hiddenMessage");
      attempts = attempts - 1;
    } //=============
    else if (inputValue.value < numSecret) {
      sugestionNumber.innerHTML = `Número secreto é maior que  <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>.  `;
      sugestionNumber.classList.remove("hiddenMessage");
      attempts = attempts - 1;
    }
    if (attempts < 10) {
      numberAttempts.innerHTML = `Agora você tem  apenas ${attempts} chances  😬 `;
      console.log(attempts, "tentativas");
    }

    clearInput();
  });
}
verificationNumber();

generateNewNumber.addEventListener("click", () => {
  modalContainer.classList.remove("activeModal");
  modal_Result.classList.remove("activeModal");
  sugestionNumber.classList.add("hiddenMessage");
  attempts = attempts * 3;
  numberAttempts.innerHTML = `Você tem ${attempts} tentativas 👍🏽`;
  buttonCheck.style.display = "block";
  numberSecret();
  clearInput();
});

continue_at_this_level.addEventListener("click", () => {
  modal_Result.classList.remove("activeModal");
  buttonCheck.style.display = "block";
  sugestionNumber.classList.add("hiddenMessage");

    if(level === 1) attempts = (attempts * 0) + 3;
   else if(level === 2) attempts = (attempts * 0) + 5;
   else if(level === 3) attempts = (attempts * 0) + 10;

  numberAttempts.innerHTML = `Você tem ${attempts} chances 👍🏽`;
    
  
 

  numberSecret();
  verificationLevel(level);
  
});

function verificationLevel(level) {
  if (level === 1) {
    const qtdNumbers = parseInt(first_level.dataset.level);
    numSecret = Math.floor(Math.random() * qtdNumbers);
    console.log(numSecret, "número");
    return numSecret;
  } else if (level === 2) {
    const qtdNumbers = parseInt(first_level.dataset.level);
    numSecret = Math.floor(Math.random() * qtdNumbers);
    console.log(numSecret);
    return numSecret;
  } else if (level === 3) {
    const qtdNumbers = parseInt(first_level.dataset.level);
    numSecret = Math.floor(Math.random() * qtdNumbers);
    console.log(numSecret);
    return numSecret;
  }
}
