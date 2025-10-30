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

  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
  // --- GOLD TITLE + OLIVER SPIN LOGIC ---
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

  // --- PASSWORD PANEL LOGIC ---
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

  // Hide password button until Ollie G event
  if (btn) btn.style.display = 'none';

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

      // ✅ SECRET KEY: change background to Qing flag
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

      // ✅ MAIN PASSWORD: open about:blank containing GitHub via iframe
      if (entered === '902197') {
        msg.textContent = '✅ Access granted!';
        msg.style.color = 'lime';

        setTimeout(() => {
          panel.style.display = 'none';

          // Open blank tab and load GitHub in an iframe
          const newPage = window.open('about:blank', '_blank');
          if (newPage) {
            newPage.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>Blocked Page</title>
                <style>
                  body, html {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: black;
                  }
                  iframe {
                    border: none;
                    width: 100vw;
                    height: 100vh;
                  }
                </style>
              </head>
              <body>
              <iframe src="https://binglover.github.io"></iframe>
              </body>
              </html>
            `);
            newPage.document.close();
          }
        }, 500);
        return;
      }

      // ❌ WRONG PASSWORD
      msg.textContent = '❌ Incorrect password.';
      msg.style.color = 'red';
    });
  }

  // --- LEADERBOARD NAVIGATION ---
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
