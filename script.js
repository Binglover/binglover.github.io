'use strict';

// Global reference to the about:blank tab
let plumetPopup = null;

const el = (id) => document.getElementById(id);

window.addEventListener("DOMContentLoaded", () => {
  /**************************************
   * GOLD TITLE
   **************************************/
  function setGoldState(isGold) {
    const title = el("title");
    const rarity = el("rarity");
    if (!title || !rarity) return;
    if (isGold) {
      title.classList.add("title--gold");
      title.textContent = "GOLDEN Plumet Tournament";
      rarity.style.display = "block";
    }
  }

  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  /**************************************
   * OLLIE G EFFECT
   **************************************/
  function spinNameOnce(target, finalText) {
    if (!target || target.dataset.spun === "true") return;

    const pool = [
      "Olivi~r", "Oliver", "Ol1ver", "0liver", "O-L-I-V-E-R",
      "Revilo", "O.G.", "Oll—", "Oli.."
    ];
    const interval = 70;
    let i = 0;

    target.dataset.spun = "true";
    target.classList.add("slotting");

    const timer = setInterval(() => {
      target.textContent = pool[i++ % pool.length];
    }, interval);

    setTimeout(() => {
      clearInterval(timer);
      target.textContent = finalText;
      target.classList.remove("slotting");
      target.classList.add("slot-complete");

      const calc = el("calculator");
      if (calc) calc.style.display = "block";
      const pwdBtn = el("password-btn");
      if (pwdBtn) pwdBtn.style.display = "block";
    }, 1200);
  }

  function onOllieActivate() {
    const cell = el("player-oliver");
    if (!cell) return;
    spinNameOnce(cell, "Ollie G");
  }

  function hookOllie() {
    const oliver = el("player-oliver");
    if (!oliver) return false;
    oliver.setAttribute("role", "button");
    oliver.tabIndex = 0;
    oliver.style.cursor = "pointer";

    oliver.addEventListener("click", onOllieActivate, { once: true });
    oliver.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOllieActivate();
      }
    }, { once: true });
    return true;
  }

  if (!hookOllie()) {
    const obs = new MutationObserver(() => {
      if (hookOllie()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  /**************************************
   * RUN IN ABOUT:BLANK — Plumet + Cookie Clicker + Leaderboard
   **************************************/
  const blankBtn = el("open-blank");
  if (blankBtn) {
    blankBtn.addEventListener("click", () => {
      plumetPopup = window.open("about:blank", "_blank");
      if (!plumetPopup) {
        alert("Popup blocked — allow popups for this site.");
        return;
      }

      const popupHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Plumet + Cookie Clicker</title>

<base href="https://binglover.github.io/">

<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"/>

<style>
  body {
    background: #111;
    color: white;
    margin: 0;
    font-family: Poppins, sans-serif;
    display: flex;
    height: 100vh;
  }

  /* ✅ LEFT SIDEBAR */
  .sidebar {
    width: 180px;
    background: #181818;
    border-right: 2px solid #333;
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    gap: 14px;
  }

  .menu-btn {
    background: #222;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;
    border: 2px solid #444;
    text-align: center;
    transition: 0.2s;
  }
  .menu-btn:hover {
    background: var(--gold-1);
    color: black;
  }

  /* ✅ MAIN AREA */
  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* ✅ GAME FRAME */
  .tab-view {
    display: none;
    width: 90%;
    max-width: 1500px;
  }

object, iframe {
  width: 100%;
  height: 520px;
  max-height: 520px;
  border: none;
  background: black;
  border-radius: 12px;
  object-fit: contain; /* <-- fixes Plumet scaling */
}

</style>
</head>

<body>
<!-- ✅ SIDEBAR MENU -->
<div class="sidebar">
  <div class="menu-btn" data-tab="plumet">🎮 Plumet</div>
  <div class="menu-btn" data-tab="cookie">🍪 Cookie Clicker</div>
</div>

<!-- ✅ MAIN VIEW -->
<div class="content">
  <div id="tab-plumet" class="tab-view">
      <object data="Plumet2.swf" type="application/x-shockwave-flash" width="100%" height="100%"></object>
  </div>

  <div id="tab-cookie" class="tab-view">
      <iframe src="https://binglover.github.io/cookieclicker/index.html"></iframe>
  </div>
</div>

<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

<script>
  // ✅ DEFAULT SCREEN = Plumet
  document.getElementById("tab-plumet").style.display = "block";

  const tabs = document.querySelectorAll(".menu-btn");
  const views = document.querySelectorAll(".tab-view");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      views.forEach(v => v.style.display = "none");
      const target = document.getElementById("tab-" + btn.dataset.tab);
      target.style.display = "block";
    });
  });
</script>

</body>
</html>
`;

      plumetPopup.document.open();
      plumetPopup.document.write(popupHTML);
      plumetPopup.document.close();
    });
  }

  /**************************************
   * CALCULATOR
   **************************************/
  const display = el("calc-display");
  const buttons = document.querySelectorAll("#calculator button");

  let lastOperator = null;
  let lastNumber = null;

  if (display && buttons.length) {
    display.addEventListener("input", () => {});

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        let value = (btn.innerText || btn.textContent || "").trim();
        if (!value) return;

        if (value === "C") {
          display.value = "";
          lastOperator = null;
          lastNumber = null;
          return;
        }
          if (value === "=") {
          const input = display.value.trim().toLowerCase();

          // ✅ SECRET COMMAND TO OPEN about:blank popup automatically
            if (input === "aboutblank") {
              el("open-blank").click();  // <-- Pretends the user pressed the button
           return;
        }

          try {
            if (lastOperator && lastNumber !== null) {
              display.value = String(eval(display.value + lastOperator + lastNumber));
            } else {
              const match = display.value.match(/([\d\.]+)([+\-*/])([\d\.]+)$/);
              if (match) {
                lastOperator = match[2];
                lastNumber = match[3];
              }
              display.value = String(eval(display.value));
            }
          } catch {
            display.value = "Error";
          }
          return;
        }

        if ("+-*/".includes(value)) {
          lastOperator = null;
          lastNumber = null;
        }

        display.value += value;
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const eq = Array.from(buttons).find(
          (b) => (b.innerText || b.textContent || "").trim() === "="
        );
        if (eq) eq.click();
      }
    });
  }
});
