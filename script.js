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
      { text: "Ignorar feedbacks dos clientes", isCorrect: false },
      {
        text: "Buscar constantemente formas de aprimorar processos e resultados",
        isCorrect: true,
      },
      { text: "Trocar a equipe a cada projeto", isCorrect: false },
    ],
  },
  {
    question: "Qual é o objetivo principal da gestão da qualidade?",
    answers: [
      { text: "Garantir apenas redução de custos", isCorrect: false },
      { text: "Evitar auditorias internas", isCorrect: false },
      { text: "Focar apenas em prazos", isCorrect: false },
      { text: "Ignorar padrões internacionais", isCorrect: false },
      {
        text: "Atender às expectativas e requisitos do cliente",
        isCorrect: true,
      },
    ],
  },
  {
    question: "O que é um indicador de qualidade?",
    answers: [
      {
        text: "Uma métrica usada para monitorar e avaliar processos",
        isCorrect: true,
      },
      {
        text: "Um documento que descreve a missão da empresa",
        isCorrect: false,
      },

      { text: "Um relatório financeiro", isCorrect: false },
      { text: "Um gráfico de vendas", isCorrect: false },
      { text: "Um plano de marketing", isCorrect: false },
    ],
  },
  {
    question: "O que significa conformidade em gestão da qualidade?",
    answers: [
      { text: "Ignorar padrões para agilizar entregas", isCorrect: false },
      { text: "Criar processos sem documentação", isCorrect: false },
      {
        text: "Cumprir normas, regulamentos e requisitos estabelecidos",
        isCorrect: true,
      },
      { text: "Alterar requisitos sem aprovação", isCorrect: false },
      { text: "Evitar auditorias externas", isCorrect: false },
    ],
  },
  {
    question: "Qual ferramenta é comumente usada para análise de causa raiz?",
    answers: [
      { text: "5 Por ques", isCorrect: true },
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
      { text: "Reduzir custos operacionais", isCorrect: false },
      {
        text: "Avaliar se processos estão em conformidade com padrões",
        isCorrect: true,
      },
      { text: "Criar novos produtos", isCorrect: false },
      { text: "Substituir inspeções de qualidade", isCorrect: false },
    ],
  },
  {
    question: "O que é PDCA?",
    answers: [
      { text: "Um ciclo para melhoria contínua de processos", isCorrect: true },
      { text: "Um método para calcular custos", isCorrect: false },
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

// --- 2. Variáveis de Estado e Configurações do Supabase (CORRIGIDO) ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let startTime;
let timerInterval;
let timeTaken = 0;

// 🟢 CHAVES SUPABASE (Variáveis de Escopo) 🟢
const SUPABASE_URL = "https://ezckogyufjqysnkpnasg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Y2tvZ3l1ZmpxeXNua3BuYXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NTE4ODMsImV4cCI6MjA3ODMyNzg4M30.-C_yJ_2OLejcn_1_m-ZrmhYRt9axyee6rciCzRazd3U";

// 🚨 CORREÇÃO FINAL: Inicializa o Cliente Supabase usando window.supabase (resolve o ReferenceError)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- 3. Elementos do DOM ---
const quizArea = document.getElementById("quiz-area");
const resultsArea = document.getElementById("results-area");
const rankingArea = document.getElementById("ranking-area");

// Variáveis do Botão de Iniciar (CRÍTICO para o funcionamento)
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

// --- 4. Funções de Manipulação do Tempo ---

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

// --- 5. Funções Principais do Quiz ---

// Função chamada ao clicar no botão 'Iniciar Quiz'
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

// --- 6. Lógica do Ranking (SUPABASE) ---

async function getHighScores() {
  try {
    let { data: scores, error } = await supabase
      .from("scores")
      .select("name, score, time_ms")
      .order("score", { ascending: false })
      .order("time_ms", { ascending: true });

    if (error) throw error;

    return scores.map((s) => ({
      name: s.name,
      score: s.score,
      time: s.time_ms,
    }));
  } catch (error) {
    console.error("Erro ao carregar o ranking (Supabase):", error);
    document.getElementById(
      "high-scores-list"
    ).innerHTML = `<li>Erro ao carregar o ranking. Verifique se o RLS está desativado.</li>`;
    return [];
  }
}

async function saveHighScore() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Por favor, insira seu nome para salvar a pontuação.");
    return;
  }

  saveScoreButton.disabled = true;

  const scoreData = {
    score: score,
    time_ms: timeTaken,
    name: playerName,
  };

  try {
    const { error } = await supabase.from("scores").insert([scoreData]);

    if (error) throw error;

    displayHighScores();
    alert(
      `Pontuação de ${score} salva com sucesso, ${playerName}! Tempo: ${formatTime(
        timeTaken
      )}`
    );
  } catch (error) {
    console.error("ERRO AO SALVAR A PONTUAÇÃO (Supabase):", error);
    alert(
      `Erro ao salvar a pontuação. Verifique se o RLS está desativado na tabela 'scores'.`
    );
    saveScoreButton.disabled = false;
  }
}

async function displayHighScores() {
  highScoresList.innerHTML = "<li>Carregando Ranking Compartilhado...</li>";

  const highScores = await getHighScores();

  highScoresList.innerHTML = "";

  if (highScores.length === 0) {
    highScoresList.innerHTML =
      "<li>Nenhuma pontuação registrada ainda. Seja o primeiro!</li>";
    return;
  }

  highScores.forEach((scoreEntry, index) => {
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

  // 🟢 LIGA O BOTÃO: Chama startGame (que inicia o quiz e o timer)
  startButton.addEventListener("click", startGame);

  // Eventos dos botões do quiz
  nextButton.addEventListener("click", handleNextButton);
  saveScoreButton.addEventListener("click", saveHighScore);
});
