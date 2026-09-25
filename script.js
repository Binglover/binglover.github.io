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
  margin: 0 auto;
}

object,
iframe {
  width: 100%;
  height: 600px;
  max-height: none;
  border: none;
  background: black;
  border-radius: 12px;
}

#game-object {
  width: 100%;
  height: 600px;

  /* =========================================
     SETTINGS BUTTON
     ========================================= */

  #settings-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;

    width: 58px;
    height: 58px;

    background: #222;
    color: white;

    border: 2px solid #555;
    border-radius: 50%;

    font-size: 25px;
    cursor: pointer;

    box-shadow: 0 6px 20px rgba(0,0,0,.5);

    transition:
      transform .2s ease,
      background .2s ease,
      border-color .2s ease;

    z-index: 1001;
  }

  #settings-btn:hover {
    transform: rotate(30deg) scale(1.08);
    background: #333;
    border-color: var(--gold-1, #ffcc00);
  }


  /* =========================================
     SETTINGS OVERLAY
     ========================================= */

  #settings-panel {
    display: none;

    position: fixed;
    inset: 0;

    background: rgba(0,0,0,.72);
    backdrop-filter: blur(5px);

    align-items: center;
    justify-content: center;

    z-index: 1000;
  }

  #settings-panel.open {
    display: flex;
  }


  /* =========================================
     SETTINGS WINDOW
     ========================================= */

  #settings-panel .panel-inner {
    width: min(420px, calc(100vw - 30px));

    max-height: calc(100vh - 30px);
    overflow-y: auto;

    background: #181818;
    color: white;

    border: 1px solid #444;
    border-radius: 18px;

    padding: 26px;

    box-shadow:
      0 20px 60px rgba(0,0,0,.7),
      0 0 0 1px rgba(255,255,255,.04);

    text-align: left;

    animation: settingsOpen .2s ease;
  }

  @keyframes settingsOpen {
    from {
      opacity: 0;
      transform: scale(.92) translateY(10px);
    }

    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }


  /* =========================================
     SETTINGS HEADER
     ========================================= */

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 22px;
  }

  .settings-header h2 {
    margin: 0;
    font-size: 1.3rem;
  }

  #close-settings {
    background: transparent;
    color: #aaa;

    border: none;

    font-size: 24px;
    cursor: pointer;

    line-height: 1;
  }

  #close-settings:hover {
    color: white;
  }


  /* =========================================
     SETTINGS SECTIONS
     ========================================= */

  .settings-section {
    background: #222;

    border: 1px solid #333;
    border-radius: 12px;

    padding: 16px;
    margin-bottom: 14px;
  }

  .settings-section h3 {
    margin: 0 0 12px;
    font-size: .95rem;
  }

  .setting-description {
    color: #999;
    font-size: .8rem;
    margin: -5px 0 15px;
  }


  /* =========================================
     SIZE CONTROLS
     ========================================= */

  .setting-row {
    margin-bottom: 18px;
  }

  .setting-row:last-child {
    margin-bottom: 0;
  }

  .setting-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    font-size: .85rem;
  }

  .setting-value {
    color: var(--gold-1, #ffcc00);
    font-weight: 600;
  }

  .setting-row input[type="range"] {
    width: 100%;
    cursor: pointer;
  }


  /* =========================================
     UPLOAD AREA
     ========================================= */

  #html-upload {
    width: 100%;
    padding: 10px;

    background: #111;
    color: white;

    border: 1px dashed #555;
    border-radius: 8px;

    cursor: pointer;
  }

  #html-upload:hover {
    border-color: var(--gold-1, #ffcc00);
  }

  .upload-help {
    color: #888;
    font-size: .75rem;
    line-height: 1.5;
    margin-top: 10px;
  }


  /* =========================================
     RESET BUTTON
     ========================================= */

  #reset-settings {
    width: 100%;

    padding: 10px;

    background: #333;
    color: white;

    border: 1px solid #555;
    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;
  }

  #reset-settings:hover {
    background: #444;
  }


  /* =========================================
     UPLOADED GAME TABS
     ========================================= */

  .uploaded-game {
    position: relative;
  }

  .uploaded-game::before {
    content: "USER GAME";

    display: block;

    font-size: .6rem;
    color: #888;

    margin-bottom: 8px;
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

  /* =========================================
     TAB SYSTEM
     ========================================= */

  const tabs = document.querySelectorAll(".menu-btn");
  const views = document.querySelectorAll(".tab-view");

  function showTab(tabName) {

    views.forEach(view => {
      view.style.display = "none";
    });

    const target = document.getElementById(
      "tab-" + tabName
    );

    if (target) {
      target.style.display = "block";
    }
  }


  tabs.forEach(btn => {

    btn.addEventListener("click", () => {

      showTab(btn.dataset.tab);

    });

  });


  /* =========================================
     SETTINGS PANEL
     ========================================= */

  const settingsButton =
    document.getElementById("settings-btn");

  const settingsPanel =
    document.getElementById("settings-panel");

  const closeSettings =
    document.getElementById("close-settings");


  settingsButton.addEventListener("click", () => {

    settingsPanel.classList.add("open");

  });


  closeSettings.addEventListener("click", () => {

    settingsPanel.classList.remove("open");

  });


  /* Click outside the settings box to close it */

  settingsPanel.addEventListener("click", (event) => {

    if (event.target === settingsPanel) {

      settingsPanel.classList.remove("open");

    }

  });


  /* Press Escape to close */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      settingsPanel.classList.remove("open");

    }

  });


  /* =========================================
     GAME SIZE SETTINGS
     ========================================= */

  const widthSlider =
    document.getElementById("game-width");

  const heightSlider =
    document.getElementById("game-height");

  const widthValue =
    document.getElementById("width-value");

  const heightValue =
    document.getElementById("height-value");

  const resetButton =
    document.getElementById("reset-settings");


  function applyGameSize() {

    const width =
      widthSlider.value;

    const height =
      heightSlider.value;


    /* Update displayed numbers */

    widthValue.textContent =
      width + "%";

    heightValue.textContent =
      height + "px";


    /* Resize every game container */

    document.querySelectorAll(".tab-view").forEach(view => {

      view.style.width = width + "%";

    });


    /* Resize every iframe */

    document.querySelectorAll(".tab-view iframe").forEach(frame => {

      frame.style.height = height + "px";

    });


    /* Resize the Plumet Flash/Ruffle container */

    const gameObject =
      document.getElementById("game-object");

    if (gameObject) {

      gameObject.style.height =
        height + "px";

    }


    /* Save settings */

    localStorage.setItem(
      "classroomGameWidth",
      width
    );

    localStorage.setItem(
      "classroomGameHeight",
      height
    );

  }


  /* Change size live while dragging */

  widthSlider.addEventListener(
    "input",
    applyGameSize
  );

  heightSlider.addEventListener(
    "input",
    applyGameSize
  );


  /* =========================================
     LOAD SAVED SIZE
     ========================================= */

  const savedWidth =
    localStorage.getItem(
      "classroomGameWidth"
    );

  const savedHeight =
    localStorage.getItem(
      "classroomGameHeight"
    );


  if (savedWidth) {

    widthSlider.value =
      savedWidth;

  }


  if (savedHeight) {

    heightSlider.value =
      savedHeight;

  }


  applyGameSize();


  /* =========================================
     RESET SIZE
     ========================================= */

  resetButton.addEventListener("click", () => {

    widthSlider.value = 90;

    heightSlider.value = 600;

    applyGameSize();

  });


  /* =========================================
     HTML GAME UPLOADER
     ========================================= */

  const htmlUpload =
    document.getElementById("html-upload");


  htmlUpload.addEventListener("change", (event) => {

    const file =
      event.target.files[0];


    if (!file) {
      return;
    }


    /* Only allow HTML files */

    const fileName =
      file.name.toLowerCase();

    if (
      !fileName.endsWith(".html") &&
      !fileName.endsWith(".htm")
    ) {

      alert("Please select an HTML file.");

      htmlUpload.value = "";

      return;

    }


    const reader =
      new FileReader();


    reader.onload = () => {

      const html =
        reader.result;


      /* Create a unique ID */

      const gameId =
        "uploaded-" +
        Date.now();


      /* Create sidebar button */

      const button =
        document.createElement("div");

      button.className =
        "menu-btn uploaded-game-button";

      button.dataset.tab =
        gameId;

      button.textContent =
        "📄 " + file.name;


      /* Add button to sidebar */

      document.querySelector(".sidebar")
        .appendChild(button);


      /* Create game container */

      const gameView =
        document.createElement("div");

      gameView.id =
        "tab-" + gameId;

      gameView.className =
        "tab-view uploaded-game";


      gameView.style.display =
        "none";


      gameView.style.width =
        widthSlider.value + "%";


      /* Create iframe */

      const iframe =
        document.createElement("iframe");


      iframe.style.width =
        "100%";

      iframe.style.height =
        heightSlider.value + "px";

      iframe.style.border =
        "none";

      iframe.style.background =
        "#000";

      iframe.style.borderRadius =
        "12px";


      /*
       * Put the uploaded HTML directly
       * into the iframe.
       */

      iframe.srcdoc =
        html;


      gameView.appendChild(
        iframe
      );


      document.querySelector(".content")
        .appendChild(gameView);


      /* Make the new button work */

      button.addEventListener(
        "click",
        () => {

          showTab(gameId);

        }
      );


      /* Open the newly uploaded game */

      showTab(gameId);


      /* Close settings */

      settingsPanel.classList.remove(
        "open"
      );


      /* Tell the user it worked */

      console.log(
        "Loaded user game:",
        file.name
      );

    };


    reader.onerror = () => {

      alert(
        "Could not read that HTML file."
      );

    };


    reader.readAsText(file);

  });

</script>
<button id="settings-btn">⚙️</button>

<!-- =========================================
     SETTINGS BUTTON
     ========================================= -->

<button id="settings-btn" aria-label="Open settings">
  ⚙️
</button>


<!-- =========================================
     SETTINGS PANEL
     ========================================= -->

<div id="settings-panel">

  <div class="panel-inner">

    <div class="settings-header">

      <h2>⚙️ Classroom Settings</h2>

      <button id="close-settings" aria-label="Close settings">
        ×
      </button>

    </div>


    <!-- GAME SIZE -->

    <div class="settings-section">

      <h3>🎮 Game Size</h3>

      <p class="setting-description">
        Adjust the game container for larger or smaller screens.
      </p>


      <div class="setting-row">

        <div class="setting-label">
          <span>Width</span>

          <span
            id="width-value"
            class="setting-value">
            90%
          </span>
        </div>

        <input
          type="range"
          id="game-width"
          min="50"
          max="100"
          value="90"
          step="1"
        />

      </div>


      <div class="setting-row">

        <div class="setting-label">
          <span>Height</span>

          <span
            id="height-value"
            class="setting-value">
            600px
          </span>
        </div>

        <input
          type="range"
          id="game-height"
          min="300"
          max="1200"
          value="600"
          step="10"
        />

      </div>

    </div>


    <!-- UPLOAD GAME -->

    <div class="settings-section">

      <h3>📁 Add Your Own Game</h3>

      <p class="setting-description">
        Upload an HTML game and it will appear as a new tab.
      </p>

      <input
        type="file"
        id="html-upload"
        accept=".html,.htm,text/html"
      />

      <p class="upload-help">
        Your HTML file should be self-contained or use online
        resources. Local images, JavaScript files, and other
        files next to the HTML file may not work because of
        browser security restrictions.
      </p>

    </div>


    <!-- RESET -->

    <div class="settings-section">

      <h3>🔄 Reset</h3>

      <button id="reset-settings">
        Reset Game Size
      </button>

    </div>

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
