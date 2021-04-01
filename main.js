const buttonCheck = document.querySelector('#buttonCheck');
const inputValue = document.querySelector('#valueNumberSecret')
const generateNewNumber = document.querySelector('#generatenewnumber');
const modalContainer = document.querySelector('.modalContainer');
const mensagem = document.querySelector('.mensagem');
// const windowClose = document.querySelector('.fa-window-close');
const reactionToResponse = document.querySelector('.reactionToResponse');
const sugestionNumber = document.querySelector('.sugestionNumber');
const numberAttempts = document.querySelector('.numberAttempts');

let punctuation = 0;
let attempts = 3;
let numberSecret;

function NewNumberSecret() {
    numberSecret = Math.floor(Math.random() * 11);

    return numberSecret;
}
NewNumberSecret();



function verificationNumber() {
    buttonCheck.addEventListener('click', (event) => {
        event.preventDefault();

        if (inputValue.value == numberSecret) {
            modalContainer.classList.add("activeModal")
            mensagem.innerHTML = `Acertou!! Parabéns 👏👏🥳 `;

            if (attempts === 2) attempts = attempts - 1;
            else if (attempts === 1) attempts = attempts * 1;
            else if (attempts === 3) attempts = attempts - 2;
        } //=============
        else if (inputValue.value > numberSecret && attempts == 1 || inputValue.value < numberSecret && attempts == 1) {
            modalContainer.classList.add("activeModal")
            mensagem.innerHTML = `acabou as tentativas 👋🤙. O número secreto era  ${numberSecret} `
        } //=============
        else if (inputValue.value > numberSecret) {
            sugestionNumber.innerHTML = `Número secreto é menor que <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. Tente mais uma vez `;
            sugestionNumber.classList.remove('hiddenMessage');
            // sugestionNumber.innerHTML = tipsMessages.push(`Número secreto é menor que <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. Tente mais uma vez `)
            attempts = attempts - 1;

        } //=============
        else if (inputValue.value < numberSecret) {
            sugestionNumber.innerHTML = `Número secreto é maior que  <span class="spanNumberBiggerOrSmaller">${inputValue.value}</span>. Tente mais uma vez  `;
            sugestionNumber.classList.remove('hiddenMessage');
            attempts = attempts - 1;
        }
        numberAttempts.innerHTML = `Agora você tem  apenas ${attempts} tentativas`;
    })

    numberAttempts.innerHTML = `Você tem ${attempts} tentativas`;
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
    numberAttempts.innerHTML = `Você tem ${attempts} tentativas`

    NewNumberSecret();
})