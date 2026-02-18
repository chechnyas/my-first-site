const startDate = new Date("2025-06-20T00:00:00"); // постав свою дату
const heartsBox = document.getElementById("hearts");
const counter = document.getElementById("counter");

function burstHearts(count = 10) {
  for (let i = 0; i < count; i++) {
    setTimeout(spawnHeart, i * 60);
  }
}

if (counter) {
  counter.addEventListener("click", () => burstHearts(12));
}
function spawnHeart() {
  if (!heartsBox) return;

  const hearts = ["❤️", "💖", "💗", "💘", "💞"];
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  // позиція по ширині (трохи не до країв)
  heart.style.left = (5 + Math.random() * 90) + "%";

  // випадковий розмір + дрейф вбік
  const scale = 0.7 + Math.random() * 1.2;     // 0.7 .. 1.9
  const drift = (Math.random() * 60 - 30);     // -30px .. +30px
  heart.style.setProperty("--scale", scale.toFixed(2));
  heart.style.setProperty("--drift", drift.toFixed(0) + "px");

  // додатково: різний розмір шрифту для “живості”
  heart.style.fontSize = (14 + Math.random() * 14) + "px"; // 14..28

  heartsBox.appendChild(heart);
  setTimeout(() => heart.remove(), 2200);
}

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

 document.getElementById("daysTogether").textContent =
  `${days} днів ∞ ${hours} год ${minutes} хв ${seconds} сек`;

const totalDays = 365 * 10; // або скільки ти поставив
let percent = (days / totalDays) * 100;

// мінімум 3% щоб було видно
percent = Math.max(percent, 3);

// максимум 100%
percent = Math.min(percent, 100);

document.getElementById("progressBar").style.width = percent + "%";
  // шанс сердечка (1 раз з 3 секунд приблизно)
  if (Math.random() < 0.33) spawnHeart();
}

updateCounter();
setInterval(updateCounter, 1000);
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    burger.textContent = isOpen ? "✕" : "☰";
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}
