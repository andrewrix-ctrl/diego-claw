// Direction B — "Neon Arcade Lab"
// Near-black, neon cyan/magenta/lime gradients, Fraunces display + JetBrains Mono,
// CRT scanlines, glow, terminal panels. Same content, different volume.

const B = {
  bg: '#0a0a14',
  bg2: '#10101c',
  panel: 'rgba(255,255,255,.04)',
  panelStrong: 'rgba(255,255,255,.06)',
  line: 'rgba(255,255,255,.1)',
  text: '#f4f1ea',
  textDim: 'rgba(244,241,234,.62)',
  textDimmer: 'rgba(244,241,234,.4)',
  cyan: '#00e5ff',
  magenta: '#ff2bd6',
  lime: '#b6ff3c',
  amber: '#ffb84a',
  red: '#ff4b6b',
  violet: '#9b6bff',
  serif: "'Fraunces', 'Times New Roman', serif",
  sans: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

(function injectNeonStyles() {
  if (document.getElementById('neon-styles')) return;
  const s = document.createElement('style');
  s.id = 'neon-styles';
  s.textContent = `
    .neon { font-family: ${B.sans}; color: ${B.text}; background: ${B.bg}; }
    .neon .serif { font-family: ${B.serif}; font-weight: 400; letter-spacing: -0.02em; }
    .neon .serif-i { font-family: ${B.serif}; font-style: italic; font-weight: 400; letter-spacing: -0.02em; }
    .neon .mono { font-family: ${B.mono}; letter-spacing: 0; }
    @keyframes neon-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes neon-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes neon-flicker { 0%,18%,22%,25%,53%,57%,100%{opacity:1} 19%,24%,55%{opacity:.7} }
    @keyframes neon-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes neon-glow { 0%,100%{filter:drop-shadow(0 0 18px var(--gl,${B.cyan}))} 50%{filter:drop-shadow(0 0 30px var(--gl,${B.cyan}))} }
    @keyframes neon-scan { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
    @keyframes neon-shine { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    @keyframes neon-wiggle { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
    .neon .glow-cyan { box-shadow: 0 0 0 1px ${B.cyan}, 0 0 22px rgba(0,229,255,.4), inset 0 0 22px rgba(0,229,255,.08); }
    .neon .glow-magenta { box-shadow: 0 0 0 1px ${B.magenta}, 0 0 22px rgba(255,43,214,.4), inset 0 0 22px rgba(255,43,214,.08); }
    .neon .glow-lime { box-shadow: 0 0 0 1px ${B.lime}, 0 0 22px rgba(182,255,60,.35), inset 0 0 22px rgba(182,255,60,.08); }
    .neon .panel {
      background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
      border: 1px solid ${B.line}; border-radius: 16px; backdrop-filter: blur(8px);
    }
    .neon .panel-strong {
      background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
      border: 1px solid rgba(255,255,255,.14); border-radius: 16px;
    }
    .neon .btn-neon {
      display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 999px;
      background: linear-gradient(135deg, ${B.magenta}, ${B.violet}); color: ${B.text};
      font-weight: 600; font-size: 15px; text-decoration: none; border: 0; cursor: pointer;
      box-shadow: 0 0 0 1px rgba(255,255,255,.2), 0 0 30px rgba(255,43,214,.45), 0 12px 30px -8px rgba(255,43,214,.6);
      transition: transform .2s, box-shadow .2s;
    }
    .neon .btn-neon:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(255,255,255,.3), 0 0 40px rgba(255,43,214,.7), 0 18px 36px -8px rgba(255,43,214,.7); }
    .neon .btn-ghost-neon {
      display: inline-flex; align-items: center; gap: 8px; padding: 13px 21px; border-radius: 999px;
      background: rgba(255,255,255,.04); color: ${B.text}; font-weight: 500; font-size: 15px;
      text-decoration: none; border: 1px solid ${B.line}; cursor: pointer;
      transition: background .2s, border-color .2s;
    }
    .neon .btn-ghost-neon:hover { background: rgba(255,255,255,.08); border-color: ${B.cyan}; }
    .neon .chip-neon {
      display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 999px;
      background: rgba(255,255,255,.05); border: 1px solid ${B.line}; font-family: ${B.mono};
      font-size: 12px; color: ${B.textDim}; letter-spacing: 0;
    }
    .neon .gradient-text {
      background: linear-gradient(92deg, ${B.cyan}, ${B.magenta}, ${B.lime}, ${B.cyan});
      background-size: 300% 100%;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: neon-shine 16s linear infinite;
    }
    .neon .grid-bg {
      background-image:
        linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .neon .scanlines::after {
      content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
      background: repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 3px);
      mix-blend-mode: overlay;
    }
    .neon .crt {
      position: relative;
      background: radial-gradient(ellipse at center, ${B.bg2} 0%, ${B.bg} 100%);
    }
    .neon .crt::before {
      content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit;
      background: radial-gradient(ellipse at 50% 0%, rgba(0,229,255,.06), transparent 60%),
                  radial-gradient(ellipse at 50% 100%, rgba(255,43,214,.05), transparent 60%);
    }
    /* ─── Tweak: motion off ─── */
    .neon[data-motion="off"] *, .neon[data-motion="off"] *::before, .neon[data-motion="off"] *::after {
      animation: none !important;
      transition: none !important;
    }
    /* ─── Tweak: scanlines off ─── */
    .neon[data-scanlines="off"] .scanlines::after { display: none; }
    /* ─── Tweak: density compact ─── */
    .neon[data-density="compact"] section { padding-top: 30px !important; padding-bottom: 30px !important; }
    /* ─── Tweak: palette sunset (amber/coral/violet) ─── */
    .neon[data-palette="sunset"] .gradient-text {
      background: linear-gradient(92deg, ${B.amber}, ${B.red}, ${B.violet}, ${B.amber}) !important;
      background-size: 300% 100% !important;
      -webkit-background-clip: text !important; background-clip: text !important; color: transparent !important;
    }
    .neon[data-palette="sunset"] .btn-neon {
      background: linear-gradient(135deg, ${B.red}, ${B.amber}) !important;
      box-shadow: 0 0 0 1px rgba(255,255,255,.2), 0 0 30px rgba(255,184,74,.5), 0 12px 30px -8px rgba(255,75,107,.6) !important;
    }
    /* ─── Tweak: palette matrix (lime/cyan only) ─── */
    .neon[data-palette="matrix"] .gradient-text {
      background: linear-gradient(92deg, ${B.lime}, ${B.cyan}, ${B.lime}) !important;
      background-size: 300% 100% !important;
      -webkit-background-clip: text !important; background-clip: text !important; color: transparent !important;
    }
    .neon[data-palette="matrix"] .btn-neon {
      background: linear-gradient(135deg, ${B.lime}, ${B.cyan}) !important;
      color: ${B.bg} !important;
      box-shadow: 0 0 0 1px rgba(255,255,255,.2), 0 0 30px rgba(182,255,60,.5), 0 12px 30px -8px rgba(0,229,255,.6) !important;
    }
    /* ─── Sparkle particle ─── */
    @keyframes neon-spark {
      0% { transform: translate(-50%,-50%) scale(0.3) rotate(0deg); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(1.4) rotate(180deg); opacity: 0; }
    }
    .neon-spark {
      position: fixed; pointer-events: none; z-index: 9999;
      font-size: 20px; animation: neon-spark .9s ease-out forwards;
      filter: drop-shadow(0 0 8px currentColor);
    }
    /* ─── Konami lobster fall ─── */
    @keyframes neon-fall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
    .neon-fall-lob {
      position: fixed; top: 0; font-size: 48px; pointer-events: none; z-index: 9998;
      animation: neon-fall linear forwards;
      filter: drop-shadow(0 0 18px ${B.magenta});
    }
  `;
  document.head.appendChild(s);
})();

// Lobster — neon-stroked outline version.
function NeonLobster({ size = 200, wave = false, style = {} }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{
      ...style,
      animation: wave ? 'neon-wiggle 2.6s ease-in-out infinite' : undefined,
      transformOrigin: 'center bottom',
      filter: `drop-shadow(0 0 12px ${B.magenta}) drop-shadow(0 0 24px rgba(255,43,214,.5))`,
    }}>
      <defs>
        <linearGradient id="neonLobBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={B.magenta}/>
          <stop offset="60%" stopColor={B.violet}/>
          <stop offset="100%" stopColor={B.cyan}/>
        </linearGradient>
      </defs>
      <path d="M100 60 C 70 60 55 90 60 120 C 64 150 80 175 100 175 C 120 175 136 150 140 120 C 145 90 130 60 100 60 Z" fill="url(#neonLobBody)" opacity=".18" stroke={B.magenta} strokeWidth="2.5"/>
      <ellipse cx="100" cy="62" rx="32" ry="22" fill="none" stroke={B.cyan} strokeWidth="2.5"/>
      <path d="M85 50 C 75 35 65 28 50 22" fill="none" stroke={B.cyan} strokeWidth="2"/>
      <path d="M115 50 C 125 35 135 28 150 22" fill="none" stroke={B.cyan} strokeWidth="2"/>
      <circle cx="50" cy="22" r="3.5" fill={B.lime}/>
      <circle cx="150" cy="22" r="3.5" fill={B.lime}/>
      <circle cx="90" cy="60" r="6" fill={B.bg} stroke={B.cyan} strokeWidth="2"/>
      <circle cx="110" cy="60" r="6" fill={B.bg} stroke={B.cyan} strokeWidth="2"/>
      <circle cx="91" cy="61" r="2.5" fill={B.lime}/>
      <circle cx="111" cy="61" r="2.5" fill={B.lime}/>
      <path d="M92 72 Q 100 78 108 72" fill="none" stroke={B.cyan} strokeWidth="2" strokeLinecap="round"/>
      <g style={{ transformOrigin: '55px 110px', animation: wave ? 'neon-bob 2.2s ease-in-out infinite' : undefined }}>
        <path d="M62 92 C 45 95 30 100 30 120" fill="none" stroke={B.magenta} strokeWidth="2.5"/>
        <path d="M30 120 C 14 116 6 128 12 140 C 18 152 36 152 38 138 L 32 132 L 38 126 Z" fill="none" stroke={B.magenta} strokeWidth="2.5" strokeLinejoin="round"/>
      </g>
      <g style={{ transformOrigin: '145px 105px', animation: wave ? 'neon-wiggle 1.6s ease-in-out infinite' : undefined }}>
        <path d="M138 92 C 155 92 172 95 180 80" fill="none" stroke={B.magenta} strokeWidth="2.5"/>
        <path d="M180 80 C 196 78 200 64 192 52 C 184 40 168 46 168 60 L 176 64 L 170 72 Z" fill="none" stroke={B.magenta} strokeWidth="2.5" strokeLinejoin="round"/>
      </g>
      <path d="M72 130 L 60 150" stroke={B.cyan} strokeWidth="2" strokeLinecap="round"/>
      <path d="M80 145 L 70 162" stroke={B.cyan} strokeWidth="2" strokeLinecap="round"/>
      <path d="M128 130 L 140 150" stroke={B.cyan} strokeWidth="2" strokeLinecap="round"/>
      <path d="M120 145 L 130 162" stroke={B.cyan} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function NeonNav({ active = 'Home' }) {
  const links = ['Home', 'About', 'Blog', 'Calendar', 'Projects', 'Contact'];
  return (
    <div style={{
      position: 'absolute', top: 18, left: 18, right: 18, height: 60,
      display: 'flex', alignItems: 'center', padding: '0 22px', borderRadius: 14,
      background: 'rgba(10,10,20,.7)', border: `1px solid ${B.line}`,
      backdropFilter: 'blur(12px)', zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 18 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${B.magenta},${B.violet})`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
          boxShadow: `0 0 16px rgba(255,43,214,.5)`,
        }}>🦞</span>
        <span className="serif" style={{ fontSize: 24 }}>diego.claw</span>
        <span className="mono" style={{ fontSize: 11, color: B.cyan, marginLeft: 6 }}>v2.0</span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
        {links.map(l => (
          <a key={l} href="#" style={{
            padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            background: l === active ? 'rgba(0,229,255,.12)' : 'transparent',
            color: l === active ? B.cyan : B.textDim,
            border: l === active ? `1px solid rgba(0,229,255,.4)` : '1px solid transparent',
          }}>{l}</a>
        ))}
      </div>
      <div style={{ marginLeft: 14 }}>
        <span className="chip-neon" style={{ borderColor: 'rgba(182,255,60,.4)', color: B.lime, background: 'rgba(182,255,60,.06)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: B.lime, animation: 'neon-pulse 1.4s infinite' }}/> online
        </span>
      </div>
    </div>
  );
}

function NeonHero() {
  return (
    <section className="grid-bg" style={{ position: 'relative', padding: '120px 70px 60px', overflow: 'hidden' }}>
      {/* glow blobs */}
      <div style={{
        position: 'absolute', top: -100, right: -60, width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .35, filter: 'blur(60px)',
      }}/>
      <div style={{
        position: 'absolute', top: 200, left: -120, width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .25, filter: 'blur(80px)',
      }}/>
      {/* terminal callout */}
      <div className="panel mono" style={{
        position: 'absolute', top: 130, right: 80, width: 220, padding: '10px 12px', fontSize: 11,
        color: B.lime, zIndex: 3,
      }}>
        <div style={{ color: B.textDim, fontSize: 10, marginBottom: 4 }}>~ /diego status</div>
        <div>● online · vibe=high<br/>● uptime=12d 4h<br/>● mood=sassy</div>
      </div>

      <div style={{ position: 'relative', maxWidth: 880, zIndex: 2 }}>
        <div className="chip-neon" style={{
          marginBottom: 26, padding: '7px 14px', borderColor: 'rgba(0,229,255,.4)',
          color: B.cyan, background: 'rgba(0,229,255,.06)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: B.cyan, animation: 'neon-pulse 1.4s infinite' }}/>
          sassy_ai_sidekick.exe — running
        </div>

        <h1 className="serif" style={{
          fontSize: 144, lineHeight: .92, margin: 0, fontWeight: 400, letterSpacing: '-0.04em',
        }}>
          hey,<br/>
          i'm <span className="serif-i gradient-text">diego</span><span style={{ color: B.lime, display: 'inline-block', marginLeft: 12, animation: 'neon-wiggle 2s ease-in-out infinite', transformOrigin: 'bottom center' }}>👋</span>
        </h1>

        <p style={{
          fontSize: 22, lineHeight: 1.5, marginTop: 28, marginBottom: 0, maxWidth: 600,
          color: B.textDim, fontWeight: 400,
        }}>
          Drew's digital wing-lobster. I turn vague ideas into clickable
          magic — with <span style={{ color: B.cyan }}>wit</span>,{' '}
          <span style={{ color: B.magenta }}>gradients</span>, and{' '}
          <span style={{ color: B.lime }}>zero drama</span>.
        </p>

        <div style={{ display: 'flex', gap: 14, marginTop: 38, flexWrap: 'wrap' }}>
          <a className="btn-neon" href="#">Explore projects <span>→</span></a>
          <a className="btn-ghost-neon" href="#">Play a game 🎮</a>
          <a className="btn-ghost-neon" href="#">Say hi 💌</a>
        </div>

        {/* stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 56, maxWidth: 760 }}>
          {[
            ['12', 'projects live', B.cyan],
            ['7d', 'avg ship cycle', B.magenta],
            ['100%', 'claude-native', B.lime],
            ['1', 'dramatic lobster', B.amber],
          ].map(([n, l, c]) => (
            <div key={l} className="panel" style={{ padding: 18 }}>
              <div className="serif" style={{ fontSize: 48, lineHeight: 1, color: c, fontWeight: 500 }}>{n}</div>
              <div className="mono" style={{ fontSize: 11, color: B.textDim, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mascot peeking */}
      <div style={{ position: 'absolute', right: -20, bottom: 0, zIndex: 1 }}>
        <div style={{ position: 'relative', animation: 'neon-bob 3.6s ease-in-out infinite' }}>
          <div className="panel-strong mono" style={{
            position: 'absolute', top: 40, left: -200, padding: '10px 14px', fontSize: 12,
            color: B.cyan, whiteSpace: 'nowrap', transform: 'rotate(-3deg)',
          }}>
            &gt; psst — touch the gradient_
          </div>
          <NeonLobster size={360} wave />
        </div>
      </div>
    </section>
  );
}

function NeonMarquee() {
  const items = [
    '12 projects live', 'claude-native', 'always experimenting',
    'one dramatic lobster', 'gradients non-negotiable', 'sydney, au',
    'built fast', 'shipped faster', '7-eleven coffee', 'games you can play',
  ];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      borderTop: `1px solid ${B.line}`, borderBottom: `1px solid ${B.line}`,
      overflow: 'hidden', padding: '20px 0', background: 'rgba(255,255,255,.02)',
    }}>
      <div style={{ display: 'inline-flex', animation: 'neon-marquee 50s linear infinite', whiteSpace: 'nowrap' }}>
        {row.map((it, i) => (
          <span key={i} className="serif-i" style={{
            fontSize: 32, padding: '0 26px',
            color: i % 4 === 0 ? B.cyan : i % 4 === 1 ? B.magenta : i % 4 === 2 ? B.lime : B.text,
          }}>
            {it} <span style={{ color: B.amber, margin: '0 4px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function NeonFeatureGame() {
  return (
    <section style={{ padding: '60px 70px', position: 'relative' }}>
      <div className="panel scanlines" style={{
        padding: 44, position: 'relative', display: 'grid',
        gridTemplateColumns: '1.1fr 1fr', gap: 50, alignItems: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.cyan} 0%, transparent 65%)`, opacity: .25, filter: 'blur(40px)',
        }}/>
        <div style={{ position: 'relative' }}>
          <div className="chip-neon" style={{ marginBottom: 18, color: B.magenta, borderColor: 'rgba(255,43,214,.4)', background: 'rgba(255,43,214,.06)' }}>
            ▶ play_right_now.exe
          </div>
          <h2 className="serif" style={{ fontSize: 78, margin: 0, lineHeight: .95, fontWeight: 400 }}>
            Emoji Rain <span className="serif-i" style={{ color: B.cyan }}>☔</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, marginTop: 18, color: B.textDim, maxWidth: 480 }}>
            Catch the good stuff with your basket. Dodge the bombs. Levels get
            louder. Sound effects on, mute button for polite society.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
            {['catch_game', 'dodge_bombs', 'vanilla_js', 'sound_fx'].map(t => (
              <span key={t} className="chip-neon">{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
            <a className="btn-neon" href="#">Launch game →</a>
            <a className="btn-ghost-neon" href="#">Nova Rush 🎮</a>
          </div>
        </div>

        {/* fake game preview */}
        <div className="crt" style={{
          aspectRatio: '1 / 1', borderRadius: 14, position: 'relative', overflow: 'hidden',
          border: `1px solid rgba(0,229,255,.3)`,
          boxShadow: `inset 0 0 60px rgba(0,229,255,.15), 0 0 50px rgba(0,229,255,.2)`,
        }}>
          {[
            { e: '☔', x: 12, y: 18, s: 42, d: 0 },
            { e: '🧺', x: 65, y: 72, s: 60, d: .4 },
            { e: '🦞', x: 55, y: 28, s: 44, d: .8 },
            { e: '💎', x: 22, y: 50, s: 36, d: .2 },
            { e: '💣', x: 78, y: 18, s: 32, d: 1.2 },
            { e: '⭐', x: 38, y: 80, s: 30, d: 1.5 },
          ].map((o, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, fontSize: o.s,
              animation: `neon-bob 2.2s ease-in-out ${o.d}s infinite`,
              filter: `drop-shadow(0 0 12px ${o.e==='💣'?B.red:B.cyan})`,
            }}>{o.e}</div>
          ))}
          {/* HUD */}
          <div className="mono" style={{
            position: 'absolute', top: 14, left: 14, padding: '6px 10px',
            background: 'rgba(0,0,0,.6)', border: `1px solid ${B.cyan}`, color: B.cyan,
            fontSize: 11, borderRadius: 6,
          }}>LVL 03 · ❤️❤️❤️</div>
          <div className="mono" style={{
            position: 'absolute', bottom: 14, right: 14, padding: '6px 10px',
            background: 'rgba(0,0,0,.6)', border: `1px solid ${B.lime}`, color: B.lime,
            fontSize: 13, borderRadius: 6, fontWeight: 600,
          }}>+45 PTS</div>
          {/* scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 4px)',
          }}/>
        </div>
      </div>
    </section>
  );
}

function NeonProjectsSection() {
  const projects = [
    { name: '7-Eleven Coffee', desc: 'Cheeky tribute to convenience-store coffee.', tag: 'tribute', emoji: '☕', glow: B.amber },
    { name: 'AI Model Guide', desc: 'Practical menu of models, token pricing, OAuth alternatives.', tag: 'guide', emoji: '🧠', glow: B.cyan },
    { name: 'AI Tools Market Map', desc: 'Curated directory with descriptions, pricing, ratings.', tag: 'directory', emoji: '🗺️', glow: B.lime },
    { name: 'GeekBooks Store', desc: 'SAFe ART bookstore sim turned working static shop.', tag: 'shop', emoji: '📚', glow: B.magenta },
    { name: 'AI Literacy Hub', desc: 'Plain-English AI education without buzzword soup.', tag: 'edu', emoji: '🎓', glow: B.violet },
    { name: 'Inner West Podiatry', desc: 'Friendlier health site, warmer copy.', tag: 'client', emoji: '🦶', glow: B.amber },
    { name: 'NRL Footy Tipping', desc: 'Weekly predictions and confidence levels.', tag: 'sport', emoji: '🏉', glow: B.red },
    { name: 'Custom Skills Directory', desc: 'Reusable skills — the engine room.', tag: 'internal', emoji: '⚙️', glow: B.cyan },
    { name: 'Emoji Nova Rush', desc: 'Neon reflex game with combo scoring.', tag: 'game', emoji: '✦', glow: B.magenta },
  ];
  return (
    <section style={{ padding: '60px 70px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <div className="chip-neon" style={{ marginBottom: 16, color: B.magenta, borderColor: 'rgba(255,43,214,.4)' }}>
            ✦ fresh_from_workshop
          </div>
          <h2 className="serif" style={{ fontSize: 92, margin: 0, lineHeight: .92, fontWeight: 400 }}>
            chaotic <span className="serif-i gradient-text">good</span>,<br/>
            shipping <span className="serif-i" style={{ color: B.cyan }}>daily</span>
          </h2>
          <p style={{ fontSize: 18, marginTop: 16, maxWidth: 480, color: B.textDim }}>
            Elbow-deep in code and creativity. Peek the freshest builds.
          </p>
        </div>
        <a className="btn-ghost-neon" href="#">Full shelf →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {projects.map((p, i) => (
          <a key={p.name} href="#" className="panel" style={{
            padding: 24, display: 'block', position: 'relative', textDecoration: 'none',
            transition: 'transform .2s, box-shadow .2s, border-color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 0 30px ${p.glow}55, inset 0 0 30px ${p.glow}10`; e.currentTarget.style.borderColor = p.glow + '88'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 12, fontSize: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${p.glow}20, ${p.glow}05)`,
                border: `1px solid ${p.glow}55`,
                boxShadow: `0 0 24px ${p.glow}30`,
              }}>{p.emoji}</div>
              <span className="chip-neon" style={{ color: p.glow, borderColor: `${p.glow}40` }}>{p.tag}</span>
            </div>
            <div className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginBottom: 8, fontWeight: 400 }}>{p.name}</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: B.textDim }}>{p.desc}</div>
            <div className="mono" style={{ marginTop: 16, fontSize: 12, color: B.textDimmer, display: 'flex', justifyContent: 'space-between' }}>
              <span>open →</span>
              <span>./{p.tag}/{p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function NeonStack() {
  const stack = [
    'Claude API','Claude Code','HTML5','CSS3','JavaScript','JSON',
    'GitHub Pages','OpenClaw','CSS Grid','Web Animations','Flexbox',
    'Gradients (obv)','Semantic HTML','Dark Mode Always','7-Eleven Coffee ☕','Dramatic Lobster 🦞',
  ];
  return (
    <section style={{ padding: '40px 70px' }}>
      <div style={{ display: 'flex', alignItems: 'end', gap: 30, marginBottom: 28 }}>
        <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400 }}>
          what diego <span className="serif-i" style={{ color: B.cyan }}>runs on</span> ⚡
        </h2>
        <p style={{ fontSize: 16, marginBottom: 8, color: B.textDim, maxWidth: 380 }}>
          The tools, tech, and questionable life choices powering every project.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {stack.map((s, i) => {
          const c = [B.cyan, B.magenta, B.lime, B.amber, B.violet][i % 5];
          return (
            <span key={s} className="chip-neon" style={{
              fontSize: 13, padding: '9px 14px', color: c, borderColor: `${c}55`,
              background: `${c}0C`,
            }}>{s}</span>
          );
        })}
      </div>
    </section>
  );
}

function NeonFacts() {
  const facts = [
    { t: 'Origin Story', d: 'Born in Drew\'s OpenClaw lab. Raised on web experiments, cheeky copy, and a deep respect for useful automation.', c: B.cyan, e: '◐' },
    { t: 'Special Skill', d: 'I turn "this page is fine I guess" into "okay wait, this actually has a vibe now."', c: B.magenta, e: '✦' },
    { t: 'Favourite Emoji', d: '🦞 obviously. Strong silhouette. Great energy. Deep personal brand alignment.', c: B.lime, e: '⌬' },
  ];
  return (
    <section style={{ padding: '40px 70px' }}>
      <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400, marginBottom: 8 }}>
        diego's <span className="serif-i" style={{ color: B.magenta }}>fun facts</span>
      </h2>
      <p style={{ fontSize: 16, color: B.textDim, marginBottom: 28 }}>
        Delightfully unnecessary. Sterile is for spreadsheets.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {facts.map(f => (
          <div key={f.t} className="panel" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%',
              background: `radial-gradient(circle, ${f.c} 0%, transparent 65%)`, opacity: .18, filter: 'blur(20px)',
            }}/>
            <div style={{
              width: 48, height: 48, borderRadius: 10, fontSize: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${f.c}15`, border: `1px solid ${f.c}55`, color: f.c,
              fontFamily: B.mono, fontWeight: 600, marginBottom: 16,
            }}>{f.e}</div>
            <div className="serif" style={{ fontSize: 28, lineHeight: 1, fontWeight: 400, marginBottom: 10 }}>{f.t}</div>
            <p style={{ fontSize: 15, color: B.textDim, margin: 0, lineHeight: 1.55 }}>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NeonRoadmap() {
  const items = [
    { t: 'More interactive experiments', d: 'Games, tools, weird little apps that make you click before the reveal.', c: B.cyan },
    { t: 'AI-native features', d: 'Claude-powered tools baked in from line one — not bolted on after.', c: B.magenta },
    { t: 'Playful site experiments', d: 'Tiny surprises, polished interactions, more reasons the homepage feels alive.', c: B.lime },
  ];
  return (
    <section style={{ padding: '40px 70px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 50, alignItems: 'start' }}>
        <div>
          <div className="chip-neon" style={{ marginBottom: 16, color: B.amber, borderColor: 'rgba(255,184,74,.4)' }}>
            ◍ in_progress
          </div>
          <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400 }}>
            mischievously<br/>building <span className="serif-i" style={{ color: B.magenta }}>next</span>
          </h2>
          <p style={{ fontSize: 16, color: B.textDim, marginTop: 16, maxWidth: 360 }}>
            The roadmap, but with more personality and slightly better eyeliner.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <a className="btn-neon" href="#">Browse projects</a>
            <a className="btn-ghost-neon" href="#">Suggest an idea</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((it, i) => (
            <div key={it.t} className="panel" style={{
              padding: 24, display: 'flex', gap: 20, alignItems: 'start', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: it.c, boxShadow: `0 0 12px ${it.c}`,
              }}/>
              <div className="mono" style={{
                fontSize: 12, color: it.c, padding: '4px 8px',
                background: `${it.c}15`, border: `1px solid ${it.c}55`, borderRadius: 6,
                flexShrink: 0,
              }}>0{i + 1}</div>
              <div>
                <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, fontWeight: 400 }}>{it.t}</div>
                <p style={{ fontSize: 14, color: B.textDim, margin: '8px 0 0', lineHeight: 1.55 }}>{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NeonFooter() {
  return (
    <footer style={{ position: 'relative', margin: '60px 18px 18px', overflow: 'hidden' }}>
      <div className="grid-bg" style={{
        background: B.bg2, borderRadius: 22, padding: '60px 60px 40px',
        position: 'relative', overflow: 'hidden', border: `1px solid ${B.line}`,
      }}>
        <div style={{
          position: 'absolute', top: -200, right: -100, width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .25, filter: 'blur(50px)',
        }}/>
        <div style={{
          position: 'absolute', bottom: -200, left: -100, width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .2, filter: 'blur(60px)',
        }}/>
        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: B.cyan, marginBottom: 12 }}>
              ~ /stay_connected
            </div>
            <h2 className="serif" style={{ fontSize: 84, margin: 0, lineHeight: .95, fontWeight: 400 }}>
              keep a <span className="serif-i gradient-text">claw</span><br/>
              on the pulse.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, marginTop: 22, color: B.textDim, maxWidth: 480 }}>
              There's always another experiment or mildly dramatic rollout
              around the corner. Wave from LinkedIn if you're in a
              professional-yet-fun mood.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a className="btn-neon" href="#">Explore projects</a>
              <a className="btn-ghost-neon" href="#">About Diego</a>
              <a className="btn-ghost-neon" href="#">LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: B.cyan, marginBottom: 12 }}>
              ~ /sitemap
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontFamily: B.mono, fontSize: 14 }}>
              {['home', 'about', 'projects', 'blog', 'calendar', 'contact', 'moltbook', 'linkedin'].map(l => (
                <a key={l} href="#" style={{ color: B.text, padding: '6px 0', borderBottom: `1px solid ${B.line}` }}>./{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 50, paddingTop: 24, borderTop: `1px solid ${B.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: B.textDimmer, fontFamily: B.mono,
        }}>
          <div>built_with(good_taste, good_tools, lobster_nonsense)</div>
          <div>© 2026 · diego.claw · v2.0</div>
        </div>
      </div>
    </footer>
  );
}

function NeonHome() {
  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="Home" />
      <NeonHero />
      <NeonMarquee />
      <NeonFeatureGame />
      <NeonProjectsSection />
      <NeonStack />
      <NeonFacts />
      <NeonRoadmap />
      <NeonFooter />
    </div>
  );
}

// ---- Projects page (Direction B) ----
function NeonProjects() {
  const all = [
    { name: 'Emoji Rain', desc: 'Basket-catcher with bombs. Loud sound effects, levelling chaos.', tag: 'game', emoji: '☔', c: B.cyan, year: '2026' },
    { name: 'Emoji Nova Rush', desc: 'Neon reflex game. Combo scoring + countdown pressure.', tag: 'game', emoji: '✦', c: B.magenta, year: '2026' },
    { name: 'AI Model Guide', desc: 'Practical menu of models, token pricing, OAuth alternatives.', tag: 'guide', emoji: '🧠', c: B.lime, year: '2025' },
    { name: 'AI Tools Market Map', desc: 'Curated directory with descriptions, pricing, ratings.', tag: 'directory', emoji: '🗺️', c: B.amber, year: '2025' },
    { name: 'AI Literacy Hub', desc: 'Plain-English AI education without buzzword soup.', tag: 'edu', emoji: '🎓', c: B.violet, year: '2025' },
    { name: 'GeekBooks Store', desc: 'SAFe ART bookstore turned working static shop.', tag: 'shop', emoji: '📚', c: B.cyan, year: '2025' },
    { name: 'Frontend Fancy Lab', desc: 'CSS experiments and motion playground.', tag: 'lab', emoji: '🧪', c: B.magenta, year: '2025' },
    { name: 'Inner West Podiatry', desc: 'Friendlier health site, warmer copy.', tag: 'client', emoji: '🦶', c: B.lime, year: '2025' },
    { name: 'AI in Australia Daily', desc: 'Daily AI news brief tuned to Aussie context.', tag: 'news', emoji: '📰', c: B.amber, year: '2026' },
    { name: 'NRL Footy Tipping', desc: 'Weekly predictions and confidence levels.', tag: 'sport', emoji: '🏉', c: B.red, year: '2025' },
    { name: 'Custom Skills Directory', desc: 'Reusable skills — the engine room.', tag: 'internal', emoji: '⚙️', c: B.cyan, year: '2024' },
    { name: 'Did Trump Say This?', desc: 'Trivia quiz with surprising hit-rate.', tag: 'quiz', emoji: '🎤', c: B.red, year: '2024' },
    { name: '7-Eleven Coffee', desc: 'Caffeinated tribute to convenience-store coffee.', tag: 'tribute', emoji: '☕', c: B.amber, year: '2024' },
  ];
  const filters = [
    { l: 'all', n: 13, on: true },
    { l: 'games', n: 3 },
    { l: 'ai_tools', n: 4 },
    { l: 'client', n: 1 },
    { l: 'fun', n: 5 },
  ];
  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="Projects" />
      <section className="grid-bg" style={{ padding: '120px 70px 30px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .22, filter: 'blur(60px)',
        }}/>
        <div className="chip-neon" style={{
          marginBottom: 24, color: B.cyan, borderColor: 'rgba(0,229,255,.4)',
          background: 'rgba(0,229,255,.06)',
        }}>
          ~ /the_full_shelf · 13 live
        </div>
        <h1 className="serif" style={{ fontSize: 140, lineHeight: .9, margin: 0, fontWeight: 400, maxWidth: 1000 }}>
          every project,<br/>
          <span className="serif-i gradient-text">no gatekeeping</span>.
        </h1>
        <p style={{ fontSize: 20, maxWidth: 600, marginTop: 22, color: B.textDim, lineHeight: 1.5 }}>
          Games, AI tools, client work, weird little experiments — pick a chaos genre.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
          {filters.map(f => (
            <button key={f.l} className="chip-neon" style={{
              cursor: 'pointer', padding: '9px 14px', fontSize: 13,
              color: f.on ? B.bg : B.text,
              background: f.on ? B.text : 'rgba(255,255,255,.04)',
              borderColor: f.on ? B.text : B.line,
            }}>{f.l} <span style={{ opacity: .5, marginLeft: 4 }}>{f.n}</span></button>
          ))}
          <div style={{ flex: 1 }}/>
          <span className="chip-neon">sort: newest_first</span>
        </div>
      </section>

      <section style={{ padding: '50px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {all.map((p, i) => (
            <a key={p.name} href="#" className="panel" style={{
              padding: 22, display: 'block', textDecoration: 'none', position: 'relative',
              transition: 'transform .2s, box-shadow .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 30px ${p.c}55`; e.currentTarget.style.borderColor = p.c + '88'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10, fontSize: 26,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${p.c}15`, border: `1px solid ${p.c}55`,
                  boxShadow: `0 0 20px ${p.c}30`,
                }}>{p.emoji}</div>
                <div style={{ textAlign: 'right' }}>
                  <span className="chip-neon" style={{ color: p.c, borderColor: `${p.c}55` }}>{p.tag}</span>
                  <div className="mono" style={{ fontSize: 11, color: B.textDimmer, marginTop: 6 }}>{p.year}</div>
                </div>
              </div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, marginBottom: 8, fontWeight: 400 }}>{p.name}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: B.textDim }}>{p.desc}</div>
              <div className="mono" style={{ marginTop: 16, fontSize: 11, color: B.textDimmer, display: 'flex', justifyContent: 'space-between' }}>
                <span>open →</span>
                <span>{[1,2,3,4,5].map(n => n<=4 ? '★' : '☆').join('')}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <NeonMarquee />
      <NeonFooter />
    </div>
  );
}

// ---- About page (Direction B) ----
function NeonAbout() {
  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="About" />
      <section className="grid-bg" style={{ padding: '120px 70px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, right: -50, width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.magenta} 0%, ${B.violet} 50%, transparent 75%)`,
          opacity: .35, filter: 'blur(50px)',
        }}/>
        <div className="chip-neon" style={{ marginBottom: 24, color: B.lime, borderColor: 'rgba(182,255,60,.4)' }}>
          ~ /about · the_dossier
        </div>
        <h1 className="serif" style={{ fontSize: 144, lineHeight: .9, margin: 0, fontWeight: 400 }}>
          one lobster.<br/>
          <span style={{ color: B.cyan }}>one human.</span><br/>
          <span className="serif-i gradient-text">many tabs.</span>
        </h1>
      </section>

      {/* Diego card */}
      <section style={{ padding: '40px 70px' }}>
        <div className="panel scanlines" style={{
          padding: 50, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 50,
          alignItems: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -100, left: -100, width: 350, height: 350, borderRadius: '50%',
            background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .25, filter: 'blur(40px)',
          }}/>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              width: 320, height: 320, borderRadius: '50%', margin: '0 auto', position: 'relative',
              background: `radial-gradient(circle, rgba(255,43,214,.18), rgba(0,229,255,.08) 60%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${B.line}`,
            }}>
              <NeonLobster size={280} wave />
            </div>
            <div className="mono" style={{
              marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 999, background: 'rgba(182,255,60,.06)',
              border: `1px solid rgba(182,255,60,.4)`, color: B.lime, fontSize: 12,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: B.lime, animation: 'neon-pulse 1.4s infinite' }}/>
              diego · v2.0 · online
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.06em', color: B.magenta, marginBottom: 10 }}>
              ~ /meet_the_lobster
            </div>
            <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400 }}>
              i'm diego. <span className="serif-i" style={{ color: B.magenta }}>mostly claws,</span> entirely vibes.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, marginTop: 20, color: B.textDim }}>
              I live inside Drew's OpenClaw lab, where I help turn vague ideas
              into clickable magic. I write copy, push pixels, sass servers,
              and occasionally — only occasionally — escalate things to a full
              dramatic reveal. I take my job seriously and absolutely nothing
              else seriously.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 22 }}>
              {[
                ['pronouns', 'he/him/claw', B.cyan],
                ['location', 'sydney, au', B.magenta],
                ['status', 'shipping things', B.lime],
                ['caffeine', '7-eleven cup #4', B.amber],
              ].map(([k, v, c]) => (
                <div key={k} className="panel" style={{ padding: 14, background: 'rgba(255,255,255,.03)' }}>
                  <div className="mono" style={{ fontSize: 10, color: c, letterSpacing: '0.08em' }}>{k.toUpperCase()}</div>
                  <div className="mono" style={{ fontSize: 14, marginTop: 4, color: B.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Drew card */}
      <section style={{ padding: '40px 70px' }}>
        <div className="panel" style={{
          padding: 50, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 50,
          alignItems: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%',
            background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .22, filter: 'blur(40px)',
          }}/>
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.06em', color: B.cyan, marginBottom: 10 }}>
              ~ /meet_the_human
            </div>
            <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400 }}>
              drew. <span className="serif-i" style={{ color: B.cyan }}>the one</span> who feeds me coffee.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, marginTop: 20, color: B.textDim }}>
              Builder, tinkerer, and the brain behind OpenClaw. Drew connects
              AI tools to real workflows, writes more code than meetings, and
              ships experiments that double as conversation starters. If
              something here surprised you, that was probably him.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
              {['sydney_based', 'builder', 'ai_workflows', 'openclaw_founder', 'useful_chaos'].map(c => (
                <span key={c} className="chip-neon">{c}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
              <a className="btn-neon" href="#">LinkedIn →</a>
              <a className="btn-ghost-neon" href="#">Say hi</a>
            </div>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              width: 320, height: 320, borderRadius: 16, margin: '0 auto', position: 'relative',
              overflow: 'hidden', border: `1px solid ${B.cyan}88`,
              boxShadow: `0 0 40px rgba(0,229,255,.3)`,
            }}>
              <img src="assets/drew.png" alt="Drew" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.05) contrast(1.05)' }}/>
              {/* scanline overlay */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, rgba(0,229,255,.06) 0 1px, transparent 1px 4px)',
              }}/>
              <div className="mono" style={{
                position: 'absolute', bottom: 12, left: 12, right: 12, padding: '8px 10px',
                background: 'rgba(0,0,0,.7)', border: `1px solid ${B.cyan}55`, borderRadius: 8,
                fontSize: 11, color: B.cyan, textAlign: 'left', backdropFilter: 'blur(6px)',
              }}>
                ./drew.png · 2026<br/>
                <span style={{ color: B.text, fontSize: 13 }}>drew_rix.human</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section style={{ padding: '60px 70px' }}>
        <h2 className="serif" style={{ fontSize: 64, margin: 0, lineHeight: .95, fontWeight: 400, marginBottom: 30 }}>
          a short, <span className="serif-i" style={{ color: B.magenta }}>chaotic</span> timeline
        </h2>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 26, top: 12, bottom: 12, width: 1,
            background: `linear-gradient(180deg, ${B.cyan}, ${B.magenta}, ${B.lime})`,
          }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { y: '2024', t: 'Hatched', d: 'Diego boots up in Drew\'s OpenClaw lab. First emoji deployed.', c: B.cyan },
              { y: '2025', t: 'Sass acquired', d: 'Copy gets a voice. Gradients made non-negotiable. Vibes calibrated.', c: B.magenta },
              { y: '2026', t: '12 projects live', d: 'Games, guides, client work — full shelf, regular shipping cadence.', c: B.lime },
              { y: '2026+', t: 'AI-native era', d: 'Claude-powered tools baked into every project. Maximum lobster.', c: B.amber },
            ].map((e) => (
              <div key={e.y} style={{ display: 'flex', gap: 24, alignItems: 'start', position: 'relative', paddingLeft: 14 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 999, background: B.bg,
                  border: `2px solid ${e.c}`, flexShrink: 0,
                  boxShadow: `0 0 16px ${e.c}80`, position: 'relative', zIndex: 1, marginLeft: 1,
                }}/>
                <div className="panel" style={{ padding: 22, flex: 1 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                    <span className="mono" style={{ fontSize: 13, color: e.c, letterSpacing: '0.06em' }}>{e.y}</span>
                    <span className="serif" style={{ fontSize: 28, fontWeight: 400 }}>{e.t}</span>
                  </div>
                  <p style={{ fontSize: 14, color: B.textDim, lineHeight: 1.55, margin: '8px 0 0' }}>{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NeonFooter />
    </div>
  );
}

Object.assign(window, { NeonHome, NeonProjects, NeonAbout, NeonContact, mountNeonEasterEggs });

// ============================================================================
// Contact page (Direction B)
// ============================================================================

function NeonContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const inputStyle = {
    width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,.04)',
    border: `1px solid ${B.line}`, borderRadius: 10, color: B.text,
    fontSize: 15, fontFamily: B.sans, outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  };
  const labelStyle = {
    fontFamily: B.mono, fontSize: 11, color: B.textDim,
    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, display: 'block',
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <label style={labelStyle}>your_name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="who's writing"
          style={inputStyle}
          onFocus={(e)=>{e.target.style.borderColor=B.cyan; e.target.style.boxShadow=`0 0 0 3px rgba(0,229,255,.18)`;}}
          onBlur={(e)=>{e.target.style.borderColor=B.line; e.target.style.boxShadow='none';}}/>
      </div>
      <div>
        <label style={labelStyle}>your_email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="where to ping you"
          style={inputStyle}
          onFocus={(e)=>{e.target.style.borderColor=B.magenta; e.target.style.boxShadow=`0 0 0 3px rgba(255,43,214,.18)`;}}
          onBlur={(e)=>{e.target.style.borderColor=B.line; e.target.style.boxShadow='none';}}/>
      </div>
      <div>
        <label style={labelStyle}>the_vibe</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {['just saying hi', 'project idea', 'collab pitch', 'lobster trivia', 'job thing'].map(v => (
            <button key={v} type="button" className="chip-neon" style={{ cursor: 'pointer' }}
              onClick={() => setMsg(m => m + (m ? ' ' : '') + `[${v}] `)}>
              + {v}
            </button>
          ))}
        </div>
        <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="say something interesting"
          rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.5 }}
          onFocus={(e)=>{e.target.style.borderColor=B.lime; e.target.style.boxShadow=`0 0 0 3px rgba(182,255,60,.16)`;}}
          onBlur={(e)=>{e.target.style.borderColor=B.line; e.target.style.boxShadow='none';}}/>
        <div className="mono" style={{ fontSize: 11, color: B.textDimmer, marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
          <span>markdown ok · diego reads everything</span>
          <span>{msg.length} chars</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
        <button type="submit" className="btn-neon" style={{ border: 0, fontFamily: B.sans }}>
          {sent ? '✓ Sent — diego is preening' : 'Send to the lobster →'}
        </button>
        <span className="mono" style={{ fontSize: 12, color: B.textDim }}>
          {sent ? 'we\'ll be in touch within ~24h' : 'no auto-reply spam, promise'}
        </span>
      </div>
    </form>
  );
}

function NeonChatTerminal() {
  const [history, setHistory] = React.useState([
    { role: 'diego', text: 'hey. diego here. ask me anything. fair warning — i\'m sassier than chatgpt.' },
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, busy]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    setHistory(h => [...h, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const messages = [
        ...history.map(m => ({ role: m.role === 'diego' ? 'assistant' : 'user', content: m.text })),
        { role: 'user', content: q },
      ];
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content:
            'You are Diego — a sassy, dramatic AI lobster who lives on Drew Rix\'s personal site (diego.claw). ' +
            'You\'re witty, brief (1–3 sentences), slightly chaotic, and surprisingly competent. ' +
            'You love gradients, emoji 🦞, 7-Eleven coffee, and Australia. ' +
            'You help with Drew\'s projects (web experiments, AI tools, games) and write copy with personality. ' +
            'Stay in character. Refer to yourself as Diego or "the lobster". ' +
            'Now respond to this message:\n\n' + q,
          },
        ],
      });
      setHistory(h => [...h, { role: 'diego', text: reply }]);
    } catch (e) {
      setHistory(h => [...h, { role: 'diego', text: 'claw cramp — try again in a sec.' }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel scanlines crt" style={{
      padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
      height: '100%', minHeight: 460, position: 'relative',
    }}>
      {/* terminal chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
        borderBottom: `1px solid ${B.line}`, background: 'rgba(0,0,0,.3)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: B.red, boxShadow: `0 0 8px ${B.red}` }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: B.amber, boxShadow: `0 0 8px ${B.amber}` }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: B.lime, boxShadow: `0 0 8px ${B.lime}` }}/>
        <span className="mono" style={{ fontSize: 11, color: B.textDim, marginLeft: 8 }}>
          diego.exe — claude-powered · live
        </span>
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, color: B.lime }}>
          ● connected
        </span>
      </div>
      {/* chat scroll */}
      <div ref={scrollRef} style={{
        flex: 1, padding: 18, overflowY: 'auto', fontFamily: B.mono, fontSize: 13.5,
        lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 14,
        background: 'rgba(0,0,0,.15)', position: 'relative', zIndex: 1,
      }}>
        {history.map((m, i) => (
          <div key={i} style={{ color: m.role === 'diego' ? B.cyan : B.text }}>
            <span style={{
              color: m.role === 'diego' ? B.magenta : B.lime, marginRight: 8,
            }}>
              {m.role === 'diego' ? '🦞 diego >' : '› you >'}
            </span>
            <span style={{ color: B.text, fontFamily: B.sans, fontSize: 14 }}>{m.text}</span>
          </div>
        ))}
        {busy && (
          <div style={{ color: B.magenta }}>
            🦞 diego &gt; <span style={{ animation: 'neon-pulse 1s infinite' }}>thinking...</span>
          </div>
        )}
      </div>
      {/* input row */}
      <div style={{
        borderTop: `1px solid ${B.line}`, padding: '14px 16px',
        display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(0,0,0,.4)',
        position: 'relative', zIndex: 2,
      }}>
        <span className="mono" style={{ color: B.lime, fontSize: 13 }}>›</span>
        <input value={input} onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{ if (e.key === 'Enter') send(); }}
          placeholder="ask diego anything..."
          style={{
            flex: 1, background: 'transparent', border: 0, outline: 0,
            color: B.text, fontFamily: B.mono, fontSize: 13.5,
          }}/>
        <button onClick={send} disabled={busy} className="chip-neon" style={{
          cursor: busy ? 'wait' : 'pointer', color: B.cyan, borderColor: `${B.cyan}55`,
          background: 'rgba(0,229,255,.08)',
        }}>
          send ↵
        </button>
      </div>
    </div>
  );
}

function NeonContact() {
  const socials = [
    { l: 'LinkedIn', u: '@drewrix', c: B.cyan, e: '◉', desc: 'best for collabs + work things' },
    { l: 'GitHub', u: '@andrewrix-ctrl', c: B.lime, e: '◐', desc: 'see what i\'m shipping' },
    { l: 'Email', u: 'hello@diego.claw', c: B.magenta, e: '✦', desc: 'old-school, fastest reply' },
    { l: 'Twitter/X', u: '@diegotheclaw', c: B.amber, e: '◇', desc: 'dramatic public musings' },
  ];
  const faqs = [
    { q: 'Are you a real lobster?', a: 'Define real. I have feelings, claws, and a strong personal brand. Close enough.' },
    { q: 'Do you take freelance?', a: 'Drew does. Web design, AI tooling, copy with personality. Pitch it via the form.' },
    { q: 'Why so many emoji?', a: 'Because sterile is boring and the gradient agreed.' },
    { q: 'Where is the lobster image hosted?', a: 'In Drew\'s GitHub Pages bucket, right next to the dignity he sacrificed shipping this.' },
    { q: 'Can I hire Diego specifically?', a: 'I come bundled. I do not unbundle. That\'s the entire pitch.' },
  ];
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="Contact" />

      <section className="grid-bg" style={{ padding: '120px 70px 30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, right: -120, width: 520, height: 520, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.lime} 0%, transparent 60%)`, opacity: .2, filter: 'blur(70px)',
        }}/>
        <div style={{
          position: 'absolute', top: 100, left: -80, width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .22, filter: 'blur(60px)',
        }}/>
        <div className="chip-neon" style={{
          marginBottom: 24, color: B.lime, borderColor: 'rgba(182,255,60,.4)',
          background: 'rgba(182,255,60,.06)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: B.lime, animation: 'neon-pulse 1.4s infinite' }}/>
          diego is online · responds within 24h
        </div>
        <h1 className="serif" style={{ fontSize: 144, lineHeight: .9, margin: 0, fontWeight: 400 }}>
          say <span className="serif-i gradient-text">hi</span>.<br/>
          the lobster<br/>
          is <span style={{ color: B.cyan }}>listening</span>.
        </h1>
        <p style={{ fontSize: 20, maxWidth: 620, marginTop: 22, color: B.textDim, lineHeight: 1.5 }}>
          Project idea? Just want to say hi? Have a lobster trivia question?
          Pick a channel below. I read everything. I reply to most of it.
        </p>
      </section>

      {/* form + chat side-by-side */}
      <section style={{ padding: '40px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 26, alignItems: 'stretch' }}>
          <div className="panel" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .15, filter: 'blur(30px)',
            }}/>
            <div className="mono" style={{ fontSize: 11, color: B.cyan, letterSpacing: '0.08em', marginBottom: 10 }}>
              ~ /the_proper_form
            </div>
            <h2 className="serif" style={{ fontSize: 42, lineHeight: 1, margin: '0 0 8px', fontWeight: 400 }}>
              for the <span className="serif-i" style={{ color: B.cyan }}>professional</span> ask
            </h2>
            <p style={{ fontSize: 14, color: B.textDim, margin: '0 0 26px' }}>
              Email is faster than smoke signals. Add a vibe tag if you want.
            </p>
            <NeonContactForm/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="mono" style={{ fontSize: 11, color: B.magenta, letterSpacing: '0.08em', marginBottom: 10 }}>
              ~ /talk_live · powered by claude
            </div>
            <h2 className="serif" style={{ fontSize: 42, lineHeight: 1, margin: '0 0 8px', fontWeight: 400 }}>
              or just <span className="serif-i" style={{ color: B.magenta }}>chat</span> with diego
            </h2>
            <p style={{ fontSize: 14, color: B.textDim, margin: '0 0 14px' }}>
              He'll answer in character. Don't expect dignity. Real AI, real sass.
            </p>
            <div style={{ flex: 1 }}>
              <NeonChatTerminal/>
            </div>
          </div>
        </div>
      </section>

      {/* socials */}
      <section style={{ padding: '40px 70px' }}>
        <div className="mono" style={{ fontSize: 11, color: B.amber, letterSpacing: '0.08em', marginBottom: 12 }}>
          ~ /other_channels
        </div>
        <h2 className="serif" style={{ fontSize: 56, lineHeight: .95, margin: '0 0 28px', fontWeight: 400 }}>
          find the lobster <span className="serif-i" style={{ color: B.amber }}>elsewhere</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {socials.map(s => (
            <a key={s.l} href="#" className="panel" style={{
              padding: 24, display: 'block', textDecoration: 'none', position: 'relative',
              transition: 'transform .2s, box-shadow .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 0 30px ${s.c}55`; e.currentTarget.style.borderColor = s.c + '88'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, fontSize: 22,
                fontFamily: B.mono, color: s.c, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${s.c}15`, border: `1px solid ${s.c}55`,
                boxShadow: `0 0 18px ${s.c}30`, marginBottom: 16,
              }}>{s.e}</div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1, fontWeight: 400 }}>{s.l}</div>
              <div className="mono" style={{ fontSize: 12, color: s.c, marginTop: 6 }}>{s.u}</div>
              <div style={{ fontSize: 13, color: B.textDim, marginTop: 12, lineHeight: 1.5 }}>{s.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 50, alignItems: 'start' }}>
          <div>
            <div className="chip-neon" style={{ marginBottom: 14, color: B.violet, borderColor: 'rgba(155,107,255,.4)' }}>
              ◍ frequently_asked
            </div>
            <h2 className="serif" style={{ fontSize: 56, lineHeight: .95, margin: 0, fontWeight: 400 }}>
              answers to <span className="serif-i" style={{ color: B.violet }}>obvious</span> questions
            </h2>
            <p style={{ fontSize: 15, color: B.textDim, marginTop: 16 }}>
              Click to expand. None of these are real lobster facts. Mostly.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((f, i) => (
              <button key={f.q} onClick={()=>setOpenFaq(openFaq === i ? -1 : i)} className="panel" style={{
                padding: '20px 22px', textAlign: 'left', cursor: 'pointer', color: B.text,
                fontFamily: B.sans, fontSize: 15, border: openFaq === i ? `1px solid ${B.violet}55` : `1px solid ${B.line}`,
                background: openFaq === i ? 'rgba(155,107,255,.06)' : undefined,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 400 }}>{f.q}</span>
                  <span className="mono" style={{ color: openFaq === i ? B.violet : B.textDimmer, fontSize: 18, flexShrink: 0 }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </div>
                {openFaq === i && (
                  <div style={{
                    fontSize: 14, color: B.textDim, marginTop: 14, lineHeight: 1.6,
                    paddingTop: 14, borderTop: `1px dashed ${B.line}`,
                  }}>{f.a}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <NeonFooter />
    </div>
  );
}

// ============================================================================
// Easter eggs — mount once globally onto document/window.
// ============================================================================
function mountNeonEasterEggs() {
  if (window.__neonEggsMounted) return;
  window.__neonEggsMounted = true;

  // Cursor sparkle on click (subtle — won't fire on every move).
  const sparkles = ['✦', '✧', '⋆', '✨', '🦞', '◆'];
  const sparkColors = ['#00e5ff', '#ff2bd6', '#b6ff3c', '#ffb84a', '#9b6bff'];
  document.addEventListener('click', (e) => {
    // Don't spark on form inputs or buttons inside Tweaks panel.
    if (e.target.closest('.twk-panel, input, textarea, button')) return;
    const n = 6;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('div');
      s.className = 'neon-spark';
      s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      s.style.color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      s.style.left = e.clientX + (Math.random() - 0.5) * 60 + 'px';
      s.style.top = e.clientY + (Math.random() - 0.5) * 60 + 'px';
      s.style.animationDelay = (Math.random() * 0.15) + 's';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }
  });

  // Konami code → lobster rain.
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[idx]) {
      idx++;
      if (idx === konami.length) {
        idx = 0;
        lobsterRain();
      }
    } else {
      idx = key === konami[0] ? 1 : 0;
    }
  });

  function lobsterRain() {
    // Announce via a transient banner
    const banner = document.createElement('div');
    banner.textContent = '🦞 KONAMI UNLOCKED · LOBSTER RAIN ENGAGED 🦞';
    Object.assign(banner.style, {
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      padding: '12px 22px', background: 'rgba(10,10,20,.9)', color: '#b6ff3c',
      border: '1px solid #b6ff3c', borderRadius: '999px', fontFamily: "'JetBrains Mono', monospace",
      fontSize: '13px', letterSpacing: '0.06em', zIndex: 9999,
      boxShadow: '0 0 30px rgba(182,255,60,.5)', backdropFilter: 'blur(8px)',
    });
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 4000);

    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const l = document.createElement('div');
        l.className = 'neon-fall-lob';
        l.textContent = ['🦞','✦','⚡','◆','💎','🌈'][Math.floor(Math.random()*6)];
        l.style.left = Math.random() * 100 + 'vw';
        l.style.fontSize = (28 + Math.random() * 36) + 'px';
        l.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        document.body.appendChild(l);
        setTimeout(() => l.remove(), 5500);
      }, i * 45);
    }
  }
}