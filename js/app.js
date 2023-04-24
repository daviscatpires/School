//Contador

const maxLength = 144;
const text = document.getElementById('text');
const count = document.getElementById('count');

function updateCount(){
    const currentLength = text.value.length;
    count.textContent = maxLength - currentLength;
}

//Salvando a pergunta
let savedText = '';

function saveText(){
    const text = document.getElementById('text');
    savedText = text.value;
    console.log('Texto salvo:', savedText)
}

//Audio
const recognition = new webkitSpeechRecognition();
recognition.lang='en-US';
recognition.continuous = true;
recognition.interimResults = true;

//Transcrevendo

recognition.onresult = event =>{
    const transcript = event.results[event.results.length-1][0].transcript;
    const transcriptonElement = document.getElementById('transcription');

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

//OPEN AI
const openai_secret_key = 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; //Chave da api

//Função assíncrona para obter a resposta do ChatGPT

async function getResponse(prompt){
    //Faz uma requisição para API do OpenAI
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            //Adiciona a chave de API como parâmetro de autorização
            'Authorization':`Bearer ${openai_secret_key}`
        },
        body: JSON.stringify({
            //Envia o prompt como parâmetro
            prompt: prompt,
            //Define o número máximo de tokens na resposta
            max_tokens:150,
            //Define a temperatura da resposta(criatividade)
            temperature:0.9,
            //Define o número de respostas a serem geradas
            n:1,
            //Define o caractere de parada para a geração de teto
            stop: null
        })
    });
    //Converte a resposta em um objeto JSON
    const data = await response.json();
    //Retorna o texto da primeira resposta gerada
    return data.choices[0].text;
}

//Função principal para testar a função getResponse
async function main(){
    //Define o prompt a ser enviado para o ChatGPT
    const prompt = 'Whats is the capital of france?';
    //Obtém a resposta do ChatGPT
    const response = await getReponse(prompt);
    //Exige a resposta no console
    console.log(response);
}

//Chama a função principal
main();
