'use client';

import { useEffect, useRef } from 'react';
import { Vessel } from '@/types/vessel';

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

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current!, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      leafletMapRef.current = map;

      vessels.forEach(vessel => {
        const isSelected = vessel.id === selectedId;
        const marker = createMarker(L, vessel, isSelected);
        marker.addTo(map).on('click', () => onSelectVessel(vessel));
        markersRef.current.set(vessel.id, marker);
      });
    })();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when selection changes
  useEffect(() => {
    if (!leafletMapRef.current) return;
    (async () => {
      const L = (await import('leaflet')).default;
      markersRef.current.forEach((marker, id) => {
        const vessel = vessels.find(v => v.id === id);
        if (!vessel) return;
        const isSelected = id === selectedId;
        marker.setIcon(buildIcon(L, isSelected));
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
