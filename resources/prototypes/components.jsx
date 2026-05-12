/* global React */

// ============================================================
// Lucide-style icons, inline SVG. Stroke 1.75, teal default.
// ============================================================
function I({ name, size = 18, stroke = 1.75, color = 'currentColor' }) {
  const paths = {
    plane: <><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 1 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    car: <><path d="M5 11l2-5h10l2 5"/><path d="M3 11h18v6a1 1 0 0 1-1 1h-1a2 2 0 0 1-2-2H7a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6z"/><circle cx="8" cy="15.5" r="1.2"/><circle cx="16" cy="15.5" r="1.2"/></>,
    map: <><path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z"/><path d="M9 3v16M15 5v16"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    bell: <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
    chev: <><path d="M9 6l6 6-6 6"/></>,
    chevDown: <><path d="M6 9l6 6 6-6"/></>,
    check: <><path d="M5 12l5 5L20 7"/></>,
    send: <><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></>,
    phone: <><path d="M22 16.9V20a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6A19 19 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2H8l2 5-2.5 1.5a14 14 0 0 0 6 6L15 12l5 2v2.9z"/></>,
    msg: <><path d="M21 11a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z"/></>,
    dollar: <><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    home: <><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9z"/></>,
    cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 6 2 6 5"/></>,
    chart: <><path d="M3 21h18"/><path d="M6 17V9M10 17V5M14 17v-6M18 17v-9"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.5-2.4.8a7 7 0 0 0-2-1.2l-.4-2.4h-4l-.4 2.4a7 7 0 0 0-2 1.2L5.2 6 3.2 9.4l2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.5 2.4-.8a7 7 0 0 0 2 1.2l.4 2.4h4l.4-2.4a7 7 0 0 0 2-1.2l2.4.8 2-3.5-2-1.5a7 7 0 0 0 .1-1.2z"/></>,
    alert: <><path d="M12 2 1 22h22L12 2z"/><path d="M12 10v5M12 18v.5"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 8v0M12 11v6"/></>,
    door: <><path d="M5 21V3h14v18"/><path d="M3 21h18"/><circle cx="15" cy="12" r="1"/></>,
    luggage: <><rect x="6" y="6" width="12" height="14" rx="2"/><path d="M9 6V3h6v3"/><path d="M9 11h6M9 15h6"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    pin: <><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></>,
    star: <><path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

// ============================================================
// Shared chrome
// ============================================================
function AppBar({ initials = 'KG', title, subtitle, dark, back }) {
  return (
    <div className="app-bar" style={dark ? { background: '#0D0D0D', borderColor: '#1A1A1A', color: '#fff' } : null}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {back ? (
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -6 }}>
            <I name="chev" size={20} color={dark ? '#fff' : '#0D0D0D'} stroke={2}/>
            <span style={{ transform: 'rotate(180deg)', display: 'none' }} />
          </div>
        ) : (
          <div className="brand">
            <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '0.02em' }}>HUM</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', color: '#52ADA2', textTransform: 'uppercase' }}>· Driver</span>
          </div>
        )}
        {title && (
          <div style={{ marginLeft: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', color: dark ? '#fff' : '#0D0D0D' }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: '#777' }}>{subtitle}</div>}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <I name="bell" size={20} color={dark ? '#fff' : '#444'} stroke={1.75}/>
        <div className="avatar">{initials}</div>
      </div>
    </div>
  );
}

function TabBar({ active = 'today', dark }) {
  const tabs = [
    { id: 'today', label: 'Today', ico: 'home' },
    { id: 'clients', label: 'Clients', ico: 'users' },
    { id: 'earnings', label: 'Earnings', ico: 'chart' },
    { id: 'posse', label: 'Posse', ico: 'msg' },
  ];
  return (
    <div className="tab-bar" style={dark ? { background: '#0D0D0D', borderColor: '#1A1A1A' } : null}>
      {tabs.map(t => (
        <div key={t.id} className={`tab ${active === t.id ? 'active' : ''}`}>
          <span className="ico"><I name={t.ico} size={20} stroke={1.75} color={active === t.id ? '#52ADA2' : (dark ? '#666' : '#BBB')}/></span>
          <span style={dark && active !== t.id ? { color: '#777' } : null}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function Pill({ tone = 'teal', children, dot }) {
  return (
    <span className={`pill pill-${tone}`}>
      {dot && <span className="pill-dot" />}{children}
    </span>
  );
}

function Avatar({ initials, size = 36, tone = 'teal' }) {
  const bg = tone === 'pink' ? '#FCE8EF' : tone === 'dark' ? '#0D0D0D' : '#F0FBF7';
  const fg = tone === 'pink' ? '#A50D3D' : tone === 'dark' ? '#fff' : '#2A6B62';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * 0.36, letterSpacing: '0.02em',
      flexShrink: 0,
    }}>{initials}</div>
  );
}

function CarThumb({ small }) {
  // SVG illustration of a silver Equinox-ish SUV — placeholder vehicle photo.
  const w = small ? 110 : 240;
  const h = small ? 70 : 140;
  return (
    <div style={{
      width: w, height: h, borderRadius: 10, overflow: 'hidden',
      background: 'linear-gradient(180deg, #E8EEF1 0%, #C9D3D9 100%)',
      position: 'relative', flexShrink: 0,
    }}>
      <svg viewBox="0 0 240 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="100" width="240" height="40" fill="#3a3a3a"/>
        <path d="M30 92 L60 60 Q90 48 130 48 L180 50 Q200 60 215 78 L215 100 L30 100 Z" fill="#cfd4d8"/>
        <path d="M70 60 Q95 52 130 52 L170 54 L180 78 L70 78 Z" fill="#a8c6d9" opacity=".85"/>
        <path d="M130 52 L130 78" stroke="#7a8a96" strokeWidth="1.5"/>
        <circle cx="70" cy="106" r="14" fill="#1a1a1a"/>
        <circle cx="70" cy="106" r="6" fill="#444"/>
        <circle cx="185" cy="106" r="14" fill="#1a1a1a"/>
        <circle cx="185" cy="106" r="6" fill="#444"/>
        <rect x="208" y="80" width="10" height="6" fill="#fff7c2"/>
        <rect x="32" y="80" width="8" height="6" fill="#d23"/>
      </svg>
    </div>
  );
}

Object.assign(window, { I, AppBar, TabBar, Pill, Avatar, CarThumb });
