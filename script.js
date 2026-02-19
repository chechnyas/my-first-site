// helpers
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return document.querySelectorAll(sel); }

document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME (shared for all pages) =====
  const themeToggle = $("#themeToggle");

  // apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  // set icon for current state
  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // ===== BURGER MENU (works if burger+nav exist) =====
  const burger = $(".burger");
  const nav = $(".nav");

  function closeMenu() {
    if (!burger || !nav) return;
    nav.classList.remove("nav--open");
    burger.textContent = "☰";
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && nav) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("nav--open");
      burger.textContent = isOpen ? "✕" : "☰";
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    $all(".nav__link").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ===== ACCORDION (works if exists) =====
  const accBtn = $(".accordion__btn");
  const accContent = $(".accordion__content");
  const accIcon = $(".accordion__icon");

  if (accBtn && accContent) {
    accBtn.addEventListener("click", () => {
      const isHidden = accContent.hasAttribute("hidden");
      if (isHidden) {
        accContent.removeAttribute("hidden");
        accBtn.setAttribute("aria-expanded", "true");
        if (accIcon) accIcon.textContent = "–";
      } else {
        accContent.setAttribute("hidden", "");
        accBtn.setAttribute("aria-expanded", "false");
        if (accIcon) accIcon.textContent = "+";
      }
    });
  }

  // ===== COUNTER + HEARTS (index only) =====
  const daysEl = $("#daysTogether");
  const progressBar = $("#progressBar");
  const counter = $("#counter");
  const heartsBox = $("#hearts");

  const startDate = new Date("2025-06-20T00:00:00"); // <- твоя дата

  function spawnHeartInBox() {
    if (!heartsBox) return;
    const hearts = ["❤️", "💖", "💗", "💘", "💞"];
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = (5 + Math.random() * 90) + "%";
    const scale = 0.7 + Math.random() * 1.2;
    const drift = (Math.random() * 60 - 30);
    heart.style.setProperty("--scale", scale.toFixed(2));
    heart.style.setProperty("--drift", drift.toFixed(0) + "px");
    heart.style.fontSize = (14 + Math.random() * 14) + "px";
    heartsBox.appendChild(heart);
    setTimeout(() => heart.remove(), 2200);
  }

  function burstHearts(count = 10) {
    for (let i = 0; i < count; i++) setTimeout(spawnHeartInBox, i * 60);
  }

  if (counter) counter.addEventListener("click", () => burstHearts(12));

  function updateCounter() {
    if (!daysEl) return;

    const now = new Date();
    const diff = now - startDate;
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = `${days} днів ∞ ${hours} год ${minutes} хв ${seconds} сек`;

    if (progressBar) {
      const totalDays = 365 * 10;
      let percent = (days / totalDays) * 100;
      percent = Math.max(percent, 3);
      percent = Math.min(percent, 100);
      progressBar.style.width = percent + "%";
    }

    if (heartsBox && Math.random() < 0.33) spawnHeartInBox();
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  // ===== HEARTS BACKGROUND (about only) =====
  const heartsBg = $(".hearts-bg");
  if (heartsBg) {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = (14 + Math.random() * 16) + "px";
      heart.style.bottom = "-10px";
      heartsBg.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, 2000);
  }
});