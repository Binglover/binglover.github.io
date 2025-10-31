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
   * OLLIE G EFFECT + CALCULATOR REVEAL
   **************************************/
  function spinNameOnce(target, finalText) {
    if (!target || target.dataset.spun === "true") return;

    const names = ["Olivi~r","Oliver","Ol1ver","0liver","O-L-I-V-E-R","Revilo","O.G.","Oll—","Oli.."];
    let i = 0;
    target.dataset.spun = "true";

    const timer = setInterval(() => {
      target.textContent = names[i++ % names.length];
    }, 70);

    setTimeout(() => {
      clearInterval(timer);
      target.textContent = finalText;
      target.classList.add("slot-complete");

      // ✅ Reveal calculator
      const calc = el("calculator");
      if (calc) calc.style.display = "block";

    }, 1200);
  }

  const oliver = el("player-oliver");
  if (oliver) {
    oliver.addEventListener("click", () => spinNameOnce(oliver, "Ollie G"));
  }

  /**************************************
   * RUN IN ABOUT:BLANK — game + leaderboard
   **************************************/
  const blankBtn = el("open-blank");
  if (blankBtn) {
    blankBtn.addEventListener("click", () => {
      const win = window.open("about:blank", "_blank");
      if (!win) {
        alert("Popup blocked — allow popups.");
        return;
      }

      win.document.open();
      win.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Plumet Tournament</title>
  <base href="https://binglover.github.io/">
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"/>
</head>
<body>
  <div class="site">
    <main style="display:flex;flex-direction:column;align-items:center;max-width:1600px;margin:auto;width:100%;">
      <section class="card" style="width:95%;max-width:1200px;">
        <div class="card__header"><h2 class="card__title">Play</h2></div>
        <div class="card__body">
          <div id="game-frame" class="game-frame">
            <object id="game-object" data="Plumet2.swf" type="application/x-shockwave-flash"></object>
          </div>
        </div>
      </section>

      <aside class="card" style="width:95%;max-width:1200px;">
        <div class="card__header"><h2>Leaderboard</h2></div>
        <table>
          <thead><tr><th>#</th><th>Player</th><th>Score</th></tr></thead>
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
    </main>
  </div>
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
</body>
</html>
`);
      win.document.close();
    });
  }

  /**************************************
   * CALCULATOR SECRET (902197)
   **************************************/
  const display = el("calc-display");
  const buttons = document.querySelectorAll("#calculator button");

  if (display && buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (value === "C") return (display.value = "");
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
  }
});
