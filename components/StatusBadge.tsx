'use client';

import { VesselStatus } from '@/types/vessel';

const config: Record<VesselStatus, { bg: string; color: string }> = {
  Underway: { bg: '#cbe7f5', color: '#4e6874' },
  'At Sea':  { bg: '#dce9ff', color: '#498ae6' },
  Moored:    { bg: '#dce9ff', color: '#93000a' },
};

export default function StatusBadge({ status }: { status: VesselStatus }) {
  const { bg, color } = config[status];
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '2px 8px',
        borderRadius: 99,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  );
}
