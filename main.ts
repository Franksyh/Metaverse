import Phaser from 'phaser';
import './styles.css';

type Region = 'village' | 'forest' | 'ruins' | 'shore';
type PlayerTrait = 'heroic' | 'curious' | 'reckless' | 'shadow';
type CompanionCommand = '偵查前方' | '保護後方' | '火焰支援' | '收集資源';

interface WorldEvent {
  day: number;
  region: Region;
  text: string;
  pressure: number;
}

interface MemoryEntry {
  speaker: string;
  text: string;
  day: number;
}

interface Quest {
  id: string;
  title: string;
  detail: string;
  region: Region;
  status: 'active' | 'done';
  reward: string;
}

interface GameState {
  day: number;
  region: Region;
  reputation: number;
  trust: number;
  essence: number;
  relics: number;
  threat: number;
  playerTrait: PlayerTrait;
  dodgeRightCount: number;
  dodgeLeftCount: number;
  lastCompanionCommand: CompanionCommand;
  memories: MemoryEntry[];
  events: WorldEvent[];
  quests: Quest[];
}

const STORAGE_KEY = 'metaverse-adventure-state-v1';
const WORLD_W = 1600;
const WORLD_H = 1200;

const regionNames: Record<Region, string> = {
  village: '晨星村',
  forest: '北方森林',
  ruins: '失落神殿',
  shore: '星潮海岸'
};

const defaultState: GameState = {
  day: 7,
  region: 'village',
  reputation: 12,
  trust: 35,
  essence: 0,
  relics: 0,
  threat: 24,
  playerTrait: 'curious',
  dodgeRightCount: 0,
  dodgeLeftCount: 0,
  lastCompanionCommand: '偵查前方',
  memories: [
    { speaker: '守門人洛恩', text: '三天前有獵人從北方森林回來，說神殿在夜裡會發光。', day: 4 },
    { speaker: 'AI 隊友璃', text: '你習慣先觀察再行動，我會優先替你標記危險。', day: 6 }
  ],
  events: [
    { day: 7, region: 'forest', text: '北方森林出現會學習閃避方向的影獸。', pressure: 2 },
    { day: 7, region: 'shore', text: '星潮海岸漲潮，留下可用於施法的潮汐晶片。', pressure: 1 }
  ],
  quests: [
    {
      id: 'q-temple',
      title: '追尋失落神殿',
      detail: '向洛恩詢問線索，前往北方森林收集 3 個星核碎片。',
      region: 'forest',
      status: 'active',
      reward: '神殿座標'
    }
  ]
};

function loadState(): GameState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(defaultState);

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(stored) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

class AgentDirector {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  remember(speaker: string, text: string) {
    this.state.memories.unshift({ speaker, text, day: this.state.day });
    this.state.memories = this.state.memories.slice(0, 16);
    saveState(this.state);
  }

  answerNpc(input: string) {
    const normalized = input.trim().toLowerCase();
    const traitLine = this.traitLine();
    let response = '我會記住你的問題。這個世界最近變得不安定，先觀察事件流，再決定下一步。';

    if (normalized.includes('神殿') || normalized.includes('temple') || normalized.includes('失落')) {
      response = `失落神殿不在地圖上，它會跟著星潮移動。${this.memoryHint('森林')}今晚去北方森林找發光的石階。`;
      this.ensureQuest('q-temple-night', '夜探發光石階', '在北方森林找到發光石階，並帶回 2 個星核碎片。', 'forest', '神殿入口');
    } else if (normalized.includes('怪') || normalized.includes('boss') || normalized.includes('戰')) {
      const dodgeBias = this.state.dodgeRightCount > this.state.dodgeLeftCount ? '右側' : '左側';
      response = `影獸已經學到你常往${dodgeBias}閃。下一戰請先假動作，再讓璃用火焰支援打斷它。`;
      this.ensureQuest('q-shadow-beast', '反制影獸學習', '用不同方向閃避兩次，再命令璃施放火焰支援。', 'ruins', '影獸核心');
    } else if (normalized.includes('幫') || normalized.includes('村') || normalized.includes('救')) {
      response = `你的名聲正在上升。村民會替你開放工坊，我也會把你推薦給王國巡守。${traitLine}`;
      this.state.reputation += 4;
      this.state.trust += 3;
      this.ensureQuest('q-village-aid', '晨星村的委託', '收集 3 個星核碎片修復村口護盾。', 'village', '工坊權限');
    } else if (normalized.includes('偷') || normalized.includes('搶') || normalized.includes('通緝')) {
      response = '你如果走陰影路線，城市會開始懸賞你。這不是壞故事，但每一次交易都會更貴。';
      this.state.reputation -= 6;
      this.state.threat += 5;
      this.state.playerTrait = 'shadow';
      this.ensureQuest('q-bounty', '賞金獵人的腳步', '避開巡守，或用 5 點信任說服洛恩替你洗清嫌疑。', 'village', '灰色情報網');
    } else if (normalized.includes('隊友') || normalized.includes('璃') || normalized.includes('指令')) {
      response = `璃目前的指令是「${this.state.lastCompanionCommand}」。她信任度 ${this.state.trust}，會依照你的戰術偏好自主調整距離。`;
    } else if (normalized.includes('世界') || normalized.includes('發生')) {
      response = this.state.events.map((event) => `${regionNames[event.region]}：${event.text}`).join(' ');
    }

    this.remember('玩家', input || '沉默觀察');
    this.remember('守門人洛恩', response);
    this.evolveWorld();
    return response;
  }

  commandCompanion(command: CompanionCommand) {
    this.state.lastCompanionCommand = command;
    this.state.trust += command === '保護後方' ? 1 : 2;

    const replies: Record<CompanionCommand, string> = {
      偵查前方: '璃已放出感知脈衝，附近事件與陷阱會短暫顯示。',
      保護後方: '璃轉為護衛模式，影獸靠近時會替你吸引第一波攻擊。',
      火焰支援: '璃正在蓄積火焰符文，對學習型怪物特別有效。',
      收集資源: '璃會沿路收集星核碎片，但遇到敵人時會先回到你身邊。'
    };

    if (command === '收集資源') this.state.essence += 1;
    if (command === '火焰支援') this.state.threat = Math.max(0, this.state.threat - 2);

    this.remember('AI 隊友璃', replies[command]);
    this.evolveWorld();
    return replies[command];
  }

  registerDodge(direction: 'left' | 'right') {
    if (direction === 'right') this.state.dodgeRightCount += 1;
    if (direction === 'left') this.state.dodgeLeftCount += 1;
    this.state.threat += 1;
    saveState(this.state);
  }

  collectEssence() {
    this.state.essence += 1;
    this.state.trust += 1;

    if (this.state.essence >= 3) {
      const templeQuest = this.state.quests.find((quest) => quest.id === 'q-temple');
      if (templeQuest && templeQuest.status !== 'done') {
        templeQuest.status = 'done';
        this.state.relics += 1;
        this.ensureQuest('q-open-temple', '開啟神殿回聲門', '前往失落神殿，向回聲門交付神殿座標。', 'ruins', '第一枚紀元碎片');
        this.remember('世界意志', '北方森林的星核碎片回應了你，失落神殿入口開始顯形。');
      }
    }

    saveState(this.state);
  }

  resolveThreat() {
    this.state.threat = Math.max(0, this.state.threat - 4);
    this.state.reputation += 2;
    this.remember('世界意志', '你擊退了影獸，附近村落開始傳你的名字。');
    this.ensureQuest('q-adaptive-boss', '學習型首領', '影獸首領開始預判你的閃避方向，嘗試左右混合移動來破解它。', 'ruins', '適應核心');
    saveState(this.state);
  }

  evolveWorld() {
    const pressure = Math.max(1, Math.ceil(this.state.threat / 18));
    const eventTemplates: Array<Omit<WorldEvent, 'day'>> = [
      { region: 'village', text: '商隊請求護送，願意交換新的施法素材。', pressure },
      { region: 'forest', text: '森林路線改變，舊路長出會發光的藤蔓。', pressure: pressure + 1 },
      { region: 'ruins', text: '神殿回聲開始模仿玩家的戰鬥節奏。', pressure: pressure + 2 },
      { region: 'shore', text: '潮汐晶片漂上岸，能強化一次隊友技能。', pressure }
    ];
    const index = (this.state.memories.length + this.state.threat + this.state.day) % eventTemplates.length;
    const next = { ...eventTemplates[index], day: this.state.day };
    this.state.events.unshift(next);
    this.state.events = this.state.events.slice(0, 5);
    saveState(this.state);
  }

  private traitLine() {
    if (this.state.playerTrait === 'shadow') return '但你已被巡守注意，行動要快。';
    if (this.state.reputation > 24) return '你已經接近被稱為英雄。';
    if (this.state.trust > 50) return '璃對你的判斷越來越信任。';
    return '你還在定義自己會成為哪種冒險者。';
  }

  private memoryHint(keyword: string) {
    const memory = this.state.memories.find((item) => item.text.includes(keyword));
    return memory ? `${memory.speaker}曾說：${memory.text} ` : '';
  }

  private ensureQuest(id: string, title: string, detail: string, region: Region, reward: string) {
    if (this.state.quests.some((quest) => quest.id === id)) return;
    this.state.quests.unshift({ id, title, detail, region, reward, status: 'active' });
    this.state.quests = this.state.quests.slice(0, 7);
  }
}

class HudController {
  private root: HTMLElement;
  private state: GameState;
  private director: AgentDirector;
  private onCommand: (command: CompanionCommand) => void;
  private onSignal: (kind: 'scan' | 'craft' | 'reset') => void;
  private logLines: string[] = [];

  constructor(
    state: GameState,
    director: AgentDirector,
    onCommand: (command: CompanionCommand) => void,
    onSignal: (kind: 'scan' | 'craft' | 'reset') => void
  ) {
    this.root = document.querySelector('#hud-root') as HTMLElement;
    this.state = state;
    this.director = director;
    this.onCommand = onCommand;
    this.onSignal = onSignal;
  }

  mount() {
    this.root.innerHTML = `
      <section class="top-panel">
        <div class="brand">
          <span class="brand-mark"></span>
          <div>
            <strong>原宇宙：無限紀元</strong>
            <small id="region-label">晨星村</small>
          </div>
        </div>
        <div class="stat-row">
          <span><b id="essence-count">0</b> 星核</span>
          <span><b id="relic-count">0</b> 遺物</span>
          <span><b id="threat-count">0</b> 威脅</span>
        </div>
      </section>

      <section class="quest-panel">
        <div class="panel-title">
          <span>動態任務</span>
          <button class="icon-button" id="scan-button" aria-label="偵測世界事件" title="偵測世界事件">⌁</button>
        </div>
        <div id="quest-list"></div>
      </section>

      <section class="agent-panel" id="agent-panel">
        <div class="panel-title">
          <span>AI 對話</span>
          <button class="icon-button" id="close-dialog" aria-label="關閉對話" title="關閉對話">×</button>
        </div>
        <div id="agent-log" class="agent-log"></div>
        <form id="agent-form" class="agent-form">
          <input id="agent-input" autocomplete="off" inputmode="text" placeholder="問 NPC：神殿在哪？" />
          <button type="submit">送出</button>
        </form>
      </section>

      <section class="bottom-panel">
        <div class="joystick" id="joystick" aria-label="移動搖桿">
          <span id="joystick-thumb"></span>
        </div>
        <div class="action-stack">
          <button class="action-button" data-command="偵查前方">偵查</button>
          <button class="action-button" data-command="保護後方">護衛</button>
          <button class="action-button primary" data-command="火焰支援">火焰</button>
          <button class="action-button" data-command="收集資源">收集</button>
        </div>
        <div class="skill-stack">
          <button class="round-button" id="talk-button" aria-label="與 NPC 對話">說</button>
          <button class="round-button" id="craft-button" aria-label="製作武器">造</button>
        </div>
      </section>

      <section class="world-feed">
        <div id="feed-list"></div>
      </section>
    `;

    this.bindEvents();
    this.pushLog('洛恩', '旅人，直接問我神殿、怪物、村莊或世界事件。我會記住你的選擇。');
    this.render();
  }

  render() {
    const regionLabel = document.querySelector('#region-label') as HTMLElement;
    const essence = document.querySelector('#essence-count') as HTMLElement;
    const relics = document.querySelector('#relic-count') as HTMLElement;
    const threat = document.querySelector('#threat-count') as HTMLElement;
    const questList = document.querySelector('#quest-list') as HTMLElement;
    const feedList = document.querySelector('#feed-list') as HTMLElement;

    regionLabel.textContent = regionNames[this.state.region];
    essence.textContent = String(this.state.essence);
    relics.textContent = String(this.state.relics);
    threat.textContent = String(this.state.threat);

    questList.innerHTML = this.state.quests
      .slice(0, 3)
      .map(
        (quest) => `
          <article class="quest-item ${quest.status === 'done' ? 'is-done' : ''}">
            <strong>${quest.title}</strong>
            <span>${quest.detail}</span>
            <em>${regionNames[quest.region]} · 獎勵：${quest.reward}</em>
          </article>
        `
      )
      .join('');

    feedList.innerHTML = this.state.events
      .slice(0, 3)
      .map((event) => `<p><b>${regionNames[event.region]}</b>${event.text}</p>`)
      .join('');
  }

  showDialog() {
    document.querySelector('#agent-panel')?.classList.add('is-open');
    setTimeout(() => (document.querySelector('#agent-input') as HTMLInputElement | null)?.focus(), 80);
  }

  hideDialog() {
    document.querySelector('#agent-panel')?.classList.remove('is-open');
  }

  pushLog(speaker: string, text: string) {
    this.logLines.unshift(`<p><b>${speaker}</b>${text}</p>`);
    this.logLines = this.logLines.slice(0, 8);
    const log = document.querySelector('#agent-log') as HTMLElement | null;
    if (log) log.innerHTML = this.logLines.join('');
  }

  showToast(text: string) {
    document.querySelectorAll('.toast').forEach((item) => item.remove());
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    document.body.append(toast);
    setTimeout(() => toast.classList.add('is-visible'), 20);
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 240);
    }, 2600);
  }

  private bindEvents() {
    document.querySelector('#close-dialog')?.addEventListener('click', () => this.hideDialog());
    document.querySelector('#talk-button')?.addEventListener('click', () => this.showDialog());
    document.querySelector('#scan-button')?.addEventListener('click', () => this.onSignal('scan'));
    document.querySelector('#craft-button')?.addEventListener('click', () => this.onSignal('craft'));

    document.querySelectorAll<HTMLButtonElement>('.action-button').forEach((button) => {
      button.addEventListener('click', () => {
        const command = button.dataset.command as CompanionCommand;
        const reply = this.director.commandCompanion(command);
        this.onCommand(command);
        this.pushLog('璃', reply);
        this.showToast(reply);
        this.render();
      });
    });

    document.querySelector('#agent-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('#agent-input') as HTMLInputElement;
      const prompt = input.value.trim();
      if (!prompt) return;
      this.pushLog('你', prompt);
      const answer = this.director.answerNpc(prompt);
      this.pushLog('洛恩', answer);
      input.value = '';
      this.render();
    });
  }
}

class MainScene extends Phaser.Scene {
  private state!: GameState;
  private director!: AgentDirector;
  private hud!: HudController;
  private player!: Phaser.GameObjects.Sprite;
  private companion!: Phaser.GameObjects.Sprite;
  private monster!: Phaser.GameObjects.Sprite;
  private interactables: Phaser.GameObjects.Group | null = null;
  private resourceGroup: Phaser.GameObjects.Group | null = null;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private joystick = { active: false, x: 0, y: 0, dx: 0, dy: 0 };
  private companionMode: CompanionCommand = '偵查前方';
  private scanUntil = 0;
  private lastAttack = 0;
  private bgLayer!: Phaser.GameObjects.Group;
  private scanMarkers!: Phaser.GameObjects.Group;

  constructor() {
    super('main');
  }

  create() {
    this.state = loadState();
    this.director = new AgentDirector(this.state);
    this.setupCamera();
    this.createProceduralSprites();
    this.drawWorld();
    this.scanMarkers = this.add.group();
    this.createEntities();
    this.bindInput();

    this.hud = new HudController(
      this.state,
      this.director,
      (command) => this.applyCompanionCommand(command),
      (kind) => this.handleHudSignal(kind)
    );
    this.hud.mount();
    this.hud.showToast('拖動左下搖桿探索，靠近 NPC 或星核會自動互動。');
  }

  update(time: number, delta: number) {
    const dt = delta / 1000;
    this.movePlayer(dt);
    this.updateRegion();
    this.updateCompanion(dt);
    this.updateMonster(time, dt);
    this.checkResourceCollection();
    this.checkNpcProximity();
    this.clearExpiredScan();
  }

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setZoom(1);
    this.cameras.main.setBackgroundColor('#07121f');
  }

  private createProceduralSprites() {
    const makeSprite = (key: string, draw: (ctx: CanvasRenderingContext2D) => void) => {
      const canvas = document.createElement('canvas');
      canvas.width = 96;
      canvas.height = 96;
      const ctx = canvas.getContext('2d')!;
      draw(ctx);
      this.textures.addCanvas(key, canvas);
    };

    makeSprite('player', (ctx) => {
      const gradient = ctx.createLinearGradient(0, 0, 96, 96);
      gradient.addColorStop(0, '#7ee7ff');
      gradient.addColorStop(1, '#d7ff7e');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(48, 34, 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#152035';
      ctx.beginPath();
      ctx.roundRect(23, 48, 50, 34, 16);
      ctx.fill();
      ctx.strokeStyle = '#ecfff5';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(36, 55);
      ctx.lineTo(48, 72);
      ctx.lineTo(62, 50);
      ctx.stroke();
    });

    makeSprite('companion', (ctx) => {
      ctx.fillStyle = '#ffcf6e';
      ctx.beginPath();
      ctx.arc(48, 48, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2b1b3b';
      ctx.beginPath();
      ctx.arc(48, 48, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(48, 48, 34, Math.PI * 0.2, Math.PI * 1.45);
      ctx.stroke();
    });

    makeSprite('monster', (ctx) => {
      const gradient = ctx.createRadialGradient(45, 42, 8, 48, 48, 45);
      gradient.addColorStop(0, '#ff6b8a');
      gradient.addColorStop(1, '#25133f');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(48, 8);
      ctx.lineTo(84, 36);
      ctx.lineTo(74, 82);
      ctx.lineTo(28, 82);
      ctx.lineTo(12, 36);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f8f0ff';
      ctx.beginPath();
      ctx.arc(38, 43, 5, 0, Math.PI * 2);
      ctx.arc(58, 43, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    makeSprite('npc', (ctx) => {
      ctx.fillStyle = '#b3f2a2';
      ctx.beginPath();
      ctx.arc(48, 30, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#35522f';
      ctx.beginPath();
      ctx.roundRect(24, 46, 52, 38, 8);
      ctx.fill();
      ctx.fillStyle = '#faf8de';
      ctx.fillRect(35, 52, 26, 7);
      ctx.fillRect(35, 64, 18, 6);
    });

    makeSprite('essence', (ctx) => {
      const gradient = ctx.createRadialGradient(48, 42, 4, 48, 48, 38);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.45, '#64f3ff');
      gradient.addColorStop(1, '#3672ff');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(48, 8);
      ctx.lineTo(74, 48);
      ctx.lineTo(48, 88);
      ctx.lineTo(22, 48);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#d9fff9';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }

  private drawWorld() {
    this.bgLayer = this.add.group();
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x0b1828, 0x0b1828, 0x102c3b, 0x142737, 1);
    sky.fillRect(0, 0, WORLD_W, WORLD_H);
    this.bgLayer.add(sky);

    this.drawRegion(0, 0, 770, 560, 0x233a2e, '晨星村', 'village');
    this.drawRegion(720, 0, 880, 620, 0x173827, '北方森林', 'forest');
    this.drawRegion(0, 540, 820, 660, 0x243146, '星潮海岸', 'shore');
    this.drawRegion(760, 540, 840, 660, 0x31243d, '失落神殿', 'ruins');

    const path = this.add.graphics();
    path.lineStyle(18, 0xd4b46f, 0.28);
    path.beginPath();
    path.moveTo(220, 220);
    [
      [360, 250],
      [520, 330],
      [700, 370],
      [980, 270],
      [1120, 205],
      [1270, 330],
      [1250, 570],
      [1220, 780],
      [960, 810],
      [790, 760],
      [540, 690],
      [370, 820],
      [230, 1000]
    ].forEach(([px, py]) => path.lineTo(px, py));
    path.strokePath();
    this.bgLayer.add(path);

    for (let i = 0; i < 160; i += 1) {
      const star = this.add.circle(
        Phaser.Math.Between(16, WORLD_W - 16),
        Phaser.Math.Between(16, WORLD_H - 16),
        Phaser.Math.FloatBetween(1, 2.8),
        Phaser.Math.RND.pick([0x9fe8ff, 0xd9ffc3, 0xffe2a8]),
        Phaser.Math.FloatBetween(0.18, 0.42)
      );
      this.bgLayer.add(star);
    }
  }

  private drawRegion(x: number, y: number, w: number, h: number, color: number, label: string, region: Region) {
    const g = this.add.graphics();
    g.fillStyle(color, 0.78);
    g.fillRoundedRect(x + 18, y + 18, w - 36, h - 36, 18);
    g.lineStyle(2, 0xffffff, 0.08);
    g.strokeRoundedRect(x + 18, y + 18, w - 36, h - 36, 18);

    const text = this.add.text(x + 42, y + 42, label, {
      fontFamily: 'system-ui, sans-serif',
      color: '#f4f7ee',
      fontSize: '28px',
      fontStyle: '700'
    });
    text.setAlpha(0.34);
    text.setData('region', region);
    this.bgLayer.add(g);
    this.bgLayer.add(text);
  }

  private createEntities() {
    this.resourceGroup = this.add.group();
    this.interactables = this.add.group();

    const npc = this.add.sprite(265, 260, 'npc').setScale(0.8);
    npc.setData('type', 'npc');
    this.interactables.add(npc);
    this.addLabel(npc, '洛恩');

    const smith = this.add.sprite(430, 385, 'npc').setScale(0.72).setTint(0xffd37a);
    smith.setData('type', 'npc');
    this.interactables.add(smith);
    this.addLabel(smith, '工坊');

    this.player = this.add.sprite(240, 360, 'player').setScale(0.72);
    this.player.setDepth(10);

    this.companion = this.add.sprite(190, 405, 'companion').setScale(0.48);
    this.companion.setDepth(9);

    this.monster = this.add.sprite(1190, 750, 'monster').setScale(0.8);
    this.monster.setDepth(8);
    this.addLabel(this.monster, '影獸');

    const resourcePositions = [
      [930, 205],
      [1120, 420],
      [675, 930],
      [1370, 640],
      [1010, 1010],
      [570, 650],
      [1460, 980]
    ];
    resourcePositions.forEach(([x, y], index) => {
      const crystal = this.add.sprite(x, y, 'essence').setScale(0.48);
      crystal.setData('id', index);
      this.resourceGroup?.add(crystal);
      this.tweens.add({
        targets: crystal,
        y: y - 12,
        duration: 1300 + index * 80,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut'
      });
    });

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  private addLabel(target: Phaser.GameObjects.Sprite, text: string) {
    const label = this.add.text(target.x, target.y - 58, text, {
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff',
      fontSize: '18px',
      fontStyle: '700',
      stroke: '#07121f',
      strokeThickness: 4
    });
    label.setOrigin(0.5);
    label.setDepth(20);
    this.tweens.add({
      targets: label,
      alpha: 0.68,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }

  private bindInput() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,E,Q') as Record<string, Phaser.Input.Keyboard.Key>;

    const joystick = document.querySelector('#joystick') as HTMLElement | null;
    const thumb = document.querySelector('#joystick-thumb') as HTMLElement | null;
    if (!joystick || !thumb) return;

    const updateStick = (clientX: number, clientY: number) => {
      const rect = joystick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const max = rect.width * 0.34;
      const dx = Phaser.Math.Clamp(clientX - cx, -max, max);
      const dy = Phaser.Math.Clamp(clientY - cy, -max, max);
      this.joystick.dx = dx / max;
      this.joystick.dy = dy / max;
      thumb.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    joystick.addEventListener('pointerdown', (event) => {
      this.joystick.active = true;
      updateStick(event.clientX, event.clientY);
    });
    window.addEventListener('pointermove', (event) => {
      if (!this.joystick.active) return;
      updateStick(event.clientX, event.clientY);
    });
    window.addEventListener('pointerup', () => {
      this.joystick.active = false;
      this.joystick.dx = 0;
      this.joystick.dy = 0;
      thumb.style.transform = 'translate(0, 0)';
    });
  }

  private movePlayer(dt: number) {
    let dx = 0;
    let dy = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) dx -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) dx += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) dy -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) dy += 1;

    if (this.joystick.active) {
      dx += this.joystick.dx;
      dy += this.joystick.dy;
    }

    const length = Math.hypot(dx, dy) || 1;
    const speed = 250;
    const vx = (dx / length) * speed * dt;
    const vy = (dy / length) * speed * dt;

    if (Math.abs(vx) > 4) this.director.registerDodge(vx > 0 ? 'right' : 'left');

    this.player.x = Phaser.Math.Clamp(this.player.x + vx, 40, WORLD_W - 40);
    this.player.y = Phaser.Math.Clamp(this.player.y + vy, 40, WORLD_H - 40);
    this.player.rotation = Phaser.Math.Linear(this.player.rotation, dx * 0.12, 0.12);
  }

  private updateRegion() {
    const x = this.player.x;
    const y = this.player.y;
    let region: Region = 'village';
    if (x > 720 && y < 620) region = 'forest';
    if (x < 820 && y >= 540) region = 'shore';
    if (x >= 760 && y >= 540) region = 'ruins';

    if (region !== this.state.region) {
      this.state.region = region;
      this.hud?.render();
      this.hud?.showToast(`進入${regionNames[region]}`);
      saveState(this.state);
    }
  }

  private updateCompanion(dt: number) {
    const desiredDistance = this.companionMode === '偵查前方' ? 92 : this.companionMode === '保護後方' ? 118 : 70;
    const angle = this.companionMode === '保護後方' ? Math.PI * 0.78 : -Math.PI * 0.72;
    const targetX = this.player.x + Math.cos(angle) * desiredDistance;
    const targetY = this.player.y + Math.sin(angle) * desiredDistance;
    this.companion.x += (targetX - this.companion.x) * Math.min(1, dt * 4.2);
    this.companion.y += (targetY - this.companion.y) * Math.min(1, dt * 4.2);
    this.companion.rotation += dt * 2.2;
  }

  private updateMonster(time: number, dt: number) {
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.monster.x, this.monster.y);
    if (distance > 470) {
      this.monster.rotation += dt * 0.4;
      return;
    }

    const dx = this.player.x - this.monster.x;
    const dy = this.player.y - this.monster.y;
    const length = Math.hypot(dx, dy) || 1;
    const adaptBias = this.state.dodgeRightCount > this.state.dodgeLeftCount ? 55 : -55;
    const speed = 95 + Math.min(90, this.state.threat * 1.4);
    this.monster.x += ((dx + adaptBias) / length) * speed * dt;
    this.monster.y += (dy / length) * speed * dt;
    this.monster.rotation = Math.sin(time / 180) * 0.12;

    if (distance < 72 && time - this.lastAttack > 1400) {
      this.lastAttack = time;
      if (this.companionMode === '火焰支援') {
        this.director.resolveThreat();
        this.burst(this.monster.x, this.monster.y, 0xffcf6e);
        this.monster.setPosition(Phaser.Math.Between(950, 1450), Phaser.Math.Between(640, 1040));
        this.hud.showToast('璃的火焰支援打斷了影獸學習。');
      } else {
        this.state.threat += 5;
        this.hud.showToast('影獸預判了你的閃避，威脅上升。');
        this.hud.pushLog('影獸', '它正在記住你的移動節奏。試著左右混合閃避，或命令璃使用火焰支援。');
      }
      this.hud.render();
      saveState(this.state);
    }
  }

  private checkResourceCollection() {
    this.resourceGroup?.getChildren().forEach((child) => {
      const crystal = child as Phaser.GameObjects.Sprite;
      if (!crystal.visible) return;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, crystal.x, crystal.y);
      if (distance < 58) {
        crystal.setVisible(false);
        this.director.collectEssence();
        this.burst(crystal.x, crystal.y, 0x64f3ff);
        this.hud.showToast('取得星核碎片。世界記住了你的探索路線。');
        this.hud.render();
      }
    });
  }

  private checkNpcProximity() {
    let nearNpc = false;
    this.interactables?.getChildren().forEach((child) => {
      const npc = child as Phaser.GameObjects.Sprite;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      nearNpc = nearNpc || distance < 86;
    });

    if (nearNpc && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
      this.hud.showDialog();
    }
  }

  private applyCompanionCommand(command: CompanionCommand) {
    this.companionMode = command;
    if (command === '偵查前方') this.scanUntil = performance.now() + 3500;
    if (command === '火焰支援') this.burst(this.companion.x, this.companion.y, 0xffcf6e);
    if (command === '收集資源') this.pullNearestCrystal();
    if (command === '偵查前方') this.refreshScanMarkers();
    this.hud.render();
  }

  private handleHudSignal(kind: 'scan' | 'craft' | 'reset') {
    if (kind === 'scan') {
      this.director.evolveWorld();
      this.scanUntil = performance.now() + 4200;
      this.refreshScanMarkers();
      this.hud.showToast('世界事件已刷新。發光區域代表高壓力事件。');
      this.hud.render();
      return;
    }

    if (kind === 'craft') {
      if (this.state.essence < 2) {
        this.hud.showToast('需要 2 個星核碎片才能製作符文短刃。');
        return;
      }
      this.state.essence -= 2;
      this.state.reputation += 2;
      this.state.threat = Math.max(0, this.state.threat - 3);
      this.director.remember('工坊', '你製作了符文短刃，影獸對近戰突襲的適應速度下降。');
      this.burst(this.player.x, this.player.y, 0xd7ff7e);
      this.hud.showToast('製作完成：符文短刃。');
      this.hud.render();
    }
  }

  private pullNearestCrystal() {
    const crystals = this.resourceGroup?.getChildren() as Phaser.GameObjects.Sprite[] | undefined;
    const nearest = crystals
      ?.filter((crystal) => crystal.visible)
      .sort(
        (a, b) =>
          Phaser.Math.Distance.Between(this.player.x, this.player.y, a.x, a.y) -
          Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y)
      )[0];
    if (!nearest) return;
    this.tweens.add({
      targets: nearest,
      x: this.player.x,
      y: this.player.y,
      duration: 900,
      ease: 'Sine.inOut'
    });
  }

  private burst(x: number, y: number, color: number) {
    for (let i = 0; i < 24; i += 1) {
      const particle = this.add.circle(x, y, Phaser.Math.FloatBetween(3, 8), color, 0.9);
      particle.setDepth(30);
      this.tweens.add({
        targets: particle,
        x: x + Phaser.Math.Between(-120, 120),
        y: y + Phaser.Math.Between(-120, 120),
        alpha: 0,
        scale: 0.2,
        duration: Phaser.Math.Between(450, 900),
        ease: 'Cubic.out',
        onComplete: () => particle.destroy()
      });
    }
  }

  private refreshScanMarkers() {
    this.scanMarkers.clear(true, true);
    const centers: Record<Region, { x: number; y: number; color: number }> = {
      village: { x: 360, y: 280, color: 0xb3f2a2 },
      forest: { x: 1160, y: 270, color: 0x64f3ff },
      shore: { x: 380, y: 840, color: 0xffcf6e },
      ruins: { x: 1180, y: 845, color: 0xff6b8a }
    };

    this.state.events.forEach((event, index) => {
      const center = centers[event.region];
      const radius = 58 + event.pressure * 18;
      const marker = this.add.circle(center.x, center.y, radius, center.color, 0.18);
      marker.setStrokeStyle(3, center.color, 0.72);
      marker.setDepth(4);
      this.scanMarkers.add(marker);
      this.tweens.add({
        targets: marker,
        alpha: 0.04,
        scale: 1.45,
        duration: 820 + index * 180,
        yoyo: true,
        repeat: 4,
        ease: 'Sine.inOut'
      });
    });
  }

  private clearExpiredScan() {
    if (!this.scanUntil || performance.now() <= this.scanUntil) return;
    this.scanUntil = 0;
    this.scanMarkers.clear(true, true);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: false,
  antialias: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    powerPreference: 'high-performance'
  },
  scene: [MainScene]
};

new Phaser.Game(config);
