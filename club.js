(() => {
  const groups = {
    all: ['全部', null],
    dice: ['骰子', ['liar', 'highroll', 'rushdice']],
    cards: ['撲克牌', ['highcard', 'oldmaid', 'texas', 'rummy']],
    board: ['桌遊', ['mahjong', 'uno', 'monopoly', 'memory']],
    arcade: ['遊樂場', ['roulette', 'slots', 'reaction', 'spark', 'orbit']],
    social: ['派對', ['chemistry', 'vibe', 'truth', 'story', 'doodle', 'quiz']],
  };
  let category = 'all';
  let query = '';
  const archived = new Set(['vibe', 'highcard', 'rushdice', 'spark']);
  const memberGames = new Set(['texas', 'roulette', 'slots']);
  const arena = document.querySelector('#partyGameArena');
  arena?.addEventListener('click', async event => {
    const button = event.target.closest('[data-party-mode]');
    if (button && memberGames.has(button.dataset.partyMode)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      try {
        const response = await fetch('/api/admin-status', { cache: 'no-store' });
        const access = response.ok ? await response.json() : {};
        if (access.memberAccess === true) {
          await selectPartyGame(button.dataset.partyMode);
          return;
        }
      } catch {}
      setView('membership');
      showToast('會員遊戲尚未開放；管理者可從管理頁登入後免費使用');
    }
  }, true);
  function enhance() {
    if (!arena || arena.querySelector('.club-toolbar')) return;
    const library = arena.querySelector('.party-game-library');
    const layout = arena.querySelector('.party-game-layout');
    if (!library || !layout) return;
    const intro = arena.querySelector('.party-game-intro');
    intro.querySelector('h3').textContent = '緣房間遊戲俱樂部';
    intro.querySelector('p').textContent = '免費遊玩 · 娛樂積分不可兌現';
    const share = document.createElement('button');
    share.className = 'ghost-action';
    share.type = 'button';
    share.textContent = '邀請朋友';
    share.addEventListener('click', async () => {
      const url = new URL(location.href);
      url.searchParams.set('room', state.currentRoomId);
      try {
        await navigator.clipboard.writeText(url.href);
        showToast('已複製房間連結');
      } catch {
        window.prompt('房間邀請連結', url.href);
      }
    });
    intro.querySelector('.party-intro-tools').prepend(share);
    arena.insertBefore(layout, library);
    if (layout.querySelector('.live-game-visual')) layout.querySelector('.party-game-hero')?.remove();
    const toolbar = document.createElement('div');
    toolbar.className = 'club-toolbar';
    toolbar.innerHTML = '<h3>選擇遊戲</h3><label>搜尋遊戲<input type="search" placeholder="骰子、麻將、撲克牌" aria-label="搜尋遊戲"></label><div class="club-categories" role="group" aria-label="遊戲分類"></div>';
    const filter = () => {
      let count = 0;
      library.querySelectorAll('[data-party-mode]').forEach(button => {
        const match = !archived.has(button.dataset.partyMode) && (!groups[category][1] || groups[category][1].includes(button.dataset.partyMode)) && button.textContent.toLowerCase().includes(query.toLowerCase());
        button.hidden = !match;
        if (match) count++;
      });
      empty.hidden = count > 0;
      toolbar.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    };
    for (const [id, [label]] of Object.entries(groups)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.category = id;
      button.addEventListener('click', () => { category = id; filter(); });
      toolbar.querySelector('.club-categories').append(button);
    }
    const input = toolbar.querySelector('input');
    input.value = query;
    input.addEventListener('input', () => { query = input.value; filter(); });
    const empty = document.createElement('p');
    empty.textContent = '找不到符合的遊戲，請更換關鍵字或分類。';
    empty.className = 'club-empty';
    arena.insertBefore(toolbar, library);
    arena.append(empty);
    for (const button of library.querySelectorAll('[data-party-mode]')) {
      if (memberGames.has(button.dataset.partyMode)) {
        const badge = button.querySelector('.party-mode-label');
        if (badge) badge.textContent = '會員限定 · 尚未開放';
      }
    }
    filter();
  }
  if (arena) new MutationObserver(enhance).observe(arena, { childList: true });
  enhance();
})();
