'use client';

import { useEffect, useRef } from 'react';
import { Vessel } from '@/types/vessel';
import 'leaflet/dist/leaflet.css';

interface VesselMapProps {
  vessels: Vessel[];
  selectedId: string | null;
  onSelectVessel: (vessel: Vessel) => void;
}

// Leaflet is loaded client-side only
export default function VesselMap({ vessels, selectedId, onSelectVessel }: VesselMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (leafletMapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;

      if (cancelled || !mapRef.current) return;
      // Guard against StrictMode double-init after awaits
      if ((mapRef.current as any)._leaflet_id) return;

      const map = L.map(mapRef.current!, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      if (cancelled) {
        map.remove();
        return;
      }

      leafletMapRef.current = map;

      // initial marker population skipped — synced by the vessels effect below
    })();

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync markers whenever vessels or selection changes
  useEffect(() => {
    if (!leafletMapRef.current) return;
    (async () => {
      const L = (await import('leaflet')).default;
      const map = leafletMapRef.current;
      if (!map) return;

      const currentIds = new Set(vessels.map(v => v.id));

      // Remove stale markers
      markersRef.current.forEach((marker, id) => {
        if (!currentIds.has(id)) {
          marker.remove();
          markersRef.current.delete(id);
        }
      });

      // Add new markers or update icon for existing ones
      vessels.forEach(vessel => {
        const isSelected = vessel.id === selectedId;
        if (markersRef.current.has(vessel.id)) {
          markersRef.current.get(vessel.id).setIcon(buildIcon(L, isSelected));
        } else {
          const marker = createMarker(L, vessel, isSelected);
          marker.addTo(map).on('click', () => onSelectVessel(vessel));
          markersRef.current.set(vessel.id, marker);
        }
      });

      if (selectedId) {
        const vessel = vessels.find(v => v.id === selectedId);
        if (vessel) {
          leafletMapRef.current.flyTo([vessel.lat, vessel.lng], 5, { duration: 1.2 });
        }
      }
    })();
  }, [selectedId, vessels]);

  return (
    <div style={{ position: 'relative', flex: 1, height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function buildIcon(L: any, selected: boolean) {
  const size = selected ? 48 : 28;
  const inner = selected ? 16 : 10;
  const pulse = selected
    ? `<div style="position:absolute;inset:0;background:rgba(0,13,34,0.15);border-radius:50%;animation:pulse 2s ease-in-out infinite;"></div>`
    : '';
  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <div style="width:${inner}px;height:${inner}px;background:#000d22;border:2px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:1;"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createMarker(L: any, vessel: Vessel, isSelected: boolean) {
  return L.marker([vessel.lat, vessel.lng], { icon: buildIcon(L, isSelected) });
}
