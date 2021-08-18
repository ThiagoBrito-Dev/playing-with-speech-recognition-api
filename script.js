const parsedSpeechArea = document.querySelector("textarea");
const recordingButton = document.querySelector("button");
let isListening = true;

const recognition = createRecognition();

recordingButton.addEventListener("click", () => {
  if (!recognition) {
    return;
  }

  parsedSpeechArea.innerText = "";
  isListening ? recognition.start() : recognition.stop();
  handleElementsState();
});

function handleElementsState() {
  recordingButton.innerText = isListening
    ? "Parar de gravar"
    : "Aperte para falar";

  recordingButton.classList.toggle("bg-purple-800");
  recordingButton.classList.toggle("text-gray-700");
  recordingButton.classList.toggle("hover:bg-purple-900");
  recordingButton.classList.toggle("border");
  recordingButton.classList.toggle("border-purple-800");
  recordingButton.classList.toggle("hover:bg-gray-100");
}

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    parsedSpeechArea.innerText =
      "Desculpe, mas o recurso de reconhecimento de fala parece estar indisponível em seu navegador 🙁";
    return;
  }

  recognition.lang = "pt_BR";
  recognition.interimResults = true;

  recognition.onstart = () => {
    isListening = false;
  };

  recognition.onend = () => {
    isListening = true;
  };

  recognition.onresult = (event) => {
    parsedSpeechArea.innerText = event.results[0][0].transcript;
  };

  recognition.onsoundend = () => {
    handleElementsState();
  };

  recognition.onerror = () => {
    alert(
      "Desculpe, mas devido a um erro interno, não foi possível gravar sua voz. Por favor, tente novamente."
    );
  };

  return recognition;
}
