'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Vessel } from '@/types/vessel';
import VesselCard from './VesselCard';

interface VesselListProps {
  vessels: Vessel[];
  selectedId: string | null;
  onSelect: (vessel: Vessel) => void;
}

export default function VesselList({ vessels, selectedId, onSelect }: VesselListProps) {
  return (
    <aside
      style={{
        width: 320,
        background: '#eff4ff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
        zIndex: 30,
      }}
    >
      <div style={{ padding: '24px 24px 0' }}>
        <h2
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            fontSize: 15,
            color: '#000d22',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Fleet Inventory
        </h2>
        <p style={{ fontSize: 11, color: '#44474e', fontWeight: 500, margin: '4px 0 0' }}>
          {vessels.length} active vessels tracked
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {vessels.map(v => (
          <VesselCard
            key={v.id}
            vessel={v}
            selected={v.id === selectedId}
            onClick={() => onSelect(v)}
          />
        ))}
      </div>

      <div style={{ padding: 16, borderTop: '1px solid rgba(196,198,207,0.1)' }}>
        <button
          style={{
            width: '100%',
            padding: '12px 0',
            background: 'linear-gradient(135deg, #000d22, #0a2342)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(13,28,46,0.2)',
          }}
        >
          <PlusOutlined />
          Register New Vessel
        </button>
      </div>
    </aside>
  );
}
