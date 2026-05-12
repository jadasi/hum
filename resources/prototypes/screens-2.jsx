/* global React, I, AppBar, TabBar, Pill, Avatar, CarThumb */

// ============================================================
// SCREEN 4 — Delay alert (push-style banner + day re-stack)
// ============================================================
function ScreenDelay() {
  return (
    <div className="hum-app">
      <AppBar/>
      <div className="scroll faint">
        <div className="card alert" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ marginTop: 2 }}><I name="alert" size={20} color="#A50D3D" stroke={2}/></div>
            <div style={{ flex: 1 }}>
              <div className="eyebrow eyebrow-pink">Delay · AA 2241</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>Michele lands at 3:48 PM</div>
              <div className="body-sm" style={{ color: '#444', marginTop: 4 }}>
                Pushed 1h 30m — weather hold in Dallas. Her phone will get a heads-up from HUM in a moment.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Keep her posted</button>
                <button className="btn btn-pink btn-sm" style={{ flex: 1 }}>Re-stack my day</button>
              </div>
            </div>
          </div>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>How your day shifts</div>

        <div className="card" style={{ marginBottom: 10 }}>
          <div className="meta" style={{ textDecoration: 'line-through' }}>2:35 PM · airport pickup</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow" style={{ color: '#52ADA2' }}>NEW · 4:05 PM · Airport pickup</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>Michele W.</div>
              <div className="body-sm" style={{ color: '#777' }}>Leave by 3:18 PM</div>
            </div>
            <Pill tone="amber" dot>Shifted</Pill>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="meta">2:30 — 3:10 PM · OPEN</div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Take a couple platform rides?</div>
              <div className="body-sm" style={{ color: '#777' }}>Uber surge: +18% near Scottsdale Quarter</div>
            </div>
            <button className="btn btn-ghost btn-sm">Open Uber</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 10 }}>
          <div className="meta">6:00 PM · APPOINTMENT</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Brian S.</div>
              <div className="body-sm" style={{ color: '#777' }}>Still on. 1h 55m buffer.</div>
            </div>
            <Pill tone="teal" dot>OK</Pill>
          </div>
        </div>

        <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }}>
          Need coverage? Offer 6 PM to your posse
        </button>
      </div>
      <TabBar active="today"/>
    </div>
  );
}

// ============================================================
// SCREEN 5 — Landed · the critical hand-off moment
// ============================================================
function ScreenLanded() {
  return (
    <div className="hum-app">
      <AppBar title="Michele W." subtitle="At the curb"/>
      <div className="scroll" style={{ padding: 0 }}>
        {/* Map */}
        <div style={{ position: 'relative' }}>
          <div className="map tall" style={{ borderRadius: 0 }}>
            <div className="road"/>
            <div className="road2"/>
            <div className="pin teal" style={{ top: '52%', left: '38%' }}/>
            <div className="pin" style={{ top: '38%', right: '20%' }}/>
            <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Pill tone="pink" dot>Landed 2:14 PM</Pill>
              <Pill tone="teal" dot>You · 4 min away</Pill>
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, padding: '10px 12px', background: 'rgba(13,13,13,0.85)', color: '#fff', borderRadius: 10, fontSize: 12, backdropFilter: 'blur(6px)' }}>
              <div style={{ fontWeight: 800, marginBottom: 2 }}>Gate B22 · Carousel 6 · Door 7</div>
              <div style={{ opacity: 0.7 }}>Tap to copy or update if HUM auto-fill missed anything.</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="eyebrow eyebrow-pink">Flight landed · send pickup message</div>
            <span className="meta">2:15 PM</span>
          </div>

          {/* Pickup details summary */}
          <div className="card" style={{ marginBottom: 12, padding: '12px 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div><div className="meta">Gate</div><div style={{ fontWeight: 900, fontSize: 18 }}>B22</div></div>
              <div><div className="meta">Carousel</div><div style={{ fontWeight: 900, fontSize: 18 }}>6</div></div>
              <div><div className="meta">Door</div><div style={{ fontWeight: 900, fontSize: 18 }}>7</div></div>
            </div>
          </div>

          {/* Draft preview bubble */}
          <div className="msg-thread" style={{ marginBottom: 14 }}>
            <div className="bubble draft">
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Hi Michele — saw you land. I'm 4 minutes out.</div>
              <div style={{ fontSize: 13 }}>You'll come off at <b>Gate B22</b>. Bags at <b>Carousel 6</b>. I'll be at <b>Door 7</b>, silver Equinox, plate 7HUM·KG. No rush.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, paddingTop: 8, borderTop: '1px dashed #AADCD6' }}>
                <CarThumb small/>
                <div className="meta">Car photo attached · tap to retake</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-bar" style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-ghost-dark btn-lg btn-sm" style={{ flex: 1 }}>Edit</button>
        <button className="btn btn-pink btn-lg" style={{ flex: 2 }}>
          Send to Michele <I name="send" size={14} color="#fff" stroke={2.2}/>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 6 — Messaging thread (post-send confirmation + iMessage feel)
// ============================================================
function ScreenThread() {
  return (
    <div className="hum-app">
      <AppBar title="Michele W." subtitle="iMessage · auto-bridged"/>
      <div className="scroll" style={{ background: '#F8F8F8' }}>
        <div className="msg-thread">
          <div style={{ textAlign: 'center', fontSize: 11, color: '#777', margin: '4px 0 8px' }}>
            Yesterday · 8:02 PM
          </div>
          <div className="bubble me">
            See you tomorrow at 2:35 — flat $45 to Scottsdale. Safe flight.
            <div className="meta">Delivered · auto-confirm 24h</div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 11, color: '#777', margin: '12px 0 4px' }}>
            Today · 12:48 PM
          </div>
          <div className="bubble me">
            Hey — weather pushed you to 3:48. No worries, I'll be there. Updated on my end.
          </div>
          <div className="bubble them">
            You're the best. Thank you for staying on top of it.
          </div>

          <div style={{ textAlign: 'center', fontSize: 11, color: '#777', margin: '12px 0 4px' }}>
            Today · 2:15 PM
          </div>
          <div className="bubble me">
            Saw you land. I'm 4 minutes out.<br/>
            Gate <b>B22</b> · Carousel <b>6</b> · Door <b>7</b>.<br/>
            Silver Equinox, plate 7HUM·KG.
            <div style={{ marginTop: 8, padding: 4, background: 'rgba(255,255,255,.18)', borderRadius: 8 }}>
              <CarThumb small/>
            </div>
            <div className="meta" style={{ color: 'rgba(255,255,255,.85)' }}>Sent · 1 tap</div>
          </div>
          <div className="bubble them">
            Perfect. Walking to baggage now.
          </div>
        </div>
      </div>
      <div className="cta-bar" style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Running late? Send update</button>
        <button className="btn btn-teal" style={{ flex: 1 }}><I name="pin" size={14} color="#fff" stroke={2.2}/> I'm here</button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 7 — At the curb / waiting
// ============================================================
function ScreenCurb() {
  return (
    <div className="hum-app">
      <AppBar title="Waiting · Door 7" subtitle="Michele W. · airport"/>
      <div className="scroll faint" style={{ padding: 0 }}>
        <div className="map" style={{ borderRadius: 0, height: 180 }}>
          <div className="road"/>
          <div className="pin teal" style={{ top: '46%', left: '46%' }}/>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Pill tone="dark" dot>Arrived</Pill>
          </div>
        </div>

        <div style={{ padding: '14px 20px' }}>
          <div className="card elev" style={{ marginBottom: 12, padding: 16, textAlign: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>You're here</div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em' }}>Door 7</div>
            <div className="body-sm" style={{ color: '#777', marginTop: 2 }}>Curb-side · 2 min before Michele clears baggage</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, padding: 12, background: '#F8F8F8', borderRadius: 10 }}>
              <CarThumb small/>
              <div style={{ textAlign: 'left' }}>
                <div className="meta">YOUR CAR</div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Silver Equinox</div>
                <div className="meta">Plate 7HUM·KG</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials="MW" size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Michele · walking to baggage</div>
                <div className="meta">Last update 2:16 PM</div>
              </div>
              <span className="pulse"/>
            </div>
          </div>

          <button className="btn btn-ghost btn-block" style={{ marginBottom: 8 }}>
            <I name="msg" size={14} color="#52ADA2" stroke={2}/> Send "Take your time"
          </button>
        </div>
      </div>

      <div className="cta-bar">
        <button className="btn btn-pink btn-lg btn-block">
          Start ride when she's in
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDelay, ScreenLanded, ScreenThread, ScreenCurb });
