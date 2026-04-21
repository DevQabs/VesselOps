'use client';

import { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Vessel } from '@/types/vessel';
import StatusBadge from './StatusBadge';

interface MobileBottomSheetProps {
  vessels: Vessel[];
  selectedVessel: Vessel | null;
  onSelect: (vessel: Vessel) => void;
}

export default function MobileBottomSheet({ vessels, selectedVessel, onSelect }: MobileBottomSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const others = vessels.filter(v => v.id !== selectedVessel?.id);

  return (
    <div
      style={{
        position: 'fixed',
        insetInline: 0,
        bottom: 64,
        zIndex: 50,
        background: '#ffffff',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -10px 40px rgba(13,28,46,0.12)',
        maxHeight: expanded ? '80vh' : 320,
        transition: 'max-height 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Handle */}
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 0', cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div style={{ width: 48, height: 6, background: 'rgba(196,198,207,0.4)', borderRadius: 99, marginBottom: 20 }} />
        <div style={{ width: '100%', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: 22, color: '#000d22', margin: 0 }}>
              Fleet Command
            </h2>
            <p style={{ fontSize: 13, color: '#44474e', fontWeight: 500, margin: 0 }}>
              {vessels.length} Vessels in sector
            </p>
          </div>
          <div style={{ padding: '6px 16px', background: '#eff4ff', borderRadius: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#000d22', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Filter
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ overflowY: 'auto', padding: '0 24px 24px', flex: 1 }}>
        {/* Selected vessel card */}
        {selectedVessel && (
          <div
            style={{
              marginBottom: 24,
              padding: 24,
              background: '#0a2342',
              borderRadius: 24,
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 18 }}>⛵</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#498ae6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Active Vessel
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: 22, margin: '0 0 2px' }}>
                  {selectedVessel.name}
                </h3>
                <p style={{ fontSize: 13, color: '#768baf', margin: 0 }}>
                  IMO: {selectedVessel.imo} | {selectedVessel.type}
                </p>
              </div>
              <div style={{ padding: '4px 12px', background: 'rgba(73,138,230,0.2)', borderRadius: 99, border: '1px solid rgba(73,138,230,0.3)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#498ae6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {selectedVessel.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 8px' }}>
              {[
                { label: 'Destination', value: `${selectedVessel.destination}` },
                { label: 'ETA', value: selectedVessel.eta },
                { label: 'Coordinates', value: `${Math.abs(selectedVessel.lat).toFixed(4)}° ${selectedVessel.lat >= 0 ? 'N' : 'S'}, ${Math.abs(selectedVessel.lng).toFixed(4)}° ${selectedVessel.lng >= 0 ? 'E' : 'W'}`, mono: true },
                { label: 'Speed', value: `${selectedVessel.speed} knots` },
              ].map(({ label, value, mono }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 10, color: '#768baf', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, fontFamily: mono ? 'monospace' : undefined, letterSpacing: mono ? '-0.02em' : undefined }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button style={{ width: '100%', marginTop: 24, padding: '14px 0', background: '#ffffff', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#000d22', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Full Manifest <span>→</span>
            </button>
          </div>
        )}

        {/* Other vessels */}
        <h4 style={{ fontSize: 10, fontWeight: 900, color: '#44474e', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>
          Other Vessels
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {others.map(v => (
            <div
              key={v.id}
              onClick={() => onSelect(v)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#eff4ff', borderRadius: 12, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: '#ffffff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontSize: 18 }}>
                  ⛵
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#000d22', margin: 0, fontSize: 14 }}>{v.name}</p>
                  <p style={{ fontSize: 11, color: '#44474e', margin: 0 }}>
                    To: {v.destination}
                    {v.status !== 'Moored' ? ` • ${v.distanceRemaining}` : ''}
                  </p>
                </div>
              </div>
              <RightOutlined style={{ color: '#c4c6cf' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
