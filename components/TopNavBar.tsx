'use client';

import { Button, Tooltip } from 'antd';
import { SyncOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

interface TopNavBarProps {
  lastSynced: string;
  onSync: () => void;
  isMobile?: boolean;
}

export default function TopNavBar({ lastSynced, onSync, isMobile }: TopNavBarProps) {
  return (
    <header
      style={{
        background: 'rgba(248,249,255,0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 0 rgba(196,198,207,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        height: 56,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <span
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: '#000d22',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          VesselOps
        </span>
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 24 }}>
            {['Fleet', 'Voyages', 'Ports', 'Compliance'].map((item, i) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: i === 0 ? 700 : 500,
                  fontSize: 13,
                  color: i === 0 ? '#000d22' : '#74777e',
                  textDecoration: 'none',
                  borderBottom: i === 0 ? '2px solid #000d22' : 'none',
                  paddingBottom: i === 0 ? 2 : 0,
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {isMobile ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              background: '#eff4ff',
              borderRadius: 99,
            }}
          >
            <SyncOutlined style={{ fontSize: 12, color: '#498ae6' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#498ae6', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Live
            </span>
          </div>
        ) : (
          <div style={{ textAlign: 'right', marginRight: 8 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#44474e', fontWeight: 700 }}>
              Operational Status
            </div>
            <div style={{ fontSize: 11, color: '#324768' }}>Last synced: {lastSynced}</div>
          </div>
        )}
        <Tooltip title="Sync">
          <Button
            type="text"
            shape="circle"
            icon={<SyncOutlined />}
            onClick={onSync}
            style={{ color: '#000d22' }}
          />
        </Tooltip>
        <Tooltip title="Notifications">
          <Button type="text" shape="circle" icon={<BellOutlined />} style={{ color: '#000d22' }} />
        </Tooltip>
        <Tooltip title="Account">
          <Button type="text" shape="circle" icon={<UserOutlined />} style={{ color: '#000d22' }} />
        </Tooltip>
      </div>
    </header>
  );
}
