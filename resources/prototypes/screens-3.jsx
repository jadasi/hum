/* global React, I, AppBar, TabBar, Pill, Avatar, CarThumb */

// ============================================================
// SCREEN 8 — Ride in progress (driving to Scottsdale)
// ============================================================
function ScreenRiding() {
  return (
    <div className="hum-app">
      <AppBar title="On the way" subtitle="Michele · ride active"/>
      <div className="scroll" style={{ padding: 0 }}>
        <div className="map tall" style={{ borderRadius: 0, height: 320 }}>
          <div className="road"/>
          <div className="road2"/>
          <div className="pin teal" style={{ top: '70%', left: '20%' }}/>
          <div className="pin" style={{ top: '22%', right: '24%' }}/>
          <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 320 320" preserveAspectRatio="none">
            <path d="M 64 224 Q 160 180 240 70" stroke="#52ADA2" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <Pill tone="teal" dot>Ride 2241 · live</Pill>
            <Pill tone="dark">22 min · 14 mi</Pill>
          </div>
        </div>

        <div style={{ padding: '14px 20px' }}>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials="MW" size={40}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>Michele W. · onboard</div>
                <div className="meta">PHX T4 → 7110 E Camelback Rd</div>
              </div>
              <I name="phone" size={20} color="#52ADA2" stroke={2}/>
            </div>
          </div>

          <div className="card faint" style={{ marginBottom: 12 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Earning</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em' }}>$45.00</div>
              <div className="body-sm" style={{ color: '#444' }}>flat · payout end of day</div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Quick notes for Michele</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Prefers quiet','Water bottle in back','Loves the dogs','Daughter at ASU'].map(n => (
                <span key={n} className="pill pill-teal">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cta-bar">
        <button className="btn btn-pink btn-lg btn-block">End ride at drop-off</button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 9 — Post-ride: keep-as-client + notes (CRM moment)
// ============================================================
function ScreenPostRide() {
  return (
    <div className="hum-app">
      <AppBar title="Ride complete" subtitle="2:58 PM"/>
      <div className="scroll faint">
        <div className="card elev" style={{ marginBottom: 14, textAlign: 'center', padding: '18px 16px' }}>
          <div className="eyebrow">Paid</div>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em', color: '#52ADA2', marginTop: 2 }}>$45.00</div>
          <div className="body-sm" style={{ color: '#777', marginTop: 4 }}>14.2 mi · 23 min · zero apps in between</div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initials="MW" size={44}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Michele White</div>
              <div className="meta">13 rides · $585 · regular flyer</div>
            </div>
            <Pill tone="teal" dot>Keep</Pill>
          </div>
          <div className="div-line"/>
          <div className="eyebrow eyebrow-mute" style={{ marginBottom: 6 }}>Add a note</div>
          <div style={{
            padding: 12, background: '#F8F8F8', borderRadius: 8,
            fontSize: 13, lineHeight: 1.5, color: '#444', minHeight: 56,
          }}>
            Flying back Sunday 5pm — said she'd text me direct. Daughter's<br/>
            graduation in May. Loved the new water bottles.
            <span style={{ display: 'inline-block', width: 1, height: 14, background: '#52ADA2', marginLeft: 2, verticalAlign: 'middle' }}/>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {['+ Graduation', '+ Sunday return', '+ Prefers SUV'].map(n => (
              <span key={n} className="pill pill-teal" style={{ background: '#fff', borderColor: '#AADCD6' }}>{n}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>The HUM moment</div>
          <div className="body-sm" style={{ color: '#444' }}>
            <b>Door 7 · Carousel 6 · Car photo.</b> Sent on landing with one tap. Worth holding onto for next time.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: '#52ADA2', fontWeight: 700 }}>
            <I name="sparkle" size={12} color="#52ADA2" stroke={2}/> Saved to your airport playbook
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Schedule return</button>
          <button className="btn btn-teal btn-sm" style={{ flex: 1 }}>Save & next ride</button>
        </div>
      </div>
      <TabBar active="clients"/>
    </div>
  );
}

// ============================================================
// SCREEN 10 — Day recap / earnings (the reinforcement loop)
// ============================================================
function ScreenRecap() {
  return (
    <div className="hum-app">
      <AppBar/>
      <div className="scroll dark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <h1 className="display" style={{ color: '#fff' }}>Tuesday<br/>recap</h1>
          <span className="eyebrow">May 12</span>
        </div>
        <div className="body-sm" style={{ color: '#AADCD6', marginTop: 6, marginBottom: 18 }}>
          You drove 5h 12m. 4 rides. Zero curb stress.
        </div>

        <div className="card dark" style={{ border: '1px solid #1A1A1A', marginBottom: 12 }}>
          <div className="stat-row">
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>Today</div><div className="num" style={{ color: '#52ADA2' }}>$215</div></div>
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>Week</div><div className="num" style={{ color: '#fff' }}>$1,635</div></div>
            <div className="stat-cell"><div className="lbl" style={{ color: '#AADCD6' }}>Private</div><div className="num" style={{ color: '#fff' }}>97%</div></div>
          </div>
        </div>

        <div className="card dark" style={{ border: '1px solid #1A1A1A', marginBottom: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Today's rides</div>
          {[
            { t: '8:15 AM', name: 'Daniel R.', tag: 'Commute', amt: '$32' },
            { t: '11:40 AM', name: 'Uber · curbside catch', tag: 'Convert?', amt: '$24', mute: true },
            { t: '2:35 PM', name: 'Michele W.', tag: 'Airport · flat', amt: '$45', hi: true },
            { t: '6:00 PM', name: 'Brian S.', tag: 'Standing', amt: '$28' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderTop: i ? '1px solid #1A1A1A' : 'none' }}>
              <div style={{ width: 70, color: '#777', fontSize: 12, fontWeight: 700 }}>{r.t}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: r.hi ? '#52ADA2' : '#fff' }}>{r.name}</div>
                <div className="meta" style={{ color: r.mute ? '#888' : '#AADCD6' }}>{r.tag}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 16, color: r.mute ? '#888' : '#fff' }}>{r.amt}</div>
            </div>
          ))}
        </div>

        <div className="card dark" style={{ border: '1px solid #1A1A1A', marginBottom: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Goal · 10 HUM rides this week</div>
          <div style={{ position: 'relative', height: 10, background: '#1A1A1A', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: '60%', background: '#52ADA2', borderRadius: 5 }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12 }}>
            <span style={{ color: '#AADCD6' }}>6 of 10 done</span>
            <span style={{ color: '#fff', fontWeight: 700 }}>4 to go</span>
          </div>
        </div>

        <div className="card" style={{ background: '#52ADA2', color: '#fff', borderColor: '#52ADA2' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>One more for the playbook.</div>
          <div className="body-sm" style={{ color: '#E8F5F2' }}>
            Michele rated her airport pickup 5★ — "first time I didn't have to look for a driver." That's your bar.
          </div>
        </div>
      </div>
      <TabBar active="earnings" dark/>
    </div>
  );
}

Object.assign(window, { ScreenRiding, ScreenPostRide, ScreenRecap });
