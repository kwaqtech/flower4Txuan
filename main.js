const CONFIG = {
  to: "",
  message: "",
  startDate: "2026-05-08",
  music: "music.mp3",
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

const addGentleWind = () => {
  document.querySelectorAll(".flower").forEach((flower) => {
    flower.style.setProperty("--wind-duration", `${randomBetween(5.2, 7.2).toFixed(2)}s`);
    flower.style.setProperty("--wind-delay", `${randomBetween(-2, 0).toFixed(2)}s`);
    flower.style.setProperty("--wind-angle", `${randomBetween(0.8, 1.6).toFixed(2)}deg`);
  });
};

const addShootingStars = () => {
  document.querySelectorAll(".shooting-star").forEach((star) => {
    star.style.setProperty("--star-delay", `${randomBetween(2, 14).toFixed(2)}s`);
    star.style.setProperty("--star-duration", `${randomBetween(7, 11).toFixed(2)}s`);
    star.style.setProperty("--star-top", `${randomBetween(8, 42).toFixed(2)}vh`);
  });
};

const updateCounter = () => {
  const elapsed = Math.max(0, Date.now() - new Date(`${CONFIG.startDate}T00:00:00`).getTime());
  const minutes = Math.floor(elapsed / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  document.querySelector("[data-days]").textContent = `${days} ngày`;
  document.querySelector("[data-hours]").textContent = `${hours} giờ`;
  document.querySelector("[data-minutes]").textContent = `${minutes % 60} phút`;
};

const setupPersonalization = () => {
  const to = document.querySelector("[data-to]");
  const message = document.querySelector("[data-message]");
  if (CONFIG.to) to.textContent = `Dành riêng cho ${CONFIG.to}`;
  if (CONFIG.message) message.textContent = CONFIG.message;
  document.querySelector("#love-song").src = CONFIG.music;
};

const setupAudio = () => {
  const audio = document.querySelector("#love-song");
  const button = document.querySelector(".sound-toggle");
  const setPlayingState = (playing) => {
    button.textContent = playing ? "♫" : "♩";
    button.setAttribute("aria-label", playing ? "Tắt nhạc" : "Bật nhạc");
    button.setAttribute("aria-pressed", String(playing));
    document.body.classList.toggle("music-playing", playing);
  };
  const play = () => audio.play().then(() => setPlayingState(true)).catch(() => {});
  document.addEventListener("pointerdown", play, { once: true });
  button.addEventListener("click", () => {
    if (audio.paused) play();
    else {
      audio.pause();
      setPlayingState(false);
    }
  });
};

const setupFlowerGlow = () => {
  document.querySelectorAll(".flower").forEach((flower) => {
    flower.addEventListener("click", () => {
      flower.classList.remove("flower--glow");
      void flower.offsetWidth;
      flower.classList.add("flower--glow");
      setTimeout(() => flower.classList.remove("flower--glow"), 1500);
    });
  });
};

window.addEventListener("load", () => {
  setupPersonalization();
  addGentleWind();
  addShootingStars();
  setupAudio();
  setupFlowerGlow();
  updateCounter();
  setInterval(updateCounter, 60000);

  setTimeout(() => document.body.classList.remove("not-loaded"), 1000);
});