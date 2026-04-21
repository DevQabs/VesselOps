'use client';

import { Vessel } from '@/types/vessel';
import StatusBadge from './StatusBadge';

interface VesselDetailPanelProps {
  vessel: Vessel;
}

export default function VesselDetailPanel({ vessel }: VesselDetailPanelProps) {
  return (
    <aside
      style={{
        width: 384,
        background: '#ffffff',
        borderLeft: '1px solid rgba(241,245,249,1)',
        boxShadow: '-20px 0 40px rgba(13,28,46,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
        overflowY: 'auto',
        zIndex: 40,
      }}
    >
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>⛵</span>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#44474e' }}>
            Vessel Intelligence
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            fontSize: 28,
            color: '#000d22',
            lineHeight: 1,
            margin: '0 0 4px',
          }}
        >
          {vessel.name}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#94a3b8' }}>IMO: {vessel.imo}</span>
          <StatusBadge status={vessel.status} />
        </div>
      </div>

      {/* Quick metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '24px 32px' }}>
        {[
          { label: 'Course Over Ground', value: vessel.course },
          { label: 'Current Speed', value: `${vessel.speed} kn` },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: '#eff4ff', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#44474e', display: 'block', marginBottom: 4 }}>
              {label}
            </span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 20, color: '#000d22' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Voyage Details */}
      <div style={{ padding: '0 32px 24px', flex: 1 }}>
        <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#94a3b8', borderBottom: '1px solid #f1f5f9', paddingBottom: 8, marginBottom: 16 }}>
          Voyage Details
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#44474e', margin: '0 0 2px' }}>Destination</p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#000d22', margin: 0 }}>
              {vessel.destination} ({vessel.destinationCode})
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#44474e', margin: '0 0 2px' }}>ETA</p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#000d22', margin: 0 }}>{vessel.eta}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 8, background: '#e6eeff', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ height: '100%', width: `${vessel.voyageProgress}%`, background: '#000d22', borderRadius: 99 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: '#44474e' }}>
          <span>{vessel.origin.toUpperCase()}</span>
          <span>{vessel.distanceRemaining} REMAINING</span>
        </div>

        {/* Position & Telemetry */}
        <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#94a3b8', borderBottom: '1px solid #f1f5f9', paddingBottom: 8, marginBottom: 16, marginTop: 24 }}>
          Position &amp; Telemetry
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Latitude', value: `${Math.abs(vessel.lat).toFixed(4)}° ${vessel.lat >= 0 ? 'N' : 'S'}` },
            { label: 'Longitude', value: `${Math.abs(vessel.lng).toFixed(4)}° ${vessel.lng >= 0 ? 'E' : 'W'}` },
            { label: 'Last Update', value: vessel.lastUpdate },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8f9ff' }}>
              <span style={{ fontSize: 13, color: '#44474e' }}>{label}</span>
              <span style={{ fontSize: 13, fontFamily: label !== 'Last Update' ? 'monospace' : undefined, fontWeight: 700, color: '#000d22' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action bar */}
      <div style={{ padding: '16px 32px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12 }}>
        <button style={{ flex: 1, padding: '12px 0', background: '#ffffff', border: '1px solid rgba(196,198,207,0.3)', borderRadius: 12, fontSize: 12, fontWeight: 700, color: '#000d22', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          📋 Track History
        </button>
        <button style={{ flex: 1, padding: '12px 0', background: '#000d22', border: 'none', borderRadius: 12, fontSize: 12, fontWeight: 700, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 4px 12px rgba(13,28,46,0.2)' }}>
          💬 Bridge Contact
        </button>
      </div>
    </aside>
  );
}
