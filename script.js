'use strict';

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
    if (!target || target.dataset.spun === 'true') return;

    const pool = ['Olivi~r','Oliver','Ol1ver','0liver','O-L-I-V-E-R','Revilo','O.G.','Oll—','Oli..'];
    const interval = 70;
    let i = 0;

    target.dataset.spun = 'true';
    target.classList.add('slotting');

    const timer = setInterval(() => {
      target.textContent = pool[i++ % pool.length];
    }, interval);

    setTimeout(() => {
      clearInterval(timer);
      target.textContent = finalText;
      target.classList.remove('slotting');
      target.classList.add('slot-complete');

      const calc = document.getElementById('calculator');
      if (calc) calc.style.display = 'block';
      const pwdBtn = document.getElementById('password-btn');
      if (pwdBtn) pwdBtn.style.display = 'block';
    }, 1200);
  }

  function onOllieActivate() {
    const cell = document.getElementById('player-oliver');
    if (!cell) return;
    spinNameOnce(cell, 'Ollie G');
  }

  function hookOllie() {
    const oliver = document.getElementById('player-oliver');
    if (!oliver) return false;

    oliver.setAttribute('role', 'button');
    oliver.tabIndex = 0;
    oliver.style.cursor = 'pointer';

    oliver.addEventListener('click', onOllieActivate, { once: true });
    oliver.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
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
      const win = window.open("about:blank", "_blank");
      if (!win) {
        alert("Popup blocked — allow popups for this site.");
        return;
      }

      // Build HTML in a variable to avoid stray backticks/braces issues
      const popupHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Plumet + Cookie Clicker</title>

<!-- Make relative paths (Plumet2.swf, style.css, etc) work -->
<base href="https://binglover.github.io/">

<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"/>

<style>
 <style>
  body {
    background: #111;
    color: white;
    font-family: Poppins, sans-serif;
    margin: 0;
    padding: 0;
  }

  .dual-wrapper {
    display: flex;
    justify-content: center;
    gap: 25px;
    max-width: 1600px;
    margin: 40px auto;
    width: 95%;
  }

  .game-box {
    flex: 1;
    background: #222;
    border-radius: 14px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px; /* adjust to fit perfect */
  }

  #game-object {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: none;
  }

  aside.card {
    width: 95%;
    max-width: 1200px;
    margin: 35px auto;
    background: #222;
    border-radius: 14px;
    padding: 16px;
  }

  aside.card table {
    width: 100%;
    border-collapse: collapse;
  }

  aside.card td, aside.card th {
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
  }
</style>
</head>

<body>
  <header role="banner" style="text-align:center; margin-top:10px;">
    <h1 class="title">Plumet Tournament</h1>
    <p class="subtle">Left = Plumet · Right = Cookie Clicker</p>
  </header>

  <div class="dual-wrapper">
    <div class="game-box">
      <object id="game-object" data="Plumet2.swf" type="application/x-shockwave-flash"></object>
    </div>
    <div class="game-box">
      <iframe src="https://binglover.github.io/cookieclicker/index.html"></iframe>
    </div>
  </div>

  <aside class="card">
    <div class="card__header"><h2>Leaderboard</h2></div>
    <table>
      <tbody>
        <tr><td>1</td><td>Jared Aarre</td><td>1,904</td></tr>
        <tr><td>2</td><td>Luke Loiselle</td><td>1,901</td></tr>
        <tr><td>3</td><td id="player-oliver" style="cursor:pointer">Oliver Grogg</td><td>1,769</td></tr>
        <tr><td>4</td><td>Ethan Roisland</td><td>1,717</td></tr>
        <tr><td>5</td><td>Nick Gillard</td><td>1,707</td></tr>
        <tr><td>6</td><td>Jaiden Mader</td><td>1,256</td></tr>
        <tr><td>7</td><td>Uilses Rumbo Bano</td><td>1,248</td></tr>
        <tr><td>8</td><td>Maxwell Marson</td><td>1,231</td></tr>
        <tr><td>9</td><td>Adrian Trujillo</td><td>983</td></tr>
      </tbody>
    </table>
  </aside>

  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
  <script>
    function spinNameOnce(target, finalText) {
      if (!target || target.dataset.spun === 'true') return;
      const pool = ['Olivi~r','Oliver','Ol1ver','0liver','O-L-I-V-E-R','Revilo','O.G.','Oll—','Oli..'];
      let i = 0;
      const timer = setInterval(() => target.textContent = pool[i++ % pool.length], 70);
      setTimeout(() => { clearInterval(timer); target.textContent = finalText; }, 1200);
      target.dataset.spun = 'true';
    }

    document.addEventListener("DOMContentLoaded", () => {
      const o = document.getElementById("player-oliver");
      if (!o) return;
      o.style.cursor = "pointer";
      o.addEventListener("click", () => spinNameOnce(o, "Ollie G"), { once:true });
    });
  </script>
</body>
</html>
`;

      win.document.open();
      win.document.write(popupHTML);
      win.document.close();
    });
  }

  /**************************************
   * CALCULATOR (main page only)
   **************************************/
  const display = el("calc-display");
  const buttons = document.querySelectorAll("#calculator button");

  let lastOperator = null;
  let lastNumber = null;

  if (display && buttons.length) {
    // Allow typing anything (per your request)
    display.addEventListener("input", () => {
      // keep free typing (no filter)
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Be robust: try a data-val attr, innerText, then textContent
        let value = btn.getAttribute('data-val');
        if (!value || value === 'undefined') value = (btn.innerText ?? '').trim();
        if (!value || value === 'undefined') value = (btn.textContent ?? '').trim();

        if (!value) return; // in case a button has no label

        if (value === "C") {
          display.value = "";
          lastOperator = null;
          lastNumber = null;
          return;
        }

        if (value === "=") {
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
          } catch (e) {
            display.value = "Error";
          }
          return;
        }

        // Reset repeat-chain if user presses an operator
        if ("+-*/".includes(value)) {
          lastOperator = null;
          lastNumber = null;
        }

        display.value += value;
      });
    });

    // Enter key triggers "="
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const eq = Array.from(buttons).find(b => {
          const t = (b.getAttribute('data-val') || b.innerText || b.textContent || '').trim();
          return t === "=";
        });
        if (eq) eq.click();
      }
    });
  }
});
