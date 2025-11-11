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
<title>Classroom</title>

<base href="https://binglover.github.io/">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"/>

<style>
  :root {
    --bg: #111;
    --fg: #ffffff;
    --panel: #222;
    --border: #333;
    --accent: #ffcc00;
  }

  body.light {
    --bg: #ffffff;
    --fg: #111;
    --panel: #eaeaea;
    --border: #ccc;
    --accent: #ffb300;
  }

  html, body {
    height: 100%;
    margin: 0;
    font-family: Poppins, sans-serif;
    background: var(--bg);
    color: var(--fg);
    display: flex;
  }

  .sidebar {
    width: 180px;
    background: var(--panel);
    border-right: 2px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    gap: 14px;
  }

  .menu-btn {
    background: var(--panel);
    color: var(--fg);
    border-radius: 8px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;
    border: 2px solid var(--border);
    text-align: center;
    transition: .2s;
  }
  .menu-btn:hover {
    background: var(--accent);
    color: black;
  }

  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-view {
    display: none;
    width: 90%;
    max-width: 1500px;
    justify-content: center;
    align-items: center;
  }

  .tab-view.active {
    display: flex;
  }
#plumet-container {
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
iframe {
  width: 100%;
  height: 600px;
  object-fit: contain;
  border-radius:12px;
  border:none;
  background:black;
}
  #settings-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--accent);
    color: black;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
    z-index: 999;
  }

  #settings-panel {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
  }

  .panel-inner {
    background: var(--panel);
    color: var(--fg);
    padding: 25px;
    border-radius: 16px;
    border: 2px solid var(--border);
    width: 280px;
    text-align: center;
  }
</style>
</head>

<body>
  <div class="sidebar">
    <div class="menu-btn" data-tab="plumet">🎮 Plumet</div>
    <div class="menu-btn" data-tab="cookie">🍪 Cookie Clicker</div>
  </div>

  <div class="content">
    <div id="tab-plumet" class="tab-view active">
      <!-- Plumet goes here once Ruffle loads -->
      <div id="plumet-container"></div>
    </div>

    <div id="tab-cookie" class="tab-view">
      <iframe src="https://binglover.github.io/cookieclicker/index.html"></iframe>
    </div>
  </div>

  <button id="settings-btn">⚙️</button>

  <div id="settings-panel">
    <div class="panel-inner">
      <h3>Settings</h3>
      <label><input type="checkbox" id="theme-toggle"> Light Mode</label>
      <br><br>
      <button id="close-settings">Close</button>
    </div>
  </div>

  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
  <script>
    /* ✅ FORCE RUFFLE LOAD */
    window.addEventListener("load", () => {
      const ruffle = window.RufflePlayer?.newest();
      const player = ruffle.createPlayer();
      player.style.width = "100%";
      player.style.height = "600px";
      document.getElementById("plumet-container").appendChild(player);
      player.load("Plumet2.swf");
    });

    /* Switch tabs */
    document.querySelectorAll(".menu-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
        document.querySelector("#tab-" + btn.dataset.tab).classList.add("active");
      });
    });

    /* Settings logic */
    const settingsBtn = document.getElementById("settings-btn");
    const settingsPanel = document.getElementById("settings-panel");
    const themeToggle = document.getElementById("theme-toggle");

    settingsBtn.onclick = () => settingsPanel.style.display = "flex";
    document.getElementById("close-settings").onclick = () =>
      settingsPanel.style.display = "none";

    themeToggle.onchange = () => {
      document.body.classList.toggle("light", themeToggle.checked);
      localStorage.setItem("classroom-theme", themeToggle.checked ? "light" : "dark");
    };

    if (localStorage.getItem("classroom-theme") === "light") {
      document.body.classList.add("light");
      themeToggle.checked = true;
    }
  </script>
 
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

<script>
window.addEventListener("DOMContentLoaded", () => {

  /* ✅ Ensure Plumet loads via Ruffle */
  const ruffle = window.RufflePlayer?.newest();
  const player = ruffle.createPlayer();

  player.style.width = "800px";
  player.style.height = "600px";
  player.style.maxWidth = "100%";
  player.style.objectFit = "contain";
  player.style.display = "block";
  player.style.margin = "0 auto";

  document.getElementById("plumet-container").appendChild(player);
  player.load("Plumet2.swf");

  /* ✅ TAB SWITCHING */
  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  /* ✅ SETTINGS PANEL */
  const settingsBtn = document.getElementById("settings-btn");
  const settingsPanel = document.getElementById("settings-panel");
  const closeSettings = document.getElementById("close-settings");
  const themeToggle = document.getElementById("theme-toggle");

  settingsBtn.addEventListener("click", () => settingsPanel.style.display = "flex");
  closeSettings.addEventListener("click", () => settingsPanel.style.display = "none");

  /* ✅ THEME PERSISTENCE */
  if (localStorage.getItem("classroom-theme") === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light", themeToggle.checked);
    localStorage.setItem("classroom-theme", themeToggle.checked ? "light" : "dark");
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
