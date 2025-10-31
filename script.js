'use strict';

const el = (id) => document.getElementById(id);

window.addEventListener('DOMContentLoaded', () => {
  /**************************************
   * TITLE / GOLD VARIANT
   **************************************/
  function setGoldState(isGold) {
    const title = el('title');
    const rarity = el('rarity');
    if (!title || !rarity) return;

    if (isGold) {
      title.classList.add('title--gold');
      title.textContent = 'GOLDEN Plumet Tournament';
      rarity.style.display = 'block';
    } else {
      title.classList.remove('title--gold');
      title.textContent = 'Plumet Tournament';
      rarity.style.display = 'none';
    }
  }

  /**************************************
   * OLLIE G EFFECT
   **************************************/
  function spinNameOnce(target, finalText) {
    if (!target || target.dataset.spun === 'true') return;

    const pool = [
      'Olivi~r', 'Oliver', 'Ol1ver', '0liver',
      'O-L-I-V-E-R', 'Oliverr', 'O.G.', 'Oll—',
      'Olive?', 'Oli..', 'Oliver'
    ];
    let i = 0;

    target.classList.add('slotting');
    target.dataset.spun = 'true';

    const timer = setInterval(() => {
      target.textContent = pool[i++ % pool.length];
    }, 70);

    setTimeout(() => {
      clearInterval(timer);
      target.textContent = finalText;
      target.classList.remove('slotting');
      target.classList.add('slot-complete');
      target.setAttribute('aria-label', finalText);

      // (Optional) reveal anything gated after the easter egg
      const calc = el('calculator');
      if (calc) calc.style.display = 'block';
    }, 1200);
  }

  // Init gold state
  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  // Wire Ollie G (click + keyboard)
  const oliver = el('player-oliver');
  if (oliver) {
    oliver.addEventListener('click', () => spinNameOnce(oliver, 'Ollie G'));
    oliver.setAttribute('tabindex', '0');
    oliver.setAttribute('role', 'button');
    oliver.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spinNameOnce(oliver, 'Ollie G');
      }
    });
  }

  /**************************************
   * 🚀 RUN IN ABOUT:BLANK (keeps main header safe)
   **************************************/
  const openBlank = el('open-blank');
  if (openBlank) {
    openBlank.addEventListener('click', () => {
      const win = window.open('about:blank', '_blank');
      if (!win) {
        alert('Popup blocked. Enable pop-ups for this site.');
        return;
      }

      // Only write to the *new* window
      win.document.open();
      win.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Plumet Tournament</title>

  <!-- Make relative paths (Plumet2.swf, style.css) resolve to your GH Pages -->
  <base href="https://binglover.github.io/">

  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="site">
    <main role="main" style="display:grid;gap:18px;grid-template-columns:1fr;max-width:1600px;margin:40px auto;width:100%;">
      <section class="card" style="margin:0 auto;max-width:1200px;width:95%;">
        <div class="card__header">
          <h2 class="card__title">Play</h2>
        </div>
        <div class="card__body">
          <div id="game-frame" class="game-frame" aria-label="Plumet Game Container">
            <object id="game-object" data="Plumet2.swf" type="application/x-shockwave-flash"></object>
          </div>
        </div>
      </section>

      <!-- Leaderboard BELOW game, same width -->
      <aside class="card" aria-labelledby="lb-title" id="leaderboard-section" style="margin:0 auto;max-width:1200px;width:95%;">
        <div class="card__header">
          <h2 id="lb-title" class="card__title">Leaderboard</h2>
        </div>
        <div class="card__body">
          <table role="table" aria-describedby="lb-caption">
            <thead>
              <tr>
                <th class="rank">#</th>
                <th>Player</th>
                <th class="score">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="rank">1</td><td>Jared Aarre</td><td class="score">1,904</td></tr>
              <tr><td class="rank">2</td><td>Luke Loiselle</td><td class="score">1,901</td></tr>
              <tr><td class="rank">3</td><td id="player-oliver" style="cursor:pointer" title="Try your luck!">Oliver Grogg</td><td class="score">1,769</td></tr>
              <tr><td class="rank">4</td><td>Ethan Roisland</td><td class="score">1,717</td></tr>
              <tr><td class="rank">5</td><td>Nick Gillard</td><td class="score">1,707</td></tr>
              <tr><td class="rank">6</td><td>Jaiden Mader</td><td class="score">1,256</td></tr>
              <tr><td class="rank">7</td><td>Uilses Rumbo Banos</td><td class="score">1,248</td></tr>
              <tr><td class="rank">8</td><td>Max Marson</td><td class="score">1,231</td></tr>
              <tr><td class="rank">9</td><td>Adrian Trujillo</td><td class="score">983</td></tr>
            </tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>

  <!-- Ruffle so the SWF actually runs -->
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>

  <style>
    /* Ensure the game fills the card width nicely */
    #game-frame object, #game-frame embed {
      width: 100% !important;
      height: 420px !important;
      display: block;
    }
    /* Keep table lines visible if your theme uses borders */
    table { width: 100%; border-collapse: collapse; }
    thead th { text-align:left; font-weight:600; color:var(--muted); padding:10px 12px; }
    tbody td { padding:12px; border-top:1px solid var(--border); }
  </style>
</body>
</html>
      `);
      win.document.close();
    });
  }

  /**************************************
   * CALCULATOR SECRET (kept if present)
   **************************************/
  const display = el('calc-display');
  const buttons = document.querySelectorAll('#calculator button');
  if (display && buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;
        if (value === 'C') { display.value = ''; return; }
        if (value === '=') {
          if (display.value === '902197') {
            const newTab = window.open('about:blank', '_blank');
            if (newTab) {
              newTab.document.write(
                `<iframe src="${location.href}" style="border:none;width:100vw;height:100vh;"></iframe>`
              );
              newTab.document.close();
            }
          } else {
            try { display.value = String(eval(display.value)); }
            catch { display.value = 'Error'; }
          }
          return;
        }
        display.value += value;
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const eq = Array.from(buttons).find((b) => b.textContent === '=');
        eq?.click();
      }
    });
  }

  /**************************************
   * SCROLL TO LEADERBOARD (main site)
   **************************************/
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
