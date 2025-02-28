const api_spørgsmål = "https://opentdb.com/api.php?amount=40";
let spørgsmålData = null; 
let currentIndex = 0;
let showAnswer = false;

async function setup() {
  createCanvas(1920, 911);
  spørgsmålData = await getData();

  // Create "Reveal Answer" button
  let revealBtn = createButton("Reveal Answer");
  revealBtn.position(width/3 - 70, 650);
  revealBtn.mousePressed(() => showAnswer = true);

  // Create "Next Question" button
  let nextBtn = createButton("Next Question");
  nextBtn.position(width/2 + 100, 650);
  nextBtn.mousePressed(nextQuestion);
}

function draw() {
  background('#03A9F4');
  textSize(16);
  textAlign(CENTER);
  fill(0);

  if (!spørgsmålData || !spørgsmålData.results?.length) {
    text("Henter spørgsmål...", width / 2, height / 2);
    return;
  }

  let spørgsmål = spørgsmålData.results[currentIndex].question;
  let kategori = spørgsmålData.results[currentIndex].category;
  let sværhedsgrad = spørgsmålData.results[currentIndex].difficulty;
  let svar = spørgsmålData.results[currentIndex].correct_answer;

  text("Kategori: " + kategori, width / 2, height / 2 - 40);
  text("Spørgsmål: " + spørgsmål, width / 2, height / 2);
  text("Sværhedsgrad: " + sværhedsgrad, width / 2, height / 2 + 20);

  if (showAnswer) {
    fill(255, 0, 0);
    text("Svar: " + svar, width / 2, height / 2 + 60);
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

function nextQuestion() {
  showAnswer = false;
  currentIndex = (currentIndex + 1) % spørgsmålData.results.length; // Loop through questions
}

//askgheashgiuoshguioseh