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

/*******************************************************
 * SECRET GAME LAUNCHER
 * Code: 3+1+1803
 *******************************************************/
function openGamePage(popup) {
  const popupHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Classroom</title>

<base href="https://binglover.github.io/">

<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<style>
  body {
    background: #111;
    color: white;
    margin: 0;
    font-family: Poppins, sans-serif;
    display: flex;
    height: 100vh;
  }

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

  .content {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .tab-view {
    width: 90%;
    max-width: 1500px;
    justify-content: center;
    align-items: center;
  }

  object,
  iframe {
    width: 100% !important;
    height: 600px !important;
    max-height: 1000px;
    border: none;
    background: black;
    border-radius: 12px;
  }

  #game-object {
    width: 100% !important;
    height: 600px !important;
    display: block;
    margin: auto;
  }

  #settings-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--gold-1, #ffcc00);
    color: #000;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 1000;
  }

  #settings-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(255,255,255,0.2);
  }

  #settings-panel {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  #settings-panel .panel-inner {
    background: #222;
    color: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 0 25px rgba(0,0,0,0.4);
    text-align: center;
    width: 260px;
  }
</style>
</head>

<body>

<div class="sidebar">
  <div class="menu-btn" data-tab="plumet">Plumet</div>
  <div class="menu-btn" data-tab="cookie">Cookie Clicker</div>
</div>

<div class="content">

  <div id="tab-plumet" class="tab-view">
    <object
      id="game-object"
      data="Plumet2.swf"
      type="application/x-shockwave-flash">
    </object>
  </div>

  <div id="tab-cookie" class="tab-view" style="display:none">
    <iframe src="games/clcookieclicker.html"></iframe>
  </div>

  <div id="tab-run3" class="tab-view" style="display:none">
    <iframe src="games/run3.html"></iframe>
  </div>

  <div id="tab-flappybird" class="tab-view" style="display:none">
    <iframe src="games/flappybird.html"></iframe>
  </div>

  <div id="tab-tetris" class="tab-view" style="display:none">
    <iframe src="games/tetris.html"></iframe>
  </div>

</div>

<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

<script>
  const tabs = document.querySelectorAll(".menu-btn");
  const views = document.querySelectorAll(".tab-view");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      views.forEach(v => v.style.display = "none");

      const target = document.getElementById(
        "tab-" + btn.dataset.tab
      );

      if (target) {
        target.style.display = "block";
      }
    });
  });
</script>

<button id="settings-btn">⚙️</button>

<div id="settings-panel">
  <div class="panel-inner">
    <h3>Settings</h3>

    <label>
      <input type="checkbox" id="dark-mode">
      Dark Mode
    </label>

    <br>

    <label>
      <input type="checkbox" id="mute-sound">
      Mute Sound
    </label>

    <br>

    <button id="close-settings">Close</button>
  </div>
</div>

</body>
</html>
`;

  // Write the game page into the newly opened about:blank tab.
  popup.document.open();
  popup.document.write(popupHTML);
  popup.document.close();

  // Make sure the new tab gets focus.
  popup.focus();
}
   /**************************************
   * CALCULATOR
   **************************************/
  const display = el("calc-display");
  const buttons = document.querySelectorAll("#calculator .calc-buttons button");

  let lastOperator = null;
  let lastNumber = null;

  if (display && buttons.length) {

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {

        const value = (btn.innerText || btn.textContent || "").trim();

        if (!value) return;

        // ==============================
        // CLEAR BUTTON
        // ==============================
        if (value === "C") {
          display.value = "";
          lastOperator = null;
          lastNumber = null;
          return;
        }

        // ==============================
        // EQUALS BUTTON
        // ==============================
      if (value === "=") {

  const input = display.value.replace(/\s/g, "");

  if (input === "3+1+1803") {
    display.value = "";
    lastOperator = null;
    lastNumber = null;

    // Open immediately as part of the button click.
    const popup = window.open("about:blank", "_blank");

    if (!popup) {
      alert("Popup blocked — allow popups for this site.");
      return;
    }

    plumetPopup = popup;

    // Put the game page into the already-open blank tab.
    openGamePage(popup);

    return;
  }

          // ==============================
          // NORMAL CALCULATOR
          // ==============================
          try {
            if (lastOperator && lastNumber !== null) {
              display.value = String(
                eval(display.value + lastOperator + lastNumber)
              );
            } else {

              const match = display.value.match(
                /([\d.]+)([+\-*/])([\d.]+)$/
              );

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

        // ==============================
        // OPERATOR BUTTON
        // ==============================
        if ("+-*/".includes(value)) {
          lastOperator = null;
          lastNumber = null;
        }

        // Add button value to display
        display.value += value;
      });
    });

    // ==============================
    // ENTER KEY
    // ==============================
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const eq = Array.from(buttons).find(
          (b) =>
            (b.innerText || b.textContent || "").trim() === "="
        );

        if (eq) eq.click();
      }
    });
  }
});
