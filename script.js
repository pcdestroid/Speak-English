const inputSpeak = document.querySelector('.input-speak')
const speak = document.querySelector('.speak')

const inputTranslation = document.querySelector('.input-translation')
const translate = document.querySelector('.language')

// Função para transformar texto em voz
function falar(pText) {
    try {
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(pText);
        utterThis.lang = 'pt-BR';
        utterThis.pitch = 0.01;
        utterThis.rate = 2.5;
        synth.speak(utterThis);
        utterThis.onpause = function (event) { }
    }
    catch (err) { }
};

inputTranslation.addEventListener('click', (e) => {
    falar(translate.innerHTML)
});

inputSpeak.addEventListener('click', (e) => {
    falar(speak.innerHTML)
});

function ouvindo() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = function (event) {
        var transcription = event.results[0][0].transcript;
        let falou = transcription.charAt(0).toUpperCase() + transcription.slice(1)
        speak.innerHTML = falou;

        console.log(transcription)
        translateSpeak(falou)
    };

    recognition.onend = function () {
        recognition.start();
    };
}
ouvindo()

async function translateSpeak(text) {
    await fetch(`https://script.google.com/macros/s/AKfycbzJkBNfh7FPiWvyv1gGK7KjjlsVzYwccn2xHNPajkg31CLLNUzt-mhsViZfaJdIpgsd/exec?text=${text}`)
        .then(response => response.json()).then(data => {
            translate.innerHTML = data.translate
            falar(data.translate)
        })
}