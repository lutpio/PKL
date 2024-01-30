let currentStep = 0;

var x = document.getElementsByClassName("card");
//   console.log(x.length);

function showStep(step) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.display = index === step ? "block" : "none";
  });

  if (currentStep == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (currentStep == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Kirim";
  } else {
    document.getElementById("nextBtn").innerHTML = "Selanjutnya";
  }

  const progress = document.querySelector(".progress-bar");
  const question_progress = document.querySelector(".question-progress");
  const percent = ((step + 1) / cards.length) * 100;
  progress.style.width = `${percent}%`;
  question_progress.innerHTML = `${step + 1} dari 5 Pertanyaan `;
}

function nextStep() {
  const cards = document.querySelectorAll(".card");

  if (currentStep < cards.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    //...the form gets submitted:
    document.getElementById("form-question").submit();
    return false;
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

showStep(currentStep);
