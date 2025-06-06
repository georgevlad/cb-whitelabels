// src/components/layout/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import { SiteConfig } from '@/types/config';

interface LayoutProps {
  config: SiteConfig;
  children: React.ReactNode;
}

export default function Layout({ config, children }: LayoutProps) {
  return (
    <div>
      <Header config={config.header} branding={config.branding} />
      <main>{children}</main>
      <Footer config={config.footer} />
    </div>
  );
}