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
// --- Fim das Perguntas ---

// --- 2. Variáveis de Estado e Timer ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let startTime;
let timerInterval;
let timeTaken = 0;

// --- 3. Elementos do DOM (Atualizado) ---
const quizArea = document.getElementById("quiz-area");
const resultsArea = document.getElementById("results-area");
const rankingArea = document.getElementById("ranking-area");

// NOVOS ELEMENTOS PARA CONTROLE DE INÍCIO
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

// --- 4. Funções de Manipulação do Tempo (Corrigidas) ---

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

/**
 * Inicia o cronômetro.
 */
function startTimer() {
  // Garante que qualquer timer anterior seja parado
  stopTimer();
  timerDisplay.textContent = "00:00.00";

  startTime = Date.now();
  // Atualiza a cada 10 milissegundos para maior precisão
  timerInterval = setInterval(updateTimerDisplay, 10);
}

/**
 * Atualiza o display do cronômetro.
 */
function updateTimerDisplay() {
  const elapsed = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsed);
}

/**
 * Para o cronômetro.
 */
function stopTimer() {
  clearInterval(timerInterval);
}

// --- 5. Funções Principais do Quiz (Atualizadas) ---

/**
 * Funçao chamada pelo botão Iniciar para começar o quiz.
 */
function startGame() {
  // 1. Esconde a tela inicial e mostra o quiz
  startScreen.classList.add("hidden");
  quizContent.classList.remove("hidden");

  // 2. Reseta o estado do jogo
  currentQuestionIndex = 0;
  score = 0;
  timeTaken = 0;

  // 3. Inicia o cronômetro
  startTimer();

  // 4. Exibe a primeira pergunta
  showQuestion();
}

/**
 * Exibe a pergunta e as opções atuais no HTML.
 */
function showQuestion() {
  resultsArea.classList.add("hidden");

  answered = false;
  nextButton.disabled = true;
  feedbackText.textContent = "";
  feedbackText.className = "feedback-text";

  const currentQuestion = questions[currentQuestionIndex];
  // Ajusta o contador de perguntas para o total correto
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

/**
 * Exibe a tela de resultados finais.
 */
function showResults() {
  // PARA O CRONÔMETRO e salva o tempo final
  stopTimer();
  timeTaken = Date.now() - startTime;

  // Esconde o conteúdo do quiz e mostra os resultados
  quizContent.classList.add("hidden");
  resultsArea.classList.remove("hidden");

  // Atualiza o placar e o tempo
  finalScoreElement.textContent = `${score} / ${questions.length}`;
  timeTakenDisplay.textContent = formatTime(timeTaken);

  // Prepara para o ranking
  playerNameInput.value = "";
  saveScoreButton.disabled = false;
}

// --- 6. Lógica do Ranking (Local Storage) ---

const localStorageKey = "quizHighScoresEQS";

function getHighScores() {
  const scores = localStorage.getItem(localStorageKey);
  return scores ? JSON.parse(scores) : [];
}

function saveHighScore() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Por favor, insira seu nome para salvar a pontuação.");
    return;
  }

  saveScoreButton.disabled = true;

  const newScore = {
    score: score,
    time: timeTaken, // SALVA O TEMPO EM MILISSEGUNDOS
    name: playerName,
    date: new Date().toLocaleDateString("pt-BR"),
  };

  const highScores = getHighScores();
  highScores.push(newScore);

  // ORDENAÇÃO: Pontuação (maior primeiro) E, em caso de empate, Tempo (menor primeiro)
  highScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Pontuação: Decrescente
    }
    return a.time - b.time; // Tempo: Crescente (mais rápido é melhor)
  });

  localStorage.setItem(localStorageKey, JSON.stringify(highScores));

  displayHighScores();
  alert(
    `Pontuação de ${score} salva com sucesso, ${playerName}! Tempo: ${formatTime(
      timeTaken
    )}`
  );
}

function displayHighScores() {
  const highScores = getHighScores();
  highScoresList.innerHTML = "";

  if (highScores.length === 0) {
    highScoresList.innerHTML =
      "<li>Nenhuma pontuação registrada ainda. Seja o primeiro!</li>";
    return;
  }

  highScores.forEach((scoreEntry, index) => {
    // Formata o tempo para exibição
    const timeFormatted = formatTime(scoreEntry.time || 0);

    const listItem = document.createElement("li");
    // EXIBE O TEMPO NO RANKING
    listItem.innerHTML = `
            <strong>${index + 1}º. ${scoreEntry.name}</strong> 
            <span>${scoreEntry.score} Pontos | Tempo: ${timeFormatted}</span>
        `;
    highScoresList.appendChild(listItem);
  });
}

// --- 7. Inicialização e Event Listeners (Atualizados) ---

document.addEventListener("DOMContentLoaded", () => {
  // Apenas carrega o ranking no início
  displayHighScores();

  // Liga o novo botão de Iniciar à função startGame
  startButton.addEventListener("click", startGame);

  // Eventos dos botões do quiz
  nextButton.addEventListener("click", handleNextButton);
  saveScoreButton.addEventListener("click", saveHighScore);
});
