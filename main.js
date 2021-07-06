const buttonCheck = document.querySelector('#buttonCheck');
const inputValue = document.querySelector('#valueNumberSecret')
const generateNewNumber = document.querySelector('#generatenewnumber');
const modalContainer = document.querySelector('.modalContainer');
const mensagem = document.querySelector('.mensagem');
const mensage_strong = document.querySelector('.mensage_strong');
// const windowClose = document.querySelector('.fa-window-close');
const reactionToResponse = document.querySelector('.reactionToResponse');
const sugestionNumber = document.querySelector('.sugestionNumber');
const numberAttempts = document.querySelector('.numberAttempts');
const elementPunctuation = document.querySelector('.punctuation');

let punctuation = 0;
let attempts = 3;
let numberSecret;

const phrases = [
    ' "O Senhor, pois, é aquele que vai adiante de ti; ele será contigo, não te deixará, nem te desamparará; não temas, nem te espantes." Deuteronômio 31:8 ',
    ' "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; Eu o segurarei com a minha mão direita vitoriosa." Isaías 41:10 ',
    ' "Resistam-lhe, permanecendo firmes na fé, sabendo que os irmãos que vocês têm em todo o mundo estão passando pelos mesmos sofrimentos." 1 Pedro 5:9 ',
  ]

const phrase = `${phrases[Math.floor(Math.random() * phrases.length)]}`

function NewNumberSecret() {
    numberSecret = Math.floor(Math.random() * 11);
    return numberSecret;
}
NewNumberSecret();



function verificationNumber() {
    buttonCheck.addEventListener('click', (event) => {
        event.preventDefault();

        if (inputValue.value == numberSecret) {
            modalContainer.classList.add("activeModal");
            mensagem.innerHTML = `Acertou!! Parabéns 👏👏🥳 `;
            mensage_strong.innerHTML = ` 
            </br> </br> 
            ${phrase}
            </br> </br>
            `;
            elementPunctuation.innerHTML = ` Sua pontuação: <span> ${ punctuation += 1}</span>`;
            buttonCheck.style.display = "none";
            
            if (attempts === 2) attempts = attempts - 1;
            else if (attempts === 1) attempts = attempts * 1;
            else if (attempts === 3) attempts = attempts - 2;
        } //=============
        else if (inputValue.value > numberSecret && attempts == 1 || inputValue.value < numberSecret && attempts == 1) {
            modalContainer.classList.add("activeModal")
            mensagem.innerHTML = `acabou as tentativas 👋🤙. O número secreto era  ${numberSecret} `;
            mensage_strong.innerHTML = ` 
            </br> </br> 
            ${phrase}
            </br> </br> `
            buttonCheck.style.display = "none";
            
            if (punctuation === 0) {
                elementPunctuation.innerHTML = `Sua pontuação: <span>${ punctuation}</span>`
            } else if (punctuation > 0) {
                elementPunctuation.innerHTML = ` Sua pontuação: <span>${ punctuation -= 1}</span>`
            }
        } //=============
        else if (inputValue.value > numberSecret) {
            sugestionNumber.innerHTML = `Número secreto é menor que <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. `;
            sugestionNumber.classList.remove('hiddenMessage');
            // sugestionNumber.innerHTML = tipsMessages.push(`Número secreto é menor que <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. `)
            attempts = attempts - 1;

        } //=============
        else if (inputValue.value < numberSecret) {
            sugestionNumber.innerHTML = `Número secreto é maior que  <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>.  `;
            sugestionNumber.classList.remove('hiddenMessage');
            attempts = attempts - 1;
        }
        if (attempts == 2) {
            numberAttempts.innerHTML = `Agora você tem  apenas ${attempts} chances  😬 `;
            console.log(attempts)
        }
        if (attempts == 1) {
            numberAttempts.innerHTML = `Agora você tem  apenas ${attempts} chance 😬 `;
            console.log(attempts)
        }
    })

    numberAttempts.innerHTML = `Você tem ${attempts} chances 👍🏽`;
}
verificationNumber()

// windowClose.addEventListener('click', () => {
//     modalContainer.classList.remove("activeModal")
// })

// New Number Secret
generateNewNumber.addEventListener('click', () => {
    modalContainer.classList.remove("activeModal")
    sugestionNumber.classList.add('hiddenMessage');
    attempts = attempts * 3
    numberAttempts.innerHTML = `Você tem ${attempts} tentativas 👍🏽`
    buttonCheck.style.display = "block";
    NewNumberSecret();
})