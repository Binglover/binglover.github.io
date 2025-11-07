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

<!-- Keep your relative paths working -->
<base href="https://binglover.github.io/">

<!-- DO NOT load full site stylesheet (prevents duplicate menus) -->
<!-- <link rel="stylesheet" href="style.css"> -->

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"/>

<style>
  /* =======================
     THEME VARIABLES
     ======================= */
  :root {
    --bg: #111;
    --fg: #ffffff;
    --panel: #222;
    --border: #333;
    --accent: #ffcc00;
  }
  body.light {
    --bg: #f6f7fb;
    --fg: #111;
    --panel: #ffffff;
    --border: rgba(0,0,0,0.12);
    --accent: #ffb300;
  }

  /* Base layout colors use vars so theme can flip */
  html, body { height: 100%; }
  body {
    background: var(--bg);
    color: var(--fg);
    margin: 0;
    font-family: Poppins, sans-serif;
    display: flex;
    height: 100vh;
  }

  /* Sidebar */
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
    transition: 0.2s;
  }
  .menu-btn:hover {
    background: var(--accent);
    color: #000;
  }

  /* Main area */
  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Game views */
  .tab-view {
    display: none; /* default hidden; JS shows one */
    width: 90%;
    max-width: 1500px;
    display: none;
    justify-content: center;
    align-items: center;
  }
  .tab-view.active { display: flex; }

  object, iframe {
    width: 100%;
    height: 600px;
    max-height: 1000px;
    border: none;
    background: #000;
    border-radius: 12px;
    object-fit: contain;
  }
  /* Normalize Plumet size to match Cookie Clicker */
  #game-object {
    width: 100% !important;
    height: 600px !important;
    display: block;
    margin: auto;
  }
  /* =======================
     ⚙️ Settings UI
     ======================= */
  #settings-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    font-size: 1.35rem;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(0,0,0,0.35);
    transition: transform .2s, box-shadow .2s;
    z-index: 1000;
  }
  #settings-btn:hover { transform: scale(1.08); box-shadow: 0 14px 34px rgba(0,0,0,0.45); }

  #settings-panel {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.6);
    align-items: center; justify-content: center;
    z-index: 999;
  }
  #settings-panel .panel-inner {
    background: var(--panel);
    color: var(--fg);
    padding: 22px 20px;
    border-radius: 16px;
    border: 1px solid var(--border);
    width: 280px;
    text-align: center;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45);
  }
  #settings-panel h3 { margin: 0 0 14px 0; }

  .switch {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    cursor: pointer;
    margin: 8px 0 16px;
  }
  .switch .switch-label { font-weight: 600; }
  .switch input {
    appearance: none;
    width: 0; height: 0;
    position: absolute; opacity: 0;
  }
  .switch .slider {
    position: relative;
    width: 48px; height: 28px;
    background: #666;
    border-radius: 999px;
    transition: background .2s ease;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.25);
  }
  .switch .slider::after {
    content: "";
    position: absolute;
    top: 3px; left: 3px;
    width: 22px; height: 22px;
    background: #fff;
    border-radius: 50%;
    transition: transform .2s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,.25);
  }
  .switch input:checked + .slider {
    background: var(--accent);
  }
  .switch input:checked + .slider::after {
    transform: translateX(20px);
  }
  .close-btn {
    margin-top: 8px;
    background: var(--accent);
    color: #000;
    border: none;
    padding: 8px 12px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }
  /* remove main site UI from popup */
.site {
  display: none !important;
}
</style>
</head>

<body>
  <div class="sidebar">
    <div class="menu-btn" data-tab="plumet">🎮 Plumet</div>
    <div class="menu-btn" data-tab="cookie">🍪 Cookie Clicker</div>
  </div>

  <header role="banner">
    <h1 class="title">Plumet Tournament</h1>
    <p class="subtle">Pick a game on the left.</p>
  </header>

  <div class="content">
    <div id="tab-plumet" class="tab-view active">
      <object id="game-object" data="Plumet2.swf" type="application/x-shockwave-flash"></object>
    </div>

    <div id="tab-cookie" class="tab-view">
      <iframe src="https://binglover.github.io/cookieclicker/index.html"></iframe>
    </div>
  </div>

  <!-- ⚙️ Settings button & panel -->
  <button id="settings-btn" aria-label="Open settings">⚙️</button>
  <div id="settings-panel">
    <div class="panel-inner">
      <h3>Settings</h3>
      <label class="switch">
        <input type="checkbox" id="theme-toggle" />
        <span class="slider"></span>
        <span class="switch-label">Light mode</span>
      </label>
      <button id="close-settings" class="close-btn">Close</button>
    </div>
  </div>

  <!-- Flash emulator for Plumet -->
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

  <script>
    // Tabs
    const tabs = document.querySelectorAll(".menu-btn");
    const views = document.querySelectorAll(".tab-view");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        views.forEach(v => v.classList.remove("active"));
        const target = document.getElementById("tab-" + btn.dataset.tab);
        if (target) target.classList.add("active");
      });
    });

    // Ollie G effect inside popup (if you want it here too)
    function spinNameOnce(target, finalText) {
      if (!target || target.dataset.spun === 'true') return;
      const pool = ['Olivi~r','Oliver','Ol1ver','0liver','O-L-I-V-E-R','Revilo','O.G.','Oll—','Oli..'];
      let i = 0;
      const timer = setInterval(() => target.textContent = pool[i++ % pool.length], 70);
      setTimeout(() => { clearInterval(timer); target.textContent = finalText; }, 1200);
      target.dataset.spun = 'true';
    }
    const o = document.getElementById("player-oliver");
    if (o) {
      o.style.cursor = "pointer";
      o.addEventListener("click", () => spinNameOnce(o, "Ollie G"), { once:true });
    }

    // ⚙️ Settings logic (run in popup context)
    const settingsBtn = document.getElementById("settings-btn");
    const settingsPanel = document.getElementById("settings-panel");
    const closeSettings = document.getElementById("close-settings");
    const themeToggle = document.getElementById("theme-toggle");

    // Restore theme
    (function initTheme(){
      const saved = localStorage.getItem("pt_theme"); // about:blank origin
      if (saved === "light") {
        document.body.classList.add("light");
        themeToggle.checked = true;
      } else {
        document.body.classList.remove("light");
        themeToggle.checked = false;
      }
    })();

    settingsBtn.addEventListener("click", () => {
      settingsPanel.style.display = "flex";
    });
    closeSettings.addEventListener("click", () => {
      settingsPanel.style.display = "none";
    });
    settingsPanel.addEventListener("click", (e) => {
      if (e.target === settingsPanel) settingsPanel.style.display = "none";
    });

    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("light");
        localStorage.setItem("pt_theme", "light");
      } else {
        document.body.classList.remove("light");
        localStorage.setItem("pt_theme", "dark");
      }
    });
  </script>
</body>
</html>

<body>
<!-- ✅ SIDEBAR MENU -->
<div class="sidebar">
  <div class="menu-btn" data-tab="plumet">🎮 Plumet</div>
  <div class="menu-btn" data-tab="cookie">🍪 Cookie Clicker</div>
</div>

<!-- ✅ MAIN VIEW -->
<div class="content">
  <div id="tab-plumet" class="tab-view">
      <object id="game-object" data="Plumet2.swf" type="application/x-shockwave-flash"></object>
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
  
  // ⚙️ Settings open/close
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const closeSettings = document.getElementById("close-settings");
const themeToggle = document.getElementById("theme-toggle");

// Restore theme from localStorage
(function initTheme(){
  const saved = localStorage.getItem("pt_theme"); // "light" | "dark" | null
  if (saved === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  } else {
    document.body.classList.remove("light");
    themeToggle.checked = false;
  }
})();

settingsBtn.addEventListener("click", () => {
  settingsPanel.style.display = "flex";
});
closeSettings.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});
settingsPanel.addEventListener("click", (e) => {
  if (e.target === settingsPanel) settingsPanel.style.display = "none";
});

// Toggle theme + persist
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("light");
    localStorage.setItem("pt_theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("pt_theme", "dark");
  }
});

</script>

<!-- ⚙️ Settings Button -->
<button id="settings-btn" aria-label="Open settings">⚙️</button>

<!-- ⚙️ Settings Panel -->
<div id="settings-panel">
  <div class="panel-inner">
    <h3>Settings</h3>

    <label class="switch">
      <input type="checkbox" id="theme-toggle" />
      <span class="slider"></span>
      <span class="switch-label">Light mode</span>
    </label>

    <button id="close-settings" class="close-btn">Close</button>
  </div>
</div>


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
