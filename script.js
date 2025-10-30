'use strict';

const el = (id) => document.getElementById(id);

window.addEventListener('DOMContentLoaded', () => {

  /**************************************
   * GOLD TITLE + OLIVER SPIN LOGIC
   **************************************/
  function setGoldState(isGold) {
    const title = el('title');
    const rarity = el('rarity');
    if (!title || !rarity) return;
    if (isGold) {
      title.classList.add('title--gold');
      title.textContent = 'GOLDEN Plumet Tournament';
      rarity.style.display = 'block';
    }
  }

  function spinNameOnce(target, finalText) {
    if (!target || target.dataset.spun === 'true') return;

    const pool = ['Olivi~r','Oliver','Ol1ver','Olivia','0liver','O-L-I-V-E-R','Revilo Ggrog','Asian','O.G.','Oll—','Oli..','Oliver Oil'];
    let i = 0;
    target.dataset.spun = 'true';

    const timer = setInterval(() => {
      target.textContent = pool[i++ % pool.length];
    }, 70);

    setTimeout(() => {
      clearInterval(timer);
      target.textContent = finalText;
      target.classList.add('slot-complete');

      // ✅ Show calculator AFTER Ollie G event
      const calc = el("calculator");
      if (calc) calc.style.display = "block";

    }, 2500);
  }

  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  const oliver = el('player-oliver');
  if (oliver) {
    oliver.addEventListener('click', () => spinNameOnce(oliver, 'Ollie G'));
  }


  /**************************************
   * 🚀 "Run in about:blank" BUTTON
   **************************************/
document.getElementById("open-blank").addEventListener("click", () => {
  const newPage = window.open("about:blank", "_blank");
  if (!newPage) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  newPage.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Plumet Tournament</title>

      <!-- ✅ Base path fixes all file references -->
      <base href="https://binglover.github.io/">

      <!-- Load your actual site files -->
      <link rel="stylesheet" href="style.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />

      <!-- Flash emulator -->
      <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

      <!-- ✅ This ensures your game, calculator, and buttons all work -->
      <script src="script.js" defer></script>

      <style>
        html, body {
          margin: 0;
          padding: 0;
          background-color: #111;
        }
      </style>
    </head>
    <body>

      <!-- ✅ Exact copy of your live site layout -->
      <div class="site">
        <header>
          <h1 id="title" class="title">Plumet Tournament</h1>
          <p class="subtle">Aim for the highest score! Compete fairly, flex responsibly.</p>
          <p id="rarity" class="rarity" style="display:none;">You rolled the GOLD variant. Nice.</p>

          <div style="margin-top: 15px;">
            <button id="goto-files"
              style="background: var(--gold-1); color: #000; border: none; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-weight: 600;"
              onclick="fetch('clSINGLEFILE.html').then(r => r.text()).then(t => { 
                const w = window.open('about:blank','_blank'); 
                w.document.write(t); w.document.close(); 
              });">
              📁 View All Files
            </button>

            <button id="goto-leaderboard"
              style="background: var(--gold-1); color: #000; border: none; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-weight: 600;">
              📊 View Leaderboard
            </button>
          </div>
        </header>

        <main>
          <section class="card">
            <div class="card__header">
              <h2 class="card__title">Play</h2>
            </div>
            <div class="card__body">
              <div class="game-frame">
                <ruffle-player style="width:100%; height:550px;">
                  <source src="Plumet2.swf">
                </ruffle-player>
              </div>
            </div>
          </section>

          <aside class="card" style="margin-top: 25px;">
            <div class="card__header"><h2 class="card__title">Leaderboard</h2></div>
            <div class="card__body">
              <table>
                <thead>
                  <tr><th>#</th><th>Player</th><th>Score</th></tr>
                </thead>
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
            </div>
          </aside>
        </main>
      </div>
    </body>
    </html>
  `);

  newPage.document.close();
});


  /**************************************
   * ✅ CALCULATOR SECRET CODE (902197)
   **************************************/
  const display = el("calc-display");
  const buttons = document.querySelectorAll("#calculator button");

  if (display && buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (value === "C") { display.value = ""; return; }

        if (value === "=") {
          if (display.value === "902197") {
            const newTab = window.open("about:blank", "_blank");
            newTab.document.write(`<iframe src="${location.href}" style="border:none;width:100vw;height:100vh;"></iframe>`);
            newTab.document.close();
          } else {
            try { display.value = eval(display.value); }
            catch { display.value = "Error"; }
          }
          return;
        }

        display.value += value;
      });
    });

    // Keyboard Enter support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        buttons.forEach(b => b.textContent === "=" && b.click());
      }
    });
  }


  /**************************************
   * LEADERBOARD BUTTON (scrolls to section)
   **************************************/
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
