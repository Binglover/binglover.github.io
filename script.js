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
      title.textContent = "GOLDEN Calculator S!x";
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
<html lang="en">

<head>

<meta charset="utf-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1">

<title>Classroom</title>

<base href="https://binglover.github.io/">

<link rel="stylesheet" href="style.css">

<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
  rel="stylesheet"
>

<style>

/* =====================================================
   CLASSROOM PAGE
   ===================================================== */

:root {
  --gold-1: #ffcc00;
  --gold-2: #ffd700;
}


/* =====================================================
   BODY
   ===================================================== */

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {

  background: #111;

  color: white;

  font-family: Poppins, sans-serif;

  display: flex;

  overflow: hidden;
}


/* =====================================================
   SIDEBAR
   ===================================================== */

.sidebar {

  width: 180px;

  min-width: 180px;

  height: 100vh;

  background: #181818;

  border-right: 2px solid #333;

  display: flex;

  flex-direction: column;

  padding: 20px 10px;

  gap: 14px;

  box-sizing: border-box;

  overflow-y: auto;
}


.menu-btn {

  background: #222;

  color: white;

  border-radius: 8px;

  font-weight: 600;

  padding: 11px 8px;

  cursor: pointer;

  border: 2px solid #444;

  text-align: center;

  transition:
    background .2s ease,
    color .2s ease,
    border-color .2s ease,
    transform .1s ease;

  word-break: break-word;
}


.menu-btn:hover {

  background: var(--gold-1);

  color: black;

  border-color: var(--gold-1);

}


.menu-btn:active {

  transform: scale(.97);

}


/* =====================================================
   MAIN CONTENT
   ===================================================== */

.content {

  flex: 1;

  min-width: 0;

  height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

  box-sizing: border-box;

  overflow: auto;
}


/* =====================================================
   GAME CONTAINERS
   ===================================================== */

.tab-view {

  width: 90%;

  max-width: 1500px;

  margin: 0 auto;

  display: block;

}


.tab-view iframe,
.tab-view object {

  display: block;

  width: 100%;

  height: 600px;

  border: none;

  background: #000;

  border-radius: 12px;

  box-sizing: border-box;
}


/* Plumet */

#game-object {

  width: 100%;

  height: 600px;

  display: block;

}


/* =====================================================
   SETTINGS BUTTON
   ===================================================== */

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

  border-color: var(--gold-1);
}


/* =====================================================
   SETTINGS OVERLAY
   ===================================================== */

#settings-panel {

  position: fixed;

  inset: 0;

  display: none;

  align-items: center;

  justify-content: center;

  background: rgba(0,0,0,.72);

  backdrop-filter: blur(5px);

  z-index: 1000;

  padding: 15px;

  box-sizing: border-box;
}


#settings-panel.open {

  display: flex;

}


/* =====================================================
   SETTINGS WINDOW
   ===================================================== */

#settings-panel .panel-inner {

  width: min(430px, calc(100vw - 30px));

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

  box-sizing: border-box;

  animation: settingsOpen .2s ease;
}


@keyframes settingsOpen {

  from {

    opacity: 0;

    transform:
      scale(.92)
      translateY(10px);

  }

  to {

    opacity: 1;

    transform:
      scale(1)
      translateY(0);

  }

}


/* =====================================================
   SETTINGS HEADER
   ===================================================== */

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

  font-size: 28px;

  cursor: pointer;

  line-height: 1;

  padding: 2px 6px;
}


#close-settings:hover {

  color: white;

}


/* =====================================================
   SETTINGS SECTIONS
   ===================================================== */

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

  line-height: 1.5;

  margin: -5px 0 15px;

}


/* =====================================================
   SLIDERS
   ===================================================== */

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

  color: var(--gold-1);

  font-weight: 600;

}


.setting-row input[type="range"] {

  display: block;

  width: 100%;

  cursor: pointer;

}


/* =====================================================
   HTML UPLOAD
   ===================================================== */

#html-upload {

  width: 100%;

  padding: 10px;

  background: #111;

  color: white;

  border: 1px dashed #555;

  border-radius: 8px;

  cursor: pointer;

  box-sizing: border-box;
}


#html-upload:hover {

  border-color: var(--gold-1);

}


.upload-help {

  color: #888;

  font-size: .75rem;

  line-height: 1.5;

  margin-top: 10px;

}


/* =====================================================
   RESET BUTTON
   ===================================================== */

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


/* =====================================================
   USER GAME LABEL
   ===================================================== */

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


<!-- =====================================================
     SIDEBAR
     ===================================================== -->

<div class="sidebar">

  <div
    class="menu-btn"
    data-tab="plumet"
  >
    Plumet
  </div>


  <div
    class="menu-btn"
    data-tab="cookie"
  >
    Cookie Clicker
  </div>

</div>


<!-- =====================================================
     CONTENT
     ===================================================== -->

<div class="content">


  <!-- PLUMET -->

  <div
    id="tab-plumet"
    class="tab-view"
  >

    <object
      id="game-object"
      data="Plumet2.swf"
      type="application/x-shockwave-flash"
    ></object>

  </div>


  <!-- COOKIE CLICKER -->

  <div
    id="tab-cookie"
    class="tab-view"
    style="display:none;"
  >

    <iframe
      src="games/clcookieclicker.html"
    ></iframe>

  </div>


  <!-- RUN 3 -->

  <div
    id="tab-run3"
    class="tab-view"
    style="display:none;"
  >

    <iframe
      src="games/run3.html"
    ></iframe>

  </div>


  <!-- FLAPPY BIRD -->

  <div
    id="tab-flappybird"
    class="tab-view"
    style="display:none;"
  >

    <iframe
      src="games/flappybird.html"
    ></iframe>

  </div>


  <!-- TETRIS -->

  <div
    id="tab-tetris"
    class="tab-view"
    style="display:none;"
  >

    <iframe
      src="games/tetris.html"
    ></iframe>

  </div>

</div>


<!-- =====================================================
     SETTINGS BUTTON
     ===================================================== -->

<button
  id="settings-btn"
  aria-label="Open settings"
  title="Settings"
>
  ⚙️
</button>


<!-- =====================================================
     SETTINGS PANEL
     ===================================================== -->

<div id="settings-panel">

  <div class="panel-inner">


    <div class="settings-header">

      <h2>
        ⚙️ Classroom Settings
      </h2>

      <button
        id="close-settings"
        aria-label="Close settings"
      >
        ×
      </button>

    </div>


    <!-- GAME SIZE -->

    <div class="settings-section">

      <h3>
        🎮 Game Size
      </h3>

      <p class="setting-description">
        Adjust the game container to fit your screen.
      </p>


      <!-- WIDTH -->

      <div class="setting-row">

        <div class="setting-label">

          <span>
            Width
          </span>

          <span
            id="width-value"
            class="setting-value"
          >
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
        >

      </div>


      <!-- HEIGHT -->

      <div class="setting-row">

        <div class="setting-label">

          <span>
            Height
          </span>

          <span
            id="height-value"
            class="setting-value"
          >
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
        >

      </div>

    </div>


    <!-- UPLOAD -->

    <div class="settings-section">

      <h3>
        📁 Add Your Own Game
      </h3>

      <p class="setting-description">
        Select an HTML file from your computer.
        It will appear as a new game tab.
      </p>


      <input
        type="file"
        id="html-upload"
        accept=".html,.htm,text/html"
      >


      <p class="upload-help">
        Standalone HTML games work best.
        Games that require separate local files may
        need those resources embedded or hosted online.
      </p>

    </div>


    <!-- RESET -->

    <div class="settings-section">

      <h3>
        🔄 Reset
      </h3>

      <button
        id="reset-settings"
      >
        Reset Game Size
      </button>

    </div>

  </div>

</div>


<!-- =====================================================
     RUFFLE
     ===================================================== -->

<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>


<!-- =====================================================
     CLASSROOM JAVASCRIPT
     IMPORTANT: THIS IS AFTER THE HTML ELEMENTS
     ===================================================== -->

<script>

(function () {

  "use strict";


  /* =====================================================
     TAB SYSTEM
     ===================================================== */

  const tabs =
    document.querySelectorAll(".menu-btn");

  const views =
    document.querySelectorAll(".tab-view");


  function showTab(tabName) {

    views.forEach(function (view) {

      view.style.display = "none";

    });


    const target =
      document.getElementById(
        "tab-" + tabName
      );


    if (target) {

      target.style.display = "block";

    }

  }


  tabs.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        showTab(
          button.dataset.tab
        );

      }
    );

  });


  /* =====================================================
     SETTINGS ELEMENTS
     ===================================================== */

  const settingsButton =
    document.getElementById(
      "settings-btn"
    );

  const settingsPanel =
    document.getElementById(
      "settings-panel"
    );

  const closeSettings =
    document.getElementById(
      "close-settings"
    );

  const widthSlider =
    document.getElementById(
      "game-width"
    );

  const heightSlider =
    document.getElementById(
      "game-height"
    );

  const widthValue =
    document.getElementById(
      "width-value"
    );

  const heightValue =
    document.getElementById(
      "height-value"
    );

  const resetButton =
    document.getElementById(
      "reset-settings"
    );

  const htmlUpload =
    document.getElementById(
      "html-upload"
    );


  /* =====================================================
     SAFETY CHECK
     ===================================================== */

  if (
    !settingsButton ||
    !settingsPanel ||
    !closeSettings ||
    !widthSlider ||
    !heightSlider ||
    !widthValue ||
    !heightValue ||
    !resetButton ||
    !htmlUpload
  ) {

    console.error(
      "Classroom Settings: required elements are missing."
    );

    return;

  }


  /* =====================================================
     OPEN SETTINGS
     ===================================================== */

  settingsButton.addEventListener(
    "click",
    function () {

      settingsPanel.classList.add(
        "open"
      );

    }
  );


  /* =====================================================
     CLOSE SETTINGS
     ===================================================== */

  closeSettings.addEventListener(
    "click",
    function () {

      settingsPanel.classList.remove(
        "open"
      );

    }
  );


  /* =====================================================
     CLICK OUTSIDE TO CLOSE
     ===================================================== */

  settingsPanel.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        settingsPanel
      ) {

        settingsPanel.classList.remove(
          "open"
        );

      }

    }
  );


  /* =====================================================
     ESCAPE TO CLOSE
     ===================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        settingsPanel.classList.remove(
          "open"
        );

      }

    }
  );


  /* =====================================================
     APPLY GAME SIZE
     ===================================================== */

  function applyGameSize() {

    const width =
      Number(widthSlider.value);

    const height =
      Number(heightSlider.value);


    widthValue.textContent =
      width + "%";


    heightValue.textContent =
      height + "px";


    /*
     * Resize all game containers.
     */

    document
      .querySelectorAll(".tab-view")
      .forEach(function (view) {

        view.style.width =
          width + "%";

      });


    /*
     * Resize all iframes.
     */

    document
      .querySelectorAll(".tab-view iframe")
      .forEach(function (frame) {

        frame.style.width =
          "100%";

        frame.style.height =
          height + "px";

      });


    /*
     * Resize Plumet.
     */

    const gameObject =
      document.getElementById(
        "game-object"
      );


    if (gameObject) {

      gameObject.style.width =
        "100%";

      gameObject.style.height =
        height + "px";

    }


    /*
     * Save the settings.
     */

    localStorage.setItem(
      "classroomGameWidth",
      String(width)
    );

    localStorage.setItem(
      "classroomGameHeight",
      String(height)
    );

  }


  /* =====================================================
     WIDTH SLIDER
     ===================================================== */

  widthSlider.addEventListener(
    "input",
    applyGameSize
  );


  /* =====================================================
     HEIGHT SLIDER
     ===================================================== */

  heightSlider.addEventListener(
    "input",
    applyGameSize
  );


  /* =====================================================
     LOAD SAVED SETTINGS
     ===================================================== */

  const savedWidth =
    localStorage.getItem(
      "classroomGameWidth"
    );

  const savedHeight =
    localStorage.getItem(
      "classroomGameHeight"
    );


  if (savedWidth !== null) {

    const numericWidth =
      Number(savedWidth);


    if (
      numericWidth >= 50 &&
      numericWidth <= 100
    ) {

      widthSlider.value =
        numericWidth;

    }

  }


  if (savedHeight !== null) {

    const numericHeight =
      Number(savedHeight);


    if (
      numericHeight >= 300 &&
      numericHeight <= 1200
    ) {

      heightSlider.value =
        numericHeight;

    }

  }


  /*
   * Apply the initial size.
   */

  applyGameSize();


  /* =====================================================
     RESET
     ===================================================== */

  resetButton.addEventListener(
    "click",
    function () {

      widthSlider.value = 90;

      heightSlider.value = 600;

      localStorage.removeItem(
        "classroomGameWidth"
      );

      localStorage.removeItem(
        "classroomGameHeight"
      );

      applyGameSize();

    }
  );


  /* =====================================================
     HTML GAME UPLOADER
     ===================================================== */

  htmlUpload.addEventListener(
    "change",
    function (event) {

      const file =
        event.target.files[0];


      if (!file) {

        return;

      }


      /* ---------------------------------------------
         Check file type
         --------------------------------------------- */

      const fileName =
        file.name.toLowerCase();


      if (
        !fileName.endsWith(".html") &&
        !fileName.endsWith(".htm")
      ) {

        alert(
          "Please select an HTML file."
        );

        htmlUpload.value = "";

        return;

      }


      /* ---------------------------------------------
         Read the HTML file
         --------------------------------------------- */

      const reader =
        new FileReader();


      reader.onload =
        function () {

          const html =
            String(reader.result);


          /* -------------------------------------------
             Unique game ID
             ------------------------------------------- */

          const gameId =
            "uploaded-" +
            Date.now();


          /* -------------------------------------------
             Create sidebar button
             ------------------------------------------- */

          const button =
            document.createElement(
              "div"
            );


          button.className =
            "menu-btn";


          button.dataset.tab =
            gameId;


          button.textContent =
            "📄 " + file.name;


          document
            .querySelector(".sidebar")
            .appendChild(button);


          /* -------------------------------------------
             Create game container
             ------------------------------------------- */

          const gameView =
            document.createElement(
              "div"
            );


          gameView.id =
            "tab-" + gameId;


          gameView.className =
            "tab-view uploaded-game";


          gameView.style.display =
            "none";


          gameView.style.width =
            widthSlider.value + "%";


          /* -------------------------------------------
             Create iframe
             ------------------------------------------- */

          const iframe =
            document.createElement(
              "iframe"
            );


          iframe.title =
            file.name;


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
           * Put the uploaded HTML
           * directly into the iframe.
           */

          iframe.srcdoc =
            html;


          gameView.appendChild(
            iframe
          );


          document
            .querySelector(".content")
            .appendChild(gameView);


          /* -------------------------------------------
             Make sidebar button work
             ------------------------------------------- */

          button.addEventListener(
            "click",
            function () {

              showTab(gameId);

            }
          );


          /* -------------------------------------------
             Open uploaded game
             ------------------------------------------- */

          showTab(gameId);


          /* -------------------------------------------
             Close settings
             ------------------------------------------- */

          settingsPanel.classList.remove(
            "open"
          );


          /*
           * Clear file input so the same file
           * can be uploaded again later.
           */

          htmlUpload.value = "";


          console.log(
            "User game loaded:",
            file.name
          );

        };


      reader.onerror =
        function () {

          alert(
            "Could not read that HTML file."
          );

        };


      reader.readAsText(file);

    }
  );


  /* =====================================================
     DEFAULT TAB
     ===================================================== */

  showTab("plumet");


})();

</script>


</body>
</html>
`;


  /* =====================================================
     WRITE PAGE INTO ABOUT:BLANK
     ===================================================== */

  popup.document.open();

  popup.document.write(
    popupHTML
  );

  popup.document.close();


  /* Focus the new tab */

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
