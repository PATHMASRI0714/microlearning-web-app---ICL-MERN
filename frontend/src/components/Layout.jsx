import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ padding: '0 16px 100px 16px', flex: 1 }}>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
