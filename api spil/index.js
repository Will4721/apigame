const api_spørgsmål = "https://opentdb.com/api.php?amount=40";
let spørgsmålData = null; 
let currentIndex = 0;
let showAnswer = false;
let shuffledChoices = []; // Stores shuffled answers for multiple choice

async function setup() {
  createCanvas(1920, 911);
  spørgsmålData = await getData();

  // Create "Reveal Answer" button
  let revealBtn = createButton("Reveal Answer");
  revealBtn.position(width/3 + 100, 700);
  revealBtn.mousePressed(() => showAnswer = true);

  // Create "Next Question" button
  let nextBtn = createButton("Next Question");
  nextBtn.position(width/2, 700);
  nextBtn.mousePressed(nextQuestion);

  if (spørgsmålData) shuffleAnswers(); // Shuffle the first question
}

function draw() {
  background('#C6FCFF');
  textSize(14);
  textAlign(CENTER);
  fill(0);

  if (!spørgsmålData || !spørgsmålData.results?.length) {
    text("Henter spørgsmål...", width / 2, height / 2);
    return;
  }

  let questionObj = spørgsmålData.results[currentIndex];
  let spørgsmål = questionObj.question;
  let kategori = questionObj.category;
  let sværhedsgrad = questionObj.difficulty;
  let svar = questionObj.correct_answer;
  let type = questionObj.type;

  text("Kategori: " + kategori, width / 2, height / 2 - 60);
  text("Type: " + (type === "boolean" ? "True / False" : "Multiple Choice"), width / 2, height / 2 - 40);
  text("Spørgsmål: " + spørgsmål, width / 2, height / 2);
  text("Sværhedsgrad: " + sværhedsgrad, width / 2, height / 2 + 20);

  if (type === "multiple") {
    for (let i = 0; i < shuffledChoices.length; i++) {
      text((i + 1) + ". " + shuffledChoices[i], width / 2, height / 2 + 40 + (i * 20));
    }
  }

  if (showAnswer) {
    fill(255, 0, 0);
    text("Svar: " + svar, width / 2, height / 2 + 120);
  }
}

async function getData() {
  try {
    const response = await fetch(api_spørgsmål);
    const data = await response.json();
    return data.results ? data : null;
  } catch {
    return null;
  }
}

function shuffleAnswers() {
  let questionObj = spørgsmålData.results[currentIndex];
  if (questionObj.type === "multiple") {
    shuffledChoices = [...questionObj.incorrect_answers, questionObj.correct_answer];
    shuffledChoices.sort(() => Math.random() - 0.5); // Shuffle once
  } else {
    shuffledChoices = [];
  }
}

function nextQuestion() {
  showAnswer = false;
  currentIndex = (currentIndex + 1) % spørgsmålData.results.length; // Loop through questions
  shuffleAnswers(); // Shuffle new answers only when switching questions
}
