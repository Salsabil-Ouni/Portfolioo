(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const bestEl = document.getElementById('best');

  const GRAVITY = 0.16;
  const FLAP = -4.2;
  const GAP = 250;
  const PIPE_W = 80;
  const SPEED = 1.5;
  const SPAWN_EVERY = 190;

  const sprite = new Image();
  sprite.src = 'gifs/cinnamoroll-main.webp';
  const roll = new Image();
  roll.src = 'gifs/cinnamon-roll.webp';

  let best = Number(localStorage.getItem('cloudhop-best') || 0);
  bestEl.textContent = best;

  let state, player, pipes, score, frame, bgClouds, grace, deadAt = 0;

  function reset() {
    state = 'ready';
    player = { x: 110, y: H / 2, vy: 0, size: 96 };
    pipes = [];
    score = 0;
    frame = 0;
    bgClouds = Array.from({ length: 6 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.8,
      r: 20 + Math.random() * 25,
      s: 0.2 + Math.random() * 0.4,
    }));
  }

  function flap() {
    if (state === 'ready') { state = 'play'; grace = 120; }
    if (state === 'dead') { if (Date.now() - deadAt > 600) reset(); return; }
    player.vy = FLAP;
  }

  function spawnPipe() {
    const top = 70 + Math.random() * (H - GAP - 140);
    pipes.push({ x: W + PIPE_W, top, rollTaken: false });
  }

  function die() {
    state = 'dead';
    deadAt = Date.now();
    if (score > best) {
      best = score;
      localStorage.setItem('cloudhop-best', best);
      bestEl.textContent = best;
    }
  }

  function update() {
    bgClouds.forEach(c => {
      c.x -= c.s;
      if (c.x < -c.r * 3) { c.x = W + c.r * 3; c.y = Math.random() * H * 0.8; }
    });
    if (state === 'ready') {
      player.y = H / 2 + Math.sin(frame / 15) * 8;
      return;
    }
    if (state !== 'play') return;

    // gentle gravity for the first second so there is time to react
    player.vy += grace > 0 ? GRAVITY * 0.4 : GRAVITY;
    if (grace > 0) grace--;
    player.y += player.vy;

    if (frame % SPAWN_EVERY === 0) spawnPipe();
    pipes.forEach(p => { p.x -= SPEED; });
    pipes = pipes.filter(p => p.x > -PIPE_W - 20);

    const r = player.size * 0.26;
    const cx = player.x;
    const cy = player.y;

    if (cy - r < 0 || cy + r > H) die();

    pipes.forEach(p => {
      const inX = cx + r > p.x && cx - r < p.x + PIPE_W;
      if (inX && (cy - r < p.top || cy + r > p.top + GAP)) die();

      const rx = p.x + PIPE_W / 2;
      const ry = p.top + GAP / 2;
      if (!p.rollTaken && Math.hypot(cx - rx, cy - ry) < r + 28) {
        p.rollTaken = true;
        score += 2;
      }
      if (!p.passed && p.x + PIPE_W < cx - r) {
        p.passed = true;
        score += 1;
      }
    });
  }

  function cloudBlob(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.arc(x + r * 0.9, y + r * 0.2, r * 0.8, 0, Math.PI * 2);
    ctx.arc(x - r * 0.9, y + r * 0.25, r * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawStormColumn(x, y, h, fromTop) {
    // stack of dark puffs filling the column
    const step = 36;
    for (let i = 0; i <= h / step; i++) {
      const py = fromTop ? y + h - i * step : y + i * step;
      cloudBlob(x + PIPE_W / 2, py, 30, i % 2 ? '#8e9bb8' : '#a3aec8');
    }
    ctx.fillStyle = '#a3aec8';
    ctx.fillRect(x + 8, fromTop ? y : y, PIPE_W - 16, h);
  }

  function draw() {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#bfe3ff');
    sky.addColorStop(1, '#ffe3f1');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    bgClouds.forEach(c => cloudBlob(c.x, c.y, c.r, 'rgba(255,255,255,0.8)'));

    pipes.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(p.x - 20, 0, PIPE_W + 40, p.top);
      ctx.clip();
      drawStormColumn(p.x, 0, p.top, true);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.rect(p.x - 20, p.top + GAP, PIPE_W + 40, H);
      ctx.clip();
      drawStormColumn(p.x, p.top + GAP, H - p.top - GAP, false);
      ctx.restore();

      if (!p.rollTaken) {
        const rx = p.x + PIPE_W / 2;
        const ry = p.top + GAP / 2 + Math.sin((frame + p.x) / 12) * 5;
        if (roll.complete && roll.naturalWidth) {
          ctx.drawImage(roll, rx - 28, ry - 28, 56, 56);
        } else {
          ctx.fillStyle = '#d99a5b';
          ctx.beginPath();
          ctx.arc(rx, ry, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // player
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(Math.max(-0.4, Math.min(0.6, player.vy * 0.07)));
    if (sprite.complete && sprite.naturalWidth) {
      const ratio = sprite.naturalHeight / sprite.naturalWidth;
      ctx.drawImage(sprite, -player.size / 2, -player.size * ratio / 2, player.size, player.size * ratio);
    } else {
      cloudBlob(0, 0, 18, '#fff');
    }
    ctx.restore();

    // HUD
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#5b7fa6';
    ctx.lineWidth = 3;
    ctx.font = '900 44px Nunito, sans-serif';
    ctx.strokeText(score, W / 2, 60);
    ctx.fillText(score, W / 2, 60);

    if (state === 'ready') banner('Tap to start!', 'Cinnamoroll is ready to fly');
    if (state === 'dead') banner('Oh no! Score ' + score, 'Tap to try again');
  }

  function banner(title, sub) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 190, H / 2 - 150, 380, 100, 20);
    ctx.fill();
    ctx.fillStyle = '#ff7eb6';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillText(title, W / 2, H / 2 - 105);
    ctx.fillStyle = '#5b7fa6';
    ctx.font = '800 16px Nunito, sans-serif';
    ctx.fillText(sub, W / 2, H / 2 - 70);
  }

  function loop() {
    frame++;
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('keydown', e => {
    if (!e.repeat && (e.code === 'Space' || e.code === 'ArrowUp')) { e.preventDefault(); flap(); }
  });
  canvas.addEventListener('pointerdown', e => { e.preventDefault(); flap(); });

  reset();
  loop();
})();
