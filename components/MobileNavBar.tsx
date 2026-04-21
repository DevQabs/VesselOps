'use client';

export default function MobileNavBar() {
  const items = [
    { icon: '🗺️', label: 'Live Map', active: true },
    { icon: '⛵', label: 'Fleet', active: false },
    { icon: '📊', label: 'Stats', active: false },
    { icon: '📋', label: 'Logs', active: false },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        insetInline: 0,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 60,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 16px',
        borderTop: '1px solid rgba(196,198,207,0.15)',
      }}
    >
      {items.map(({ icon, label, active }) => (
        <button
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            color: active ? '#000d22' : '#74777e',
          }}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
