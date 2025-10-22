(() => {
  const PASSWORD = "2211";
  const music = document.getElementById("bgMusic");

  const loginScreen = document.getElementById("loginScreen");
  const cakeScreen = document.getElementById("cakeScreen");
  const passwordInput = document.getElementById("passwordInput");
  const enterBtn = document.getElementById("enterBtn");

  const bannerContainer = document.querySelector(".banner-container");
  const scene = document.querySelector(".scene");
  const layer1 = document.querySelector(".layer-1");
  const layer2 = document.querySelector(".layer-2");
  const layer3 = document.querySelector(".layer-3");
  const frosting = document.querySelector(".frosting");
  const candle = document.querySelector(".candle");
  const nextBtn = document.getElementById("nextBtn");

  const envelopeWrap = document.getElementById("envelopeWrap");
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  const letterModal = document.getElementById("letterModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const paper = document.querySelector(".paper");

  enterBtn.addEventListener("click", tryPassword);
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") tryPassword();
  });

  function tryPassword() {
  const val = passwordInput.value.trim();
  if (val === PASSWORD) {
    loginScreen.classList.add("hidden");
    cakeScreen.classList.remove("hidden");
    
    music.play().catch(e => console.log("Audio requiere interacción"));
    
    buildBanner("FELIZ CUMPLE", ".banner-1");
    setTimeout(() => {
      buildBanner("MI AMOR", ".banner-2");
    }, 1500);
    
    setTimeout(playCakeAnimation, 3000);
  } else {
    passwordInput.value = "";
    passwordInput.placeholder = "❌ Incorrecto";
    passwordInput.classList.add("shake");
    setTimeout(() => {
      passwordInput.classList.remove("shake");
      passwordInput.placeholder = "••••";
    }, 800);
  }
}

  function buildBanner(text, selector) {
  const bannerEl = document.querySelector(selector);
  bannerEl.innerHTML = "";
  const colors = ["#ff6b6b","#ffb86b","#ffd56b","#8ef6c2","#7ad8ff","#c184ff"];
  const letters = Array.from(text);
  
  letters.forEach((ltr, i) => {
    const f = document.createElement("div");
    f.className = "flag";
    f.textContent = ltr === " " ? "" : ltr;
    f.style.background = colors[i % colors.length];
    f.style.transform = `translateY(-50px) rotate(${(Math.random()*12)-6}deg) scale(0.5)`;
    f.style.opacity = "0";
    bannerEl.appendChild(f);
    
    setTimeout(() => {
      f.style.transition = "all 500ms cubic-bezier(.2,.9,.2,1)";
      f.style.transform = "translateY(0) rotate(0deg) scale(1)";
      f.style.opacity = "1";
    }, 400 + i * 100);
  });

  if(selector === ".banner-1") {
    createConfetti();
  }
}

  function createConfetti() {
    const confettiColors = ["#ff6b6b","#ffb86b","#ffd56b","#8ef6c2","#7ad8ff","#c184ff"];
    for(let i = 0; i < 50; i++) {
      setTimeout(() => {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "%";
        c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        c.style.animationDelay = Math.random() * 0.5 + "s";
        c.style.animationDuration = (Math.random() * 2 + 2) + "s";
        scene.appendChild(c);
        setTimeout(() => c.remove(), 4000);
      }, i * 30);
    }
  }

  function playCakeAnimation() {
    setTimeout(() => { layer3.style.transform = "scaleY(1)"; }, 300);
    setTimeout(() => { layer2.style.transform = "scaleY(1)"; }, 1100);
    setTimeout(() => { layer1.style.transform = "scaleY(1)"; }, 1900);
    setTimeout(() => { frosting.style.transform = "translateY(-10px) scaleY(1)"; }, 2600);
    setTimeout(() => { candle.style.transform = "translateX(-50%) scale(1)"; }, 3200);
  }

  nextBtn.addEventListener("click", () => {
    cakeScreen.classList.add("hidden");
    envelopeWrap.classList.remove("hidden");
    envelopeWrap.style.opacity = "0";
    setTimeout(() => {
      envelopeWrap.style.transition = "opacity 600ms";
      envelopeWrap.style.opacity = "1";
    }, 50);
  });

  openBtn.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => showModal(), 700);
  });

  closeBtn.addEventListener("click", () => {
    envelope.classList.remove("open");
    hideModal();
    envelopeWrap.classList.add("hidden");
    cakeScreen.classList.remove("hidden");
  });

  function showModal() {
    letterModal.classList.remove("hidden");
    setTimeout(() => {
      letterModal.classList.add("show");
      document.body.style.overflow = "hidden";
    }, 30);
  }

  function hideModal() {
    letterModal.classList.remove("show");
    setTimeout(() => {
      letterModal.classList.add("hidden");
      document.body.style.overflow = "";
    }, 400);
  }

  modalBackdrop.addEventListener("click", () => {
    envelope.classList.remove("open");
    hideModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      envelope.classList.remove("open");
      hideModal();
    }
  });

  setTimeout(() => passwordInput.focus(), 200);
})();