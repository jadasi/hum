/* global React, I, AppBar, TabBar, Pill, Avatar, CarThumb */

// ============================================================
// SCREEN 1 — Today's agenda (morning, airport pickup highlighted later)
// ============================================================
function ScreenAgenda() {
  return (
    <div className="hum-app">
      <AppBar/>
      <div className="scroll">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <h1 className="display">Tuesday<br/>May 12</h1>
          <span className="eyebrow">3 appts · 1 flight</span>
        </div>
        <div className="body-sm" style={{ marginTop: 6, marginBottom: 18 }}>Good morning, Kevin. Phoenix is clear, 78°.</div>

        {/* Earnings strip */}
        <div className="card dark" style={{ padding: 14, marginBottom: 16 }}>
          <div className="stat-row">
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>Today</div><div className="num" style={{ color: '#52ADA2' }}>$0</div></div>
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>This week</div><div className="num" style={{ color: '#fff' }}>$1,420</div></div>
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>Private</div><div className="num" style={{ color: '#fff' }}>96%</div></div>
          </div>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>Today's schedule</div>

        {/* 8:15 AM commuter */}
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="meta">8:15 AM · COMMUTE</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>Daniel R.</div>
              <div className="body-sm" style={{ color: '#777' }}>Arcadia → Sky Harbor offices</div>
            </div>
            <Pill tone="teal" dot>Confirmed</Pill>
          </div>
        </div>

        {/* 2:35 PM AIRPORT — the hero card */}
        <div className="card elev" style={{ marginBottom: 10, border: '1.5px solid #52ADA2', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: 16, right: 16, height: 3, background: '#52ADA2', borderRadius: '0 0 3px 3px' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">2:35 PM · Airport pickup</div>
              <div style={{ fontWeight: 800, fontSize: 17, marginTop: 4 }}>Michele W.</div>
              <div className="body-sm" style={{ color: '#444' }}>PHX → Scottsdale · flat $45</div>
            </div>
            <Avatar initials="MW" size={40}/>
          </div>
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#F0FBF7', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <I name="plane" size={18} color="#52ADA2" stroke={2}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>AA 2241 · DFW → PHX</div>
              <div className="meta">Departs 12:05 PM · arrives 2:18 PM · on time</div>
            </div>
            <span className="pulse"/>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Details</button>
            <button className="btn btn-teal btn-sm" style={{ flex: 1 }}>Message Michele</button>
          </div>
        </div>

        {/* 6:00 PM appointment */}
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="meta">6:00 PM · APPOINTMENT</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>Brian S.</div>
              <div className="body-sm" style={{ color: '#777' }}>Camelback Inn → home · standing</div>
            </div>
            <Pill tone="teal" dot>Confirmed</Pill>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><I name="plus" size={14} stroke={2.2}/>Add ride</button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Open Uber</button>
        </div>
      </div>
      <TabBar active="today"/>
    </div>
  );
}

// ============================================================
// SCREEN 2 — Appointment detail (the airport pickup card opened)
// ============================================================
function ScreenAppointment() {
  return (
    <div className="hum-app">
      <AppBar back/>
      <div className="scroll">
        <div className="eyebrow">Today · 2:35 PM</div>
        <h1 className="display" style={{ fontSize: 28, marginTop: 4 }}>Airport pickup<br/><span style={{ color: '#52ADA2' }}>Michele W.</span></h1>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 14, marginBottom: 14 }}>
          <Avatar initials="MW" size={44}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Michele White</div>
            <div className="meta">12 rides · $540 · prefers quiet · flies T4</div>
          </div>
          <I name="phone" size={20} color="#52ADA2" stroke={2}/>
          <div style={{ width: 8 }}/>
          <I name="msg" size={20} color="#52ADA2" stroke={2}/>
        </div>

        {/* Flight card */}
        <div className="card faint" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div className="eyebrow">Flight</div>
            <Pill tone="teal" dot>On time</Pill>
          </div>
          <div className="flight-strip">
            <div>
              <div className="ap">DFW</div>
              <div className="label">12:05 PM</div>
            </div>
            <div className="plane-track">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 1 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
              </svg>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="ap">PHX</div>
              <div className="label">2:18 PM</div>
            </div>
          </div>
          <div className="div-line"/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div><div className="meta">Flight</div><div style={{ fontWeight: 800, fontSize: 14 }}>AA 2241</div></div>
            <div><div className="meta">Terminal</div><div style={{ fontWeight: 800, fontSize: 14 }}>T4</div></div>
            <div><div className="meta">Tracking</div><div style={{ fontWeight: 800, fontSize: 14, color: '#52ADA2' }}>Auto · live</div></div>
          </div>
        </div>

        {/* Pickup details */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Pickup</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <I name="pin" size={18} color="#D0114D" stroke={2}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>PHX Sky Harbor · T4 · Door 7</div>
              <div className="meta">Carousel and door fill in when she lands</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <I name="car" size={18} color="#52ADA2" stroke={2}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>Silver Equinox · 7HUM·KG</div>
              <div className="meta">Photo attached automatically</div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow eyebrow-mute">Quoted</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em' }}>$45 flat</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="meta">Platform avg today</div>
              <div className="body-sm" style={{ color: '#444' }}>$58 — $72</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost-dark" style={{ flex: 1 }}>Hand off</button>
          <button className="btn btn-teal" style={{ flex: 2 }}>Confirm 24-hr text</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 3 — Day-of monitoring · flight in air
// ============================================================
function ScreenInAir() {
  return (
    <div className="hum-app">
      <AppBar title="Michele W." subtitle="2:35 PM · airport"/>
      <div className="scroll faint">
        <div className="card elev" style={{ padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="eyebrow">In the air</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#2A6B62' }}>
              <span className="pulse"/> Live
            </span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>AA 2241 · 34,000 ft · 412 kt</div>
          <div className="meta" style={{ marginTop: 2 }}>Over El Paso · 1h 12m to PHX</div>

          {/* Mini path */}
          <div style={{ position: 'relative', height: 60, marginTop: 14, marginBottom: 4 }}>
            <svg viewBox="0 0 300 60" width="100%" height="60" preserveAspectRatio="none">
              <path d="M10 50 Q 100 5 290 35" stroke="#52ADA2" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
              <path d="M10 50 Q 80 18 160 22" stroke="#52ADA2" strokeWidth="2.5" fill="none"/>
              <circle cx="10" cy="50" r="4" fill="#52ADA2"/>
              <circle cx="290" cy="35" r="5" fill="none" stroke="#D0114D" strokeWidth="2"/>
              <circle cx="290" cy="35" r="2" fill="#D0114D"/>
            </svg>
            <div style={{ position: 'absolute', left: 0, bottom: -8, fontSize: 10, fontWeight: 700, color: '#777' }}>DFW</div>
            <div style={{ position: 'absolute', right: 0, bottom: -8, fontSize: 10, fontWeight: 700, color: '#777' }}>PHX</div>
            <div style={{ position: 'absolute', left: '52%', top: -4, fontSize: 10, fontWeight: 700, color: '#52ADA2' }}>
              ✈ here
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="eyebrow">Arrival window</div>
            <Pill tone="teal" dot>On time</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div><div className="meta">Lands</div><div style={{ fontWeight: 800, fontSize: 15 }}>2:18 PM</div></div>
            <div><div className="meta">Gate</div><div style={{ fontWeight: 800, fontSize: 15 }}>B22</div></div>
            <div><div className="meta">You leave</div><div style={{ fontWeight: 800, fontSize: 15, color: '#52ADA2' }}>1:48 PM</div></div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Window before pickup</div>
          <div className="timeline" style={{ paddingLeft: 16 }}>
            <div className="tl-item done">
              <div style={{ fontWeight: 700, fontSize: 13 }}>Pre-trip text sent</div>
              <div className="meta">Yesterday 8:02 PM · "See you tomorrow, 2:35 curb."</div>
            </div>
            <div className="tl-item done">
              <div style={{ fontWeight: 700, fontSize: 13 }}>Flight pinned · auto-tracking on</div>
              <div className="meta">This morning 6:14 AM</div>
            </div>
            <div className="tl-item active">
              <div style={{ fontWeight: 700, fontSize: 13 }}>Heads-up to leave in <span style={{ color: '#D0114D' }}>52 min</span></div>
              <div className="meta">We'll buzz you at 1:36 PM</div>
            </div>
            <div className="tl-item">
              <div style={{ fontWeight: 700, fontSize: 13 }}>Send pickup details on landing</div>
              <div className="meta">Gate, carousel, door + car photo · one tap</div>
            </div>
          </div>
        </div>

        <button className="btn btn-ghost btn-block">Slot a quick ride before 1:48 PM</button>
      </div>
      <TabBar active="today"/>
    </div>
  );
}

Object.assign(window, { ScreenAgenda, ScreenAppointment, ScreenInAir });
