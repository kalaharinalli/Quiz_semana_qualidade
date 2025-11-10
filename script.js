// --- 1. Dados do Quiz: 10 Perguntas sobre Gestão da Qualidade ---
const questions = [
  {
    question: "Qual é um dos pilares fundamentais da qualidade em projetos?",
    answers: [
      { text: "Redução de custos a qualquer preço", isCorrect: false },
      { text: "Entregar rápido, mesmo sem testes", isCorrect: false },
      {
        text: "Satisfação do cliente e conformidade com requisitos",
        isCorrect: true,
      },
      { text: "Evitar comunicação com o cliente", isCorrect: false },
      { text: "Ignorar normas e regulamentos", isCorrect: false },
    ],
  },
  {
    question: "O que significa “melhoria contínua” em projetos?",
    answers: [
      { text: "Repetir os mesmos erros para aprender", isCorrect: false },
      { text: "Fazer mudanças sem planejamento", isCorrect: false },
      {
        text: "Buscar constantemente formas de aprimorar processos e resultados",
        isCorrect: true,
      },
      { text: "Ignorar feedbacks dos clientes", isCorrect: false },
      { text: "Trocar a equipe a cada projeto", isCorrect: false },
    ],
  },
  {
    question: "Qual é o objetivo principal da gestão da qualidade?",
    answers: [
      { text: "Garantir apenas redução de custos", isCorrect: false },
      {
        text: "Atender às expectativas e requisitos do cliente",
        isCorrect: true,
      },
      { text: "Evitar auditorias internas", isCorrect: false },
      { text: "Focar apenas em prazos", isCorrect: false },
      { text: "Ignorar padrões internacionais", isCorrect: false },
    ],
  },
  {
    question: "O que é um indicador de qualidade?",
    answers: [
      {
        text: "Um documento que descreve a missão da empresa",
        isCorrect: false,
      },
      {
        text: "Uma métrica usada para monitorar e avaliar processos",
        isCorrect: true,
      },
      { text: "Um relatório financeiro", isCorrect: false },
      { text: "Um gráfico de vendas", isCorrect: false },
      { text: "Um plano de marketing", isCorrect: false },
    ],
  },
  {
    question: "O que significa conformidade em gestão da qualidade?",
    answers: [
      {
        text: "Cumprir normas, regulamentos e requisitos estabelecidos",
        isCorrect: true,
      },
      { text: "Ignorar padrões para agilizar entregas", isCorrect: false },
      { text: "Criar processos sem documentação", isCorrect: false },
      { text: "Alterar requisitos sem aprovação", isCorrect: false },
      { text: "Evitar auditorias externas", isCorrect: false },
    ],
  },
  {
    question: "Qual ferramenta é comumente usada para análise de causa raiz?",
    answers: [
      { text: "Diagrama de Ishikawa (Espinha de peixe)", isCorrect: true },
      { text: "Fluxograma simples", isCorrect: false },
      { text: "Brainstorming sem registro", isCorrect: false },
      { text: "Planilha de custos", isCorrect: false },
      { text: "Organograma da empresa", isCorrect: false },
    ],
  },

  {
    question: "Qual é a função da auditoria interna?",
    answers: [
      { text: "Penalizar colaboradores", isCorrect: false },
      {
        text: "Avaliar se processos estão em conformidade com padrões",
        isCorrect: true,
      },
      { text: "Reduzir custos operacionais", isCorrect: false },
      { text: "Criar novos produtos", isCorrect: false },
      { text: "Substituir inspeções de qualidade", isCorrect: false },
    ],
  },
  {
    question: "O que é PDCA?",
    answers: [
      { text: "Um método para calcular custos", isCorrect: false },
      { text: "Um ciclo para melhoria contínua de processos", isCorrect: true },
      { text: "Um relatório de desempenho", isCorrect: false },
      { text: "Uma norma ISO específica", isCorrect: false },
      { text: "Um tipo de auditoria", isCorrect: false },
    ],
  },
  {
    question:
      "Qual norma é referência mundial para sistemas de gestão da qualidade?",
    answers: [
      { text: "ISO 9001", isCorrect: true },
      { text: "ISO 14001", isCorrect: false },
      { text: "ISO 45001", isCorrect: false },
      { text: "ISO 27001", isCorrect: false },
      { text: "ISO 50001", isCorrect: false },
    ],
  },
  {
    question: "Em gestão da qualidade, o que significa não conformidade?",
    answers: [
      { text: "Um processo que atende todos os requisitos", isCorrect: false },
      {
        text: "Uma falha ou desvio em relação aos padrões estabelecidos",
        isCorrect: true,
      },
      { text: "Um indicador de melhoria contínua", isCorrect: false },
      { text: "Uma prática recomendada", isCorrect: false },
      { text: "Um resultado esperado", isCorrect: false },
    ],
  },
];

// --- 2. Variáveis de Estado e Timer ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let startTime;
let timerInterval;
let timeTaken = 0;

// 🚨 O MAIS IMPORTANTE: SUBSTITUA PELA SUA URL DE IMPLANTAÇÃO!
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxd0LdrRtepAvtrpb4eSnl65kxnGXzftPOu-6lGiPPhluAPw5wpVNIzckVbuBySU9Av5Q/exec";

// --- 3. Elementos do DOM ---
const quizArea = document.getElementById("quiz-area");
const resultsArea = document.getElementById("results-area");
const rankingArea = document.getElementById("ranking-area");

const startScreen = document.getElementById("start-screen");
const quizContent = document.getElementById("quiz-content");
const startButton = document.getElementById("start-button");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-button");
const feedbackText = document.getElementById("feedback");

const timerDisplay = document.getElementById("timer-display");
const timeTakenDisplay = document.getElementById("time-taken-display");

const finalScoreElement = document.getElementById("final-score");
const playerNameInput = document.getElementById("player-name");
const saveScoreButton = document.getElementById("save-score-button");
const highScoresList = document.getElementById("high-scores-list");

// --- 4. Funções de Manipulação do Tempo (Mantenha o código) ---

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  const minStr = String(minutes).padStart(2, "0");
  const secStr = String(seconds).padStart(2, "0");
  const msStr = String(milliseconds).padStart(3, "0").slice(0, 2);

  return `${minStr}:${secStr}.${msStr}`;
}

function startTimer() {
  stopTimer();
  timerDisplay.textContent = "00:00.00";

  startTime = Date.now();
  timerInterval = setInterval(updateTimerDisplay, 10);
}

function updateTimerDisplay() {
  const elapsed = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsed);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// --- 5. Funções Principais do Quiz (Mantenha o código) ---

function startGame() {
  startScreen.classList.add("hidden");
  quizContent.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;
  timeTaken = 0;

  startTimer();

  showQuestion();
}

function showQuestion() {
  resultsArea.classList.add("hidden");

  answered = false;
  nextButton.disabled = true;
  feedbackText.textContent = "";
  feedbackText.className = "feedback-text";

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${
    questions.length
  }: ${currentQuestion.question}`;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn-answer");

    button.dataset.isCorrect = answer.isCorrect;

    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answered) return;
  answered = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.isCorrect === "true";

  selectedButton.classList.add(isCorrect ? "correct" : "wrong");

  Array.from(answersContainer.children).forEach((button) => {
    button.classList.add("disabled");
    button.removeEventListener("click", selectAnswer);

    if (button.dataset.isCorrect === "true" && !isCorrect) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    score++;
    feedbackText.textContent = "✅ Resposta Correta!";
    feedbackText.classList.add("correct");
  } else {
    feedbackText.textContent = "❌ Resposta Incorreta.";
    feedbackText.classList.add("wrong");
  }

  nextButton.disabled = false;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopTimer();
  timeTaken = Date.now() - startTime;

  quizContent.classList.add("hidden");
  resultsArea.classList.remove("hidden");

  finalScoreElement.textContent = `${score} / ${questions.length}`;
  timeTakenDisplay.textContent = formatTime(timeTaken);

  playerNameInput.value = "";
  saveScoreButton.disabled = false;
}

// --- 6. Lógica do Ranking (AGORA COM GOOGLE SHEETS) ---

/**
 * Carrega a lista de pontuações do Google Sheet.
 */
async function getHighScores() {
  try {
    // Faz a requisição GET para a URL do Apps Script
    const response = await fetch(WEB_APP_URL + "?action=get", {
      method: "GET",
      // Adicionamos o 'no-cache' para garantir dados frescos
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      throw new Error(`Erro de rede ou servidor: ${response.status}`);
    }

    const scores = await response.json();

    // Ordena por Pontuação (Decrescente) e depois por Tempo (Crescente)
    scores.sort((a, b) => {
      const scoreA = Number(a.score);
      const scoreB = Number(b.score);
      const timeA = Number(a.time);
      const timeB = Number(b.time);

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return timeA - timeB;
    });

    return scores;
  } catch (error) {
    console.error("Erro ao carregar o ranking:", error);
    // Não mostra alerta no carregamento inicial
    return [];
  }
}

/**
 * Salva a pontuação enviando-a para o Apps Script (POST).
 */
async function saveHighScore() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Por favor, insira seu nome para salvar a pontuação.");
    return;
  }

  saveScoreButton.disabled = true;

  const scoreData = {
    score: score,
    time: timeTaken,
    name: playerName,
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      // --- CORREÇÃO AQUI: ENVIAR O JSON PURO ---
      // O Apps Script consegue ler o JSON cru, desde que não haja headers conflitantes.
      body: JSON.stringify(scoreData),
      // 🚨 IMPORTANTE: Removendo o cabeçalho "Content-Type" ou definindo como "application/json" costuma ser mais estável com Apps Script do que "application/x-www-form-urlencoded".
    });

    if (!response.ok) {
      // Tenta dar mais detalhes se o fetch falhar
      throw new Error(
        `Erro ao salvar no Apps Script: Status ${response.status}`
      );
    }

    // Antes de tentar o .json(), verifique se a resposta não está vazia.
    const responseText = await response.text();
    if (responseText) {
      await JSON.parse(responseText); // Confirma o consumo da resposta JSON
    }

    // Se chegou até aqui, o salvamento provavelmente funcionou
    displayHighScores();
    alert(
      `Pontuação de ${score} salva com sucesso, ${playerName}! Tempo: ${formatTime(
        timeTaken
      )}`
    );
  } catch (error) {
    console.error("ERRO AO SALVAR A PONTUAÇÃO:", error);
    alert(
      `Erro ao salvar a pontuação. Detalhe: ${error.message}. Tente verificar as permissões do Apps Script.`
    );
    saveScoreButton.disabled = false;
  }
}
/**
 * Renderiza o ranking na lista HTML de forma assíncrona.
 */
async function displayHighScores() {
  highScoresList.innerHTML = "<li>Carregando Ranking Compartilhado...</li>";

  // Aguarda a busca dos dados do servidor
  const highScores = await getHighScores();

  highScoresList.innerHTML = "";

  if (highScores.length === 0) {
    highScoresList.innerHTML =
      "<li>Nenhuma pontuação registrada ainda. Seja o primeiro!</li>";
    return;
  }

  highScores.forEach((scoreEntry, index) => {
    // Garante que o tempo seja formatado corretamente (lendo do Sheet)
    const timeFormatted = formatTime(Number(scoreEntry.time) || 0);

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <strong>${index + 1}º. ${scoreEntry.name}</strong> 
            <span>${scoreEntry.score} Pontos | Tempo: ${timeFormatted}</span>
        `;
    highScoresList.appendChild(listItem);
  });
}

// --- 7. Inicialização e Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {
  // Carrega o ranking ao iniciar a página
  displayHighScores();

  // Liga o botão de Iniciar
  startButton.addEventListener("click", startGame);

  // Eventos dos botões do quiz
  nextButton.addEventListener("click", handleNextButton);
  saveScoreButton.addEventListener("click", saveHighScore);
});
