'use client';

import { EnvironmentOutlined } from '@ant-design/icons';
import { Vessel } from '@/types/vessel';
import StatusBadge from './StatusBadge';

interface VesselCardProps {
  vessel: Vessel;
  selected: boolean;
  onClick: () => void;
}

export default function VesselCard({ vessel, selected, onClick }: VesselCardProps) {
  const destinationLabel = vessel.status === 'Moored'
    ? `Arrived: ${vessel.destination}`
    : `Destination: ${vessel.destination}`;

  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? '#ffffff' : 'transparent',
        borderRadius: 12,
        padding: 16,
        cursor: 'pointer',
        borderLeft: selected ? '4px solid #000d22' : '4px solid transparent',
        boxShadow: selected ? '0 1px 6px rgba(13,28,46,0.08)' : 'none',
        transition: 'background 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.background = '#d5e3fc';
      }}
      onMouseLeave={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: selected ? 700 : 600, fontSize: 13, color: '#000d22' }}>
          {vessel.name}
        </span>
        <StatusBadge status={vessel.status} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
          MMSI: {vessel.mmsi}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 10, color: '#44474e' }}>
          <EnvironmentOutlined style={{ fontSize: 11 }} />
          <span>{destinationLabel}</span>
        </div>
      </div>
    </div>
  );
}
