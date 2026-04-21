'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ConfigProvider } from 'antd';
import { mockVessels } from '@/data/mockVessels';
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
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(mockVessels[0]);
  const [lastSynced, setLastSynced] = useState('2 minutes ago');
  const isMobile = useIsMobile();

  const handleSync = useCallback(() => {
    setLastSynced('Just now');
    setTimeout(() => setLastSynced('1 minute ago'), 60000);
  }, []);

  if (isMobile) {
    return (
      <ConfigProvider theme={{ token: { colorPrimary: '#000d22', borderRadius: 12 } }}>
        <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#f8f9ff', overflow: 'hidden' }}>
          <TopNavBar lastSynced={lastSynced} onSync={handleSync} isMobile />
          <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <VesselMap
              vessels={mockVessels}
              selectedId={selectedVessel?.id ?? null}
              onSelectVessel={setSelectedVessel}
            />
          </main>
          <MobileBottomSheet
            vessels={mockVessels}
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
        <TopNavBar lastSynced={lastSynced} onSync={handleSync} />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <VesselList
            vessels={mockVessels}
            selectedId={selectedVessel?.id ?? null}
            onSelect={setSelectedVessel}
          />
          <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <VesselMap
              vessels={mockVessels}
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
