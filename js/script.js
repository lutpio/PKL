// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   iconColor: "white",
//   customClass: {
//     popup: "colored-toast",
//   },
//   showConfirmButton: false,
//   timer: 2500,
//   timerProgressBar: true,
// });

function notif() {
  var audio = new Audio("error-2-126514.mp3");
  audio.play();
}

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
  question_progress.innerHTML = `${step + 1} dari ${cards.length} Pertanyaan `;
}

function nextStep() {
  const cards = document.querySelectorAll(".card");

  if (!validateForm()) return false;
  if (currentStep < cards.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
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

function validateForm() {
  var valid = false;
  x = document.getElementsByClassName("card");
  y = x[currentStep].getElementsByTagName("input");
  y2 = x[currentStep].getElementsByTagName("textarea");

  invlaidInput = [];

  //   untuk tag input
  for (i = 0; i < y.length; i++) {
    // validasi type radio
    if (y[i].getAttribute("type") == "radio") {
      if (y[i].checked) {
        console.log(y[i].checked);
        valid = true;
      }
    } else {
      // validasi type text email number

      if (y[i].value == "") {
        invlaidInput.push(i);
        valid = false;
      } else {
        y[i].classList.remove("is-invalid");
        valid = true;
      }
    }
  }

  //   untuk tag textarea
  for (i = 0; i < y2.length; i++) {
    if (y2[i].value != "") {
      valid = true;
      y2[i].classList.remove("is-invalid");
    } else {
      y2[i].classList.add("is-invalid");
    }
  }

  if (valid == false) {
    for (let x in invlaidInput) {
      y[invlaidInput[x]].classList.add("is-invalid");
    }

    notif();
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
  }
  return valid;
}

showStep(currentStep);
