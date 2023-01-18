function generatePassword(){
    //cria strings com as cadeias de caracteres permitidos
    let chars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "?!@&*()[]";

    //compõe a cadeia de caracteres com as opções selecionadas nos checkbox
    if(upperCaseEl.checked){
        chars += upperCaseChars;
    }
    if(numberEl.checked){
        chars += numberChars;
    }
    if(symbolEl.checked){
        chars += symbolChars;
    }
    
    //cria a variável que vai receber a senha gerada
    let password = "";

    //sorteia um indice na string de caracteres quantas vezes forem o tamanho do range para compor a senha
    for( let i = 0; i < passwordLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    //exibe no input de senha o valor gerado
    inputEl.value = password;

    calculateStrength();
    calculateFont();
}

//função que calcula a força da senha
function calculateStrength(){
    //Pesos da força de senha: T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
    //verifica as configurações e etribui peso diferente
    const percentage = Math.round((passwordLength / 64 * 35) +
        (upperCaseEl.checked ? 10 : 0) +
        (numberEl.checked ? 25 : 0) +
        (symbolEl.checked ? 30 : 0));

    //altera a largura da barra de força da senha
    strengthIndicatorEl.style.width = `${percentage}%`;

    //atribui classes a barra de acordo com a força da senha
    if (percentage > 70){
        strengthIndicatorEl.classList.remove("critical");
        strengthIndicatorEl.classList.remove("warning");
        strengthIndicatorEl.classList.add("safe");
    }else if(percentage > 50){
        strengthIndicatorEl.classList.remove("critical");
        strengthIndicatorEl.classList.add("warning");
        strengthIndicatorEl.classList.remove("safe");
    } else{
        strengthIndicatorEl.classList.add("critical");
        strengthIndicatorEl.classList.remove("warning");
        strengthIndicatorEl.classList.remove("safe");
    }

    //inclui a classe completed se a barra estiver 100% completa
    if (percentage == 100){
        strengthIndicatorEl.classList.add("completed");
    } else {
        strengthIndicatorEl.classList.remove("completed");
    }
}

//função que calcula e ajusta o tamanho da fonte da senha
function calculateFont(){
    //atribui classes a senha de acordo com o seu comprimento
    if (passwordLength > 45){
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
    } else if(passwordLength > 32){
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
    } else if (passwordLength > 22){
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    } else{
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
}

//função que copia a senha para a área de transferência
function copy(){
    //utiliza a API do navegador para copiar o valor do input para a área de transferência
    navigator.clipboard.writeText(inputEl.value)
}

//inicializa a variável de tamanho da senha coms eu valor padrão
let passwordLength = 16;

//pega a referencia do elemento input da senha
const inputEl = document.querySelector("#password");

//pega a referencia do elemento da barra de indicação de segurança
const strengthIndicatorEl = document.querySelector("#strength-indicator-bar");

//adiciona evento de click nos botões de copiar senha e chama função de copiar
document.querySelector("#copyButton1").addEventListener("click", copy);
document.querySelector("#copyButton2").addEventListener("click", copy);


//pega a referencia do elemento range
const rangeEL = document.querySelector("#password-lenght");
//adiciona um evento que chama a função quando o valor do range ou checkbox é modificado
rangeEL.addEventListener("input", () => {
    passwordLength = rangeEL.value
    document.querySelector("#password-lenght-text").innerHTML = passwordLength;
    generatePassword();
});

//pega a referencia dos elementos de check das configurações
const upperCaseEl = document.querySelector("#uppercase-check");
const numberEl = document.querySelector("#number-check");
const symbolEl = document.querySelector("#symbol-check");

//pega a referencia dos checkbox
const checkEls = document.querySelectorAll("input[type=checkbox]");

//adiciona um evento para cada checkbox
for (let c of checkEls){
    c.addEventListener("click", generatePassword);
}

//pega a referencia do elemento botão refresh e adiciona evento para gerar uma nova senha
const refreshEl = document.querySelector("#refresh");
refreshEl.addEventListener("click", generatePassword);

//chama a função para gerar uma nova senha pela primeira vez assim que a página é carregada
generatePassword();