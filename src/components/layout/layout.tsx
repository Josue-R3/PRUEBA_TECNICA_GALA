// components/layout/Layout.tsx
import React from 'react';
import Header from './header';
import PageWrapper from './pagewrapper';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Header />
      <PageWrapper>
      {children}
      </PageWrapper>
    </div>
  );
}
