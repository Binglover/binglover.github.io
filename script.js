'use strict';

const el = (id) => document.getElementById(id);

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

function spinNameOnce(target, finalText) {
  if (!target || target.dataset.spun === 'true') return;

  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', 'Olivia', '0liver', 'O-L-I-V-E-R', 'Revilo', 'O.G.', 'Oll—', 'Olive?', 'Oli..', 'Oliver Oil'];
  const duration = 2500;
  const interval = 70;
  let i = 0;

  target.classList.add('slotting');
  target.dataset.spun = 'true'; // prevent triggering twice

  const timer = setInterval(() => {
    target.textContent = pool[i++ % pool.length];
  }, interval);

  setTimeout(() => {
    clearInterval(timer);
    target.textContent = finalText;
    target.classList.remove('slotting');
    target.classList.add('slot-complete');
    target.setAttribute('aria-label', finalText);

    // ✅ UNHIDE PASSWORD BUTTON
    const btn = el('password-btn');
    if (btn) btn.style.display = 'block';

    // ✅ ALSO SHOW CALCULATOR (hidden until Ollie G triggered)
    const calc = el('calculator');
    if (calc) calc.style.display = "block";

  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {

  // --- GOLD TITLE & OLIVER SPIN ---
  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

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


  //--------------------------------------------------------------------
  // ✅ ABOUT:BLANK BUTTON — runs site cloaked in new tab
  //--------------------------------------------------------------------
  const blankBtn = el("open-blank");
  if (blankBtn) {
    blankBtn.addEventListener("click", () => {
      const newPage = window.open("about:blank", "_blank");

      if (!newPage) {
        alert("Popup blocked! Allow popups for this site.");
        return;
      }

      newPage.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Classroom</title>
            <style>
              html, body { margin:0; padding:0; height:100%; overflow:hidden; background:black; }
              iframe { width:100vw; height:100vh; border:none; }
            </style>
          </head>
          <body><iframe src="https://binglover.github.io/"></iframe></body>
        </html>
      `);
      newPage.document.close();
    });
  }


  //--------------------------------------------------------------------
  // ✅ CALCULATOR SECRET CODE (902197 → open about:blank cloaked page)
  //--------------------------------------------------------------------
  const display = el("calc-display");
  const calcButtons = document.querySelectorAll(".calc-buttons button");

  if (display && calcButtons.length) {
    calcButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (value === "C") {
          display.value = "";
          return;
        }

        if (value === "=") {
          if (display.value === "902197") {
            const newTab = window.open("about:blank", "_blank");
            newTab.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>Plumet Tournament</title>
                <style>
                  html, body { margin:0; padding:0; overflow:hidden; height:100%; }
                  iframe { width:100vw; height:100vh; border:none; }
                </style>
              </head>
              <body><iframe src="${location.href}"></iframe></body>
              </html>
            `);
            newTab.document.close();
          } else {
            try {
              display.value = eval(display.value);
            } catch {
              display.value = "Error";
            }
          }
          return;
        }

        display.value += value;
      });
    });
  }


  //--------------------------------------------------------------------
  // ✅ PASSWORD PANEL (Qing flag + secret iframe unlock)
  //--------------------------------------------------------------------
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

  if (btn) btn.style.display = 'none'; // stays hidden until Ollie G

  if (btn && panel) {
    btn.addEventListener('click', () => {
      panel.style.display = 'flex';
      input.focus();
    });

    closeBtn.addEventListener('click', () => panel.style.display = 'none');

    panel.addEventListener('click', (e) => {
      if (e.target === panel) panel.style.display = 'none';
    });

    submit.addEventListener('click', () => {
      const entered = input.value.trim();

      if (entered === 'thejock') {
        msg.textContent = '⚠️ The Icon watches over all.';
        msg.style.color = 'gold';
        document.body.style.background = "url('https://i.imgur.com/CgplZ0i.png')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        panel.style.display = 'none';
        return;
      }

      if (entered === '902197') {
        msg.textContent = '✅ Access granted!';
        msg.style.color = 'lime';

        setTimeout(() => {
          panel.style.display = 'none';
          const newPage = window.open("about:blank", "_blank");
          newPage.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Blocked Page</title>
              <style>
                html, body { margin:0; padding:0; overflow:hidden; background:black; height:100%; }
                iframe { width:100vw; height:100vh; border:none; }
              </style>
            </head>
            <body><iframe src="https://binglover.github.io/"></iframe></body>
            </html>
          `);
          newPage.document.close();
        }, 500);
        return;
      }

      msg.textContent = '❌ Incorrect password.';
      msg.style.color = 'red';
    });
  }


  //--------------------------------------------------------------------
  // ✅ LEADERBOARD SCROLL BUTTON
  //--------------------------------------------------------------------
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  }

});
