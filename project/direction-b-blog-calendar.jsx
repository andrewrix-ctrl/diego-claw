// Direction B — Blog & Calendar pages
// Same neon palette / styles as direction-b.jsx. We re-use B (colors) and
// NeonNav / NeonFooter / NeonMarquee from the global scope.

// ============================================================================
// Blog page
// ============================================================================

function NeonBlog() {
  const featured = {
    title: 'How I taught a lobster to write better headlines than I do',
    excerpt:
      "Diego started as a copy assistant. Three months in he\u2019s the editor-in-chief. A short, slightly defensive essay about handing the mic to an AI mascot — and why the writing got sharper.",
    tag: 'essay',
    color: B.magenta,
    date: 'May 18, 2026',
    read: '6 min',
    emoji: '🎙️',
  };

  const posts = [
    {
      title: 'A market map of AI tools that won\u2019t exist in six months',
      excerpt: 'Snapshot of the AI tool landscape circa 2026 — what\u2019s sticking, what\u2019s vapor, and what\u2019s quietly dominating.',
      tag: 'analysis', color: B.cyan, date: 'May 11, 2026', read: '8 min', emoji: '🗺️',
    },
    {
      title: 'Claude-native vs Claude-bolted-on: a working distinction',
      excerpt: 'Why some AI products feel like a magic trick and others feel like a chatbot wearing a costume.',
      tag: 'opinion', color: B.lime, date: 'May 04, 2026', read: '5 min', emoji: '🧠',
    },
    {
      title: 'I shipped 12 projects this year. Here\u2019s what actually mattered.',
      excerpt: 'The pattern wasn\u2019t the stack or the framework. It was a deeply unprofessional commitment to shipping ugly first.',
      tag: 'retro', color: B.amber, date: 'Apr 27, 2026', read: '7 min', emoji: '📦',
    },
    {
      title: 'Building Emoji Nova Rush in 4 hours and 47 minutes',
      excerpt: 'Speedrun of a vanilla-JS reflex game with combo scoring, neon trails, and an embarrassing number of audio cues.',
      tag: 'build-log', color: B.violet, date: 'Apr 20, 2026', read: '4 min', emoji: '✦',
    },
    {
      title: 'Why every personal site should have a mascot',
      excerpt: 'A defense of giving your portfolio a face, a voice, and ideally, opinions about coffee.',
      tag: 'manifesto', color: B.magenta, date: 'Apr 13, 2026', read: '3 min', emoji: '🦞',
    },
    {
      title: '7-Eleven coffee, ranked by emotional support value',
      excerpt: 'A taxonomy of convenience-store caffeine. Includes vibes ratings. No, you cannot review this.',
      tag: 'fun', color: B.red, date: 'Apr 06, 2026', read: '2 min', emoji: '☕',
    },
    {
      title: 'The cheapest model that\u2019s still smart enough to be useful',
      excerpt: 'A pragmatic walkthrough of the model menu, including token math and the OAuth alternative most people miss.',
      tag: 'guide', color: B.cyan, date: 'Mar 30, 2026', read: '9 min', emoji: '💸',
    },
    {
      title: 'Notes on writing copy that doesn\u2019t sound like a hostage video',
      excerpt: 'A short field guide for landing pages, error states, and the eternal struggle against the word "seamless".',
      tag: 'writing', color: B.lime, date: 'Mar 23, 2026', read: '5 min', emoji: '✍️',
    },
    {
      title: 'Did Trump say this? A trivia engine and what it taught me about LLM evals',
      excerpt: 'I built a quiz, then ruined my evening trying to score it. A small lesson in classification, confidence, and chaos.',
      tag: 'experiment', color: B.amber, date: 'Mar 16, 2026', read: '6 min', emoji: '🎤',
    },
  ];

  const tags = [
    { l: 'all', n: 24, on: true },
    { l: 'essay', n: 5 },
    { l: 'build-log', n: 7 },
    { l: 'guide', n: 4 },
    { l: 'opinion', n: 3 },
    { l: 'fun', n: 5 },
  ];

  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="Blog" />

      {/* Hero */}
      <section className="grid-bg" style={{ padding: '120px 70px 30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.magenta} 0%, transparent 60%)`, opacity: .22, filter: 'blur(70px)',
        }}/>
        <div style={{
          position: 'absolute', top: 80, right: -120, width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .2, filter: 'blur(80px)',
        }}/>
        <div className="chip-neon" style={{
          marginBottom: 24, color: B.magenta, borderColor: 'rgba(255,43,214,.4)',
          background: 'rgba(255,43,214,.06)',
        }}>
          ~ /the_moltbook · 24 posts
        </div>
        <h1 className="serif" style={{ fontSize: 144, lineHeight: .9, margin: 0, fontWeight: 400, maxWidth: 1100 }}>
          essays,<br/>
          experiments,<br/>
          <span className="serif-i gradient-text">overshares</span>.
        </h1>
        <p style={{ fontSize: 20, maxWidth: 620, marginTop: 22, color: B.textDim, lineHeight: 1.5 }}>
          Build logs, opinions, occasional manifestos. Drew writes the words,
          Diego pushes for more emoji. They negotiate.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
          {tags.map(f => (
            <button key={f.l} className="chip-neon" style={{
              cursor: 'pointer', padding: '9px 14px', fontSize: 13,
              color: f.on ? B.bg : B.text,
              background: f.on ? B.text : 'rgba(255,255,255,.04)',
              borderColor: f.on ? B.text : B.line,
            }}>{f.l} <span style={{ opacity: .5, marginLeft: 4 }}>{f.n}</span></button>
          ))}
          <div style={{ flex: 1 }}/>
          <div className="chip-neon" style={{ background: 'rgba(255,255,255,.04)' }}>
            <span style={{ color: B.lime }}>›</span>
            <input placeholder="search posts..." style={{
              background: 'transparent', border: 0, outline: 0, color: B.text,
              fontFamily: B.mono, fontSize: 12, width: 140,
            }}/>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section style={{ padding: '40px 70px' }}>
        <div className="mono" style={{ fontSize: 11, color: featured.color, letterSpacing: '0.08em', marginBottom: 12 }}>
          ~ /featured · pinned
        </div>
        <a href="#" className="panel scanlines" style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0,
          textDecoration: 'none', overflow: 'hidden', position: 'relative',
          transition: 'transform .2s, box-shadow .2s, border-color .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 40px ${featured.color}55`; e.currentTarget.style.borderColor = featured.color + '88'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
          <div style={{ padding: 50, position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 22 }}>
              <span className="chip-neon" style={{ color: featured.color, borderColor: `${featured.color}55`, background: `${featured.color}10` }}>
                {featured.tag}
              </span>
              <span className="mono" style={{ fontSize: 12, color: B.textDimmer }}>
                {featured.date} · {featured.read} read
              </span>
            </div>
            <h2 className="serif" style={{ fontSize: 54, lineHeight: 1.02, margin: 0, fontWeight: 400 }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 20, color: B.textDim, maxWidth: 540 }}>
              {featured.excerpt}
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 28 }}>
              <span className="mono" style={{ fontSize: 13, color: featured.color }}>read post →</span>
              <span style={{ fontSize: 13, color: B.textDimmer }}>by drew · with diego heckling in the margins</span>
            </div>
          </div>
          <div style={{
            position: 'relative', background: `linear-gradient(135deg, ${featured.color}25, ${B.violet}20, ${B.bg2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            borderLeft: `1px solid ${B.line}`,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 40%, ${featured.color}40 0%, transparent 65%)`,
              filter: 'blur(20px)',
            }}/>
            <div style={{
              fontSize: 240, lineHeight: 1, position: 'relative', zIndex: 1,
              filter: `drop-shadow(0 0 40px ${featured.color})`,
              animation: 'neon-bob 4s ease-in-out infinite',
            }}>{featured.emoji}</div>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 3px)',
            }}/>
          </div>
        </a>
      </section>

      {/* Post grid */}
      <section style={{ padding: '40px 70px' }}>
        <div className="mono" style={{ fontSize: 11, color: B.cyan, letterSpacing: '0.08em', marginBottom: 12 }}>
          ~ /recent_posts
        </div>
        <h2 className="serif" style={{ fontSize: 56, lineHeight: .95, margin: '0 0 28px', fontWeight: 400 }}>
          fresh from the <span className="serif-i" style={{ color: B.cyan }}>moltbook</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {posts.map((p) => (
            <a key={p.title} href="#" className="panel" style={{
              padding: 22, display: 'block', textDecoration: 'none', position: 'relative',
              overflow: 'hidden', transition: 'transform .2s, box-shadow .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 28px ${p.color}55`; e.currentTarget.style.borderColor = p.color + '88'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
              <div style={{
                height: 140, borderRadius: 10, position: 'relative', overflow: 'hidden',
                background: `linear-gradient(135deg, ${p.color}25, ${B.bg2})`,
                border: `1px solid ${p.color}40`, marginBottom: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${p.color}40 0%, transparent 60%)`,
                  filter: 'blur(20px)',
                }}/>
                <div style={{
                  fontSize: 64, position: 'relative', zIndex: 1,
                  filter: `drop-shadow(0 0 18px ${p.color})`,
                }}>{p.emoji}</div>
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)',
                }}/>
                <span className="chip-neon" style={{
                  position: 'absolute', top: 10, left: 10, color: p.color,
                  borderColor: `${p.color}55`, background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)',
                }}>{p.tag}</span>
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 400, marginBottom: 10 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13.5, color: B.textDim, lineHeight: 1.55 }}>{p.excerpt}</div>
              <div className="mono" style={{
                marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${B.line}`,
                fontSize: 11, color: B.textDimmer, display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
          <a className="btn-ghost-neon" href="#">Load older posts ↓</a>
        </div>
      </section>

      {/* Subscribe band */}
      <section style={{ padding: '50px 70px' }}>
        <div className="panel scanlines" style={{
          padding: 50, position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 50, alignItems: 'center',
        }}>
          <div style={{
            position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%',
            background: `radial-gradient(circle, ${B.lime} 0%, transparent 60%)`, opacity: .18, filter: 'blur(50px)',
          }}/>
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ fontSize: 11, color: B.lime, letterSpacing: '0.08em', marginBottom: 10 }}>
              ~ /the_lobster_letter
            </div>
            <h2 className="serif" style={{ fontSize: 52, lineHeight: 1, margin: 0, fontWeight: 400 }}>
              get diego in your <span className="serif-i" style={{ color: B.lime }}>inbox</span>
            </h2>
            <p style={{ fontSize: 16, color: B.textDim, marginTop: 14, maxWidth: 480, lineHeight: 1.55 }}>
              Monthly-ish. One essay, one build log, one extremely opinionated link.
              No tracking, no sponsor segment, just claws and content.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', gap: 8, padding: 6, borderRadius: 999,
              background: 'rgba(255,255,255,.04)', border: `1px solid ${B.line}`,
            }}>
              <input placeholder="you@somewhere.com" style={{
                flex: 1, background: 'transparent', border: 0, outline: 0,
                color: B.text, fontFamily: B.sans, fontSize: 15, padding: '0 16px',
              }}/>
              <button className="btn-neon" style={{ border: 0, padding: '12px 20px' }}>
                Subscribe →
              </button>
            </div>
            <div className="mono" style={{ fontSize: 11, color: B.textDimmer, marginTop: 12, paddingLeft: 16 }}>
              unsubscribe = one click. promise. lobster’s honor.
            </div>
          </div>
        </div>
      </section>

      <NeonFooter />
    </div>
  );
}

// ============================================================================
// Calendar page
// ============================================================================

function NeonCalendar() {
  // May 2026 — anchor month. May 1 2026 is a Friday. So the grid starts with
  // 4 empty cells (Sun, Mon, Tue, Wed, Thu), then 1 on Fri, etc.
  // (For static design — no real date math needed.)
  const monthName = 'May 2026';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Events keyed by day-of-month.
  const events = {
    4:  [{ t: 'Lab day', kind: 'focus',  c: B.lime }],
    6:  [{ t: 'AI Sydney meetup', kind: 'event', c: B.cyan }],
    9:  [{ t: 'Ship: Nova Rush v2', kind: 'ship', c: B.magenta }],
    11: [{ t: 'Essay: Claude-native', kind: 'post', c: B.lime }],
    13: [{ t: 'Client call · IWP', kind: 'meet', c: B.amber }],
    14: [{ t: 'Lab day', kind: 'focus', c: B.lime }],
    18: [{ t: 'Featured essay', kind: 'post', c: B.magenta }, { t: 'Office hours', kind: 'meet', c: B.cyan }],
    20: [{ t: 'Ship: AI Market Map', kind: 'ship', c: B.magenta }],
    22: [{ t: 'Friday demo · live', kind: 'event', c: B.cyan }],
    25: [{ t: 'Diego chat hour', kind: 'event', c: B.violet }],
    27: [{ t: 'Ship: Skills v3', kind: 'ship', c: B.magenta }],
    28: [{ t: 'Lab day', kind: 'focus', c: B.lime }],
    30: [{ t: 'Lobster Letter #5', kind: 'post', c: B.magenta }],
  };

  // Build the 35-cell grid (5 weeks × 7 cols). Leading offset 5 for May 2026.
  const offset = 5;
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  const today = 22; // pretend "today" — highlights one cell

  const upcoming = [
    { day: 'FRI', d: '22', m: 'MAY', t: 'Friday demo · live', desc: 'Showing the new neon site + one ridiculous side project. Tea served.', c: B.cyan, kind: 'event' },
    { day: 'SUN', d: '25', m: 'MAY', t: 'Diego chat hour', desc: 'Open hour on the contact page terminal. Ask the lobster anything. Bring snacks.', c: B.violet, kind: 'event' },
    { day: 'TUE', d: '27', m: 'MAY', t: 'Ship: Skills v3', desc: 'Releasing the v3 skills directory with a much better search and slightly better jokes.', c: B.magenta, kind: 'ship' },
    { day: 'FRI', d: '30', m: 'MAY', t: 'Lobster Letter #5', desc: 'Monthly-ish newsletter goes out. Subscribe via the contact page if you want in.', c: B.magenta, kind: 'post' },
  ];

  const kinds = [
    { l: 'event', c: B.cyan },
    { l: 'ship',  c: B.magenta },
    { l: 'post',  c: B.magenta }, // ship + post share gradient for variety
    { l: 'meet',  c: B.amber },
    { l: 'focus', c: B.lime },
  ];

  return (
    <div className="neon" style={{ width: '100%', minHeight: '100%' }}>
      <NeonNav active="Calendar" />

      {/* Hero */}
      <section className="grid-bg" style={{ padding: '120px 70px 30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, right: -120, width: 520, height: 520, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.cyan} 0%, transparent 60%)`, opacity: .22, filter: 'blur(70px)',
        }}/>
        <div style={{
          position: 'absolute', top: 80, left: -60, width: 380, height: 380, borderRadius: '50%',
          background: `radial-gradient(circle, ${B.amber} 0%, transparent 60%)`, opacity: .14, filter: 'blur(70px)',
        }}/>
        <div className="chip-neon" style={{
          marginBottom: 24, color: B.cyan, borderColor: 'rgba(0,229,255,.4)',
          background: 'rgba(0,229,255,.06)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: B.cyan, animation: 'neon-pulse 1.4s infinite' }}/>
          ~ /the_schedule · publicly chaotic
        </div>
        <h1 className="serif" style={{ fontSize: 144, lineHeight: .9, margin: 0, fontWeight: 400, maxWidth: 1000 }}>
          what diego<br/>
          is <span className="serif-i gradient-text">shipping</span><br/>
          this <span style={{ color: B.cyan }}>month</span>.
        </h1>
        <p style={{ fontSize: 20, maxWidth: 620, marginTop: 22, color: B.textDim, lineHeight: 1.5 }}>
          Public roadmap, demo dates, drops, and the occasional lab day where
          nothing is allowed to ship and the only deliverable is vibes.
        </p>
      </section>

      {/* Toolbar */}
      <section style={{ padding: '20px 70px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button className="chip-neon" style={{ cursor: 'pointer', padding: '8px 12px' }}>← Apr</button>
          <h2 className="serif" style={{ fontSize: 38, lineHeight: 1, margin: '0 8px', fontWeight: 400 }}>
            <span className="serif-i" style={{ color: B.cyan }}>May</span> 2026
          </h2>
          <button className="chip-neon" style={{ cursor: 'pointer', padding: '8px 12px' }}>Jun →</button>
          <div style={{ flex: 1 }}/>
          {/* legend */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {kinds.map(k => (
              <span key={k.l} className="mono" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: B.textDim,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 2, background: k.c,
                  boxShadow: `0 0 8px ${k.c}`,
                }}/>
                {k.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Month grid */}
      <section style={{ padding: '20px 70px 40px' }}>
        <div className="panel" style={{ padding: 4, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${B.line}` }}>
            {weekdays.map(d => (
              <div key={d} className="mono" style={{
                padding: '12px 14px', fontSize: 11, color: B.textDim, letterSpacing: '0.06em',
                borderRight: `1px solid ${B.line}`, textTransform: 'uppercase',
              }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((d, i) => {
              const dayEvents = d ? events[d] || [] : [];
              const isToday = d === today;
              const row = Math.floor(i / 7);
              return (
                <div key={i} style={{
                  minHeight: 110, padding: 10, position: 'relative',
                  borderRight: (i % 7 === 6) ? 'none' : `1px solid ${B.line}`,
                  borderBottom: row === 5 ? 'none' : `1px solid ${B.line}`,
                  background: isToday ? 'rgba(0,229,255,.06)' : (d ? 'transparent' : 'rgba(255,255,255,.015)'),
                  opacity: d ? 1 : .35,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <span className="mono" style={{
                      fontSize: 13, color: isToday ? B.cyan : (d ? B.text : B.textDimmer),
                      fontWeight: isToday ? 600 : 400,
                    }}>
                      {d || ''}
                    </span>
                    {isToday && (
                      <span className="mono" style={{
                        fontSize: 9, color: B.cyan, padding: '2px 6px', borderRadius: 4,
                        background: 'rgba(0,229,255,.12)', border: `1px solid ${B.cyan}55`,
                        letterSpacing: '0.08em',
                      }}>TODAY</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                    {dayEvents.map((e, j) => (
                      <div key={j} className="mono" style={{
                        fontSize: 10.5, padding: '4px 6px', borderRadius: 4,
                        color: e.c, background: `${e.c}12`,
                        borderLeft: `2px solid ${e.c}`,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {e.t}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section style={{ padding: '40px 70px' }}>
        <div className="mono" style={{ fontSize: 11, color: B.magenta, letterSpacing: '0.08em', marginBottom: 12 }}>
          ~ /up_next · the_next_4
        </div>
        <h2 className="serif" style={{ fontSize: 56, lineHeight: .95, margin: '0 0 28px', fontWeight: 400 }}>
          what's <span className="serif-i" style={{ color: B.magenta }}>imminent</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {upcoming.map(u => (
            <a key={u.t} href="#" className="panel" style={{
              padding: 22, display: 'block', textDecoration: 'none', position: 'relative',
              overflow: 'hidden', transition: 'transform .2s, box-shadow .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 28px ${u.c}55`; e.currentTarget.style.borderColor = u.c + '88'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
              <div style={{
                position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%',
                background: `radial-gradient(circle, ${u.c} 0%, transparent 60%)`, opacity: .15, filter: 'blur(25px)',
              }}/>
              <div style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                padding: '10px 14px', borderRadius: 10, background: `${u.c}10`,
                border: `1px solid ${u.c}55`, marginBottom: 16,
                boxShadow: `0 0 18px ${u.c}25`,
              }}>
                <span className="mono" style={{ fontSize: 10, color: u.c, letterSpacing: '0.08em' }}>{u.day}</span>
                <span className="serif" style={{ fontSize: 36, lineHeight: 1, color: B.text, fontWeight: 400 }}>{u.d}</span>
                <span className="mono" style={{ fontSize: 10, color: u.c, letterSpacing: '0.08em' }}>{u.m}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="chip-neon" style={{ color: u.c, borderColor: `${u.c}55`, background: `${u.c}10`, fontSize: 10 }}>{u.kind}</span>
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.1, fontWeight: 400, marginBottom: 8 }}>{u.t}</div>
              <div style={{ fontSize: 13, color: B.textDim, lineHeight: 1.55 }}>{u.desc}</div>
              <div className="mono" style={{ marginTop: 16, fontSize: 11, color: B.textDimmer, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: u.c }}>add to calendar →</span>
                <span>.ics</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Subscribe / RSS row */}
      <section style={{ padding: '40px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { t: 'Subscribe (iCal)', d: 'Drop the feed into Google / Apple calendar. Stays live as the schedule shifts.', c: B.cyan, e: '📅', cta: 'webcal://diego.claw/cal.ics' },
            { t: 'RSS feed', d: 'For the chaos goblins who still believe in RSS. Same events, machine-readable.', c: B.amber, e: '📡', cta: '/feed.xml' },
            { t: 'Pitch a session', d: 'Want Diego at your demo day, livestream, or AI meetup? Pitch dates via the contact form.', c: B.lime, e: '🎤', cta: '→ /contact' },
          ].map(b => (
            <a key={b.t} href="#" className="panel" style={{
              padding: 24, display: 'block', textDecoration: 'none', position: 'relative',
              transition: 'transform .2s, box-shadow .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 24px ${b.c}55`; e.currentTarget.style.borderColor = b.c + '88'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = B.line; }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, fontSize: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${b.c}15`, border: `1px solid ${b.c}55`,
                boxShadow: `0 0 18px ${b.c}30`, marginBottom: 14,
              }}>{b.e}</div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1, fontWeight: 400 }}>{b.t}</div>
              <div style={{ fontSize: 13.5, color: B.textDim, marginTop: 10, lineHeight: 1.5 }}>{b.d}</div>
              <div className="mono" style={{ fontSize: 11, color: b.c, marginTop: 14 }}>{b.cta}</div>
            </a>
          ))}
        </div>
      </section>

      <NeonFooter />
    </div>
  );
}

Object.assign(window, { NeonBlog, NeonCalendar });
