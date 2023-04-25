//Contador

const maxLength = 144;
const text = document.getElementById('text');
const count = document.getElementById('count');
const OPENAI_API_KEY = "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"; //Chave da api

function updateCount(){
    const currentLength = text.value.length;
    count.textContent = maxLength - currentLength;
}

//Salvando a pergunta
let savedText = '';

function saveText(){
    const text = document.getElementById('text');
    savedText = text.value;
    console.log('Texto salvo:', savedText);
    main();
}

//Para enviar com enter
const inputEle=document.getElementById('text');
inputEle.addEventListener('keyup', function(e){
    var key = e.which || e.keyCode;
    if(key == 13){
        saveText();
    }
});

//Audio
const recognition = new webkitSpeechRecognition();
recognition.lang='en-US';
recognition.continuous = true;
recognition.interimResults = true;

//Transcrevendo

recognition.onresult = event =>{
    const transcript = event.results[event.results.length-1][0].transcript;
    const transcriptonElement = document.getElementById('text');

    transcriptonElement.textContent = transcript;
};

//Iniciar gravação
function startRecognition(){
    recognition.start();
}

//Parando gravação
function stopRecognition(){
    recognition.stop();
}

//Requisição para o chatgpt
async function main(){
    console.log('Enviando prompt para a API do OpenAI:', prompt);


    //Faz uma requisição para API do OpenAI
    const response = await fetch('https://api.openai.com/v1/completions',{
        method:'POST',
        headers:{
            Accept: "application/json", "Content-Type":"application/json",
            //Adiciona a chave de API como parâmetro de autorização
            Authorization:`Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            //Modelo
            model:"text-davinci-003",
            //Envia o prompt como parâmetro
            prompt: ("Vamos falar em inglês, corrija os erros de ingles, tanto gramatica como concordancia explicando o que esta errado e depois responda continuando o assunto:" + savedText),
            //Define o número máximo de tokens na resposta
            max_tokens:2048,
            //Define a temperatura da resposta(criatividade)
            temperature:0.5,
        }),
    })
    //Acessa o then quando tem resposta
    .then((resposta)=>resposta.json())
    .then((dados)=>{
        //console.log(dados);
        //console.log(dados.choices[0].text);
        //Enviar o texto da resposta
        document.getElementById('result').innerHTML = dados.choices[0].text;
    })
    //Retorna catch quando gerar algum erro
    .catch((erro)=>{
        console.log(erro);
    })
};
