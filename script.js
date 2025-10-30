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
  const win = window.open("about:blank", "_blank");

  if (!win) {
    alert("Popup blocked. Allow pop-ups for this site.");
    return;
  }

  win.document.open();
  win.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Plumet Tournament</title>

  <!-- ✅ Forces all relative paths to load from your live site -->
  <base href="https://binglover.github.io/">

  <!-- ✅ load your real resources -->
  <link rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
  <script src="script.js" defer></script>

</head>
<body>
  ${document.querySelector(".site").outerHTML}
</body>
</html>
  `);
  win.document.close();

  // ✅ keeps the URL bar showing "about:blank"
  setTimeout(() => win.history.pushState({}, "", "about:blank"), 300);
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
