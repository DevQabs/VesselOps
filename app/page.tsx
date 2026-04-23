'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ConfigProvider } from 'antd';
import { fetchVessels, syncVessels } from '@/lib/api';
import { Vessel } from '@/types/vessel';
import TopNavBar from '@/components/TopNavBar';
import VesselList from '@/components/VesselList';
import VesselDetailPanel from '@/components/VesselDetailPanel';
import MobileBottomSheet from '@/components/MobileBottomSheet';
import MobileNavBar from '@/components/MobileNavBar';

const VesselMap = dynamic(() => import('@/components/VesselMap'), { ssr: false });

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function DashboardPage() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [lastSynced, setLastSynced] = useState('—');
  const [syncing, setSyncing] = useState(false);
  const isMobile = useIsMobile();

  const loadVessels = useCallback(async () => {
    try {
      const data = await fetchVessels();
      setVessels(data);
      if (!selectedVessel && data.length > 0) setSelectedVessel(data[0]);
      setLastSynced('Just now');
    } catch {
      // keep stale data on error
    }
  }, [selectedVessel]);

  useEffect(() => {
    loadVessels();
  }, []);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    try {
      await syncVessels();
      await loadVessels();
    } finally {
      setSyncing(false);
    }
  }, [loadVessels]);

  if (isMobile) {
    return (
      <ConfigProvider theme={{ token: { colorPrimary: '#000d22', borderRadius: 12 } }}>
        <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#f8f9ff', overflow: 'hidden' }}>
          <TopNavBar lastSynced={lastSynced} onSync={handleSync} syncing={syncing} isMobile />
          <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <VesselMap
              vessels={vessels}
              selectedId={selectedVessel?.id ?? null}
              onSelectVessel={setSelectedVessel}
            />
          </main>
          <MobileBottomSheet
            vessels={vessels}
            selectedVessel={selectedVessel}
            onSelect={setSelectedVessel}
          />
          <MobileNavBar />
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#000d22', borderRadius: 12 } }}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9ff', overflow: 'hidden' }}>
        <TopNavBar lastSynced={lastSynced} onSync={handleSync} syncing={syncing} />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <VesselList
            vessels={vessels}
            selectedId={selectedVessel?.id ?? null}
            onSelect={setSelectedVessel}
          />
          <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <VesselMap
              vessels={vessels}
              selectedId={selectedVessel?.id ?? null}
              onSelectVessel={setSelectedVessel}
            />
          </main>
          {selectedVessel && <VesselDetailPanel vessel={selectedVessel} />}
        </div>
      </div>
    </ConfigProvider>
  );
}
