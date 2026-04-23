import { Vessel, VesselStatus } from '@/types/vessel';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface ApiVesselPosition {
  id: string;
  vesselId: string;
  latitude: number;
  longitude: number;
  speed: number;
  course: number;
  heading: number | null;
  recordedAt: string;
}

interface ApiVessel {
  id: string;
  name: string;
  mmsi: string;
  imo: string | null;
  type: string;
  status: 'UNDERWAY' | 'AT_SEA' | 'MOORED';
  destination: string | null;
  destinationCode: string | null;
  origin: string | null;
  eta: string | null;
  distanceRemaining: string | null;
  voyageProgress: number;
  lastSyncedAt: string;
  latestPosition?: ApiVesselPosition | null;
}

function degreesToCompass(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx = Math.round(deg / 45) % 8;
  return dirs[idx];
}

function formatCourse(deg: number): string {
  return `${String(Math.round(deg)).padStart(3, '0')}° ${degreesToCompass(deg)}`;
}

function formatEta(eta: string | null): string {
  if (!eta) return 'N/A';
  const d = new Date(eta);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  }) + ' UTC';
}

function formatLastUpdate(lastSyncedAt: string): string {
  const diff = Date.now() - new Date(lastSyncedAt).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 min ago';
  return `${minutes} min ago`;
}

const STATUS_MAP: Record<ApiVessel['status'], VesselStatus> = {
  UNDERWAY: 'Underway',
  AT_SEA: 'At Sea',
  MOORED: 'Moored',
};

function mapVessel(v: ApiVessel): Vessel {
  const pos = v.latestPosition;
  return {
    id: v.id,
    name: v.name,
    mmsi: v.mmsi,
    imo: v.imo ?? '',
    type: v.type,
    status: STATUS_MAP[v.status] ?? 'At Sea',
    lat: pos?.latitude ?? 0,
    lng: pos?.longitude ?? 0,
    heading: pos?.heading ?? 0,
    speed: pos?.speed ?? 0,
    course: pos != null ? formatCourse(pos.course) : '000° N',
    destination: v.destination ?? '',
    destinationCode: v.destinationCode ?? '',
    origin: v.origin ?? '',
    eta: formatEta(v.eta),
    distanceRemaining: v.distanceRemaining ?? '0 NM',
    voyageProgress: v.voyageProgress,
    lastUpdate: formatLastUpdate(v.lastSyncedAt),
  };
}

export async function fetchVessels(): Promise<Vessel[]> {
  const res = await fetch(`${API_URL}/vessels`);
  if (!res.ok) throw new Error(`Failed to fetch vessels: ${res.status}`);
  const data: ApiVessel[] = await res.json();
  return data.map(mapVessel);
}

export async function syncVessels(): Promise<void> {
  const res = await fetch(`${API_URL}/sync/mock`, { method: 'POST' });
  if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
}
